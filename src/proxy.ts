// src/proxy.ts

import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
] as const;

const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/admin",
] as const;

function matches(pathname: string, routes: readonly string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAccessToken =
    request.cookies.has("access_token") ||
    request.cookies.has("__Host-access_token");

  /**
   * Guest trying to access protected pages.
   */
  if (!hasAccessToken && matches(pathname, PROTECTED_ROUTES)) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  /**
   * Logged-in user trying to access auth pages.
   */
  if (hasAccessToken && matches(pathname, AUTH_ROUTES)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
