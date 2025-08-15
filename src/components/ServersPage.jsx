import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Server, 
  Users, 
  Hash, 
  Shield, 
  Plus, 
  Settings, 
  Search,
  Activity,
  Crown,
  Globe,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useServers } from '../hooks/useApi';
import mockData from '../data/mockData.json';

const ServersPage = () => {
  const { t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  // 🚀 NOW USING REAL SERVER DATA!
  const { data: realServers, loading, error, refetch } = useServers();
  
  // All hooks must be called before any conditional returns
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);
  
  // Debug logging
  console.log('🔍 ServersPage Debug:', {
    realServers,
    loading,
    error,
    hasRealData: !!realServers,
    serverCount: realServers?.length || 0
  });
  
  // FORCE REAL DATA - NO FALLBACK TO MOCK!
  const servers = realServers && realServers.length > 0 ? realServers : [];
  
  console.log('📊 Final servers being used:', servers.map(s => ({ name: s.name, id: s.id })));

  // Use ONLY real Discord data - NO fake/estimated data
  const enhancedServers = servers.map(server => ({
    ...server,
    // Use real Discord server icon
    serverIcon: server.icon || null,
    // Use real stats from Discord API
    uptime: server.stats?.uptime || "N/A",
    commandsToday: server.stats?.commandsToday || 0,
    activeUsers: server.stats?.activeUsers || 0,
    messagesHour: server.stats?.messagesHour || 0,
    // Real Discord server data
    premium: server.boostLevel > 0,
    region: server.region || "Unknown",
    lastActivity: server.joinedAt,
    // No fake data - use real or show N/A
    responseTime: "N/A", // Not available from Discord API
    channelCount: "N/A", // Would need separate API call
    roleCount: "N/A" // Would need separate API call
  }));

  const handleAddBot = (serverId) => {
    console.log('Adding bot to server:', serverId);
    // Open Discord invite link in new tab
    window.open('https://discord.com/oauth2/authorize?client_id=1397634031268663448', '_blank', 'noopener,noreferrer');
  };

  const handleManageBot = (serverId) => {
    console.log('Managing bot in server:', serverId);
  };

  // Professional button handlers
  const handleConfigure = (server) => {
    console.log('🔧 Opening configuration for server:', server.name);
    // Open configuration modal or navigate to settings
    window.dispatchEvent(new CustomEvent('showServerConfig', { 
      detail: { 
        serverId: server.id, 
        serverName: server.name,
        memberCount: server.memberCount 
      } 
    }));
  };

  const handleAnalytics = (server) => {
    console.log('📊 Opening analytics for server:', server.name);
    // Navigate to analytics page with server filter
    window.location.hash = 'analytics';
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('filterAnalytics', { 
        detail: { 
          serverId: server.id, 
          serverName: server.name 
        } 
      }));
    }, 100);
  };

  // Filter servers
  const filteredServers = enhancedServers.filter(server => 
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (server) => {
    if (!server.botAdded) return 'text-gray-500';
    return 'text-green-500';
  };

  const getStatusIcon = (server) => {
    if (!server.botAdded) return <WifiOff className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const totalStats = {
    totalServers: enhancedServers.length,
    activeServers: enhancedServers.filter(s => s.botAdded).length,
    totalMembers: enhancedServers.reduce((sum, s) => sum + s.memberCount, 0),
    totalChannels: "N/A", // Not available from Discord API
    totalCommands: enhancedServers.reduce((sum, s) => sum + (s.commandsToday || 0), 0),
    averageUptime: "N/A", // Not reliable from Discord API
    premiumServers: enhancedServers.filter(s => s.premium).length
  };

  // Show loading state
  if (!realServers && loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading real Discord server data...</p>
          <p className="text-sm text-muted-foreground mt-2">Fetching from your Discord bot...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (!realServers && error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">❌ CORS Error or Backend Not Available</p>
          <p className="text-sm text-muted-foreground mb-4">
            Cannot fetch real Discord servers. Check console for details.
          </p>
          <Button onClick={refetch} className="mt-4 mr-2">🔄 Retry</Button>
          <Button 
            variant="outline" 
            onClick={() => window.open('http://localhost:3001/api/servers', '_blank')}
            className="mt-4"
          >
            🔗 Test API Direct
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold piwpiw-text-gradient flex items-center gap-2">
            <Server className="h-8 w-8" />
            {t('servers.title')}
          </h2>
          <p className="text-muted-foreground mt-1">
            🚀 Manage PiwPiw bot across your Discord servers with advanced monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="piwpiw-button-outline"
            onClick={() => {
              console.log('🔄 Manual refresh triggered');
              refetch();
            }}
            disabled={loading}
          >
            <Activity className="mr-2 h-4 w-4" />
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button 
            variant="outline" 
            className="piwpiw-button-outline"
            onClick={() => {
              console.log('📊 Navigate to Analytics page');
              window.location.hash = 'analytics';
            }}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button 
            className="piwpiw-button"
            onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1397634031268663448', '_blank', 'noopener,noreferrer')}
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('servers.addBot')}
          </Button>
        </div>
      </div>

      {/* Enhanced Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="piwpiw-card-hover bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Servers</p>
                <p className="text-3xl font-bold text-blue-600">{totalStats.totalServers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalStats.activeServers} active
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Server className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="piwpiw-card-hover bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold text-green-600">{totalStats.totalMembers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all servers
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="piwpiw-card-hover bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commands Today</p>
                <p className="text-3xl font-bold text-purple-600">{totalStats.totalCommands.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Real bot commands
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="piwpiw-card-hover bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Premium Servers</p>
                <p className="text-3xl font-bold text-orange-600">{totalStats.premiumServers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Boosted servers only
                </p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Activity className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Search */}
      <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Servers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServers.map((server, index) => (
          <Card key={server.id} className={`piwpiw-card-hover bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-950/20 dark:to-gray-900/20 animate-fade-in-up`} style={{ animationDelay: `${600 + index * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {server.serverIcon ? (
                      <img 
                        src={server.serverIcon} 
                        alt={`${server.name} icon`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg ${server.serverIcon ? 'hidden' : 'flex'}`}
                      style={{display: server.serverIcon ? 'none' : 'flex'}}
                    >
                      <span className="text-lg font-bold text-primary">
                        {server.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {server.premium && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {server.name}
                      {server.premium && <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">Premium</Badge>}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Globe className="h-3 w-3" />
                      {server.region} • ID: {server.id}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={server.botAdded ? "default" : "secondary"} className="flex items-center gap-1">
                    <div className={getStatusColor(server)}>
                      {getStatusIcon(server)}
                    </div>
                    {server.botAdded ? "Active" : "Inactive"}
                  </Badge>
                  {server.botAdded && (
                    <span className="text-xs text-muted-foreground">
                      {server.uptime} uptime
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enhanced Server Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{server.memberCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{t('servers.members')}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{server.commandsToday}</p>
                  <p className="text-xs text-muted-foreground">Commands</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{server.boostLevel}</p>
                  <p className="text-xs text-muted-foreground">Boost Level</p>
                </div>
              </div>

              {/* Real Discord Stats */}
              {server.botAdded && (
                <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Bot Status</span>
                    <span className="font-medium">{server.uptime}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{server.activeUsers} active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-muted-foreground" />
                      <span>{server.commandsToday} cmds</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Permissions */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Permissions:</p>
                <div className="flex flex-wrap gap-1">
                  {server.permissions.slice(0, 3).map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                  {server.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{server.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Professional Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20"
                  onClick={() => handleConfigure(server)}
                >
                  <Settings className="h-4 w-4" />
                  Configure
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-950/20"
                  onClick={() => handleAnalytics(server)}
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Button>
              </div>

              {/* Add Bot Button (if not added) */}
              {!server.botAdded && (
                <Button 
                  className="w-full piwpiw-button mt-2"
                  onClick={() => handleAddBot(server.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Bot to Server
                </Button>
              )}

              {/* Last Activity */}
              {server.botAdded && (
                <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                  Last activity: {new Date(server.lastActivity).toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredServers.length === 0 && (
        <Card className="piwpiw-card-hover">
          <CardContent className="p-12 text-center">
            <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No servers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria
            </p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Server Statistics Summary */}
      <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {t('servers.serverStats')}
          </CardTitle>
          <CardDescription>
            📊 Comprehensive overview of all your servers with detailed metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20">
              <p className="text-2xl font-bold text-blue-600">{totalStats.totalServers}</p>
              <p className="text-sm text-muted-foreground">Total Servers</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-green-50/50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20">
              <p className="text-2xl font-bold text-green-600">{totalStats.activeServers}</p>
              <p className="text-sm text-muted-foreground">Active Servers</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20">
              <p className="text-2xl font-bold text-purple-600">{totalStats.totalMembers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-orange-50/50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/20">
              <p className="text-2xl font-bold text-orange-600">{totalStats.totalChannels}</p>
              <p className="text-sm text-muted-foreground">Total Channels</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServersPage;

