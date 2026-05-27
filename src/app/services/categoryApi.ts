// ============================================================
// CF-19: Category API Service
// Mock API service cho Categories
// ============================================================

import type { Category } from "../types/database";
import { MOCK_CATEGORIES } from "../data/mockData";

// In-memory store
let categoriesStore: Category[] = [...MOCK_CATEGORIES];

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/categories — Lấy tất cả danh mục
 */
export async function getCategories(): Promise<Category[]> {
  await delay(200);
  return [...categoriesStore];
}

/**
 * GET /api/categories/:id — Lấy chi tiết 1 danh mục
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  await delay(200);
  return categoriesStore.find((c) => c.id === id) || null;
}

/**
 * POST /api/categories — Tạo danh mục mới
 */
export async function createCategory(
  data: Omit<Category, "id" | "createdAt" | "updatedAt" | "productCount">
): Promise<Category> {
  await delay(300);

  const maxNum = categoriesStore.reduce((max, c) => {
    const num = parseInt(c.id.replace("CAT", ""), 10);
    return num > max ? num : max;
  }, 0);

  const now = new Date().toISOString();
  const newCategory: Category = {
    ...data,
    id: `CAT${String(maxNum + 1).padStart(2, "0")}`,
    productCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  categoriesStore = [...categoriesStore, newCategory];
  return newCategory;
}

/**
 * PUT /api/categories/:id — Cập nhật danh mục
 */
export async function updateCategory(
  id: string,
  data: Partial<Omit<Category, "id" | "createdAt">>
): Promise<Category | null> {
  await delay(300);

  const index = categoriesStore.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated: Category = {
    ...categoriesStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  categoriesStore = categoriesStore.map((c) => (c.id === id ? updated : c));
  return updated;
}

/**
 * DELETE /api/categories/:id — Xóa danh mục
 */
export async function deleteCategory(id: string): Promise<boolean> {
  await delay(300);

  const index = categoriesStore.findIndex((c) => c.id === id);
  if (index === -1) return false;

  categoriesStore = categoriesStore.filter((c) => c.id !== id);
  return true;
}

/**
 * Helper: lấy tên danh mục theo ID
 */
export function getCategoryNameSync(id: string): string {
  const cat = categoriesStore.find((c) => c.id === id);
  return cat?.name || "Không xác định";
}
