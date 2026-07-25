export default async function handler(req, res) {
  const PUB_ID = "pub_045bdfc9-d6b0-454a-b284-ea9b5aa2de74";
  const API_KEY = process.env.BEEHIIV_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing API key" });
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      return response.ok
        ? res.status(200).json({ ok: true, provider: "beehiiv" })
        : res.status(502).json({ error: "Newsletter provider unavailable" });
    } catch {
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, source } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "chaologies.com",
          utm_medium: "organic",
          utm_campaign: source === "life-in-weeks" ? "life-in-weeks" : "website-subscribe",
          referring_site: req.headers.referer || "https://chaologies.com",
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Beehiiv error:", response.status, text);
      return res.status(502).json({ error: "Subscription failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
