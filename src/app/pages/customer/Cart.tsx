import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CreditCard, Coffee } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleCheckout = () => {
    setIsOrdering(true);
    // Simulate API call for ordering
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Đặt hàng thành công!</h2>
        <p className="text-slate-600 mb-8 text-lg">Cảm ơn bạn đã đặt hàng. Chúng tôi đang chuẩn bị đồ uống cho bạn.</p>
        <button 
          onClick={() => { setOrderSuccess(false); navigate("/menu"); }}
          className="inline-flex items-center px-6 py-3 bg-[#4A3B32] text-white rounded-xl font-medium hover:bg-[#6F4E37] transition-colors"
        >
          <Coffee className="w-5 h-5 mr-2" />
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-slate-500 mb-8">Hãy thêm vài món đồ uống ngon tuyệt vào giỏ hàng nhé!</p>
        <Link 
          to="/menu"
          className="inline-flex items-center px-6 py-3 bg-[#4A3B32] text-white rounded-xl font-medium hover:bg-[#6F4E37] transition-colors"
        >
          Khám phá thực đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-[#4A3B32] mb-8">Giỏ hàng của bạn</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-slate-50 shrink-0"
              />
              <div className="flex-1 w-full text-center sm:text-left">
                <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                <p className="font-bold text-[#4A3B32]">{formatPrice(item.price)}</p>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-4 sm:pt-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#4A3B32] hover:bg-slate-100 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-slate-800">{item.qty}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#4A3B32] hover:bg-slate-100 rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  title="Xóa khỏi giỏ"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Tổng quan đơn hàng</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí giao hàng</span>
                <span className="font-medium">Miễn phí</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8 pt-4 border-t border-slate-100">
              <span className="font-bold text-lg text-slate-800">Tổng cộng</span>
              <span className="font-bold text-2xl text-[#4A3B32]">{formatPrice(totalPrice)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isOrdering}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
                isOrdering 
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-[#4A3B32] text-white hover:bg-[#6F4E37] hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {isOrdering ? (
                "Đang xử lý..."
              ) : (
                <>
                  Tiến hành thanh toán
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <Link 
              to="/menu"
              className="block text-center mt-6 text-[#4A3B32] font-medium hover:underline"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
