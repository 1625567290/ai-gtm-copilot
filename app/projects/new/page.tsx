import { AppShell } from "@/components/app-shell";
import { ProjectIntakeForm } from "@/components/project-intake-form";

export default function NewProjectPage() {
  return (
    <AppShell title="New GTM Project" eyebrow="Structured intake">
      <ProjectIntakeForm />
    </AppShell>
  );
}
