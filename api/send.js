export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { name, phone, email, telegram } = req.body || {};

    const text = `
📸 Новая заявка

👤 Имя: ${name || "-"}
📞 Телефон: ${phone || "-"}
📧 Email: ${email || "-"}
💬 Telegram: ${telegram || "-"}
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.TG_CHAT_ID,
          text
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({ success: data.ok });

  } catch (err) {
    return res.status(500).json({ success: false });
  }
}
}
