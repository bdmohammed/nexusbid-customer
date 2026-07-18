"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getErrorMessage } from "@/lib/errors";

export default function ForgotPasswordPage() {
  const { forgotPassword, isForgotSending } = useAuth();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    try {
      await forgotPassword({ email });
      setSuccessMsg(
        "If that email is registered, we have sent a reset password link to it.",
      );
      setEmail("");
    } catch (err: any) {
      const msg =
        getErrorMessage(err) || "Failed to initiate password reset.";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-linear-to-b from-[var(--background)] to-[var(--surface-secondary)]">
      <div className="w-full max-w-md p-8 bg-[var(--background)] rounded-2xl border border-[var(--border)] shadow-xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#003EC7] opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#003EC7] opacity-10 blur-3xl rounded-full"></div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Enter your email to receive a password reset link
          </p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg text-sm text-center">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        {!successMsg && (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-hidden focus:ring-2 focus:ring-[#003EC7] focus:border-transparent transition-all"
                placeholder="name@company.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isForgotSending}
              className="w-full py-3.5 px-4 bg-[#003EC7] hover:bg-[#002fad] text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isForgotSending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm text-[var(--muted)] relative z-10">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#003EC7] hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
