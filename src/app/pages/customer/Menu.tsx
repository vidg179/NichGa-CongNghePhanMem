import { useState } from "react";
import { Link } from "react-router";
import { Search, ShoppingBag } from "lucide-react";

export const MOCK_CUSTOMER_PRODUCTS = [
  { id: "P001", name: "Cà phê sữa đá", category: "Cà phê", price: 29000, description: "Cà phê phin truyền thống kết hợp với sữa đặc ngọt ngào.", image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "P002", name: "Bạc xỉu", category: "Cà phê", price: 29000, description: "Sữa tươi mát lạnh kết hợp với một chút cà phê đắng nhẹ.", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "P003", name: "Trà đào cam sả", category: "Trà", price: 39000, description: "Hương vị thanh mát của đào, chua chua của cam và thơm nồng của sả.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "P004", name: "Matcha Latte", category: "Đá xay", price: 45000, description: "Bột trà xanh Nhật Bản hòa quyện cùng sữa tươi.", image: "https://images.unsplash.com/photo-1536935338773-84f553f47ce5?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "P005", name: "Trà đen macchiato", category: "Trà", price: 42000, description: "Trà đen đậm vị phủ lớp macchiato béo ngậy.", image: "https://images.unsplash.com/photo-1517701550927-30cfcb64741e?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "P006", name: "Cà phê đen", category: "Cà phê", price: 25000, description: "Cà phê phin đen nguyên chất, đắng đậm đà.", image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=400&h=400" },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Tất cả", ...Array.from(new Set(MOCK_CUSTOMER_PRODUCTS.map(p => p.category)))];

  const filteredProducts = MOCK_CUSTOMER_PRODUCTS.filter(p => {
    const matchCategory = activeCategory === "Tất cả" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-[#4A3B32] mb-2">Thực đơn của chúng tôi</h2>
          <p className="text-slate-500">Khám phá những hương vị tuyệt vời được pha chế từ tâm huyết.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm đồ uống..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent text-sm shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-8 custom-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? "bg-[#4A3B32] text-white shadow-md scale-105" 
                : "bg-white text-slate-600 hover:bg-[#f8f5f2] border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Không tìm thấy sản phẩm nào</h3>
          <p className="text-slate-400 mt-2">Vui lòng thử lại với từ khóa khác.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-[#6F4E37]/20 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#4A3B32] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-[#4A3B32] transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                  <span className="font-bold text-[#4A3B32] text-lg">{formatPrice(product.price)}</span>
                  <div className="w-10 h-10 rounded-full bg-[#f8f5f2] flex items-center justify-center text-[#4A3B32] group-hover:bg-[#4A3B32] group-hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
