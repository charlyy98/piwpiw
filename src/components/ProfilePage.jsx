import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
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
  BarChart3
} from 'lucide-react';

const ProfilePage = () => {
  const { user, theme } = useApp();

  console.log('Rendering ProfilePage with user:', user);

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'settings' }));
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
              <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
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
              <Button className="bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
    </div>
  );
};

export default ProfilePage;
