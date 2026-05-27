import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const mockCategories = [
  { id: "CAT01", name: "Cà phê Việt", desc: "Các loại cà phê pha phin truyền thống", count: 12 },
  { id: "CAT02", name: "Trà trái cây", desc: "Trà kết hợp trái cây tươi mát lạnh", count: 8 },
  { id: "CAT03", name: "Đá xay (Ice Blended)", desc: "Thức uống xay với đá mát lạnh", count: 6 },
  { id: "CAT04", name: "Bánh ngọt", desc: "Bánh ăn kèm cà phê", count: 15 },
  { id: "CAT05", name: "Nước ép", desc: "Nước ép nguyên chất", count: 5 },
];

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Danh mục món</h1>
          <p className="text-sm text-slate-500">Quản lý các nhóm thức uống và đồ ăn</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#4A3B32] text-white rounded-lg text-sm font-medium hover:bg-[#6F4E37] transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm danh mục..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">Mã danh mục</th>
                <th className="p-4 font-medium">Tên danh mục</th>
                <th className="p-4 font-medium">Mô tả</th>
                <th className="p-4 font-medium text-center">Số lượng món</th>
                <th className="p-4 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{cat.id}</td>
                  <td className="p-4 font-semibold text-slate-800">{cat.name}</td>
                  <td className="p-4 text-slate-500 max-w-xs truncate">{cat.desc}</td>
                  <td className="p-4 text-center">
                    <span className="bg-[#A8E6CF]/20 text-emerald-700 px-2 py-1 rounded-md font-medium">
                      {cat.count}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-[#4A3B32] hover:bg-slate-100 rounded-md transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
