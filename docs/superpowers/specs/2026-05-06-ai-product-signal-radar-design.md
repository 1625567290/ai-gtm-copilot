# AI Product Signal Radar Design

Date: 2026-05-06

## Goal

Refocus AI GTM Copilot from a broad GTM suite into a single interview-ready product:

**AI Product Signal Radar** helps AI product teams turn social and market signals into GTM actions, KOL activation plans, and pricing guidance.

The product should feel closer to the shared WeLike Social Listening demo: one clear input, one analysis workspace, and one action-oriented output path.

## Positioning

- Audience: AI infrastructure, GenAI, data platform, robotics, and fintech builders preparing GTM launches.
- Buyer/user: founder, marketing engineer, growth lead, or agency operator.
- Core job: identify what the market is saying, decide which narratives and voices matter, and translate that into KOL and campaign actions.
- Interview story: this is a focused JE Labs-style operator tool, not a generic AI dashboard.

## Product Scope

### Primary Flow

1. User opens the product on a focused signal-radar workspace.
2. User enters an AI product name, X handle, keyword, or selects an existing campaign.
3. The app shows a structured market signal report:
   - signal stats
   - sentiment distribution
   - hot topics
   - key voices
   - urgency and opportunity queue
   - recommended GTM actions
4. The user opens downstream KOL planning:
   - best-fit markets
   - KOL archetypes
   - activation brief
   - pricing range and deliverables
5. Demo guide presents this as one coherent product story.

### Primary Modules

- **Signal Radar**: main page and first demo stop.
- **KOL Action Plan**: downstream from signals; recommends market/KOL fit and activation copy.
- **KOL Pricer**: estimates budget, exposure, deliverables, and CPM.
- **Demo Guide**: interview walkthrough.

### Secondary Modules

Founder storytelling and campaign calendar remain in the codebase as future expansion modules, but they should not dominate the navigation or demo route.

## UX Direction

The interface should shift from "suite dashboard" to "analysis workstation":

- A single primary action on the dashboard: analyze a product or market signal.
- Data-dense cards after analysis, using compact stats, badges, ranked lists, and clear action panels.
- Primary navigation should be reduced so the user understands the product in seconds.
- The demo path should avoid feature hopping and instead show one complete workflow.

The current shadcn/ui foundation should remain. Avoid a full visual rewrite unless needed; prioritize information architecture, copy, and demo polish.

## Information Architecture

### Navigation

Primary nav:

- Signal Radar
- New Analysis
- KOL Action Plan
- KOL Pricer
- Demo Guide

Secondary or de-emphasized:

- Founder Story Studio
- Social Radar legacy route, if replaced by the new Signal Radar route
- Campaign Calendar

### Dashboard

The dashboard becomes the focused Signal Radar entry point:

- Product title: AI Product Signal Radar
- One-liner: "Turn AI product market signals into KOL actions and launch decisions."
- Input / CTA area: create a new analysis or open a sample campaign.
- Signal summary for saved campaigns.
- Featured workflow cards: Radar -> KOL Action -> Pricing.

### Signal Radar Page

The radar page should be the strongest product page and can reuse existing campaign data:

- Summary stats: total signals, positive/negative/neutral split, high-urgency signals, opportunity score.
- Topic explorer: ranked topics with rationale and recommended action.
- Key voices: KOL/community archetypes and why they matter.
- Action queue: reply, amplify, monitor, brief KOL, log product feedback.
- Strategy report: concise GTM recommendation grounded in the selected campaign.

### KOL Action Plan

Keep the current KOL Market Fit logic, but frame it as the downstream action plan generated from signals:

- best market
- average fit score
- core markets
- recommended KOL archetype
- copy-ready activation brief

### KOL Pricer

Keep the current pricing logic:

- recommended market
- budget range
- exposure range
- blended CPM
- deliverables
- rationale

## Data And Backend

Use the existing Next.js App Router, Prisma, and Supabase Postgres setup.

The product remains demo-safe:

- works with seeded data
- does not require a real X API
- does not require an LLM API key
- uses deterministic local generation for stable interview demos
- can later connect to X, Telegram, or LLM providers

## Error Handling

- If the database has no campaigns, show a focused empty state that routes to new analysis.
- If validation fails, return to the form with a clear localized error.
- If generated signal data is unavailable, show a deterministic fallback from campaign/project context.
- Avoid server-side crashes in demo paths.

## Multilingual Requirement

The focused product must keep English, Chinese, and Japanese UI support.

Priority localized surfaces:

- navigation
- dashboard/radar titles
- empty states
- demo guide
- KOL action and pricing labels

## Testing

Maintain the existing test baseline:

- i18n tests for new labels
- workbench tests for deterministic signal/KOL/pricing output
- build verification with `npm run build`
- unit tests with `npm test`

## Acceptance Criteria

- The first screen clearly communicates a focused AI social signal/KOL GTM product.
- The main demo route can be explained in under 3 minutes.
- Navigation no longer makes the product feel like five unrelated tools.
- Signal Radar, KOL Action Plan, and KOL Pricer form one connected workflow.
- The app remains deployable to Vercel with Supabase.
- Existing campaign creation, persistence, and localization continue to work.
