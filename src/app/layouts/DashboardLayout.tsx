import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Coffee, LayoutDashboard, Menu as MenuIcon, List, LayoutGrid, ShoppingCart, CreditCard, Users, UserCog, BarChart3, LineChart, LogOut, Search, Bell } from "lucide-react";

const MENU = [
  { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
  { path: "/products", name: "Menu", icon: MenuIcon },
  { path: "/categories", name: "Danh mục", icon: List },
  { path: "/tables", name: "Bàn", icon: LayoutGrid },
  { path: "/orders", name: "Đơn hàng", icon: ShoppingCart },
  { path: "/payments", name: "Thanh toán", icon: CreditCard },
  { path: "/customers", name: "Khách hàng", icon: Users },
  { path: "/users", name: "Người dùng", icon: UserCog },
  { path: "/reports", name: "Báo cáo", icon: BarChart3 },
  { path: "/predictions", name: "Dự báo", icon: LineChart },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-[#f8f5f2] text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4A3B32] text-white flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Coffee className="w-6 h-6 text-[#A8E6CF] mr-3" />
          <h1 className="font-semibold text-lg tracking-wide">Coffee Shop</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {MENU.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-[#6F4E37] text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-[#A8E6CF]" : "group-hover:text-[#A8E6CF]"}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center w-full px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors group"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:text-red-400" />
            <span className="font-medium group-hover:text-red-400">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center text-slate-500">
            <h2 className="text-xl font-semibold text-slate-800">
              {MENU.find(m => location.pathname.startsWith(m.path))?.name || "Hệ thống quản lý"}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-700 leading-none">Admin User</p>
                <p className="text-xs text-slate-500 mt-1">Quản trị viên</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#A8E6CF] text-[#4A3B32] flex items-center justify-center font-bold shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-[#fcfbf9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
