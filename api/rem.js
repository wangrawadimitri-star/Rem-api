module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const q = req.query.q || "";
  
  if (!q || q.trim() === "" || q.toLowerCase() === "salut") {
    return res.status(200).json({ reply: "Oui mon chéri ? Pose ta question 💖" });
  }

  try {
    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        messages: [
          { role: "system", content: "Tu es Rem, une IA sympa, tu expliques tout simplement comme Meta AI, en français." },
          { role: "user", content: q }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || data.choices?.[0]?.content || "Je n'ai pas compris, redis ? 🌸";
    
    return res.status(200).json({ reply: answer });
    
  } catch (e) {
    return res.status(200).json({ reply: "Mon cerveau bug un peu, mais je suis là ! Question: " + q + " 🌸" });
  }
};
