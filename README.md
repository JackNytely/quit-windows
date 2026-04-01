# QuitWindows.org

Open-source site for **honest, hype-free** guidance on moving from Windows to desktop Linux: a compatibility-first questionnaire, optional anonymous “I switched” stats backed by [SpacetimeDB](https://spacetimedb.com/), and a dark, content-first UI (Next.js, Tailwind CSS, shadcn/ui).

SpacetimeDB is wired like the official **[Next.js quickstart](https://spacetimedb.com/docs/quickstarts/nextjs)** (`spacetime dev --template nextjs-ts`): the module lives in **`apps/web/spacetimedb/`**, config in **`apps/web/spacetime.json`**, and generated clients in **`apps/web/src/lib/module_bindings/`**.

## Layout

| Path | Role |
|------|------|
| `apps/web` | Next.js app (App Router) |
| `apps/web/spacetimedb/` | SpacetimeDB TypeScript module (`schema`, tables, reducers) |
| `apps/web/spacetime.json` | CLI config (`database`, `server`, `dev.run`) |
| `apps/web/src/lib/module_bindings/` | Generated (do not edit) |

## Prerequisites

- [Bun](https://bun.sh/) 1.x
- [SpacetimeDB CLI](https://spacetimedb.com/install) on your `PATH` (`spacetime`)

## Environment variables

```bash
cp .env.example apps/web/.env.local
```

Use **`https://maincloud.spacetimedb.com`** for `SPACETIME_URI` / `NEXT_PUBLIC_SPACETIME_URI` when targeting Maincloud, and **`quit-windows`** for database name variables (must match [`apps/web/spacetime.json`](apps/web/spacetime.json) `database`).

## SpacetimeDB commands (from repo root)

All of these ultimately run **`cd apps/web`**: the CLI expects **`spacetime.json`** next to your Next app, with the default module folder **`./spacetimedb`**.

| Script | What it runs |
|--------|----------------|
| `bun run spacetime:login` | `spacetime login` |
| `bun run spacetime:build` | `spacetime build` |
| `bun run spacetime:generate` | Regenerates `src/lib/module_bindings` after schema changes |
| `bun run spacetime:publish` | `spacetime publish quit-windows --server maincloud -y` |
| `bun run spacetime:dev` | `spacetime dev` — local server + publish + generate + `bun run dev` (per `spacetime.json` `dev.run`) |

From **`apps/web`** you can run the same via `bun run spacetime:build`, etc.

## Local development

1. **Maincloud** — `bun run spacetime:login`, then `bun run spacetime:publish`, set `.env.local` to Maincloud URL + `quit-windows`.
2. **Full stack local** (matches the template): from repo root:

   ```bash
   bun run spacetime:dev
   ```

   Or run SpacetimeDB yourself and then `cd apps/web && bun run dev`.

3. After editing **`apps/web/spacetimedb/src/index.ts`**, run **`bun run spacetime:generate`** (and publish when ready).

## Publish troubleshooting

- **`No database target matches`** — ensure [`apps/web/spacetime.json`](apps/web/spacetime.json) includes **`"database": "quit-windows"`** and that you’ve run **`spacetime login`**. See [Maincloud](https://spacetimedb.com/docs/how-to/deploy/maincloud).
- Optional overlay: copy [`apps/web/spacetime.local.json.example`](apps/web/spacetime.local.json.example) → `apps/web/spacetime.local.json` (gitignored).

## CI

```bash
bun install
bunx turbo typecheck lint build
```

## Railway

Configuration lives in [`railway.json`](railway.json) at the repo root:

- **Build:** `bun install --frozen-lockfile && bunx turbo build --filter=web`
- **Start:** `cd apps/web && bun run start` (Railway sets `PORT`; Next.js picks it up automatically)
- **Healthcheck:** `GET /api/health` (lightweight JSON `{ "ok": true }`)

Create a Railway service from this repo and keep the **root directory** at the repository root so the workspace `bun.lock` and workspaces resolve correctly.

**Environment variables** (set in the Railway service; copy from [`.env.example`](.env.example) into the dashboard or linked variables):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SPACETIME_URI` | SpacetimeDB HTTP base URL (browser + codegen) |
| `NEXT_PUBLIC_SPACETIME_DATABASE` | Database name (must match `apps/web/spacetime.json`) |
| `SPACETIME_URI` | Same as public URI for server-side API routes |
| `SPACETIME_DATABASE_NAME` | Same as public database name for server routes |
| `IP_HASH_SECRET` | Long random string for IP hashing in production |

Run **`bun run spacetime:publish`** from your machine or CI (with SpacetimeDB credentials) before production clients rely on Maincloud schema.

## License

MIT — see [LICENSE](LICENSE).
