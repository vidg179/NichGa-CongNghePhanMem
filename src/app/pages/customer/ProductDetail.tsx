import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { MOCK_CUSTOMER_PRODUCTS } from "./Menu";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = MOCK_CUSTOMER_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate("/menu")} className="text-[#4A3B32] hover:underline font-medium">
          Quay lại thực đơn
        </button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      <Link to="/menu" className="inline-flex items-center text-slate-500 hover:text-[#4A3B32] font-medium mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Quay lại thực đơn
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-slate-50">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-2">
            <span className="inline-block bg-[#f8f5f2] text-[#4A3B32] text-sm font-bold px-4 py-1.5 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-[#4A3B32] mb-6">{formatPrice(product.price)}</p>
          
          <div className="prose text-slate-600 mb-8">
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-slate-200 rounded-2xl p-1 bg-white h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-[#4A3B32] hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg text-slate-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-[#4A3B32] hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg transition-all duration-300 w-full sm:w-auto ${
                  isAdded 
                    ? "bg-green-500 text-white" 
                    : "bg-[#4A3B32] text-white hover:bg-[#6F4E37] hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Đã thêm vào giỏ
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-6 h-6" />
                    Thêm vào giỏ hàng
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center sm:text-left">
              * Giá đã bao gồm VAT. Hình ảnh chỉ mang tính chất minh họa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
