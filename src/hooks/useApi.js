import { useState, useEffect, useCallback } from 'react';
import { mockApi, apiCall } from '../api/mockApi';

// Custom hook for API data fetching with loading states
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const { 
    immediate = true, 
    refreshInterval = null,
    onSuccess = null,
    onError = null 
  } = options;

  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall(apiFunction, ...args);
      
      if (result.success) {
        setData(result.data);
        setLastFetch(new Date());
        if (onSuccess) onSuccess(result.data);
      } else {
        setError(result.error || 'API call failed');
        if (onError) onError(result.error);
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  // Initial fetch
  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

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

// Specialized hooks for different data types
export const useStats = (options = {}) => {
  return useApi(mockApi.getStats, [], {
    refreshInterval: 30000, // Refresh every 30 seconds
    ...options
  });
};

export const usePerformanceMetrics = (options = {}) => {
  return useApi(mockApi.getPerformanceMetrics, [], {
    refreshInterval: 15000, // Refresh every 15 seconds
    ...options
  });
};

export const useUserGrowth = (period = '7d', options = {}) => {
  return useApi(mockApi.getUserGrowth, [period], {
    refreshInterval: 60000, // Refresh every minute
    ...options
  });
};

export const useCommandUsage = (options = {}) => {
  return useApi(mockApi.getCommandUsage, [], {
    refreshInterval: 45000, // Refresh every 45 seconds
    ...options
  });
};

export const useServers = (options = {}) => {
  return useApi(mockApi.getServers, [], {
    refreshInterval: 10000, // Refresh every 10 seconds for testing
    ...options
  });
};

export const useNotifications = (options = {}) => {
  return useApi(mockApi.getNotifications, [], {
    refreshInterval: 10000, // Refresh every 10 seconds
    ...options
  });
};

export const useSystemStatus = (options = {}) => {
  return useApi(mockApi.getSystemStatus, [], {
    refreshInterval: 5000, // Refresh every 5 seconds
    ...options
  });
};

// Hook for manual API calls (mutations)
export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall(apiFunction, ...args);
      
      if (result.success) {
        return result;
      } else {
        setError(result.error || 'API call failed');
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mutate,
    loading,
    error
  };
};

export default useApi;