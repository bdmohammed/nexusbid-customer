import { apiClient } from "@/lib/http";
import type { ApiResponse } from "@/types";
import type { CategoryListResponse, CategoryQuery, CategoryStats } from "../types";

export const categoryApi = {
  /**
   * List all active published categories (Public)
   */
  getCategories(query?: CategoryQuery) {
    return apiClient.get<ApiResponse<CategoryListResponse>>("/categories", {
      params: query,
    });
  },

  /**
   * Get category analytics & stats (Public)
   */
  getCategoryAnalytics() {
    return apiClient.get<ApiResponse<CategoryStats>>("/categories/analytics");
  },
};
