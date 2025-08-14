import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const TestPage = () => {
  const handleReload = () => {
    console.log('Reloading page...');
    window.location.reload();
  };

  const handleNavigate = (page) => {
    console.log('Navigating to:', page);
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
          <CardDescription>
            This page is used to test routing and page reload behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleNavigate('dashboard')}>
              Go to Dashboard
            </Button>
            <Button onClick={() => handleNavigate('servers')}>
              Go to Servers
            </Button>
            <Button onClick={() => handleNavigate('commands')}>
              Go to Commands
            </Button>
            <Button onClick={() => handleNavigate('analytics')}>
              Go to Analytics
            </Button>
            <Button onClick={() => handleNavigate('settings')}>
              Go to Settings
            </Button>
            <Button onClick={() => handleNavigate('profile')}>
              Go to Profile
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <Button onClick={handleReload} variant="destructive">
              Test Page Reload
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Click this button to test if the page reload preserves your current location.
              You should stay on this test page after reload.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;