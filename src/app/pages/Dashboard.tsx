import { useState } from "react";
import { 
  DollarSign, 
  ShoppingBag, 
  Coffee, 
  Users, 
  Download,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const revenueData = [
  { name: 'T2', total: 1200000 },
  { name: 'T3', total: 2100000 },
  { name: 'T4', total: 1800000 },
  { name: 'T5', total: 2400000 },
  { name: 'T6', total: 3200000 },
  { name: 'T7', total: 4500000 },
  { name: 'CN', total: 4100000 },
];

const bestSellersData = [
  { name: 'Cà phê sữa đá', sales: 120 },
  { name: 'Bạc xỉu', sales: 98 },
  { name: 'Trà đào cam sả', sales: 86 },
  { name: 'Matcha Latte', sales: 65 },
  { name: 'Cà phê đen', sales: 45 },
];

const recentOrders = [
  { id: '#ORD-001', table: 'Bàn 01', amount: '120.000đ', status: 'Hoàn thành', time: '10:45 AM' },
  { id: '#ORD-002', table: 'Bàn 05', amount: '85.000đ', status: 'Đang chuẩn bị', time: '10:50 AM' },
  { id: '#ORD-003', table: 'Mang đi', amount: '45.000đ', status: 'Hoàn thành', time: '10:55 AM' },
  { id: '#ORD-004', table: 'Bàn 12', amount: '210.000đ', status: 'Chờ thanh toán', time: '11:00 AM' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tổng quan hôm nay</h1>
          <p className="text-sm text-slate-500">Xem thống kê và tình hình kinh doanh quán cà phê</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Doanh thu hôm nay" 
          value="4.520.000đ" 
          icon={<DollarSign className="w-5 h-5 text-white" />} 
          color="bg-[#4A3B32]"
          trend="+15%"
        />
        <StatCard 
          title="Số đơn hàng" 
          value="124" 
          icon={<ShoppingBag className="w-5 h-5 text-[#4A3B32]" />} 
          color="bg-[#A8E6CF]"
          trend="+8%"
        />
        <StatCard 
          title="Bàn đang sử dụng" 
          value="8 / 20" 
          icon={<Coffee className="w-5 h-5 text-slate-700" />} 
          color="bg-[#F5F5DC]"
          trend="Bận rộn"
          trendColor="text-orange-600"
        />
        <StatCard 
          title="Khách hàng thân thiết" 
          value="1,245" 
          icon={<Users className="w-5 h-5 text-white" />} 
          color="bg-slate-800"
          trend="+12 mới"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800">Doanh thu 7 ngày qua</h3>
            <select className="text-sm border-slate-200 rounded-lg bg-slate-50 px-3 py-1.5 outline-none">
              <option>Tuần này</option>
              <option>Tuần trước</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(val) => `${val / 1000000}M`} />
                <Tooltip 
                  formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="total" stroke="#4A3B32" strokeWidth={3} dot={{r: 4, fill: '#4A3B32'}} activeDot={{r: 6, fill: '#A8E6CF', stroke: '#4A3B32'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-6">Món bán chạy nhất</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestSellersData} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#334155', fontSize: 12}} width={100} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="sales" fill="#A8E6CF" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Đơn hàng gần đây</h3>
          <button className="text-sm text-[#4A3B32] font-medium hover:underline">Xem tất cả</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">Mã đơn</th>
                <th className="p-4 font-medium">Bàn</th>
                <th className="p-4 font-medium">Thời gian</th>
                <th className="p-4 font-medium">Tổng tiền</th>
                <th className="p-4 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{order.id}</td>
                  <td className="p-4 text-slate-600">{order.table}</td>
                  <td className="p-4 text-slate-500">{order.time}</td>
                  <td className="p-4 font-medium text-slate-800">{order.amount}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                      order.status === 'Đang chuẩn bị' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
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

function StatCard({ title, value, icon, color, trend, trendColor = "text-emerald-600" }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${trendColor}`}>
          {trend.includes('+') && <TrendingUp className="w-4 h-4 mr-1" />}
          {trend}
        </span>
        <span className="text-slate-400 ml-2">so với hôm qua</span>
      </div>
    </div>
  );
}
