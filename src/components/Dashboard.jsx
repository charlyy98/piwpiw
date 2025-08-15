import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import MetricCard from './ui/metric-card';
import EnhancedCard from './ui/enhanced-card';
import StatusIndicator from './ui/status-indicator';
import AnimatedCounter from './ui/animated-counter';
import LoadingSkeleton from './ui/loading-skeleton';
import { 
  useStats, 
  usePerformanceMetrics, 
  useUserGrowth, 
  useCommandUsage, 
  useServers, 
  useNotifications,
  useSystemStatus,
  useApiMutation 
} from '../hooks/useApi';
import { mockApi } from '../api/mockApi';
import {
  Server, 
  Users, 
  Terminal, 
  Clock, 
  TrendingUp, 
  Activity, 
  Shield, 
  Zap,
  Globe,
  MessageSquare,
  Bot,
  Crown,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  Gift,
  Hash,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Eye,
  Cpu,
  Database,
  Wifi,
  HardDrive,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer, Area, AreaChart } from 'recharts';
import chibiCharacter from '../assets/chibi_character.png';
import ProfileWidget from './ProfileWidget';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Dashboard = () => {
  const { t, user, theme } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [showNotifications, setShowNotifications] = useState(false);

  // API hooks for real-time data
  const { data: stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useStats();
  const { data: performanceMetrics, loading: performanceLoading, refetch: refetchPerformance } = usePerformanceMetrics();
  const { data: userGrowthData, loading: userGrowthLoading, refetch: refetchUserGrowth } = useUserGrowth(selectedPeriod);
  const { data: commandUsageData, loading: commandUsageLoading, refetch: refetchCommandUsage } = useCommandUsage();
  const { data: serversData, loading: serversLoading, refetch: refetchServers } = useServers();
  const { data: notifications, loading: notificationsLoading, refetch: refetchNotifications } = useNotifications();
  const { data: systemStatus, loading: systemStatusLoading } = useSystemStatus();
  
  // Debug logging for Dashboard
  console.log('📊 Dashboard Debug:', {
    stats: !!stats,
    serversData: !!serversData,
    statsValue: stats,
    serversCount: serversData?.length || 0
  });
  
  // Mutation hook for API calls
  const { mutate, loading: mutationLoading } = useApiMutation();

  // Update time every second for real-time feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Refetch user growth data when period changes
  useEffect(() => {
    refetchUserGrowth(selectedPeriod);
  }, [selectedPeriod, refetchUserGrowth]);

  // Handle notification actions
  const handleMarkAllAsRead = async () => {
    const result = await mutate(mockApi.markAllNotificationsRead);
    if (result.success) {
      refetchNotifications();
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    const result = await mutate(mockApi.markNotificationRead, notificationId);
    if (result.success) {
      refetchNotifications();
    }
  };

  // Manual refresh function
  const handleRefreshAll = () => {
    console.log('🔄 Manual refresh triggered for all dashboard data');
    refetchStats();
    refetchPerformance();
    refetchUserGrowth();
    refetchCommandUsage();
    refetchServers();
    refetchNotifications();
  };

  // Get unread notifications count
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <div className="p-4 space-y-6 transition-colors duration-300 relative">
      {/* Fixed Notification Button - Always visible in top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 sm:p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 backdrop-blur-sm rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300 hover:scale-110 group shadow-2xl border-2 border-white/20 flex items-center justify-center"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-bounce" />
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span className="text-xs font-bold text-white">{unreadCount}</span>
            </div>
            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping"></div>
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          </button>
          
          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
              System Notifications
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4 w-full pr-16">
          {/* Main Content - Now has more space */}
          <div className="flex-1 min-w-0 space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Crown className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold">Enterprise Dashboard</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
              Welcome back, <span className="text-yellow-300">{user?.username || 'Piwpiw'}</span>
            </h1>
            
            <p className="text-sm md:text-base lg:text-lg text-blue-100 max-w-2xl">
              Your PiwPiw Bot empire is thriving across {stats?.totalServers?.toLocaleString() || '1,247'} servers with unprecedented performance
            </p>
            
            <div className="flex items-center space-x-2 md:space-x-3 mt-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-2 md:px-3 py-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm font-semibold">
                  {systemStatus?.status === 'online' ? 'All Systems Operational' : 'System Status: ' + systemStatus?.status}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-2 md:px-3 py-1.5">
                <Clock className="w-3 md:w-4 h-3 md:h-4" />
                <span className="text-xs md:text-sm font-semibold">{currentTime.toLocaleTimeString()}</span>
              </div>
              <button
                onClick={handleRefreshAll}
                className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 md:px-3 py-1.5 hover:bg-white/30 transition-colors"
                disabled={mutationLoading}
              >
                <RefreshCw className={`w-3 md:w-4 h-3 md:h-4 ${mutationLoading ? 'animate-spin' : ''}`} />
                <span className="text-xs md:text-sm font-semibold">Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Character Section - Professional Design */}
          <div className="flex items-center space-x-3 md:space-x-4 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Enhanced Professional Character Display */}
                <div className="relative group cursor-pointer transform transition-transform duration-300 hover:scale-110">
                  {/* Outer orbital glow effect with multiple layers */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-all duration-1000 animate-pulse"></div>
                  
                  <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700"></div>
                  
                  {/* Rotating ring animation with enhanced gradient */}
                  <div className="absolute -inset-4 rounded-full opacity-30 group-hover:opacity-60 transition-all duration-500"
                       style={{
                         background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                         animation: 'spin-slow 12s linear infinite',
                         filter: 'blur(1px)'
                       }}></div>
                  
                  {/* Middle glow layer with improved gradients */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                  
                  {/* Inner shimmer effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                  
                  {/* Character container with professional glass morphism */}
                  <div className="relative glass-morphism rounded-full p-3 shadow-3xl shadow-glow group-hover:shadow-glow-purple group-hover:scale-105 transition-all duration-700 ease-out">
                    {/* Inner gradient border with pulse */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-cyan-400/40 blur-sm animate-pulse"></div>
                    
                    {/* Character with enhanced effects and rounded ears styling */}
                    <div className="relative">
                      <img 
                        src={chibiCharacter} 
                        alt="PiwPiw AI Assistant" 
                        className="relative h-16 md:h-20 lg:h-24 w-auto drop-shadow-2xl filter brightness-110 contrast-105 saturate-110 group-hover:brightness-125 group-hover:contrast-110 group-hover:saturate-125 transition-all duration-700 ease-out rounded-ears-effect kawaii-bounce-animation"
                        style={{
                          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3)) brightness(110%) contrast(105%) saturate(110%)',
                          clipPath: 'ellipse(90% 95% at 50% 50%)'
                        }}
                      />
                      
                      {/* Kawaii ear softening effects */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200/20 via-transparent to-purple-200/20 pointer-events-none kawaii-softener"
                           style={{
                             clipPath: 'ellipse(85% 90% at 50% 50%)',
                             filter: 'blur(1px)',
                             borderRadius: '50% 50% 45% 45% / 60% 60% 35% 35%'
                           }}></div>
                      
                      {/* Additional ear rounding overlay */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
                           style={{
                             borderRadius: '50% 50% 20% 20% / 80% 80% 20% 20%',
                             filter: 'blur(0.5px)'
                           }}></div>
                    </div>
                    
                    {/* Enhanced status indicator with multiple layers */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5">
                      {/* Outer pulse ring */}
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-40"></div>
                      
                      {/* Main status indicator */}
                      <div className="relative w-5 h-5 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full border-2 border-white shadow-xl">
                        {/* Inner shine */}
                        <div className="absolute inset-1 bg-gradient-to-br from-green-300 to-green-400 rounded-full animate-pulse"></div>
                        
                        {/* Center dot */}
                        <div className="absolute inset-2 bg-white rounded-full opacity-80"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-float-1"></div>
                  <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 animate-float-2"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-float-3"></div>
                  
                  {/* Professional Tooltip */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl text-white text-xs px-4 py-2 rounded-xl shadow-2xl border border-white/20 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="font-medium">PiwPiw AI Assistant</span>
                      </div>
                      <div className="text-slate-300 text-xs mt-1">Status: Online & Ready</div>
                      
                      {/* Tooltip arrow */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96" align="end">
                <ProfileWidget onNavigateToProfile={() => console.log('Navigate to profile')} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Grid with MetricCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsLoading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/90'}`}>
              <LoadingSkeleton variant="avatar" theme={theme} className="mb-4" />
              <LoadingSkeleton variant="title" theme={theme} className="mb-2" />
              <LoadingSkeleton variant="text" theme={theme} className="mb-1" />
              <LoadingSkeleton variant="text" theme={theme} />
            </div>
          ))
        ) : (
          <>
            <MetricCard
              title="Total Servers"
              value={stats?.totalServers?.toLocaleString() || '0'}
              change="+12.5%"
              trend="up"
              icon={Server}
              color="blue"
              description="Servers using PiwPiw"
              status="online"
              theme={theme}
              animated={true}
            />
            <MetricCard
              title="Active Users"
              value={stats?.activeUsers ? `${(stats.activeUsers / 1000).toFixed(1)}K` : '0'}
              change="+8.7%"
              trend="up"
              icon={Users}
              color="emerald"
              description="Monthly active users"
              status="online"
              theme={theme}
              animated={true}
            />
            <MetricCard
              title="Commands Executed"
              value={stats?.commandsExecuted ? `${(stats.commandsExecuted / 1000000).toFixed(1)}M` : '0'}
              change="+15.3%"
              trend="up"
              icon={Terminal}
              color="purple"
              description="Total this month"
              status="online"
              theme={theme}
              animated={true}
            />
            <MetricCard
              title="System Uptime"
              value={stats?.systemUptime ? `${stats.systemUptime}%` : '0%'}
              change="+0.1%"
              trend="up"
              icon={Shield}
              color="amber"
              description="30-day average"
              status="success"
              theme={theme}
              animated={true}
            />
          </>
        )}
      </div>

      {/* Enhanced Performance Metrics Section */}
      <EnhancedCard theme={theme} hover={true} glow={true} className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className={`text-xl font-black flex items-center space-x-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <Activity className="w-6 h-6 text-blue-600" />
              <span>System Performance</span>
            </h2>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Real-time performance indicators</p>
          </div>
          <Button variant="outline" size="sm" className={`flex items-center space-x-2 ${
            theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
          }`}>
            <Settings className="w-4 h-4" />
            <span>Configure</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {performanceLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <LoadingSkeleton variant="text" theme={theme} />
                <LoadingSkeleton variant="default" theme={theme} className="h-3" />
                <LoadingSkeleton variant="text" theme={theme} />
              </div>
            ))
          ) : (
            performanceMetrics?.map((metric, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <StatusIndicator 
                      status={metric.value > 95 ? 'success' : metric.value > 80 ? 'warning' : 'error'} 
                      size="sm" 
                    />
                    <span className={`text-lg font-black ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      <AnimatedCounter end={metric.value} suffix="%" duration={2000} />
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className={`w-full rounded-full h-3 overflow-hidden ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                  }`}>
                    <div 
                      className={`h-full ${metric.color} rounded-full transition-all duration-2000 ease-out relative overflow-hidden`}
                      style={{ width: `${metric.value}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>{metric.description}</p>
              </div>
            ))
          )}
        </div>
      </EnhancedCard>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Enhanced Line Chart */}
        <EnhancedCard theme={theme} hover={true} glow={true} className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="space-y-1">
              <h3 className={`text-lg font-black flex items-center space-x-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>User Growth Analytics</span>
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>Daily active user trends</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className={selectedPeriod === '7d' ? (theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200') : ''} onClick={() => setSelectedPeriod('7d')}>7D</Button>
              <Button variant="outline" size="sm" className={selectedPeriod === '30d' ? (theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200') : ''} onClick={() => setSelectedPeriod('30d')}>30D</Button>
              <Button variant="outline" size="sm" className={selectedPeriod === '90d' ? (theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200') : ''} onClick={() => setSelectedPeriod('90d')}>90D</Button>
            </div>
          </div>
          <div className="h-64">
            {userGrowthLoading || !userGrowthData ? (
              <LoadingSkeleton variant="chart" theme={theme} />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke={theme === 'dark' ? '#94A3B8' : '#6B7280'} />
                  <YAxis stroke={theme === 'dark' ? '#94A3B8' : '#6B7280'} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1E293B' : '#FFF',
                      borderColor: theme === 'dark' ? '#475569' : '#E5E7EB',
                      borderRadius: '0.75rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                    }}
                    labelStyle={{ color: theme === 'dark' ? '#E2E8F0' : '#1F2937' }}
                    itemStyle={{ color: theme === 'dark' ? '#94A3B8' : '#6B7280' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#8884d8" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </EnhancedCard>

        {/* Enhanced Bar Chart */}
        <EnhancedCard theme={theme} hover={true} glow={true} className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="space-y-1">
              <h3 className={`text-lg font-black flex items-center space-x-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span>Command Usage</span>
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>Most popular bot commands</p>
            </div>
          </div>
          <div className="h-64">
            {commandUsageLoading || !commandUsageData ? (
              <LoadingSkeleton variant="chart" theme={theme} />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={commandUsageData} margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                  <XAxis 
                    dataKey="command" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: theme === 'dark' ? '#94a3b8' : '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: theme === 'dark' ? '#94a3b8' : '#64748b' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </EnhancedCard>
      </div>

      {/* Enhanced Server Network Section */}
      <EnhancedCard theme={theme} hover={true} glow={true} className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className={`text-xl font-black flex items-center space-x-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <Globe className="w-6 h-6 text-indigo-600" />
              <span>Server Network</span>
            </h2>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Manage your Discord server ecosystem</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Bot className="w-4 h-4 mr-2" />
              Add Server
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {serversLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={`p-5 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-700/50 border-slate-600/50' : 'bg-white/70 border-slate-200/80'
              }`}>
                <div className="flex items-start space-x-4 mb-4">
                  <LoadingSkeleton variant="avatar" theme={theme} />
                  <div className="flex-1 space-y-2">
                    <LoadingSkeleton variant="title" theme={theme} />
                    <LoadingSkeleton variant="text" theme={theme} />
                  </div>
                </div>
                <LoadingSkeleton variant="button" theme={theme} className="mb-4" />
                <div className="flex justify-between">
                  <LoadingSkeleton variant="button" theme={theme} />
                  <LoadingSkeleton variant="button" theme={theme} />
                </div>
              </div>
            ))
          ) : (
            serversData?.slice(0, 6).map((server, index) => (
              <div 
                key={server.id}
                className={`group relative overflow-hidden rounded-xl p-5 border hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white/90 shadow-slate-100/50 hover:shadow-slate-200/60'
                }`}
              >
                {/* Server info */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {server.name.charAt(0)}
                    </div>
                    {server.botAdded && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-base truncate ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {server.name}
                    </h4>
                    <div className={`flex items-center space-x-4 text-sm mt-2 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{server.memberCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Hash className="w-4 h-4" />
                        <span>{server.channelCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status badge */}
                <div className="flex items-center justify-between mt-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-bold ${
                    server.botAdded 
                      ? (theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-700')
                      : (theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-700')
                  }`}>
                    {server.botAdded ? (
                      <>
                        <StatusIndicator status="success" size="sm" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <StatusIndicator status="warning" size="sm" />
                        <span>Pending</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-opacity-20 border-gray-300">
                  <Button variant="ghost" size="sm" className={`text-sm ${
                    theme === 'dark' ? 'hover:bg-slate-600' : 'hover:bg-slate-100'
                  }`}>
                    <Settings className="w-4 h-4 mr-1" />
                    Configure
                  </Button>
                  <Button variant="ghost" size="sm" className={`text-sm ${
                    theme === 'dark' ? 'hover:bg-slate-600' : 'hover:bg-slate-100'
                  }`}>
                    <Activity className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </EnhancedCard>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-40 flex items-start justify-end p-4 pointer-events-none">
          <div className="w-full max-w-sm mt-16 mr-0 pointer-events-auto">
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-800/95 border-slate-700/50'
                : 'bg-white/95 border-amber-200/80'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-opacity-20">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-amber-900'}`}>
                    Notifications
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {notifications.length}
                  </Badge>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className={`p-1 rounded-lg hover:bg-opacity-20 transition-colors ${
                    theme === 'dark' ? 'hover:bg-slate-600' : 'hover:bg-amber-200'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-opacity-10 hover:bg-opacity-50 transition-colors cursor-pointer ${
                        theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-amber-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'success' 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : notification.type === 'warning'
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-semibold truncate ${
                              theme === 'dark' ? 'text-white' : 'text-amber-900'
                            }`}>
                              {notification.title}
                            </h4>
                            <span className={`text-xs ${
                              theme === 'dark' ? 'text-slate-400' : 'text-amber-600'
                            }`}>
                              {notification.timestamp}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${
                            theme === 'dark' ? 'text-slate-300' : 'text-amber-700'
                          }`}>
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between p-3 bg-opacity-50">
                <button className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                  theme === 'dark' 
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                }`}>
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <CheckCircle className="w-3 md:w-4 h-3 md:h-4" />
                    <span>Mark all as read</span>
                  </div>
                </button>
                <button className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs md:text-sm font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Eye className="w-3 md:w-4 h-3 md:h-4" />
                    <span>View All</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
