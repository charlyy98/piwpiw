import express from 'express';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Mock command data
const mockCommands = [
  {
    id: 'truth',
    name: 'truth',
    description: 'Get a random truth question',
    category: 'Fun',
    usage: 'Ptruth',
    cooldown: 5,
    permissions: [],
    examples: ['Ptruth', 'Ptruth @user'],
    aliases: ['t', 'question'],
    enabled: true,
    usageCount: 1337,
    successRate: 98.5,
    averageResponseTime: 0.3
  },
  {
    id: 'dare',
    name: 'dare', 
    description: 'Get a random dare challenge',
    category: 'Fun',
    usage: 'Pdare',
    cooldown: 5,
    permissions: [],
    examples: ['Pdare', 'Pdare @user'],
    aliases: ['d', 'challenge'],
    enabled: true,
    usageCount: 892,
    successRate: 97.2,
    averageResponseTime: 0.4
  },
  {
    id: 'ban',
    name: 'ban',
    description: 'Ban a user from the server',
    category: 'Moderation',
    usage: 'Pban @user [reason]',
    cooldown: 0,
    permissions: ['BAN_MEMBERS'],
    examples: ['Pban @user', 'Pban @user spamming'],
    aliases: ['banish'],
    enabled: true,
    usageCount: 45,
    successRate: 100,
    averageResponseTime: 0.8
  },
  {
    id: 'kick',
    name: 'kick',
    description: 'Kick a user from the server',
    category: 'Moderation', 
    usage: 'Pkick @user [reason]',
    cooldown: 0,
    permissions: ['KICK_MEMBERS'],
    examples: ['Pkick @user', 'Pkick @user inappropriate behavior'],
    aliases: ['remove'],
    enabled: true,
    usageCount: 23,
    successRate: 100,
    averageResponseTime: 0.6
  },
  {
    id: 'play',
    name: 'play',
    description: 'Play music from YouTube',
    category: 'Music',
    usage: 'Pplay [song name/URL]',
    cooldown: 3,
    permissions: [],
    examples: ['Pplay despacito', 'Pplay https://youtube.com/watch?v=123'],
    aliases: ['p', 'music'],
    enabled: true,
    usageCount: 567,
    successRate: 94.3,
    averageResponseTime: 2.1
  }
];

// @route   GET /api/commands
// @desc    Get all available commands
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { category, search, serverId } = req.query;
    
    let commands = [...mockCommands];
    
    // Filter by category
    if (category && category !== 'all') {
      commands = commands.filter(cmd => 
        cmd.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      commands = commands.filter(cmd => 
        cmd.name.toLowerCase().includes(searchTerm) ||
        cmd.description.toLowerCase().includes(searchTerm) ||
        cmd.aliases.some(alias => alias.toLowerCase().includes(searchTerm))
      );
    }

    // Get categories
    const categories = [...new Set(mockCommands.map(cmd => cmd.category))];
    
    logger.info(`📋 Commands requested - Category: ${category || 'all'}, Search: ${search || 'none'}`);
    
    res.json({
      success: true,
      commands,
      total: commands.length,
      categories,
      filters: {
        category: category || 'all',
        search: search || ''
      }
    });
    
  } catch (error) {
    logger.error('Get commands error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch commands'
    });
  }
});

// @route   GET /api/commands/:commandId
// @desc    Get specific command details
// @access  Private
router.get('/:commandId', async (req, res) => {
  try {
    const { commandId } = req.params;
    
    const command = mockCommands.find(cmd => cmd.id === commandId);
    
    if (!command) {
      return res.status(404).json({
        success: false,
        error: 'Command not found'
      });
    }

    // Enhanced command details
    const commandDetails = {
      ...command,
      recentUsage: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 50) + 1,
        errors: Math.floor(Math.random() * 3),
        avgResponseTime: (Math.random() * 2 + 0.1).toFixed(2)
      })).reverse(),
      topUsers: [
        { username: 'laylay98', usageCount: Math.floor(Math.random() * 100) + 20 },
        { username: 'user123', usageCount: Math.floor(Math.random() * 80) + 10 },
        { username: 'gamer456', usageCount: Math.floor(Math.random() * 60) + 5 }
      ],
      serverStats: {
        totalServers: Math.floor(Math.random() * 100) + 50,
        enabledServers: Math.floor(Math.random() * 80) + 40,
        totalUsage: command.usageCount
      }
    };

    logger.info(`🔍 Command details requested: ${command.name}`);
    
    res.json({
      success: true,
      command: commandDetails
    });
    
  } catch (error) {
    logger.error('Get command details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch command details'
    });
  }
});

// @route   POST /api/commands/execute
// @desc    Execute a command (simulate)
// @access  Private
router.post('/execute', async (req, res) => {
  try {
    const { commandName, args, serverId, userId } = req.body;
    
    const command = mockCommands.find(cmd => 
      cmd.name === commandName || cmd.aliases.includes(commandName)
    );
    
    if (!command) {
      return res.status(404).json({
        success: false,
        error: 'Command not found'
      });
    }

    if (!command.enabled) {
      return res.status(400).json({
        success: false,
        error: 'Command is disabled'
      });
    }

    // Simulate command execution
    const execution = {
      commandId: command.id,
      commandName: command.name,
      args,
      serverId,
      userId,
      timestamp: new Date().toISOString(),
      responseTime: (Math.random() * 2 + 0.1).toFixed(2),
      success: Math.random() > 0.05, // 95% success rate
      result: `Command ${command.name} executed successfully with args: ${args?.join(' ') || 'none'}`
    };

    logger.info(`⚡ Command executed: ${command.name} by ${userId} in ${serverId}`);
    
    res.json({
      success: true,
      execution,
      message: `Command ${command.name} executed successfully`
    });
    
  } catch (error) {
    logger.error('Execute command error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to execute command'
    });
  }
});

// @route   GET /api/commands/stats/usage
// @desc    Get command usage statistics
// @access  Private
router.get('/stats/usage', async (req, res) => {
  try {
    const { timeframe = '7d', serverId } = req.query;
    
    const timeframes = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90
    };

    const days = timeframes[timeframe] || 7;
    
    // Generate usage stats
    const usageStats = mockCommands.map(command => ({
      commandId: command.id,
      commandName: command.name,
      category: command.category,
      totalUsage: Math.floor(Math.random() * 1000) + 50,
      dailyUsage: Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 50) + 1
      })).reverse(),
      successRate: (Math.random() * 5 + 95).toFixed(1),
      avgResponseTime: (Math.random() * 2 + 0.1).toFixed(2)
    }));

    const summary = {
      totalCommands: usageStats.reduce((sum, cmd) => sum + cmd.totalUsage, 0),
      mostUsedCommand: usageStats.reduce((max, cmd) => 
        cmd.totalUsage > max.totalUsage ? cmd : max
      ),
      avgSuccessRate: (usageStats.reduce((sum, cmd) => 
        sum + parseFloat(cmd.successRate), 0
      ) / usageStats.length).toFixed(1),
      timeframe
    };

    logger.info(`📊 Command usage stats requested (${timeframe})`);
    
    res.json({
      success: true,
      stats: usageStats,
      summary,
      timeframe
    });
    
  } catch (error) {
    logger.error('Get command stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch command statistics'
    });
  }
});

export default router;
