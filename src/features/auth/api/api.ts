import { apiClient } from "@/lib/http";

import type {
  AuthResponse,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  User,
} from "../types";

import type { ApiResponse } from "@/types";

export const authApi = {
  /**
   * Login
   */
  login(dto: LoginDto) {
    return apiClient.post<ApiResponse<AuthResponse>>("/auth/login", dto);
  },

  /**
   * Register
   */
  register(payload: RegisterDto) {
    return apiClient.post<ApiResponse<AuthResponse>>("/auth/register", payload);
  },

  /**
   * Logout
   */
  logout() {
    return apiClient.post<ApiResponse<void>>("/auth/logout");
  },

  /**
   * Current User
   */
  me() {
    return apiClient.get<ApiResponse<User>>("/auth/me");
  },

  /**
   * Forgot Password
   */
  forgotPassword(dto: ForgotPasswordDto) {
    return apiClient.post<ApiResponse<void>>("/auth/forgot-password", dto);
  },

  /**
   * Reset Password
   */
  resetPassword(dto: ResetPasswordDto) {
    return apiClient.post<ApiResponse<void>>("/auth/reset-password", dto);
  },

  /**
   * Verify Email
   */
  verifyEmail(token: string) {
    return apiClient.post<void>("/auth/verify-email", {
      token,
    });
  },

  /**
   * Resend Verification Email
   */
  resendVerification(email: string) {
    return apiClient.post<ApiResponse<void>>("/auth/resend-verification", {
      email,
    });
  },
};
