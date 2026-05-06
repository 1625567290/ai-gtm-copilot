import { createProjectAndCampaign } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary, Locale } from "@/lib/i18n";
import {
  audiences,
  budgetBands,
  categories,
  markets,
  outputLocales,
  stages,
  tones
} from "@/lib/validation/project";

function Field({
  label,
  description,
  children,
  asLabel = true
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
  asLabel?: boolean;
}) {
  const content = (
    <>
      <span className="text-sm font-medium">{label}</span>
      {children}
      {description ? <span className="text-xs leading-5 text-muted-foreground">{description}</span> : null}
    </>
  );

  return asLabel ? (
    <label className="grid gap-2">{content}</label>
  ) : (
    <div className="grid gap-2">{content}</div>
  );
}

function CheckboxGroup({
  name,
  options,
  labels,
  defaultValues = []
}: {
  name: string;
  options: readonly string[];
  labels: Partial<Record<string, string>>;
  defaultValues?: readonly string[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm transition-colors duration-200 hover:bg-secondary"
        >
          <Checkbox name={name} value={option} defaultChecked={defaultValues.includes(option)} />
          <span>{labels[option] ?? option}</span>
        </label>
      ))}
    </div>
  );
}

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
    <form action={createProjectAndCampaign} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <input type="hidden" name="locale" value={locale} />
      <Card>
        <CardHeader>
          <CardTitle>{dictionary.intake.cardTitle}</CardTitle>
          <CardDescription>
            {dictionary.intake.cardDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          {error ? (
            <div role="alert" className="rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm leading-6 text-orange-900">
              {dictionary.intake.formError}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={dictionary.intake.productName}>
              <Input name="name" placeholder="VectorForge" required />
            </Field>
            <Field label={dictionary.intake.website}>
              <Input name="website" placeholder="https://example.ai" type="url" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={dictionary.intake.category}>
              <Select name="category" defaultValue="AI Infra">
                {categories.map((category) => (
                  <option key={category} value={category}>{dictionary.options.categories[category]}</option>
                ))}
              </Select>
            </Field>
            <Field label={dictionary.intake.stage}>
              <Select name="stage" defaultValue="pre-launch">
                {stages.map((stage) => (
                  <option key={stage} value={stage}>{dictionary.options.stages[stage]}</option>
                ))}
              </Select>
            </Field>
            <Field label={dictionary.intake.budgetBand}>
              <Select name="budgetBand" defaultValue="$10k-$25k">
                {budgetBands.map((band) => (
                  <option key={band} value={band}>{band}</option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
            <Field label={dictionary.intake.outputLanguage}>
              <Select name="outputLocale" defaultValue={locale}>
                {outputLocales.map((outputLocale) => (
                  <option key={outputLocale} value={outputLocale}>
                    {dictionary.options.outputLocales[outputLocale]}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label={dictionary.intake.targetMarkets} description={dictionary.intake.targetMarketsDescription} asLabel={false}>
            <CheckboxGroup
              name="targetMarkets"
              options={markets}
              labels={dictionary.options.markets}
              defaultValues={["US", "Japan"]}
            />
          </Field>

          <Field label={dictionary.intake.targetAudiences} description={dictionary.intake.targetAudiencesDescription} asLabel={false}>
            <CheckboxGroup
              name="audiences"
              options={audiences}
              labels={dictionary.options.audiences}
              defaultValues={["developers", "AI researchers"]}
            />
          </Field>

          <Field label={dictionary.intake.productSummary}>
            <Textarea
              name="summary"
              placeholder={dictionary.intake.summaryPlaceholder}
              required
            />
          </Field>

          <Field label={dictionary.intake.moat}>
            <Textarea
              name="moat"
              placeholder={dictionary.intake.moatPlaceholder}
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
            <Field label={dictionary.intake.launchGoal}>
              <Input name="launchGoal" placeholder={dictionary.intake.launchGoalPlaceholder} required />
            </Field>
            <Field label={dictionary.intake.tone}>
              <Select name="tone" defaultValue="technical">
                {tones.map((tone) => (
                  <option key={tone} value={tone}>{dictionary.options.tones[tone]}</option>
                ))}
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.intake.outputsTitle}</CardTitle>
            <CardDescription>{dictionary.intake.outputsDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {dictionary.intake.outputs.map((output) => (
              <p key={output}>{output}</p>
            ))}
          </CardContent>
        </Card>
        <Button type="submit" className="w-full cursor-pointer" size="lg">
          {dictionary.intake.submit}
        </Button>
      </aside>
    </form>
  );
}
