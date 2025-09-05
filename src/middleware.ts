import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const privateRoutes = [
            "/dashboard",
            "/applications",
            "/bank-accounts",
            "/documents",
            "/employment",
            "/references",
            "/social-medias",
            "/user",
            "/admin",
        ];
        const isPrivateRoute = privateRoutes.some((route) =>
            req.nextUrl.pathname.startsWith(route)
        );
        if (isPrivateRoute && !req.nextauth.token) {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
        const token = req.nextauth.token as any;
        if (req.nextUrl.pathname.startsWith("/api/applications/") &&
            (req.nextUrl.pathname.endsWith("/approve") || req.nextUrl.pathname.endsWith("/reject") ||
                req.nextUrl.pathname.endsWith("/counter-offer") || req.nextUrl.pathname.endsWith("/review")) &&
            !token.roles.includes("admin")) {
            return NextResponse.redirect(new URL("/forbidden", req.url));
        }
        if (req.nextUrl.pathname.startsWith("/admin") && !token?.roles?.includes("admin")) {
            return NextResponse.redirect(new URL("/forbidden", req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/applications/:path*",
        "/bank-accounts/:path*",
        "/documents/:path*",
        "/employment/:path*",
        "/references/:path*",
        "/social-medias/:path*",
        "/user/:path*",
        "/admin/:path*",
        "/api/:path*",
    ],
};
