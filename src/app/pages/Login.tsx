import { useState } from "react";
import { useNavigate } from "react-router";
import { Coffee, Key, User } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#4A3B32]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#A8E6CF]/20 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#4A3B32] rounded-2xl flex items-center justify-center shadow-xl rotate-3">
            <Coffee className="w-8 h-8 text-[#A8E6CF] -rotate-3" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Coffee Shop Management
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Đăng nhập vào hệ thống quản lý
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Tên đăng nhập
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  defaultValue="admin"
                  className="block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#6F4E37] sm:text-sm sm:leading-6 transition-all"
                  placeholder="Nhập username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Mật khẩu
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  defaultValue="password"
                  className="block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#6F4E37] sm:text-sm sm:leading-6 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Vai trò
              </label>
              <div className="mt-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-[#6F4E37] sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="admin">Quản trị viên (Admin)</option>
                  <option value="manager">Quản lý (Manager)</option>
                  <option value="staff">Nhân viên (Staff)</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-[#4A3B32] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#6F4E37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3B32] transition-colors"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
