import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight, Gauge, Layers3, Plus, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  averageScore
}: {
  projectCount: number;
  campaigns: CampaignWithProject[];
  averageScore: number;
}) {
  const activeCount = campaigns.filter((campaign) => campaign.status === "active").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Projects</CardTitle>
            <Layers3 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{projectCount}</div>
            <p className="mt-1 text-sm text-muted-foreground">AI products captured in the GTM workspace.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{campaigns.length}</div>
            <p className="mt-1 text-sm text-muted-foreground">{activeCount} active launch plans.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Avg. Readiness</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{averageScore}<span className="text-base text-muted-foreground">/100</span></div>
            <Progress value={averageScore} className="mt-3" />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Launch Plans</CardTitle>
            <CardDescription>Generated campaigns with saved strategy, channel plan, KOL map, and export.</CardDescription>
          </div>
          <Link href="/projects/new" className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New project
          </Link>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/40 p-8 text-center">
              <h2 className="text-lg font-semibold">Create your first GTM launch plan</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Capture an AI product brief and generate positioning, KOL strategy, content angles, and a 14-day launch calendar.
              </p>
              <Link href="/projects/new" className={cn(buttonVariants({ variant: "accent" }), "mt-5 cursor-pointer")}>
                Start intake
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Readiness</TableHead>
                  <TableHead className="text-right">Open</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">{campaign.project.category} · {campaign.project.stage}</div>
                    </TableCell>
                    <TableCell>{campaign.project.name}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(campaign.status)}>{campaign.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex min-w-36 items-center gap-3">
                        <Progress value={campaign.readinessScore} />
                        <span className="w-10 text-sm font-medium">{campaign.readinessScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                      >
                        View
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
