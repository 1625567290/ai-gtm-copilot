import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { CampaignDetail } from "@/components/campaign-detail";
import { prisma } from "@/lib/db/prisma";

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { project: true }
  });

  if (!campaign) {
    notFound();
  }

  return (
    <AppShell title={campaign.project.name} eyebrow="Campaign strategy">
      <CampaignDetail campaign={campaign} />
    </AppShell>
  );
}
