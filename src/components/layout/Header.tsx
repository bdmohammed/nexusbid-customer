"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../common/Container";
import ThemeToggle from "../common/ThemeToggle";
import { navigation } from "@/data/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Menu, X, LogOut, Sparkles, ChevronRight } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { user, logout, isLoggingOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-all duration-200">
      <Container>
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#003EC7] dark:bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white/90" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-[#003EC7] dark:text-blue-400">
                RFPNEXA
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-widest -mt-1">
                E-PROCUREMENT PORTAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 relative ${
                    isActive
                      ? "text-[#003EC7] dark:text-blue-400 bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700/80 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#003EC7] dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls & User Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5 bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full">
                    <div className="w-7 h-7 rounded-full bg-[#003EC7] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex flex-col text-left pr-1">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                        {user.companyName || "Vendor"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => logout()}
                    disabled={isLoggingOut}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full border border-transparent hover:border-rose-200 dark:hover:border-rose-900 transition-all duration-200 disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#003EC7] dark:hover:text-blue-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#003EC7] hover:bg-[#002b7f] shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Hamburger button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-6 py-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-200">
          {/* User Status Card if Logged In */}
          {user && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#003EC7] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                  {getInitials(user.name)}
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "text-[#003EC7] dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/50"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </nav>

          {/* Auth Action Buttons for Mobile */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {isLoggingOut ? "Signing Out..." : "Sign Out"}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center p-3 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center p-3 rounded-xl text-sm font-bold text-white bg-[#003EC7] shadow-md shadow-blue-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
