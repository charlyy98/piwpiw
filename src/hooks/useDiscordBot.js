import { useState, useEffect, useCallback } from 'react';

// Custom hook for Discord Bot real data integration
export const useDiscordBot = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const { 
    immediate = true, 
    refreshInterval = 30000, // 30 seconds default
    onSuccess = null,
    onError = null 
  } = options;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from real bot integration server
      const response = await fetch(`http://localhost:3002${endpoint}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          setData(result);
          setLastFetch(new Date());
          if (onSuccess) onSuccess(result);
          console.log(`✅ Real Discord bot data fetched from ${endpoint}:`, result);
        } else {
          setError(result.error || 'API call failed');
          if (onError) onError(result.error);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.warn(`⚠️ Failed to fetch real bot data from ${endpoint}:`, err.message);
      setError(err.message);
      if (onError) onError(err.message);
      
      // Return null to indicate fallback to mock data
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint, onSuccess, onError]);

  // Initial fetch
  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  // Auto-refresh interval
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastFetch,
    refetch: fetchData,
    isStale: lastFetch && (Date.now() - lastFetch.getTime()) > 60000 // 1 minute
  };
};

// Specialized hooks for different Discord bot data
export const useBotStatus = (options = {}) => {
  return useDiscordBot('/api/bot/real-status', {
    refreshInterval: 10000, // Refresh every 10 seconds
    ...options
  });
};

export const useBotServers = (options = {}) => {
  return useDiscordBot('/api/servers/real', {
    refreshInterval: 30000, // Refresh every 30 seconds
    ...options
  });
};

export const useBotAnalytics = (options = {}) => {
  return useDiscordBot('/api/analytics/real', {
    refreshInterval: 45000, // Refresh every 45 seconds
    ...options
  });
};

export const useBotCommands = (options = {}) => {
  return useDiscordBot('/api/commands/real', {
    refreshInterval: 60000, // Refresh every minute
    ...options
  });
};

export default useDiscordBot;