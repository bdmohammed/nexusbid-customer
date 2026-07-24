import { apiClient } from "@/lib/http";
import type {
  AuthResponse,
  ChangePasswordDto,
  CsrfTokenResponse,
  DisableTotpInput,
  ForgotPasswordDto,
  LoginDto,
  OAuthCallbackInput,
  RegisterDto,
  ResetPasswordDto,
  TotpSetupResponse,
  User,
  UserDevice,
  UserSession,
} from "../types";
import type { ApiResponse } from "@/types";

export const authApi = {
  /**
   * Get CSRF token
   */
  getCsrfToken() {
    return apiClient.get<ApiResponse<CsrfTokenResponse>>("/auth/csrf-token");
  },

  /**
   * Customer Login
   */
  login(dto: LoginDto) {
    return apiClient.post<ApiResponse<AuthResponse>>("/auth/login", dto);
  },

  /**
   * Customer Register
   */
  register(payload: RegisterDto) {
    return apiClient.post<ApiResponse<AuthResponse>>("/auth/register", payload);
  },

  /**
   * Customer Logout
   */
  logout() {
    return apiClient.post<ApiResponse<void>>("/auth/logout");
  },

  /**
   * Current Customer User Profile & Permissions
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
    return apiClient.post<ApiResponse<void>>("/auth/verify-email", {
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

  /**
   * Refresh Session Token
   */
  refresh() {
    return apiClient.post<ApiResponse<any>>("/auth/refresh");
  },

  /**
   * Get Active Sessions
   */
  getSessions() {
    return apiClient.get<ApiResponse<UserSession[]>>("/auth/sessions");
  },

  /**
   * Revoke Single Session
   */
  revokeSession(sessionId: string) {
    return apiClient.delete<ApiResponse<any>>(`/auth/sessions/${sessionId}`);
  },

  /**
   * Revoke All Sessions
   */
  revokeAllSessions() {
    return apiClient.delete<ApiResponse<any>>("/auth/sessions");
  },

  /**
   * Request Email Change
   */
  requestEmailChange(email: string) {
    return apiClient.post<ApiResponse<any>>("/auth/email/change", {
      email,
    });
  },

  /**
   * Verify Email Change
   */
  verifyEmailChange(token: string) {
    return apiClient.post<ApiResponse<any>>("/auth/email/change/verify", {
      token,
    });
  },

  /**
   * Change Password
   */
  changePassword(dto: ChangePasswordDto) {
    return apiClient.post<ApiResponse<any>>("/auth/password/change", dto);
  },

  /**
   * Get Customer Devices
   */
  getDevices() {
    return apiClient.get<ApiResponse<UserDevice[]>>("/auth/devices");
  },

  /**
   * Trust Device
   */
  trustDevice(deviceId: string) {
    return apiClient.post<ApiResponse<any>>(`/auth/devices/${deviceId}/trust`);
  },

  /**
   * Revoke Device
   */
  revokeDevice(deviceId: string) {
    return apiClient.delete<ApiResponse<any>>(`/auth/devices/${deviceId}`);
  },

  /**
   * Setup TOTP MFA
   */
  setupTotp() {
    return apiClient.post<ApiResponse<TotpSetupResponse>>("/auth/mfa/totp/setup");
  },

  /**
   * Disable TOTP MFA
   */
  disableTotp(input: DisableTotpInput) {
    return apiClient.delete<ApiResponse<any>>("/auth/mfa/totp/disable", {
      data: input,
    });
  },

  /**
   * OAuth Provider Redirect URL
   */
  oauthRedirect(provider: string) {
    return apiClient.get<any>(`/auth/oauth/${provider}`);
  },

  /**
   * OAuth Provider Callback Code Exchange
   */
  oauthCallback(provider: string, query: OAuthCallbackInput) {
    return apiClient.get<ApiResponse<AuthResponse>>(`/auth/oauth/${provider}/callback`, {
      params: query,
    });
  },
};
