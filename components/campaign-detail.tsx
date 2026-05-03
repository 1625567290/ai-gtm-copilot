import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { Download, PenLine } from "lucide-react";
import { updateCampaign } from "@/app/actions/campaigns";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { campaignRecordToPlan, projectRecordToInput } from "@/lib/gtm/persistence";
import { cn } from "@/lib/utils";

export function CampaignDetail({ campaign }: { campaign: Campaign & { project: Project } }) {
  const plan = campaignRecordToPlan(campaign);
  const project = projectRecordToInput(campaign.project);
  const updateAction = updateCampaign.bind(null, campaign.id);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-xl">{campaign.name}</CardTitle>
              <CardDescription>
                {project.category} · {project.stage} · {project.targetMarkets.join(", ")}
              </CardDescription>
            </div>
            <Badge variant="default">{campaign.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Launch readiness</span>
                <span className="font-semibold">{plan.readinessScore}/100</span>
              </div>
              <Progress value={plan.readinessScore} />
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <h2 className="text-sm font-semibold">Positioning</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{plan.positioning}</p>
            </div>
            <div className="rounded-lg border border-border bg-white p-4">
              <h2 className="text-sm font-semibold">ICP</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{plan.icp}</p>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Channel Mix</CardTitle>
              <CardDescription>Priority plays for launch distribution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.channelMix.map((channel) => (
                <div key={channel.name} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{channel.name}</h3>
                    <Badge variant={channel.priority === "primary" ? "default" : "secondary"}>
                      {channel.priority}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{channel.role}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>KOL Plan</CardTitle>
              <CardDescription>Archetypes to brief by market and budget mode.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.kolPlan.map((kol) => (
                <div key={`${kol.market}-${kol.archetype}`} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{kol.archetype}</h3>
                    <Badge variant="outline">{kol.market}</Badge>
                  </div>
                  <p className="mt-1 text-xs font-medium text-primary">{kol.budget}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{kol.brief}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Content Angles</CardTitle>
            <CardDescription>Storylines for founder posts, KOL briefs, media pitches, and community assets.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {plan.contentAngles.map((angle, index) => (
              <div key={angle} className="rounded-md border border-border bg-white p-3 text-sm leading-6">
                <span className="mr-2 text-xs font-semibold text-primary">Angle {index + 1}</span>
                {angle}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>14-Day Launch Calendar</CardTitle>
            <CardDescription>Operator-ready sequence from narrative setup to conversion proof.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {plan.launchCalendar.map((item) => (
                <div key={item.day} className="rounded-md border border-border bg-white p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">Day {item.day}</h3>
                    <Badge variant="secondary">{item.owner}</Badge>
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{item.focus}</p>
                  <p className="mt-2 text-sm leading-6">{item.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Controls</CardTitle>
            <CardDescription>Update operating state and internal notes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateAction} className="space-y-4">
              <label className="grid gap-2 text-sm font-medium">
                Status
                <Select name="status" defaultValue={campaign.status}>
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                  <option value="paused">paused</option>
                  <option value="completed">completed</option>
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Priority
                <Select name="priority" defaultValue={campaign.priority}>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Internal notes
                <Textarea name="notes" defaultValue={campaign.notes} placeholder="Add operator notes..." />
              </label>
              <Button type="submit" className="w-full cursor-pointer">
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Save changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Brief</CardTitle>
            <CardDescription>Download a markdown launch brief for sharing or deck prep.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/campaigns/${campaign.id}/export`}
              className={cn(buttonVariants({ variant: "accent" }), "w-full cursor-pointer")}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export markdown
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metrics</CardTitle>
            <CardDescription>Recommended success signals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {plan.successMetrics.map((metric) => (
              <div key={metric} className="rounded-md bg-secondary px-3 py-2 text-sm">{metric}</div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {plan.risks.map((risk) => (
              <div key={risk} className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-900">
                {risk}
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
