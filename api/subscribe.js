export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const response = await fetch("https://chaologies.substack.com/api/v1/free", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        Referer: "https://chaologies.substack.com/embed",
        Origin: "https://chaologies.substack.com",
      },
      body: JSON.stringify({
        email,
        first_url: "https://chaologies.com",
        first_referrer: "",
        current_url: "https://chaologies.com",
        current_referrer: "",
        referral_code: null,
        source: "embed",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Substack error:", response.status, text);
      return res.status(502).json({ error: "Subscription failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
