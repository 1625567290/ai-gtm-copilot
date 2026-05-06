import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  ClipboardList,
  FilePlus2,
  Flame,
  MessageSquareQuote,
  RadioTower,
  SearchCheck,
  SignalHigh,
  UsersRound
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CampaignSwitcher } from "@/components/campaign-switcher";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ensureDemoDatabase } from "@/lib/db/bootstrap";
import { prisma } from "@/lib/db/prisma";
import { campaignRecordToPlan, projectRecordToInput } from "@/lib/gtm/persistence";
import { buildSocialListeningRadar, type SignalAction, type SignalTopic, type SocialSignal } from "@/lib/gtm/workbenches";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CampaignWithProject = Campaign & { project: Project };

function paramValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function sentimentVariant(sentiment: SocialSignal["sentiment"]) {
  if (sentiment === "positive") return "success";
  if (sentiment === "mixed") return "default";
  return "accent";
}

function urgencyVariant(urgency: SignalTopic["urgency"]) {
  if (urgency === "high") return "accent";
  if (urgency === "medium") return "default";
  return "secondary";
}

function priorityVariant(priority: SignalAction["priority"]) {
  if (priority === "high") return "accent";
  if (priority === "medium") return "default";
  return "secondary";
}

export default async function SocialRadarPage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[]; campaignId?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);
  const dictionary = getDictionary(locale);
  await ensureDemoDatabase();
  const campaigns: CampaignWithProject[] = await prisma.campaign.findMany({
    include: { project: true },
    orderBy: { updatedAt: "desc" },
    take: 10
  });
  const selectedId = paramValue(params?.campaignId);
  const selectedCampaign = campaigns.find((campaign) => campaign.id === selectedId) ?? campaigns[0];
  const project = selectedCampaign ? projectRecordToInput(selectedCampaign.project) : null;
  const campaignPlan = selectedCampaign ? campaignRecordToPlan(selectedCampaign) : null;
  const radar = project && campaignPlan ? buildSocialListeningRadar(project, campaignPlan, locale) : null;

  return (
    <AppShell
      title={dictionary.radar.title}
      eyebrow={dictionary.radar.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/radar"
      action={
        <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          {dictionary.radar.createProject}
        </Link>
      }
    >
      {selectedCampaign && radar ? (
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <CampaignSwitcher
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              locale={locale}
              basePath="/radar"
              title={dictionary.radar.campaignsTitle}
              description={dictionary.radar.campaignsDescription}
            />

            <Card className="border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle>{dictionary.radar.summaryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.radar.topMarket}</p>
                  <p className="mt-1 text-2xl font-semibold">{radar.summary.topMarket}</p>
                </div>
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.radar.opportunityScore}</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {radar.stats.opportunityScore}
                    <span className="text-sm text-muted-foreground">/100</span>
                  </p>
                  <Progress value={radar.stats.opportunityScore} className="mt-3" />
                </div>
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.radar.recommendedAngle}</p>
                  <p className="mt-1 text-sm font-medium leading-6">{radar.summary.recommendedAngle}</p>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <Card>
                <CardHeader className="space-y-0 pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" aria-hidden="true" />
                    {dictionary.radar.totalSignals}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{radar.stats.totalSignals}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-0 pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
                    {dictionary.radar.highUrgency}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{radar.stats.highUrgency}</div>
                </CardContent>
              </Card>
              {(["positive", "mixed", "watch"] as const).map((sentiment) => (
                <Card key={sentiment}>
                  <CardHeader className="space-y-0 pb-3">
                    <CardTitle>{dictionary.radar.sentimentLabels[sentiment]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold">{radar.stats[sentiment]}</div>
                  </CardContent>
                </Card>
              ))}
            </section>

            <Card>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <RadioTower className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.radar.topicsTitle}</CardTitle>
                  </div>
                  <CardDescription>{dictionary.radar.topicsDescription}</CardDescription>
                </div>
                <Link
                  href={withLocale(`/campaigns/${selectedCampaign.id}`, locale)}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer")}
                >
                  {dictionary.common.view}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                {radar.topics.map((topic) => (
                  <article key={topic.name} className="rounded-md border border-border bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-base font-semibold">{topic.name}</h2>
                        <p className="mt-1 text-xs text-muted-foreground">{dictionary.radar.topicUrgency}</p>
                      </div>
                      <Badge variant={urgencyVariant(topic.urgency)}>{dictionary.radar.urgencyLabels[topic.urgency]}</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{dictionary.radar.signalStrength}</span>
                        <span className="font-semibold">{topic.strength}/100</span>
                      </div>
                      <Progress value={topic.strength} />
                    </div>
                    <dl className="mt-4 grid gap-3 text-sm">
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">{dictionary.radar.topicRationale}</dt>
                        <dd className="mt-1 leading-6 text-slate-700">{topic.rationale}</dd>
                      </div>
                      <div className="rounded-md bg-secondary p-3">
                        <dt className="text-xs font-medium text-muted-foreground">{dictionary.radar.recommendedAction}</dt>
                        <dd className="mt-1 leading-6 text-slate-700">{topic.recommendedAction}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </CardContent>
            </Card>

            <section className="grid gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <UsersRound className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.radar.keyVoicesTitle}</CardTitle>
                  </div>
                  <CardDescription>{dictionary.radar.keyVoicesDescription}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {radar.keyVoices.map((voice) => (
                    <article key={`${voice.name}-${voice.market}`} className="rounded-md border border-border bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-sm font-semibold">{voice.name}</h2>
                          <p className="mt-1 text-xs text-muted-foreground">{voice.role} · {voice.market}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        <span className="font-medium">{dictionary.radar.whyItMatters}: </span>
                        {voice.whyItMatters}
                      </p>
                      <p className="mt-2 rounded-md bg-secondary p-3 text-sm leading-6 text-slate-700">
                        <span className="font-medium">{dictionary.radar.activationMove}: </span>
                        {voice.activationMove}
                      </p>
                    </article>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.radar.actionQueueTitle}</CardTitle>
                  </div>
                  <CardDescription>{dictionary.radar.actionQueueDescription}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {radar.actionQueue.map((item) => (
                    <article key={`${item.action}-${item.channel}`} className="rounded-md border border-border bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-sm font-semibold leading-6">{item.action}</h2>
                        <Badge variant={priorityVariant(item.priority)}>
                          {dictionary.options.priorities[item.priority]}
                        </Badge>
                      </div>
                      <dl className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                        <div>
                          <dt>{dictionary.radar.channel}</dt>
                          <dd className="mt-1 font-medium text-slate-700">{item.channel}</dd>
                        </div>
                        <div>
                          <dt>{dictionary.radar.owner}</dt>
                          <dd className="mt-1 font-medium text-slate-700">{item.owner}</dd>
                        </div>
                      </dl>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        <span className="font-medium">{dictionary.radar.evidence}: </span>
                        {item.evidence}
                      </p>
                    </article>
                  ))}
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="h-4 w-4 text-primary" aria-hidden="true" />
                  <CardTitle>{dictionary.radar.strategyReport}</CardTitle>
                </div>
                <CardDescription>{selectedCampaign.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-slate-700">{radar.strategyReport}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={withLocale(`/kol?campaignId=${selectedCampaign.id}`, locale)}
                    className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
                  >
                    <UsersRound className="h-4 w-4" aria-hidden="true" />
                    {dictionary.radar.openKolAction}
                  </Link>
                  <Link
                    href={withLocale(`/pricer?campaignId=${selectedCampaign.id}`, locale)}
                    className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    {dictionary.radar.openPricer}
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <SignalHigh className="h-4 w-4 text-primary" aria-hidden="true" />
                  <CardTitle>{dictionary.radar.signalsTitle}</CardTitle>
                </div>
                <CardDescription>{dictionary.radar.signalsDescription}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                {radar.signals.map((signal) => (
                  <article key={`${signal.source}-${signal.topic}`} className="rounded-md border border-border bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <SearchCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                          <h2 className="text-base font-semibold">{signal.topic}</h2>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{signal.source} · {signal.market}</p>
                      </div>
                      <Badge variant={sentimentVariant(signal.sentiment)}>
                        {dictionary.radar.sentimentLabels[signal.sentiment]}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{dictionary.radar.signalStrength}</span>
                        <span className="font-semibold">{signal.strength}/100</span>
                      </div>
                      <Progress value={signal.strength} />
                    </div>
                    <div className="mt-4 rounded-md bg-secondary p-3">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <SignalHigh className="h-4 w-4 text-primary" aria-hidden="true" />
                        {dictionary.radar.recommendedMove}
                      </div>
                      <p className="text-sm leading-6 text-slate-700">{signal.recommendedMove}</p>
                    </div>
                  </article>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <RadioTower className="h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">{dictionary.radar.emptyTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{dictionary.radar.emptyDescription}</p>
            <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "accent" }), "mt-5 cursor-pointer")}>
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              {dictionary.radar.createProject}
            </Link>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
