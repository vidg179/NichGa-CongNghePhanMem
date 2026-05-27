import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Calendar } from "lucide-react";

const reportData = [
  { name: 'Tuần 1', revenue: 15000000 },
  { name: 'Tuần 2', revenue: 18000000 },
  { name: 'Tuần 3', revenue: 16500000 },
  { name: 'Tuần 4', revenue: 22000000 },
];

const reportDetails = [
  { id: "#HD001", date: "01/05/2024", staff: "Mai Nguyễn", customer: "Nguyễn Văn An", total: "150.000đ", method: "Tiền mặt" },
  { id: "#HD002", date: "01/05/2024", staff: "Tuấn Anh", customer: "Khách lẻ", total: "45.000đ", method: "Momo" },
  { id: "#HD003", date: "02/05/2024", staff: "Mai Nguyễn", customer: "Trần Thị Bích", total: "210.000đ", method: "Chuyển khoản" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Báo cáo doanh thu</h1>
          <p className="text-sm text-slate-500">Xem thống kê doanh thu chi tiết theo thời gian</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Xuất PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-[#4A3B32] text-white rounded-lg text-sm font-medium hover:bg-[#6F4E37] transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input type="date" className="text-sm text-slate-600 outline-none" />
          <span className="text-slate-400">-</span>
          <input type="date" className="text-sm text-slate-600 outline-none" />
        </div>
        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]">
          <option value="">Tất cả nhân viên</option>
          <option value="mai">Mai Nguyễn</option>
          <option value="tuan">Tuấn Anh</option>
        </select>
        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]">
          <option value="">Phương thức thanh toán</option>
          <option value="cash">Tiền mặt</option>
          <option value="transfer">Chuyển khoản</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-[#4A3B32]">
          <p className="text-sm font-medium text-slate-500 mb-1">Tổng doanh thu</p>
          <h4 className="text-2xl font-bold text-slate-800">71.500.000đ</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-[#A8E6CF]">
          <p className="text-sm font-medium text-slate-500 mb-1">Tổng đơn hàng</p>
          <h4 className="text-2xl font-bold text-slate-800">1,452</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-orange-400">
          <p className="text-sm font-medium text-slate-500 mb-1">Món bán chạy</p>
          <h4 className="text-lg font-bold text-slate-800 truncate">Cà phê sữa đá</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-400">
          <p className="text-sm font-medium text-slate-500 mb-1">KH mua nhiều nhất</p>
          <h4 className="text-lg font-bold text-slate-800 truncate">Lê Hoàng Cường</h4>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-6">Biểu đồ doanh thu theo tuần (Tháng 5)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(val) => `${val / 1000000}M`} />
              <Tooltip 
                formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                cursor={{fill: '#f8fafc'}}
              />
              <Bar dataKey="revenue" fill="#4A3B32" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Chi tiết báo cáo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">Mã đơn</th>
                <th className="p-4 font-medium">Ngày</th>
                <th className="p-4 font-medium">Nhân viên</th>
                <th className="p-4 font-medium">Khách hàng</th>
                <th className="p-4 font-medium text-right">Tổng tiền</th>
                <th className="p-4 font-medium">Phương thức</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {reportDetails.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-[#4A3B32]">{item.id}</td>
                  <td className="p-4 text-slate-600">{item.date}</td>
                  <td className="p-4 text-slate-800">{item.staff}</td>
                  <td className="p-4 text-slate-600">{item.customer}</td>
                  <td className="p-4 font-medium text-right text-slate-800">{item.total}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-md text-xs font-medium">
                      {item.method}
                    </span>
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
