#!/usr/bin/env node
// src/data/pension.ts 의 notices/events 를 D1 시드 SQL(migrations/0002_seed.sql)로 변환한다.
// 사용: node scripts/gen-seed.mjs   (pension.ts 를 바꾼 뒤 다시 돌리면 시드도 갱신)
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(path.join(root, "src/data/pension.ts"), "utf8");
const { outputText } = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const mod = { exports: {} };
new Function("module", "exports", "require", outputText)(mod, mod.exports, require);
const { notices, events } = mod.exports;

const q = (v) => (v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);
const lines = ["-- 자동 생성: node scripts/gen-seed.mjs (원본 = src/data/pension.ts). 이미 있는 id 는 건드리지 않는다."];
notices.forEach((n, i) => {
  lines.push(
    `INSERT OR IGNORE INTO notices (id,title,content,date,important,active,sort) VALUES (${q(n.id)},${q(n.title)},${q(n.content)},${q(n.date)},${n.important ? 1 : 0},${n.active ? 1 : 0},${i});`
  );
});
events.forEach((e, i) => {
  lines.push(
    `INSERT OR IGNORE INTO events (id,title,period,description,highlight,conditions,badge,color,active,sort) VALUES (${q(e.id)},${q(e.title)},${q(e.period)},${q(e.description)},${q(e.highlight ?? null)},${q(JSON.stringify(e.conditions ?? []))},${q(e.badge ?? null)},${q(e.color)},${e.active ? 1 : 0},${i});`
  );
});
const out = path.join(root, "migrations/0002_seed.sql");
writeFileSync(out, lines.join("\n") + "\n");
console.log(`wrote ${out}: notices ${notices.length}, events ${events.length}`);
