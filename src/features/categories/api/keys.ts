export const categoryQueryKeys = {
  all: ["categories"] as const,
  list: (query?: unknown) => [...categoryQueryKeys.all, "list", query] as const,
  analytics: () => [...categoryQueryKeys.all, "analytics"] as const,
};
