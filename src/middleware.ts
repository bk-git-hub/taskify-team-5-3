"use server";

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const accessTokenRequiredPages = ["/mydashboard", "/mypage", "/dashboard"];
const accessTokenNotRequiredPages = ["/", "/login", "/signup"];

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname;

    const isPublicPage = accessTokenNotRequiredPages.includes(pathname);
    const isProtectedPage = accessTokenRequiredPages.some((page) =>
      pathname.startsWith(page),
    );

    if (isPublicPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/mydashboard", req.url));
      }
      return null;
    }

    if (isProtectedPage && !isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(new URL(`/login`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized(token) {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    "/mydashboard",
    "/mypage",
    "/dashboard/:path*",
    "/",
    "/login",
    "/signup",
  ],
};
