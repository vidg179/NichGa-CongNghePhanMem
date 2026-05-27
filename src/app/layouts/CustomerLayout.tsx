import { Outlet, Link, useNavigate } from "react-router";
import { Coffee, ShoppingCart, Search, User } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CustomerLayout() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-50 shadow-sm">
        <Link to="/menu" className="flex items-center group">
          <div className="w-10 h-10 bg-[#4A3B32] rounded-full flex items-center justify-center mr-3 group-hover:bg-[#6F4E37] transition-colors">
            <Coffee className="w-5 h-5 text-[#A8E6CF]" />
          </div>
          <h1 className="font-bold text-xl tracking-wide text-[#4A3B32]">NichGa Coffee</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/menu" className="font-medium text-slate-600 hover:text-[#4A3B32] transition-colors">
            Thực đơn
          </Link>
          <Link to="/about" className="font-medium text-slate-600 hover:text-[#4A3B32] transition-colors">
            Về chúng tôi
          </Link>
          <Link to="/contact" className="font-medium text-slate-600 hover:text-[#4A3B32] transition-colors">
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <button className="p-2 text-slate-400 hover:text-[#4A3B32] rounded-full hover:bg-slate-100 transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate("/cart")}
            className="relative p-2 text-slate-600 hover:text-[#4A3B32] rounded-full hover:bg-slate-100 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                {totalItems}
              </span>
            )}
          </button>
          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-slate-600 hover:text-[#4A3B32] font-medium transition-colors p-2 hover:bg-slate-100 rounded-lg"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:block">Đăng nhập</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pb-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#4A3B32] text-white/80 py-8 px-4 sm:px-8 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Coffee className="w-6 h-6 text-[#A8E6CF] mr-2" />
              <h2 className="font-bold text-lg text-white">NichGa Coffee</h2>
            </div>
            <p className="text-sm leading-relaxed">
              Mang đến cho bạn những trải nghiệm cà phê tuyệt vời nhất với hương vị đậm đà và không gian thư giãn.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-white transition-colors">Thực đơn</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li>123 Đường Cà Phê, Quận 1, TP.HCM</li>
              <li>0123 456 789</li>
              <li>hello@nichgacoffee.vn</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-white/10 text-center text-sm">
          &copy; {new Date().getFullYear()} NichGa Coffee. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
