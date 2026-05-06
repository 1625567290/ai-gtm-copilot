import { describe, expect, it } from "vitest";
import {
  initialProjectIntakeFormState,
  projectIntakeValuesFromFormData,
  validationFailureState
} from "../lib/forms/project-intake";
import { projectIntakeSchema } from "../lib/validation/project";

describe("project intake form state", () => {
  it("keeps checkbox arrays and text values from form data", () => {
    const formData = new FormData();
    formData.set("name", "TinyAgent");
    formData.set("website", "https://tinyagent.ai");
    formData.set("category", "GenAI App");
    formData.set("stage", "public beta");
    formData.append("targetMarkets", "US");
    formData.append("targetMarkets", "Japan");
    formData.append("audiences", "developers");
    formData.append("audiences", "founders");
    formData.set("summary", "AI agent launch monitor");
    formData.set("moat", "Fast signal routing");
    formData.set("launchGoal", "Demo-ready launch report");
    formData.set("budgetBand", "$10k-$25k");
    formData.set("tone", "technical");
    formData.set("outputLocale", "en");

    expect(projectIntakeValuesFromFormData(formData)).toMatchObject({
      name: "TinyAgent",
      targetMarkets: ["US", "Japan"],
      audiences: ["developers", "founders"],
      outputLocale: "en"
    });
  });

  it("returns field-level errors without losing entered values", () => {
    const values = {
      ...initialProjectIntakeFormState.values,
      name: "",
      website: "not-a-url",
      targetMarkets: [],
      audiences: [],
      summary: "Signal radar",
      moat: "Fast",
      launchGoal: "Launch"
    };
    const result = projectIntakeSchema.safeParse(values);

    expect(result.success).toBe(false);
    if (!result.success) {
      const state = validationFailureState(values, result.error);

      expect(state.status).toBe("error");
      expect(state.values.website).toBe("not-a-url");
      expect(state.fieldErrors.name).toBeDefined();
      expect(state.fieldErrors.website).toBeDefined();
      expect(state.fieldErrors.targetMarkets).toBeDefined();
      expect(state.fieldErrors.audiences).toBeDefined();
    }
  });
});
