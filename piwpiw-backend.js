// 🚀 PiwPiw Professional Backend Server
// Real Discord OAuth + Complete Dashboard API

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Middleware - Enhanced CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Discord OAuth Configuration
const DISCORD_CLIENT_ID = '1397634031268663448';
const DISCORD_CLIENT_SECRET = 'IJu4fWHXKYbjxMubUDkpUbPCW1ZlEsR7';

// 🏠 Root Route
app.get('/', (req, res) => {
  res.json({
    service: 'PiwPiw Professional Backend API',
    version: '1.0.0',
    status: 'Running',
    message: 'Welcome to PiwPiw Dashboard Backend!',
    endpoints: {
      health: '/health',
      discord_oauth: '/api/discord/oauth',
      users: '/api/users/*',
      servers: '/api/servers/*',
      analytics: '/api/analytics/*',
      commands: '/api/commands/*',
      bot: '/api/bot/*'
    },
    timestamp: new Date().toISOString()
  });
});

// 🏥 Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'PiwPiw Professional Backend',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    discord: 'Ready',
    api: 'Active'
  });
});

// 🔐 Real Discord OAuth Authentication
app.post('/api/discord/oauth', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ 
        success: false, 
        error: 'No authorization code provided' 
      });
    }

    console.log('🔐 Processing Discord OAuth code:', code.substring(0, 15) + '...');

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
        details: JSON.parse(error)
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
    
    console.log('🎯 Real Discord user fetched:', discordUser.username);

    // Step 3: Get user's guilds
    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let guilds = [];
    if (guildsResponse.ok) {
      guilds = await guildsResponse.json();
      console.log(`📊 Fetched ${guilds.length} user guilds`);
    }

    // Step 4: Format real user data
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
      guilds: guilds.slice(0, 10).map(guild => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
        owner: guild.owner,
        permissions: guild.permissions
      })),
      fromDiscord: true,
      loginTimestamp: new Date().toISOString()
    };

    console.log('🎉 SUCCESS! Real Discord authentication for:', userData.username);
    console.log('🖼️ Real avatar URL:', userData.avatar);
    console.log('📧 Real email:', userData.email);

    res.json({ 
      success: true, 
      user: userData,
      message: 'Real Discord authentication successful! Your actual Discord data is now loaded.'
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

// 👤 User Profile API
app.get('/api/users/profile/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    success: true,
    profile: {
      id: userId,
      username: 'laylay98',
      joinDate: '2024-01-15',
      level: 42,
      experience: 15750,
      commandsUsed: 1337,
      serversManaged: 4,
      badges: ['Early Adopter', 'Active User', 'Premium Member'],
      stats: {
        uptime: '99.9%',
        lastSeen: new Date().toISOString(),
        favoriteCommand: 'truth'
      }
    }
  });
});

// 🏰 Servers API - Now with REAL data option
app.get('/api/servers', async (req, res) => {
  try {
    // Try to get real data from bot integration
    const realDataResponse = await fetch('http://localhost:3002/api/servers/real');
    
    if (realDataResponse.ok) {
      const realData = await realDataResponse.json();
      console.log('✅ Using REAL server data from bot!');
      return res.json(realData);
    }
  } catch (error) {
    console.log('⚠️ Real bot data not available, using fallback data');
  }
  
  // Fallback to mock data if real bot integration is not available
  res.json({
    success: true,
    servers: [
      {
        id: '987654321',
        name: 'Gaming Community',
        icon: 'https://cdn.discordapp.com/icons/987654321/icon.png',
        memberCount: 1250,
        channelCount: 25,
        botAdded: true,
        permissions: ['ADMINISTRATOR'],
        stats: {
          commandsToday: 89,
          activeUsers: 342,
          messagesHour: 156,
          uptime: '99.8%'
        }
      },
      {
        id: '876543210',
        name: 'Study Group', 
        icon: 'https://cdn.discordapp.com/icons/876543210/icon.png',
        memberCount: 245,
        channelCount: 8,
        botAdded: true,
        permissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
        stats: {
          commandsToday: 23,
          activeUsers: 67,
          messagesHour: 45,
          uptime: '99.9%'
        }
      }
    ],
    total: 2,
    botEnabled: 2,
    dataSource: 'fallback'
  });
});

// 📊 Analytics API - Now with REAL data option
app.get('/api/analytics/dashboard', async (req, res) => {
  try {
    // Try to get real analytics from bot integration
    const realDataResponse = await fetch('http://localhost:3002/api/analytics/real');
    
    if (realDataResponse.ok) {
      const realData = await realDataResponse.json();
      console.log('✅ Using REAL analytics data from bot!');
      return res.json(realData);
    }
  } catch (error) {
    console.log('⚠️ Real bot analytics not available, using fallback data');
  }
  
  // Fallback analytics data
  res.json({
    success: true,
    analytics: {
      overview: {
        totalUsers: 1649,
        totalServers: 4,
        totalCommands: 9999,
        uptime: '99.9%',
        avgResponseTime: '0.3s',
        successRate: '98.7%'
      },
      growth: {
        usersGrowth: '+12.5%',
        serversGrowth: '+25.0%',
        commandsGrowth: '+8.3%'
      },
      chartData: {
        userActivity: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          users: Math.floor(Math.random() * 200) + 50,
          commands: Math.floor(Math.random() * 500) + 100,
          servers: Math.floor(Math.random() * 5) + 1
        })).reverse(),
        commandUsage: [
          { command: 'truth', count: 1337, percentage: 35.2 },
          { command: 'dare', count: 892, percentage: 23.5 },
          { command: 'play', count: 567, percentage: 14.9 },
          { command: 'ban', count: 234, percentage: 6.2 },
          { command: 'kick', count: 156, percentage: 4.1 }
        ]
      },
      realTimeStats: {
        currentUsers: Math.floor(Math.random() * 100) + 200,
        commandsPerMinute: Math.floor(Math.random() * 10) + 2,
        activeServers: 3,
        responseTime: (Math.random() * 0.5 + 0.1).toFixed(2) + 'ms'
      }
    },
    dataSource: 'fallback',
    generatedAt: new Date().toISOString()
  });
});

// 🎮 Commands API - Now with REAL data option
app.get('/api/commands', async (req, res) => {
  try {
    // Try to get real commands from bot integration
    const realDataResponse = await fetch('http://localhost:3002/api/commands/real');
    
    if (realDataResponse.ok) {
      const realData = await realDataResponse.json();
      console.log('✅ Using REAL commands data from bot!');
      return res.json(realData);
    }
  } catch (error) {
    console.log('⚠️ Real bot commands not available, using fallback data');
  }
  
  // Fallback commands data
  res.json({
    success: true,
    commands: [
      {
        id: 'truth',
        name: 'truth',
        description: 'Get a random truth question',
        category: 'Fun',
        usage: 'Ptruth',
        usageCount: 1337,
        successRate: 98.5
      },
      {
        id: 'dare',
        name: 'dare',
        description: 'Get a random dare challenge', 
        category: 'Fun',
        usage: 'Pdare',
        usageCount: 892,
        successRate: 97.2
      },
      {
        id: 'ban',
        name: 'ban',
        description: 'Ban a user from the server',
        category: 'Moderation',
        usage: 'Pban @user [reason]',
        usageCount: 45,
        successRate: 100
      }
    ],
    total: 3,
    dataSource: 'fallback'
  });
});

// 🤖 Bot Status API - Now with REAL data option
app.get('/api/bot/status', async (req, res) => {
  try {
    // Try to get real bot status from bot integration
    const realDataResponse = await fetch('http://localhost:3002/api/bot/real-status');
    
    if (realDataResponse.ok) {
      const realData = await realDataResponse.json();
      console.log('✅ Using REAL bot status data!');
      return res.json(realData);
    }
  } catch (error) {
    console.log('⚠️ Real bot status not available, using fallback data');
  }
  
  // Fallback bot status data
  res.json({
    success: true,
    bot: {
      online: true,
      uptime: '2h 32m 15s',
      version: 'v2.5.1',
      ping: Math.floor(Math.random() * 100) + 20,
      guilds: 4,
      users: 1649,
      memoryUsage: Math.floor(Math.random() * 200) + 100,
      cpuUsage: Math.floor(Math.random() * 30) + 10
    },
    dataSource: 'fallback'
  });
});

// Start the professional backend server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 PiwPiw Professional Backend Server Started Successfully!');
  console.log('='.repeat(70));
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`🎯 Frontend URL: http://localhost:5173`);
  console.log(`✅ Health Check: http://localhost:${PORT}/health`);
  console.log(`🔐 Discord OAuth: ${DISCORD_CLIENT_ID}`);
  console.log('='.repeat(70));
  console.log('🎉 FEATURES READY:');
  console.log('   ✅ Real Discord OAuth Authentication');
  console.log('   ✅ Real Discord Avatar & User Data');
  console.log('   ✅ Professional Dashboard APIs');
  console.log('   ✅ Server Management');
  console.log('   ✅ Analytics & Statistics');
  console.log('   ✅ Bot Status & Commands');
  console.log('='.repeat(70));
  console.log('🔥 Ready to make your dashboard 100% REAL!');
  console.log('👤 Your actual Discord info will now appear!');
  console.log('\n');
});

export default app;
