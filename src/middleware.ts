import { auth } from "auth";
import { NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./lib/routes";
import { USER_ROLES } from "./lib/userRoles";
import { NextAuthRequest } from "node_modules/next-auth/lib";

const handleRegisterRoute = (req: NextAuthRequest, isLoggedIn: boolean) => {
  if (isLoggedIn && req.auth?.user.userDetails?.account_status) {
    const accountStatus = req.auth.user.userDetails.account_status;
    if ([2, 3].includes(accountStatus)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.redirect(new URL("/", req.url));
};

const handleCartRoute = (req: NextAuthRequest, isLoggedIn: boolean) => {
  if (!isLoggedIn || req.auth?.user.role === USER_ROLES.CONSUMER) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", req.url));
};

const handleProtectedRoutes = (
  req: NextAuthRequest,
  isLoggedIn: boolean,
  path: string,
) => {
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (path === req.auth?.user.role) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/403", req.url));
};
const handleLoginAsOtherUser = (req: NextAuthRequest, isLoggedIn: boolean) => {
  
}
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  const path = pathname.split("/")[1];

  const registerPattern = /^\/register\/.+$/;
  if (registerPattern.test(pathname)) {
    return handleRegisterRoute(req, isLoggedIn);
  }

  // if (pathname.includes("cart")) {
  //   return handleCartRoute(req, isLoggedIn);
  // }

  if (PROTECTED_ROUTES.includes(path)) {
    return handleProtectedRoutes(req, isLoggedIn, path);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
