import { existsSync, mkdirSync, closeSync, openSync } from "node:fs";
import { dirname, join } from "node:path";

const dbPath = join(process.cwd(), "prisma", "dev.db");

mkdirSync(dirname(dbPath), { recursive: true });

if (!existsSync(dbPath)) {
  closeSync(openSync(dbPath, "w"));
}
