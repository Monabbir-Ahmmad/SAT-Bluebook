import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

import { UserRoles } from "./constants/enums";

function authMiddleware(req: NextRequestWithAuth) {
  //Role based authorization
  if (
    req.nextUrl.pathname.includes("/student") &&
    req.nextauth.token?.role !== UserRoles.USER
  ) {
    //return NextResponse.rewrite(new URL("/unauthorized", req.nextUrl));
  }

  if (
    req.nextUrl.pathname.includes("/teacher") &&
    req.nextauth.token?.role !== UserRoles.ADMIN
  ) {
    // return NextResponse.rewrite(new URL("/unauthorized", req.nextUrl));
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
  matcher: ["/student/:path*", "/teacher/:path*"],
};
