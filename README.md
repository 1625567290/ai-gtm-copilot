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
- Vitest coverage for validation, GTM generation, and markdown export.

## Demo Flow

1. Start on the dashboard and show the seeded VectorForge campaign.
2. Open the campaign detail page and walk through readiness, positioning, channel mix, KOL plan, content angles, calendar, metrics, and risks.
3. Edit status, priority, or internal notes.
4. Export the markdown brief.
5. Create a new GTM project from `/projects/new` and generate another campaign.

## Languages

The product UI supports English, Chinese, and Japanese. Use the in-app language switcher or visit `/?lang=en`, `/?lang=zh`, or `/?lang=ja`.

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
