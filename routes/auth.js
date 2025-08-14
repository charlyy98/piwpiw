import express from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Discord OAuth configuration
const DISCORD_CLIENT_ID = '1397634031268663448';
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || 'IJu4fWHXKYbjxMubUDkpUbPCW1ZlEsR7';
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:5173/auth/callback';

// @route   POST /api/auth/discord
// @desc    Exchange Discord OAuth code for user data
// @access  Public
router.post('/discord', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ 
        success: false, 
        error: 'No authorization code provided' 
      });
    }

    logger.info(`Processing Discord OAuth code: ${code.substring(0, 10)}...`);

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
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      logger.error('Token exchange failed:', error);
      return res.status(400).json({ 
        success: false, 
        error: 'Failed to exchange code for token',
        details: JSON.parse(error)
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    logger.info('✅ Access token obtained successfully');

    // Step 2: Get user data from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      logger.error('User data fetch failed:', error);
      return res.status(400).json({ 
        success: false, 
        error: 'Failed to fetch user data' 
      });
    }

    const discordUser = await userResponse.json();
    
    logger.info(`✅ Discord user fetched: ${discordUser.username}`);

    // Step 3: Get user's guilds
    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let guilds = [];
    if (guildsResponse.ok) {
      guilds = await guildsResponse.json();
      logger.info(`📊 Fetched ${guilds.length} user guilds`);
    }

    // Step 4: Format user data
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
      guilds: guilds.map(guild => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
        owner: guild.owner,
        permissions: guild.permissions,
        features: guild.features
      })),
      fromDiscord: true,
      loginTimestamp: new Date().toISOString()
    };

    // Step 5: Generate JWT token for session management
    const jwtToken = jwt.sign(
      { 
        userId: userData.id, 
        username: userData.username,
        email: userData.email 
      },
      process.env.JWT_SECRET || 'piwpiw-secret-key',
      { expiresIn: '7d' }
    );

    logger.info(`🎯 Successfully authenticated user: ${userData.username} (${userData.id})`);

    res.json({ 
      success: true, 
      user: userData,
      token: jwtToken,
      message: 'Authentication successful'
    });

  } catch (error) {
    logger.error('Discord OAuth error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error during Discord OAuth',
      message: error.message
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh JWT token
// @access  Private
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'piwpiw-secret-key');
    
    const newToken = jwt.sign(
      { 
        userId: decoded.userId, 
        username: decoded.username,
        email: decoded.email 
      },
      process.env.JWT_SECRET || 'piwpiw-secret-key',
      { expiresIn: '7d' }
    );

    res.json({ success: true, token: newToken });
    
  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user data
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'piwpiw-secret-key');
    
    // In a real app, you'd fetch fresh user data from database
    res.json({ 
      success: true, 
      user: {
        id: decoded.userId,
        username: decoded.username,
        email: decoded.email
      }
    });
    
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

export default router;
