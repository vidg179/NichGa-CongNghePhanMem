// ============================================================
// CF-19: Product API Service
// Mock API service mô phỏng REST API cho Products
// Khi có backend thực sự, chỉ cần thay đổi implementation
// ============================================================

import type { Product, PaginatedResponse, ProductStatus } from "../types/database";
import { MOCK_PRODUCTS } from "../data/mockData";

// In-memory data store (simulates database)
let productsStore: Product[] = [...MOCK_PRODUCTS];

// Simulate async API delay
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate unique ID
const generateId = (): string => {
  const maxNum = productsStore.reduce((max, p) => {
    const num = parseInt(p.id.replace("P", ""), 10);
    return num > max ? num : max;
  }, 0);
  return `P${String(maxNum + 1).padStart(3, "0")}`;
};

// ---- API Methods ----

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  status?: ProductStatus | "";
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}

/**
 * GET /api/products — Lấy danh sách sản phẩm (có phân trang, tìm kiếm, lọc)
 */
export async function getProducts(params: GetProductsParams = {}): Promise<PaginatedResponse<Product>> {
  await delay();

  const {
    page = 1,
    pageSize = 5,
    search = "",
    category = "",
    status = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  let filtered = [...productsStore];

  // Search filter
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Status filter
  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }

  // Sorting
  filtered.sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      cmp = a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      cmp = a.price - b.price;
    } else {
      cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return sortOrder === "asc" ? cmp : -cmp;
  });

  // Pagination
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const data = filtered.slice(startIdx, startIdx + pageSize);

  return {
    data,
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
}

/**
 * GET /api/products/:id — Lấy chi tiết 1 sản phẩm
 */
export async function getProductById(id: string): Promise<Product | null> {
  await delay(200);
  return productsStore.find((p) => p.id === id) || null;
}

/**
 * POST /api/products — Tạo sản phẩm mới
 */
export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product> {
  await delay(400);

  const now = new Date().toISOString();
  const newProduct: Product = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  productsStore = [newProduct, ...productsStore];
  return newProduct;
}

/**
 * PUT /api/products/:id — Cập nhật sản phẩm
 */
export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product | null> {
  await delay(400);

  const index = productsStore.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: Product = {
    ...productsStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  productsStore = productsStore.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * DELETE /api/products/:id — Xóa sản phẩm
 */
export async function deleteProduct(id: string): Promise<boolean> {
  await delay(300);

  const index = productsStore.findIndex((p) => p.id === id);
  if (index === -1) return false;

  productsStore = productsStore.filter((p) => p.id !== id);
  return true;
}

/**
 * Helper: Lấy danh sách tất cả categories (unique) từ products
 */
export function getProductCategories(): string[] {
  const cats = new Set(productsStore.map((p) => p.category));
  return Array.from(cats).sort();
}
