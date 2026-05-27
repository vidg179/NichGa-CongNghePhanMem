// ============================================================
// CF-18: Database Schema — TypeScript Interfaces / Models
// Mô tả: Định nghĩa cấu trúc dữ liệu cho toàn bộ hệ thống
// NichGa Coffee Shop Management System
// ============================================================

// ---- Shared / Common Types ----

export type ProductStatus = "Còn hàng" | "Hết hàng";
export type OrderStatus = "Chờ xác nhận" | "Đang chuẩn bị" | "Hoàn thành" | "Đã hủy" | "Chờ thanh toán";
export type PaymentMethod = "cash" | "bank" | "wallet";
export type PaymentStatus = "Chưa thanh toán" | "Đã thanh toán" | "Hoàn tiền";
export type TableStatus = "Trống" | "Đang sử dụng" | "Đã đặt trước" | "Bảo trì";
export type UserRole = "admin" | "staff" | "manager";
export type UserStatus = "Hoạt động" | "Khóa";
export type DiningOption = "dine-in" | "takeaway";
export type DrinkSize = "S" | "M" | "L";

// ---- Category ----

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// ---- Product ----

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  category: string; // category name for display
  price: number;
  description: string;
  image: string;
  status: ProductStatus;
  sizes: {
    S: { surcharge: number };
    M: { surcharge: number };
    L: { surcharge: number };
  };
  isHot: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---- Order ----

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  qty: number;
  size: DrinkSize;
  ice: string;
  sugar: string;
  unitPrice: number;
  surcharge: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customerId?: string;
  customerName: string;
  customerPhone: string;
  diningOption: DiningOption;
  tableId?: string;
  tableNumber?: string;
  orderNote: string;
  subtotal: number;
  discountAmount: number;
  promoCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// ---- Payment ----

export interface Payment {
  id: string;
  orderId: string;
  orderNumber: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionRef?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Customer ----

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}

// ---- User (Admin/Staff) ----

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: UserStatus;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Table ----

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
  floor: number;
  createdAt: string;
  updatedAt: string;
}

// ---- API Response Types ----

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
