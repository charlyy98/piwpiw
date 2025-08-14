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
import mockData from '../data/mockData.json';

const ServersPage = () => {
  const { t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  // Enhanced server data with additional metrics
  const enhancedServers = mockData.servers.map(server => ({
    ...server,
    uptime: Math.floor(Math.random() * 5) + 95, // 95-100% uptime
    responseTime: Math.floor(Math.random() * 50) + 20, // 20-70ms response time
    commandsToday: Math.floor(Math.random() * 500) + 50,
    lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Last 24 hours
    premium: Math.random() > 0.7, // 30% chance of premium
    region: ['US East', 'EU West', 'Asia Pacific', 'US West'][Math.floor(Math.random() * 4)]
  }));

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  const handleAddBot = (serverId) => {
    console.log('Adding bot to server:', serverId);
    // Open Discord invite link in new tab
    window.open('https://discord.com/oauth2/authorize?client_id=1397634031268663448', '_blank', 'noopener,noreferrer');
  };

  const handleManageBot = (serverId) => {
    console.log('Managing bot in server:', serverId);
  };

  // Filter servers
  const filteredServers = enhancedServers.filter(server => 
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (server) => {
    if (!server.botAdded) return 'text-gray-500';
    if (server.uptime >= 99) return 'text-green-500';
    if (server.uptime >= 95) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = (server) => {
    if (!server.botAdded) return <WifiOff className="h-4 w-4" />;
    if (server.uptime >= 99) return <CheckCircle className="h-4 w-4" />;
    if (server.uptime >= 95) return <AlertCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const totalStats = {
    totalServers: enhancedServers.length,
    activeServers: enhancedServers.filter(s => s.botAdded).length,
    totalMembers: enhancedServers.reduce((sum, s) => sum + s.memberCount, 0),
    totalChannels: enhancedServers.reduce((sum, s) => sum + s.channelCount, 0),
    totalCommands: enhancedServers.reduce((sum, s) => sum + s.commandsToday, 0),
    averageUptime: enhancedServers.reduce((sum, s) => sum + s.uptime, 0) / enhancedServers.length,
    premiumServers: enhancedServers.filter(s => s.premium).length
  };

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
          <Button variant="outline" className="piwpiw-button-outline">
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
                  +12% from yesterday
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
                <p className="text-sm font-medium text-muted-foreground">Average Uptime</p>
                <p className="text-3xl font-bold text-orange-600">{totalStats.averageUptime.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalStats.premiumServers} premium servers
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
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Server className="h-6 w-6 text-primary" />
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
                      {server.uptime.toFixed(1)}% uptime
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
                    <Hash className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{server.channelCount}</p>
                  <p className="text-xs text-muted-foreground">{t('servers.channels')}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{server.roleCount}</p>
                  <p className="text-xs text-muted-foreground">{t('servers.roles')}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              {server.botAdded && (
                <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-medium">{server.uptime.toFixed(1)}%</span>
                  </div>
                  <Progress value={server.uptime} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{server.responseTime}ms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-muted-foreground" />
                      <span>{server.commandsToday} today</span>
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

              {/* Enhanced Actions */}
              <div className="flex gap-2">
                {server.botAdded ? (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleManageBot(server.id)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {t('servers.manageBot')}
                  </Button>
                ) : (
                  <Button 
                    className="flex-1 piwpiw-button"
                    onClick={() => handleAddBot(server.id)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {t('servers.addBot')}
                  </Button>
                )}
              </div>

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

