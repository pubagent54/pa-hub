**What this is:** PubAgent Hub — the PIN-gated launcher app listing Pub Agent's other apps for Shepherd Neame and internal use, backed by Supabase tables `hub_pins` and `hub_apps` (see `supabase-setup.sql`). React 19 + Vite + Tailwind.

**This checkout is a worktree, not a plain clone.** `~/Marcus-Repo/pa-hub` is a symlink to `/Volumes/PA-dataserver1/codex/worktrees/pa-hub` on the mounted external SSD — verify `mount` shows `PA-dataserver1` before writing here, and never fall back to recreating this repo on the internal disk if it looks missing.

Plans live in JoeWiki; this repo holds code only.

## Survival facts

- `hub_pins` gates access by PIN, with a `type` of `master` or `sn` and an `sn` row optionally scoped to a `sublane` (`sn-it`, `sn-ops`, `sn-marketing`, `sn-board`) — treat PIN issuance as an access-control change, not routine content.
- `hub_apps` is the source of the app list this hub renders; adding an app here is how it becomes visible to whoever holds the matching PIN.
- Commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.
- Supabase client setup lives in `src/lib/`; run `supabase-setup.sql` once in the target project's SQL editor before the app has anything to show.

<!-- BEGIN rules-digest (auto-generated, DO NOT EDIT BY HAND — regenerate: scripts/sync-repo-doormat.sh) -->

---
type: "agent-context"
description: "The house card: the only standing rules for every agent, Claude or Codex."
scope: "global"
owner: "Joe"
note: "One home for agent rules (Joe, 6 Oct 2026). Retires every earlier digest, rulebook and rule memory. Keep under 600 words. Add a rule only for a failure that actually happened, and delete one when you add one."
---

# House card

You are a capable professional. Do the job with your own judgement. These are the only standing rules.

## Joe's four lines

Ask Joe first only before sending anything in his name, spending money, permanently deleting something an agent did not make itself or cannot rebuild, or doing anything else that cannot be undone. Deleting what an agent made and can rebuild is housekeeping, not a question: its own worktrees, temp and test folders, merged branches, and backup copies of those. Do it, check first that nothing is lost, and log what you removed. Everything else is yours to decide, do and fix.

## Safety

- Never print, copy or commit passwords, keys or tokens. Reach systems through the key helpers in `/Users/pubagent/Marcus-Repo/joewiki/wiki/agent-context/agent-hands-audit-2026-10-02.md`. Keyed work runs from a launchd job in Marcus's own session.
- Commit your work so it can be undone. Never overwrite another session's uncommitted work. If other agents may be editing the same repo, work in a worktree under `/Volumes/PA-dataserver1/codex/worktrees/` and remove it when done.
- Retry failures that look temporary. Before retrying a write, check whether it already landed.

## Doing the work

- If the request is clear, do it. If it is genuinely unclear, ask once, up front, then get on with it.
- Read project context only when the job needs it. Find it with `scripts/second-brain/vault_lookup.py "query"` from the JoeWiki root. Never read the whole current-truth snapshot.
- Prove it once, matched to the claim: the tests for a code change, one live check for a live change. Say what you checked and what you are guessing.
- Links for Joe must open remotely over HTTPS, never localhost or a file path.

## Talking to Joe

- **Writing feedback.** For writing that goes to Joe or outside the firm, follow `skills/writing-feedback/SKILL.md`.
- **Reply shape (Joe, 4 October 2026).** End a finished reply with one or two sentences of answer, then three lines: ✅ Done, 🔧 Doing now, 👤 You (only a decision or one of Joe's four lines, with your recommendation; otherwise "nothing"). A simple question gets just the answer.
- **Second-time rule.** Use `skillify` only when Joe asks for automation of repeated work.

<!-- END rules-digest -->

<!-- BEGIN marcus-shared-facts (auto-generated, DO NOT EDIT BY HAND — regenerate: scripts/sync-worktree-shared-facts.sh) -->

# Shared Marcus instructions

This project's real path resolves outside $HOME (a symlinked external worktree), so Claude Code's own parent-directory walk cannot reach /Users/pubagent/AGENTS.md or /Users/pubagent/Marcus-Repo/AGENTS.md the way it does for every other project. Copied here verbatim instead. Edit the source file, not this block.

<!-- source: /Users/pubagent/AGENTS.md -->
# Marcus

The rules are the house card: `/Users/pubagent/Marcus-Repo/joewiki/wiki/agent-context/rules-digest.md`. Read it once if it is not already loaded. This file holds machine facts only.

- Marcus is a Mac Mini on Joe's Tailscale (Marcus `100.69.233.90`, MacBook `100.114.237.126`). Joe works remotely from his MacBook, iPad or phone. A browser on Marcus cannot see or drive his MacBook tabs.
- Code lives in `/Users/pubagent/Marcus-Repo`. Live JoeWiki is `/Users/pubagent/Marcus-Repo/joewiki`.
- GitHub account `pubagent54` through `gh`. Cloudflare through `/Users/pubagent/bin/pa-wrangler`. Joe's email and calendar through the `marcus-comms-mirror` skill. Supabase writes are fine within the task.
- `rtk` is available to shorten long command output; it is optional.

<!-- source: /Users/pubagent/Marcus-Repo/AGENTS.md -->
# Marcus repositories

NeameGraph work uses `/Users/pubagent/Marcus-Repo/neamegraph-current`. Its only live site is `https://neamegraph.co.uk`; never work on or link to `refrac.neamegraph.co.uk`.

<!-- END marcus-shared-facts -->
