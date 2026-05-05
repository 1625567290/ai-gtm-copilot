import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight, FilePlus2, Megaphone, MessageSquareText, PenLine, ScrollText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CampaignSwitcher } from "@/components/campaign-switcher";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db/prisma";
import { campaignRecordToPlan, projectRecordToInput } from "@/lib/gtm/persistence";
import { buildFounderStoryAssets } from "@/lib/gtm/workbenches";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CampaignWithProject = Campaign & { project: Project };

function paramValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StoryStudioPage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[]; campaignId?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);
  const dictionary = getDictionary(locale);
  const campaigns: CampaignWithProject[] = await prisma.campaign.findMany({
    include: { project: true },
    orderBy: { updatedAt: "desc" },
    take: 10
  });
  const selectedId = paramValue(params?.campaignId);
  const selectedCampaign = campaigns.find((campaign) => campaign.id === selectedId) ?? campaigns[0];
  const project = selectedCampaign ? projectRecordToInput(selectedCampaign.project) : null;
  const campaignPlan = selectedCampaign ? campaignRecordToPlan(selectedCampaign) : null;
  const assets = project && campaignPlan ? buildFounderStoryAssets(project, campaignPlan, locale) : null;

  return (
    <AppShell
      title={dictionary.story.title}
      eyebrow={dictionary.story.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/story"
      action={
        <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          {dictionary.story.createProject}
        </Link>
      }
    >
      {selectedCampaign && assets ? (
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <CampaignSwitcher
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              locale={locale}
              basePath="/story"
              title={dictionary.story.campaignsTitle}
              description={dictionary.story.campaignsDescription}
            />

            <Card className="border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle>{selectedCampaign.project.name}</CardTitle>
                <CardDescription>{selectedCampaign.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="default">{dictionary.campaign.contentAngles}</Badge>
                {campaignPlan?.contentAngles.slice(0, 3).map((angle, index) => (
                  <div key={angle} className="rounded-md border border-border bg-white p-3 text-sm leading-6 text-slate-700">
                    <span className="mr-2 text-xs font-semibold text-primary">{index + 1}</span>
                    {angle}
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <PenLine className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.story.founderStory}</CardTitle>
                  </div>
                  <CardDescription>{assets.founderStory.headline}</CardDescription>
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
                  <p className="text-sm leading-6 text-slate-700">{assets.founderStory.body}</p>
                </div>
              </CardContent>
            </Card>

            <section className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.story.mediaPitch}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-md border border-border bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">{dictionary.story.subject}</p>
                    <p className="mt-1 text-sm font-semibold">{assets.mediaPitch.subject}</p>
                  </div>
                  <p className="rounded-md bg-secondary p-3 text-sm leading-6 text-slate-700">{assets.mediaPitch.body}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.story.communityAnnouncement}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-md border border-border bg-white p-3">
                    <p className="text-sm font-semibold">{assets.communityAnnouncement.title}</p>
                  </div>
                  <p className="rounded-md bg-secondary p-3 text-sm leading-6 text-slate-700">
                    {assets.communityAnnouncement.body}
                  </p>
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ScrollText className="h-4 w-4 text-primary" aria-hidden="true" />
                  <CardTitle>{dictionary.story.xThread}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {assets.xThread.map((post, index) => (
                  <div key={post} className="grid grid-cols-[2rem_1fr] gap-3 rounded-md border border-border bg-white p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <p className="self-center text-sm leading-6 text-slate-700">{post}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <PenLine className="h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">{dictionary.story.emptyTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{dictionary.story.emptyDescription}</p>
            <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "accent" }), "mt-5 cursor-pointer")}>
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              {dictionary.story.createProject}
            </Link>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
