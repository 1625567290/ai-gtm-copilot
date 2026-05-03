import { createProjectAndCampaign } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  audiences,
  budgetBands,
  categories,
  markets,
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
  options
}: {
  name: string;
  options: readonly string[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm transition-colors duration-200 hover:bg-secondary"
        >
          <Checkbox name={name} value={option} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export function ProjectIntakeForm() {
  return (
    <form action={createProjectAndCampaign} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <CardTitle>Product Intake</CardTitle>
          <CardDescription>
            Capture enough context for a GTM strategist to generate a credible launch plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Product name">
              <Input name="name" placeholder="VectorForge" required />
            </Field>
            <Field label="Website">
              <Input name="website" placeholder="https://example.ai" type="url" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Category">
              <Select name="category" defaultValue="AI Infra">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>
            </Field>
            <Field label="Stage">
              <Select name="stage" defaultValue="pre-launch">
                {stages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </Select>
            </Field>
            <Field label="Budget band">
              <Select name="budgetBand" defaultValue="$10k-$25k">
                {budgetBands.map((band) => (
                  <option key={band} value={band}>{band}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Target markets" description="Pick the first markets you would activate." asLabel={false}>
            <CheckboxGroup name="targetMarkets" options={markets} />
          </Field>

          <Field label="Target audiences" description="Pick the buyers, users, or amplifiers the launch must reach." asLabel={false}>
            <CheckboxGroup name="audiences" options={audiences} />
          </Field>

          <Field label="Product summary">
            <Textarea
              name="summary"
              placeholder="What does the product do, who uses it, and what pain does it solve?"
              required
            />
          </Field>

          <Field label="Differentiation or moat">
            <Textarea
              name="moat"
              placeholder="What is technically, strategically, or distributionally hard to copy?"
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
            <Field label="Launch goal">
              <Input name="launchGoal" placeholder="Recruit 500 technical beta users in 30 days." required />
            </Field>
            <Field label="Tone">
              <Select name="tone" defaultValue="technical">
                {tones.map((tone) => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Generated outputs</CardTitle>
            <CardDescription>The Copilot saves a campaign immediately after generation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Positioning and ICP</p>
            <p>Channel mix and KOL archetypes</p>
            <p>Five content angles</p>
            <p>14-day launch calendar</p>
            <p>Metrics, risks, and markdown export</p>
          </CardContent>
        </Card>
        <Button type="submit" className="w-full cursor-pointer" size="lg">
          Generate GTM plan
        </Button>
      </aside>
    </form>
  );
}
