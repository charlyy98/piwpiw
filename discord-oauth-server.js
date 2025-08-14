import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Discord OAuth endpoint
app.post('/api/discord/oauth', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'No authorization code provided' });
    }

    console.log('Processing Discord OAuth code:', code);

    // Step 1: Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: '1397634031268663448',
        client_secret: process.env.DISCORD_CLIENT_SECRET || 'IJu4fWHXKYbjxMubUDkpUbPCW1ZlEsR7',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:5173/auth/callback',
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange failed:', error);
      return res.status(400).json({ error: 'Failed to exchange code for token' });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    console.log('Access token obtained successfully');

    // Step 2: Get user data from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      console.error('User data fetch failed:', error);
      return res.status(400).json({ error: 'Failed to fetch user data' });
    }

    const discordUser = await userResponse.json();
    
    console.log('Discord user fetched:', discordUser.username);

    // Step 3: Format user data
    const userData = {
      id: discordUser.id,
      username: discordUser.username,
      avatar: discordUser.avatar 
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${(discordUser.discriminator || 0) % 5}.png`,
      discriminator: discordUser.discriminator,
      email: discordUser.email,
      verified: discordUser.verified,
      locale: discordUser.locale,
      fromDiscord: true
    };

    res.json({ success: true, user: userData });

  } catch (error) {
    console.error('Discord OAuth error:', error);
    res.status(500).json({ error: 'Internal server error during Discord OAuth' });
  }
});

app.listen(PORT, () => {
  console.log(`Discord OAuth server running on http://localhost:${PORT}`);
  console.log('Ready to handle Discord OAuth requests from your dashboard!');
});
