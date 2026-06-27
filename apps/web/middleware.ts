import createMiddleware from "next-intl/middleware";
import { locales } from "@/lib/locales";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always"
});

export const config = {
  matcher: ["/", "/(en|ar|es|zh|hi)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"]
};
