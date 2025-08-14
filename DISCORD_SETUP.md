# PiwPiw Discord Bot Dashboard Setup Guide

## 🚀 Connecting Your PiwPiw Discord Bot to the Dashboard

This guide will help you connect your Discord bot "PiwPiw" to this dashboard for full functionality.

### Prerequisites
- Discord Bot Application created on Discord Developer Portal
- Bot token
- Discord OAuth2 credentials

### Step 1: Discord Developer Portal Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your "PiwPiw" application or create a new one
3. Note down your **Application ID** (Client ID)

#### OAuth2 Configuration
1. Go to OAuth2 → General
2. Add these Redirect URIs:
   ```
   http://localhost:5173/auth/discord/callback
   http://your-domain.com/auth/discord/callback
   ```
3. Go to OAuth2 → URL Generator
4. Select these scopes:
   - `identify` - to get user info
   - `guilds` - to see user's servers
   - `bot` - for bot permissions

### Step 2: Environment Configuration

Create a `.env` file in your project root:

```env
# Discord OAuth
VITE_DISCORD_CLIENT_ID=your_discord_client_id_here
VITE_DISCORD_CLIENT_SECRET=your_discord_client_secret_here
VITE_DISCORD_REDIRECT_URI=http://localhost:5173/auth/discord/callback

# Bot Configuration
VITE_BOT_TOKEN=your_bot_token_here
VITE_BOT_PREFIX=P

# Dashboard Configuration
VITE_DASHBOARD_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:3001/api
```

### Step 3: Backend API Setup (Required for full functionality)

You'll need a backend server to handle:
- Discord OAuth authentication
- Bot statistics
- Command logs
- Server management

#### Recommended Tech Stack:
- **Node.js with Express** for REST API
- **Discord.js** for bot integration
- **MongoDB/PostgreSQL** for data storage
- **Socket.IO** for real-time updates

#### Basic API Endpoints Needed:
```
GET  /api/auth/discord          - Initiate Discord OAuth
GET  /api/auth/discord/callback - Handle OAuth callback
GET  /api/user/profile          - Get user profile
GET  /api/bot/stats             - Get bot statistics
GET  /api/servers               - Get user's servers
GET  /api/commands              - Get command usage data
POST /api/commands/execute      - Execute bot commands
GET  /api/analytics             - Get analytics data
```

### Step 4: Database Schema (Example with MongoDB)

```javascript
// User Schema
{
  discordId: String,
  username: String,
  avatar: String,
  guilds: [String], // Server IDs
  permissions: [String],
  createdAt: Date,
  lastLogin: Date
}

// Server Schema
{
  guildId: String,
  name: String,
  icon: String,
  memberCount: Number,
  botAdded: Boolean,
  settings: {
    prefix: String,
    welcomeChannel: String,
    // other bot settings
  }
}

// Command Log Schema
{
  commandName: String,
  userId: String,
  guildId: String,
  timestamp: Date,
  success: Boolean,
  executionTime: Number
}
```

### Step 5: Frontend Integration

Update the Discord login function in `LoginPage.jsx`:

```javascript
const handleDiscordLogin = () => {
  const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const REDIRECT_URI = encodeURIComponent(import.meta.env.VITE_DISCORD_REDIRECT_URI);
  const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20guilds`;
  
  window.location.href = DISCORD_OAUTH_URL;
};
```

### Step 6: Bot Integration Examples

#### Discord.js Bot Code Integration:
```javascript
// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Log command usage to dashboard
async function logCommand(commandName, userId, guildId, success = true) {
  try {
    await axios.post(`${process.env.API_BASE_URL}/commands/log`, {
      commandName,
      userId,
      guildId,
      success,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Failed to log command:', error);
  }
}

// Example command
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('P') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  switch (commandName) {
    case 'truth':
      // Your truth command logic
      await logCommand('truth', message.author.id, message.guild.id);
      break;
    case 'dare':
      // Your dare command logic
      await logCommand('dare', message.author.id, message.guild.id);
      break;
    // Add more commands...
  }
});
```

### Step 7: Real-time Updates with WebSocket

```javascript
// In your dashboard component
useEffect(() => {
  const socket = io(process.env.VITE_API_BASE_URL);
  
  socket.on('statsUpdate', (newStats) => {
    setStats(newStats);
  });
  
  socket.on('commandExecuted', (commandData) => {
    // Update command logs in real-time
    updateCommandLogs(commandData);
  });
  
  return () => socket.disconnect();
}, []);
```

### Step 8: Dashboard Features to Implement

1. **Real-time Bot Status** - Show online/offline status
2. **Server Management** - Add/remove bot from servers
3. **Command Analytics** - Most used commands, success rates
4. **User Management** - Ban/unban users across servers
5. **Settings Panel** - Configure bot prefix, welcome messages
6. **Logs Viewer** - Recent command executions and errors

### Step 9: Security Considerations

1. **API Authentication** - Use JWT tokens
2. **Rate Limiting** - Prevent API abuse
3. **Input Validation** - Sanitize all inputs
4. **CORS Configuration** - Restrict origins
5. **Environment Variables** - Never expose sensitive data

### Step 10: Deployment

#### Frontend (Vercel/Netlify):
```bash
npm run build
# Deploy dist folder
```

#### Backend (Railway/Heroku):
```bash
# Add Procfile
web: node server.js
```

### Need Help?

If you need assistance with:
- Setting up the backend API
- Implementing specific bot commands
- Database configuration
- Deployment process

Feel free to ask for more detailed code examples for any specific part!

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Recommended Project Structure

```
piwpiw-dashboard/
├── frontend/          # React dashboard (current)
├── backend/           # API server
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── services/
├── bot/              # Discord bot code
│   ├── commands/
│   ├── events/
│   └── utils/
└── shared/          # Shared types/utilities
```
