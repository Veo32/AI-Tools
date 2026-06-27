import { z } from "zod";

export const locales = ["en", "ar", "es", "zh", "hi"] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["ar"];

export const userRoles = [
  "SUPER_ADMIN",
  "ADMIN",
  "MODERATOR",
  "EDITOR",
  "VENDOR",
  "DEVELOPER",
  "USER"
] as const;
export type UserRole = (typeof userRoles)[number];

export const toolStatuses = ["DRAFT", "PENDING", "PUBLISHED", "REJECTED", "ARCHIVED"] as const;
export type ToolStatus = (typeof toolStatuses)[number];

export const billingProviders = ["STRIPE", "PAYPAL", "PADDLE", "LEMONSQUEEZY"] as const;
export type BillingProvider = (typeof billingProviders)[number];

export const planSlugs = ["free", "pro", "growth", "enterprise"] as const;
export type PlanSlug = (typeof planSlugs)[number];

export const searchSchema = z.object({
  q: z.string().trim().optional(),
  locale: z.enum(locales).default("en"),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  pricing: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  sort: z.enum(["relevance", "newest", "rating", "popular", "sponsored"]).default("relevance"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24)
});

export type SearchInput = z.infer<typeof searchSchema>;

export const createToolSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  websiteUrl: z.string().url(),
  shortDescription: z.string().min(20).max(220),
  description: z.string().min(60),
  categoryId: z.string().cuid(),
  tags: z.array(z.string().min(1)).max(20).default([]),
  pricingModel: z.enum(["FREE", "FREEMIUM", "PAID", "CONTACT_SALES", "OPEN_SOURCE"]),
  platforms: z.array(z.string()).default([]),
  languages: z.array(z.enum(locales)).default(["en"]),
  logoUrl: z.string().url().optional()
});

export type CreateToolInput = z.infer<typeof createToolSchema>;

export const reviewSchema = z.object({
  toolId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).max(100),
  body: z.string().min(20).max(2500)
});

export type ReviewInput = z.infer<typeof reviewSchema>;

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function buildToolUrl(locale: Locale, slug: string): string {
  return `/${locale}/tools/${slug}`;
}

export function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

