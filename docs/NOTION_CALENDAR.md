# Notion Calendar Integration

**Owner (research + API setup):** Janet
**Calendar component:** done on branch `feature/notion-calendar` (`/events` page, homepage cards)
**Target:** working with real Notion data by **Dec 4**

## How it works

```
Notion databases ──(npm run events, uses NOTION_API_KEY)──> src/data/events.json ──> React site
```

- The site **never calls Notion from the browser**. Notion's API blocks browser requests (CORS), and
  anything in the frontend bundle is public, so the token would leak.
- Instead, `scripts/fetch-notion-events.mjs` runs on a laptop (or in CI), pulls events, and writes
  `src/data/events.json`. The site imports that file at build time.
- Events show up on the site after someone runs `npm run events`, commits the JSON, and redeploys.
- Until then, `events.json` holds **sample events** and the page says so.

What the script pulls (same logic as the Python script the Kaleidoscope team shared):

| Source              | Notion ID                             | Filter                |
| ------------------- | ------------------------------------- | --------------------- |
| Kaleidoscope Events | data source `303de33c-…-000b55454255` | none                  |
| Club Events         | page `2f0de33c-…-e7c58f0cfef5`        | `Status` = `Approved` |

- Only the **current semester** is kept: the row with `Type = Semester` and `Current Semester`
  checked. If there's no such row, it falls back to Sept–Dec / Jan–Apr / May–Aug.
- Duplicates are removed. An event counts as a duplicate when it has the same date and the same
  club names in any order, e.g. "C4C & Sandbox - X" and "Sandbox and C4C - X".
- **Only public-safe fields** are written to the JSON: title, dates/times, calendar, and `Location`
  / `Description` if those columns exist. Contact info, budgets and request notes stay in Notion.

## Janet's research checklist

1. **Get access.** Confirm you can create an integration in the Kaleidoscope Notion workspace. You
   need workspace owner or admin rights, or someone with them has to make it for you.
2. **Create the token.** Go to https://app.notion.com/developers/tokens and create an internal
   integration (read content only). Copy the secret.
3. **Connect the integration to both databases.** In Notion, open each source page, then
   `•••` → **Connections** → add the integration. Without this the API returns 404.
4. **Run it locally:**
   ```bash
   cp .env.example .env      # then paste the token after NOTION_API_KEY=
   npm run events
   npm run dev               # open http://localhost:5173/events
   ```
5. **Check the column names** against the constants at the top of the script: `Date`, `Event Date`,
   `Status`, `Type`, `Current Semester`, plus `Location` / `Description`. Rename the constants in the
   script if Notion uses different names. Don't rename the Notion columns.
6. **Decide how it stays fresh**, then report back:
   - **A. Manual (enough for Dec 4):** someone runs `npm run events` and commits the JSON when events
     change.
   - **B. Scheduled GitHub Action (stretch):** a daily workflow runs the script with the token stored
     as a repo secret, then commits the JSON. This depends on where the site is hosted, because the
     host has to redeploy on push.
   - **C. Serverless function (out of scope):** live data, but it needs a backend or host functions.

**Never** commit `.env` (it's already gitignored) or name the variable `VITE_NOTION_API_KEY`. Vite
puts every `VITE_` variable into the public JavaScript.

## Scope for Dec 4

**Feasible.** The fetch script, calendar UI, route, and homepage wiring are already built and pass
typecheck, lint and build. What's left is mostly access and config, not code:

| Task                                    | Est.    | Risk                                     |
| --------------------------------------- | ------- | ---------------------------------------- |
| Token + connect integration (steps 1–3) | < 1 hr  | **Blocked if no workspace admin access** |
| First real sync + fix column names      | 1–2 hrs | Low                                      |
| Option A refresh process                | minutes | Low                                      |
| Option B GitHub Action                  | 2–3 hrs | Medium (depends on hosting)              |

The Python script's no-key "public pages" mode uses Notion's undocumented internal API
(`/api/v3`), which can break without notice. It was intentionally **not** ported.
