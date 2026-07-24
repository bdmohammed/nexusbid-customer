import { useQuery } from "@tanstack/react-query";

import { categoryApi } from "./api";
import { categoryQueryKeys } from "./keys";
import { AppError } from "@/lib/errors/AppError";
import { ErrorCode } from "@/lib/errors/constants";
import type { CategoryQuery } from "../types";

/**
 * List active published categories (Public). Defaults to status: "PUBLISHED".
 */
export function useCategories(query?: CategoryQuery) {
  const queryParams: CategoryQuery = { status: "PUBLISHED", ...query };

  return useQuery({
    queryKey: categoryQueryKeys.list(queryParams),

    queryFn: async () => {
      const { data } = await categoryApi.getCategories(queryParams);

      if (!data.success) {
        throw new AppError(data.message, 400, data.error as ErrorCode);
      }

      if (data.data && typeof data.data === "object" && "categories" in data.data) {
        return (data.data as any).categories;
      }
      return data.data;
    },
  });
}

/**
 * Get category overview statistics (Public).
 */
export function useCategoryAnalytics() {
  return useQuery({
    queryKey: categoryQueryKeys.analytics(),

    queryFn: async () => {
      const { data } = await categoryApi.getCategoryAnalytics();

      if (!data.success) {
        throw new AppError(data.message, 400, data.error as ErrorCode);
      }

      return data.data;
    },
  });
}
