# AI Product Signal Radar Focus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refocus the existing Next.js product from a broad GTM suite into an interview-ready AI Product Signal Radar workflow.

**Architecture:** Reuse the current App Router, Prisma, shadcn/ui-style components, and deterministic GTM engines. Update i18n labels, navigation, dashboard composition, radar workbench depth, and demo guide copy so Radar -> KOL Action -> Pricing reads as one product flow.

**Tech Stack:** Next.js App Router, TypeScript, Prisma, Supabase Postgres, Tailwind, lucide-react, Vitest.

---

## File Structure

- Modify `lib/i18n.ts`: product naming, focused navigation labels, dashboard/radar/demo dictionaries in English, Chinese, and Japanese.
- Modify `tests/i18n.test.ts`: failing expectations for the focused product labels and shorter demo route.
- Modify `lib/gtm/workbenches.ts`: enrich `SocialListeningRadar` with stats, topics, key voices, action queue, and strategy report.
- Modify `tests/workbenches.test.ts`: failing expectations for the richer radar output.
- Modify `components/app-shell.tsx`: reduce primary navigation and move future modules into the bottom "expansion" area.
- Modify `components/dashboard-content.tsx`: turn dashboard into the Signal Radar entry/workflow page.
- Modify `app/radar/page.tsx`: build the strongest page around stats, topic explorer, key voices, action queue, and strategy report.
- Modify `app/kol/page.tsx` and `app/pricer/page.tsx`: adjust page framing to downstream KOL action and pricing.
- Modify `app/demo/page.tsx`: shorten demo flow and CTA grid to the focused workflow.
- Modify `README.md`: align positioning and demo flow with AI Product Signal Radar.

## Task 1: Lock Focused Copy With Failing Tests

**Files:**
- Modify: `tests/i18n.test.ts`
- Modify: `lib/i18n.ts`

- [ ] **Step 1: Write the failing i18n expectations**

Add expectations that require:

```ts
expect(getDictionary("en").app.productName).toBe("AI Product Signal Radar");
expect(getDictionary("zh").app.productName).toBe("AI 产品信号雷达");
expect(getDictionary("ja").app.productName).toBe("AI Product Signal Radar");
expect(getDictionary("en").app.navDashboard).toBe("Signal Radar");
expect(getDictionary("zh").app.navKolStudio).toBe("KOL 行动计划");
expect(getDictionary("en").demo.route).toHaveLength(6);
expect(getDictionary("zh").demo.opening).toContain("社交信号");
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npx vitest run tests/i18n.test.ts`

Expected: failure because current dictionaries still use AI GTM Copilot/GTM Workspace and 10-step demo routes.

- [ ] **Step 3: Update dictionaries**

Update English, Chinese, and Japanese app/dashboard/radar/kol/pricer/demo labels to use:

```ts
productName: "AI Product Signal Radar"
navDashboard: "Signal Radar"
navNewProject: "New Analysis"
navKolStudio: "KOL Action Plan"
navPricer: "KOL Pricer"
```

Chinese equivalents:

```ts
productName: "AI 产品信号雷达"
navDashboard: "信号雷达"
navNewProject: "新建分析"
navKolStudio: "KOL 行动计划"
navPricer: "KOL 定价器"
```

- [ ] **Step 4: Re-run the focused test**

Run: `npx vitest run tests/i18n.test.ts`

Expected: pass.

## Task 2: Add Rich Radar Data With Failing Tests

**Files:**
- Modify: `tests/workbenches.test.ts`
- Modify: `lib/gtm/workbenches.ts`

- [ ] **Step 1: Write the failing radar expectations**

Extend the social listening test with:

```ts
expect(radar.stats.totalSignals).toBeGreaterThanOrEqual(120);
expect(radar.topics).toHaveLength(4);
expect(radar.keyVoices).toHaveLength(3);
expect(radar.actionQueue[0]?.action).toBeTruthy();
expect(radar.strategyReport).toContain("VectorForge");
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npx vitest run tests/workbenches.test.ts`

Expected: failure because `stats`, `topics`, `keyVoices`, `actionQueue`, and `strategyReport` do not exist.

- [ ] **Step 3: Extend the deterministic radar model**

Add exported types for:

```ts
export type SignalTopic = { name: string; urgency: "high" | "medium" | "low"; strength: number; rationale: string; recommendedAction: string };
export type KeyVoice = { name: string; role: string; market: string; whyItMatters: string; activationMove: string };
export type SignalAction = { action: string; priority: TaskPriority; channel: string; owner: string; evidence: string };
```

Extend `SocialListeningRadar` with `stats`, `topics`, `keyVoices`, `actionQueue`, and `strategyReport`.

- [ ] **Step 4: Re-run the focused test**

Run: `npx vitest run tests/workbenches.test.ts`

Expected: pass.

## Task 3: Refocus Navigation And Dashboard

**Files:**
- Modify: `components/app-shell.tsx`
- Modify: `components/dashboard-content.tsx`

- [ ] **Step 1: Reduce primary navigation**

Keep primary nav to dashboard/radar entry, new analysis, KOL action, pricer, demo. Move Story/Calendar into the JE Labs fit panel as future expansion links.

- [ ] **Step 2: Rebuild dashboard content**

Add a focused hero/workflow area with:

```tsx
Radar Intake -> Market Signals -> KOL Action -> Pricing
```

Keep saved campaign table and summary metrics.

- [ ] **Step 3: Verify TypeScript via build later**

No separate command here; final build catches TSX/type issues.

## Task 4: Rebuild Radar Page As Main Product Surface

**Files:**
- Modify: `app/radar/page.tsx`

- [ ] **Step 1: Render summary stats**

Show total signals, positive/mixed/watch counts, high urgency count, and opportunity score.

- [ ] **Step 2: Render topic explorer and key voices**

Use `radar.topics` and `radar.keyVoices` in compact cards.

- [ ] **Step 3: Render action queue and strategy report**

Add action cards with owner/channel/priority/evidence and a report panel that links downstream to KOL Action Plan and KOL Pricer.

## Task 5: Polish Downstream Pages And Demo

**Files:**
- Modify: `app/kol/page.tsx`
- Modify: `app/pricer/page.tsx`
- Modify: `app/demo/page.tsx`
- Modify: `README.md`

- [ ] **Step 1: Reframe KOL and pricing page descriptions**

Make both pages read as downstream actions generated from signal analysis.

- [ ] **Step 2: Shorten demo guide**

Route should be six steps:

```ts
[
  "Open Signal Radar...",
  "Select VectorForge...",
  "Use topics/key voices/action queue...",
  "Open KOL Action Plan...",
  "Open KOL Pricer...",
  "Create a new analysis and switch languages..."
]
```

- [ ] **Step 3: Update README**

Update product positioning, demo flow, and feature bullets to the focused Signal Radar story.

## Task 6: Verify, Commit, And Push

**Files:**
- All modified files.

- [ ] **Step 1: Run unit tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: Next.js build exits 0.

- [ ] **Step 3: Review git diff**

Run: `git status -sb`

Expected: only focused product files and plan/spec docs are modified.

- [ ] **Step 4: Commit and push**

Run:

```bash
git add docs/superpowers/plans/2026-05-06-ai-product-signal-radar-focus.md tests/i18n.test.ts tests/workbenches.test.ts lib/i18n.ts lib/gtm/workbenches.ts components/app-shell.tsx components/dashboard-content.tsx app/radar/page.tsx app/kol/page.tsx app/pricer/page.tsx app/demo/page.tsx README.md
git commit -m "feat: focus product on signal radar"
git push origin main
```
