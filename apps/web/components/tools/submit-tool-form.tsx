"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2),
  websiteUrl: z.string().url(),
  shortDescription: z.string().min(20),
  category: z.string().min(2)
});

type FormValues = z.infer<typeof schema>;

export function SubmitToolForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit an AI tool</CardTitle>
        <p className="text-sm text-zinc-600">Submissions enter moderation before publishing.</p>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(() => undefined)}
          className="grid gap-3"
        >
          <Input placeholder="Tool name" {...register("name")} />
          {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
          <Input placeholder="https://example.com" {...register("websiteUrl")} />
          {errors.websiteUrl ? <p className="text-sm text-red-600">{errors.websiteUrl.message}</p> : null}
          <Input placeholder="Short description" {...register("shortDescription")} />
          {errors.shortDescription ? <p className="text-sm text-red-600">{errors.shortDescription.message}</p> : null}
          <Input placeholder="Category" {...register("category")} />
          <Button type="submit">Submit for review</Button>
          {isSubmitSuccessful ? <p className="text-sm font-medium text-teal-800">Submission staged for moderation.</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}

