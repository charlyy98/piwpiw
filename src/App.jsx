import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import AnalyticsPage from './components/AnalyticsPage';
import CommandsPage from './components/CommandsPage';
import ServersPage from './components/ServersPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import './App.css';

const AppContent = () => {
  const { isAuthenticated } = useApp();
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize from hash if present
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['dashboard', 'servers', 'commands', 'analytics', 'settings', 'profile'];
      return validPages.includes(hash) ? hash : 'dashboard';
    }
    return 'dashboard';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Listen for custom navigation events
  React.useEffect(() => {
    const handleNavigation = (event) => {
      console.log('Navigation event received:', event.detail);
      console.log('Current page before:', currentPage);
      
      // Force re-render by setting page
      const newPage = event.detail;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        console.log('Page changed to:', newPage);
        
        // Also update browser history without navigation
        if (typeof window !== 'undefined') {
          window.history.replaceState({ page: newPage }, '', `#${newPage}`);
        }
      }
    };

    window.addEventListener('navigate', handleNavigation, { capture: true });
    return () => window.removeEventListener('navigate', handleNavigation, { capture: true });
  }, [currentPage]);

  // Listen for browser hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['dashboard', 'servers', 'commands', 'analytics', 'settings', 'profile'];
      if (validPages.includes(hash) && hash !== currentPage) {
        console.log('Hash changed to:', hash);
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  // If user is not authenticated, show login page
  console.log('AppContent render - auth:', isAuthenticated);
  if (!isAuthenticated) {
    console.log('Rendering LoginPage');
    return <LoginPage />;
  }

  const renderCurrentPage = () => {
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

