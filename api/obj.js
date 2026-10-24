import crypto from "crypto";
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || "redis " + r.status);
  return j.result;
}

export default async (req, res) => {
res.setHeader("Cache-Control", "no-store");
  try {
    if (!URL_ || !TOKEN) {
      return res.status(500).json({ error: "Falta conectar la base de datos en Vercel" });
    }
    const b = req.body && typeof req.body === "object" ? req.body : {};
    if (req.method === "POST") {
      if (b.data === undefined) return res.status(400).json({ error: "sin datos" });
      const id = crypto.randomBytes(16).toString("hex");
      await redis(["SET", "ps:" + id, JSON.stringify({ name: b.name || "postulaciones", data: b.data })]);
      return res.status(200).json({ id });
    }
    const id = String((req.query && req.query.id) || "");
    if (!/^[a-f0-9]{16,64}$/.test(id)) return res.status(400).json({ error: "id inválido" });
    if (req.method === "GET") {
      const v = await redis(["GET", "ps:" + id]);
      if (!v) return res.status(404).json({ error: "no existe" });
      const o = JSON.parse(v);
      return res.status(200).json({ id, name: o.name, data: o.data });
    }
    if (req.method === "PUT") {
      if (b.data === undefined) return res.status(400).json({ error: "sin datos" });
      if (!(await redis(["EXISTS", "ps:" + id]))) return res.status(404).json({ error: "no existe" });
      await redis(["SET", "ps:" + id, JSON.stringify({ name: b.name || "postulaciones", data: b.data })]);
      return res.status(200).json({ id });
    }
    return res.status(405).json({ error: "método no permitido" });
  } catch (e) {
    return res.status(500).json({ error: "fallo interno" });
  }
};
