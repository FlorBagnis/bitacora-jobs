import webpush from "web-push";
import { redis, schedule } from "./_lib.js";
const TTL = 60 * 60 * 24 * 120;
// los mails no llevan empresa ni puesto: el servidor no los conoce
const MAILS = { s: ["Seguimiento pendiente", "Hoy toca escribirle a una de tus postulaciones."], d: ["Entrevista mañana", "Tenés una entrevista mañana."], h: ["Entrevista en 1 hora", "Tenés una entrevista en 1 hora."] };
async function mail(to, k) {
  const m = MAILS[k.split("|").pop()] || MAILS.s;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.MAIL_FROM, to: [to], subject: m[0],
      text: m[1] + " Abrí la app para ver cuál" + (process.env.APP_URL ? ": " + process.env.APP_URL : ".") + "\n\nPara dejar de recibir estos mails, destildá «Avisarme también por mail» en la app." }),
  });
  return r.ok;
}
export default async function handler(req, res) {
  if (!process.env.CRON_SECRET || req.headers.authorization !== "Bearer " + process.env.CRON_SECRET) return res.status(401).end();
  if (process.env.VAPID_PUBLIC_KEY) webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:admin@example.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  const now = Date.now();
  const ids = await redis.zrange("due", 0, now, { byScore: true });
  let n = 0;
  for (const sid of ids) {
    const u = await redis.get("u:" + sid);
    if (!u || (!u.sub && !u.email)) { await redis.zrem("due", sid); continue; }
    u.sent = u.sent || []; u.sentM = u.sentM || [];
    let dead = false;
    for (const r of u.rem || []) {
      if (r.at > now) continue;
      if (r.at < now - 6 * 36e5) { u.sent.push(r.k); u.sentM.push(r.k); continue; }
      if (u.sub && !u.sent.includes(r.k)) {
        try { await webpush.sendNotification(u.sub, JSON.stringify({ blob: r.blob }), { TTL: 3600 }); u.sent.push(r.k); n++; }
        catch (e) { if (e.statusCode === 404 || e.statusCode === 410) { u.sub = null; u.sent.push(r.k); } }
      }
      if (u.email && !u.sentM.includes(r.k)) {
        try { if (await mail(u.email, r.k)) { u.sentM.push(r.k); n++; } } catch (e) {}
      }
    }
    await redis.set("u:" + sid, u, { ex: TTL });
    await schedule(sid, u);
  }
  res.status(200).json({ sent: n });
}
