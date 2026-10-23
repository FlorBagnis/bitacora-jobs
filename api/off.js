import { redis, cors, okSid, body } from "./_lib.js";
export default async function handler(req, res) {
  if (cors(req, res)) return;
  const b = body(req);
  if (okSid(b.sid)) { await redis.del("u:" + b.sid); await redis.zrem("due", b.sid); }
  res.status(200).json({ ok: true });
}
