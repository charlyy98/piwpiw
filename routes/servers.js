import express from 'express';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Mock server data
const mockServers = [
  {
    id: '987654321',
    name: 'Gaming Community',
    icon: 'https://cdn.discordapp.com/icons/987654321/icon.png',
    memberCount: 1250,
    channelCount: 25,
    roleCount: 12,
    botAdded: true,
    permissions: ['ADMINISTRATOR'],
    region: 'US East',
    verificationLevel: 2,
    features: ['COMMUNITY', 'NEWS', 'BOOST'],
    boostLevel: 2,
    boostCount: 14,
    vanityUrl: 'gaming-community',
    description: 'The best gaming community server!',
    bannerUrl: 'https://cdn.discordapp.com/banners/987654321/banner.png',
    createdAt: '2023-01-15T10:30:00Z',
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
    roleCount: 5,
    botAdded: true,
    permissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
    region: 'EU West',
    verificationLevel: 1,
    features: ['COMMUNITY'],
    boostLevel: 1,
    boostCount: 3,
    description: 'Collaborative learning environment',
    createdAt: '2023-03-20T14:20:00Z',
    stats: {
      commandsToday: 23,
      activeUsers: 67,
      messagesHour: 45,
      uptime: '99.9%'
    }
  }
];

// @route   GET /api/servers
// @desc    Get user's servers
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    
    logger.info(`📊 Fetching servers for user: ${userId}`);
    
    // In real app, fetch user's servers from database
    const userServers = mockServers.map(server => ({
      ...server,
      lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      isOwner: Math.random() > 0.7,
      joinedAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
    }));

    res.json({
      success: true,
      servers: userServers,
      total: userServers.length,
      botEnabled: userServers.filter(s => s.botAdded).length
    });
    
  } catch (error) {
    logger.error('Get servers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch servers'
    });
  }
});

// @route   GET /api/servers/:serverId
// @desc    Get specific server details
// @access  Private
router.get('/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    
    const server = mockServers.find(s => s.id === serverId);
    
    if (!server) {
      return res.status(404).json({
        success: false,
        error: 'Server not found'
      });
    }

    // Enhanced server details
    const serverDetails = {
      ...server,
      channels: [
        { id: '1', name: 'general', type: 'text', memberCount: server.memberCount },
        { id: '2', name: 'gaming', type: 'text', memberCount: Math.floor(server.memberCount * 0.7) },
        { id: '3', name: 'General Voice', type: 'voice', memberCount: Math.floor(Math.random() * 20) }
      ],
      roles: [
        { id: '1', name: '@everyone', color: '#000000', members: server.memberCount },
        { id: '2', name: 'Admin', color: '#ff0000', members: 3 },
        { id: '3', name: 'Moderator', color: '#00ff00', members: 8 }
      ],
      recentActivity: [
        { type: 'member_join', user: 'NewUser123', timestamp: new Date().toISOString() },
        { type: 'message', channel: 'general', count: 45, timestamp: new Date().toISOString() },
        { type: 'command_used', command: '/truth', user: 'laylay98', timestamp: new Date().toISOString() }
      ],
      botSettings: {
        prefix: 'P',
        autoModeration: true,
        welcomeMessage: true,
        musicEnabled: true,
        gameCommands: true
      }
    };

    logger.info(`🏰 Server details requested: ${server.name} (${serverId})`);
    
    res.json({
      success: true,
      server: serverDetails
    });
    
  } catch (error) {
    logger.error('Get server details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch server details'
    });
  }
});

// @route   POST /api/servers/:serverId/settings
// @desc    Update server bot settings
// @access  Private
router.post('/:serverId/settings', async (req, res) => {
  try {
    const { serverId } = req.params;
    const { settings } = req.body;
    
    logger.info(`⚙️ Updating settings for server: ${serverId}`);
    
    // In real app, update database
    const updatedSettings = {
      serverId,
      settings: {
        prefix: settings.prefix || 'P',
        autoModeration: settings.autoModeration ?? true,
        welcomeMessage: settings.welcomeMessage ?? true,
        musicEnabled: settings.musicEnabled ?? true,
        gameCommands: settings.gameCommands ?? true,
        ...settings
      },
      updatedAt: new Date().toISOString(),
      updatedBy: 'laylay98'
    };

    res.json({
      success: true,
      settings: updatedSettings,
      message: 'Server settings updated successfully'
    });
    
  } catch (error) {
    logger.error('Update server settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update server settings'
    });
  }
});

// @route   GET /api/servers/:serverId/stats
// @desc    Get server statistics
// @access  Private
router.get('/:serverId/stats', async (req, res) => {
  try {
    const { serverId } = req.params;
    const { timeframe = '7d' } = req.query;
    
    // Generate realistic stats based on timeframe
    const generateStats = (days) => {
      return Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        messages: Math.floor(Math.random() * 1000) + 100,
        commands: Math.floor(Math.random() * 50) + 10,
        activeUsers: Math.floor(Math.random() * 100) + 20,
        newMembers: Math.floor(Math.random() * 10),
        voiceMinutes: Math.floor(Math.random() * 500) + 50
      })).reverse();
    };

    const timeframes = {
      '7d': 7,
      '30d': 30,
      '90d': 90
    };

    const stats = generateStats(timeframes[timeframe] || 7);

    logger.info(`📈 Stats requested for server ${serverId} (${timeframe})`);
    
    res.json({
      success: true,
      stats,
      timeframe,
      summary: {
        totalMessages: stats.reduce((sum, day) => sum + day.messages, 0),
        totalCommands: stats.reduce((sum, day) => sum + day.commands, 0),
        avgActiveUsers: Math.floor(stats.reduce((sum, day) => sum + day.activeUsers, 0) / stats.length),
        totalNewMembers: stats.reduce((sum, day) => sum + day.newMembers, 0)
      }
    });
    
  } catch (error) {
    logger.error('Get server stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch server stats'
    });
  }
});

export default router;
