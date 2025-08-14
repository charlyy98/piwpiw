# 🔧 Discord OAuth Setup Guide

## Problem
You're getting "Invalid OAuth2 redirect_uri" because the Discord application doesn't have the correct redirect URI configured.

## Solution

### Step 1: Access Discord Developer Portal
1. Go to: https://discord.com/developers/applications
2. Login with your Discord account
3. Find your application with Client ID: `1397634031268663448`

### Step 2: Configure Redirect URIs
1. Click on your PiwPiw application
2. Go to **OAuth2** → **General** (left sidebar)
3. Scroll down to **Redirects** section
4. Click **"Add Redirect"**
5. Add these URIs one by one:

```
http://localhost:5173
http://localhost:5173/
http://localhost:5173/auth/callback
http://localhost:5173/auth/discord/callback
```

6. Click **"Save Changes"**

### Step 3: Test Different URIs
Try these common patterns (add them all to be safe):

#### Basic localhost
```
http://localhost:5173
```

#### With trailing slash
```
http://localhost:5173/
```

#### Callback paths
```
http://localhost:5173/callback
http://localhost:5173/auth
http://localhost:5173/auth/callback
http://localhost:5173/auth/discord
http://localhost:5173/auth/discord/callback
```

### Step 4: Enable Real OAuth (After Setup)
Once you've added the redirect URIs, uncomment these lines in `LoginPage.jsx`:

```javascript
const handleDiscordLogin = () => {
  // Enable these lines:
  const DISCORD_CLIENT_ID = '1397634031268663448';
  const REDIRECT_URI = encodeURIComponent('http://localhost:5173/auth/callback');
  const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20email%20guilds`;
  window.location.href = DISCORD_OAUTH_URL;
};
```

## Current Status
✅ **Login works with simulation** (2-second loading, then logs you in)
⏳ **Discord OAuth ready** (just needs redirect URI configured)

## Quick Test
Try the "Continue with Discord Pro" button now - it should work with a 2-second loading animation and log you into the dashboard!
