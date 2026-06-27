import { SubmitToolForm } from "@/components/tools/submit-tool-form";

export default function SubmissionsPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Tool submissions</h1>
      <p className="mt-2 text-zinc-600">Submit, claim, and request edits. Moderators approve before publishing.</p>
      <div className="mt-8 max-w-xl">
        <SubmitToolForm />
      </div>
    </section>
  );
}

