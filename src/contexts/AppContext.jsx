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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize authentication state from localStorage
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('piwpiw-auth');
      const savedUser = localStorage.getItem('piwpiw-user');
      const isAuth = savedAuth === 'true' && savedUser;
      console.log('Initializing auth state:', { savedAuth, savedUser, isAuth });
      return isAuth;
    }
    return false;
  });
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('piwpiw-user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          console.log('Initializing user from localStorage:', userData);
          return userData;
        } catch (error) {
          console.error('Failed to parse saved user data:', error);
          return null;
        }
      }
    }
    return {
      id: '123456789',
      username: 'PiwPiw',
      avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
      discriminator: '1234',
      email: 'user@piwpiw.com'
    };
  });

  // Load saved preferences from localStorage
  useEffect(() => {
    console.log('Loading saved preferences from localStorage');
    const savedLanguage = localStorage.getItem('piwpiw-language');
    const savedTheme = localStorage.getItem('piwpiw-theme');
    const savedAuth = localStorage.getItem('piwpiw-auth');
    const savedUser = localStorage.getItem('piwpiw-user');

    if (savedLanguage) {
      setLanguage(savedLanguage);
      console.log('Loaded language:', savedLanguage);
    }
    if (savedTheme) {
      setTheme(savedTheme);
      console.log('Loaded theme:', savedTheme);
    }
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      console.log('Loaded auth state: true');
    }
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('Loaded user data:', userData);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
      }
    }
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
    console.log('User logged in:', userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('piwpiw-auth');
    localStorage.removeItem('piwpiw-user');
    console.log('User logged out');
  };

  // Auto-login for development if no saved auth state
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('piwpiw-auth');
      const savedUser = localStorage.getItem('piwpiw-user');
      
      console.log('Checking auth state:', { savedAuth, savedUser, isAuthenticated });
      
      if (!savedAuth && !savedUser) {
        // Auto-login for development
        const defaultUser = {
          id: '123456789',
          username: 'PiwPiw',
          avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
          discriminator: '1234',
          email: 'user@piwpiw.com'
        };
        console.log('Auto-login for development');
        login(defaultUser);
      } else if (savedAuth === 'true' && savedUser) {
        // Restore saved auth state
        try {
          const userData = JSON.parse(savedUser);
          console.log('Restoring saved auth state:', userData);
          setIsAuthenticated(true);
          setUser(userData);
        } catch (error) {
          console.error('Failed to restore saved auth state:', error);
        }
      }
    }
  }, [isAuthenticated]);

  // Debug effect to log auth state changes
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user: user?.username });
  }, [isAuthenticated, user]);

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

