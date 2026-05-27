import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Trash2, Minus, Plus, ShoppingBag, ArrowRight, CreditCard, Coffee, 
  Check, QrCode, Phone, User, FileText, Ticket, Percent, 
  MapPin, CheckCircle2, ChevronRight, AlertCircle, Copy, Printer, Download, Smartphone 
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import confetti from "canvas-confetti";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Checkout states
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Order information states
  const [diningOption, setDiningOption] = useState<"dine-in" | "takeaway">("dine-in");
  const [selectedTable, setSelectedTable] = useState("01");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderNote, setOrderNote] = useState("");
  
  // Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: "percent" | "fixed"; value: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccessMsg, setPromoSuccessMsg] = useState("");

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "bank" | "wallet">("cash");
  const [copiedBankText, setCopiedBankText] = useState(false);

  // Item customization states (local to Cart view)
  const [itemOptions, setItemOptions] = useState<Record<string, { size: "S" | "M" | "L"; ice: string; sugar: string }>>({});

  // Generated Order Details for the receipt
  const [finalOrderDetails, setFinalOrderDetails] = useState<any>(null);

  // Initialize item options when cart changes
  useEffect(() => {
    const updatedOptions = { ...itemOptions };
    let changed = false;
    cart.forEach(item => {
      if (!updatedOptions[item.id]) {
        updatedOptions[item.id] = { size: "M", ice: "100%", sugar: "100%" };
        changed = true;
      }
    });
    if (changed) {
      setItemOptions(updatedOptions);
    }
  }, [cart]);

  // Handle option updates
  const updateItemOption = (itemId: string, field: "size" | "ice" | "sugar", value: any) => {
    setItemOptions(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  // Helper: format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Calculate size surcharge (Size L: +5,000 VND, Size S: -3,000 VND)
  const getItemSurcharge = (itemId: string) => {
    const opt = itemOptions[itemId];
    if (!opt) return 0;
    if (opt.size === "L") return 5000;
    if (opt.size === "S") return -3000;
    return 0;
  };

  // Calculate customized subtotal
  const getSubtotal = () => {
    return cart.reduce((sum, item) => {
      const surcharge = getItemSurcharge(item.id);
      return sum + (item.price + surcharge) * item.qty;
    }, 0);
  };

  // Calculate discount
  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    if (!appliedPromo) return 0;
    if (appliedPromo.type === "percent") {
      return (subtotal * appliedPromo.value) / 100;
    } else {
      return Math.min(appliedPromo.value, subtotal);
    }
  };

  // Final Total
  const getFinalTotal = () => {
    return Math.max(0, getSubtotal() - getDiscountAmount());
  };

  // Apply promo code handler
  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccessMsg("");
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setPromoError("Vui lòng nhập mã giảm giá.");
      return;
    }

    if (code === "NICHGA10") {
      setAppliedPromo({ code: "NICHGA10", type: "percent", value: 10 });
      setPromoSuccessMsg("Áp dụng mã NICHGA10 thành công! Giảm 10% tổng hóa đơn.");
    } else if (code === "COFFEE20") {
      setAppliedPromo({ code: "COFFEE20", type: "percent", value: 20 });
      setPromoSuccessMsg("Áp dụng mã COFFEE20 thành công! Giảm 20% tổng hóa đơn.");
    } else if (code === "NICHGANEW") {
      setAppliedPromo({ code: "NICHGANEW", type: "fixed", value: 20000 });
      setPromoSuccessMsg("Chào bạn mới! Áp dụng mã thành công, giảm 20.000 đ.");
    } else {
      setPromoError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  };

  // Remove promo code
  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccessMsg("");
    setPromoCode("");
  };

  // Bank info copy helper
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankText(true);
    setTimeout(() => setCopiedBankText(false), 2000);
  };

  // Checkout submission
  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert("Vui lòng nhập tên khách hàng.");
      return;
    }
    if (!customerPhone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }

    setIsOrdering(true);
    
    // Construct order details for the receipt
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const total = getFinalTotal();
    const orderNum = `NG-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const itemsSnapshot = cart.map(item => ({
      ...item,
      size: itemOptions[item.id]?.size || "M",
      ice: itemOptions[item.id]?.ice || "100%",
      sugar: itemOptions[item.id]?.sugar || "100%",
      surcharge: getItemSurcharge(item.id),
    }));

    setTimeout(() => {
      setIsOrdering(false);
      setFinalOrderDetails({
        orderNum,
        time: new Date().toLocaleString("vi-VN"),
        diningOption,
        selectedTable,
        customerName,
        customerPhone,
        orderNote,
        items: itemsSnapshot,
        subtotal,
        discount,
        total,
        paymentMethod
      });
      setOrderSuccess(true);
      
      // Trigger canvas-confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      clearCart();
    }, 1500);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Download receipt simulation
  const handleDownload = () => {
    alert("Đang xuất hóa đơn định dạng PDF...");
  };

  if (orderSuccess && finalOrderDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-100 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Đặt hàng thành công!</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Hóa đơn của bạn đã được khởi tạo và gửi đến quầy pha chế. Dưới đây là thông tin chi tiết hóa đơn.
          </p>
        </div>

        {/* E-Receipt Card (Figma Style Thermal Receipt) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative mb-8 print:border-none print:shadow-none">
          {/* Header section of the receipt */}
          <div className="bg-[#4A3B32] text-white p-6 text-center relative">
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
              {finalOrderDetails.diningOption === "dine-in" ? `Bàn ${finalOrderDetails.selectedTable}` : "Mang đi"}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coffee className="w-5 h-5 text-[#A8E6CF]" />
              <span className="font-bold tracking-wider text-sm uppercase">Hóa đơn điện tử</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">NichGa Coffee</h3>
            <p className="text-xs text-white/70">123 Đường Cà Phê, Quận 1, TP.HCM</p>
            <p className="text-xs text-white/70 mt-1">SĐT: 0123 456 789</p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Meta details */}
            <div className="grid grid-cols-2 gap-y-3 text-sm text-slate-600 border-b border-dashed border-slate-200 pb-5">
              <div>
                <span className="text-slate-400 block text-xs">MÃ ĐƠN HÀNG</span>
                <span className="font-bold text-slate-800">{finalOrderDetails.orderNum}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-xs">THỜI GIAN ĐẶT</span>
                <span className="font-medium text-slate-800">{finalOrderDetails.time}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">KHÁCH HÀNG</span>
                <span className="font-medium text-slate-800">{finalOrderDetails.customerName}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-xs">SỐ ĐIỆN THOẠI</span>
                <span className="font-medium text-slate-800">
                  {finalOrderDetails.customerPhone.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2")}
                </span>
              </div>
              {finalOrderDetails.orderNote && (
                <div className="col-span-2 mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-500 block">GHI CHÚ ĐƠN:</span>
                  <span className="text-slate-600 italic">"{finalOrderDetails.orderNote}"</span>
                </div>
              )}
            </div>

            {/* Items Breakdown */}
            <div className="space-y-4 border-b border-dashed border-slate-200 pb-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Chi tiết món ăn</span>
              {finalOrderDetails.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Size {item.size} • Đá {item.ice} • Đường {item.sugar}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-slate-500 text-sm block">x{item.qty}</span>
                    <span className="font-semibold text-slate-800 text-sm">
                      {formatPrice((item.price + item.surcharge) * item.qty)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Financials */}
            <div className="space-y-2 border-b border-dashed border-slate-200 pb-5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính</span>
                <span className="font-medium">{formatPrice(finalOrderDetails.subtotal)}</span>
              </div>
              {finalOrderDetails.discount > 0 && (
                <div className="flex justify-between text-red-500 font-medium">
                  <span>Khuyến mãi</span>
                  <span>-{formatPrice(finalOrderDetails.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Phương thức thanh toán</span>
                <span className="font-medium text-slate-700">
                  {finalOrderDetails.paymentMethod === "cash" && "Tiền mặt tại quầy"}
                  {finalOrderDetails.paymentMethod === "bank" && "Chuyển khoản ngân hàng"}
                  {finalOrderDetails.paymentMethod === "wallet" && "Ví điện tử"}
                </span>
              </div>
            </div>

            {/* Total Payment Due */}
            <div className="flex justify-between items-center pt-2">
              <span className="font-extrabold text-slate-800 text-base uppercase">Tổng cộng thanh toán</span>
              <span className="font-extrabold text-[#4A3B32] text-2xl">
                {formatPrice(finalOrderDetails.total)}
              </span>
            </div>

            {/* Preparation tracker */}
            <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/50 mt-6 print:hidden">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-3 text-center">Trạng thái pha chế</span>
              <div className="flex justify-between items-center max-w-md mx-auto relative px-2">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-amber-500 -translate-y-1/2 z-0" />
                
                <div className="flex flex-col items-center z-10">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold ring-4 ring-amber-100">
                    ✓
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 mt-1">Đã nhận</span>
                </div>
                <div className="flex flex-col items-center z-10 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold ring-4 ring-amber-100">
                    ☕
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 mt-1">Pha chế</span>
                </div>
                <div className="flex flex-col items-center z-10">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">Phục vụ</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom decorative receipt zig-zag pattern */}
          <div className="h-4 bg-slate-100 flex items-center overflow-hidden gap-1 px-1 opacity-70">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-white rotate-45 shrink-0 -translate-y-2" />
            ))}
          </div>
        </div>

        {/* Buttons for print/actions */}
        <div className="flex flex-wrap gap-4 justify-center print:hidden">
          <button 
            onClick={handlePrint}
            className="inline-flex items-center px-5 py-3 border border-slate-300 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            In hóa đơn
          </button>
          <button 
            onClick={handleDownload}
            className="inline-flex items-center px-5 py-3 border border-slate-300 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Tải PDF
          </button>
          <button 
            onClick={() => { setOrderSuccess(false); navigate("/menu"); }}
            className="inline-flex items-center px-6 py-3 bg-[#4A3B32] text-white rounded-xl font-bold hover:bg-[#6F4E37] transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <Coffee className="w-4 h-4 mr-2" />
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-[#f8f5f2] text-[#4A3B32]/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-dashed border-[#4A3B32]/20">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-3">Giỏ hàng của bạn đang trống</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Hãy thêm vài ly cà phê nguyên chất hoặc trà trái cây tươi mát vào giỏ hàng nhé!</p>
        <Link 
          to="/menu"
          className="inline-flex items-center px-8 py-3.5 bg-[#4A3B32] text-white rounded-2xl font-bold hover:bg-[#6F4E37] transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          Khám phá thực đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold text-[#4A3B32]">Giỏ hàng của bạn</h1>
        <p className="text-slate-500 mt-1">Kiểm tra các món uống và hoàn tất thông tin thanh toán của bạn.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left column: Cart items */}
        <div className="lg:w-2/3 w-full space-y-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
              <span>Danh sách món uống</span>
              <span className="bg-[#f8f5f2] text-[#4A3B32] text-xs font-semibold px-2.5 py-1 rounded-full">
                {cart.reduce((s, i) => s + i.qty, 0)} món
              </span>
            </h3>
            
            <div className="divide-y divide-slate-100">
              {cart.map((item) => {
                const opt = itemOptions[item.id] || { size: "M", ice: "100%", sugar: "100%" };
                const itemPriceWithSurcharge = item.price + getItemSurcharge(item.id);

                return (
                  <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Item Image */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl bg-slate-50 shrink-0 border border-slate-100"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-base md:text-lg hover:text-[#4A3B32] transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-xs bg-[#fcfbf9] text-slate-500 border border-slate-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                            {item.category}
                          </span>
                        </div>
                        <span className="font-bold text-slate-800 text-base whitespace-nowrap">
                          {formatPrice(itemPriceWithSurcharge)}
                        </span>
                      </div>

                      {/* Customize option controls (Size, Ice, Sugar) */}
                      <div className="grid grid-cols-3 gap-2 mt-4 max-w-sm">
                        {/* Size selector */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-1">SIZE</label>
                          <select 
                            value={opt.size}
                            onChange={(e) => updateItemOption(item.id, "size", e.target.value)}
                            className="w-full text-xs border border-slate-200 bg-white rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-[#4A3B32] font-semibold text-slate-700"
                          >
                            <option value="S">S (-3k)</option>
                            <option value="M">M (0đ)</option>
                            <option value="L">L (+5k)</option>
                          </select>
                        </div>
                        
                        {/* Ice Selector */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-1">ĐÁ</label>
                          <select 
                            value={opt.ice}
                            onChange={(e) => updateItemOption(item.id, "ice", e.target.value)}
                            className="w-full text-xs border border-slate-200 bg-white rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-[#4A3B32] font-semibold text-slate-700"
                          >
                            <option value="100%">100%</option>
                            <option value="70%">70%</option>
                            <option value="50%">50%</option>
                            <option value="0%">Không đá</option>
                          </select>
                        </div>

                        {/* Sugar Selector */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-1">ĐƯỜNG</label>
                          <select 
                            value={opt.sugar}
                            onChange={(e) => updateItemOption(item.id, "sugar", e.target.value)}
                            className="w-full text-xs border border-slate-200 bg-white rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-[#4A3B32] font-semibold text-slate-700"
                          >
                            <option value="100%">100%</option>
                            <option value="70%">70%</option>
                            <option value="50%">50%</option>
                            <option value="0%">Không đường</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls and delete button */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-0 pt-4 md:pt-0 border-slate-100 shrink-0">
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-[#4A3B32] hover:bg-white rounded-lg transition-colors"
                          title="Giảm số lượng"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-bold text-slate-800 text-sm">{item.qty}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-[#4A3B32] hover:bg-white rounded-lg transition-colors"
                          title="Tăng số lượng"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dine-in vs Takeaway & Customer details Form */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#4A3B32]" />
              <span>Thông tin nhận hàng & đặt bàn</span>
            </h3>

            {/* Segmented slider/toggle for dine-in/takeaway */}
            <div className="bg-slate-100 rounded-2xl p-1 flex relative">
              <button 
                type="button"
                onClick={() => setDiningOption("dine-in")}
                className={`flex-1 py-3 text-center rounded-xl text-sm font-bold z-10 transition-all ${
                  diningOption === "dine-in" 
                    ? "bg-[#4A3B32] text-white shadow-md" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Coffee className="w-4 h-4" />
                  Ăn tại quán
                </div>
              </button>
              <button 
                type="button"
                onClick={() => setDiningOption("takeaway")}
                className={`flex-1 py-3 text-center rounded-xl text-sm font-bold z-10 transition-all ${
                  diningOption === "takeaway" 
                    ? "bg-[#4A3B32] text-white shadow-md" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mang đi (Takeaway)
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Họ và tên khách hàng *
                </label>
                <input 
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3B32] focus:border-transparent transition-all"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Số điện thoại nhận ưu đãi *
                </label>
                <input 
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3B32] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Table Selection Dropdown (Only show if Dine-in is active) */}
            {diningOption === "dine-in" && (
              <div className="bg-[#f8f5f2]/50 border border-[#4A3B32]/10 rounded-2xl p-4 animate-fade-in">
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-2">
                  Chọn bàn phục vụ
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {["01", "02", "03", "04", "05", "06", "07", "08"].map((tbl) => (
                    <button
                      key={tbl}
                      type="button"
                      onClick={() => setSelectedTable(tbl)}
                      className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                        selectedTable === tbl
                          ? "bg-[#4A3B32] border-[#4A3B32] text-white shadow-sm scale-105"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Bàn {tbl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Order Note */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Ghi chú cho quầy pha chế
              </label>
              <textarea 
                rows={2}
                placeholder="Ví dụ: Ít đường, nhiều đá, giao cốc giấy..."
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3B32] focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right column: Summary, Promo, Payments */}
        <div className="lg:w-1/3 w-full space-y-6 lg:sticky lg:top-24">
          
          {/* Promo code component */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#4A3B32]" />
              Mã ưu đãi / Voucher
            </h3>
            
            {!appliedPromo ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Mã: NICHGA10, COFFEE20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4A3B32] uppercase tracking-wider"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="bg-[#4A3B32] text-white rounded-xl px-4 text-xs font-bold hover:bg-[#6F4E37] transition-all"
                  >
                    Áp dụng
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {promoError}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 mt-1 italic">
                  Gợi ý: Thử nhập <strong>NICHGA10</strong> (Giảm 10%) hoặc <strong>COFFEE20</strong> (Giảm 20%)
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-green-800 text-xs uppercase tracking-wider">{appliedPromo.code}</span>
                    <p className="text-[10px] text-green-600">
                      {appliedPromo.type === "percent" ? `Đã giảm ${appliedPromo.value}%` : `Đã giảm ${formatPrice(appliedPromo.value)}`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleRemovePromo}
                  className="text-xs text-red-500 hover:text-red-700 font-bold hover:underline"
                >
                  Gỡ bỏ
                </button>
              </div>
            )}
            
            {promoSuccessMsg && !promoError && (
              <p className="text-green-600 text-xs flex items-center gap-1 mt-2 font-medium">
                <Check className="w-3.5 h-3.5" />
                {promoSuccessMsg}
              </p>
            )}
          </div>

          {/* Payment method selector */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#4A3B32]" />
              Phương thức thanh toán
            </h3>

            <div className="space-y-2">
              {/* Cash */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`w-full flex items-center justify-between p-3.5 border rounded-2xl text-left transition-all ${
                  paymentMethod === "cash"
                    ? "border-[#4A3B32] bg-[#f8f5f2] shadow-sm font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-amber-800" />
                  <span className="text-xs">Tiền mặt tại quầy</span>
                </div>
                {paymentMethod === "cash" && <div className="w-4 h-4 rounded-full bg-[#4A3B32] flex items-center justify-center text-white text-[9px]">✓</div>}
              </button>

              {/* Bank Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`w-full flex items-center justify-between p-3.5 border rounded-2xl text-left transition-all ${
                  paymentMethod === "bank"
                    ? "border-[#4A3B32] bg-[#f8f5f2] shadow-sm font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs">Chuyển khoản (Có mã QR)</span>
                </div>
                {paymentMethod === "bank" && <div className="w-4 h-4 rounded-full bg-[#4A3B32] flex items-center justify-center text-white text-[9px]">✓</div>}
              </button>

              {/* E-Wallet */}
              <button
                type="button"
                onClick={() => setPaymentMethod("wallet")}
                className={`w-full flex items-center justify-between p-3.5 border rounded-2xl text-left transition-all ${
                  paymentMethod === "wallet"
                    ? "border-[#4A3B32] bg-[#f8f5f2] shadow-sm font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-pink-600" />
                  <span className="text-xs">Ví điện tử MoMo / ZaloPay</span>
                </div>
                {paymentMethod === "wallet" && <div className="w-4 h-4 rounded-full bg-[#4A3B32] flex items-center justify-center text-white text-[9px]">✓</div>}
              </button>
            </div>

            {/* Sub-view for Bank Transfer Detail */}
            {paymentMethod === "bank" && (
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 space-y-4 animate-fade-in">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Thông tin tài khoản</span>
                
                {/* QR Code generator integration */}
                <div className="flex justify-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm max-w-[200px] mx-auto">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=2410-Vietinbank-NichGaCoffee-${getFinalTotal()}`} 
                    alt="Mã QR thanh toán ngân hàng" 
                    className="w-36 h-36 object-contain"
                  />
                </div>
                
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px]">NGÂN HÀNG</span>
                      <span className="font-bold text-slate-800">Vietinbank</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px]">SỐ TÀI KHOẢN</span>
                      <span className="font-bold text-slate-800">102938475610</span>
                    </div>
                    <button 
                      onClick={() => handleCopyText("102938475610")}
                      className="text-[#4A3B32] hover:text-[#6F4E37] p-1.5 hover:bg-slate-100 rounded-lg"
                      title="Sao chép số tài khoản"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px]">CHỦ TÀI KHOẢN</span>
                      <span className="font-bold text-slate-800">CÔNG TY TNHH NICHGA</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px]">NỘI DUNG CK</span>
                      <span className="font-bold text-slate-800">NICHGA {diningOption === "dine-in" ? `BAN ${selectedTable}` : "MANGDI"}</span>
                    </div>
                    <button 
                      onClick={() => handleCopyText(`NICHGA ${diningOption === "dine-in" ? `BAN ${selectedTable}` : "MANGDI"}`)}
                      className="text-[#4A3B32] hover:text-[#6F4E37] p-1.5 hover:bg-slate-100 rounded-lg"
                      title="Sao chép nội dung chuyển khoản"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {copiedBankText && (
                  <p className="text-center text-[10px] text-green-600 font-bold bg-green-50 py-1 rounded-lg border border-green-100">
                    ✓ Đã sao chép thành công
                  </p>
                )}
              </div>
            )}

            {/* Sub-view for Wallet Details */}
            {paymentMethod === "wallet" && (
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 space-y-3 text-center animate-fade-in">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Thanh toán ví điện tử</span>
                <div className="flex justify-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center justify-center flex-col w-20">
                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold mb-1">Momo</div>
                    <span className="text-[9px] text-slate-500 font-semibold">Ví MoMo</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center justify-center flex-col w-20">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold mb-1">Zalo</div>
                    <span className="text-[9px] text-slate-500 font-semibold">ZaloPay</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic px-2">Vui lòng quét QR hiển thị sau khi xác nhận thanh toán.</p>
              </div>
            )}
          </div>

          {/* Pricing breakdown card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">
              Tổng quan đơn hàng
            </h3>
            
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-semibold text-slate-800">{formatPrice(getSubtotal())}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between text-red-500 font-medium">
                  <span className="flex items-center gap-1">
                    Khuyến mãi ({appliedPromo.code})
                  </span>
                  <span>-{formatPrice(getDiscountAmount())}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Phí dịch vụ</span>
                <span className="font-semibold text-slate-800 text-green-600">Miễn phí</span>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-slate-900 font-bold text-base">
                <span>Tổng thanh toán</span>
                <span className="text-2xl text-[#4A3B32]">{formatPrice(getFinalTotal())}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isOrdering}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-base transition-all hover:shadow-lg ${
                isOrdering 
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-[#4A3B32] text-white hover:bg-[#6F4E37] hover:-translate-y-0.5"
              }`}
            >
              {isOrdering ? (
                <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Tiến hành thanh toán
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <Link 
              to="/menu"
              className="block text-center mt-3 text-sm text-slate-500 font-bold hover:text-[#4A3B32] hover:underline"
            >
              Quay lại thực đơn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

