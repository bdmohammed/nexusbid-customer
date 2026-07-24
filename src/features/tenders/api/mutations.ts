import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenderApi } from "./api";
import { tenderQueryKeys } from "./keys";
import type { TenderQuestionInput, TenderWatchInput } from "../types";

/**
 * Get S3 document download URL
 */
export function useDownloadTender() {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await tenderApi.getDownloadUrl(id);
      //@ts-ignore
      return data.data.downloadUrl;
    },
  });
}

/**
 * Post question regarding a tender
 */
export function useAskTenderQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: TenderQuestionInput;
    }) => {
      const { data } = await tenderApi.postQuestion(id, input);
      return data;
    },

    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: tenderQueryKeys.all,
      });
    },
  });
}

/**
 * Toggle watch subscription for a tender
 */
export function useToggleWatchTender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input?: TenderWatchInput;
    }) => {
      const { data } = await tenderApi.toggleWatch(id, input);
      //@ts-ignore
      return data.data;
    },

    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: tenderQueryKeys.all,
      });
    },
  });
}
