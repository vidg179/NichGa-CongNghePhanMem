import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const mockProducts = [
  { id: "P001", name: "Cà phê sữa đá", category: "Cà phê Việt", price: "29,000", status: "Còn hàng", image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: "P002", name: "Bạc xỉu", category: "Cà phê Việt", price: "29,000", status: "Còn hàng", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: "P003", name: "Trà đào cam sả", category: "Trà trái cây", price: "39,000", status: "Còn hàng", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: "P004", name: "Matcha Latte", category: "Đá xay", price: "45,000", status: "Hết hàng", image: "https://images.unsplash.com/photo-1536935338773-84f553f47ce5?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: "P005", name: "Cà phê đen", category: "Cà phê Việt", price: "25,000", status: "Còn hàng", image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=200&h=200" },
];

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý Menu</h1>
          <p className="text-sm text-slate-500">Thêm, sửa, xóa các món trong thực đơn</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#4A3B32] text-white rounded-lg text-sm font-medium hover:bg-[#6F4E37] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm món mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm món..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]">
              <option value="">Tất cả danh mục</option>
              <option value="cf">Cà phê Việt</option>
              <option value="tea">Trà trái cây</option>
              <option value="ice">Đá xay</option>
            </select>
            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]">
              <option value="">Trạng thái</option>
              <option value="in">Còn hàng</option>
              <option value="out">Hết hàng</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">Mã món</th>
                <th className="p-4 font-medium">Hình ảnh</th>
                <th className="p-4 font-medium">Tên món</th>
                <th className="p-4 font-medium">Danh mục</th>
                <th className="p-4 font-medium">Giá</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{product.id}</td>
                  <td className="p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                    />
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{product.name}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 px-2 py-1 rounded-md text-xs">{product.category}</span>
                  </td>
                  <td className="p-4 font-medium text-[#4A3B32]">{product.price}đ</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 'Còn hàng' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
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
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span>Hiển thị 1 - 5 của 24 món</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">Trước</button>
            <button className="px-3 py-1 bg-[#4A3B32] text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">3</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">Sau</button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Thêm món mới</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên món</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3B32]" placeholder="VD: Cà phê sữa đá" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3B32]">
                    <option>Cà phê Việt</option>
                    <option>Trà trái cây</option>
                    <option>Đá xay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Giá (VNĐ)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3B32]" placeholder="29000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hình ảnh URL</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3B32]" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3B32]">
                  <option>Còn hàng</option>
                  <option>Hết hàng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3B32]"></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#4A3B32] text-white font-medium rounded-lg hover:bg-[#6F4E37] transition-colors"
              >
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
