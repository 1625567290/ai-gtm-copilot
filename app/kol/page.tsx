import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight, FilePlus2, Target, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/lib/db/prisma";
import { campaignRecordToPlan, projectRecordToInput } from "@/lib/gtm/persistence";
import { buildKolMarketFit, type KolMarketFit } from "@/lib/gtm/kol";
import { getDictionary, getLocale, localeLabels, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CampaignWithProject = Campaign & { project: Project };

function paramValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function tierVariant(tier: KolMarketFit["tier"]) {
  if (tier === "Core") return "success";
  if (tier === "Expansion") return "default";
  return "secondary";
}

export default async function KolStudioPage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[]; campaignId?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);
  const dictionary = getDictionary(locale);
  const campaigns = await prisma.campaign.findMany({
    include: { project: true },
    orderBy: { updatedAt: "desc" },
    take: 10
  });
  const selectedId = paramValue(params?.campaignId);
  const selectedCampaign = campaigns.find((campaign) => campaign.id === selectedId) ?? campaigns[0];

  const project = selectedCampaign ? projectRecordToInput(selectedCampaign.project) : null;
  const campaignPlan = selectedCampaign ? campaignRecordToPlan(selectedCampaign) : null;
  const fitPlan = project && campaignPlan ? buildKolMarketFit(project, campaignPlan) : null;

  return (
    <AppShell
      title={dictionary.kol.title}
      eyebrow={dictionary.kol.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/kol"
      action={
        <Link
          href={withLocale("/projects/new", locale)}
          className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
        >
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          {dictionary.kol.createProject}
        </Link>
      }
    >
      {selectedCampaign && project && fitPlan ? (
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{dictionary.kol.campaignsTitle}</CardTitle>
                <CardDescription>{dictionary.kol.campaignsDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {campaigns.map((campaign) => {
                  const active = campaign.id === selectedCampaign.id;
                  return (
                    <Link
                      key={campaign.id}
                      href={withLocale(`/kol?campaignId=${campaign.id}`, locale)}
                      className={cn(
                        "block cursor-pointer rounded-md border p-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active ? "border-primary bg-primary/5" : "border-border bg-white hover:bg-secondary"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">{campaign.project.name}</span>
                        <Badge variant="outline">
                          {localeLabels[campaign.project.outputLocale as keyof typeof localeLabels] ?? campaign.project.outputLocale}
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{campaign.name}</p>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle>{dictionary.kol.summaryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.kol.bestMarket}</p>
                  <p className="mt-1 text-2xl font-semibold">{fitPlan.summary.bestMarket}</p>
                </div>
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.kol.avgFit}</p>
                  <p className="mt-1 text-2xl font-semibold">{fitPlan.summary.averageScore}<span className="text-sm text-muted-foreground">/100</span></p>
                  <Progress value={fitPlan.summary.averageScore} className="mt-3" />
                </div>
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.kol.coreMarkets}</p>
                  <p className="mt-1 text-2xl font-semibold">{fitPlan.summary.coreMarketCount}</p>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle>{selectedCampaign.name}</CardTitle>
                  <CardDescription>
                    {dictionary.options.categories[project.category]} ·{" "}
                    {project.targetMarkets.map((market) => dictionary.options.markets[market]).join(", ")}
                  </CardDescription>
                </div>
                <Link
                  href={withLocale(`/campaigns/${selectedCampaign.id}`, locale)}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer")}
                >
                  {dictionary.common.view}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border bg-secondary/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <UsersRound className="h-4 w-4 text-primary" aria-hidden="true" />
                    {dictionary.kol.activationBrief}
                  </div>
                  <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{fitPlan.activationBrief}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" aria-hidden="true" />
                  <CardTitle>{dictionary.kol.marketFitMap}</CardTitle>
                </div>
                <CardDescription>{dictionary.kol.marketFitDescription}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                {fitPlan.marketFits.map((fit) => (
                  <article key={fit.market} className="rounded-md border border-border bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-base font-semibold">{fit.market}</h2>
                        <p className="mt-1 text-xs text-muted-foreground">{dictionary.kol.recommendedArchetype}</p>
                        <p className="mt-1 text-sm font-medium">{fit.recommendedArchetype}</p>
                      </div>
                      <Badge variant={tierVariant(fit.tier)}>{dictionary.kol.tierLabels[fit.tier]}</Badge>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{dictionary.kol.avgFit}</span>
                        <span className="font-semibold">{fit.score}/100</span>
                      </div>
                      <Progress value={fit.score} />
                    </div>

                    <dl className="mt-4 grid gap-3 text-sm">
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">{dictionary.kol.budgetMode}</dt>
                        <dd className="mt-1">{fit.budgetMode}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">{dictionary.kol.assetAngle}</dt>
                        <dd className="mt-1 leading-6">{fit.assetAngle}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">{dictionary.kol.rationale}</dt>
                        <dd className="mt-1 leading-6">{fit.rationale}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">{dictionary.kol.nextAction}</dt>
                        <dd className="mt-1 leading-6">{fit.nextAction}</dd>
                      </div>
                      <div className="rounded-md bg-secondary p-3">
                        <dt className="text-xs font-medium text-muted-foreground">{dictionary.kol.copyReadyBrief}</dt>
                        <dd className="mt-1 leading-6">{fit.brief}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <UsersRound className="h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">{dictionary.kol.emptyTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{dictionary.kol.emptyDescription}</p>
            <Link
              href={withLocale("/projects/new", locale)}
              className={cn(buttonVariants({ variant: "accent" }), "mt-5 cursor-pointer")}
            >
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              {dictionary.kol.createProject}
            </Link>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
