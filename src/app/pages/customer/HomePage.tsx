import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Coffee, ArrowRight, ShoppingBag, Star, Sparkles,
  Clock, Award, Heart, MapPin, ChevronRight
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { MOCK_CUSTOMER_PRODUCTS } from "./Menu";

export default function HomePage() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Hương vị cà phê\nđậm đà từ tâm huyết",
      subtitle: "Mỗi giọt cà phê tại NichGa đều được chọn lọc kỹ lưỡng từ những vùng đất trồng tốt nhất Việt Nam.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200",
      cta: "Khám phá thực đơn",
    },
    {
      title: "Trà trái cây\ntươi mát mỗi ngày",
      subtitle: "Thưởng thức những ly trà trái cây tự nhiên, giải khát tức thì cho ngày dài năng động.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=1200",
      cta: "Xem trà trái cây",
    },
    {
      title: "Không gian thư giãn\ncho mọi khoảnh khắc",
      subtitle: "NichGa Coffee — nơi bạn tìm thấy sự bình yên giữa nhịp sống hối hả.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200",
      cta: "Tìm hiểu thêm",
    },
  ];

  const categories = [
    {
      name: "Cà phê",
      description: "Đậm đà hương vị Việt",
      icon: "☕",
      color: "from-amber-800 to-amber-600",
      count: MOCK_CUSTOMER_PRODUCTS.filter((p) => p.category === "Cà phê").length,
    },
    {
      name: "Trà",
      description: "Thanh mát tự nhiên",
      icon: "🍵",
      color: "from-emerald-700 to-emerald-500",
      count: MOCK_CUSTOMER_PRODUCTS.filter((p) => p.category === "Trà").length,
    },
    {
      name: "Đá xay",
      description: "Mát lạnh sảng khoái",
      icon: "🧊",
      color: "from-sky-600 to-sky-400",
      count: MOCK_CUSTOMER_PRODUCTS.filter((p) => p.category === "Đá xay").length,
    },
  ];

  const featuredProducts = MOCK_CUSTOMER_PRODUCTS.slice(0, 4);

  const stats = [
    { icon: Coffee, value: "10+", label: "Loại cà phê" },
    { icon: Heart, value: "5000+", label: "Khách hàng" },
    { icon: Award, value: "100%", label: "Nguyên liệu sạch" },
    { icon: Clock, value: "7:00-22:00", label: "Giờ mở cửa" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: typeof MOCK_CUSTOMER_PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#4A3B32] min-h-[85vh] flex items-center">
        {/* Background slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A3B32]/95 via-[#4A3B32]/70 to-transparent" />
          </div>
        ))}

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#A8E6CF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full">
          <div
            className={`max-w-2xl transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-white/10">
              <Sparkles className="w-4 h-4 text-[#A8E6CF]" />
              <span>Chào mừng đến NichGa Coffee</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 whitespace-pre-line">
              {heroSlides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center px-8 py-4 bg-[#A8E6CF] text-[#4A3B32] rounded-2xl font-bold text-lg hover:bg-[#8fd4b8] transition-all hover:shadow-xl hover:-translate-y-0.5 group"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Giỏ hàng
              </Link>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === index
                    ? "bg-[#A8E6CF] w-10"
                    : "bg-white/30 w-5 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-12 z-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 bg-[#f8f5f2] rounded-2xl flex items-center justify-center text-[#4A3B32] group-hover:bg-[#4A3B32] group-hover:text-white transition-all duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="block text-2xl font-extrabold text-[#4A3B32]">{stat.value}</span>
                <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CATEGORIES SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 bg-[#fcfbf9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-bold text-[#4A3B32] uppercase tracking-widest mb-3 bg-[#f8f5f2] px-4 py-1.5 rounded-full">
              Danh mục
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A3B32] mb-4">
              Khám phá theo danh mục
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Chọn loại thức uống yêu thích của bạn và bắt đầu trải nghiệm hương vị.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                to="/menu"
                key={cat.name}
                className="group relative overflow-hidden rounded-3xl p-8 text-white min-h-[200px] flex flex-col justify-end hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                
                {/* Decorative circle */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  <span className="text-5xl mb-4 block">{cat.icon}</span>
                  <h3 className="text-2xl font-extrabold mb-1">{cat.name}</h3>
                  <p className="text-white/80 text-sm mb-3">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {cat.count} sản phẩm
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-sm font-bold text-[#4A3B32] uppercase tracking-widest mb-3 bg-[#f8f5f2] px-4 py-1.5 rounded-full">
                Nổi bật
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A3B32]">
                Sản phẩm yêu thích
              </h2>
            </div>
            <Link
              to="/menu"
              className="group inline-flex items-center text-[#4A3B32] font-bold hover:text-[#6F4E37] transition-colors"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-[#6F4E37]/20 transition-all duration-300 flex flex-col h-full"
                style={{ animationDelay: `${index * 100}ms` }}
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
                  {/* Hot badge on first 2 */}
                  {index < 2 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" fill="currentColor" />
                        HOT
                      </span>
                    </div>
                  )}
                  {/* Quick add overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white text-[#4A3B32] font-bold px-5 py-2.5 rounded-2xl shadow-lg hover:bg-[#4A3B32] hover:text-white text-sm flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Thêm nhanh
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-[#4A3B32] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="font-bold text-[#4A3B32] text-lg">
                      {formatPrice(product.price)}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#f8f5f2] flex items-center justify-center text-[#4A3B32] group-hover:bg-[#4A3B32] group-hover:text-white transition-colors">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ABOUT / WHY CHOOSE US
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 bg-[#f8f5f2]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600"
                    alt="Coffee beans"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="bg-[#4A3B32] rounded-3xl p-6 text-center">
                  <Coffee className="w-8 h-8 text-[#A8E6CF] mx-auto mb-2" />
                  <span className="text-white font-bold text-sm block">
                    Rang xay thủ công
                  </span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-[#A8E6CF] rounded-3xl p-6 text-center">
                  <Award className="w-8 h-8 text-[#4A3B32] mx-auto mb-2" />
                  <span className="text-[#4A3B32] font-bold text-sm block">
                    Chất lượng hàng đầu
                  </span>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600"
                    alt="Coffee shop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Text content */}
            <div>
              <span className="inline-block text-sm font-bold text-[#4A3B32] uppercase tracking-widest mb-3 bg-white px-4 py-1.5 rounded-full">
                Về chúng tôi
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A3B32] mb-6 leading-tight">
                Tại sao chọn<br />NichGa Coffee?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                NichGa Coffee không chỉ là một quán cà phê — đó là một trải nghiệm. 
                Chúng tôi tuyển chọn những hạt cà phê tốt nhất từ các vùng cao nguyên Việt Nam, 
                rang xay thủ công với công nghệ hiện đại để mang đến hương vị đậm đà nhất.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Nguyên liệu 100% tự nhiên, không chất bảo quản",
                  "Pha chế bởi barista chuyên nghiệp",
                  "Không gian thiết kế hiện đại, ấm cúng",
                  "Giao hàng tận nơi trong 30 phút",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#A8E6CF] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#4A3B32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/menu"
                className="inline-flex items-center px-8 py-4 bg-[#4A3B32] text-white rounded-2xl font-bold text-lg hover:bg-[#6F4E37] transition-all hover:shadow-lg hover:-translate-y-0.5 group"
              >
                Đặt hàng ngay
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 bg-[#4A3B32] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#A8E6CF]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/10">
            <MapPin className="w-4 h-4 text-[#A8E6CF]" />
            <span>123 Đường Cà Phê, Quận 1, TP.HCM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Sẵn sàng thưởng thức<br />cà phê tuyệt hảo?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Đặt hàng online ngay để được giao tận nơi hoặc ghé thăm quán để trải nghiệm không gian độc đáo.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-flex items-center px-8 py-4 bg-[#A8E6CF] text-[#4A3B32] rounded-2xl font-bold text-lg hover:bg-[#8fd4b8] transition-all hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Đặt hàng ngay
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
