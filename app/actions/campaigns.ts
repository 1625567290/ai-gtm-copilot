"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const campaignUpdateSchema = z.object({
  status: z.enum(["draft", "active", "paused", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
  notes: z.string().max(1200)
});

export async function updateCampaign(campaignId: string, formData: FormData) {
  const input = campaignUpdateSchema.parse({
    status: String(formData.get("status") ?? "draft"),
    priority: String(formData.get("priority") ?? "medium"),
    notes: String(formData.get("notes") ?? "")
  });

  await prisma.campaign.update({
    where: { id: campaignId },
    data: input
  });

  revalidatePath("/");
  revalidatePath(`/campaigns/${campaignId}`);
}
