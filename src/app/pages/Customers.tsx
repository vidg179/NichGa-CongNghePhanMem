import { Search, Plus, Star } from "lucide-react";

const mockCustomers = [
  { id: "KH001", name: "Nguyễn Văn An", phone: "0901234567", email: "an.nguyen@email.com", points: 1250, date: "12/01/2024" },
  { id: "KH002", name: "Trần Thị Bích", phone: "0912345678", email: "bich.tran@email.com", points: 840, date: "15/02/2024" },
  { id: "KH003", name: "Lê Hoàng Cường", phone: "0923456789", email: "cuong.le@email.com", points: 2100, date: "20/02/2024" },
  { id: "KH004", name: "Phạm Minh Tâm", phone: "0934567890", email: "tam.pham@email.com", points: 150, date: "01/03/2024" },
  { id: "KH005", name: "Đặng Thu Thảo", phone: "0945678901", email: "thao.dang@email.com", points: 560, date: "10/03/2024" },
];

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Khách hàng thân thiết</h1>
          <p className="text-sm text-slate-500">Quản lý thông tin và điểm tích lũy của khách hàng</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#4A3B32] text-white rounded-lg text-sm font-medium hover:bg-[#6F4E37] transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Thêm khách hàng
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm theo tên, SĐT..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]">
              <option value="">Điểm tích lũy</option>
              <option value="high">Trên 1000 điểm (VIP)</option>
              <option value="medium">500 - 1000 điểm</option>
              <option value="low">Dưới 500 điểm</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">Mã KH</th>
                <th className="p-4 font-medium">Họ tên</th>
                <th className="p-4 font-medium">Số điện thoại</th>
                <th className="p-4 font-medium hidden md:table-cell">Email</th>
                <th className="p-4 font-medium text-right">Điểm tích lũy</th>
                <th className="p-4 font-medium hidden sm:table-cell">Ngày tham gia</th>
                <th className="p-4 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="p-4 font-medium text-slate-700">{customer.id}</td>
                  <td className="p-4 font-semibold text-slate-800">{customer.name}</td>
                  <td className="p-4 text-slate-600">{customer.phone}</td>
                  <td className="p-4 text-slate-600 hidden md:table-cell">{customer.email}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {customer.points}
                    </div>
                  </td>
                  <td className="p-4 text-slate-500 hidden sm:table-cell">{customer.date}</td>
                  <td className="p-4 text-right">
                    <button className="text-[#4A3B32] font-medium text-sm hover:underline">Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 text-center">
          <button className="text-sm font-medium text-slate-500 hover:text-slate-800">
            Tải thêm khách hàng...
          </button>
        </div>
      </div>
    </div>
  );
}
