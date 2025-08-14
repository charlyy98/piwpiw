import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  User, 
  Mail, 
  Calendar, 
  Crown, 
  Shield, 
  Settings,
  ArrowLeft,
  Edit3,
  Activity,
  Server,
  Terminal,
  BarChart3,
  Save,
  X
} from 'lucide-react';

const ProfilePage = () => {
  const { user, theme, updateUser } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  console.log('Rendering ProfilePage with user:', user);

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'settings' }));
  };

  const goToAccountSettings = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'settings' }));
  };

  const handleEditProfile = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar || ''
    });
    setIsEditModalOpen(true);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data in context
      if (updateUser) {
        updateUser({
          ...user,
          username: formData.username,
          email: formData.email,
          avatar: formData.avatar
        });
      }
      
      setIsEditModalOpen(false);
      // You could add a toast notification here
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={goBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Settings</span>
        </Button>
      </div>

      {/* Professional Profile Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-32 w-32 ring-4 ring-white/20 shadow-2xl">
        <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-3xl text-white">
                {user?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
      </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left space-y-4 flex-1">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <h1 className="text-3xl font-bold">{user?.username || 'PiwPiw User'}</h1>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
              <p className="text-blue-100 flex items-center justify-center md:justify-start space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user?.email || 'user@piwpiw.com'}</span>
              </p>
              <p className="text-blue-100 flex items-center justify-center md:justify-start space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Member since January 2024</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Button 
                className="bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm"
                onClick={handleEditProfile}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={goToAccountSettings}
              >
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Commands Used', 
            value: '2,847', 
            icon: Terminal, 
            color: 'from-blue-500 to-blue-600',
            desc: 'Total commands executed'
          },
          { 
            title: 'Servers Managed', 
            value: '12', 
            icon: Server, 
            color: 'from-emerald-500 to-emerald-600',
            desc: 'Active Discord servers'
          },
          { 
            title: 'Uptime Score', 
            value: '99.9%', 
            icon: Activity, 
            color: 'from-amber-500 to-amber-600',
            desc: 'System reliability'
          },
          { 
            title: 'Security Level', 
            value: 'High', 
            icon: Shield, 
            color: 'from-purple-500 to-purple-600',
            desc: '2FA enabled'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/90'} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-full`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card className={theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/90'}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Account Information</span>
            </CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Username</label>
                <p className="text-sm text-muted-foreground">{user?.username || 'PiwPiw'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <p className="text-sm text-muted-foreground">{user?.email || 'user@piwpiw.com'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Account Type</label>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Two-Factor Authentication</label>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card className={theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/90'}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Activity Summary</span>
            </CardTitle>
            <CardDescription>Your recent activity overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Login</span>
                <span className="text-sm text-muted-foreground">Just now</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Commands Today</span>
                <span className="text-sm text-muted-foreground">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Servers</span>
                <span className="text-sm text-muted-foreground">8 of 12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <span className="text-sm text-muted-foreground">0.2s avg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ultra Premium Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30 border border-white/20 dark:border-slate-700/50 shadow-2xl backdrop-blur-xl">
          {/* Floating Orbs Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-10 -right-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-20 -right-10 w-36 h-36 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-10 -left-20 w-28 h-28 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* Ultra Premium Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              animation: 'float 6s ease-in-out infinite'
            }}></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-8 right-16 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-12 right-8 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            
            <DialogHeader className="relative z-10">
              <DialogTitle className="flex items-center space-x-3 text-xl font-bold">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-md animate-pulse"></div>
                  <div className="relative p-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 shadow-lg">
                    <Edit3 className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Edit Profile</span>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-white/60 to-transparent rounded-full"></div>
                </div>
              </DialogTitle>
              <DialogDescription className="text-blue-100/90 mt-2 text-sm leading-relaxed">
                ✨ Customize your profile and make it uniquely spectacular
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Premium Content Area */}
          <div className="relative p-6 space-y-6 bg-gradient-to-b from-transparent to-white/50 dark:to-slate-900/50">
            {/* Spectacular Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group cursor-pointer">
                {/* Multiple Glow Layers */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-all duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-80 transition-all duration-200"></div>
                
                {/* Avatar Container */}
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-white/80 dark:ring-slate-800/80 shadow-2xl backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 group-hover:scale-110 transition-all duration-300">
                    <AvatarImage src={formData.avatar} className="object-cover" />
                    <AvatarFallback className="text-white text-2xl font-bold bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                      {formData.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Animated Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 border-4 border-white dark:border-slate-800 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Floating Sparkles */}
                  <div className="absolute -top-2 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-80" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute -top-1 -left-2 w-1 h-1 bg-pink-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.3s' }}></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <span>Live Preview - Updates Instantly</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ✨ Your avatar will shine across the entire dashboard
                </p>
              </div>
            </div>

            {/* Ultra Premium Form Fields */}
            <div className="space-y-5">
              {/* Username Field */}
              <div className="relative group">
                <Label htmlFor="username" className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">Username</span>
                </Label>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleFormChange('username', e.target.value)}
                    className="relative w-full h-12 px-4 border-2 border-slate-200/50 dark:border-slate-700/50 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 dark:focus:ring-blue-800/50 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium"
                    placeholder="Enter your awesome username"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <Label htmlFor="email" className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">Email Address</span>
                </Label>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="relative w-full h-12 px-4 border-2 border-slate-200/50 dark:border-slate-700/50 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 dark:focus:ring-purple-800/50 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
                </div>
              </div>

              {/* Avatar URL Field */}
              <div className="relative group">
                <Label htmlFor="avatar" className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">Avatar Image URL</span>
                </Label>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <Input
                    id="avatar"
                    value={formData.avatar}
                    onChange={(e) => handleFormChange('avatar', e.target.value)}
                    className="relative w-full h-12 px-4 border-2 border-slate-200/50 dark:border-slate-700/50 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-800/50 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium"
                    placeholder="Enter avatar image URL (optional)"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-blue-500/5 pointer-events-none"></div>
                </div>
                <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                  <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>💡 Pro tip: Leave empty to use your username's first letter as avatar</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra Premium Footer */}
          <DialogFooter className="relative p-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 border-t border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative flex space-x-4 w-full">
              {/* Cancel Button */}
              <div className="relative group flex-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-slate-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isLoading}
                  className="relative w-full h-12 border-2 border-slate-200/80 dark:border-slate-600/80 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 font-semibold text-slate-700 dark:text-slate-300 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-xl"
                >
                  <X className="w-5 h-5 mr-2" />
                  <span>Cancel</span>
                </Button>
              </div>

              {/* Save Button */}
              <div className="relative group flex-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="relative w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-80"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="relative">
                        <div className="w-5 h-5 border-2 border-white/30 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Saving Profile...
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="p-1 bg-white/20 rounded-lg">
                        <Save className="w-4 h-4" />
                      </div>
                      <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Save Changes
                      </span>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
