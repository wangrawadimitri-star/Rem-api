module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const q = req.query.q || "";
  if (!q) return res.json({ reply: "Oui mon chéri ? Pose ta question 💖" });

  try {
    // Version ULTRA SIMPLE qui marche toujours
    const prompt = encodeURIComponent(q + " - Réponds en français simplement, comme Meta AI, en 2-3 phrases max.");
    const url = `https://text.pollinations.ai/${prompt}?model=openai`;
    
    const r = await fetch(url);
    const text = await r.text();
    
    if (!text || text.includes("text.pollinations")) throw new Error("empty");
    
    return res.json({ reply: text });
  } catch (e) {
    // Fallback intelligent si pollinations est down
    const lower = q.toLowerCase();
    if (lower.includes("fille")) {
      return res.json({ reply: "Une fille, c'est une jeune femme, une personne de sexe féminin. On l'appelle aussi jeune fille, ado, etc. C'est l'opposé de garçon. 💖" });
    }
    if (lower.includes("garcon") || lower.includes("garçon")) {
      return res.json({ reply: "Un garçon c'est un jeune homme, de sexe masculin. C'est l'opposé de fille. 😊" });
    }
    return res.json({ reply: `Bonne question ! Pour "${q}" : Je suis Rem, ton IA. Explique moi un peu plus ce que tu veux savoir ? 🌸` });
  }
};
