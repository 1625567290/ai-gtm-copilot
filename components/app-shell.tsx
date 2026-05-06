import Link from "next/link";
import {
  BarChart3,
  BrainCircuit,
  Calculator,
  CalendarDays,
  FilePlus2,
  PenLine,
  Presentation,
  Rocket,
  UsersRound
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { type Dictionary, type Locale, localeLabels, locales, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function AppShell({
  title,
  eyebrow,
  locale,
  dictionary,
  currentPath,
  action,
  children
}: {
  title: string;
  eyebrow?: string;
  locale: Locale;
  dictionary: Dictionary;
  currentPath: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const navItems = [
    { href: "/", label: dictionary.app.navDashboard, icon: BarChart3 },
    { href: "/projects/new", label: dictionary.app.navNewProject, icon: FilePlus2 },
    { href: "/kol", label: dictionary.app.navKolStudio, icon: UsersRound },
    { href: "/pricer", label: dictionary.app.navPricer, icon: Calculator },
    { href: "/demo", label: dictionary.app.navDemoGuide, icon: Presentation }
  ];
  const expansionItems = [
    { href: "/story", label: dictionary.app.navStory, icon: PenLine },
    { href: "/calendar", label: dictionary.app.navCalendar, icon: CalendarDays }
  ];

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-white/90 px-4 py-5 backdrop-blur lg:block">
        <Link href={withLocale("/", locale)} className="flex items-center gap-3 rounded-md px-2 py-2 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BrainCircuit className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold">{dictionary.app.productName}</span>
            <span className="block text-xs text-muted-foreground">{dictionary.app.tagline}</span>
          </span>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLocale(item.href, locale)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                currentPath === item.href ? "bg-secondary text-foreground" : "text-slate-700"
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-border bg-secondary/60 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Rocket className="h-4 w-4 text-primary" aria-hidden="true" />
            {dictionary.app.jeFit}
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {dictionary.app.jeFitDescription}
          </p>
          <div className="mt-3 grid gap-1 border-t border-border pt-3">
            {expansionItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href, locale)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-white hover:text-foreground"
              >
                <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-border bg-background/92 backdrop-blur">
          <div className="flex min-h-20 flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              {eyebrow ? (
                <p className="text-xs font-medium uppercase tracking-normal text-muted-foreground">{eyebrow}</p>
              ) : null}
              <h1 className="mt-1 text-2xl font-semibold tracking-normal text-foreground">{title}</h1>
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
              <div className="flex flex-wrap items-center gap-1 lg:hidden">
                {navItems
                  .filter((item) => item.href !== "/projects/new")
                  .filter((item) => item.href !== currentPath)
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={withLocale(item.href, locale)}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "cursor-pointer whitespace-nowrap")}
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      {item.href === "/" ? dictionary.app.mobileDashboard : item.label}
                    </Link>
                  ))}
              </div>
              <div className="flex items-center rounded-md border border-border bg-white p-1" aria-label={dictionary.app.language}>
                {locales.map((candidate) => (
                  <Link
                    key={candidate}
                    href={withLocale(currentPath, candidate)}
                    className={cn(
                      "rounded px-2 py-1 text-xs font-medium transition-colors duration-200 hover:bg-secondary",
                      "whitespace-nowrap",
                      candidate === locale ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    )}
                  >
                    {localeLabels[candidate]}
                  </Link>
                ))}
              </div>
              {action}
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
