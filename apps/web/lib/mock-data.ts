export type Tool = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  pricingModel: string;
  averageRating: number;
  reviewCount: number;
  clickCount: number;
  featured?: boolean;
  sponsored?: boolean;
  tags: string[];
};

export const mockTools: Tool[] = [
  {
    id: "tool_promptforge",
    slug: "promptforge",
    name: "PromptForge",
    shortDescription: "Enterprise prompt workspace for repeatable AI workflows.",
    description: "Design, test, govern, and reuse prompts across teams with approval flows and analytics.",
    category: "Writing",
    pricingModel: "FREEMIUM",
    averageRating: 4.8,
    reviewCount: 128,
    clickCount: 42100,
    featured: true,
    sponsored: true,
    tags: ["agent", "enterprise", "automation"]
  },
  {
    id: "tool_codepilot",
    slug: "codepilot-labs",
    name: "CodePilot Labs",
    shortDescription: "AI development assistant for code review, tests, migrations, and releases.",
    description: "Connect repositories and issue trackers to automate routine engineering workflows.",
    category: "Developer Tools",
    pricingModel: "PAID",
    averageRating: 4.7,
    reviewCount: 92,
    clickCount: 31800,
    featured: true,
    tags: ["api", "automation", "enterprise"]
  },
  {
    id: "tool_brandpixel",
    slug: "brandpixel-ai",
    name: "BrandPixel AI",
    shortDescription: "Brand-safe image generation and editing for growth teams.",
    description: "Create campaign visuals, product mockups, and localized ad variants with approval controls.",
    category: "Image Generation",
    pricingModel: "FREEMIUM",
    averageRating: 4.6,
    reviewCount: 76,
    clickCount: 27750,
    sponsored: true,
    tags: ["no-code", "creative", "enterprise"]
  },
  {
    id: "tool_rankflow",
    slug: "rankflow-ai",
    name: "RankFlow AI",
    shortDescription: "SEO intelligence platform for topic discovery, briefs, and content refreshes.",
    description: "Combine clustering, SERP analysis, content briefs, and conversion analytics.",
    category: "Sales & Marketing",
    pricingModel: "CONTACT_SALES",
    averageRating: 4.5,
    reviewCount: 54,
    clickCount: 19220,
    tags: ["seo", "api", "marketing"]
  }
];

export const mockCategories = [
  { slug: "writing", name: "Writing", description: "Writing, editing, summarization, and content operations", count: 12040 },
  { slug: "developer-tools", name: "Developer Tools", description: "Coding assistants, testing agents, and DevOps copilots", count: 9860 },
  { slug: "image-generation", name: "Image Generation", description: "Text-to-image, editing, and visual automation", count: 8740 },
  { slug: "sales-marketing", name: "Sales & Marketing", description: "Outbound, SEO, CRM enrichment, and campaign automation", count: 11220 }
];

export const mockPlans = [
  { slug: "free", name: "Free", priceMonthly: 0, description: "Discovery and bookmarks", features: ["Bookmarks", "Public collections", "1,000 API calls"] },
  { slug: "pro", name: "Pro", priceMonthly: 19, description: "Power users and consultants", features: ["Advanced filters", "Private collections", "10,000 API calls"] },
  { slug: "growth", name: "Growth", priceMonthly: 99, description: "AI vendors and sponsors", features: ["Sponsored listings", "Vendor analytics", "100,000 API calls"] },
  { slug: "enterprise", name: "Enterprise", priceMonthly: 499, description: "White-label and scale", features: ["White-label", "Custom limits", "SLA support"] }
];

export const dashboardStats = [
  { label: "Published tools", value: "104,280", delta: "+8.4%" },
  { label: "Monthly visitors", value: "2.7M", delta: "+12.9%" },
  { label: "MRR", value: "$186K", delta: "+6.1%" },
  { label: "Avg CTR", value: "7.8%", delta: "+1.2%" }
];

