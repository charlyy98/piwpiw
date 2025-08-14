# 🤖 PiwPiw Dashboard Backend

Professional backend API for the PiwPiw Discord Bot Dashboard - A complete, real-world backend solution.

## 🚀 Features

### 🔐 Authentication & Security
- **Discord OAuth Integration** - Real Discord login with user data
- **JWT Token Management** - Secure session handling
- **Rate Limiting** - API protection against abuse
- **Helmet Security** - Enhanced security headers
- **CORS Configuration** - Secure cross-origin requests

### 📊 Dashboard Analytics
- **Real-time Statistics** - Live bot and server metrics
- **User Analytics** - Engagement and activity tracking
- **Performance Monitoring** - Response times and uptime tracking
- **Command Analytics** - Usage patterns and success rates

### 🎮 Bot Management
- **Server Management** - Full CRUD operations for Discord servers
- **Command System** - Complete command management and execution
- **User Profiles** - Detailed user data and preferences
- **Real-time Updates** - WebSocket integration for live data

### 🛠️ Developer Features
- **Professional Logging** - Winston-based structured logging
- **Error Handling** - Comprehensive error management
- **API Documentation** - Well-documented endpoints
- **Environment Configuration** - Flexible deployment options

## 📁 Project Structure

```
piwpiw-backend-complete/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── routes/                # API route definitions
│   ├── auth.js            # Discord OAuth & JWT auth
│   ├── users.js           # User profile management
│   ├── servers.js         # Discord server management
│   ├── commands.js        # Bot command system
│   ├── analytics.js       # Dashboard analytics
│   └── bot.js             # Bot status & configuration
├── middleware/            # Express middleware
│   ├── errorHandler.js    # Global error handling
│   └── notFound.js        # 404 handler
├── utils/                 # Utility functions
│   └── logger.js          # Winston logging setup
└── logs/                  # Log files (auto-generated)
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Discord Application** (with OAuth configured)

### Quick Start

1. **Clone and Navigate**
   ```bash
   cd piwpiw-backend-complete
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit with your Discord credentials
   nano .env
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Production Deployment**
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/discord` - Exchange Discord OAuth code
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats/:userId` - Get user statistics

### Servers
- `GET /api/servers` - Get user's Discord servers
- `GET /api/servers/:serverId` - Get server details
- `POST /api/servers/:serverId/settings` - Update server settings
- `GET /api/servers/:serverId/stats` - Get server analytics

### Commands
- `GET /api/commands` - Get all available commands
- `GET /api/commands/:commandId` - Get command details
- `POST /api/commands/execute` - Execute a command
- `GET /api/commands/stats/usage` - Get usage statistics

### Analytics
- `GET /api/analytics/dashboard` - Dashboard overview
- `GET /api/analytics/performance` - Performance metrics
- `GET /api/analytics/users` - User analytics
- `GET /api/analytics/export` - Export analytics data

### Bot Management
- `GET /api/bot/status` - Get bot status
- `POST /api/bot/restart` - Restart bot
- `GET /api/bot/logs` - Get bot logs
- `GET /api/bot/config` - Get bot configuration
- `PUT /api/bot/config` - Update bot configuration
- `GET /api/bot/invite` - Get bot invite information

## 🔒 Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configured for frontend domains
- **Helmet Security** - Security headers for all responses
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Request validation and sanitization
- **Error Sanitization** - Safe error responses

## 📈 Monitoring & Logging

- **Winston Logging** - Structured logging with levels
- **Request Logging** - Morgan HTTP request logger
- **Error Tracking** - Comprehensive error logging
- **Performance Metrics** - Response time tracking
- **Health Checks** - `/health` endpoint for monitoring

## 🚀 Deployment

### Environment Variables
```env
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_CLIENT_ID=1397634031268663448
JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Production Checklist
- [ ] Set strong JWT secret
- [ ] Configure CORS for production domain
- [ ] Set up SSL/HTTPS
- [ ] Configure logging level
- [ ] Set up monitoring
- [ ] Configure Discord OAuth redirect URI

## 🔄 Real-time Features

- **WebSocket Support** - Socket.IO integration
- **Live Statistics** - Real-time dashboard updates
- **Server Events** - Live server activity monitoring
- **Command Execution** - Real-time command tracking

## 🎯 Bot Integration

This backend is designed to integrate with:
- **Discord.js Bot** - Full bot command integration
- **Database Systems** - MongoDB/PostgreSQL ready
- **Redis Caching** - Session and data caching
- **External APIs** - Music, games, and utility services

## 👨‍💻 Developer Info

**Created by**: Laylay98  
**Version**: 1.0.0  
**License**: MIT  
**Language**: JavaScript (ES6+)  
**Framework**: Express.js  
**Real-time**: Socket.IO  
**Security**: JWT + Helmet + Rate Limiting  

## 🤝 Support

- **Discord Server**: https://discord.gg/AX9JrDmU2c
- **Bot Invite**: https://discord.com/oauth2/authorize?client_id=1397634031268663448
- **GitHub Issues**: Create an issue for bug reports

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🌟 This is a complete, production-ready backend that makes your PiwPiw Dashboard fully functional with real Discord integration!**