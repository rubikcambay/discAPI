# Discord Server Viewer

A simple web application that lets you view **channels of a Discord server** by entering its **Guild ID**.  
It uses a **Discord bot**, an **Express backend**, and a **vanilla HTML/CSS/JS frontend**.

> ⚠️ The bot must be **inside the server** you want to view, otherwise Discord will deny access.


## ✨ Features

- Fetch Discord server channels by **Guild ID**
- Displays **text & voice channels**
- Click a channel to copy/view its **Channel ID**
- Simple, Discord-like dark UI
- Secure backend using Discord Bot Token
- CORS configured for GitHub Pages frontend


## 🧱 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

### Backend
- Node.js
- Express
- discord.js v14
- dotenv
- CORS


## 📂 Project Structure

```

project-root/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── server.js
├── package.json
└── README.md

````


## 🚀 Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/discord-server-viewer.git
cd discord-server-viewer
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN
```

> 🔐 **Never commit your bot token**


## 🤖 Discord Bot Setup

1. Go to the **Discord Developer Portal**
2. Create a new application
3. Add a **Bot**
4. Copy the **Bot Token**
5. Enable these **Privileged Gateway Intents**:

   * Server Members (optional)
   * Message Content

### Required Bot Permissions

* View Channels
* Read Messages

Invite the bot to your server using the OAuth2 URL generator.


## ▶️ Running the App

Start the backend server:

```bash
node server.js
```

Server will run at:

```
http://localhost:3000
```

Open the frontend:

```
http://localhost:3000
```

(or deploy the frontend to GitHub Pages and keep the backend running)


## 🔌 API Endpoint

### Get Guild Channels

```
GET /api/guilds/:guildId/channels
```

Example:

```
/api/guilds/123456789012345678/channels
```

## 🛡️ Notes & Limitations

* The bot **must be in the target server**
* You can only access servers the bot has permission for
* Categories are intentionally hidden
* This app is **read-only** (no moderation actions)


## 👤 Author

Andrei TITIKMAN


## 📜 License

This project is open-source and free to use for learning and personal projects.
