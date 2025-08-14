import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';
import { mockApi } from '../api/mockApi.js';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    id: '123456789',
    username: 'PiwPiw',
    avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
    discriminator: '1234',
    email: 'user@piwpiw.com'
  });

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('piwpiw-language');
    const savedTheme = localStorage.getItem('piwpiw-theme');
    const savedAuth = localStorage.getItem('piwpiw-auth');
    const savedUser = localStorage.getItem('piwpiw-user');

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTheme) setTheme(savedTheme);
    if (savedAuth === 'true') setIsAuthenticated(true);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('piwpiw-language', newLanguage);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('piwpiw-theme', newTheme);
  };

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('piwpiw-auth', 'true');
    localStorage.setItem('piwpiw-user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('piwpiw-auth');
    localStorage.removeItem('piwpiw-user');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const updateAvatar = async (file) => {
    try {
      const response = await mockApi.uploadAvatar(user.id, file);
      if (response.success) {
        const updatedUser = {
          ...user,
          avatar: response.data.avatarUrl
        };
        setUser(updatedUser);
        localStorage.setItem('piwpiw-user', JSON.stringify(updatedUser));
        return { success: true };
      }
      return { success: false, error: 'Failed to update avatar' };
    } catch (error) {
      console.error('Avatar update failed:', error);
      return { success: false, error: error.message || 'Failed to update avatar' };
    }
  };

  const value = {
    language,
    theme,
    isAuthenticated,
    user,
    toggleLanguage,
    toggleTheme,
    login,
    logout,
    updateAvatar,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

