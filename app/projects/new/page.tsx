import { AppShell } from "@/components/app-shell";
import { ProjectIntakeForm } from "@/components/project-intake-form";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function NewProjectPage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const locale = getLocale((await searchParams)?.lang);
  const dictionary = getDictionary(locale);

  return (
    <AppShell
      title={dictionary.intake.title}
      eyebrow={dictionary.intake.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/projects/new"
    >
      <ProjectIntakeForm locale={locale} dictionary={dictionary} />
    </AppShell>
  );
}
