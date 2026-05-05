import type { Campaign, Project } from "@prisma/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Locale, localeLabels, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type CampaignWithProject = Campaign & { project: Project };

export function CampaignSwitcher({
  campaigns,
  selectedCampaign,
  locale,
  basePath,
  title,
  description
}: {
  campaigns: CampaignWithProject[];
  selectedCampaign: CampaignWithProject;
  locale: Locale;
  basePath: string;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {campaigns.map((campaign) => {
          const active = campaign.id === selectedCampaign.id;

          return (
            <Link
              key={campaign.id}
              href={withLocale(`${basePath}?campaignId=${campaign.id}`, locale)}
              className={cn(
                "block cursor-pointer rounded-md border p-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "border-primary bg-primary/5" : "border-border bg-white hover:bg-secondary"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{campaign.project.name}</span>
                <Badge variant="outline">
                  {localeLabels[campaign.project.outputLocale as keyof typeof localeLabels] ?? campaign.project.outputLocale}
                </Badge>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{campaign.name}</p>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
