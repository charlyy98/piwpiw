// Simple Professional PiwPiw Backend Server
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Discord OAuth Configuration
const DISCORD_CLIENT_ID = '1397634031268663448';
const DISCORD_CLIENT_SECRET = 'IJu4fWHXKYbjxMubUDkpUbPCW1ZlEsR7';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'PiwPiw Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Discord OAuth endpoint
app.post('/api/discord/oauth', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ 
        success: false, 
        error: 'No authorization code provided' 
      });
    }

    console.log('🔐 Processing Discord OAuth code:', code.substring(0, 10) + '...');

    // Step 1: Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:5173/auth/callback',
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('❌ Token exchange failed:', error);
      return res.status(400).json({ 
        success: false, 
        error: 'Failed to exchange code for token',
        details: error
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    console.log('✅ Access token obtained successfully');

    // Step 2: Get user data from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      console.error('❌ User data fetch failed:', error);
      return res.status(400).json({ 
        success: false, 
        error: 'Failed to fetch user data' 
      });
    }

    const discordUser = await userResponse.json();
    
    console.log('✅ Discord user fetched:', discordUser.username);

    // Step 3: Format user data with real Discord avatar
    const userData = {
      id: discordUser.id,
      username: discordUser.username,
      globalName: discordUser.global_name,
      avatar: discordUser.avatar 
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${discordUser.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
        : `https://cdn.discordapp.com/embed/avatars/${(discordUser.discriminator || 0) % 5}.png`,
      discriminator: discordUser.discriminator,
      email: discordUser.email,
      verified: discordUser.verified,
      locale: discordUser.locale,
      mfaEnabled: discordUser.mfa_enabled,
      flags: discordUser.flags,
      premiumType: discordUser.premium_type,
      publicFlags: discordUser.public_flags,
      fromDiscord: true,
      loginTimestamp: new Date().toISOString()
    };

    console.log('🎯 Successfully authenticated user:', userData.username, '- Avatar:', userData.avatar);

    res.json({ 
      success: true, 
      user: userData,
      message: 'Real Discord authentication successful!'
    });

  } catch (error) {
    console.error('💥 Discord OAuth error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error during Discord OAuth',
      message: error.message
    });
  }
});

// Mock API endpoints for dashboard functionality
app.get('/api/users/profile/:userId', (req, res) => {
  res.json({
    success: true,
    profile: {
      id: req.params.userId,
      username: 'laylay98',
      joinDate: '2024-01-15',
      level: 42,
      commandsUsed: 1337,
      serversManaged: 4
    }
  });
});

app.get('/api/servers', (req, res) => {
  res.json({
    success: true,
    servers: [
      {
        id: '987654321',
        name: 'Gaming Community',
        memberCount: 1250,
        botAdded: true,
        stats: { commandsToday: 89, activeUsers: 342 }
      },
      {
        id: '876543210', 
        name: 'Study Group',
        memberCount: 245,
        botAdded: true,
        stats: { commandsToday: 23, activeUsers: 67 }
      }
    ]
  });
});

app.get('/api/analytics/dashboard', (req, res) => {
  res.json({
    success: true,
    analytics: {
      overview: {
        totalUsers: 1649,
        totalServers: 4,
        totalCommands: 9999,
        uptime: '99.9%'
      },
      chartData: {
        userActivity: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          users: Math.floor(Math.random() * 200) + 50,
          commands: Math.floor(Math.random() * 500) + 100
        })).reverse()
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 PiwPiw Professional Backend Server Started!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`💎 Discord Client ID: ${DISCORD_CLIENT_ID}`);
  console.log(`✅ Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(60));
  console.log('🎯 Ready to handle real Discord OAuth authentication!');
  console.log('👤 Your real Discord avatar and data will be used!');
});

export default app;
