require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { Client, IntentsBitField, Events } = require("discord.js");

const app = express();
const PORT = 3000;

// ---- CORS ----
app.use(cors({
  origin: 'https://rubikcambay.github.io'
}));

// ---- Static files ----
app.use(express.static("public"));

// ---- Discord bot setup ----
const TOKEN = process.env.TOKEN;
const DISCORD_API = "https://discord.com/api/v10";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

client.once(Events.ClientReady, c => {
  console.log(`✅ Bot online as ${c.user.tag}`);
});

client.login(TOKEN);

// ---- API route ----
app.get("/api/guilds/:id/channels", async (req, res) => {
  try {
    const guildId = req.params.id;
    console.log(`Fetching channels for Guild ID: ${guildId}`);

    const response = await fetch(`${DISCORD_API}/guilds/${guildId}/channels`, {
      headers: { Authorization: `Bot ${TOKEN}` },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Discord API Error:", data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error("🔥 Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// ---- Test bot responses ----
client.on(Events.MessageCreate, message => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content === "hello") message.reply("Hey there! I am your Server Viewer bot. 🤖");
  else if (content === "ping") message.reply("Pong! 🏓");
  else if (content === "server id") message.reply(`Server ID: **${message.guild.id}**`);
  else if (content === "help") message.reply("Try saying: `hello`, `ping`, or `server id`!");
});

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
