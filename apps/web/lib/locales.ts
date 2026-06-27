export const locales = ["en", "ar", "es", "zh", "hi"] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["ar"];

export function toLocale(value: string): Locale {
  return locales.find((locale) => locale === value) ?? "en";
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
