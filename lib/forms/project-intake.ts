import type { z } from "zod";
import type { ProjectIntakeInput } from "@/lib/validation/project";

export type ProjectIntakeFormValues = ProjectIntakeInput;

export type ProjectIntakeFieldErrors = Partial<Record<keyof ProjectIntakeFormValues, string[]>>;

export type ProjectIntakeFormState = {
  status: "idle" | "error";
  message?: string;
  values: ProjectIntakeFormValues;
  fieldErrors: ProjectIntakeFieldErrors;
};

export const initialProjectIntakeFormState: ProjectIntakeFormState = {
  status: "idle",
  values: {
    name: "",
    website: "",
    category: "AI Infra",
    stage: "pre-launch",
    targetMarkets: ["US", "Japan"],
    audiences: ["developers", "AI researchers"],
    summary: "",
    moat: "",
    launchGoal: "",
    budgetBand: "$10k-$25k",
    tone: "technical",
    outputLocale: "en"
  },
  fieldErrors: {}
};

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export function projectIntakeValuesFromFormData(formData: FormData): ProjectIntakeFormValues {
  return {
    name: value(formData, "name"),
    website: value(formData, "website"),
    category: value(formData, "category") as ProjectIntakeFormValues["category"],
    stage: value(formData, "stage") as ProjectIntakeFormValues["stage"],
    targetMarkets: formData.getAll("targetMarkets").map(String) as ProjectIntakeFormValues["targetMarkets"],
    audiences: formData.getAll("audiences").map(String) as ProjectIntakeFormValues["audiences"],
    summary: value(formData, "summary"),
    moat: value(formData, "moat"),
    launchGoal: value(formData, "launchGoal"),
    budgetBand: value(formData, "budgetBand") as ProjectIntakeFormValues["budgetBand"],
    tone: value(formData, "tone") as ProjectIntakeFormValues["tone"],
    outputLocale: (value(formData, "outputLocale") || "en") as ProjectIntakeFormValues["outputLocale"]
  };
}

export function validationFailureState(
  values: ProjectIntakeFormValues,
  error: z.ZodError<ProjectIntakeFormValues>,
  message = "Please review the highlighted fields."
): ProjectIntakeFormState {
  return {
    status: "error",
    message,
    values,
    fieldErrors: error.flatten().fieldErrors
  };
}
