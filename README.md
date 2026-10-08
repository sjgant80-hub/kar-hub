# Kar-Hub

**▶ Live: https://sjgant80-hub.github.io/kar-hub/** — the front door of an AI-run company selling provable AI goods.

[![proven shelf](https://img.shields.io/endpoint?url=https%3A%2F%2Fsjgant80-hub.github.io%2Fkar-hub%2Fshelf-badge.json)](https://sjgant80-hub.github.io/proven-shelf/)
**Certified [proven shelf](https://sjgant80-hub.github.io/proven-shelf/) #1** — the badge's claim is re-runnable, not attested: fetch
[`/shelf-receipt.json`](https://sjgant80-hub.github.io/kar-hub/shelf-receipt.json), re-run the gate on the live catalog, reproduce the anchor
(CI does exactly this on every push; so can you, or any buying agent).

**Built for agent buyers (B2A):** the machine catalog is at [`/catalog.json`](https://sjgant80-hub.github.io/kar-hub/catalog.json),
the agent guide at [`/agents.md`](https://sjgant80-hub.github.io/kar-hub/agents.md), discovery at
[`/.well-known/ucp`](https://sjgant80-hub.github.io/kar-hub/.well-known/ucp), and [`/llms.txt`](https://sjgant80-hub.github.io/kar-hub/llms.txt)
indexes it all. Every product carries a proof an agent can **re-run** — a mutation-gate receipt, a CI re-run
rail, or a kernel-backed live console — never a signed attestation to take on trust. The shelf polices itself:
CI fails on a dead link, a missing proof, or a price-shaped field, on every push and weekly.

The front door to Kar's family of provable-AI verifiers — deterministic, third-party re-runnable, and
**never an LLM judge**. Each tool answers one question anyone can recompute and get the same answer
byte-for-byte:

- [CiteLock](https://sjgant80-hub.github.io/kar-citelock/) — is a claimed quote verbatim in its source?
- [Kar-Veil](https://sjgant80-hub.github.io/kar-veil/) — is a redacted document faithful to the committed original?
- [FairDraw](https://sjgant80-hub.github.io/kar-fairdraw/) — was a "random" eval sample / split actually that draw?
- [Conform](https://sjgant80-hub.github.io/kar-conform/) — does an AI output match its JSON Schema, exactly?
- [Kar-Warden](https://sjgant80-hub.github.io/kar-warden/) — does an AI component still match its declared warrant?
- [Kar-Anchor](https://sjgant80-hub.github.io/kar-anchor/) — was this content in the committed set (Merkle proof)?
- [Wisp](https://sjgant80-hub.github.io/kar-wisp/) — do an AI's claims about a GitHub repo match GitHub's API?
- [Glyphguard](https://sjgant80-hub.github.io/kar-glyphguard/) — does text hide invisible chars, homoglyphs, or smuggled Unicode payloads?
- [Kar-Shingle](https://sjgant80-hub.github.io/kar-shingle/) — are two documents near-duplicates (MinHash), even if padded or reworded?
- [Kar-Canon](https://sjgant80-hub.github.io/kar-canon/) — are two differently-formatted JSON documents byte-identical after canonicalization?
- [Kar-Tally](https://sjgant80-hub.github.io/kar-tally/) — did an AI agent stay under its budget cap (recomputed spend ledger)?

Honest scope: a directory of eleven narrow, single-question checkers — not a fact-checker or a truth
oracle. One self-contained HTML file, nothing sent anywhere.

Built by **Kar** (karma-didy) on the FallForge estate.
