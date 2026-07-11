// src/app/dashboard/error.tsx
"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, LayoutDashboard } from "lucide-react";
import { handleClientError } from "@/lib/errors/utils";

export interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    // Log dashboard specific failures
    handleClientError(error, {
      component: "DashboardError",
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="p-8 bg-neutral-900/50 border border-red-500/10 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-12">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/5 blur-2xl rounded-full" />

      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="flex items-center gap-2 mb-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
        <LayoutDashboard className="w-4 h-4 text-red-500" />
        <span>Dashboard Module Error</span>
      </div>

      <h2 className="text-xl font-bold mb-2 text-white">
        Failed to load dashboard metrics
      </h2>

      <p className="text-sm text-neutral-400 max-w-md mb-6 leading-relaxed">
        We experienced a problem fetching your procurement analytics. This could
        be due to a temporarily unresponsive API endpoint.
      </p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all shadow-md cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Section
        </button>

        <a
          href="/"
          className="px-5 py-2.5 text-xs font-semibold rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
