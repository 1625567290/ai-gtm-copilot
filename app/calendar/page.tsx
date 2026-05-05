import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, FilePlus2, Flag, ListChecks } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CampaignSwitcher } from "@/components/campaign-switcher";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ensureDemoDatabase } from "@/lib/db/bootstrap";
import { prisma } from "@/lib/db/prisma";
import { campaignRecordToPlan, projectRecordToInput } from "@/lib/gtm/persistence";
import { buildCampaignTaskCalendar, type CampaignTask } from "@/lib/gtm/workbenches";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CampaignWithProject = Campaign & { project: Project };

function paramValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function priorityVariant(priority: CampaignTask["priority"]) {
  if (priority === "high") return "accent";
  if (priority === "medium") return "default";
  return "secondary";
}

export default async function CampaignCalendarPage({
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
  const calendar = project && campaignPlan ? buildCampaignTaskCalendar(project, campaignPlan, locale) : null;

  return (
    <AppShell
      title={dictionary.calendarWorkbench.title}
      eyebrow={dictionary.calendarWorkbench.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/calendar"
      action={
        <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          {dictionary.calendarWorkbench.createProject}
        </Link>
      }
    >
      {selectedCampaign && calendar ? (
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <CampaignSwitcher
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              locale={locale}
              basePath="/calendar"
              title={dictionary.calendarWorkbench.campaignsTitle}
              description={dictionary.calendarWorkbench.campaignsDescription}
            />

            <Card className="border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle>{dictionary.calendarWorkbench.summaryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-border bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">{dictionary.calendarWorkbench.totalTasks}</p>
                    <p className="mt-1 text-2xl font-semibold">{calendar.summary.totalTasks}</p>
                  </div>
                  <div className="rounded-md border border-border bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">{dictionary.calendarWorkbench.highPriority}</p>
                    <p className="mt-1 text-2xl font-semibold">{calendar.summary.highPriorityCount}</p>
                  </div>
                </div>
                <div className="rounded-md border border-border bg-white p-3">
                  <p className="text-xs font-medium text-muted-foreground">{dictionary.calendarWorkbench.nextMilestone}</p>
                  <p className="mt-1 text-sm font-semibold">{calendar.summary.nextMilestone}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-primary" aria-hidden="true" />
                  <CardTitle>{dictionary.calendarWorkbench.milestones}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {calendar.milestones.map((milestone) => (
                  <div key={milestone} className="rounded-md border border-border bg-white p-3 text-sm leading-6 text-slate-700">
                    {milestone}
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
                    <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />
                    <CardTitle>{dictionary.calendarWorkbench.tasksTitle}</CardTitle>
                  </div>
                  <CardDescription>{dictionary.calendarWorkbench.tasksDescription}</CardDescription>
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
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{dictionary.calendarWorkbench.day}</TableHead>
                        <TableHead>{dictionary.calendarWorkbench.task}</TableHead>
                        <TableHead>{dictionary.calendarWorkbench.owner}</TableHead>
                        <TableHead>{dictionary.calendarWorkbench.channel}</TableHead>
                        <TableHead>{dictionary.calendarWorkbench.deliverable}</TableHead>
                        <TableHead>{dictionary.calendarWorkbench.status}</TableHead>
                        <TableHead>{dictionary.calendarWorkbench.priority}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calendar.tasks.map((task) => (
                        <TableRow key={task.day}>
                          <TableCell>
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                              {task.day}
                            </div>
                          </TableCell>
                          <TableCell className="min-w-64">
                            <div className="font-medium">{task.task}</div>
                            <div className="mt-1 text-xs text-muted-foreground">{task.phase}</div>
                          </TableCell>
                          <TableCell>{task.owner}</TableCell>
                          <TableCell>{task.channel}</TableCell>
                          <TableCell>{task.deliverable}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{task.statusLabel}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={priorityVariant(task.priority)}>
                              {dictionary.calendarWorkbench.priorityLabels[task.priority]}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <CalendarDays className="h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">{dictionary.calendarWorkbench.emptyTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {dictionary.calendarWorkbench.emptyDescription}
            </p>
            <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "accent" }), "mt-5 cursor-pointer")}>
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              {dictionary.calendarWorkbench.createProject}
            </Link>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
