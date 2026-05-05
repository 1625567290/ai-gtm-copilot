import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight, Calculator, CalendarDays, Gauge, Layers3, PenLine, Plus, RadioTower, Target, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Dictionary, type Locale, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CampaignWithProject = Campaign & { project: Project };

function statusVariant(status: string) {
  if (status === "active") return "success";
  if (status === "completed") return "default";
  if (status === "paused") return "accent";
  return "secondary";
}

export function DashboardContent({
  projectCount,
  campaigns,
  averageScore,
  locale,
  dictionary
}: {
  projectCount: number;
  campaigns: CampaignWithProject[];
  averageScore: number;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const activeCount = campaigns.filter((campaign) => campaign.status === "active").length;
  const workbenches = [
    {
      href: "/kol",
      label: dictionary.app.navKolStudio,
      description: dictionary.dashboard.workbenchDescriptions.kol,
      icon: UsersRound
    },
    {
      href: "/pricer",
      label: dictionary.app.navPricer,
      description: dictionary.dashboard.workbenchDescriptions.pricer,
      icon: Calculator
    },
    {
      href: "/story",
      label: dictionary.app.navStory,
      description: dictionary.dashboard.workbenchDescriptions.story,
      icon: PenLine
    },
    {
      href: "/radar",
      label: dictionary.app.navRadar,
      description: dictionary.dashboard.workbenchDescriptions.radar,
      icon: RadioTower
    },
    {
      href: "/calendar",
      label: dictionary.app.navCalendar,
      description: dictionary.dashboard.workbenchDescriptions.calendar,
      icon: CalendarDays
    }
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>{dictionary.dashboard.projects}</CardTitle>
            <Layers3 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{projectCount}</div>
            <p className="mt-1 text-sm text-muted-foreground">{dictionary.dashboard.projectsDescription}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>{dictionary.dashboard.campaigns}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{campaigns.length}</div>
            <p className="mt-1 text-sm text-muted-foreground">{dictionary.dashboard.activeLaunchPlans(activeCount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>{dictionary.dashboard.avgReadiness}</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{averageScore}<span className="text-base text-muted-foreground">/100</span></div>
            <Progress value={averageScore} className="mt-3" />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold">{dictionary.dashboard.workbenchesTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{dictionary.dashboard.workbenchesDescription}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {workbenches.map((workbench) => (
            <Link
              key={workbench.href}
              href={withLocale(workbench.href, locale)}
              className="group block cursor-pointer rounded-lg border border-border bg-white p-4 transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  <workbench.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-sm font-semibold">{workbench.label}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{workbench.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{dictionary.dashboard.recentLaunchPlans}</CardTitle>
            <CardDescription>{dictionary.dashboard.recentDescription}</CardDescription>
          </div>
          <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            {dictionary.common.newProject}
          </Link>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/40 p-8 text-center">
              <h2 className="text-lg font-semibold">{dictionary.dashboard.emptyTitle}</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {dictionary.dashboard.emptyDescription}
              </p>
              <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "accent" }), "mt-5 cursor-pointer")}>
                {dictionary.dashboard.startIntake}
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{dictionary.dashboard.tableCampaign}</TableHead>
                  <TableHead>{dictionary.dashboard.tableProduct}</TableHead>
                  <TableHead>{dictionary.dashboard.tableStatus}</TableHead>
                  <TableHead>{dictionary.dashboard.tableReadiness}</TableHead>
                  <TableHead className="text-right">{dictionary.dashboard.tableOpen}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {dictionary.options.categories[campaign.project.category as keyof typeof dictionary.options.categories] ?? campaign.project.category} ·{" "}
                        {dictionary.options.stages[campaign.project.stage as keyof typeof dictionary.options.stages] ?? campaign.project.stage}
                      </div>
                    </TableCell>
                    <TableCell>{campaign.project.name}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(campaign.status)}>
                        {dictionary.options.statuses[campaign.status as keyof typeof dictionary.options.statuses] ?? campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex min-w-36 items-center gap-3">
                        <Progress value={campaign.readinessScore} />
                        <span className="w-10 text-sm font-medium">{campaign.readinessScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={withLocale(`/campaigns/${campaign.id}`, locale)}
                        className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                      >
                        {dictionary.common.view}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
