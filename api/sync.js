import { redis, cors, okSid, body, schedule } from "./_lib.js";
const TTL = 60 * 60 * 24 * 120;
const MAILRE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).end();
  const b = body(req);
  if (!okSid(b.sid)) return res.status(400).json({ error: "sid" });
  const now = Date.now();
  const prev = (await redis.get("bj:u:" + b.sid)) || {};
  const rem = (Array.isArray(b.reminders) ? b.reminders : []).slice(0, 200)
    .filter((r) => r && typeof r.k === "string" && r.k.length < 80 && Number.isFinite(r.at) && r.at > now - 6 * 36e5 && r.at < now + 400 * 864e5)
    .map((r) => ({ k: r.k, at: r.at, blob: r.blob && typeof r.blob.ct === "string" && r.blob.ct.length < 2000 ? { iv: String(r.blob.iv), ct: r.blob.ct } : null }));
  const sub = b.sub && b.sub.endpoint ? b.sub : prev.sub || null;
  const email = typeof b.email === "string" && MAILRE.test(b.email.trim()) ? b.email.trim().slice(0, 254) : "";
  const keep = (a) => (a || []).filter((k) => rem.some((r) => r.k === k));
  const u = { sub, email, rem, sent: keep(prev.sent), sentM: keep(prev.sentM) };
  await redis.set("bj:u:" + b.sid, u, { ex: TTL });
  await schedule(b.sid, u);
  res.status(200).json({ ok: true });
}
