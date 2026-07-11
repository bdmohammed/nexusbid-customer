"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function DummyPaypalApprovePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<"processing" | "success">("processing");

  useEffect(() => {
    // Invalidate queries so the app refetches the new subscription status immediately
    queryClient.invalidateQueries({ queryKey: ["subscription", "me"] });
    queryClient.invalidateQueries({ queryKey: ["auth", "me"] });

    const timer = setTimeout(() => {
      setStatus("success");

      const successTimer = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(successTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, queryClient]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-linear-to-b from-[var(--background)] to-[var(--surface-secondary)]">
      <div className="w-full max-w-md p-8 bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-xl text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#003EC7] opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#003EC7] opacity-10 blur-3xl rounded-full"></div>

        <div className="relative z-10 space-y-6">
          {status === "processing" ? (
            <>
              <div className="flex justify-center">
                <svg
                  className="animate-spin h-12 w-12 text-[#003EC7]"
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
              </div>
              <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
                Processing Payment
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Please wait while we confirm your subscription approval with
                PayPal.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center text-3xl font-bold animate-bounce">
                  ✓
                </div>
              </div>
              <h2 className="text-2xl font-extrabold text-green-500">
                Subscription Activated!
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Thank you for subscribing. You now have full access to all
                premium tenders, scope specifications, and PDF files.
              </p>
              <div className="pt-2 text-xs text-[var(--muted)]">
                Redirecting you to the home page...
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
