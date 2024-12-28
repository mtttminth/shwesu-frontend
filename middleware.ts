// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAccessToken } from "./lib/auth/tokenService";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = await getAccessToken();

  // If there's no token AND the path matches a protected pattern, redirect
  if (!accessToken && isProtectedRoute(path)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (accessToken && isPublicRoute(path)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

function isProtectedRoute(path: string): boolean {
  const protectedPatterns = ["/cart", "/orders(.*)", "/profile"];

  return protectedPatterns.some((pattern) => {
    const regex = new RegExp("^" + pattern + "$"); // Match from the beginning to the end
    return regex.test(path);
  });
}

function isPublicRoute(path: string): boolean {
  const publicRoutes = ["/login", "/register"];
  return publicRoutes.includes(path);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
