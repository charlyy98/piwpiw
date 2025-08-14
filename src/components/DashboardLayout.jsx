import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from './ui/dropdown-menu';
import {
  LayoutDashboard,
  Server,
  Terminal,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  User,
  Info,
  Crown,
  Shield,
  Bell,
  Palette,
  ChevronDown,
  Activity,
  TrendingUp,
  Zap,
  Star,
  Award,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import piwpiwTextLogo from '../assets/piwpiw_text_logo.png';

const DashboardLayout = ({ children, currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  const { t, toggleTheme, toggleLanguage, theme, language, user, logout } = useApp();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  // Professional profile stats (mock data - would come from API)
  const profileStats = {
    totalCommands: 1247,
    serversManaged: 8,
    uptime: '99.9%',
    level: 'Premium',
    joinDate: 'Jan 2024',
    lastActive: 'Just now'
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('pk_live_51234567890abcdef...');
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const navigation = [
    { name: 'dashboard', icon: LayoutDashboard, key: 'dashboard' },
    { name: 'servers', icon: Server, key: 'servers' },
    { name: 'commands', icon: Terminal, key: 'commands' },
    { name: 'analytics', icon: BarChart3, key: 'analytics' },
    { name: 'about', icon: Info, key: 'about' },
    { name: 'settings', icon: Settings, key: 'settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out flex-shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:flex
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <img 
              src={piwpiwTextLogo} 
              alt="PiwPiw" 
              className="h-8 w-auto piwpiw-logo"
            />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;
              
              return (
                <Button
                  key={item.key}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive ? 'piwpiw-button' : ''}`}
                  onClick={() => {
                    setCurrentPage(item.key);
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{t(`nav.${item.name}`)}</span>
                </Button>
              );
            })}
          </nav>

          {/* Enhanced User section */}
          <div className="p-4 border-t border-border bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-4 shadow-sm border border-orange-200 dark:border-orange-800/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-orange-200 dark:ring-orange-800">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-white font-semibold text-lg">
                      {user?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-semibold truncate text-slate-900 dark:text-slate-100">{user?.username}</p>
                    <Crown className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Premium
                    </Badge>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Online</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Activity className="h-3 w-3 text-blue-500" />
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{profileStats.totalCommands}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Commands</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Server className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{profileStats.serversManaged}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Servers</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">Level Progress</span>
                  <span className="text-xs font-medium text-orange-600 dark:text-orange-400">78%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex-1 bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                >
                  {theme === 'light' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex-1 bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                >
                  <Globe className="h-3 w-3" />
                  <span className="ml-1 text-xs">{language.toUpperCase()}</span>
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('nav.logout')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 py-3 lg:px-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <h1 className="text-lg sm:text-xl font-semibold piwpiw-text-gradient truncate">
              {t(`nav.${currentPage}`)}
            </h1>
            
            <div className="flex items-center space-x-3">
              {/* Professional Profile Dropdown */}
              <DropdownMenu open={profileDropdownOpen} onOpenChange={setProfileDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 h-auto p-2 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all duration-200"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 ring-2 ring-orange-200 dark:ring-orange-800">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-white font-semibold">
                          {user?.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{user?.username}</span>
                        <Crown className="h-3 w-3 text-yellow-500" />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Premium Member</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-80 p-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl"
                  align="end"
                  sideOffset={8}
                >
                  {/* Profile Header */}
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-white/20">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                            {user?.username?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{user?.username}</h3>
                          <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                        <p className="text-orange-100 text-sm">{user?.email}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-orange-100">
                          <span>Level {profileStats.level}</span>
                          <span>•</span>
                          <span>Joined {profileStats.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="flex items-center justify-center">
                          <Activity className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{profileStats.totalCommands}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Commands</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center">
                          <Server className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{profileStats.serversManaged}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Servers</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{profileStats.uptime}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Uptime</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        onClick={() => {
                          setCurrentPage('profile');
                          setProfileDropdownOpen(false);
                        }}
                      >
                        <User className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">View Profile</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Manage your account settings</div>
                        </div>
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        onClick={handleCopyApiKey}
                      >
                        {copiedApiKey ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            {copiedApiKey ? 'API Key Copied!' : 'Copy API Key'}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">pk_live_51234567890...</div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                          <Palette className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 dark:text-slate-100">Appearance</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Theme and language</div>
                          </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-48">
                          <DropdownMenuItem onClick={toggleTheme} className="flex items-center space-x-2">
                            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={toggleLanguage} className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span>Language: {language.toUpperCase()}</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>

                      <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                        <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">Notifications</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Manage your alerts</div>
                        </div>
                        <Badge variant="secondary" className="text-xs">3</Badge>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                        <Shield className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">Security</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">2FA and security settings</div>
                        </div>
                        <Badge variant="outline" className="text-xs text-green-600 border-green-200">Active</Badge>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-2" />

                    <DropdownMenuItem
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer text-red-600 dark:text-red-400"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">Sign Out</div>
                        <div className="text-xs opacity-75">Sign out of your account</div>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

