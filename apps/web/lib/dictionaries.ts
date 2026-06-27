import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import es from "@/messages/es.json";
import zh from "@/messages/zh.json";
import hi from "@/messages/hi.json";
import type { Locale } from "@/lib/locales";

const dictionaries = {
  en,
  ar,
  es,
  zh,
  hi
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}

