import { getRequestConfig } from "next-intl/server";
import { locales } from "@/lib/locales";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.find((item) => item === locale) ?? "en";
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
