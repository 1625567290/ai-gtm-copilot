import { NextResponse } from "next/server";
import { ensureDemoDatabase } from "@/lib/db/bootstrap";
import { prisma } from "@/lib/db/prisma";
import { campaignToMarkdown } from "@/lib/gtm/export";
import { campaignRecordToPlan, projectRecordToInput } from "@/lib/gtm/persistence";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await ensureDemoDatabase();
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { project: true }
  });

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
  }

  const markdown = campaignToMarkdown(
    projectRecordToInput(campaign.project),
    campaignRecordToPlan(campaign)
  );

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${campaign.project.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}-gtm-brief.md"`
    }
  });
}
