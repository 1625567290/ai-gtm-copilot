# AI GTM Copilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Next.js full-stack AI GTM Copilot that creates, saves, reviews, edits, and exports AI product launch campaigns.

**Architecture:** The app uses Next.js App Router with server actions for the main workflow, Prisma + SQLite for persistence, and a deterministic GTM generation engine with an optional AI provider seam. UI is built with Tailwind, shadcn/ui-compatible primitives, and lucide-react icons in a professional SaaS dashboard layout.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Prisma, SQLite, Zod, Vitest, lucide-react.

---

## File Structure

- `package.json`: scripts and dependencies.
- `next.config.ts`: Next.js configuration.
- `tsconfig.json`: TypeScript configuration.
- `postcss.config.mjs`: Tailwind/PostCSS config.
- `tailwind.config.ts`: Tailwind theme tokens.
- `app/layout.tsx`: root layout and metadata.
- `app/globals.css`: theme, Tailwind layers, and app shell polish.
- `app/page.tsx`: dashboard route.
- `app/projects/new/page.tsx`: project intake route.
- `app/campaigns/[id]/page.tsx`: campaign detail route.
- `app/campaigns/[id]/export/route.ts`: markdown export route.
- `app/actions/projects.ts`: create project and campaign server action.
- `app/actions/campaigns.ts`: campaign update server action.
- `components/app-shell.tsx`: sidebar and main frame.
- `components/project-intake-form.tsx`: project creation form.
- `components/dashboard-content.tsx`: dashboard cards and recent campaigns.
- `components/campaign-detail.tsx`: campaign detail UI and edit form.
- `components/ui/*`: shadcn-compatible UI primitives.
- `lib/db/prisma.ts`: Prisma client singleton.
- `lib/validation/project.ts`: project intake schema.
- `lib/gtm/types.ts`: generation types.
- `lib/gtm/reference-data.ts`: market, channel, KOL, and content data.
- `lib/gtm/generate.ts`: deterministic GTM generation engine.
- `lib/gtm/export.ts`: markdown export builder.
- `lib/utils.ts`: shared className helper.
- `prisma/schema.prisma`: Project and Campaign models.
- `prisma/seed.ts`: realistic sample project/campaign seed.
- `tests/gtm-generate.test.ts`: generation tests.
- `tests/project-validation.test.ts`: validation tests.
- `tests/export.test.ts`: markdown export tests.
- `README.md`: setup, run, demo story, and interview talking points.

## Task 1: Scaffold Next.js App

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `lib/utils.ts`

- [ ] **Step 1: Create project configuration**

Add `package.json` with scripts:

```json
{
  "name": "ai-gtm-copilot",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install next react react-dom @prisma/client zod lucide-react class-variance-authority clsx tailwind-merge
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer prisma tsx vitest
```

- [ ] **Step 3: Add base app files**

Create the Next, TypeScript, Tailwind, root layout, global CSS, and `cn` helper files. Use a light SaaS dashboard theme with slate text, blue primary, orange accent, 8px radius, and stable responsive containers.

- [ ] **Step 4: Verify scaffold**

Run:

```bash
npm run build
```

Expected: build reaches dependency or Prisma-missing errors only after later tasks; TypeScript config should parse.

## Task 2: Add Database and Validation

**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/db/prisma.ts`
- Create: `lib/validation/project.ts`
- Create: `tests/project-validation.test.ts`

- [ ] **Step 1: Write validation tests**

Cover successful intake parsing, missing product name, invalid URL, and at least one target market/audience requirement.

- [ ] **Step 2: Implement Zod schema**

Create enums and `projectIntakeSchema` with clear error messages. Export `ProjectIntakeInput`.

- [ ] **Step 3: Define Prisma schema**

Use SQLite. Add `Project` and `Campaign` models. Store arrays/structured artifacts as JSON strings for SQLite compatibility.

- [ ] **Step 4: Add Prisma client singleton**

Create `lib/db/prisma.ts` using `globalThis` caching for development.

- [ ] **Step 5: Verify**

Run:

```bash
npm run db:push
npm test -- tests/project-validation.test.ts
```

Expected: schema sync succeeds and validation tests pass.

## Task 3: Build GTM Generation Engine

**Files:**
- Create: `lib/gtm/types.ts`
- Create: `lib/gtm/reference-data.ts`
- Create: `lib/gtm/generate.ts`
- Create: `lib/gtm/export.ts`
- Create: `tests/gtm-generate.test.ts`
- Create: `tests/export.test.ts`

- [ ] **Step 1: Write generation tests**

Test that AI Infra + pre-launch + developers generates developer/community channels, a readiness score from 0-100, KOL archetypes, five content angles, and a 14-day calendar.

- [ ] **Step 2: Write export tests**

Test that markdown export includes product name, readiness score, positioning, channel mix, KOL plan, calendar, metrics, and risks.

- [ ] **Step 3: Implement types and reference data**

Define typed categories, stages, markets, audiences, budget bands, tones, channel recommendations, KOL archetypes, and content templates.

- [ ] **Step 4: Implement deterministic generator**

Create `generateCampaignPlan(input)` that returns tailored outputs based on category, stage, markets, audiences, budget, and tone.

- [ ] **Step 5: Implement markdown export**

Create `campaignToMarkdown(project, campaign)` with concise, readable sections.

- [ ] **Step 6: Verify**

Run:

```bash
npm test
```

Expected: all generation, validation, and export tests pass.

## Task 4: Add Server Actions and Routes

**Files:**
- Create: `app/actions/projects.ts`
- Create: `app/actions/campaigns.ts`
- Create: `app/campaigns/[id]/export/route.ts`

- [ ] **Step 1: Implement project creation action**

Validate form data, create a `Project`, generate a campaign, save the campaign, and redirect to `/campaigns/[id]`.

- [ ] **Step 2: Implement campaign update action**

Validate status, priority, and notes. Update campaign and revalidate dashboard/detail paths.

- [ ] **Step 3: Implement export route**

Load campaign and project by id, generate markdown, and return it with `text/markdown` headers.

- [ ] **Step 4: Verify**

Run:

```bash
npm run build
```

Expected: routes compile without TypeScript errors.

## Task 5: Build shadcn-style UI Components

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/ui/select.tsx`
- Create: `components/ui/checkbox.tsx`
- Create: `components/ui/progress.tsx`
- Create: `components/ui/table.tsx`

- [ ] **Step 1: Implement primitives**

Create small shadcn-compatible primitives using `cn`, Tailwind classes, visible focus states, no layout-shifting hover states, and lucide-friendly sizing.

- [ ] **Step 2: Verify import paths**

Run:

```bash
npm run build
```

Expected: no missing component imports after feature screens are added in Task 6.

## Task 6: Build Product Screens

**Files:**
- Create: `components/app-shell.tsx`
- Create: `components/dashboard-content.tsx`
- Create: `components/project-intake-form.tsx`
- Create: `components/campaign-detail.tsx`
- Create: `app/page.tsx`
- Create: `app/projects/new/page.tsx`
- Create: `app/campaigns/[id]/page.tsx`

- [ ] **Step 1: Build app shell**

Create a responsive sidebar/header shell with lucide icons, consistent spacing, and no marketing hero.

- [ ] **Step 2: Build dashboard**

Load projects and campaigns from Prisma. Show KPI cards, recent campaigns table, readiness score, status badges, and empty state.

- [ ] **Step 3: Build intake form**

Create a structured form using server action submission. Include all schema fields and clear helper copy.

- [ ] **Step 4: Build campaign detail**

Render strategy summary, ICP, channel mix, KOL plan, content angles, 14-day calendar, risks, metrics, notes editor, status/priority controls, and export link.

- [ ] **Step 5: Verify UI**

Run:

```bash
npm run build
```

Expected: all pages compile.

## Task 7: Seed Data, README, and Final Verification

**Files:**
- Create: `prisma/seed.ts`
- Create: `README.md`

- [ ] **Step 1: Add seed script**

Create a realistic AI Infra sample project and campaign so the dashboard is impressive immediately after seeding.

- [ ] **Step 2: Write README**

Include setup, database commands, demo walkthrough, product rationale, optional AI mode note, and interview talking points.

- [ ] **Step 3: Run full verification**

Run:

```bash
npm run db:push
npm run db:seed
npm test
npm run build
```

Expected: all commands pass.

- [ ] **Step 4: Start dev server**

Run:

```bash
npm run dev
```

Expected: app available at `http://localhost:3000` or the next open port.

## Self-Review

- Spec coverage: The plan covers full-stack Next.js, persistence, structured intake, deterministic generation, campaign detail editing, export, shadcn-style UI, tests, seed data, and README.
- Placeholder scan: No open TBD items are intentionally left in the plan.
- Type consistency: Project intake, GTM generation, campaign persistence, and markdown export use shared names across validation, generator, UI, and tests.
