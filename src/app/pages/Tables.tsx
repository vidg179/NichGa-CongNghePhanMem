import { useState } from "react";
import { Plus, Users } from "lucide-react";

const mockTables = [
  { id: "T01", name: "Bàn 01", seats: 4, status: "Trống" },
  { id: "T02", name: "Bàn 02", seats: 2, status: "Đang sử dụng", time: "45p", amount: "125K" },
  { id: "T03", name: "Bàn 03", seats: 4, status: "Trống" },
  { id: "T04", name: "Bàn 04", seats: 6, status: "Đã đặt", time: "18:00" },
  { id: "T05", name: "Bàn 05", seats: 2, status: "Trống" },
  { id: "T06", name: "Bàn VIP 1", seats: 8, status: "Đang sử dụng", time: "1h20p", amount: "540K" },
  { id: "T07", name: "Bàn 07", seats: 4, status: "Đang sử dụng", time: "10p", amount: "65K" },
  { id: "T08", name: "Bàn 08", seats: 2, status: "Trống" },
  { id: "T09", name: "Bàn 09", seats: 4, status: "Đã đặt", time: "19:30" },
  { id: "T10", name: "Bàn 10", seats: 4, status: "Trống" },
];

export default function Tables() {
  const [filter, setFilter] = useState("all");

  const filteredTables = filter === "all" 
    ? mockTables 
    : mockTables.filter(t => t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý Bàn</h1>
          <p className="text-sm text-slate-500">Theo dõi trạng thái các bàn trong quán</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#4A3B32] text-white rounded-lg text-sm font-medium hover:bg-[#6F4E37] transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Thêm bàn mới
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button 
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-[#4A3B32] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          Tất cả (10)
        </button>
        <button 
          onClick={() => setFilter("Trống")}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === 'Trống' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          <span className={`w-2 h-2 rounded-full ${filter === 'Trống' ? 'bg-white' : 'bg-emerald-500'}`}></span>
          Trống (5)
        </button>
        <button 
          onClick={() => setFilter("Đang sử dụng")}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === 'Đang sử dụng' ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          <span className={`w-2 h-2 rounded-full ${filter === 'Đang sử dụng' ? 'bg-white' : 'bg-orange-500'}`}></span>
          Đang sử dụng (3)
        </button>
        <button 
          onClick={() => setFilter("Đã đặt")}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === 'Đã đặt' ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          <span className={`w-2 h-2 rounded-full ${filter === 'Đã đặt' ? 'bg-white' : 'bg-blue-500'}`}></span>
          Đã đặt (2)
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredTables.map((table) => {
          let bgColor = "bg-white border-slate-200";
          let statusColor = "text-emerald-500";
          let shadow = "shadow-sm";
          
          if (table.status === "Đang sử dụng") {
            bgColor = "bg-orange-50 border-orange-200";
            statusColor = "text-orange-500";
            shadow = "shadow-md shadow-orange-100/50";
          } else if (table.status === "Đã đặt") {
            bgColor = "bg-blue-50 border-blue-200";
            statusColor = "text-blue-500";
          }

          return (
            <div 
              key={table.id} 
              className={`p-4 rounded-2xl border ${bgColor} ${shadow} hover:shadow-md transition-all cursor-pointer flex flex-col h-32 relative overflow-hidden group`}
            >
              <div className="flex justify-between items-start mb-auto">
                <span className="font-bold text-slate-800 text-lg">{table.name}</span>
                <span className="flex items-center text-xs font-medium text-slate-500 bg-white/60 px-2 py-1 rounded-md">
                  <Users className="w-3 h-3 mr-1" />
                  {table.seats}
                </span>
              </div>
              
              <div className="mt-4">
                <div className={`text-xs font-semibold ${statusColor} mb-1`}>
                  {table.status}
                </div>
                {(table.status === "Đang sử dụng") && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">{table.time}</span>
                    <span className="font-bold text-slate-700">{table.amount}</span>
                  </div>
                )}
                {table.status === "Đã đặt" && (
                  <div className="text-xs text-slate-600 font-medium">
                    Tới lúc: {table.time}
                  </div>
                )}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-[#4A3B32]/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-[#A8E6CF] text-[#4A3B32] px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  {table.status === "Trống" ? "Tạo đơn" : "Xem đơn"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
