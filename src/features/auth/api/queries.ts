import { useQuery } from "@tanstack/react-query";

import { authApi } from "./api";
import { authQueryKeys } from "./keys";
import { AppError } from "@/lib/errors/AppError";
import { ErrorCode } from "@/lib/errors/constants";

/**
 * Get currently authenticated user profile.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.me(),

    queryFn: async () => {
      const { data } = await authApi.me();

      if (!data.success) {
        throw new AppError(data.message, 400, data.error as ErrorCode);
      }

      return data.data;
    },

    retry: false,
  });
}

/**
 * Check whether user has a valid session.
 */
export function useSession() {
  return useQuery({
    queryKey: authQueryKeys.session(),

    queryFn: async () => {
      const { data } = await authApi.me();

      if (!data.success) {
        throw new AppError(data.message, 400, data.error as ErrorCode);
      }

      return data.data;
    },

    staleTime: Infinity,
    retry: false,
  });
}

/**
 * Get active user login sessions.
 */
export function useSessions() {
  return useQuery({
    queryKey: authQueryKeys.sessions(),

    queryFn: async () => {
      const { data } = await authApi.getSessions();

      if (!data.success) {
        throw new AppError(data.message, 400, data.error as ErrorCode);
      }

      return data.data;
    },
  });
}

/**
 * Get customer login devices.
 */
export function useDevices() {
  return useQuery({
    queryKey: authQueryKeys.devices(),

    queryFn: async () => {
      const { data } = await authApi.getDevices();

      if (!data.success) {
        throw new AppError(data.message, 400, data.error as ErrorCode);
      }

      return data.data;
    },
  });
}

/**
 * Get CSRF token.
 */
export function useCsrfToken() {
  return useQuery({
    queryKey: authQueryKeys.csrf(),

    queryFn: async () => {
      const { data } = await authApi.getCsrfToken();

      if (!data.success) {
        throw new AppError(data.message, 400, data.error as ErrorCode);
      }

      return data.data;
    },
    staleTime: Infinity,
  });
}
