import { useState } from "react";
import { Link } from "react-router";
import { Search, ShoppingBag, SlidersHorizontal, ArrowUpDown, Star, X, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const MOCK_CUSTOMER_PRODUCTS = [
  { id: "P001", name: "Cà phê sữa đá", category: "Cà phê", price: 29000, description: "Cà phê phin truyền thống kết hợp với sữa đặc ngọt ngào.", image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=400&h=400", isHot: true, isNew: false },
  { id: "P002", name: "Bạc xỉu", category: "Cà phê", price: 29000, description: "Sữa tươi mát lạnh kết hợp với một chút cà phê đắng nhẹ.", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400&h=400", isHot: true, isNew: false },
  { id: "P003", name: "Trà đào cam sả", category: "Trà", price: 39000, description: "Hương vị thanh mát của đào, chua chua của cam và thơm nồng của sả.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400&h=400", isHot: false, isNew: true },
  { id: "P004", name: "Matcha Latte", category: "Đá xay", price: 45000, description: "Bột trà xanh Nhật Bản hòa quyện cùng sữa tươi.", image: "https://images.unsplash.com/photo-1536935338773-84f553f47ce5?auto=format&fit=crop&q=80&w=400&h=400", isHot: false, isNew: true },
  { id: "P005", name: "Trà đen macchiato", category: "Trà", price: 42000, description: "Trà đen đậm vị phủ lớp macchiato béo ngậy.", image: "https://images.unsplash.com/photo-1517701550927-30cfcb64741e?auto=format&fit=crop&q=80&w=400&h=400", isHot: false, isNew: false },
  { id: "P006", name: "Cà phê đen", category: "Cà phê", price: 25000, description: "Cà phê phin đen nguyên chất, đắng đậm đà.", image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=400&h=400", isHot: false, isNew: false },
];

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const { addToCart } = useCart();

  const categories = ["Tất cả", ...Array.from(new Set(MOCK_CUSTOMER_PRODUCTS.map(p => p.category)))];

  let filteredProducts = MOCK_CUSTOMER_PRODUCTS.filter(p => {
    const matchCategory = activeCategory === "Tất cả" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Apply sorting
  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const sortLabels: Record<SortOption, string> = {
    "default": "Mặc định",
    "price-asc": "Giá: Thấp → Cao",
    "price-desc": "Giá: Cao → Thấp",
    "name-asc": "Tên: A → Z",
  };

  const handleQuickAdd = (e: React.MouseEvent, product: typeof MOCK_CUSTOMER_PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/" className="hover:text-[#4A3B32] transition-colors font-medium">Trang chủ</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#4A3B32] font-semibold">Thực đơn</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-[#4A3B32] mb-2">Thực đơn của chúng tôi</h2>
          <p className="text-slate-500">Khám phá những hương vị tuyệt vời được pha chế từ tâm huyết.</p>
        </div>
        
        {/* Search bar with enhanced UX */}
        <div className={`relative w-full md:w-80 transition-all duration-300 ${isSearchFocused ? 'md:w-96' : ''}`}>
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isSearchFocused ? 'text-[#4A3B32]' : 'text-slate-400'}`} />
          <input 
            type="text" 
            placeholder="Tìm kiếm đồ uống..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full pl-11 pr-10 py-3 bg-white rounded-2xl border focus:outline-none focus:ring-2 focus:ring-[#4A3B32] focus:border-transparent text-sm shadow-sm transition-all ${
              isSearchFocused ? 'border-[#4A3B32] shadow-md' : 'border-slate-200'
            }`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category tabs + Sort controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Category tabs */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 custom-scrollbar w-full sm:w-auto">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-[#4A3B32] text-white shadow-md scale-105" 
                  : "bg-white text-slate-600 hover:bg-[#f8f5f2] border border-slate-200 hover:border-[#4A3B32]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-[#4A3B32]/30 hover:text-[#4A3B32] transition-all"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{sortLabels[sortBy]}</span>
          </button>

          {showSortDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl z-20 w-52 py-2 overflow-hidden">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSortBy(key); setShowSortDropdown(false); }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                      sortBy === key
                        ? "bg-[#f8f5f2] text-[#4A3B32] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Hiển thị <span className="font-bold text-[#4A3B32]">{filteredProducts.length}</span> sản phẩm
          {activeCategory !== "Tất cả" && (
            <span> trong danh mục <span className="font-semibold text-[#4A3B32]">{activeCategory}</span></span>
          )}
          {searchQuery && (
            <span> cho "<span className="font-semibold text-[#4A3B32]">{searchQuery}</span>"</span>
          )}
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-600 mb-2">Không tìm thấy sản phẩm nào</h3>
          <p className="text-slate-400 mb-6">Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác.</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("Tất cả"); }}
            className="inline-flex items-center px-6 py-2.5 bg-[#4A3B32] text-white rounded-xl font-semibold hover:bg-[#6F4E37] transition-all"
          >
            Xóa bộ lọc
          </button>
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
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#4A3B32] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Hot / New badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                  {product.isHot && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3" fill="currentColor" />
                      HOT
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      MỚI
                    </span>
                  )}
                </div>

                {/* Quick add overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white text-[#4A3B32] font-bold px-5 py-2.5 rounded-2xl shadow-lg hover:bg-[#4A3B32] hover:text-white text-sm flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Thêm vào giỏ
                  </button>
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
