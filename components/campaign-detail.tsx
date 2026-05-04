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
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function formatDay(locale: Locale, label: string, day: number) {
  return locale === "zh" ? `${label} ${day} 天` : `${label} ${day}`;
}

export function CampaignDetail({
  campaign,
  locale,
  dictionary
}: {
  campaign: Campaign & { project: Project };
  locale: Locale;
  dictionary: Dictionary;
}) {
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
                {dictionary.options.categories[project.category]} · {dictionary.options.stages[project.stage]} ·{" "}
                {project.targetMarkets.map((market) => dictionary.options.markets[market]).join(", ")}
              </CardDescription>
            </div>
            <Badge variant="default">
              {dictionary.options.statuses[campaign.status as keyof typeof dictionary.options.statuses] ?? campaign.status}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">{dictionary.campaign.launchReadiness}</span>
                <span className="font-semibold">{plan.readinessScore}/100</span>
              </div>
              <Progress value={plan.readinessScore} />
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <h2 className="text-sm font-semibold">{dictionary.campaign.positioning}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{plan.positioning}</p>
            </div>
            <div className="rounded-lg border border-border bg-white p-4">
              <h2 className="text-sm font-semibold">{dictionary.campaign.icp}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{plan.icp}</p>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{dictionary.campaign.channelMix}</CardTitle>
              <CardDescription>{dictionary.campaign.channelDescription}</CardDescription>
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
              <CardTitle>{dictionary.campaign.kolPlan}</CardTitle>
              <CardDescription>{dictionary.campaign.kolDescription}</CardDescription>
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
            <CardTitle>{dictionary.campaign.contentAngles}</CardTitle>
            <CardDescription>{dictionary.campaign.contentDescription}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {plan.contentAngles.map((angle, index) => (
              <div key={angle} className="rounded-md border border-border bg-white p-3 text-sm leading-6">
                <span className="mr-2 text-xs font-semibold text-primary">{dictionary.campaign.angle} {index + 1}</span>
                {angle}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.campaign.calendar}</CardTitle>
            <CardDescription>{dictionary.campaign.calendarDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {plan.launchCalendar.map((item) => (
                <div key={item.day} className="rounded-md border border-border bg-white p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{formatDay(locale, dictionary.campaign.day, item.day)}</h3>
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
            <CardTitle>{dictionary.campaign.controls}</CardTitle>
            <CardDescription>{dictionary.campaign.controlsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateAction} className="space-y-4">
              <label className="grid gap-2 text-sm font-medium">
                {dictionary.campaign.status}
                <Select name="status" defaultValue={campaign.status}>
                  <option value="draft">{dictionary.options.statuses.draft}</option>
                  <option value="active">{dictionary.options.statuses.active}</option>
                  <option value="paused">{dictionary.options.statuses.paused}</option>
                  <option value="completed">{dictionary.options.statuses.completed}</option>
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                {dictionary.campaign.priority}
                <Select name="priority" defaultValue={campaign.priority}>
                  <option value="low">{dictionary.options.priorities.low}</option>
                  <option value="medium">{dictionary.options.priorities.medium}</option>
                  <option value="high">{dictionary.options.priorities.high}</option>
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                {dictionary.campaign.notes}
                <Textarea name="notes" defaultValue={campaign.notes} placeholder={dictionary.campaign.notesPlaceholder} />
              </label>
              <Button type="submit" className="w-full cursor-pointer">
                <PenLine className="h-4 w-4" aria-hidden="true" />
                {dictionary.common.saveChanges}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.campaign.exportBrief}</CardTitle>
            <CardDescription>{dictionary.campaign.exportDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/campaigns/${campaign.id}/export`}
              className={cn(buttonVariants({ variant: "accent" }), "w-full cursor-pointer")}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {dictionary.campaign.exportMarkdown}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.campaign.metrics}</CardTitle>
            <CardDescription>{dictionary.campaign.metricsDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {plan.successMetrics.map((metric) => (
              <div key={metric} className="rounded-md bg-secondary px-3 py-2 text-sm">{metric}</div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.campaign.risks}</CardTitle>
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
