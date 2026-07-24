export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  companyName: string;
  country?: string;
  countryId?: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password?: string;
}

export interface ChangePasswordDto {
  oldPassword?: string;
  currentPassword?: string;
  newPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accountType: "user" | "admin";
  companyName: string | null;
  country: string | null;
  emailVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
}

export interface CsrfTokenResponse {
  csrfToken: string;
}

export interface UserSession {
  id: string;
  userId: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
  expiresAt: string;
  isCurrent?: boolean;
}

export interface UserDevice {
  id: string;
  userId: string;
  userAgent: string;
  ipAddress: string;
  isTrusted: boolean;
  lastSeenAt: string;
  createdAt: string;
}

export interface TotpSetupResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface DisableTotpInput {
  token: string;
}

export interface EmailChangeInput {
  email: string;
}

export interface VerifyEmailChangeInput {
  token: string;
}

export interface OAuthCallbackInput {
  code: string;
  state?: string;
}
