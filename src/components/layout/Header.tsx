"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "../common/Container";
import ThemeToggle from "../common/ThemeToggle";
import Button from "../ui/Button";
import { navigation } from "@/data/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { user, logout, isLoggingOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="
      sticky
      top-0
      z-50
      backdrop-blur-xl
      bg-white/80
      dark:bg-slate-950/80
      border-b
      border-(--border)
      "
    >
      <Container>
        <div
          className="
          h-20
          flex
          items-center
          justify-between
          "
        >
          <Link
            href="/"
            className="
            text-[32px]
            font-bold
            text-[#003EC7]
            "
          >
            NexusBid
          </Link>

          <nav
            className="
            hidden
            lg:flex
            items-center
            gap-8
            "
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                text-sm
                font-medium
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[var(--muted)] tracking-wide">
                    {user.name} ({user.companyName || "Individual"})
                  </span>
                  <button
                    onClick={() => logout()}
                    disabled={isLoggingOut}
                    className="px-4 py-2 text-xs font-semibold text-red-500 hover:text-red-700 bg-red-500/5 hover:bg-red-500/10 rounded-lg border border-red-500/10 transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoggingOut ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>

            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[var(--surface-secondary)] rounded-lg text-[var(--foreground)]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile navigation drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-(--border) bg-white dark:bg-slate-950 px-6 py-6 space-y-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-[var(--foreground)] hover:text-[#003EC7] transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-(--border) pt-6">
            {user ? (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold text-[var(--muted)] tracking-wide">
                  {user.name} ({user.companyName || "Individual"})
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className="w-full text-center px-4 py-3 text-sm font-semibold text-red-500 hover:text-red-700 bg-red-500/5 hover:bg-red-500/10 rounded-lg border border-red-500/10 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoggingOut ? "Logging out..." : "Log Out"}
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
