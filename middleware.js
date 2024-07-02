import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth(
    function middleware(req) {

        if ((req.nextUrl.pathname.startsWith("/protected/admin") || req.nextUrl.pathname.startsWith("/protected/user")) && req.nextauth.token?.role === "admin") {

            return NextResponse.next()
        }

        if ((req.nextUrl.pathname.startsWith("/api/crud/admin")
            || req.nextUrl.pathname.startsWith("/api/crud/user") ||
            req.nextUrl.pathname.startsWith("/api")) && req.nextauth.token?.role === "admin") {
            return NextResponse.next()
        }
        if ((req.nextUrl.pathname.startsWith("/api") && !req.nextUrl.pathname.startsWith("/api/crud/admin")) && req.nextauth.token?.role === "user") {
            return NextResponse.next();
        }

        if (req.nextUrl.pathname.includes("/libs/protected") && (req.nextauth.token?.role !== "admin")) {
            return NextResponse.redirect(new URL('/connexion', req.url))
        }
        else if (req.nextUrl.pathname.startsWith("/protected/user") && req.nextauth.token?.role === "user") {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/connexion', req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => token
        }
    }

)





// export const config = {
//     matcher: "/api/test"
// }



export const config = {
    matcher: ["/protected/:path*", "/api/crud/:path*"]
}
