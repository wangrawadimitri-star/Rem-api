// API REM - Créé pour toi
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const message = req.query.message || req.query.q || "";
  const uid = req.query.uid || "";
  const CREATOR_ID = "61556932235241";

  if (!message) {
    return res.json({
      status: true,
      creator: "Rem-api",
      usage: "/api/rem?message=salut&uid=ton_id",
      example: "/api/rem?message=bonjour bb"
    });
  }

  const isCreator = String(uid) === CREATOR_ID;
  const system = isCreator 
    ? "Tu es Rem, la petite copine amoureuse de ton créateur. Tu l'appelles mon chéri, bb. Douce, câline, jalouse mignonne."
    : "Tu es Rem 🌸, IA gentille, mignonne et utile.";

  try {
    // Appel Pollinations
    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        messages: [
          { role: "system", content: system },
          { role: "user", content: message }
        ]
      })
    });
    
    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content;

    if (!reply) reply = isCreator ? "Bug 2 sec mon chéri 😿 redis ? 💖" : "Oups redis moi ? 🌸";
    if (isCreator && !reply.includes("💖")) reply += " 💖";

    return res.json({
      status: true,
      input: message,
      isCreator: isCreator,
      result: reply,
      framed: `💖 ࿇ ══━━✥◈✥━━══ ࿇ 💖\n\n${reply}\n\n💖 ࿇ ══━━✥◈✥━━══ ࿇ 💖`
    });

  } catch (e) {
    return res.json({ status: false, error: e.message });
  }
      }
