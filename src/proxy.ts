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
  "/account",
] as const;

function matches(pathname: string, routes: readonly string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAccessToken =
    request.cookies.has("nexusbid_token") ||
    request.cookies.has("access_token") ||
    request.cookies.has("__Host-access_token");

  /**
   * Guest attempting to access protected user dashboard/settings/profile.
   */
  if (!hasAccessToken && matches(pathname, PROTECTED_ROUTES)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /**
   * Logged-in customer attempting to access auth pages (login/register).
   */
  if (hasAccessToken && matches(pathname, AUTH_ROUTES)) {
    return NextResponse.redirect(new URL("/tenders", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/account/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
