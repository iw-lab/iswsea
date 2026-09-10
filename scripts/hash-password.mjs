#!/usr/bin/env node
// 관리자 비밀번호 → PBKDF2 해시 (functions/_lib/auth.ts 와 동일 형식)
// 사용: node scripts/hash-password.mjs '비밀번호'
//       또는 stdin:  printf '%s' '비밀번호' | node scripts/hash-password.mjs
// 출력된 해시를  wrangler pages secret put ADMIN_PASSWORD_HASH --project-name woodinsea  에 넣는다.
import { webcrypto as crypto } from "node:crypto";
import { readFileSync } from "node:fs";

const ITER = 100_000;
const b64u = (u8) => Buffer.from(u8).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const password = process.argv[2] ?? readFileSync(0, "utf8").replace(/\r?\n$/, "");
if (!password) {
  console.error("비밀번호가 비어 있습니다");
  process.exit(1);
}
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: ITER }, key, 256);
process.stdout.write(`pbkdf2$${ITER}$${b64u(salt)}$${b64u(new Uint8Array(bits))}\n`);
