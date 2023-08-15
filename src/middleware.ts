import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

function authMiddleware(req: NextRequestWithAuth) {
  //Role based authorization
  if (req.nextUrl.pathname === "/" && req.nextauth.token?.role !== "admin") {
    return NextResponse.rewrite(new URL("/unauthorized", req.nextUrl));
  }
}

export default withAuth(authMiddleware, {
  callbacks: {
    authorized: async ({ token }) => {
      return !!token;
    },
  },
});

// config to exclude auth pages from being protected
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};
