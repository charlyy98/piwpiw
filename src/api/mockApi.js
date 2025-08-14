// Mock API service to simulate backend integration
import mockData from '../data/mockData.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const mockApi = {
  // Get dashboard statistics
  async getStats() {
    await delay(500);
    return {
      success: true,
      data: {
        totalServers: 1247,
        activeUsers: 89400,
        commandsExecuted: 2100000,
        systemUptime: 99.98,
        timestamp: new Date().toISOString()
      }
    };
  },

  // Avatar upload simulation
  async uploadAvatar(userId, file) {
    try {
      await delay(800);
      
      // Validate file
      if (!file || !file.type.startsWith('image/')) {
        return {
          success: false,
          error: 'Invalid file type. Please upload an image.'
        };
      }
      
      if (file.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: 'File size too large. Maximum 5MB allowed.'
        };
      }
      
      // Simulate file processing
      const avatarUrl = URL.createObjectURL(file);
      return {
        success: true,
        data: {
          avatarUrl,
          updatedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Mock avatar upload error:', error);
      return {
        success: false,
        error: 'Upload failed. Please try again.'
      };
    }
  },

  // Get performance metrics
  async getPerformanceMetrics() {
    await delay(300);
    return {
      success: true,
      data: [
        {
          name: "CPU Usage",
          value: 45,
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
          description: "Server processing power"
        },
        {
          name: "Memory Usage", 
          value: 67,
          color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
          description: "RAM consumption"
        },
        {
          name: "Bot Uptime",
          value: 99.8,
          color: "bg-gradient-to-r from-amber-500 to-amber-600", 
          description: "System availability"
        },
        {
          name: "Response Time",
          value: 85,
          color: "bg-gradient-to-r from-purple-500 to-purple-600",
          description: "Average command latency"
        }
      ]
    };
  },

  // Get user growth data
  async getUserGrowth(period = '7d') {
    await delay(400);
    return {
      success: true,
      data: mockData.userGrowth[period] || mockData.userGrowth['7d']
    };
  },

  // Get command usage data
  async getCommandUsage() {
    await delay(350);
    return {
      success: true,
      data: mockData.commandUsage.slice(0, 8) // Top 8 commands
    };
  },

  // Get servers data
  async getServers() {
    await delay(500);
    return {
      success: true,
      data: mockData.servers
    };
  },

  // Get notifications
  async getNotifications() {
    await delay(250);
    return {
      success: true,
      data: [
        {
          id: '1',
          title: 'Server Added',
          message: 'New server "Gaming Hub" joined your network',
          type: 'success',
          icon: 'CheckCircle',
          timestamp: '2 min ago',
          read: false
        },
        {
          id: '2', 
          title: 'High CPU Usage',
          message: 'CPU usage exceeded 80% on Server-EU-01',
          type: 'warning',
          icon: 'AlertTriangle',
          timestamp: '5 min ago',
          read: false
        },
        {
          id: '3',
          title: 'Daily Report Ready',
          message: 'Your analytics report for today is available',
          type: 'info',
          icon: 'Info',
          timestamp: '1 hour ago',
          read: true
        },
        {
          id: '4',
          title: 'New Premium Member',
          message: 'User @john_doe upgraded to Premium plan',
          type: 'success',
          icon: 'Gift',
          timestamp: '3 hours ago',
          read: true
        }
      ]
    };
  },

  // Get system status
  async getSystemStatus() {
    await delay(200);
    return {
      success: true,
      data: {
        status: 'online',
        uptime: '99.98%',
        lastUpdate: new Date().toISOString()
      }
    };
  },

  // Mark notification as read
  async markNotificationRead(notificationId) {
    await delay(300);
    return {
      success: true,
      data: { notificationId, markedAt: new Date().toISOString() }
    };
  },

  // Mark all notifications as read
  async markAllNotificationsRead() {
    await delay(500);
    return {
      success: true,
      data: { markedAt: new Date().toISOString() }
    };
  }
};

// Error handling wrapper
export const apiCall = async (apiFunction, ...args) => {
  try {
    const result = await apiFunction(...args);
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
};

export default mockApi;
