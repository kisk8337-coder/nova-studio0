export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const data = req.body;

    const text = `
📸 Новая заявка

👤 Имя: ${data.name || "-"}
📞 Телефон: ${data.phone || "-"}
📧 Email: ${data.email || "-"}
💬 Telegram: ${data.telegram || "-"}
    `;

    await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text
      })
    });

    return res.status(200).json({ ok: true });

  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}
