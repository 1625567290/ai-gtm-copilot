# Growth Workbenches Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend AI GTM Copilot with KOL Pricer, Founder Storytelling Studio, Social Listening Radar, Campaign Calendar, and a more polished interview demo path.

**Architecture:** Keep persistence unchanged and derive all new workbench outputs from saved `Project` and `Campaign` records. Put deterministic product logic in `lib/gtm/workbenches.ts`, add focused App Router pages for each workbench, and route all labels through `lib/i18n.ts`.

**Tech Stack:** Next.js App Router, Prisma + SQLite, TypeScript, Tailwind/shadcn-style components, lucide-react icons, Vitest.

---

### Task 1: Business Logic

**Files:**
- Create: `lib/gtm/workbenches.ts`
- Test: `tests/workbenches.test.ts`

- [ ] Write tests that assert pricing, storytelling, radar, and calendar builders return campaign-specific outputs.
- [ ] Implement `buildKolPricing`, `buildFounderStoryAssets`, `buildSocialListeningRadar`, and `buildCampaignTaskCalendar`.
- [ ] Run `npx vitest run tests/workbenches.test.ts`.

### Task 2: Workbench Pages

**Files:**
- Create: `app/pricer/page.tsx`
- Create: `app/story/page.tsx`
- Create: `app/radar/page.tsx`
- Create: `app/calendar/page.tsx`

- [ ] Add one server-rendered page per workbench.
- [ ] Reuse saved campaigns as the selector source and render empty states when no campaign exists.
- [ ] Keep cards data-dense, readable, and consistent with the existing SaaS dashboard UI.

### Task 3: Navigation And Localization

**Files:**
- Modify: `components/app-shell.tsx`
- Modify: `lib/i18n.ts`
- Test: `tests/i18n.test.ts`

- [ ] Add sidebar/mobile navigation entries for Pricer, Story Studio, Radar, and Calendar.
- [ ] Add English, Chinese, and Japanese dictionary copy for all new pages.
- [ ] Extend i18n tests to verify new nav labels and the longer demo route.

### Task 4: Demo Polish And Docs

**Files:**
- Modify: `app/demo/page.tsx`
- Modify: `README.md`

- [ ] Upgrade `/demo` with direct CTAs into the new workbenches.
- [ ] Update the recommended walkthrough so it reads like an interview product demo.
- [ ] Document the new modules in README.

### Task 5: Verification And Commit

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Smoke check the new routes on `localhost:3002`.
- [ ] Commit the finished enhancement as `feat: add gtm growth workbenches`.
