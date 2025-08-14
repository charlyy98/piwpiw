import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import AnalyticsPage from './components/AnalyticsPage';
import CommandsPage from './components/CommandsPage';
import ServersPage from './components/ServersPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import './App.css';

const AppContent = () => {
  const { isAuthenticated } = useApp();
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize from hash if present, with better validation
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['dashboard', 'servers', 'commands', 'analytics', 'settings', 'profile', 'about'];
      const pageFromHash = validPages.includes(hash) ? hash : 'dashboard';
      console.log('Initializing page from hash:', hash, '->', pageFromHash);
      return pageFromHash;
    }
    return 'dashboard';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ensure hash is always in sync with current page
  useEffect(() => {
    if (typeof window !== 'undefined' && currentPage) {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash !== currentPage) {
        console.log('Syncing hash with current page:', currentPage);
        window.history.replaceState({ page: currentPage }, '', `#${currentPage}`);
      }
    }
  }, [currentPage]);

  // Force hash sync on mount and after authentication
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && currentPage) {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash !== currentPage) {
        console.log('Force syncing hash on mount/auth:', currentPage);
        window.history.replaceState({ page: currentPage }, '', `#${currentPage}`);
      }
    }
  }, [isAuthenticated, currentPage]);

  // Debug effect to log current state
  useEffect(() => {
    console.log('App state updated:', {
      currentPage,
      hash: typeof window !== 'undefined' ? window.location.hash : 'N/A',
      isAuthenticated
    });
  }, [currentPage, isAuthenticated]);

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigation = (event) => {
      console.log('Navigation event received:', event.detail);
      console.log('Current page before:', currentPage);
      
      // Force re-render by setting page
      const newPage = event.detail;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        console.log('Page changed to:', newPage);
        
        // Update browser history and hash
        if (typeof window !== 'undefined') {
          window.history.pushState({ page: newPage }, '', `#${newPage}`);
        }
      }
    };

    window.addEventListener('navigate', handleNavigation, { capture: true });
    return () => window.removeEventListener('navigate', handleNavigation, { capture: true });
  }, [currentPage]);

  // Listen for browser hash changes (including back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['dashboard', 'servers', 'commands', 'analytics', 'settings', 'profile', 'about'];
      if (validPages.includes(hash) && hash !== currentPage) {
        console.log('Hash changed to:', hash, 'updating current page');
        setCurrentPage(hash);
      }
    };

    // Also handle popstate (back/forward buttons)
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        console.log('PopState event, page:', event.state.page);
        setCurrentPage(event.state.page);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage]);

  // If user is not authenticated, show login page
  console.log('AppContent render - auth:', isAuthenticated, 'currentPage:', currentPage);
  if (!isAuthenticated) {
    console.log('Rendering LoginPage');
    return <LoginPage />;
  }

  const renderCurrentPage = () => {
    console.log('Rendering page:', currentPage);
    switch (currentPage) {
      case 'commands':
        return <CommandsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'servers':
        return <ServersPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <Dashboard />;
    }
  };

  console.log('Rendering DashboardLayout with page:', currentPage);
  return (
    <DashboardLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      {renderCurrentPage()}
    </DashboardLayout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;



