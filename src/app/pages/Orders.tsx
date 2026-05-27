import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, X } from "lucide-react";

const mockMenu = [
  { id: "P001", name: "Cà phê sữa đá", price: 29000, category: "Cà phê" },
  { id: "P002", name: "Bạc xỉu", price: 29000, category: "Cà phê" },
  { id: "P003", name: "Trà đào cam sả", price: 39000, category: "Trà" },
  { id: "P004", name: "Matcha Latte", price: 45000, category: "Đá xay" },
  { id: "P005", name: "Trà đen macchiato", price: 42000, category: "Trà" },
  { id: "P006", name: "Cà phê đen", price: 25000, category: "Cà phê" },
];

export default function Orders() {
  const [cart, setCart] = useState<any[]>([
    { id: "P001", name: "Cà phê sữa đá", price: 29000, qty: 2 },
    { id: "P003", name: "Trà đào cam sả", price: 39000, qty: 1 },
  ]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Left side: Menu & Tables */}
      <div className="flex-1 flex flex-col min-w-0 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm món..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] text-sm"
              />
            </div>
            <select className="border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]">
              <option value="">Chọn bàn</option>
              <option value="1">Bàn 01</option>
              <option value="2">Bàn 02</option>
              <option value="takeaway">Mang đi</option>
            </select>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {['Tất cả', 'Cà phê', 'Trà', 'Đá xay', 'Bánh'].map(cat => (
              <button key={cat} className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-[#4A3B32] hover:text-white transition-colors whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 content-start">
          {mockMenu.map(item => (
            <div key={item.id} className="border border-slate-100 rounded-xl p-3 hover:shadow-md hover:border-[#6F4E37]/30 transition-all cursor-pointer bg-white group flex flex-col">
              <div className="w-full aspect-square bg-slate-100 rounded-lg mb-3 flex items-center justify-center text-slate-400 group-hover:bg-[#f8f5f2] transition-colors">
                Ảnh món
              </div>
              <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-1 line-clamp-2">{item.name}</h4>
              <p className="text-[#4A3B32] font-medium text-sm mt-auto">{formatPrice(item.price)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Order Details (Cart) */}
      <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden shrink-0">
        <div className="p-4 border-b border-slate-100 bg-[#4A3B32] text-white flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Chi tiết đơn hàng</h3>
            <p className="text-xs text-white/70">Bàn 02 • HD00124</p>
          </div>
          <button className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-800 text-sm truncate">{item.name}</h4>
                <p className="text-[#4A3B32] font-semibold text-sm">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-100">
                <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-md transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-md transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={() => removeItem(item.id)} className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Tạm tính ({cart.reduce((a, b) => a + b.qty, 0)} món)</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Giảm giá</span>
            <span>0đ</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-slate-900 pt-2 border-t border-slate-200">
            <span>Tổng tiền</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="py-3 px-4 rounded-xl border-2 border-[#4A3B32] text-[#4A3B32] font-semibold hover:bg-slate-50 transition-colors">
              Lưu đơn
            </button>
            <button className="py-3 px-4 rounded-xl bg-[#4A3B32] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#6F4E37] transition-colors">
              <CreditCard className="w-5 h-5" />
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
