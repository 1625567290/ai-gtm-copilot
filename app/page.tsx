import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardContent } from "@/components/dashboard-content";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function DashboardPage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const locale = getLocale((await searchParams)?.lang);
  const dictionary = getDictionary(locale);
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
      title={dictionary.dashboard.title}
      eyebrow={dictionary.dashboard.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/"
      action={
        <Link href={withLocale("/projects/new", locale)} className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          {dictionary.common.newProject}
        </Link>
      }
    >
      <DashboardContent
        projectCount={projectCount}
        campaigns={campaigns}
        averageScore={averageScore}
        locale={locale}
        dictionary={dictionary}
      />
    </AppShell>
  );
}
