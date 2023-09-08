import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/verify-email";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // retrieve the current response
  const res = NextResponse.next();

  return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: ["/", "/profile", "/login", "/register", "/verify-email",'/srs-documents'],
};
