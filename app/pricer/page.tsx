import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight, Calculator, FilePlus2, ReceiptText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CampaignSwitcher } from "@/components/campaign-switcher";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ensureDemoDatabase } from "@/lib/db/bootstrap";
import { prisma } from "@/lib/db/prisma";
import { campaignRecordToPlan, projectRecordToInput } from "@/lib/gtm/persistence";
import { buildKolPricing, type KolPricingPackage } from "@/lib/gtm/workbenches";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CampaignWithProject = Campaign & { project: Project };

function paramValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function priorityVariant(priority: KolPricingPackage["priority"]) {
  if (priority === "core") return "success";
  if (priority === "supporting") return "default";
  return "secondary";
}

export default async function KolPricerPage({
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
  const pricing = project && campaignPlan ? buildKolPricing(project, campaignPlan, locale) : null;

  return (
    <AppShell
      title={dictionary.pricer.title}
      eyebrow={dictionary.pricer.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/pricer"
      action={
        <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          {dictionary.pricer.createProject}
        </Link>
      }
    >
      {selectedCampaign && project && pricing ? (
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <CampaignSwitcher
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              locale={locale}
              basePath="/pricer"
              title={dictionary.pricer.campaignsTitle}
              description={dictionary.pricer.campaignsDescription}
            />

            <Card className="border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle>{dictionary.pricer.summaryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.recommendedMarket}</p>
                  <p className="mt-1 text-2xl font-semibold">{pricing.summary.recommendedMarket}</p>
                </div>
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.totalBudget}</p>
                  <p className="mt-1 text-2xl font-semibold">{pricing.summary.totalBudgetRange}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-border bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.targetExposure}</p>
                    <p className="mt-1 text-lg font-semibold">{pricing.summary.targetExposure}</p>
                  </div>
                  <div className="rounded-md border border-border bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.blendedCpm}</p>
                    <p className="mt-1 text-lg font-semibold">{pricing.summary.blendedCpm}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.pricer.packagesTitle}</CardTitle>
                  </div>
                  <CardDescription>{dictionary.pricer.packagesDescription}</CardDescription>
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
                {pricing.packages.map((item) => (
                  <article key={`${item.market}-${item.archetype}`} className="rounded-md border border-border bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-base font-semibold">{item.market}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{item.archetype}</p>
                      </div>
                      <Badge variant={priorityVariant(item.priority)}>
                        {dictionary.pricer.priorityLabels[item.priority]}
                      </Badge>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-md bg-secondary p-3">
                        <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.priceRange}</p>
                        <p className="mt-1 text-sm font-semibold">{item.priceRange}</p>
                      </div>
                      <div className="rounded-md bg-secondary p-3">
                        <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.exposure}</p>
                        <p className="mt-1 text-sm font-semibold">{item.exposureRange}</p>
                      </div>
                      <div className="rounded-md bg-secondary p-3">
                        <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.cpm}</p>
                        <p className="mt-1 text-sm font-semibold">{item.cpm}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-md border border-border p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <ReceiptText className="h-4 w-4 text-primary" aria-hidden="true" />
                        {item.packageName}
                      </div>
                      <ul className="mt-3 grid gap-2">
                        {item.deliverables.map((deliverable) => (
                          <li key={deliverable} className="text-sm leading-6 text-slate-700">
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-medium text-muted-foreground">{dictionary.pricer.rationale}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-700">{item.rationale}</p>
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
            <Calculator className="h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">{dictionary.pricer.emptyTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{dictionary.pricer.emptyDescription}</p>
            <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "accent" }), "mt-5 cursor-pointer")}>
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              {dictionary.pricer.createProject}
            </Link>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
