export interface Category {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string | null;
  status?: string;
  isActive: boolean;
}

export interface CategoryQuery {
  search?: string;
  code?: string;
  slug?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CategoryListResponse {
  categories: Category[];
  total: number;
  stats?: Record<string, any>;
}

export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
}
