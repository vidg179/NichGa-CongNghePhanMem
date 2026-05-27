import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";

const predictionData = [
  { name: '01/06', actual: 4200000, predict: 4000000 },
  { name: '02/06', actual: 4800000, predict: 4500000 },
  { name: '03/06', actual: 3900000, predict: 4100000 },
  { name: '04/06', actual: 5100000, predict: 4800000 },
  { name: '05/06', actual: null, predict: 5200000 },
  { name: '06/06', actual: null, predict: 6100000 },
  { name: '07/06', actual: null, predict: 5800000 },
];

export default function Predictions() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Dự báo doanh thu AI <Sparkles className="w-5 h-5 text-amber-500" />
          </h1>
          <p className="text-sm text-slate-500">Phân tích dữ liệu lịch sử để dự đoán tương lai</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#6F4E37]">
            <option>7 ngày tới</option>
            <option>30 ngày tới</option>
            <option>3 tháng tới</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#4A3B32] to-[#6F4E37] p-6 rounded-2xl shadow-md text-white">
          <p className="text-sm font-medium text-white/80 mb-1">Doanh thu dự kiến (7 ngày)</p>
          <h4 className="text-3xl font-bold">35.5M đ</h4>
          <div className="mt-4 flex items-center text-sm text-[#A8E6CF]">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% so với tuần trước</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Ngày dự báo cao nhất</p>
          <h4 className="text-xl font-bold text-slate-800">Thứ Bảy, 06/06</h4>
          <p className="text-sm text-slate-600 mt-2 font-medium">~ 6.100.000đ</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Gợi ý AI</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nhu cầu "Cà phê sữa đá" dự kiến tăng mạnh vào cuối tuần do thời tiết nắng nóng. Cần chuẩn bị thêm 20% nguyên liệu so với tuần trước.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-slate-800">Biểu đồ dự báo so với thực tế</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              Thực tế
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#A8E6CF]"></span>
              Dự báo AI
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData}>
              <defs>
                <linearGradient id="colorPredict" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8E6CF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A8E6CF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(val) => `${val / 1000000}M`} />
              <Tooltip 
                formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
              />
              <Area type="monotone" dataKey="predict" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPredict)" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="actual" stroke="#475569" strokeWidth={3} dot={{r: 4}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Chi tiết dự báo tuần tới</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">Ngày dự báo</th>
                <th className="p-4 font-medium text-right">Doanh thu dự báo</th>
                <th className="p-4 font-medium text-right">Doanh thu thực tế</th>
                <th className="p-4 font-medium">Ghi chú AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {predictionData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{item.name}</td>
                  <td className="p-4 text-right font-medium text-emerald-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.predict)}
                  </td>
                  <td className="p-4 text-right text-slate-600">
                    {item.actual ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.actual) : '-'}
                  </td>
                  <td className="p-4 text-slate-500">
                    {!item.actual && item.predict > 5000000 && (
                      <span className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                        <AlertCircle className="w-3 h-3" /> Ngày cao điểm
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
