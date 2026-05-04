import { z } from "zod";

export const categories = [
  "AI Infra",
  "GenAI App",
  "Data Platform",
  "Robotics",
  "Fintech",
  "Developer Tool",
  "Other"
] as const;

export const stages = [
  "pre-launch",
  "private beta",
  "public beta",
  "post-launch",
  "fundraising",
  "ecosystem expansion"
] as const;

export const markets = [
  "US",
  "Korea",
  "Japan",
  "Southeast Asia",
  "CIS",
  "Europe",
  "Global"
] as const;

export const audiences = [
  "developers",
  "founders",
  "AI researchers",
  "crypto-native users",
  "enterprise buyers",
  "consumers",
  "investors"
] as const;

export const budgetBands = [
  "under $5k",
  "$5k-$10k",
  "$10k-$25k",
  "$25k-$50k",
  "$50k+"
] as const;

export const tones = [
  "technical",
  "founder-led",
  "bold",
  "trusted",
  "community-native"
] as const;

export const outputLocales = ["en", "zh", "ja"] as const;

export const projectIntakeSchema = z.object({
  name: z.string().trim().min(1, "Product name is required.").max(80),
  website: z
    .string()
    .trim()
    .optional()
    .transform((value) => value ?? "")
    .refine((value) => value === "" || z.string().url().safeParse(value).success, {
      message: "Website must be a valid URL."
    }),
  category: z.enum(categories),
  stage: z.enum(stages),
  targetMarkets: z.array(z.enum(markets)).min(1, "Select at least one target market."),
  audiences: z.array(z.enum(audiences)).min(1, "Select at least one target audience."),
  summary: z.string().trim().min(20, "Product summary should be at least 20 characters.").max(800),
  moat: z.string().trim().min(10, "Differentiation should be at least 10 characters.").max(600),
  launchGoal: z.string().trim().min(10, "Launch goal should be at least 10 characters.").max(400),
  budgetBand: z.enum(budgetBands),
  tone: z.enum(tones),
  outputLocale: z.enum(outputLocales).default("en")
});

export type ProjectIntakeInput = z.infer<typeof projectIntakeSchema>;
