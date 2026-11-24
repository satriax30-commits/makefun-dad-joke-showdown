// Dad Joke Showdown — u-mfnakmal-dad-joke-showdown-1d2ce3e5
//
// Writes exactly one dad joke to /output/entry.txt.
// Deterministic: no clock, no randomness, no network, stdlib only.
// Node 22 (type stripping) — run as: node main.ts
//
// The joke (84 characters, well inside the 200-character gate):
//   "I asked my dad why he brings a ladder to the barbecue.
//    He said the stakes were high."
//
// Why this joke (creative choice, recorded in STATE.md):
//   - The pun is stakes/steaks: it lands cleanly on the first read,
//     with no explaining needed.
//   - The barbecue setting matches the judge's own persona (a father
//     of three at a barbecue), so it reads like a joke a dad would
//     actually tell at the table.
//   - The ladder setup is a fresh twist on the tired "steaks were
//     high" one-liner: the setup earns the punchline instead of
//     handing it over bare.
//   - Tight: every word earns its place, punchline at the very end,
//     and it reads naturally aloud with a dinner-table rhythm.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "I asked my dad why he brings a ladder to the barbecue. " +
  "He said the stakes were high.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function gateCheck(text: string): void {
  // Mirror the sealed gate scorer: UTF-8 text, 1-200 characters,
  // not only whitespace. Also report the byte size, since the
  // leaderboard's Size column is the tie-break after win rate.
  const bytes = Buffer.byteLength(text, "utf8");
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Re-encode to prove the text round-trips as valid UTF-8.
  const roundTrip = Buffer.from(text, "utf8").toString("utf8");
  if (roundTrip !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
  console.log(`entry: ${text.length} chars, ${bytes} bytes — gate OK`);
}

function main(): void {
  const text = JOKE;
  gateCheck(text);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

main();
