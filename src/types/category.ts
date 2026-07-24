export interface Category {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  activeTenderCount?: number;
  createdAt: string;
  updatedAt: string;
}
