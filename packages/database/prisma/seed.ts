import bcrypt from "bcryptjs";
import { PrismaClient, Locale, PricingModel, ToolStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!ChangeMe", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@aitools.example" },
    update: {},
    create: {
      email: "admin@aitools.example",
      name: "Platform Admin",
      username: "admin",
      passwordHash,
      roles: ["SUPER_ADMIN", "ADMIN"],
      emailVerifiedAt: new Date(),
      authorProfile: {
        create: {
          slug: "platform-admin",
          headline: "Curating enterprise AI tools and workflows"
        }
      }
    }
  });

  const plans = [
    {
      slug: "free",
      name: "Free",
      description: "For readers and lightweight discovery.",
      priceMonthly: 0,
      priceYearly: 0,
      features: ["Bookmark tools", "Create public collections", "Basic API access"],
      limits: { apiRequests: 1000, ownedTools: 1, collections: 5 }
    },
    {
      slug: "pro",
      name: "Pro",
      description: "For AI operators and consultants.",
      priceMonthly: 19,
      priceYearly: 190,
      features: ["Advanced filters", "Private collections", "Comparison exports"],
      limits: { apiRequests: 10000, ownedTools: 5, collections: 50 }
    },
    {
      slug: "growth",
      name: "Growth",
      description: "For AI vendors that need distribution.",
      priceMonthly: 99,
      priceYearly: 990,
      features: ["Sponsored listings", "Vendor analytics", "Lead tracking"],
      limits: { apiRequests: 100000, ownedTools: 25, campaigns: 10 }
    },
    {
      slug: "enterprise",
      name: "Enterprise",
      description: "For marketplaces, agencies, and white-label deployments.",
      priceMonthly: 499,
      priceYearly: 4990,
      features: ["White-label branding", "Custom limits", "Dedicated support"],
      limits: { apiRequests: 1000000, ownedTools: 1000, seats: 100 }
    }
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan
    });
  }

  const categorySeed = [
    {
      slug: "writing",
      icon: "PenLine",
      translations: {
        en: ["Writing", "AI writing, editing, summarization, and content operations"],
        ar: ["الكتابة", "أدوات الذكاء الاصطناعي للكتابة والتحرير والتلخيص"],
        es: ["Escritura", "Herramientas de escritura, edición y resumen con IA"],
        zh: ["写作", "AI 写作、编辑、摘要和内容运营工具"],
        hi: ["लेखन", "AI लेखन, संपादन, सारांश और कंटेंट संचालन उपकरण"]
      }
    },
    {
      slug: "developer-tools",
      icon: "Code2",
      translations: {
        en: ["Developer Tools", "Coding assistants, testing agents, and DevOps copilots"],
        ar: ["أدوات المطورين", "مساعدات البرمجة والاختبار وعمليات التطوير"],
        es: ["Herramientas para desarrolladores", "Asistentes de código, pruebas y DevOps"],
        zh: ["开发者工具", "编码助手、测试代理和 DevOps 副驾驶"],
        hi: ["डेवलपर टूल्स", "कोडिंग असिस्टेंट, टेस्टिंग एजेंट और DevOps कोपायलट"]
      }
    },
    {
      slug: "image-generation",
      icon: "Image",
      translations: {
        en: ["Image Generation", "Text-to-image, editing, brand assets, and visual automation"],
        ar: ["توليد الصور", "تحويل النص إلى صور وتحرير الأصول البصرية"],
        es: ["Generación de imágenes", "Texto a imagen, edición y activos visuales"],
        zh: ["图像生成", "文本生成图像、编辑和品牌视觉自动化"],
        hi: ["इमेज जनरेशन", "टेक्स्ट-टू-इमेज, एडिटिंग और विजुअल ऑटोमेशन"]
      }
    },
    {
      slug: "sales-marketing",
      icon: "Megaphone",
      translations: {
        en: ["Sales & Marketing", "Outbound, SEO, ads, CRM enrichment, and campaign automation"],
        ar: ["المبيعات والتسويق", "الأتمتة التسويقية والإعلانات وتحسين محركات البحث"],
        es: ["Ventas y marketing", "Outbound, SEO, anuncios, CRM y campañas"],
        zh: ["销售与营销", "外联、SEO、广告、CRM 增强和活动自动化"],
        hi: ["सेल्स और मार्केटिंग", "आउटबाउंड, SEO, विज्ञापन, CRM और अभियान ऑटोमेशन"]
      }
    }
  ] as const;

  const categories: Record<string, string> = {};
  for (const category of categorySeed) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { icon: category.icon },
      create: { slug: category.slug, icon: category.icon }
    });
    categories[category.slug] = created.id;

    for (const locale of Object.keys(category.translations) as Locale[]) {
      const [name, description] = category.translations[locale];
      await prisma.categoryTranslation.upsert({
        where: { categoryId_locale: { categoryId: created.id, locale } },
        update: { name, description },
        create: {
          categoryId: created.id,
          locale,
          name,
          description,
          metaTitle: `${name} AI Tools`,
          metaDesc: description
        }
      });
    }
  }

  const tagNames = ["agent", "automation", "seo", "open-source", "no-code", "api", "enterprise"];
  for (const name of tagNames) {
    await prisma.tag.upsert({
      where: { slug: name },
      update: {},
      create: { slug: name, name }
    });
  }

  const tools = [
    {
      slug: "promptforge",
      name: "PromptForge",
      category: "writing",
      websiteUrl: "https://example.com/promptforge",
      pricingModel: PricingModel.FREEMIUM,
      shortDescription: "Enterprise prompt workspace for teams building repeatable AI workflows.",
      description:
        "PromptForge helps teams design, test, govern, and reuse prompts across marketing, support, and internal operations with approval flows and analytics.",
      tags: ["agent", "enterprise", "automation"],
      sponsored: true
    },
    {
      slug: "codepilot-labs",
      name: "CodePilot Labs",
      category: "developer-tools",
      websiteUrl: "https://example.com/codepilot-labs",
      pricingModel: PricingModel.PAID,
      shortDescription: "AI development assistant for code review, tests, migrations, and release notes.",
      description:
        "CodePilot Labs connects to repositories and issue trackers to generate tests, spot regressions, explain code, and automate routine engineering workflows.",
      tags: ["api", "enterprise", "automation"],
      sponsored: false
    },
    {
      slug: "brandpixel-ai",
      name: "BrandPixel AI",
      category: "image-generation",
      websiteUrl: "https://example.com/brandpixel-ai",
      pricingModel: PricingModel.FREEMIUM,
      shortDescription: "Brand-safe image generation and editing for growth teams.",
      description:
        "BrandPixel AI creates campaign visuals, product mockups, and localized ad variants while enforcing brand rules and approval permissions.",
      tags: ["no-code", "enterprise", "automation"],
      sponsored: true
    },
    {
      slug: "rankflow-ai",
      name: "RankFlow AI",
      category: "sales-marketing",
      websiteUrl: "https://example.com/rankflow-ai",
      pricingModel: PricingModel.CONTACT_SALES,
      shortDescription: "AI SEO intelligence platform for topic discovery, briefs, and content refreshes.",
      description:
        "RankFlow AI combines keyword clustering, SERP analysis, brief generation, and conversion analytics for content teams managing large websites.",
      tags: ["seo", "enterprise", "api"],
      sponsored: false
    }
  ] as const;

  for (const tool of tools) {
    const created = await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: {},
      create: {
        slug: tool.slug,
        name: tool.name,
        websiteUrl: tool.websiteUrl,
        shortDescription: tool.shortDescription,
        description: tool.description,
        pricingModel: tool.pricingModel,
        status: ToolStatus.PUBLISHED,
        categoryId: categories[tool.category],
        ownerId: admin.id,
        verified: true,
        apiAvailable: true,
        languages: ["en", "ar", "es", "zh", "hi"],
        publishedAt: new Date(),
        sponsoredUntil: tool.sponsored ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) : null,
        featuredUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
      }
    });

    await prisma.toolTranslation.upsert({
      where: { toolId_locale: { toolId: created.id, locale: "en" } },
      update: {
        name: tool.name,
        shortDescription: tool.shortDescription,
        description: tool.description
      },
      create: {
        toolId: created.id,
        locale: "en",
        name: tool.name,
        shortDescription: tool.shortDescription,
        description: tool.description,
        metaTitle: `${tool.name} Review, Pricing, Alternatives`,
        metaDesc: tool.shortDescription
      }
    });

    for (const tagSlug of tool.tags) {
      const tag = await prisma.tag.findUniqueOrThrow({ where: { slug: tagSlug } });
      await prisma.toolTag.upsert({
        where: { toolId_tagId: { toolId: created.id, tagId: tag.id } },
        update: {},
        create: { toolId: created.id, tagId: tag.id }
      });
    }
  }

  await prisma.cmsPage.upsert({
    where: { slug_locale: { slug: "home", locale: "en" } },
    update: {},
    create: {
      slug: "home",
      locale: "en",
      title: "AI Tools Directory",
      published: true,
      publishedAt: new Date(),
      blocks: [
        { type: "hero", title: "Discover, compare, and monetize AI tools" },
        { type: "featured-grid", source: "featuredTools" }
      ],
      metadata: {
        description: "Enterprise AI tools marketplace with analytics, sponsored listings, and API access."
      }
    }
  });

  console.log("Seed completed. Admin login: admin@aitools.example / Admin123!ChangeMe");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

