// tools/check-catalog.mjs — the shelf's own gate. An agent-facing catalog with a dead link or a
// malformed entry is the lemons problem on our own shelf, so CI refuses it. Two passes:
//   node tools/check-catalog.mjs            -> schema pass (offline, deterministic)
//   node tools/check-catalog.mjs --live     -> schema pass + every live/proof URL must answer
// Zero dependencies.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const path = fileURLToPath(new URL('../catalog.json', import.meta.url));
const errors = [];
const fail = (m) => errors.push(m);

let cat;
try { cat = JSON.parse(readFileSync(path, 'utf8')); }
catch (e) { console.error(`catalog.json is not valid JSON: ${e.message}`); process.exit(1); }

const HTTPS = /^https:\/\/[a-z0-9.-]+\/[^\s]*$/i;
const HEX64 = /^[0-9a-f]{64}$/;

if (!Array.isArray(cat.products) || cat.products.length === 0) fail('products must be a non-empty array');
if (typeof cat.credit !== 'string' || !cat.credit.includes('Konomi')) fail('the catalog must carry the Konomi credit');
if (!cat.contact || !HTTPS.test(cat.contact.url || '')) fail('contact.url must be a real https URL');

const ids = new Set();
for (const p of cat.products || []) {
  const where = `product ${p.id || '(no id)'}`;
  for (const k of ['id', 'name', 'category', 'pitch', 'live', 'repo']) {
    if (typeof p[k] !== 'string' || !p[k].trim()) fail(`${where}: missing ${k}`);
  }
  if (ids.has(p.id)) fail(`${where}: duplicate id`);
  ids.add(p.id);
  if (p.live && !HTTPS.test(p.live)) fail(`${where}: live is not an https URL`);
  if (p.repo && !HTTPS.test(p.repo)) fail(`${where}: repo is not an https URL`);
  if (p.free !== true) fail(`${where}: free must be exactly true (paid goods are declared in "pending" until their rail is live)`);
  if (!p.proof || typeof p.proof.kind !== 'string') fail(`${where}: proof.kind is required — a product without a proof does not list`);
  if (p.proof) {
    if (p.proof.rerun && !HTTPS.test(p.proof.rerun)) fail(`${where}: proof.rerun is not an https URL`);
    if (p.proof.receipt && !HTTPS.test(p.proof.receipt)) fail(`${where}: proof.receipt is not an https URL`);
    if (p.proof.anchor && !HEX64.test(p.proof.anchor)) fail(`${where}: proof.anchor is not a 64-hex digest`);
    if (p.proof.kind !== 'live-console' && !p.proof.rerun) fail(`${where}: proof needs a rerun URL (re-runnable or it is an attestation)`);
  }
  // THE PRICING RULE: public surfaces never carry prices. Any price-shaped field is refused.
  const flat = JSON.stringify(p).toLowerCase();
  if (/"(price|pricing|cost|fee|gbp|usd|eur)"/.test(flat)) fail(`${where}: price-shaped field found — pricing never ships on a public surface`);
}

if (errors.length) {
  console.error(`✗ catalog gate: ${errors.length} problem(s)`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.error(`✓ schema: ${cat.products.length} products, all carrying proofs, no pricing, Konomi credited`);

// ── liveness: every shelf link must answer. Retries once; GitHub serves these, so flakiness is rare
// and a hard failure usually means a product page genuinely moved or died.
if (process.argv.includes('--live')) {
  const urls = new Set();
  for (const p of cat.products) {
    urls.add(p.live); urls.add(p.repo);
    if (p.proof?.rerun) urls.add(p.proof.rerun);
    if (p.proof?.receipt) urls.add(p.proof.receipt);
  }
  urls.add(cat.contact.url);
  let dead = 0;
  for (const u of urls) {
    let ok = false, status = 0;
    for (let attempt = 0; attempt < 2 && !ok; attempt++) {
      try {
        const r = await fetch(u, { method: 'GET', redirect: 'follow' });
        status = r.status; ok = r.status >= 200 && r.status < 400;
      } catch { status = -1; }
    }
    if (!ok) { dead++; console.error(`  ✗ DEAD (${status}): ${u}`); }
  }
  if (dead) { console.error(`✗ liveness: ${dead} dead link(s) — a dead good does not stay on the shelf`); process.exit(1); }
  console.error(`✓ liveness: all ${urls.size} shelf links answer`);
}
