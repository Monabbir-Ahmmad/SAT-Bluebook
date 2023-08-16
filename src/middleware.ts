import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

function authMiddleware(req: NextRequestWithAuth) {
  //Role based authorization
  if (
    req.nextUrl.pathname.includes("/student") &&
    req.nextauth.token?.role !== "user"
  ) {
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
  matcher: ["/((?!api|auth|_next|favicon.ico).*)"],
};
