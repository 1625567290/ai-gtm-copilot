import { ProjectIntakeFormClient } from "@/components/project-intake-form-client";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ProjectIntakeForm({
  locale,
  dictionary,
  error = false
}: {
  locale: Locale;
  dictionary: Dictionary;
  error?: boolean;
}) {
  return (
    <ProjectIntakeFormClient
      locale={locale}
      intake={dictionary.intake}
      options={dictionary.options}
      initialError={error}
    />
  );
}
