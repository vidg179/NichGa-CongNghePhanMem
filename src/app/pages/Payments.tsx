import { useState } from "react";
import { CreditCard, Banknote, Smartphone, Printer, Download, CheckCircle2 } from "lucide-react";

export default function Payments() {
  const [method, setMethod] = useState("cash");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Thanh toán hóa đơn</h1>
        <p className="text-sm text-slate-500">Mã đơn: #HD-20240501-01</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 pb-4 border-b border-slate-100">Thông tin đơn hàng</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-slate-800">2x Cà phê sữa đá</p>
                <p className="text-sm text-slate-500">29.000đ</p>
              </div>
              <p className="font-medium text-slate-800">58.000đ</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-slate-800">1x Trà đào cam sả</p>
                <p className="text-sm text-slate-500">39.000đ</p>
              </div>
              <p className="font-medium text-slate-800">39.000đ</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 border-dashed">
            <div className="flex justify-between text-slate-600">
              <span>Cộng tiền hàng</span>
              <span>97.000đ</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Điểm khách hàng (giảm 5%)</span>
              <span>-4.850đ</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-100">
              <span>Tổng thanh toán</span>
              <span className="text-[#4A3B32]">92.150đ</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 pb-4 border-b border-slate-100">Phương thức thanh toán</h3>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button 
              onClick={() => setMethod("cash")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${method === 'cash' ? 'border-[#4A3B32] bg-[#f8f5f2] text-[#4A3B32]' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
            >
              <Banknote className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Tiền mặt</span>
            </button>
            <button 
              onClick={() => setMethod("transfer")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${method === 'transfer' ? 'border-[#4A3B32] bg-[#f8f5f2] text-[#4A3B32]' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
            >
              <CreditCard className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Chuyển khoản</span>
            </button>
            <button 
              onClick={() => setMethod("wallet")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${method === 'wallet' ? 'border-[#4A3B32] bg-[#f8f5f2] text-[#4A3B32]' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
            >
              <Smartphone className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Ví điện tử</span>
            </button>
          </div>

          {method === 'cash' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Khách đưa</label>
                <input 
                  type="text" 
                  defaultValue="100.000"
                  className="w-full text-right text-lg font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4A3B32]" 
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-medium">Tiền thừa trả khách</span>
                <span className="text-lg font-bold text-slate-900">7.850đ</span>
              </div>
            </div>
          )}

          {method !== 'cash' && (
            <div className="mb-6 p-8 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="w-48 h-48 bg-white border border-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-400">
                Mã QR Code
              </div>
              <p className="text-sm text-slate-500">Quét mã QR để thanh toán 92.150đ</p>
            </div>
          )}

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <button className="w-full py-4 rounded-xl bg-[#4A3B32] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#6F4E37] transition-colors shadow-lg shadow-[#4A3B32]/20">
              <CheckCircle2 className="w-5 h-5" />
              Xác nhận thanh toán
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 rounded-xl border border-slate-200 text-slate-600 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <Printer className="w-4 h-4" />
                In hóa đơn
              </button>
              <button className="py-3 rounded-xl border border-slate-200 text-slate-600 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                Xuất PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
