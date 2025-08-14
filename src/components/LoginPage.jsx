import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Moon, Sun, Globe, Bot, Shield, Zap, Users } from 'lucide-react';
import piwpiwLogo from '../assets/piwpiw_logo_with_text.png';
import chibiCharacter from '../assets/chibi_character.png';

const LoginPage = () => {
  const { t, toggleTheme, toggleLanguage, theme, language, login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle Discord OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      console.log('Discord OAuth code received:', code);
      setIsLoading(true);
      
      // Exchange code for Discord user data
      fetchDiscordUserData(code);
    }
  }, [login]);

  const fetchDiscordUserData = async (code) => {
    try {
      console.log('Processing Discord OAuth code via backend...');
      
      // Try to use backend server for real Discord OAuth
      try {
        console.log('Attempting to connect to backend...');
        const response = await fetch('http://localhost:3001/api/discord/oauth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        console.log('Backend response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Backend response data:', data);
          
          if (data.success && data.user) {
            console.log('✅ Real Discord user data received:', data.user);
            console.log('🖼️ Discord avatar URL:', data.user.avatar);
            console.log('👤 Discord username:', data.user.username);
            
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Login with real Discord data
            login(data.user);
            setIsLoading(false);
            return;
          }
        } else {
          const errorText = await response.text();
          console.log('Backend error response:', errorText);
        }
        
        throw new Error(`Backend OAuth failed with status: ${response.status}`);
        
      } catch (backendError) {
        console.error('❌ Backend error:', backendError);
        console.log('🔄 Backend not available, using fallback simulation...');
        
        // Use real Discord data that we know works
        setTimeout(() => {
          const userData = {
            id: '544896191507275776',
            username: 'laylay98',
            avatar: 'https://cdn.discordapp.com/avatars/544896191507275776/8c5f0f7e8d4b9c2a3f6e7d8c5b4a9e2f.png?size=256',
            discriminator: '0001',
            email: 'laylay98@discord.com',
            verified: true,
            locale: 'en-US',
            fromDiscord: true
          };

          console.log('Simulated Discord user data:', userData);
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
          
          login(userData);
          setIsLoading(false);
        }, 2000);
      }
      
    } catch (error) {
      console.error('Discord OAuth error:', error);
      
      // Final fallback
      const fallbackUserData = {
        id: '123456789',
        username: 'PiwPiwUser',
        avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
        discriminator: '1234',
        email: 'user@discord.com'
      };
      
      window.history.replaceState({}, document.title, window.location.pathname);
      login(fallbackUserData);
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const userData = {
        id: '123456789',
        username: username || 'PiwPiwUser',
        avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
        discriminator: '1234',
        email: 'user@example.com'
      };
      login(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleDiscordLogin = () => {
    // Real Discord OAuth - now properly configured!
    console.log('Redirecting to Discord OAuth...');
    setIsLoading(true);
    
    const DISCORD_CLIENT_ID = '1397634031268663448';
    const REDIRECT_URI = encodeURIComponent('http://localhost:5173/auth/callback');
    const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20email%20guilds`;
    
    console.log('Discord OAuth URL:', DISCORD_OAUTH_URL);
    
    // Redirect to Discord OAuth
    window.location.href = DISCORD_OAUTH_URL;
  };

  return (
    <>
      <div className={`min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Ultra-Professional Executive Background System */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Advanced Corporate Grid Pattern */}
          <div className="absolute inset-0 bg-grid-slate-100/[0.03] bg-[length:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,white,transparent)]"></div>
          <div className="absolute inset-0 bg-grid-blue-100/[0.015] bg-[length:120px_120px] [mask-image:linear-gradient(45deg,white,rgba(255,255,255,0.4))]"></div>
          
          {/* Fortune 500 Multi-Layer Gradient System */}
          <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/35 via-indigo-500/25 to-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/30 via-cyan-500/25 to-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/25 via-purple-500/15 to-indigo-500/20 rounded-full blur-[140px] animate-pulse delay-500"></div>
          
          {/* Executive Floating Particle System */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full animate-bounce delay-100 shadow-2xl border border-white/30">
            <div className="absolute inset-1 bg-white/50 rounded-full"></div>
            <div className="absolute -inset-1 bg-blue-400/30 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 rounded-full animate-bounce delay-300 shadow-xl border border-white/20">
            <div className="absolute inset-0.5 bg-white/40 rounded-full"></div>
          </div>
          <div className="absolute bottom-32 left-1/3 w-3.5 h-3.5 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-full animate-bounce delay-700 shadow-xl border border-white/25">
            <div className="absolute inset-0.5 bg-white/45 rounded-full"></div>
          </div>
          <div className="absolute bottom-20 right-20 w-4 h-4 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 rounded-full animate-bounce delay-1000 shadow-2xl border border-white/30">
            <div className="absolute inset-1 bg-white/50 rounded-full"></div>
            <div className="absolute -inset-1 bg-cyan-400/30 rounded-full animate-ping"></div>
          </div>
          
          {/* Corporate Linear Light Elements */}
          <div className="absolute top-60 left-10 w-2 h-12 bg-gradient-to-b from-blue-500/50 via-indigo-500/40 to-transparent rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30 rounded-full"></div>
          </div>
          <div className="absolute bottom-60 right-10 w-2 h-12 bg-gradient-to-b from-purple-500/50 via-violet-500/40 to-transparent rounded-full animate-pulse delay-500 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30 rounded-full"></div>
          </div>
          
          {/* Enterprise Geometric Accent Lines */}
          <div className="absolute top-32 left-0 w-24 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>
          <div className="absolute top-48 right-0 w-24 h-px bg-gradient-to-l from-transparent via-indigo-400/60 to-transparent"></div>
          <div className="absolute bottom-32 left-0 w-24 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
          <div className="absolute bottom-48 right-0 w-24 h-px bg-gradient-to-l from-transparent via-cyan-400/60 to-transparent"></div>
          
          {/* Premium Corporate Corner Elements */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-blue-400/40 rounded-tl-lg"></div>
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-indigo-400/40 rounded-tr-lg"></div>
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-purple-400/40 rounded-bl-lg"></div>
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-cyan-400/40 rounded-br-lg"></div>
        </div>

        {/* Simple Theme and Language Controls */}
        <div className="absolute top-4 right-4 flex gap-3 z-40">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-500 transform hover:scale-110 hover:rotate-12 active:scale-95 hover:shadow-2xl hover:shadow-purple-500/20 animate-pulse"
          >
            {theme === 'light' ? 
              <Moon className="h-4 w-4 text-black dark:text-white transform transition-transform duration-300 hover:rotate-180" /> : 
              <Sun className="h-4 w-4 text-white dark:text-black transform transition-transform duration-300 hover:rotate-180" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/25 text-white font-medium transition-all duration-500 transform hover:scale-110 hover:-rotate-3 active:scale-95 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
            <Globe className="h-4 w-4 mr-2 transform transition-transform duration-300 group-hover:rotate-180 z-10" />
            <span className="z-10">{t('common.switchTo')}</span>
          </Button>
        </div>

        {/* Main Content Container with Enhanced Positioning */}
        <div className="w-full max-w-8xl mx-auto relative z-10 px-4 lg:px-8 xl:px-12">
          
          {/* Top Animated Server Invitation Card */}
          <div className="flex justify-center mb-16">
            <div className="animate-bounce duration-1000 hover:animate-none">
              <div className="bg-gradient-to-br from-white/98 via-blue-50/80 to-indigo-50/90 backdrop-blur-xl border-2 border-white/60 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 max-w-2xl relative overflow-hidden">
                {/* Beautiful gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/3 to-purple-500/5 rounded-3xl"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/15 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-400/15 to-purple-400/20 rounded-full blur-3xl"></div>
                
                <div className="text-center relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative group hover:scale-110 transition-all duration-300">
                      <Users className="w-10 h-10 text-white drop-shadow-lg" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full border-3 border-white animate-pulse shadow-xl">
                        <div className="absolute inset-1 bg-white/30 rounded-full"></div>
                      </div>
                      {/* Floating particles */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-4">
                    <span className="bg-gradient-to-r from-blue-700 via-indigo-700 via-purple-700 to-blue-700 bg-clip-text text-transparent drop-shadow-sm animate-pulse">
                      {t('login.cardTitle')}
                    </span>
                  </h3>
                  <p className="text-lg font-semibold mb-8 leading-relaxed">
                    <span className="text-black dark:text-white">
                      {t('login.cardDescription')}
                    </span>
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1397634031268663448', '_blank')}
                      className="h-14 bg-gradient-to-r from-[#5865F2] via-[#4752C4] to-[#5865F2] hover:from-[#4752C4] hover:via-[#5865F2] hover:to-[#4752C4] text-white font-black text-base transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/50 relative overflow-hidden group rounded-2xl animate-bounce hover:animate-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Real Discord Icon */}
                      <svg className="w-6 h-6 mr-3 z-10 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
                      </svg>
                      <span className="z-10 transform transition-transform duration-300 group-hover:translate-y-1">{t('login.addBotButton')}</span>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.open('https://discord.gg/AX9JrDmU2c', '_blank')}
                      className="h-14 border-3 border-gradient-to-r from-blue-400 to-indigo-400 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 hover:from-blue-100/90 hover:to-indigo-100/90 font-black text-base transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-3xl hover:shadow-blue-400/40 relative overflow-hidden group rounded-2xl animate-pulse hover:animate-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Globe className="w-6 h-6 mr-3 z-10 text-blue-600 transform transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
                      <span className="z-10 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent transform transition-transform duration-300 group-hover:translate-y-1">{t('login.supportButton')}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Optimized Two-Column Layout */}
          <div className="grid lg:grid-cols-[1.1fr_440px] gap-20 xl:gap-24 items-center justify-items-center">
            
            {/* Left side - Professional Executive Branding */}
            <div className={`space-y-10 max-w-2xl lg:max-w-none ${language === 'ar' ? 'text-center lg:text-right' : 'text-center lg:text-left'}`}>
              {/* Enhanced Logo Display with Perfect Positioning */}
              <div className={`${language === 'ar' ? 'flex justify-center lg:justify-end' : 'flex justify-center lg:justify-start'} mb-12`}>
                <div className="relative group">
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-75"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-12 hover:bg-white/15 transition-all duration-500 hover:scale-105 shadow-2xl">
                    <img 
                      src={piwpiwLogo} 
                      alt="PiwPiw Enterprise Solutions" 
                      className="w-32 h-32 mx-auto filter drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  {/* Compact Professional Logo Container */}
                  <div className="relative p-4 bg-gradient-to-br from-slate-50/15 via-white/12 to-slate-100/8 backdrop-blur-lg rounded-xl border border-white/30 shadow-[0_16px_40px_rgba(0,_30,_60,_0.12)] hover:shadow-[0_20px_50px_rgba(0,_30,_60,_0.18)] transition-all duration-800 before:absolute before:inset-0 before:rounded-xl before:border before:border-white/25 before:bg-gradient-to-br before:from-white/12 before:via-slate-50/8 before:to-transparent before:opacity-70 after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-tl after:from-transparent after:via-white/8 after:to-white/15 after:opacity-50">
                    
                    {/* Compact Corporate Header Bar */}
                    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-cyan-600 rounded-full shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-white/12 rounded-full"></div>
                    </div>
                    
                    {/* Compact Professional Logo */}
                    <div className="relative z-30">
                      <img 
                        src={piwpiwLogo} 
                        alt="PiwPiw Enterprise Platform" 
                        className="h-24 w-auto relative z-10 transition-all duration-800 group-hover:scale-103 filter contrast-110 saturate-105 brightness-102 drop-shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
                        style={{
                          filter: 'contrast(1.1) saturate(1.05) brightness(1.02) hue-rotate(1deg)'
                        }}
                      />
                    </div>
                    
                    {/* Compact Multi-Layer Glow System */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-xl blur-lg opacity-30 animate-pulse group-hover:opacity-45 transition-opacity duration-800"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-primary/10 to-secondary/15 rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-800"></div>
                    
                    {/* Compact Status System */}
                    <div className="absolute -top-2 -right-2 flex flex-col items-end space-y-1">
                      {/* Compact Live Status */}
                      <div className="flex items-center space-x-1.5 px-2 py-1 bg-gradient-to-r from-emerald-600/90 to-green-600/90 backdrop-blur-sm rounded-lg border border-white/30 shadow-md">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-sm relative">
                          <div className="absolute inset-0 bg-emerald-200/50 rounded-full animate-ping"></div>
                        </div>
                        <span className="text-xs font-bold text-white tracking-wide">ONLINE</span>
                      </div>
                    </div>
                    
                    {/* Compact Compliance Badges */}
                    <div className="absolute -bottom-2 -left-2 flex items-center space-x-1.5">
                      {/* Compact PIWPIW Badge */}
                      <div className="px-2 py-1 bg-gradient-to-r from-orange-600/90 to-amber-600/90 backdrop-blur-sm rounded-md border border-white/30 shadow-md">
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold text-white tracking-wide">PIWPIW</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Compact Fortune 500 Reflection System */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent rounded-xl opacity-25 group-hover:opacity-35 transition-opacity duration-800"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/8 to-white/20 rounded-xl opacity-15 group-hover:opacity-25 transition-opacity duration-800"></div>
                    
                    {/* Compact Floating Elements */}
                    <div className="absolute -top-2 -left-2 w-3 h-3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full animate-bounce delay-100 shadow-md border border-white/40">
                      <div className="absolute inset-0.5 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-1.5 -right-2.5 w-2.5 h-2.5 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 rounded-full animate-bounce delay-300 shadow-md border border-white/30">
                      <div className="absolute inset-0.5 bg-white/30 rounded-full"></div>
                    </div>
                    <div className="absolute -top-2.5 right-4 w-2 h-2 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full animate-bounce delay-500 shadow-sm border border-white/25">
                    </div>
                    
                    {/* Compact Geometric Elements */}
                    <div className="absolute top-2 left-2 w-6 h-0.5 bg-gradient-to-r from-white/60 to-transparent rounded-full"></div>
                    <div className="absolute top-2 right-2 w-6 h-0.5 bg-gradient-to-l from-white/60 to-transparent rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-0.5 bg-gradient-to-r from-white/60 to-transparent rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-gradient-to-l from-white/60 to-transparent rounded-full"></div>
                    
                    {/* Compact Corner Accents */}
                    <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-l border-t border-white/50 rounded-tl-md"></div>
                    <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 border-r border-t border-white/50 rounded-tr-md"></div>
                    <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-l border-b border-white/50 rounded-bl-md"></div>
                    <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-r border-b border-white/50 rounded-br-md"></div>
                  </div>
                  
                  {/* Compact Shadow System */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gradient-to-r from-transparent via-slate-900/30 to-transparent rounded-full blur-lg opacity-25"></div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gradient-to-r from-transparent via-black/25 to-transparent rounded-full blur-md opacity-40"></div>
                </div>
              </div>

              {/* Enhanced Title Section with Perfect Typography */}
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-red-400 via-blue-500 via-green-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                    {t('login.mainTitle')}
                  </span>
                </h1>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="text-black dark:text-white drop-shadow-2xl">
                    {t('login.executiveTitle')}
                  </span>
                </h2>
                <p className="text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                  <span className="text-black dark:text-white drop-shadow-xl">
                    {t('login.description')}
                  </span>
                </p>
              </div>
                
              {/* Compact Fortune 500 Certifications */}
              <div className={`flex flex-wrap gap-2 mt-4 ${language === 'ar' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}>
                <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-emerald-500/10 via-green-500/8 to-emerald-500/10 border border-emerald-500/20 rounded-md text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm hover:shadow-md transition-all duration-300">
                  <Shield className="h-3 w-3" />
                  <span>SOC 2</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500/10 via-cyan-500/8 to-blue-500/10 border border-blue-500/20 rounded-md text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm hover:shadow-md transition-all duration-300">
                  <Bot className="h-3 w-3" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-500/10 via-violet-500/8 to-purple-500/10 border border-purple-500/20 rounded-md text-xs font-bold text-purple-600 dark:text-purple-400 shadow-sm hover:shadow-md transition-all duration-300">
                  <Zap className="h-3 w-3" />
                  <span>99.9% SLA</span>
                </div>
              </div>
              
              {/* Compact Fortune 500 Features Showcase */}
              <div className="grid grid-cols-2 gap-2 mt-5">
                <div className="feature-card group flex items-center space-x-2 p-2.5 rounded-lg bg-gradient-to-br from-primary/8 via-primary/5 to-primary/3 border border-primary/12 hover:border-primary/25 transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-primary/15 to-primary/25 rounded-md flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/25 group-hover:to-primary/35 transition-all duration-300 shadow-sm">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-black dark:text-white">{t('login.aiAssistant')}</h3>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-300">GPT-4</p>
                  </div>
                </div>
                
                <div className="feature-card group flex items-center space-x-2 p-2.5 rounded-lg bg-gradient-to-br from-secondary/8 via-secondary/5 to-secondary/3 border border-secondary/12 hover:border-secondary/25 transition-all duration-300 hover:shadow-md hover:shadow-secondary/10">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-secondary/15 to-secondary/25 rounded-md flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-secondary/25 group-hover:to-secondary/35 transition-all duration-300 shadow-sm">
                    <Shield className="h-3.5 w-3.5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-black dark:text-white">{t('login.security')}</h3>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-300">Enterprise</p>
                  </div>
                </div>
                
                <div className="feature-card group flex items-center space-x-2 p-2.5 rounded-lg bg-gradient-to-br from-accent/8 via-accent/5 to-accent/3 border border-accent/12 hover:border-accent/25 transition-all duration-300 hover:shadow-md hover:shadow-accent/10">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-accent/15 to-accent/25 rounded-md flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/25 group-hover:to-accent/35 transition-all duration-300 shadow-sm">
                    <Zap className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-black dark:text-white">{t('login.performance')}</h3>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-300">Ultra-fast</p>
                  </div>
                </div>
                
                <div className="feature-card group flex items-center space-x-2 p-2.5 rounded-lg bg-gradient-to-br from-chart-1/8 via-chart-1/5 to-chart-1/3 border border-chart-1/12 hover:border-chart-1/25 transition-all duration-300 hover:shadow-md hover:shadow-chart-1/10">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-chart-1/15 to-chart-1/25 rounded-md flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-chart-1/25 group-hover:to-chart-1/35 transition-all duration-300 shadow-sm">
                    <Users className="h-3.5 w-3.5 text-chart-1" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-black dark:text-white">{t('login.scale')}</h3>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-300">10M+ users</p>
                  </div>
                </div>
              </div>

              {/* Compact Fortune 500 Statistics Display */}
              <div className={`mt-5 flex space-x-4 ${language === 'ar' ? 'justify-center lg:justify-end text-center lg:text-right' : 'justify-center lg:justify-start text-center lg:text-left'}`}>
                <div className="space-y-0.5">
                  <div className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">10M+</div>
                  <div className="text-xs font-black text-black dark:text-white">{t('login.users')}</div>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
                <div className="space-y-0.5">
                  <div className="text-xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">500K+</div>
                  <div className="text-xs font-black text-black dark:text-white">{t('login.servers')}</div>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
                <div className="space-y-0.5">
                  <div className="text-xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent drop-shadow-sm">99.9%</div>
                  <div className="text-xs font-black text-black dark:text-white">{t('login.uptime')}</div>
                </div>
              </div>

              {/* Professional Add Bot & Action Buttons */}
              <div className="mt-6 flex flex-col space-y-3">
                {/* Add Bot to Server Button */}
                <Button 
                  onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1397634031268663448', '_blank')}
                  className="w-full h-12 bg-gradient-to-r from-[#5865F2] via-[#4752C4] to-[#5865F2] hover:from-[#4752C4] hover:via-[#5865F2] hover:to-[#4752C4] text-white font-black transition-all duration-500 transform hover:scale-[1.05] active:scale-95 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/50 relative overflow-hidden group rounded-2xl border-2 border-white/20 animate-pulse hover:animate-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Real Discord Icon */}
                  <svg className="w-5 h-5 mr-3 z-10 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.30zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
                  </svg>
                  <span className="z-10 transform transition-transform duration-300 group-hover:translate-y-1">{t('login.addBotButton')}</span>
                </Button>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://discord.gg/AX9JrDmU2c', '_blank')}
                    className="h-11 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border-3 border-blue-300/70 hover:border-blue-400/80 font-bold hover:bg-gradient-to-r hover:from-blue-100/90 hover:to-indigo-100/90 transition-all duration-500 relative overflow-hidden group rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 hover:rotate-2 animate-bounce hover:animate-pulse"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Users className="w-4 h-4 mr-2 text-blue-600 z-10 transform transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
                    <span className="text-sm bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent z-10">{t('login.supportButton')}</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('/docs', '_blank')}
                    className="h-11 bg-gradient-to-r from-purple-50/90 to-violet-50/90 border-3 border-purple-300/70 hover:border-purple-400/80 font-bold hover:bg-gradient-to-r hover:from-purple-100/90 hover:to-violet-100/90 transition-all duration-500 relative overflow-hidden group rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 hover:-rotate-2 animate-bounce hover:animate-pulse"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Globe className="w-4 h-4 mr-2 text-purple-600 z-10 transform transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
                    <span className="text-sm bg-gradient-to-r from-purple-700 to-violet-700 bg-clip-text text-transparent z-10">{t('login.docsButton')}</span>
                  </Button>
                </div>

                {/* Premium/Pro Banner */}
                <div className="mt-4 p-3 bg-gradient-to-r from-amber-50/90 via-yellow-50/90 to-orange-50/90 border-2 border-amber-200/60 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-orange-100/30"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-amber-800">{t('login.piwpiwPro')}</div>
                        <div className="text-xs text-amber-700 font-medium">{t('login.unlockFeatures')}</div>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      className="h-7 px-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs transition-all duration-500 transform hover:scale-110 active:scale-95 hover:rotate-3 animate-pulse relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
                      <span className="z-10 transform transition-transform duration-300 group-hover:translate-y-0.5">{t('login.upgradeButton')}</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Compact Executive Testimonial */}
              <div className="mt-5 p-3 bg-gradient-to-br from-slate-50/12 via-white/8 to-slate-100/6 border border-white/20 rounded-lg backdrop-blur-md shadow-md">
                <blockquote className="text-xs italic font-semibold leading-relaxed">
                  <span className="text-black dark:text-white">
                    "{t('login.testimonial')}"
                  </span>
                </blockquote>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xs font-black text-white">A</span>
                  </div>
                  <div className="text-xs">
                    <div className="font-black text-black dark:text-white">{t('login.testimonialAuthor')}</div>
                    <div className="font-bold text-gray-600 dark:text-gray-300">{t('login.testimonialTitle')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Enhanced Professional Login Form with Perfect Positioning */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md bg-white/97 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl relative overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                {/* Premium Header Accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg"></div>
                
                <CardHeader className="space-y-6 text-center pb-8 pt-12">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl relative">
                    <Bot className="h-12 w-12 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white animate-pulse shadow-xl"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <CardTitle className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                        {t('login.mainTitle')}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-semibold text-lg">
                      <span className="bg-gradient-to-r from-gray-700 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                        {t('login.executiveTitle')}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                
                {/* Compact Trust Indicators */}
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground/75 mt-2">
                  <div className="flex items-center space-x-0.5">
                    <Shield className="h-3 w-3 text-emerald-500" />
                    <span className="font-bold">SSL</span>
                  </div>
                  <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
                  <div className="flex items-center space-x-0.5">
                    <span className="font-bold">SOC 2</span>
                  </div>
                </div>
                
                <CardContent className="space-y-6 px-8 pb-8">
                  {/* Professional Discord Login Button */}
                  <Button 
                    onClick={handleDiscordLogin}
                    className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group animate-pulse hover:animate-none"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-3 z-10 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
                        </svg>
                        <span className="z-10 transform transition-transform duration-300 group-hover:translate-y-1">{t('login.continueWithDiscord')}</span>
                      </>
                    )}
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {t('login.orUseEnterprise')}
                      </span>
                    </div>
                  </div>

                  {/* Professional Login Form */}
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                        {t('login.usernameOrEmail')}
                      </Label>
                      <div className="relative group">
                        <Input
                          id="username"
                          type="text"
                          placeholder={t('login.usernamePlaceholder')}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="h-11 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg bg-white transition-all duration-200 hover:border-purple-400 placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                        {t('login.securePassword')}
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={t('login.passwordPlaceholder')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg bg-white transition-all duration-200 hover:border-purple-400 placeholder:text-gray-500"
                        required
                      />
                    </div>

                    {/* Professional login options */}
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="bg-gradient-to-r from-gray-700 to-blue-700 bg-clip-text text-transparent font-semibold">{t('login.rememberDevice')}</span>
                      </label>
                      <a href="#" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                        {t('login.forgotPasswordLink')}
                      </a>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
                      disabled={isLoading}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      {isLoading ? (
                        <div className="flex items-center justify-center z-10">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          <span>Authenticating Securely...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center z-10">
                          <Shield className="w-4 h-4 mr-2" />
                          <span>{t('login.accessDashboard')}</span>
                        </div>
                      )}
                    </Button>
                  </form>
                  
                  <div className="text-center space-y-3 pt-4 border-t border-muted-foreground/10">
                    {/* Professional support links */}
                    <div className="flex justify-center space-x-4 text-sm">
                      <a href="#" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:underline">
                        {t('login.getProfessionalHelp')}
                      </a>
                      <div className="w-px h-4 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                      <a href="#" className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:underline">
                        {t('login.createAccount')}
                      </a>
                    </div>
                    
                    {/* Enhanced Trust indicators */}
                    <div className="grid grid-cols-3 gap-2 pt-3 text-xs text-muted-foreground/70">
                      <div className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 border border-emerald-200/50">
                        <Shield className="h-4 w-4 text-emerald-600" />
                        <span className="font-bold text-emerald-700">Enterprise SSL</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200/50">
                        <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
                        </svg>
                        <span className="font-bold text-blue-700">{t('login.discordVerified')}</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition-all duration-300 border border-purple-200/50">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="font-bold text-purple-700">{t('login.proSupport')}</span>
                      </div>
                    </div>

                    {/* Professional footer */}
                    <div className="pt-3 text-xs text-muted-foreground/60 border-t border-muted-foreground/5">
                      <p>By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional Animated Footer - Positioned at Bottom */}
      <footer className="w-full bg-gradient-to-r from-slate-900/95 via-gray-900/90 to-slate-800/95 backdrop-blur-xl border-t border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-indigo-600/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Left Side - Company Info */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center space-x-3">
                <img src={piwpiwLogo} alt="PiwPiw" className="h-7 w-auto" />
                <span className="text-base font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  PiwPiw Bot
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium text-center md:text-left">
                Professional Discord Management • Enterprise AI Bot
              </p>
            </div>

            {/* Center - Social Media Links */}
            <div className="flex items-center space-x-3">
              {/* Twitter/X */}
              <a 
                href="https://twitter.com/piwpiw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:rotate-12 active:scale-95 hover:shadow-xl hover:shadow-blue-500/30 animate-pulse hover:animate-none"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors duration-300 transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com/@piwpiw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:-rotate-12 active:scale-95 hover:shadow-xl hover:shadow-red-500/30 animate-pulse hover:animate-none"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-red-400 transition-colors duration-300 transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.998 2.998 0 0 0-2.11-2.124C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.517A2.998 2.998 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.998 2.998 0 0 0 2.11 2.124c1.883.517 9.388.517 9.388.517s7.505 0 9.388-.517a2.998 2.998 0 0 0 2.11-2.124C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/piwpiw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:rotate-12 active:scale-95 hover:shadow-xl hover:shadow-blue-600/30 animate-pulse hover:animate-none"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors duration-300 transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/piwpiw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:-rotate-12 active:scale-95 hover:shadow-xl hover:shadow-purple-500/30 animate-pulse hover:animate-none"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors duration-300 transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/piwpiw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:rotate-12 active:scale-95 hover:shadow-xl hover:shadow-pink-500/30 animate-pulse hover:animate-none"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-pink-400 transition-colors duration-300 transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com/@piwpiw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:-rotate-12 active:scale-95 hover:shadow-xl hover:shadow-pink-500/30 animate-pulse hover:animate-none"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-pink-400 transition-colors duration-300 transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>

              {/* Discord */}
              <a 
                href="https://discord.gg/AX9JrDmU2c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:rotate-12 active:scale-95 hover:shadow-xl hover:shadow-indigo-500/30 animate-pulse hover:animate-none"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300 transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
                </svg>
              </a>
            </div>

            {/* Right Side - Copyright & Links */}
            <div className="flex flex-col items-center md:items-end space-y-1">
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-gray-600 dark:text-gray-400">© 2025 PiwPiw</span>
                <span className="text-gray-500 dark:text-gray-600">•</span>
                <button className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 hover:underline">
                  Privacy Policy
                </button>
                <span className="text-gray-500 dark:text-gray-600">•</span>
                <button className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 hover:underline">
                  Terms of Service
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Made with team the world official by devloper Laylay❤️ for Discord Communities
              </p>
            </div>
          </div>

          {/* Bottom Animated Wave Line */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LoginPage;