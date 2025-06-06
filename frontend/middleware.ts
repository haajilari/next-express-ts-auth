import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. استخراج توکن از کوکی‌ها
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // 2. منطق محافظت از مسیر داشبورد
  // اگر کاربر به داشبورد می‌رود و توکن ندارد، او را به صفحه لاگین هدایت کن
  if (pathname.startsWith("/dashboard") && !token) {
    console.log("Redirecting to login: No token found for dashboard access.");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. منطق برای کاربران لاگین کرده
  // اگر کاربر توکن دارد و سعی می‌کند به صفحات ورود یا ثبت‌نام برود، او را به داشبورد هدایت کن
  if (pathname.startsWith("/auth") && token) {
    console.log("Redirecting to dashboard: Logged-in user trying to access auth page.");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // در غیر این صورت، اجازه بده درخواست ادامه پیدا کند
  return NextResponse.next();
}

// 4. تعیین مسیرهایی که این میان‌افزار روی آن‌ها اعمال می‌شود
export const config = {
  matcher: [
    /*
     * مسیرهای زیر را مطابقت بده:
     * - مسیرهایی که با /dashboard شروع می‌شوند
     * - مسیرهایی که با /auth شروع می‌شوند
     */
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
