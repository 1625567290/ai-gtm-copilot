# Deploy With Supabase + Vercel

This project uses Vercel for the Next.js app and Supabase Postgres for persistent data.

## 1. Create Supabase

1. Create a free Supabase project.
2. Open **Project Settings -> Database -> Connection string**.
3. Copy the **Session pooler** Postgres URL for Vercel. Supabase's direct connection string is useful for local database tools, but the pooler URL is safer for Vercel/serverless demos.
4. URL-encode special characters in the database password.

Use that value as:

```bash
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@<region>.pooler.supabase.com:5432/postgres?sslmode=require"
```

For this project ref, the direct connection shape is:

```bash
DATABASE_URL="postgresql://postgres:<password>@db.uuogaolhpxwgptmkagbb.supabase.co:5432/postgres?sslmode=require"
```

Do not commit either real value. Store it only in local `.env` and Vercel Environment Variables.

## 2. Prepare The Database

Run these locally after putting the Supabase `DATABASE_URL` in `.env`:

```bash
npm install
npm run db:push
npm run db:seed
```

`db:push` creates the tables. `db:seed` adds the VectorForge and MossBench demo campaigns used in the interview walkthrough.

## 3. Deploy To Vercel

1. Import the GitHub repo in Vercel.
2. Add `DATABASE_URL` in Vercel project environment variables.
3. Keep the default build command: `npm run build`.
4. Deploy.

The `postinstall` script runs `prisma generate` during Vercel install, so the Prisma Client is generated for Supabase Postgres.

## 4. Optional AI Mode

The demo works without an LLM key. To enable OpenAI-compatible generation, add:

```bash
AI_GENERATION_MODE="openai"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

If the AI call fails, the app falls back to the deterministic local engine.
