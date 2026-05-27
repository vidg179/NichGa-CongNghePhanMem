import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Edit, Trash2, X, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getProducts, createProduct, updateProduct, deleteProduct, GetProductsParams } from "../services/productApi";
import { getCategories } from "../services/categoryApi";
import type { Product, Category, ProductStatus } from "../types/database";

export default function Products() {
  // State for data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // State for pagination & filtering
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProductStatus | "">("");
  
  // State for UI
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for current item (Edit/Delete)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    image: "",
    status: "Còn hàng" as ProductStatus,
    isHot: false,
    isNew: false,
  });

  // Fetch initial data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsRes, categoriesData] = await Promise.all([
        getProducts({ 
          page, 
          pageSize, 
          search: searchQuery, 
          category: categories.find(c => c.id === filterCategory)?.name || "", 
          status: filterStatus 
        }),
        getCategories()
      ]);
      
      setProducts(productsRes.data);
      setTotalPages(productsRes.totalPages);
      setTotalItems(productsRes.totalItems);
      setCategories(categoriesData);
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, searchQuery, filterCategory, filterStatus, categories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle input changes with debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // Reset page on filter change
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, filterCategory, filterStatus]);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      categoryId: categories.length > 0 ? categories[0].id : "",
      price: "",
      description: "",
      image: "",
      status: "Còn hàng",
      isHot: false,
      isNew: false,
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      status: product.status,
      isHot: product.isHot,
      isNew: product.isNew,
    });
    setIsModalOpen(true);
  };

  // Handle Form Submit (Create/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.categoryId || !formData.price) {
      toast.error("Vui lòng điền các trường bắt buộc (*)");
      return;
    }

    setIsSubmitting(true);
    
    const cat = categories.find(c => c.id === formData.categoryId);
    const categoryName = cat ? cat.name : "Khác";
    
    const productData = {
      name: formData.name,
      categoryId: formData.categoryId,
      category: categoryName,
      price: Number(formData.price),
      description: formData.description,
      image: formData.image || "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400&h=400", // Fallback image
      status: formData.status,
      isHot: formData.isHot,
      isNew: formData.isNew,
      sizes: { S: { surcharge: -3000 }, M: { surcharge: 0 }, L: { surcharge: 5000 } }
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await createProduct(productData);
        toast.success("Thêm sản phẩm mới thành công!");
      }
      setIsModalOpen(false);
      
      // Need to re-fetch slightly differently if we just added to page 1
      if (!editingProduct && page !== 1) {
        setPage(1);
      } else {
        fetchData(); // Refresh data
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    setIsSubmitting(true);
    try {
      const success = await deleteProduct(productToDelete.id);
      if (success) {
        toast.success("Đã xóa sản phẩm thành công!");
        // Adjust page if deleting last item on current page
        if (products.length === 1 && page > 1) {
          setPage(page - 1);
        } else {
          fetchData();
        }
      } else {
        toast.error("Không tìm thấy sản phẩm để xóa.");
      }
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm.");
    } finally {
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý Menu</h1>
          <p className="text-sm text-slate-500">Thêm, sửa, xóa các món trong thực đơn</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center px-4 py-2 bg-[#4A3B32] text-white rounded-lg text-sm font-medium hover:bg-[#6F4E37] transition-colors shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm món mới
        </button>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm món theo tên, mã..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] text-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all bg-white"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ProductStatus | "")}
              className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all bg-white"
            >
              <option value="">Trạng thái</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#4A3B32]" />
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-slate-600 font-medium">Không tìm thấy sản phẩm nào</p>
              <p className="text-sm mt-1">Thử thay đổi điều kiện tìm kiếm hoặc thêm sản phẩm mới</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Mã</th>
                  <th className="p-4 font-semibold">Hình ảnh</th>
                  <th className="p-4 font-semibold">Tên món</th>
                  <th className="p-4 font-semibold">Danh mục</th>
                  <th className="p-4 font-semibold">Giá</th>
                  <th className="p-4 font-semibold">Trạng thái</th>
                  <th className="p-4 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 font-medium text-slate-500">{product.id}</td>
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden bg-slate-50">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400&h=400';
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{product.name}</p>
                      <div className="flex gap-1 mt-1">
                        {product.isHot && <span className="text-[9px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-sm">HOT</span>}
                        {product.isNew && <span className="text-[9px] font-bold bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-sm">NEW</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-100/80 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-200/60">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[#4A3B32]">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        product.status === 'Còn hàng' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.status === 'Còn hàng' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 text-slate-400 hover:text-[#4A3B32] hover:bg-[#f8f5f2] rounded-lg transition-colors tooltip-trigger"
                          title="Sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setProductToDelete(product);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip-trigger"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {!isLoading && totalItems > 0 && (
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 bg-slate-50/50 gap-4">
            <span>
              Hiển thị <span className="font-medium text-slate-800">{(page - 1) * pageSize + 1}</span> - <span className="font-medium text-slate-800">{Math.min(page * pageSize, totalItems)}</span> của <span className="font-medium text-slate-800">{totalItems}</span> món
            </span>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent font-medium transition-colors"
              >
                Trước
              </button>
              
              {/* Simple pagination logic for demo */}
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && page > 3) {
                  pageNum = page - 3 + i + (page + 2 > totalPages ? totalPages - page - 2 : 0);
                  if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                }
                
                return (
                  <button 
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium transition-colors ${
                      page === pageNum 
                        ? 'bg-[#4A3B32] text-white shadow-sm border border-[#4A3B32]' 
                        : 'border border-slate-200 hover:bg-white text-slate-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent font-medium transition-colors"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h2 className="text-lg font-bold text-slate-800">
                {editingProduct ? 'Cập nhật món' : 'Thêm món mới'}
              </h2>
              <button 
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                disabled={isSubmitting}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tên món <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all" 
                      placeholder="VD: Cà phê sữa đá" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Danh mục <span className="text-red-500">*</span></label>
                    <select 
                      required
                      value={formData.categoryId}
                      onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all bg-white"
                    >
                      <option value="" disabled>Chọn danh mục</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Giá bán (VNĐ) <span className="text-red-500">*</span></label>
                    <input 
                      type="number"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all" 
                      placeholder="VD: 29000" 
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hình ảnh URL</label>
                    <div className="flex gap-3">
                      <input 
                        type="url" 
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all" 
                        placeholder="https://images.unsplash.com/..." 
                      />
                      {formData.image && (
                        <div className="w-11 h-11 shrink-0 rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Trạng thái</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as ProductStatus})}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all bg-white"
                    >
                      <option value="Còn hàng">Còn hàng</option>
                      <option value="Hết hàng">Hết hàng</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 justify-center mt-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox"
                          checked={formData.isHot}
                          onChange={(e) => setFormData({...formData, isHot: e.target.checked})}
                          className="w-5 h-5 border-2 border-slate-300 rounded-md appearance-none checked:bg-[#4A3B32] checked:border-[#4A3B32] transition-colors cursor-pointer"
                        />
                        <svg className={`absolute w-3.5 h-3.5 text-white left-0.5 top-0.5 pointer-events-none transition-opacity ${formData.isHot ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Đánh dấu là món Nổi bật (HOT)</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox"
                          checked={formData.isNew}
                          onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                          className="w-5 h-5 border-2 border-slate-300 rounded-md appearance-none checked:bg-[#4A3B32] checked:border-[#4A3B32] transition-colors cursor-pointer"
                        />
                        <svg className={`absolute w-3.5 h-3.5 text-white left-0.5 top-0.5 pointer-events-none transition-opacity ${formData.isNew ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Đánh dấu là món Mới (NEW)</span>
                    </label>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mô tả</label>
                    <textarea 
                      rows={3} 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A3B32]/20 focus:border-[#4A3B32] transition-all resize-none"
                      placeholder="Nhập mô tả cho món..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#4A3B32] text-white font-medium rounded-xl hover:bg-[#6F4E37] transition-all shadow-sm hover:shadow disabled:opacity-70 flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    editingProduct ? 'Cập nhật' : 'Thêm món'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Xóa sản phẩm</h3>
              <p className="text-slate-500 mb-1">Bạn có chắc chắn muốn xóa sản phẩm này?</p>
              <p className="font-semibold text-slate-800">"{productToDelete.name}"</p>
              <p className="text-xs text-red-500 mt-3 font-medium">Hành động này không thể hoàn tác!</p>
            </div>
            
            <div className="px-6 py-4 flex gap-3 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 py-2.5 font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isSubmitting}
                className="flex-1 py-2.5 font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
