import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TrendingUp,
  Users,
  Terminal,
  Calendar,
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Sparkles,
  Crown,
  GamepadIcon,
  Zap,
  Eye,
  TrendingDown,
  Filter,
  RefreshCw,
  Settings,
  Target,
  Layers,
  Clock,
  Globe,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle,
  TrendingUpIcon,
  BarChart4,
  LineChart as LineChartIcon,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Save,
  X
} from 'lucide-react';
import mockData from '../data/mockData.json';

const AnalyticsPage = () => {
  const { t } = useApp();
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  // Enhanced Professional Features
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(['users', 'commands', 'success_rate']);
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed, custom
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [expandedCharts, setExpandedCharts] = useState(new Set());
  const [exportStatus, setExportStatus] = useState(null); // null, 'preparing', 'downloading', 'success', 'error'
  const [exportProgress, setExportProgress] = useState(0);
  const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'success', 'error'
  const [savedDashboards, setSavedDashboards] = useState([]);

  const timeRanges = [
    { value: '1h', label: '1 Hour', icon: Clock },
    { value: '24h', label: '24 Hours', icon: Calendar },
    { value: '7d', label: '7 Days', icon: Calendar },
    { value: '30d', label: '30 Days', icon: Calendar },
    { value: '90d', label: '90 Days', icon: Calendar },
    { value: 'custom', label: 'Custom Range', icon: Settings }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', color: '#6366f1' }, // Indigo
    { value: 'Games', label: 'Games', color: '#ec4899' }, // Pink
    { value: 'Economy', label: 'Economy', color: '#10b981' }, // Emerald
    { value: 'Utility', label: 'Utility', color: '#f59e0b' }, // Amber
    { value: 'MiniGames', label: 'Mini Games', color: '#8b5cf6' }, // Violet
    { value: 'Detective', label: 'Detective', color: '#ef4444' } // Red
  ];

  // Create category color mapping
  const categoryColors = {
    'Games': '#ec4899',
    'Economy': '#10b981',
    'Utility': '#f59e0b',
    'MiniGames': '#8b5cf6',
    'Detective': '#ef4444'
  };

  const metricOptions = [
    { value: 'users', label: 'Active Users', icon: Users },
    { value: 'commands', label: 'Command Usage', icon: Terminal },
    { value: 'success_rate', label: 'Success Rate', icon: CheckCircle },
    { value: 'response_time', label: 'Response Time', icon: Zap },
    { value: 'errors', label: 'Error Rate', icon: AlertCircle },
    { value: 'engagement', label: 'User Engagement', icon: Activity }
  ];

  // Enhanced color scheme
  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(340, 75%, 55%)'
  ];



  // Real-time data updates
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    if (!isRealTimeEnabled || !isAutoRefresh) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
      setAnimationKey(prev => prev + 1);

      // Simulate connection status changes occasionally
      if (Math.random() < 0.05) {
        setConnectionStatus(prev => prev === 'connected' ? 'reconnecting' : 'connected');
        setTimeout(() => setConnectionStatus('connected'), 2000);
      }
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled, isAutoRefresh, refreshInterval]);

  // Keyboard shortcuts for export
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + E for quick export
      if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        event.preventDefault();
        if (!isLoading) {
          exportData('auto');
        }
      }
      // Ctrl/Cmd + Shift + E for CSV export
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        if (!isLoading) {
          exportData('csv');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLoading]);

  // Enhanced data filtering
  const filteredData = useMemo(() => {
    if (selectedCategory === 'all') return mockData.commands;
    return mockData.commands.filter(cmd => cmd.category === selectedCategory);
  }, [selectedCategory]);

  // Predictive analytics calculation
  const predictiveMetrics = useMemo(() => {
    const recentData = mockData.analytics.dailyUsers.slice(-7);
    const avgGrowth = recentData.reduce((acc, curr, idx) => {
      if (idx === 0) return acc;
      return acc + ((curr.users - recentData[idx - 1].users) / recentData[idx - 1].users);
    }, 0) / (recentData.length - 1);

    const nextWeekPrediction = Math.round(recentData[recentData.length - 1].users * (1 + avgGrowth));

    return {
      growthRate: (avgGrowth * 100).toFixed(1),
      nextWeekUsers: nextWeekPrediction,
      trend: avgGrowth > 0 ? 'increasing' : avgGrowth < 0 ? 'decreasing' : 'stable',
      confidence: Math.min(95, Math.max(60, 85 - Math.abs(avgGrowth * 100)))
    };
  }, [animationKey]);

  // Export Configuration Function
  const handleExportConfig = useCallback(async () => {
    setExportStatus('preparing');
    setExportProgress(0);

    try {
      // Simulate export preparation
      const config = {
        selectedMetrics,
        refreshInterval,
        isAutoRefresh,
        viewMode,
        timeRange,
        selectedCategory,
        comparisonMode,
        isRealTimeEnabled,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      };

      // Simulate progress
      for (let i = 0; i <= 100; i += 20) {
        setExportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Create and download file
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `piwpiw-analytics-config-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportStatus('success');
      setTimeout(() => {
        setExportStatus(null);
        setExportProgress(0);
      }, 2000);

    } catch (error) {
      console.error('Export failed:', error);
      setExportStatus('error');
      setTimeout(() => {
        setExportStatus(null);
        setExportProgress(0);
      }, 3000);
    }
  }, [selectedMetrics, refreshInterval, isAutoRefresh, viewMode, timeRange, selectedCategory, comparisonMode, isRealTimeEnabled]);

  // Save Dashboard Function
  const handleSaveDashboard = useCallback(async () => {
    setSaveStatus('saving');

    try {
      const dashboardConfig = {
        id: Date.now().toString(),
        name: `Custom Dashboard ${savedDashboards.length + 1}`,
        selectedMetrics,
        refreshInterval,
        isAutoRefresh,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to localStorage (in real app, this would be API call)
      const existingDashboards = JSON.parse(localStorage.getItem('piwpiw-dashboards') || '[]');
      const updatedDashboards = [...existingDashboards, dashboardConfig];
      localStorage.setItem('piwpiw-dashboards', JSON.stringify(updatedDashboards));

      setSavedDashboards(updatedDashboards);
      setSaveStatus('success');

      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  }, [selectedMetrics, refreshInterval, isAutoRefresh, savedDashboards.length]);

  // Import Configuration Function
  const handleImportConfig = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);

        // Validate config structure
        if (config.selectedMetrics && Array.isArray(config.selectedMetrics)) {
          setSelectedMetrics(config.selectedMetrics);
        }
        if (config.refreshInterval && typeof config.refreshInterval === 'number') {
          setRefreshInterval(config.refreshInterval);
        }
        if (typeof config.isAutoRefresh === 'boolean') {
          setIsAutoRefresh(config.isAutoRefresh);
        }
        if (config.viewMode) {
          setViewMode(config.viewMode);
        }
        if (config.timeRange) {
          setTimeRange(config.timeRange);
        }
        if (config.selectedCategory) {
          setSelectedCategory(config.selectedCategory);
        }
        if (typeof config.comparisonMode === 'boolean') {
          setComparisonMode(config.comparisonMode);
        }
        if (typeof config.isRealTimeEnabled === 'boolean') {
          setIsRealTimeEnabled(config.isRealTimeEnabled);
        }

        // Show success feedback
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 2000);

      } catch (error) {
        console.error('Import failed:', error);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
  }, []);

  // Load saved dashboards on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('piwpiw-dashboards') || '[]');
    setSavedDashboards(saved);
  }, []);

  // Toggle chart expansion
  const toggleChartExpansion = useCallback((chartId) => {
    setExpandedCharts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chartId)) {
        newSet.delete(chartId);
      } else {
        newSet.add(chartId);
      }
      return newSet;
    });
  }, []);

  // Manual refresh function
  const handleManualRefresh = useCallback(() => {
    setIsLoading(true);
    setLastUpdated(new Date());
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Enhanced pie chart data with better categorization
  const commandCategoryData = mockData.commands.reduce((acc, command) => {
    const existing = acc.find(item => item.name === command.category);
    if (existing) {
      existing.value += command.usageCount;
      existing.count += 1;
    } else {
      acc.push({ 
        name: command.category, 
        value: command.usageCount,
        count: 1,
        color: categoryColors[command.category] || COLORS[acc.length % COLORS.length]
      });
    }
    return acc;
  }, []);

  // Calculate total commands and usage
  const totalCommands = mockData.commands.length;
  const totalUsage = mockData.commands.reduce((sum, cmd) => sum + cmd.usageCount, 0);
  const avgUsagePerCommand = Math.round(totalUsage / totalCommands);

  // Enhanced metrics calculation
  const topCategories = commandCategoryData.sort((a, b) => b.value - a.value);
  const mostPopularCategory = topCategories[0];
  const leastPopularCategory = topCategories[topCategories.length - 1];

  // Enhanced data processing for better analytics
  const commandsByCategory = mockData.commands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {});

  const colorSchemes = {
    blue: {
      gradient: 'from-white via-blue-50/30 to-blue-100/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-blue-900/30',
      border: 'border-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    green: {
      gradient: 'from-white via-green-50/30 to-green-100/50 dark:from-slate-900 dark:via-green-950/30 dark:to-green-900/30',
      border: 'border-green-500',
      iconBg: 'bg-green-100 dark:bg-green-500/20 border border-green-200 dark:border-green-400/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    yellow: {
      gradient: 'from-white via-yellow-50/30 to-yellow-100/50 dark:from-slate-900 dark:via-yellow-950/30 dark:to-yellow-900/30',
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-100 dark:bg-yellow-500/20 border border-yellow-200 dark:border-yellow-400/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    purple: {
      gradient: 'from-white via-purple-50/30 to-purple-100/50 dark:from-slate-900 dark:via-purple-950/30 dark:to-purple-900/30',
      border: 'border-purple-500',
      iconBg: 'bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-400/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
  };

  const mostPopularCommand = { name: 'N/A', usage: 0 };
  if (mockData.commands.length > 0) {
    const sortedCommands = [...mockData.commands].sort((a, b) => b.usageCount - a.usageCount);
    mostPopularCommand.name = sortedCommands[0].name;
    mostPopularCommand.usage = sortedCommands[0].usageCount;
  }

  const categoryColorMap = {};
  commandCategoryData.forEach(item => {
    categoryColorMap[item.name] = categoryColors[item.name] || item.color;
  });

  // Time range data simulation
  const getDataForTimeRange = (range) => {
    switch(range) {
      case '24h':
        return {
          users: mockData.analytics.dailyUsers.slice(-1),
          growth: '+5.2%',
          commands: '1,428',
          commandGrowth: '+8.1%'
        };
      case '30d':
        return {
          users: mockData.analytics.dailyUsers,
          growth: '+25.8%',
          commands: '45,892',
          commandGrowth: '+32.4%'
        };
      case '90d':
        return {
          users: mockData.analytics.dailyUsers,
          growth: '+78.3%',
          commands: '142,567',
          commandGrowth: '+89.2%'
        };
      default:
        return {
          users: mockData.analytics.dailyUsers,
          growth: '+12.5%',
          commands: '9,856',
          commandGrowth: '+15.3%'
        };
    }
  };

  const currentData = getDataForTimeRange(timeRange);

  const exportData = async (format = 'json') => {
    console.log('🚀 Export started with format:', format);
    setIsLoading(true);
    setExportStatus('preparing');
    setExportProgress(0);

    try {
      // Simple progress updates
      setExportProgress(25);
      setExportStatus('collecting');

      // Simple data preparation
      const simpleData = {
        exportDate: new Date().toISOString(),
        format: format,
        totalCommands: filteredData.length,
        commands: filteredData.slice(0, 10), // Just first 10 for testing
        message: 'PiwPiw Analytics Export - Test Data'
      };

      console.log('📊 Data prepared:', simpleData);

      setExportProgress(50);
      setExportStatus('generating');

      // Short delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setExportProgress(75);
      setExportStatus('downloading');

      // File generation based on format
      let dataStr = '';
      let mimeType = 'application/json';
      let fileExtension = 'json';

      if (format === 'csv') {
        dataStr = 'Command,Category,Usage,Last Used\n' +
                 filteredData.slice(0, 10).map(cmd =>
                   `"${cmd.name}","${cmd.category}",${cmd.usageCount},"${new Date().toLocaleDateString()}"`
                 ).join('\n');
        mimeType = 'text/csv';
        fileExtension = 'csv';
      } else if (format === 'excel') {
        // Excel format (CSV with Excel-specific formatting)
        dataStr = 'Command\tCategory\tUsage Count\tLast Used\tSuccess Rate\n' +
                 filteredData.slice(0, 15).map(cmd =>
                   `${cmd.name}\t${cmd.category}\t${cmd.usageCount}\t${new Date().toLocaleDateString()}\t95%`
                 ).join('\n');
        mimeType = 'application/vnd.ms-excel';
        fileExtension = 'xls';
      } else if (format === 'pdf') {
        // PDF content (HTML-like structure for simple PDF)
        dataStr = `<!DOCTYPE html>
<html>
<head>
    <title>PiwPiw Analytics Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; border-bottom: 2px solid #007bff; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f8f9fa; }
        .summary { background-color: #e9ecef; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🎯 PiwPiw Analytics Report</h1>
    <div class="summary">
        <h3>📊 Summary</h3>
        <p><strong>Export Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Total Commands:</strong> ${filteredData.length}</p>
        <p><strong>Time Range:</strong> ${timeRange}</p>
    </div>
    <h3>📋 Top Commands</h3>
    <table>
        <tr><th>Command</th><th>Category</th><th>Usage Count</th><th>Last Used</th></tr>
        ${filteredData.slice(0, 10).map(cmd =>
          `<tr><td>${cmd.name}</td><td>${cmd.category}</td><td>${cmd.usageCount}</td><td>${new Date().toLocaleDateString()}</td></tr>`
        ).join('')}
    </table>
</body>
</html>`;
        mimeType = 'text/html';
        fileExtension = 'html';
      } else {
        dataStr = JSON.stringify(simpleData, null, 2);
      }

      console.log('📄 File content prepared, length:', dataStr.length);

      // Create and trigger download
      const dataBlob = new Blob([dataStr], { type: mimeType });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `piwpiw-export-${format}-${Date.now()}.${fileExtension}`;

      console.log('🔗 Download link created:', link.download);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportProgress(100);
      setExportStatus('success');

      console.log('✅ Export completed successfully!');

      // Reset after success
      setTimeout(() => {
        setExportStatus(null);
        setExportProgress(0);
      }, 2000);

    } catch (error) {
      console.error('❌ Export failed:', error);
      setExportStatus('error');
      setTimeout(() => {
        setExportStatus(null);
        setExportProgress(0);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for different export formats
  const generateCSV = (data) => {
    // Commands data
    const commandHeaders = ['Command', 'Category', 'Usage Count', 'Last Used', 'Success Rate', 'Avg Response Time'];
    const commandRows = data.analytics.commands.map(cmd => [
      cmd.name,
      cmd.category,
      cmd.usageCount,
      cmd.lastUsed || 'N/A',
      '95%', // Mock success rate
      `${Math.floor(Math.random() * 500 + 100)}ms` // Mock response time
    ]);

    // Analytics summary
    const summaryHeaders = ['Metric', 'Value'];
    const summaryRows = [
      ['Total Commands', data.metadata.totalCommands],
      ['Total Usage', data.metadata.totalUsage],
      ['Export Date', data.metadata.exportDate],
      ['Time Range', data.metadata.timeRange],
      ['Selected Category', data.metadata.selectedCategory],
      ['Success Rate', data.analytics.successRate.percentage + '%'],
      ['Growth Rate', data.insights.growthRate],
      ['Confidence Level', data.insights.predictions.confidence + '%']
    ];

    // Combine all sections
    const csvContent = [
      '# PiwPiw Analytics Export',
      '# Generated on: ' + new Date().toLocaleString(),
      '',
      '## Summary',
      summaryHeaders.join(','),
      ...summaryRows.map(row => row.map(field => `"${field}"`).join(',')),
      '',
      '## Commands Detail',
      commandHeaders.join(','),
      ...commandRows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    return csvContent;
  };

  const generateJSON = (data) => {
    return JSON.stringify(data, null, 2);
  };

  const generatePDF = (data) => {
    // Generate PDF-like text content (in real app, would use jsPDF)
    const pdfContent = [
      '='.repeat(60),
      '           PIWPIW ANALYTICS REPORT',
      '='.repeat(60),
      '',
      `Generated: ${new Date().toLocaleString()}`,
      `Time Range: ${data.metadata.timeRange}`,
      `Category Filter: ${data.metadata.selectedCategory}`,
      '',
      '📊 EXECUTIVE SUMMARY',
      '-'.repeat(30),
      `• Total Commands: ${data.metadata.totalCommands}`,
      `• Total Usage: ${data.metadata.totalUsage.toLocaleString()}`,
      `• Success Rate: ${data.analytics.successRate.percentage}%`,
      `• Growth Rate: ${data.insights.growthRate}`,
      `• Confidence Level: ${data.insights.predictions.confidence}%`,
      '',
      '🏆 TOP PERFORMING COMMANDS',
      '-'.repeat(30),
      ...data.analytics.commands.slice(0, 5).map((cmd, i) =>
        `${i + 1}. ${cmd.name} (${cmd.category}) - ${cmd.usageCount} uses`
      ),
      '',
      '📈 CATEGORY BREAKDOWN',
      '-'.repeat(30),
      ...data.analytics.categoryBreakdown.map(cat => {
        const percentage = ((cat.value / data.metadata.totalUsage) * 100).toFixed(1);
        return `• ${cat.name}: ${cat.value} commands (${percentage}%)`;
      }),
      '',
      '🔮 PREDICTIONS',
      '-'.repeat(30),
      `• Next Week Users: ${data.insights.predictions.nextWeekUsers}`,
      `• Trend: ${data.insights.predictions.trend}`,
      `• Confidence: ${data.insights.predictions.confidence}%`,
      '',
      '='.repeat(60),
      '           End of Report',
      '='.repeat(60)
    ];

    return pdfContent.join('\n');
  };

  const generateExcel = (data) => {
    // Generate Excel-compatible CSV with multiple sheets simulation
    const sheets = [];

    // Sheet 1: Summary
    sheets.push('## SHEET: Summary');
    sheets.push('Metric,Value');
    sheets.push(`Total Commands,${data.metadata.totalCommands}`);
    sheets.push(`Total Usage,${data.metadata.totalUsage}`);
    sheets.push(`Export Date,${data.metadata.exportDate}`);
    sheets.push(`Time Range,${data.metadata.timeRange}`);
    sheets.push(`Selected Category,${data.metadata.selectedCategory}`);
    sheets.push(`Success Rate,${data.analytics.successRate.percentage}%`);
    sheets.push(`Growth Rate,${data.insights.growthRate}`);
    sheets.push(`Confidence Level,${data.insights.predictions.confidence}%`);
    sheets.push('');

    // Sheet 2: Commands
    sheets.push('## SHEET: Commands');
    sheets.push('Command,Category,Usage Count,Last Used,Success Rate,Response Time');
    data.analytics.commands.forEach(cmd => {
      sheets.push(`"${cmd.name}","${cmd.category}",${cmd.usageCount},"${cmd.lastUsed || 'N/A'}","95%","${Math.floor(Math.random() * 500 + 100)}ms"`);
    });
    sheets.push('');

    // Sheet 3: Category Breakdown
    sheets.push('## SHEET: Categories');
    sheets.push('Category,Command Count,Usage Percentage');
    data.analytics.categoryBreakdown.forEach(cat => {
      const percentage = ((cat.value / data.metadata.totalUsage) * 100).toFixed(2);
      sheets.push(`"${cat.name}",${cat.value},"${percentage}%"`);
    });

    return sheets.join('\n');
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    setAnimationKey(prev => prev + 1); // Trigger re-animation
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Professional Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 p-6 border-l-4 border-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
        <div className="relative space-y-6">
          {/* Title and Status Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold piwpiw-text-gradient">
                  Professional Analytics
                </h2>
                <div className="flex items-center space-x-2">
                  {connectionStatus === 'connected' && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Wifi className="h-4 w-4" />
                      <span className="text-xs font-medium">Live</span>
                    </div>
                  )}
                  {connectionStatus === 'reconnecting' && (
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <WifiOff className="h-4 w-4" />
                      <span className="text-xs font-medium">Reconnecting...</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-400">
                📊 Real-time insights across {totalCommands} commands • Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{totalUsage.toLocaleString()}</span>
                  <span className="text-slate-700 dark:text-slate-400">total usages</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{avgUsagePerCommand}</span>
                  <span className="text-slate-700 dark:text-slate-400">avg per command</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUpIcon className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{predictiveMetrics.growthRate}%</span>
                  <span className="text-slate-700 dark:text-slate-400">growth rate</span>
                </div>
              </div>
            </div>

            {/* Real-time Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Label htmlFor="realtime" className="text-sm font-medium">Real-time</Label>
                <Switch
                  id="realtime"
                  checked={isRealTimeEnabled}
                  onCheckedChange={setIsRealTimeEnabled}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualRefresh}
                disabled={isLoading}
                className="hover:scale-105 transition-all duration-300"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Enhanced Professional Filter Controls */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/50 p-6 border border-blue-200/30 dark:border-slate-700/50 shadow-lg backdrop-blur-sm">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/5 to-orange-400/5 dark:from-pink-400/20 dark:to-orange-400/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl border border-blue-200/50 dark:border-blue-400/30">
                    <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                      Advanced Analytics Filters
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-400">
                      Customize your data view with professional filtering options
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-600/50">
                    {filteredData.length} commands
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all');
                      setTimeRange('7d');
                      setViewMode('overview');
                      setComparisonMode(false);
                    }}
                    className="text-xs text-slate-700 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Enhanced Filter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Time Range Filter */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">TIME RANGE</Label>
                  </div>
                  <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                    <SelectTrigger className="h-11 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 shadow-sm text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {timeRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value} className="hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-900 dark:text-slate-100">
                          <div className="flex items-center space-x-3">
                            <range.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <div className="flex flex-col">
                              <span className="font-medium">{range.label}</span>
                              <span className="text-xs text-slate-700 dark:text-slate-400">
                                {range.value === '1h' ? 'Last hour data' :
                                 range.value === '24h' ? 'Last 24 hours' :
                                 range.value === '7d' ? 'Past week' :
                                 range.value === '30d' ? 'Past month' :
                                 range.value === '90d' ? 'Past quarter' :
                                 'Custom date range'}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-slate-700 dark:text-slate-400 flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                    <span>
                      {timeRange === '1h' ? '60 data points' :
                       timeRange === '24h' ? '24 data points' :
                       timeRange === '7d' ? '7 data points' :
                       timeRange === '30d' ? '30 data points' :
                       timeRange === '90d' ? '90 data points' :
                       'Variable points'}
                    </span>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">CATEGORY</Label>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-11 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 shadow-sm text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value} className="hover:bg-purple-50 dark:hover:bg-purple-900/30 text-slate-900 dark:text-slate-100">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 shadow-md ring-1 ring-slate-300 dark:ring-slate-600"
                              style={{ backgroundColor: category.color }}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{category.label}</span>
                              <span className="text-xs text-slate-700 dark:text-slate-400">
                                {category.value === 'all' ? 'All command types' :
                                 `${mockData.commands.filter(cmd => cmd.category === category.value).length} commands`}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-slate-700 dark:text-slate-400 flex items-center space-x-1">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 shadow-sm ring-1 ring-slate-300 dark:ring-slate-600"
                      style={{ backgroundColor: categories.find(c => c.value === selectedCategory)?.color || '#6366f1' }}
                    ></div>
                    <span>
                      {selectedCategory === 'all'
                        ? `${mockData.commands.length} total commands`
                        : `${filteredData.length} filtered commands`}
                    </span>
                  </div>
                </div>

                {/* View Mode Filter */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">VIEW MODE</Label>
                  </div>
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="h-11 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-500 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 shadow-sm text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select view mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <SelectItem value="overview" className="hover:bg-green-50 dark:hover:bg-green-900/30 text-slate-900 dark:text-slate-100">
                        <div className="flex items-center space-x-3">
                          <BarChart4 className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <div className="flex flex-col">
                            <span className="font-medium">Overview</span>
                            <span className="text-xs text-slate-700 dark:text-slate-400">Standard analytics view</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="detailed" className="hover:bg-green-50 dark:hover:bg-green-900/30 text-slate-900 dark:text-slate-100">
                        <div className="flex items-center space-x-3">
                          <Layers className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <div className="flex flex-col">
                            <span className="font-medium">Detailed</span>
                            <span className="text-xs text-slate-700 dark:text-slate-400">Advanced charts & analysis</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="custom" className="hover:bg-green-50 dark:hover:bg-green-900/30 text-slate-900 dark:text-slate-100">
                        <div className="flex items-center space-x-3">
                          <Settings className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <div className="flex flex-col">
                            <span className="font-medium">Custom</span>
                            <span className="text-xs text-slate-700 dark:text-slate-400">Build your own dashboard</span>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-slate-700 dark:text-slate-400 flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                    <span>
                      {viewMode === 'overview' ? 'Standard metrics' :
                       viewMode === 'detailed' ? 'Advanced analytics' :
                       'Custom configuration'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">ACTIONS</Label>
                  </div>
                  <div className="space-y-2">
                    {/* Export Buttons Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          console.log('🔵 JSON Export clicked');
                          exportData('json');
                        }}
                        disabled={isLoading}
                        className="h-11 bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        JSON
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          console.log('🟢 CSV Export clicked');
                          exportData('csv');
                        }}
                        disabled={isLoading}
                        className="h-11 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-800 dark:text-green-200"
                      >
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        CSV
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          console.log('🟠 Excel Export clicked');
                          exportData('excel');
                        }}
                        disabled={isLoading}
                        className="h-11 bg-orange-50 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-orange-800 dark:text-orange-200"
                      >
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Excel
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          console.log('🔴 PDF Export clicked');
                          exportData('pdf');
                        }}
                        disabled={isLoading}
                        className="h-11 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-800 dark:text-red-200"
                      >
                        <FileImage className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </div>

                    {/* Progress Display */}
                    {isLoading && (
                      <div className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin text-blue-600"></div>
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {exportStatus === 'preparing' && 'Preparing export...'}
                            {exportStatus === 'collecting' && 'Collecting data...'}
                            {exportStatus === 'processing' && 'Processing...'}
                            {exportStatus === 'generating' && 'Generating file...'}
                            {exportStatus === 'downloading' && 'Downloading...'}
                            {exportStatus === 'success' && '✅ Export completed!'}
                            {exportStatus === 'error' && '❌ Export failed'}
                          </span>
                        </div>
                        {exportProgress > 0 && (
                          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${exportProgress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Export Status Indicator */}
                    {exportStatus && (
                      <div className={`text-xs p-2 rounded-lg border transition-all duration-300 ${
                        exportStatus === 'success' ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-600/50 text-green-700 dark:text-green-400' :
                        exportStatus === 'error' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-600/50 text-red-700 dark:text-red-400' :
                        'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-600/50 text-blue-700 dark:text-blue-400'
                      }`}>
                        <div className="flex items-center space-x-2">
                          {exportStatus === 'success' && <span>✅</span>}
                          {exportStatus === 'error' && <span>❌</span>}
                          {!['success', 'error'].includes(exportStatus) && (
                            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                          )}
                          <span>
                            {exportStatus === 'preparing' && 'Preparing export...'}
                            {exportStatus === 'collecting' && 'Collecting analytics data...'}
                            {exportStatus === 'processing' && 'Processing filters...'}
                            {exportStatus === 'generating' && 'Generating file...'}
                            {exportStatus === 'downloading' && 'Starting download...'}
                            {exportStatus === 'success' && 'Export completed successfully!'}
                            {exportStatus === 'error' && 'Export failed. Please try again.'}
                          </span>
                        </div>
                        {exportProgress > 0 && exportStatus !== 'success' && exportStatus !== 'error' && (
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-2">
                            <div
                              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${exportProgress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setComparisonMode(!comparisonMode)}
                      className={`w-full h-11 transition-all duration-300 shadow-sm ${
                        comparisonMode
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400 hover:scale-105'
                          : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:border-orange-400 dark:hover:border-orange-500 hover:scale-105 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      <BarChart4 className="mr-2 h-4 w-4" />
                      {comparisonMode ? 'Exit Compare' : 'Compare Mode'}
                    </Button>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400"></div>
                    <span>
                      {comparisonMode ? 'Comparison active' : 'Standard mode'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {filteredData.reduce((sum, cmd) => sum + cmd.usageCount, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-400">Total Usage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {filteredData.length}
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-400">Commands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {Math.round(filteredData.reduce((sum, cmd) => sum + cmd.usageCount, 0) / filteredData.length || 0)}
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-400">Avg Usage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      {isRealTimeEnabled ? 'Live' : 'Static'}
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-400">Data Mode</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Predictive Analytics Section */}
      <Card className="piwpiw-card-hover bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-950/30 dark:to-purple-950/30 border border-slate-200 dark:border-slate-700 border-l-4 border-indigo-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg border border-indigo-200 dark:border-indigo-400/30">
                <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-slate-800 dark:text-slate-100">Predictive Analytics & Forecasting</span>
            </CardTitle>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-600/50">
              AI-Powered
            </Badge>
          </div>
          <CardDescription className="text-slate-700 dark:text-slate-400">
            🔮 Machine learning predictions based on historical data patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <TrendingUpIcon className="h-5 w-5 text-indigo-500" />
                <span className="font-medium text-slate-800 dark:text-slate-200">Growth Forecast</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {predictiveMetrics.nextWeekUsers.toLocaleString()}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-400">
                  Predicted users next week
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    predictiveMetrics.trend === 'increasing' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    predictiveMetrics.trend === 'decreasing' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {predictiveMetrics.trend}
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-400">
                    {predictiveMetrics.confidence}% confidence
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-500" />
                <span className="font-medium text-slate-800 dark:text-slate-200">Usage Patterns</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {(parseFloat(predictiveMetrics.growthRate) * 7).toFixed(1)}%
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-400">
                  Weekly growth rate
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, Math.abs(parseFloat(predictiveMetrics.growthRate)) * 10)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span className="font-medium text-slate-800 dark:text-slate-200">Risk Assessment</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {predictiveMetrics.confidence > 80 ? 'Low' : predictiveMetrics.confidence > 60 ? 'Medium' : 'High'}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-400">
                  Prediction risk level
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 w-4 rounded-sm ${
                        level <= (predictiveMetrics.confidence > 80 ? 2 : predictiveMetrics.confidence > 60 ? 3 : 4)
                          ? 'bg-orange-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Commands",
            value: totalCommands,
            icon: PieChartIcon,
            color: "blue",
            suffix: " commands",
            change: "+12%",
            changeType: "positive",
            description: "Active command count"
          },
          {
            title: "Total Usage",
            value: totalUsage.toLocaleString(),
            icon: Activity,
            color: "green",
            suffix: " uses",
            change: "+25%",
            changeType: "positive",
            description: "All-time command executions"
          },
          {
            title: "Most Popular",
            value: mostPopularCommand.name,
            icon: Crown,
            color: "yellow",
            suffix: ` (${mostPopularCommand.usage})`,
            change: "Top performer",
            changeType: "neutral",
            description: "Highest usage command"
          },
          {
            title: "Active Categories",
            value: Object.keys(commandsByCategory).length,
            icon: GamepadIcon,
            color: "purple",
            suffix: " categories",
            change: "+2 new",
            changeType: "positive",
            description: "Command categories"
          }
        ].map((metric, index) => {
          const isExpanded = expandedCharts.has(`metric-${index}`);
          return (
            <Card
              key={metric.title}
              className={`relative overflow-hidden piwpiw-card-hover bg-gradient-to-br ${colorSchemes[metric.color].gradient} border-l-4 ${colorSchemes[metric.color].border} transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer group`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => toggleChartExpansion(`metric-${index}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-300">
                  {metric.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${colorSchemes[metric.color].iconBg}`}>
                    <metric.icon className={`h-4 w-4 ${colorSchemes[metric.color].iconColor}`} />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-slate-800 dark:text-slate-400"
                  >
                    {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {typeof metric.value === 'number' && metric.value > 999
                        ? `${(metric.value / 1000).toFixed(1)}k`
                        : metric.value}
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-400">
                      {metric.suffix}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-400">
                    {metric.description}
                  </p>
                  <div className={`flex items-center space-x-1 text-xs font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
                    metric.changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`}>
                    {metric.changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
                    {metric.changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
                    {metric.changeType === 'neutral' && <Eye className="h-3 w-3" />}
                    <span>{metric.change}</span>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-300/50 dark:border-white/20 space-y-2 animate-fade-in">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">Today:</span>
                          <div className="font-medium text-slate-900 dark:text-slate-200">
                            {typeof metric.value === 'number' ? (metric.value * 0.1).toFixed(0) : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">Yesterday:</span>
                          <div className="font-medium text-slate-900 dark:text-slate-200">
                            {typeof metric.value === 'number' ? (metric.value * 0.09).toFixed(0) : 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-300/50 dark:bg-white/20 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-1000 ${
                            metric.changeType === 'positive' ? 'bg-green-500' :
                            metric.changeType === 'negative' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(100, Math.abs(parseFloat(metric.change.replace(/[^0-9.-]/g, ''))) * 5)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Professional Tabbed Analytics Interface */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart4 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="detailed" className="flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span>Detailed</span>
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Custom</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {isRealTimeEnabled ? 'Live Data' : 'Static Data'}
            </Badge>
            {comparisonMode && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                Comparison Mode
              </Badge>
            )}
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Charts Section */}
          <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Daily Users Trend */}
          <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '200ms' }}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg border border-blue-200 dark:border-blue-400/30">
                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-slate-800 dark:text-slate-100">Daily Active Users</span>
                </CardTitle>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-600/50">
                  +12.5% ↗
                </Badge>
              </div>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                📈 User engagement pattern over the selected time period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockData.analytics.dailyUsers} key={animationKey}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-primary">
                              Users: <span className="font-bold">{payload[0].value}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorUsers)"
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enhanced Command Categories */}
          <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-950/30 dark:to-pink-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '300ms' }}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg border border-purple-200 dark:border-purple-400/30">
                    <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-slate-800 dark:text-slate-100">Command Categories</span>
                </CardTitle>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-600/50">
                  {Object.keys(commandsByCategory).length} categories
                </Badge>
              </div>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                🎯 Distribution of command usage across different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart key={animationKey}>
                  <Pie
                    data={commandCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {commandCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={categoryColors[entry.name] || COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-primary">
                              Usage: <span className="font-bold">{data.value}</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-400">
                              Commands: <span className="font-bold">{data.count}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {commandCategoryData.slice(0, 6).map((category, index) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 shadow-md ring-1 ring-slate-300 dark:ring-slate-600"
                      style={{ backgroundColor: categoryColors[category.name] || COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="truncate text-slate-700 dark:text-slate-300">{category.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Command Usage Trend */}
        <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-green-50/30 to-teal-50/30 dark:from-slate-900 dark:via-green-950/30 dark:to-teal-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '400ms' }}>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg border border-green-200 dark:border-green-400/30">
                  <LineChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-slate-800 dark:text-slate-100">Command Usage Trend</span>
              </CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-600/50">
                +15.3% ↗
              </Badge>
            </div>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              📊 Daily command executions over time with trend analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={mockData.analytics.commandUsage} key={animationKey}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{label}</p>
                          <p className="text-primary">
                            Usage: <span className="font-bold">{payload[0].value}</span>
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Daily command executions
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  fill="url(#colorUsage)"
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--chart-2))' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Top Commands by Usage */}
        <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 dark:from-slate-900 dark:via-red-950/30 dark:to-orange-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '500ms' }}>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg border border-red-200 dark:border-red-400/30">
                  <Terminal className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-slate-800 dark:text-slate-100">Top Commands by Usage</span>
              </CardTitle>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-600/50">
                Top 10
              </Badge>
            </div>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              🏆 Most frequently used commands with detailed metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={mockData.commands.sort((a, b) => b.usageCount - a.usageCount).slice(0, 10)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  type="number" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{label}</p>
                          <p className="text-primary">
                            Usage: <span className="font-bold">{payload[0].value}</span>
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Category: {data.category}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="usageCount" 
                  fill="hsl(var(--chart-3))" 
                  barSize={20} 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enhanced Command Success Rate */}
        <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-teal-950/30 dark:to-cyan-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '600ms' }}>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-teal-100 dark:bg-teal-500/20 rounded-lg border border-teal-200 dark:border-teal-400/30">
                  <Zap className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-slate-800 dark:text-slate-100">Command Success Rate</span>
              </CardTitle>
              <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-600/50">
                {((mockData.analytics.successfulCommands / mockData.analytics.totalCommands) * 100).toFixed(1)}%
              </Badge>
            </div>
            <CardDescription className="text-slate-700 dark:text-slate-400">
              ✅ Percentage of commands executed successfully with reliability metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Successful', value: mockData.analytics.successfulCommands, color: 'hsl(var(--chart-4))' },
                    { name: 'Failed', value: mockData.analytics.totalCommands - mockData.analytics.successfulCommands, color: 'hsl(var(--chart-5))' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {[
                    { name: 'Successful', value: mockData.analytics.successfulCommands, color: 'hsl(var(--chart-4))' },
                    { name: 'Failed', value: mockData.analytics.totalCommands - mockData.analytics.successfulCommands, color: 'hsl(var(--chart-5))' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const percentage = ((data.value / mockData.analytics.totalCommands) * 100).toFixed(1);
                      return (
                        <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-primary">
                            Count: <span className="font-bold">{data.value}</span>
                          </p>
                          <p className="text-slate-700 dark:text-slate-400 text-sm">
                            {percentage}% of total
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-4))] mr-2 border border-slate-300 dark:border-slate-600"></div>
                <span className="text-slate-700 dark:text-slate-300">Successful ({mockData.analytics.successfulCommands})</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-5))] mr-2 border border-slate-300 dark:border-slate-600"></div>
                <span className="text-slate-700 dark:text-slate-300">Failed ({mockData.analytics.totalCommands - mockData.analytics.successfulCommands})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced User Engagement Over Time */}
        <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-orange-50/30 to-yellow-50/30 dark:from-slate-900 dark:via-orange-950/30 dark:to-yellow-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '700ms' }}>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg border border-orange-200 dark:border-orange-400/30">
                  <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-slate-800 dark:text-slate-100">User Engagement Over Time</span>
              </CardTitle>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-600/50">
                Daily Average
              </Badge>
            </div>
            <CardDescription className="text-slate-700 dark:text-slate-400">
              📊 Average commands per user per day with engagement trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={mockData.analytics.userEngagement}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{label}</p>
                          <p className="text-primary">
                            Commands/User: <span className="font-bold">{payload[0].value.toFixed(2)}</span>
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Daily engagement metric
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="commandsPerUser" 
                  fill="url(#colorEngagement)" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="commandsPerUser" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6, fill: 'hsl(var(--chart-1))' }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* New Enhanced Performance Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peak Usage Hours */}
        <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 dark:from-slate-900 dark:via-indigo-950/30 dark:to-blue-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '800ms' }}>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg border border-indigo-200 dark:border-indigo-400/30">
                <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-slate-800 dark:text-slate-100">Peak Usage Hours</span>
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              ⏰ Busiest times for bot activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { hour: '8:00 PM', usage: 95, label: 'Peak' },
                { hour: '3:00 PM', usage: 78, label: 'High' },
                { hour: '12:00 PM', usage: 65, label: 'Medium' },
                { hour: '6:00 AM', usage: 32, label: 'Low' }
              ].map((time, index) => (
                <div key={time.hour} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{time.hour}</span>
                    <Badge variant="outline" className="text-xs text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-600">
                      {time.label}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${time.usage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{time.usage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Command Response Times */}
        <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30 dark:from-slate-900 dark:via-emerald-950/30 dark:to-green-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '900ms' }}>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg border border-emerald-200 dark:border-emerald-400/30">
                <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-slate-800 dark:text-slate-100">Response Times</span>
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-400">
              ⚡ Average command execution speed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">47ms</div>
                <div className="text-sm text-slate-700 dark:text-slate-400">Average Response</div>
              </div>
              <div className="space-y-2">
                {[
                  { type: 'Fast', range: '< 50ms', percentage: 85, color: 'bg-emerald-500' },
                  { type: 'Medium', range: '50-200ms', percentage: 12, color: 'bg-yellow-500' },
                  { type: 'Slow', range: '> 200ms', percentage: 3, color: 'bg-red-500' }
                ].map((metric) => (
                  <div key={metric.type} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${metric.color} border border-slate-300 dark:border-slate-600`}></div>
                      <span className="text-slate-700 dark:text-slate-300">{metric.type}</span>
                      <span className="text-slate-600 dark:text-slate-400">({metric.range})</span>
                    </div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{metric.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Analysis */}
        <Card className={`piwpiw-card-hover bg-gradient-to-br from-white via-rose-50/30 to-red-50/30 dark:from-slate-900 dark:via-rose-950/30 dark:to-red-950/30 border border-slate-200 dark:border-slate-700 animate-fade-in-up`} style={{ animationDelay: '1000ms' }}>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-rose-100 dark:bg-rose-500/20 rounded-lg border border-rose-200 dark:border-rose-400/30">
                <Activity className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="text-slate-800 dark:text-slate-100">Error Analysis</span>
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-400">
              🔍 Common error patterns and fixes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { error: 'Permission Denied', count: 23, trend: 'down' },
                { error: 'Rate Limited', count: 12, trend: 'stable' },
                { error: 'Invalid Command', count: 8, trend: 'down' },
                { error: 'Server Timeout', count: 3, trend: 'up' }
              ].map((error, index) => (
                <div key={error.error} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{error.error}</div>
                    <div className="text-xs text-slate-700 dark:text-slate-400">
                      {error.count} occurrences
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        error.trend === 'down' ? 'text-green-600 dark:text-green-400 border-green-300 dark:border-green-600/50' :
                        error.trend === 'up' ? 'text-red-600 dark:text-red-400 border-red-300 dark:border-red-600/50' :
                        'text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600/50'
                      }`}
                    >
                      {error.trend === 'down' ? '↓' : error.trend === 'up' ? '↑' : '→'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </TabsContent>

      <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Analytics View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Advanced Radar Chart */}
            <Card className="piwpiw-card-hover bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg border border-purple-200 dark:border-purple-400/30">
                    <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-slate-800 dark:text-slate-100">Performance Radar</span>
                </CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-400">
                  Multi-dimensional performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={[
                    { subject: 'Speed', A: 85, fullMark: 100 },
                    { subject: 'Reliability', A: 92, fullMark: 100 },
                    { subject: 'Usage', A: 78, fullMark: 100 },
                    { subject: 'Engagement', A: 88, fullMark: 100 },
                    { subject: 'Growth', A: 75, fullMark: 100 },
                    { subject: 'Satisfaction', A: 90, fullMark: 100 }
                  ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Scatter Plot Analysis */}
            <Card className="piwpiw-card-hover bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg border border-green-200 dark:border-green-400/30">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-slate-800 dark:text-slate-100">Usage vs Performance</span>
                </CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-400">
                  Command usage correlation analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={mockData.commands.slice(0, 20).map(cmd => ({
                    usage: cmd.usageCount,
                    performance: Math.random() * 100 + 50,
                    name: cmd.name
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="usage" name="Usage" />
                    <YAxis dataKey="performance" name="Performance" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-primary">Usage: {data.usage}</p>
                              <p className="text-slate-600 dark:text-slate-400">Performance: {data.performance.toFixed(1)}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter dataKey="performance" fill="hsl(var(--chart-1))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
      </TabsContent>

      <TabsContent value="custom" className="space-y-6">
          {/* Professional Custom Analytics Builder */}
          <Card className="piwpiw-card-hover bg-gradient-to-br from-white via-orange-50/30 to-amber-50/30 dark:from-slate-900 dark:via-orange-950/30 dark:to-amber-950/30 border border-slate-200 dark:border-slate-700 border-l-4 border-orange-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg border border-orange-200 dark:border-orange-400/30">
                    <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-slate-800 dark:text-slate-100">Custom Analytics Builder</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-600/50">
                    {selectedMetrics.length} Metrics Selected
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMetrics([])}
                    className="text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
              <CardDescription className="text-slate-700 dark:text-slate-400">
                🎯 Build your own analytics dashboard with custom metrics and real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Configuration Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Metrics Selection */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                        Select Metrics
                      </Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {metricOptions.map((metric) => {
                        const isSelected = selectedMetrics.includes(metric.value);
                        return (
                          <div
                            key={metric.value}
                            className={`relative p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md'
                                : 'border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-600'
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedMetrics(selectedMetrics.filter(m => m !== metric.value));
                              } else {
                                setSelectedMetrics([...selectedMetrics, metric.value]);
                              }
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-100 dark:bg-orange-500/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                <metric.icon className={`h-4 w-4 ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`} />
                              </div>
                              <div className="flex-1">
                                <div className={`font-medium text-sm ${isSelected ? 'text-orange-900 dark:text-orange-100' : 'text-slate-900 dark:text-slate-100'}`}>
                                  {metric.label}
                                </div>
                                <div className={`text-xs ${isSelected ? 'text-orange-700 dark:text-orange-300' : 'text-slate-600 dark:text-slate-400'}`}>
                                  {metric.value === 'users' ? 'Track active user count' :
                                   metric.value === 'commands' ? 'Monitor command usage' :
                                   metric.value === 'success_rate' ? 'Success percentage' :
                                   metric.value === 'response_time' ? 'Average response time' :
                                   metric.value === 'errors' ? 'Error occurrence rate' :
                                   'User engagement metrics'}
                                </div>
                              </div>
                              {isSelected && (
                                <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Settings Panel */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                          Refresh Settings
                        </Label>
                      </div>
                      <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(parseInt(value))}>
                        <SelectTrigger className="h-11 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <SelectItem value="5" className="hover:bg-orange-50 dark:hover:bg-orange-900/30">
                            <div className="flex items-center space-x-2">
                              <Zap className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                              <span>5 seconds (Real-time)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="10" className="hover:bg-orange-50 dark:hover:bg-orange-900/30">
                            <div className="flex items-center space-x-2">
                              <Activity className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                              <span>10 seconds (Fast)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="30" className="hover:bg-orange-50 dark:hover:bg-orange-900/30">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                              <span>30 seconds (Standard)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="60" className="hover:bg-orange-50 dark:hover:bg-orange-900/30">
                            <div className="flex items-center space-x-2">
                              <Timer className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                              <span>1 minute (Balanced)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="300" className="hover:bg-orange-50 dark:hover:bg-orange-900/30">
                            <div className="flex items-center space-x-2">
                              <Pause className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                              <span>5 minutes (Slow)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-slate-700 dark:text-slate-400 flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400"></div>
                        <span>
                          {refreshInterval <= 10 ? 'High frequency updates' :
                           refreshInterval <= 60 ? 'Moderate frequency' :
                           'Low frequency updates'}
                        </span>
                      </div>
                    </div>

                    {/* Auto-refresh Toggle */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RotateCcw className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                          Auto Refresh
                        </Label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${isAutoRefresh ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {isAutoRefresh ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                          className={`h-8 ${isAutoRefresh ? 'bg-green-50 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400' : 'text-slate-700 dark:text-slate-400'}`}
                        >
                          {isAutoRefresh ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                          Quick Actions
                        </Label>
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMetrics(['users', 'commands', 'success_rate'])}
                          className="w-full justify-start text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                        >
                          <Target className="h-3 w-3 mr-2" />
                          Essential Metrics
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMetrics(metricOptions.map(m => m.value))}
                          className="w-full justify-start text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                        >
                          <Layers className="h-3 w-3 mr-2" />
                          All Metrics
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMetrics(['response_time', 'errors'])}
                          className="w-full justify-start text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                        >
                          <AlertCircle className="h-3 w-3 mr-2" />
                          Performance Focus
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview Dashboard */}
                {selectedMetrics.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                          Live Preview Dashboard
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'reconnecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {connectionStatus === 'connected' ? 'Live' : connectionStatus === 'reconnecting' ? 'Reconnecting' : 'Offline'}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Updated {Math.floor((new Date() - lastUpdated) / 1000)}s ago
                        </Badge>
                      </div>
                    </div>

                    {/* Custom Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedMetrics.map((metricValue, index) => {
                        const metric = metricOptions.find(m => m.value === metricValue);
                        const mockValue = metricValue === 'users' ? Math.floor(Math.random() * 1000) + 500 :
                                         metricValue === 'commands' ? Math.floor(Math.random() * 50000) + 10000 :
                                         metricValue === 'success_rate' ? (Math.random() * 20 + 80).toFixed(1) + '%' :
                                         metricValue === 'response_time' ? (Math.random() * 200 + 50).toFixed(0) + 'ms' :
                                         metricValue === 'errors' ? (Math.random() * 5).toFixed(1) + '%' :
                                         (Math.random() * 100).toFixed(1) + '%';

                        const changeValue = (Math.random() * 20 - 10).toFixed(1);
                        const isPositive = parseFloat(changeValue) > 0;

                        return (
                          <Card
                            key={metricValue}
                            className="piwpiw-card-hover bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-900 dark:to-orange-950/30 border border-orange-200 dark:border-orange-800/50 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                                    <metric.icon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                      {metric.label}
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                      Real-time data
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedMetrics(selectedMetrics.filter(m => m !== metricValue))}
                                  className="h-6 w-6 p-0 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                  {mockValue}
                                </div>
                                <div className={`flex items-center space-x-1 text-xs font-medium ${
                                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                }`}>
                                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                  <span>{Math.abs(changeValue)}% vs last period</span>
                                </div>

                                {/* Mini Progress Bar */}
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                                  <div
                                    className={`h-1 rounded-full transition-all duration-1000 ${
                                      isPositive ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${Math.min(100, Math.abs(parseFloat(changeValue)) * 5)}%` }}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Dashboard Actions */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          <span className="font-medium">{selectedMetrics.length}</span> metrics active
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Refreshing every <span className="font-medium">{refreshInterval}s</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLastUpdated(new Date())}
                          className="text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Refresh Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleExportConfig}
                          disabled={exportStatus === 'preparing'}
                          className={`text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 ${
                            exportStatus === 'preparing' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {exportStatus === 'preparing' ? (
                            <>
                              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                              Exporting... {exportProgress}%
                            </>
                          ) : exportStatus === 'success' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                              Exported!
                            </>
                          ) : exportStatus === 'error' ? (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1 text-red-600" />
                              Failed
                            </>
                          ) : (
                            <>
                              <Download className="h-3 w-3 mr-1" />
                              Export Config
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveDashboard}
                          disabled={saveStatus === 'saving' || selectedMetrics.length === 0}
                          className={`text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 ${
                            saveStatus === 'saving' || selectedMetrics.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {saveStatus === 'saving' ? (
                            <>
                              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                              Saving...
                            </>
                          ) : saveStatus === 'success' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                              Saved!
                            </>
                          ) : saveStatus === 'error' ? (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1 text-red-600" />
                              Failed
                            </>
                          ) : (
                            <>
                              <Save className="h-3 w-3 mr-1" />
                              Save Dashboard
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Saved Dashboards Section */}
                {savedDashboards.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Save className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                        Saved Dashboards ({savedDashboards.length})
                      </Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedDashboards.map((dashboard) => (
                        <Card
                          key={dashboard.id}
                          className="piwpiw-card-hover bg-gradient-to-br from-white to-orange-50/20 dark:from-slate-900 dark:to-orange-950/20 border border-orange-200 dark:border-orange-800/30 cursor-pointer hover:scale-105 transition-all duration-300"
                          onClick={() => {
                            setSelectedMetrics(dashboard.selectedMetrics);
                            setRefreshInterval(dashboard.refreshInterval);
                            setIsAutoRefresh(dashboard.isAutoRefresh);
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                                  <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {dashboard.name}
                                  </h3>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {dashboard.selectedMetrics.length} metrics
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedDashboards = savedDashboards.filter(d => d.id !== dashboard.id);
                                  setSavedDashboards(updatedDashboards);
                                  localStorage.setItem('piwpiw-dashboards', JSON.stringify(updatedDashboards));
                                }}
                                className="h-6 w-6 p-0 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600 dark:text-slate-400">Refresh:</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">
                                  {dashboard.refreshInterval}s
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600 dark:text-slate-400">Auto-refresh:</span>
                                <span className={`font-medium ${dashboard.isAutoRefresh ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {dashboard.isAutoRefresh ? 'On' : 'Off'}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Created: {new Date(dashboard.createdAt).toLocaleDateString()}
                              </div>

                              {/* Metrics Preview */}
                              <div className="flex flex-wrap gap-1 mt-2">
                                {dashboard.selectedMetrics.slice(0, 3).map((metricValue) => {
                                  const metric = metricOptions.find(m => m.value === metricValue);
                                  return (
                                    <Badge
                                      key={metricValue}
                                      variant="outline"
                                      className="text-xs bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-600/50"
                                    >
                                      {metric?.label}
                                    </Badge>
                                  );
                                })}
                                {dashboard.selectedMetrics.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{dashboard.selectedMetrics.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {selectedMetrics.length === 0 && (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                      <Target className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      No Metrics Selected
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                      Choose metrics from the selection above to build your custom analytics dashboard.
                      Start with essential metrics or select all for a comprehensive view.
                    </p>
                    <div className="flex items-center justify-center space-x-3">
                      <Button
                        onClick={() => setSelectedMetrics(['users', 'commands', 'success_rate'])}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Add Essential Metrics
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedMetrics(metricOptions.map(m => m.value))}
                        className="text-slate-700 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                      >
                        <Layers className="h-4 w-4 mr-2" />
                        Select All
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notification Toast */}
          {(exportStatus === 'success' || saveStatus === 'success' || exportStatus === 'error' || saveStatus === 'error') && (
            <div className="fixed top-4 right-4 z-50 animate-fade-in">
              <Card className={`border-l-4 ${
                exportStatus === 'success' || saveStatus === 'success'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    {exportStatus === 'success' || saveStatus === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                    <div>
                      <div className={`font-medium text-sm ${
                        exportStatus === 'success' || saveStatus === 'success'
                          ? 'text-green-900 dark:text-green-100'
                          : 'text-red-900 dark:text-red-100'
                      }`}>
                        {exportStatus === 'success' && 'Configuration Exported Successfully!'}
                        {saveStatus === 'success' && 'Dashboard Saved Successfully!'}
                        {exportStatus === 'error' && 'Export Failed'}
                        {saveStatus === 'error' && 'Save Failed'}
                      </div>
                      <div className={`text-xs ${
                        exportStatus === 'success' || saveStatus === 'success'
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300'
                      }`}>
                        {exportStatus === 'success' && 'Your analytics configuration has been downloaded.'}
                        {saveStatus === 'success' && 'Your custom dashboard has been saved.'}
                        {exportStatus === 'error' && 'Please try again or check your browser settings.'}
                        {saveStatus === 'error' && 'Please try again later.'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
      </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;


