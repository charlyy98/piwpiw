import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  User, 
  Crown, 
  Activity, 
  TrendingUp, 
  Server, 
  Terminal, 
  Star,
  ExternalLink,
  ChevronRight,
  Zap,
  Award
} from 'lucide-react';

const ProfileWidget = ({ onNavigateToProfile, compact = false }) => {
  const { user } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  // Mock profile data (would come from API)
  const profileData = {
    level: 42,
    experience: 78420,
    nextLevelExp: 100000,
    totalCommands: 1247,
    serversManaged: 8,
    successRate: 98.7,
    recentAchievement: 'Power User'
  };

  const progressPercentage = (profileData.experience / profileData.nextLevelExp) * 100;

  if (compact) {
    return (
      <Card 
        className="piwpiw-card-hover cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={onNavigateToProfile}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-orange-200 dark:ring-orange-800">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">
                  {user?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{user?.username}</h3>
                <Crown className="h-3 w-3 text-yellow-500 flex-shrink-0" />
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  Level {profileData.level}
                </Badge>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {profileData.totalCommands} commands
                </span>
              </div>
            </div>
            <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="piwpiw-card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span>Profile Overview</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onNavigateToProfile}
            className="text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-orange-200 dark:ring-orange-800">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-xl">
                {user?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{user?.username}</h3>
              <Crown className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                Premium Member
              </Badge>
              <Badge variant="outline" className="text-xs">
                Level {profileData.level}
              </Badge>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Level Progress</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {profileData.experience.toLocaleString()} / {profileData.nextLevelExp.toLocaleString()} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {(profileData.nextLevelExp - profileData.experience).toLocaleString()} XP to next level
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Terminal className="h-4 w-4 text-blue-500" />
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {profileData.totalCommands}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Commands</p>
          </div>
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Server className="h-4 w-4 text-green-500" />
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {profileData.serversManaged}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Servers</p>
          </div>
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {profileData.successRate}%
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Success</p>
          </div>
        </div>

        {/* Recent Achievement */}
        <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Latest Achievement</p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">{profileData.recentAchievement} badge earned!</p>
            </div>
            <Star className="h-4 w-4 text-yellow-500" />
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onNavigateToProfile}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        >
          <User className="h-4 w-4 mr-2" />
          View Full Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileWidget;
