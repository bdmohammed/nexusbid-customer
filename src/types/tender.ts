import { Category } from "./category";
import { State } from "./state";

export interface Tender {
  id: string;
  title: string;
  slug: string;
  refNumber: string | null;
  agency: string;
  deadline: string;
  postedDate: string;
  isFeatured: boolean;
  priceCents: number;
  categoryId: string;
  stateId: string;
  submissionType: "digital" | "physical" | "both";
  status: "draft" | "published" | "expired" | "archived";
  description?: string | null;
  eligibility?: string | null;
  contactInfo?: string | null;
  city?: string | null;
  documentOriginalName?: string | null;
  documentKey?: string | null;
  downloadUrl?: string | null;
  category?: Category;
  state?: State;
  createdAt: string;
  updatedAt: string;
}
