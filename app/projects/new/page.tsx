import { AppShell } from "@/components/app-shell";
import { ProjectIntakeForm } from "@/components/project-intake-form";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function NewProjectPage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[]; error?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);
  const dictionary = getDictionary(locale);
  const error = Array.isArray(params?.error) ? params?.error[0] : params?.error;

  return (
    <AppShell
      title={dictionary.intake.title}
      eyebrow={dictionary.intake.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/projects/new"
    >
      <ProjectIntakeForm locale={locale} dictionary={dictionary} error={error === "validation"} />
    </AppShell>
  );
}
