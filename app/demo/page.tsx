import Link from "next/link";
import { ArrowRight, CheckCircle2, FilePlus2, LayoutDashboard, Route, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db/prisma";
import { getDictionary, getLocale, localeLabels, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function DemoGuidePage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const locale = getLocale((await searchParams)?.lang);
  const dictionary = getDictionary(locale);
  const samples = await prisma.campaign.findMany({
    include: { project: true },
    orderBy: { createdAt: "asc" },
    where: {
      project: {
        name: {
          in: ["VectorForge", "MossBench"]
        }
      }
    }
  });

  return (
    <AppShell
      title={dictionary.demo.title}
      eyebrow={dictionary.demo.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath="/demo"
      action={
        <Link
          href={withLocale("/projects/new", locale)}
          className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
        >
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          {dictionary.demo.createProject}
        </Link>
      }
    >
      <div className="mx-auto grid max-w-6xl gap-6">
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-white">
              <div className="flex items-center gap-2">
                <Badge variant="default">{dictionary.demo.openingTitle}</Badge>
              </div>
              <CardTitle className="text-2xl">{dictionary.app.productName}</CardTitle>
              <CardDescription className="max-w-3xl text-base leading-7">
                {dictionary.demo.opening}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pt-5 lg:grid-cols-3">
              <Link
                href={withLocale("/", locale)}
                className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer justify-between")}
              >
                <span className="inline-flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  {dictionary.demo.openDashboard}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={withLocale("/kol", locale)}
                className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer justify-between")}
              >
                <span className="inline-flex items-center gap-2">
                  <UsersRound className="h-4 w-4" aria-hidden="true" />
                  {dictionary.app.navKolStudio}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={withLocale("/projects/new", locale)}
                className={cn(buttonVariants({ variant: "accent" }), "cursor-pointer justify-between")}
              >
                <span className="inline-flex items-center gap-2">
                  <FilePlus2 className="h-4 w-4" aria-hidden="true" />
                  {dictionary.demo.createProject}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{dictionary.dashboard.recentLaunchPlans}</CardTitle>
              <CardDescription>{dictionary.dashboard.recentDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {samples.map((sample) => (
                <Link
                  key={sample.id}
                  href={withLocale(`/campaigns/${sample.id}`, locale)}
                  className="block cursor-pointer rounded-md border border-border bg-white p-3 transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{sample.project.name}</span>
                    <Badge variant="outline">
                      {localeLabels[sample.project.outputLocale as keyof typeof localeLabels] ?? sample.project.outputLocale}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{sample.name}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" aria-hidden="true" />
                <CardTitle>{dictionary.demo.routeTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="grid gap-3">
                {dictionary.demo.route.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 rounded-md border border-border bg-white p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="self-center text-sm leading-6 text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{dictionary.demo.signalsTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dictionary.demo.signals.map((signal) => (
                  <div key={signal} className="grid grid-cols-[1.25rem_1fr] gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span>{signal}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle>{dictionary.demo.closeTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-700">{dictionary.demo.close}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
