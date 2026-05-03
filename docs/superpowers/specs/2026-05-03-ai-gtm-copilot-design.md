# AI GTM Copilot Design

## Product Goal

Build a Next.js full-stack product that turns an AI product brief into a market-ready GTM launch plan. The demo should show both product judgment and engineering depth for a Marketing Engineer role: structured intake, saved projects, generated strategy, editable campaign artifacts, and export-ready outputs.

## Target User

The target user is a JE Labs strategist or growth operator preparing a launch plan for an AI infrastructure, GenAI, data, robotics, or fintech product. They need to translate raw product context into a campaign plan that covers positioning, target audiences, KOL/channel strategy, content angles, and execution milestones.

## MVP Scope

The app will be a full-stack Next.js product, not a static webpage.

Core workflow:

1. Create a GTM project from a structured product intake form.
2. Generate a launch strategy using a deterministic local engine.
3. Save the generated plan to the database as a campaign.
4. Review the campaign in a dashboard/detail page.
5. Edit campaign notes, status, and priority fields.
6. Export a concise markdown launch brief.
7. Optionally use an OpenAI-compatible API when `OPENAI_API_KEY` is present, while preserving a no-key fallback.

Out of scope for the first demo:

- Multi-user authentication.
- Billing.
- Real X/Twitter scraping.
- Live KOL marketplace pricing.
- Production deployment automation.

## Product Positioning

**AI GTM Copilot** productizes the repeated work of a growth agency: converting founder/product context into a strategic launch kit. It is positioned as an internal GTM workspace for AI product teams and growth partners.

The demo narrative:

> JE Labs repeatedly turns raw AI products into market-ready launches. AI GTM Copilot captures product context, generates a GTM strategy, maps KOL/channel plays, creates content briefs, and tracks campaign assets in one workspace.

## Key Screens

### 1. Dashboard

The dashboard shows saved projects and campaigns, quick KPIs, recent launch plans, and a call to create a new GTM project.

Expected elements:

- Project count.
- Campaign count.
- Average launch readiness score.
- Recent campaigns table.
- Empty state when no projects exist.

### 2. Project Intake

A structured form captures:

- Product name.
- Website or optional URL.
- Category: AI Infra, GenAI App, Data Platform, Robotics, Fintech, Developer Tool, or Other.
- Stage: pre-launch, private beta, public beta, post-launch, fundraising, or ecosystem expansion.
- Target markets: US, Korea, Japan, Southeast Asia, CIS, Europe, Global.
- Primary audience: developers, founders, AI researchers, crypto-native users, enterprise buyers, consumers, investors.
- Product summary.
- Differentiation or moat.
- Launch goal.
- Budget band.
- Tone: technical, founder-led, bold, trusted, community-native.

### 3. Generated Campaign

After submission, the app generates a campaign with:

- Positioning statement.
- ICP summary.
- Readiness score and rationale.
- Channel mix.
- KOL archetype recommendations.
- 5 content angles.
- 14-day launch calendar.
- Success metrics.
- Risk flags.

### 4. Campaign Detail

The detail page lets the user review a saved campaign and update:

- Status: draft, active, paused, completed.
- Priority: low, medium, high.
- Internal notes.

It also includes a markdown export action.

## Data Model

### Project

- `id`
- `name`
- `website`
- `category`
- `stage`
- `targetMarkets`
- `audiences`
- `summary`
- `moat`
- `launchGoal`
- `budgetBand`
- `tone`
- `createdAt`
- `updatedAt`

### Campaign

- `id`
- `projectId`
- `name`
- `status`
- `priority`
- `readinessScore`
- `positioning`
- `icp`
- `channelMix`
- `kolPlan`
- `contentAngles`
- `launchCalendar`
- `successMetrics`
- `risks`
- `notes`
- `createdAt`
- `updatedAt`

### Reference Data

The app will include local reference data for:

- KOL archetypes by market and audience.
- Channel recommendations by product stage.
- Content angle templates by tone and category.
- Launch calendar actions by stage.

This keeps the product stable for interviews and allows deterministic tests.

## Architecture

### Stack

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Prisma.
- SQLite for local development.
- Zod for validation.
- Vitest for core generation tests.
- Optional OpenAI-compatible generation path.

### Application Structure

- `app/`: routes, layouts, server actions, API routes.
- `components/`: reusable UI components.
- `lib/gtm/`: deterministic GTM generation engine.
- `lib/data/`: reference datasets.
- `lib/db/`: Prisma client and database helpers.
- `prisma/`: schema and local SQLite configuration.
- `tests/`: unit tests for generation and validation.

### Generation Flow

1. User submits intake form.
2. Server validates payload with Zod.
3. A project row is created.
4. The generation service receives the project and reference datasets.
5. If `OPENAI_API_KEY` is present and AI mode is enabled, the service can call the AI provider.
6. If no key is present or the AI call fails, the deterministic local engine generates the plan.
7. A campaign row is created.
8. User is redirected to the campaign detail page.

## UI Direction

The UI should feel like a professional B2B SaaS dashboard built for repeated operator use.

Guidance from `ui-ux-pro-max`:

- Product style: SaaS dashboard with executive and data-dense patterns.
- Visual tone: professional, minimal, high-contrast, grid-based.
- Palette: light background `#F8FAFC`, slate text, blue primary, orange accent only for important CTA or score highlights.
- Components: shadcn cards, tables, badges, forms, dialogs, tabs, progress indicators, and toasts.
- Icons: use lucide-react consistently.
- Avoid: emoji icons, decorative blobs, oversized marketing hero sections, and one-note dark-blue styling.

Primary interface pattern:

- Left sidebar navigation.
- Top header with project context and create action.
- Main content area with compact metric cards and dense tables.
- Campaign detail layout with strategy summary on the left and execution artifacts on the right.

## Error Handling

- Invalid form submissions return field-level errors.
- Generation failures fall back to deterministic local generation when possible.
- Database errors show a friendly failure state with retry guidance.
- Export actions return a clear error if the campaign cannot be found.

## Testing Strategy

Automated tests should cover:

- Intake schema validation.
- Readiness score calculation.
- Channel mix generation for different stages.
- KOL archetype selection for markets and audiences.
- Markdown export formatting.

Manual verification should cover:

- Creating a project from the UI.
- Generating a campaign with no API key.
- Reviewing dashboard state after generation.
- Editing campaign status, priority, and notes.
- Exporting markdown.
- Desktop and mobile responsive layouts.

## Success Criteria

The demo is successful when:

- The app runs locally with one command after dependencies are installed.
- A user can create a realistic AI GTM project.
- The app saves the project and campaign in SQLite.
- The generated strategy feels tailored to category, stage, market, audience, and tone.
- The UI looks like a polished internal SaaS product, not a static landing page.
- The product can be explained in under two minutes as a JE Labs-relevant Marketing Engineer artifact.
