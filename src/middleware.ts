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
        // if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
        //     return NextResponse.redirect(new URL("/unauthorized", req.url));
        // }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // basic check for session
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
    ],
};
