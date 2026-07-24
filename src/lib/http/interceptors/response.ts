// src/lib/http/interceptors/response.ts

import { AxiosInstance } from "axios";

import { clearCsrfToken, fetchCsrfToken } from "../csrf";
import { HTTP_STATUS, AUTH_ENDPOINTS } from "../constants";
import { refreshSession } from "../refresh";
import { ApiAxiosError, RetryRequestConfig } from "../types";
import { normalizeError } from "@/lib/errors";

/**
 * Register response interceptor.
 */
export function setupResponseInterceptor(api: AxiosInstance): void {
  api.interceptors.response.use(
    (response) => response,

    async (error: ApiAxiosError) => {
      const originalRequest = error.config as RetryRequestConfig;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      /**
       * ------------------------------------------------------------
       * 419 - Invalid / Expired CSRF Token
       * ------------------------------------------------------------
       */
      if (
        error.response?.status === HTTP_STATUS.CSRF_TOKEN_INVALID &&
        !originalRequest._csrfRetry
      ) {
        originalRequest._csrfRetry = true;
        clearCsrfToken();
        await fetchCsrfToken();
        return api(originalRequest);
      }

      /**
       * ------------------------------------------------------------
       * 401 - Access Token Expired
       * Exclude /auth/me, /auth/refresh, /auth/login, /auth/register, /auth/logout
       * from triggering refreshSession on 401.
       * ------------------------------------------------------------
       */
      const requestUrl = originalRequest.url || "";
      const isAuthBypassUrl =
        requestUrl.includes(AUTH_ENDPOINTS.ME) ||
        requestUrl.includes(AUTH_ENDPOINTS.REFRESH) ||
        requestUrl.includes(AUTH_ENDPOINTS.LOGIN) ||
        requestUrl.includes(AUTH_ENDPOINTS.REGISTER) ||
        requestUrl.includes(AUTH_ENDPOINTS.LOGOUT) ||
        requestUrl.includes(AUTH_ENDPOINTS.CSRF_TOKEN);

      if (
        error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
        !originalRequest._retry &&
        !isAuthBypassUrl
      ) {
        originalRequest._retry = true;
        try {
          await refreshSession();
          return api(originalRequest);
        } catch (refreshError) {
          clearCsrfToken();
          return Promise.reject(normalizeError(refreshError));
        }
      }

      return Promise.reject(normalizeError(error));
    },
  );
}
