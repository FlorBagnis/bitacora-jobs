import { Redis } from "@upstash/redis";
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});
export const okSid = (s) => typeof s === "string" && /^[\w-]{16,64}$/.test(s);
export function cors(req, res) {
  if (process.env.ALLOWED_ORIGIN) res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
  if (req.method === "OPTIONS") { res.status(204).end(); return true; }
  return false;
}
export const body = (req) => { try { return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {}; } catch { return {}; } };
export const pend = (u, r) => (u.sub && !(u.sent || []).includes(r.k)) || (u.email && !(u.sentM || []).includes(r.k));
// anota en "bj:due" la hora del próximo aviso pendiente de cada persona
export async function schedule(sid, u) {
  const p = (u.rem || []).filter((r) => pend(u, r));
  if (!p.length) { await redis.zrem("bj:due", sid); return; }
  await redis.zadd("bj:due", { score: Math.min(...p.map((r) => r.at)), member: sid });
}
