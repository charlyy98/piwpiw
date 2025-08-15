// Mock API service to simulate backend integration
import mockData from '../data/mockData.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const mockApi = {
  // Get dashboard statistics - NOW WITH REAL DATA!
  async getStats() {
    console.log('🔄 getStats() called - attempting to fetch real data...');
    try {
      // Try to get real data from backend with cache-busting
      const cacheBuster = Date.now();
      const url = `http://localhost:3001/api/analytics/dashboard?t=${cacheBuster}`;
      console.log('📡 Fetching from:', url);
      
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      console.log('📊 Response status:', response.status, response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📋 Raw backend data:', data);
        
        if (data.success && data.analytics) {
          console.log('🎉 USING REAL DASHBOARD STATISTICS!', data.analytics.overview);
          const finalData = {
            success: true,
            data: {
              totalServers: data.analytics.overview.totalServers || 4,
              activeUsers: data.analytics.overview.totalUsers || 1649,
              commandsExecuted: data.analytics.overview.totalCommands || 0,
              systemUptime: 99.98,
              timestamp: new Date().toISOString()
            }
          };
          console.log('✅ Final processed data:', finalData);
          return finalData;
        } else {
          console.log('❌ Invalid data structure:', data);
        }
      } else {
        console.log('❌ HTTP Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.log('⚠️ Backend not available, using fallback stats', error);
    }
    
    // Fallback to mock data if backend is not available
    console.log('⚠️ USING FALLBACK MOCK DATA FOR STATS');
    await delay(500);
    return {
      success: true,
      data: {
        totalServers: 4, // Real fallback
        activeUsers: 1649, // Real fallback
        commandsExecuted: 237, // Real fallback
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

  // Get performance metrics - NOW WITH REAL DATA!
  async getPerformanceMetrics() {
    try {
      // Try to get real bot status from backend
      const response = await fetch('http://localhost:3001/api/bot/status');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.bot) {
          console.log('✅ Using REAL performance metrics!');
          return {
            success: true,
            data: [
              {
                name: "CPU Usage",
                value: data.bot.cpuUsage || 45,
                color: "bg-gradient-to-r from-blue-500 to-blue-600",
                description: "Server processing power"
              },
              {
                name: "Memory Usage", 
                value: data.bot.memoryUsage ? Math.round((data.bot.memoryUsage.heapUsed / data.bot.memoryUsage.heapTotal) * 100) : 67,
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
                value: data.bot.ping ? Math.min(100, data.bot.ping) : 85,
                color: "bg-gradient-to-r from-purple-500 to-purple-600",
                description: "Average command latency"
              }
            ]
          };
        }
      }
    } catch (error) {
      console.log('⚠️ Backend not available, using fallback performance metrics');
    }
    
    // Fallback data
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

  // Get user growth data - NOW WITH REAL DATA!
  async getUserGrowth(period = '7d') {
    try {
      // Try to get real analytics from backend
      const response = await fetch('http://localhost:3001/api/analytics/dashboard');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.analytics && data.analytics.chartData) {
          console.log('✅ Using REAL user growth data!');
          return {
            success: true,
            data: data.analytics.chartData.userActivity || []
          };
        }
      }
    } catch (error) {
      console.log('⚠️ Backend not available, using fallback user growth');
    }
    
    // Fallback data
    await delay(400);
    return {
      success: true,
      data: mockData.userGrowth[period] || mockData.userGrowth['7d']
    };
  },

  // Get command usage data - NOW WITH REAL DATA!
  async getCommandUsage() {
    try {
      // Try to get real commands from backend
      const response = await fetch('http://localhost:3001/api/commands');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.commands) {
          console.log('✅ Using REAL command usage data!');
          return {
            success: true,
            data: data.commands.slice(0, 8) // Top 8 commands
          };
        }
      }
    } catch (error) {
      console.log('⚠️ Backend not available, using fallback commands');
    }
    
    // Fallback data
    await delay(350);
    return {
      success: true,
      data: mockData.commandUsage.slice(0, 8) // Top 8 commands
    };
  },

  // Get servers data
  async getServers() {
    try {
      // Try to get real servers from backend with AGGRESSIVE cache-busting
      const cacheBuster = Date.now() + Math.random().toString(36);
      const response = await fetch(`http://localhost:3001/api/servers?t=${cacheBuster}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.servers) {
          console.log('🎉 USING REAL SERVER DATA!', data.servers.length + ' servers found');
          console.log('📋 Server names:', data.servers.map(s => s.name));
          return {
            success: true,
            data: data.servers
          };
        } else {
          console.log('❌ Backend returned invalid server data:', data);
        }
      }
    } catch (error) {
      console.log('⚠️ Backend not available, using fallback servers');
    }
    
    // Fallback to mock data if backend is not available
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
