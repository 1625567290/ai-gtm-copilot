# AI GTM Copilot

A full-stack Next.js product for turning an AI product brief into a saved GTM launch campaign. It is designed as a Marketing Engineer interview artifact for JE Labs-style work: product intake, positioning, KOL/channel planning, content angles, a 14-day launch calendar, campaign editing, and markdown export.

## Quick Start

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## What It Demonstrates

- Next.js App Router full-stack workflow.
- Prisma + SQLite persistence.
- Server actions for creating projects and updating campaigns.
- Deterministic GTM generation that works without an API key.
- Optional OpenAI-compatible mode with safe local fallback.
- shadcn/ui-style dashboard components with lucide icons.
- English, Chinese, and Japanese UI plus localized generated briefs.
- A `/demo` presentation guide for interview walkthroughs.
- Vitest coverage for validation, GTM generation, and markdown export.

## Demo Flow

1. Open `/demo?lang=en`, `/demo?lang=zh`, or `/demo?lang=ja` for the interview talk track.
2. Start on the dashboard and show the seeded VectorForge campaign.
3. Open MossBench to show a Chinese GTM brief for Asia-focused developer growth.
4. Create a new GTM project from `/projects/new`, switch the brief language, and generate another campaign.
5. Export the markdown brief as a client-facing GTM document or deck input.

## Languages

The product UI supports English, Chinese, and Japanese. Use the in-app language switcher or visit `/?lang=en`, `/?lang=zh`, or `/?lang=ja`. The intake form also includes a brief-language selector so generated GTM plans and markdown exports can be produced in English, Chinese, or Japanese.

## Optional AI Mode

The app defaults to the deterministic local engine, which is best for stable interviews.

To opt into OpenAI-compatible generation:

```bash
AI_GENERATION_MODE="openai"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

If the AI call fails, the app falls back to the local engine.

## Verification

```bash
npm run db:push
npm run db:seed
npm test
npm run build
```

## Product Rationale

JE Labs helps AI and frontier-tech teams move from raw product context to launch-ready market strategy. AI GTM Copilot productizes that repeatable workflow into an operator tool: capture context, generate strategy, map distribution, create launch assets, and keep the campaign editable in a workspace.
