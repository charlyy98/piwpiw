# Discord Bot Token Setup

## How to Set Your Bot Token

### Method 1: Environment Variable (Recommended)
```bash
# Windows (PowerShell)
$env:BOT_TOKEN="YOUR_DISCORD_BOT_TOKEN_HERE"

# Windows (Command Prompt)
set BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE

# Linux/Mac
export BOT_TOKEN="YOUR_DISCORD_BOT_TOKEN_HERE"
```

### Method 2: Create .env file
1. Create a file named `.env` in the project root
2. Add your token:
```
BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
```

## Getting Your Discord Bot Token

1. Go to https://discord.com/developers/applications
2. Select your bot application
3. Go to "Bot" section
4. Copy the bot token
5. **⚠️ NEVER share this token publicly!**

## Running the Bot Integration

```bash
# Make sure token is set, then:
node real-bot-integration.js
```

The server will show:
- ✅ If token is valid and bot connects
- ⚠️ If no token provided (demo mode)
- ❌ If token is invalid

## Security Note

The bot token is never stored in the code for security reasons. Always use environment variables or .env files that are not committed to git.
