import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  "How sponsored AI tool marketplaces measure ROI",
  "Building multilingual SEO for AI directories",
  "Duplicate detection strategies for 100,000+ software listings"
];

export default function BlogPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">AI directory playbooks</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post}>
            <CardHeader>
              <CardTitle>{post}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600">CMS-ready article template with structured data, author pages, and localization hooks.</p>
              <Link href="#" className="mt-4 inline-block text-sm font-semibold text-teal-800">
                Read article
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

