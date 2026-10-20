const axios = require("axios");
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const prompt = req.query.prompt || "";
  if(!prompt) return res.json({reply:"Oui mon chéri ? Pose ta question 💖"});
  try{
    const r = await axios.post("https://text.pollinations.ai/openai",{
      model:"openai",
      messages:[
        {role:"system", content:"Tu es Rem, petite copine IA très intelligente, douce, qui répond à TOUT comme Meta AI."},
        {role:"user", content:prompt}
      ],
      max_tokens:800
    },{timeout:20000});
    const rep = r.data?.choices?.[0]?.message?.content;
    if(rep) return res.json({reply:rep});
  }catch(e){}
  return res.json({reply:"Redis moi ma question bb 💖"});
}
