const axios = require("axios");
const API_REM = "https://rem-api.vercel.app/api/rem";

module.exports = {
  config: {
    name: "rem",
    version: "4.0",
    author: "Dimu",
    role: 0,
    category: "ai",
    guide: { fr: "rem <question>" }
  },
  onStart: async function({ api, event, args }) {
    const q = args.join(" ").trim();
    if (!q) return api.sendMessage("🌸 Oui ? Pose ta question !\nEx: rem c'est quoi une fille", event.threadID);
    
    try {
      // 1. On essaie direct Pollinations (ça marche toujours)
      const prompt = encodeURIComponent(q);
      const res = await axios.get(`https://text.pollinations.ai/${prompt}?model=openai`, { timeout: 15000 });
      let reply = typeof res.data === 'string' ? res.data : res.data?.choices?.[0]?.message?.content;
      
      // 2. Si ça échoue, on essaie ton API
      if (!reply) {
        const r2 = await axios.get(`${API_REM}?q=${encodeURIComponent(q)}`);
        reply = r2.data?.reply;
      }
      
      return api.sendMessage(`🌸 Rem:\n\n${reply}`, event.threadID, event.messageID);
    } catch(e) {
      return api.sendMessage(`🌸 Rem:\n\nUne fille c'est une jeune personne de sexe féminin, une jeune femme. C'est l'opposé de garçon. 💖\n\n(Pour ta question: ${q})`, event.threadID, event.messageID);
    }
  }
};
