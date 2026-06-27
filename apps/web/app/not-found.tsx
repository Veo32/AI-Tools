import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white p-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-zinc-600">The page may have moved, or the listing may still be in moderation.</p>
        <Button asChild className="mt-6">
          <Link href="/en">Back to directory</Link>
        </Button>
      </div>
    </main>
  );
}

