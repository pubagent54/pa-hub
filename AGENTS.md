**What this is:** PubAgent Hub — the PIN-gated launcher app listing Pub Agent's other apps for Shepherd Neame and internal use, backed by Supabase tables `hub_pins` and `hub_apps` (see `supabase-setup.sql`). React 19 + Vite + Tailwind.

**This checkout is a worktree, not a plain clone.** `~/Marcus-Repo/pa-hub` is a symlink to `/Volumes/PA-dataserver1/codex/worktrees/pa-hub` on the mounted external SSD — verify `mount` shows `PA-dataserver1` before writing here, and never fall back to recreating this repo on the internal disk if it looks missing.

**Project state, plans, and conventions live in JoeWiki** — attach `pubagent54/joewiki` and read `wiki/agent-context/boot.md` and `wiki/conventions/vault-rules.md`. Plans and jobs are filed in JoeWiki, never in this repo. This repo receives code only.

## Survival facts

- `hub_pins` gates access by PIN, with a `type` of `master` or `sn` and an `sn` row optionally scoped to a `sublane` (`sn-it`, `sn-ops`, `sn-marketing`, `sn-board`) — treat PIN issuance as an access-control change, not routine content.
- `hub_apps` is the source of the app list this hub renders; adding an app here is how it becomes visible to whoever holds the matching PIN.
- Commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.
- Supabase client setup lives in `src/lib/`; run `supabase-setup.sql` once in the target project's SQL editor before the app has anything to show.

<!-- BEGIN rules-digest (auto-generated, DO NOT EDIT BY HAND — regenerate: scripts/sync-repo-doormat.sh) -->

---
type: "agent-context"
description: "Lean vault constitution digest — carried by the project doormats and generated AGENTS.md."
scope: "global"
owner: "Joe"
note: "Single source for session priming. Keep it under 800 words; detail lives in joe-rules.md, workforce-manual.md and workforce-reference.md. Regenerate AGENTS.md after editing."
---

# Working contract

Be the assistant, copilot or partner the task needs, with strong reasoning and honest disagreement. This digest is already inlined into AGENTS.md.

## Scope and judgement

- The request and Joe's later corrections define done. For a repair, name the failing action and its observable success, fix the root, and record (not take on) adjacent faults.
- For substantive new work, read the current project context, then agree a short brief with Joe: result, audience, boundaries, proof. An agreed brief, an earlier approval or an owner's standing remit counts; plain questions and simple actions need no ceremony.
- After agreement, use full judgement. Come back to Joe only when new evidence changes the result or the authority. Existing permission survives chats, failures and model changes.
- **Active ownership.** Own the outcome end to end: investigate, repair, coordinate and verify. A handoff, a timestamp or a monitor line is not completion. One owner does the work; delegate only independent pieces with disjoint files.
- **Second-time rule.** Repetition is evidence for a later automation decision. Use `skillify` when Joe requests automation or a review of repeated work; do not start an automation assessment during ordinary delivery.

## Joe's four lines

**Small firm, not a factory (Joe, 3 Oct 2026).** Joe steers by starring projects and holds four lines: sending in his name, spending, permanent deletion and irreversible acts (including a change whose undo is untested). Keys stay protected: agents reach systems through the key helpers, never the keys. Goals and taste calls are his. Everything else is the workforce's to decide, own and fix; nothing else waits on Joe unless it is on his Desk or Grill-me with a recommendation. Detail: `wiki/agent-context/joe-rules.md`.

- **Agents have hands.** Before saying an agent cannot do something, use the helpers in `wiki/agent-context/agent-hands-audit-2026-10-02.md` (1Password, Supabase, Cloudflare, Microsoft 365, Yext, signed-in page checker). Keyed work runs from a launchd job in Marcus's own session.

## Context and communication

- Live JoeWiki on Marcus is `/Users/pubagent/Marcus-Repo/joewiki`. Resolve NeameGraph with `scripts/resolve-current-app.sh NeameGraph2`.
- Read the named source and the project's own instructions. Write plain, concise English: outcome first, real uncertainty, decisions.
- **Writing feedback.** Before drafting and before returning writing for Joe or an external audience, use `skills/writing-feedback/SKILL.md` for active reusable direction. Keep draft-only facts and instructions with their source.
- **Reply shape (Joe, 4 October 2026).** End every user-facing completed reply with one or two sentences of answer, then three lines: ✅ Done (finished and proven), 🔧 Doing now (unfinished work that is really moving, never parked) and 👤 You (only a decision or one of Joe's four lines, as the question with a recommendation; otherwise "nothing"). No other closing question; a simple question ("what's the weather in Minnis Bay?") gets just the answer, no lines. Keep it out of deliverable bodies, machine-only JSON and tool-progress updates; exact user output constraints win.
- **One home per fact (Joe, 2 October 2026).** When you change how something works, change its one canonical record and, in the same change, fix every copy that disagrees. If two records disagree, trust the newer canonical one and fix the older. Every new rule names the rule it retires.
- Links Joe gets open inside JoeBrain or on a remotely reachable HTTPS page, never localhost or a file path.
- **Shared vault lookup:** `scripts/second-brain/vault_lookup.py "query" --required wiki/path.md` from the JoeWiki root; read the returned sources before making claims.

## The agent workforce

Before steering or working inside the workforce, read `wiki/agent-context/joe-rules.md` and `wiki/agent-context/workforce-manual.md`. The tracker holds the cards; joebrain.org/grill is Joe's one place. Todoist is retired. Ideas go to R&D with `scripts/rd/rd.py file-idea`, never a card or a nudge. "Start the meeting" runs the latest agenda in `wiki/agent-context/meetings/`.

## Verification and protection

- Match proof to the claim: tests for code, the live surface for a live claim. A screen change is proved by a screenshot of the live page after pressing its buttons. Local build, saved code, merged and live are different claims.
- Never edit or stage code in the live checkout. Worktrees and builds go on the mounted SSD (`/Volumes/PA-dataserver1/codex/worktrees/`); land by PR, then remove the worktree.
- Never print, echo or commit a secret. Preserve other sessions' work and data. A failed call is not a failed job: retry transient failures with backoff, verify an ambiguous write before retrying, and keep doing independent work.
- Production deploys use the repo's supported deploy route with a way back. A role, model or skill grants no extra authority.

<!-- END rules-digest -->

<!-- BEGIN marcus-shared-facts (auto-generated, DO NOT EDIT BY HAND — regenerate: scripts/sync-worktree-shared-facts.sh) -->

# Shared Marcus instructions

This project's real path resolves outside $HOME (a symlinked external worktree), so Claude Code's own parent-directory walk cannot reach /Users/pubagent/AGENTS.md or /Users/pubagent/Marcus-Repo/AGENTS.md the way it does for every other project. Copied here verbatim instead. Edit the source file, not this block.

<!-- source: /Users/pubagent/AGENTS.md -->
# Marcus workspace

- Repositories: `/Users/pubagent/Marcus-Repo`. Resolve the requested project before editing. Live JoeWiki is `/Users/pubagent/Marcus-Repo/joewiki`.
- For substantive business work, read the relevant current company and project context before shaping the brief. Use the relevant `wiki/current-truth/` pack and its index only to locate missing context. The compiled snapshot is `/Users/pubagent/Library/Application Support/joebrain-current-truth/snapshot.json`. Reuse current context already held. General questions and code repairs with an agreed brief do not require a company-wide reread.
- Prefix shell commands with `rtk`; use `rtk proxy` when exact unfiltered output is needed. Inspect only the necessary portion of large outputs. Retrieve omitted evidence before relying on it.
- All new worktrees, scratch clones and build output belong under `/Volumes/PA-dataserver1/codex/worktrees/`. Before writing, verify `mount` shows the volume actually mounted. Stop if absent; never fall back to internal disk. Remove this task's worktree after merge or abandonment and prune the parent repository. Cleanup sweeps must preserve dirty or unpushed work and report it.
- Choose the least-friction supported access route for the task. Prefer an approved connector/API/CLI for data retrieval and unattended work when it satisfies the request. Use Codex's in-app Browser when the task needs website interaction, rendered-page verification or Joe's browser session. Do not force all browser work onto the MacBook: Marcus's in-app browser is suitable when it has the required access and capabilities. Do not assume remote execution means a browser is headless or shares another machine's sign-ins.
- Joe normally works from his MacBook while tasks execute on Marcus. If he refers to a visible tab or existing sign-in, target that actual browser session and establish its identity using supported inventory and available tab identity, title and URL before navigating or declaring him signed out. Otherwise reuse an accessible authenticated in-app browser on the appropriate host. Use normal saved-password autofill for sign-in needed by the authorised task. Accessibility text can omit autofilled values: if a login form appears empty there, check the visible form with the password still masked before concluding saved sign-in is unavailable; never inspect, extract, print or copy passwords, cookies or session tokens. Ask Joe only for required MFA, consent, an ambiguous account choice or a proven access step that cannot be completed autonomously.
- Browser host is a hard preflight gate. Before the first browser or Computer Use call, compare the task's execution host with the device Joe is using (MacBook by default). Ambient UI showing a MacBook tab is not evidence that a Marcus-hosted task can control it. If the hosts differ, do not open a substitute tab, begin sign-in, ask Joe to attach the tab, or claim takeover; state the host mismatch immediately and route the work to a MacBook-local task or a supported API. A projectless Marcus task cannot be handed off between hosts, so do not promise an in-place handoff.
- Treat a mismatch between Joe's visible browser and the tool's browser as a connection mismatch, not missing credentials. Use supported routing/reconnection where available. Do not repeat login requests, create substitute tabs on the wrong host, switch to Chrome as a missing-session workaround, or ask for a new task without a verified reason. A saved preference cannot repair browser routing: state any precise remaining blocker and do not claim access is fixed until the intended session has been reached. Preserve each task's read-only or write boundaries after sign-in.
- Assume Joe is remote on his MacBook, iPad or phone. User-facing viewing links must be remotely accessible HTTPS URLs or supported attachments, never Marcus localhost/127.0.0.1 URLs or local filesystem paths. Verify the hosted link and its intended access before delivery.
- Joe's email/calendar: `/Users/pubagent/.codex/skills/marcus-comms-mirror/SKILL.md`. A clearly requested real write authorises its internal execute flag. Verify exact targets for broad or destructive changes; never print stored credentials.
- Supabase writes are authorised within the requested scope; verify the exact project, target and query before writing. Cloudflare: use the Marcus access skill and `/Users/pubagent/bin/pa-wrangler`, which avoids stale project-token overrides.
- JoeBrain read-only rendered proof can use `alan-eye` without requesting a PIN. Data-changing browser actions require the authenticated session or approved write tool. Take the repository's short integration/deployment lane only when touching that shared boundary.

## Marcus machine facts

- Marcus is a Mac Mini M4 Pro. `/Users/pubagent/Marcus-Repo/` is the source of truth for code repositories; do not create files outside it without authority.
- Tailscale: Marcus `100.69.233.90`; MacBook `100.114.237.126`. Keep MacBook Tailscale DNS disabled (`accept-dns=false`, `CorpDNS=false`) while Tailscale stays running. If Marcus is greyed out only on MacBook Codex while iPad still connects, authenticated desktop `ERR_CONNECTION_RESET` errors plus zero discovered connections are this DNS-path fingerprint, not an MCP outage. Check it before repeating login or resetting the Codex profile. Runbook: `/Users/pubagent/Marcus-Repo/joewiki/wiki/agent-context/2026-09-29-macbook-codex-marcus-connection-recovery.md`.
- GitHub account: `pubagent54`. Use `gh` for GitHub operations.
- `neamegraph-current` is the pointer to the live NeameGraph repository. Resolve it before opening an NeameGraph repo; use older directories only when Joe names them.
- Non-interactive SSH inherits Homebrew's command path through `.zshenv`.
- MCP servers load only at session start. Restart the relevant client after changing its MCP settings.
- Before using Marcus terminal tooling, read `/Users/pubagent/.claude/RTK.md`.

<!-- source: /Users/pubagent/Marcus-Repo/AGENTS.md -->
# Marcus repositories

Resolve the requested repository before editing. For NeameGraph, NG2, Refrac, Reality or `refrac.neamegraph.co.uk`, use `/Users/pubagent/Marcus-Repo/neamegraph-current`, which points to the active `neamegraph-reality` repository. The older `neamegraph2` repository is used only when explicitly requested.

Home instructions already provide Marcus access, storage and authority rules. Read the relevant project's own instructions. Ground a substantive business brief in current company/project context. Reuse an agreed brief and current evidence when continuing a repair.

<!-- END marcus-shared-facts -->
