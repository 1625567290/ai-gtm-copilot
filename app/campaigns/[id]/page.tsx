import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { CampaignDetail } from "@/components/campaign-detail";
import { ensureDemoDatabase } from "@/lib/db/bootstrap";
import { prisma } from "@/lib/db/prisma";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function CampaignPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const { id } = await params;
  const locale = getLocale((await searchParams)?.lang);
  const dictionary = getDictionary(locale);
  await ensureDemoDatabase();
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { project: true }
  });

  if (!campaign) {
    notFound();
  }

  return (
    <AppShell
      title={campaign.project.name}
      eyebrow={dictionary.campaign.eyebrow}
      locale={locale}
      dictionary={dictionary}
      currentPath={`/campaigns/${campaign.id}`}
    >
      <CampaignDetail campaign={campaign} locale={locale} dictionary={dictionary} />
    </AppShell>
  );
}
