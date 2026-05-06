"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createProjectAndCampaign } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  initialProjectIntakeFormState,
  type ProjectIntakeFieldErrors,
  type ProjectIntakeFormValues
} from "@/lib/forms/project-intake";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  audiences,
  budgetBands,
  categories,
  markets,
  outputLocales,
  stages,
  tones
} from "@/lib/validation/project";

type IntakeCopy = Dictionary["intake"];
type OptionCopy = Dictionary["options"];

const sampleValues: ProjectIntakeFormValues = {
  name: "VectorForge",
  website: "https://vectorforge.ai",
  category: "AI Infra",
  stage: "pre-launch",
  targetMarkets: ["US", "Japan"],
  audiences: ["developers", "AI researchers"],
  summary: "A vector database optimized for agent memory and low-latency retrieval.",
  moat: "Hybrid memory compression and developer-first observability.",
  launchGoal: "Recruit 500 technical beta users in 30 days.",
  budgetBand: "$10k-$25k",
  tone: "technical",
  outputLocale: "en"
};

function fieldError(
  fieldErrors: ProjectIntakeFieldErrors,
  field: keyof ProjectIntakeFormValues,
  intake: IntakeCopy
) {
  if (!fieldErrors[field]?.length) return undefined;
  return intake.fieldErrors[field] ?? fieldErrors[field]?.[0];
}

function Field({
  label,
  description,
  error,
  children,
  asLabel = true
}: {
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  asLabel?: boolean;
}) {
  const content = (
    <>
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error ? <span className="text-xs leading-5 text-red-600">{error}</span> : null}
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
  defaultValues = [],
  error
}: {
  name: "targetMarkets" | "audiences";
  options: readonly string[];
  labels: Partial<Record<string, string>>;
  defaultValues?: readonly string[];
  error?: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm transition-colors duration-200 hover:bg-secondary",
              error ? "border-red-200" : "border-border"
            )}
          >
            <Checkbox name={name} value={option} defaultChecked={defaultValues.includes(option)} />
            <span>{labels[option] ?? option}</span>
          </label>
        ))}
      </div>
      {error ? <span className="text-xs leading-5 text-red-600">{error}</span> : null}
    </div>
  );
}

function SubmitButton({ intake }: { intake: IntakeCopy }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={pending}>
      {pending ? intake.submitPending : intake.submit}
    </Button>
  );
}

function setNamedValue(form: HTMLFormElement, name: string, value: string) {
  const element = form.elements.namedItem(name);
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    element.value = value;
  }
}

export function ProjectIntakeFormClient({
  locale,
  intake,
  options,
  initialError = false
}: {
  locale: Locale;
  intake: IntakeCopy;
  options: OptionCopy;
  initialError?: boolean;
}) {
  const initialState = {
    ...initialProjectIntakeFormState,
    status: initialError ? "error" as const : initialProjectIntakeFormState.status,
    message: initialError ? intake.formError : undefined,
    values: {
      ...initialProjectIntakeFormState.values,
      outputLocale: locale
    }
  };
  const [state, formAction] = useActionState(createProjectAndCampaign, initialState);
  const [hideErrors, setHideErrors] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const showErrors = state.status === "error" && !hideErrors;
  const fieldErrors = showErrors ? state.fieldErrors : {};
  const values = state.values;

  function applySample() {
    const form = formRef.current;
    if (!form) return;

    const sample = {
      ...sampleValues,
      outputLocale: locale
    };
    setNamedValue(form, "name", sample.name);
    setNamedValue(form, "website", sample.website);
    setNamedValue(form, "category", sample.category);
    setNamedValue(form, "stage", sample.stage);
    setNamedValue(form, "budgetBand", sample.budgetBand);
    setNamedValue(form, "outputLocale", sample.outputLocale);
    setNamedValue(form, "summary", sample.summary);
    setNamedValue(form, "moat", sample.moat);
    setNamedValue(form, "launchGoal", sample.launchGoal);
    setNamedValue(form, "tone", sample.tone);

    form.querySelectorAll<HTMLInputElement>('input[name="targetMarkets"]').forEach((input) => {
      input.checked = sample.targetMarkets.includes(input.value as ProjectIntakeFormValues["targetMarkets"][number]);
    });
    form.querySelectorAll<HTMLInputElement>('input[name="audiences"]').forEach((input) => {
      input.checked = sample.audiences.includes(input.value as ProjectIntakeFormValues["audiences"][number]);
    });
    setHideErrors(true);
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-6 xl:grid-cols-[1fr_360px]"
      onChange={() => setHideErrors(true)}
      onSubmit={() => setHideErrors(false)}
    >
      <input type="hidden" name="locale" value={locale} />
      <Card>
        <CardHeader className="gap-3">
          <div>
            <CardTitle>{intake.cardTitle}</CardTitle>
            <CardDescription>{intake.cardDescription}</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={applySample}>
              {intake.sampleButton}
            </Button>
            <span className="text-xs text-muted-foreground">{intake.sampleDescription}</span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5">
          {showErrors ? (
            <div role="alert" className="rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm leading-6 text-orange-900">
              {state.message ?? intake.formError}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={intake.productName} error={fieldError(fieldErrors, "name", intake)}>
              <Input name="name" placeholder="VectorForge" defaultValue={values.name} required />
            </Field>
            <Field label={intake.website} error={fieldError(fieldErrors, "website", intake)}>
              <Input name="website" placeholder="https://example.ai" type="url" defaultValue={values.website} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={intake.category} error={fieldError(fieldErrors, "category", intake)}>
              <Select name="category" defaultValue={values.category}>
                {categories.map((category) => (
                  <option key={category} value={category}>{options.categories[category]}</option>
                ))}
              </Select>
            </Field>
            <Field label={intake.stage} error={fieldError(fieldErrors, "stage", intake)}>
              <Select name="stage" defaultValue={values.stage}>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>{options.stages[stage]}</option>
                ))}
              </Select>
            </Field>
            <Field label={intake.budgetBand} error={fieldError(fieldErrors, "budgetBand", intake)}>
              <Select name="budgetBand" defaultValue={values.budgetBand}>
                {budgetBands.map((band) => (
                  <option key={band} value={band}>{band}</option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
            <Field label={intake.outputLanguage} error={fieldError(fieldErrors, "outputLocale", intake)}>
              <Select name="outputLocale" defaultValue={values.outputLocale}>
                {outputLocales.map((outputLocale) => (
                  <option key={outputLocale} value={outputLocale}>
                    {options.outputLocales[outputLocale]}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field
            label={intake.targetMarkets}
            description={intake.targetMarketsDescription}
            asLabel={false}
          >
            <CheckboxGroup
              name="targetMarkets"
              options={markets}
              labels={options.markets}
              defaultValues={values.targetMarkets}
              error={fieldError(fieldErrors, "targetMarkets", intake)}
            />
          </Field>

          <Field
            label={intake.targetAudiences}
            description={intake.targetAudiencesDescription}
            asLabel={false}
          >
            <CheckboxGroup
              name="audiences"
              options={audiences}
              labels={options.audiences}
              defaultValues={values.audiences}
              error={fieldError(fieldErrors, "audiences", intake)}
            />
          </Field>

          <Field label={intake.productSummary} error={fieldError(fieldErrors, "summary", intake)}>
            <Textarea
              name="summary"
              placeholder={intake.summaryPlaceholder}
              defaultValue={values.summary}
              required
            />
          </Field>

          <Field label={intake.moat} error={fieldError(fieldErrors, "moat", intake)}>
            <Textarea
              name="moat"
              placeholder={intake.moatPlaceholder}
              defaultValue={values.moat}
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
            <Field label={intake.launchGoal} error={fieldError(fieldErrors, "launchGoal", intake)}>
              <Input
                name="launchGoal"
                placeholder={intake.launchGoalPlaceholder}
                defaultValue={values.launchGoal}
                required
              />
            </Field>
            <Field label={intake.tone} error={fieldError(fieldErrors, "tone", intake)}>
              <Select name="tone" defaultValue={values.tone}>
                {tones.map((tone) => (
                  <option key={tone} value={tone}>{options.tones[tone]}</option>
                ))}
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{intake.outputsTitle}</CardTitle>
            <CardDescription>{intake.outputsDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {intake.outputs.map((output) => (
              <p key={output}>{output}</p>
            ))}
            <p className="border-t border-border pt-3 text-xs leading-5">{intake.submitHint}</p>
          </CardContent>
        </Card>
        <SubmitButton intake={intake} />
      </aside>
    </form>
  );
}
