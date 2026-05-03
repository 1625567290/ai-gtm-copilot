import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardContent } from "@/components/dashboard-content";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const [projectCount, campaigns] = await Promise.all([
    prisma.project.count(),
    prisma.campaign.findMany({
      include: { project: true },
      orderBy: { updatedAt: "desc" },
      take: 8
    })
  ]);
  const averageScore =
    campaigns.length === 0
      ? 0
      : Math.round(campaigns.reduce((total, campaign) => total + campaign.readinessScore, 0) / campaigns.length);

  return (
    <AppShell
      title="GTM Workspace"
      eyebrow="AI product launch operations"
      action={
        <Link href="/projects/new" className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New project
        </Link>
      }
    >
      <DashboardContent projectCount={projectCount} campaigns={campaigns} averageScore={averageScore} />
    </AppShell>
  );
}
