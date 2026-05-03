import Link from "next/link";
import { BarChart3, BrainCircuit, FilePlus2, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/projects/new", label: "New GTM Project", icon: FilePlus2 }
];

export function AppShell({
  title,
  eyebrow,
  action,
  children
}: {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-white/90 px-4 py-5 backdrop-blur lg:block">
        <Link href="/" className="flex items-center gap-3 rounded-md px-2 py-2 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BrainCircuit className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold">AI GTM Copilot</span>
            <span className="block text-xs text-muted-foreground">Launch strategy workspace</span>
          </span>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-border bg-secondary/60 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Rocket className="h-4 w-4 text-primary" aria-hidden="true" />
            JE Labs fit
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Productizes strategy, KOL planning, founder storytelling, and launch execution into one operator flow.
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-border bg-background/92 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              {eyebrow ? (
                <p className="text-xs font-medium uppercase tracking-normal text-muted-foreground">{eyebrow}</p>
              ) : null}
              <h1 className="mt-1 text-2xl font-semibold tracking-normal text-foreground">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "lg:hidden")}
              >
                Dashboard
              </Link>
              {action}
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
