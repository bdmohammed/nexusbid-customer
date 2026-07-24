import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "./api";
import { authQueryKeys } from "./keys";

import type {
  ChangePasswordDto,
  DisableTotpInput,
  ForgotPasswordDto,
  LoginDto,
  OAuthCallbackInput,
  RegisterDto,
  ResetPasswordDto,
} from "../types";

/**
 * Customer Login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: LoginDto) => authApi.login(dto),

    onSuccess: async (response) => {
      queryClient.setQueryData(["auth", "me"], response.data);

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.session(),
      });
    },
  });
}

/**
 * Customer Register
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: RegisterDto) => authApi.register(dto),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });
    },
  });
}

/**
 * Customer Logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: async () => {
      queryClient.clear();
    },
  });
}

/**
 * Forgot Password
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (dto: ForgotPasswordDto) => authApi.forgotPassword(dto),
  });
}

/**
 * Reset Password
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (dto: ResetPasswordDto) => authApi.resetPassword(dto),
  });
}

/**
 * Verify Email
 */
export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
  });
}

/**
 * Resend Verification Email
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => authApi.resendVerification(email),
  });
}

/**
 * Request Email Change
 */
export function useRequestEmailChange() {
  return useMutation({
    mutationFn: (email: string) => authApi.requestEmailChange(email),
  });
}

/**
 * Verify Email Change
 */
export function useVerifyEmailChange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmailChange(token),

    onSuccess: async () => {
      queryClient.clear();
    },
  });
}

/**
 * Change Password
 */
export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: ChangePasswordDto) => authApi.changePassword(dto),

    onSuccess: async () => {
      queryClient.clear();
    },
  });
}

/**
 * Revoke Session
 */
export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => authApi.revokeSession(sessionId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.sessions(),
      });
    },
  });
}

/**
 * Revoke All Sessions
Subscribes user out of all devices except active caller.
 */
export function useRevokeAllSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.revokeAllSessions(),

    onSuccess: async () => {
      queryClient.clear();
    },
  });
}

/**
 * Trust Device
 */
export function useTrustDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) => authApi.trustDevice(deviceId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.devices(),
      });
    },
  });
}

/**
 * Revoke Device
 */
export function useRevokeDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) => authApi.revokeDevice(deviceId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.devices(),
      });
    },
  });
}

/**
 * Setup TOTP MFA
 */
export function useSetupTotp() {
  return useMutation({
    mutationFn: () => authApi.setupTotp(),
  });
}

/**
 * Disable TOTP MFA
 */
export function useDisableTotp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DisableTotpInput) => authApi.disableTotp(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });
    },
  });
}

/**
 * OAuth Callback Code Exchange
 */
export function useOAuthCallback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      provider,
      query,
    }: {
      provider: string;
      query: OAuthCallbackInput;
    }) => authApi.oauthCallback(provider, query),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.session(),
      });
    },
  });
}
