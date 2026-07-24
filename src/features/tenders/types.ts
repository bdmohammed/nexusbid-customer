import { Tender } from "@/types";

export interface TenderQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  stateId?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  submissionType?: "digital" | "physical" | "both";
}

export interface TenderDetailsResponse {
  tender: Tender;
  hasAccess: boolean;
}

export interface TenderDownloadResponse {
  downloadUrl: string;
}

export interface TenderQuestionInput {
  questionText: string;
}

export interface TenderWatchInput {
  notifyEmail?: boolean;
  notifyInApp?: boolean;
}

export interface TenderStatistics {
  totalPublished: number;
  closingSoon: number;
  activeCategoriesCount: number;
}
