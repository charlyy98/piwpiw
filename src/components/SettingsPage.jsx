import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  Eye,
  EyeOff,
  Crown,
  Zap,
  Database,
  Download,
  Upload,
  Trash2,
  Key,
  Lock,
  Smartphone,
  Mail,
  MessageSquare,
  Volume2,
  VolumeX,
  Monitor,
  Sun,
  Moon,
  Laptop,
  Check,
  AlertTriangle,
  Info,
  ExternalLink,
  RefreshCw,
  Calendar,
  Clock,
  BarChart3,
  Activity,
  X,
  LogOut,
  Code,
  Scale,
  Search,
  Copy,
  QrCode,
  Plus,
  Bot,
  Users,
  Settings as SettingsIcon,
  Fingerprint,
  Phone
} from 'lucide-react';

const SettingsPage = () => {
  const { t, user, theme, language, toggleTheme, toggleLanguage, updateAvatar } = useApp();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [saveStatus, setSaveStatus] = useState('');
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAStep, setTwoFAStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [qrCodeSecret, setQrCodeSecret] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [showAPIModal, setShowAPIModal] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Bot', key: 'pk_live_****8x7a', created: '2024-01-10', lastUsed: '2 hours ago', permissions: ['read', 'write'] },
    { id: 2, name: 'Development Testing', key: 'pk_test_****2b9c', created: '2024-01-08', lastUsed: '1 day ago', permissions: ['read'] }
  ]);
  const [newAPIKeyName, setNewAPIKeyName] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Category settings state (persisted)
  const [categoryConfigMap, setCategoryConfigMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('piwpiw-category-settings')) || {};
    } catch (e) {
      return {};
    }
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryModalData, setCategoryModalData] = useState({
    retention: '1 year',
    autoSync: true,
    notifyOnSync: true,
    cleanupPolicy: 'archive'
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    discord: true,
    updates: true,
    security: true,
    marketing: false,
    serverAlerts: true,
    commandUsage: false
  });
  
  // Smart Data Categories: export and settings handlers
  const exportCategoryData = (category) => {
    setSaveStatus('category-exporting');
    setTimeout(() => {
      const payload = {
        category: category.name,
        meta: {
          size: category.size,
          files: category.files,
          lastSync: category.lastSync,
        },
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `piwpiw-${category.name.toLowerCase().replace(/\\s+/g, '-')}-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setSaveStatus('category-exported');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 800);
  };

  const openCategorySettings = (category) => {
    const stored = categoryConfigMap[category.name] || {};
    setSelectedCategory(category);
    setCategoryModalData({
      retention: stored.retention || category.retention,
      autoSync: stored.autoSync ?? true,
      notifyOnSync: stored.notifyOnSync ?? true,
      cleanupPolicy: stored.cleanupPolicy || 'archive',
    });
    setShowCategoryModal(true);
  };

  const saveCategorySettings = () => {
    if (!selectedCategory) return;
    const updated = { ...categoryConfigMap, [selectedCategory.name]: categoryModalData };
    setCategoryConfigMap(updated);
    localStorage.setItem('piwpiw-category-settings', JSON.stringify(updated));
    setShowCategoryModal(false);
    setSaveStatus('category-settings-saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };
  
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showStats: true,
    allowAnalytics: true,
    shareUsageData: false,
    enableTelemetry: true,
    publicActivity: false
  });

  const [accountData, setAccountData] = useState({
    username: user?.username || 'PiwPiw',
    email: user?.email || 'user@piwpiw.com',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    apiKeyVisible: false,
    generatedApiKey: null,
    avatar: null
  });

  const [preferences, setPreferences] = useState({
    autoSave: true,
    compactMode: false,
    animationsEnabled: true,
    soundEnabled: true,
    autoRefresh: true,
    showTooltips: true,
    defaultView: 'dashboard',
    itemsPerPage: 10
  });

  // Appearance customization state
  const [appearanceSettings, setAppearanceSettings] = useState({
    accentColor: 'blue',
    fontSize: 14,
    fontFamily: 'system',
    layoutStyle: 'sidebar'
  });

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    // Simulate API call with actual data processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate saving data to localStorage for demo
      localStorage.setItem('piwpiw-settings', JSON.stringify({
        accountData,
        notifications,
        privacy,
        preferences,
        lastSaved: new Date().toISOString()
      }));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleExportData = async () => {
    try {
      // Create comprehensive data export
      const exportData = {
        account: accountData,
        settings: {
          notifications,
          privacy,
          preferences
        },
        metadata: {
          exportDate: new Date().toISOString(),
          version: '1.0',
          user: user?.username || 'PiwPiwUser'
        }
      };
      
      // Create and download file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `piwpiw-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show success message
      setSaveStatus('exported');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      setSaveStatus('export-error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDeleteAccount = () => {
    // Enhanced delete confirmation with proper dialog
    const confirmDelete = window.confirm(
      '⚠️ Are you absolutely sure?\n\n' +
      'This will permanently delete your account and all associated data:\n' +
      '• All server settings and configurations\n' +
      '• Analytics and usage history\n' +
      '• API keys and integrations\n' +
      '• This action cannot be undone!\n\n' +
      'Type "DELETE" in the next prompt to confirm.'
    );
    
    if (confirmDelete) {
      const confirmation = window.prompt('Type "DELETE" to confirm account deletion:');
      if (confirmation === 'DELETE') {
        setSaveStatus('deleting');
        // Simulate account deletion process
        setTimeout(() => {
          alert('Account deletion request submitted. You will receive an email confirmation within 24 hours.');
          setSaveStatus('');
        }, 2000);
      } else {
        alert('Account deletion cancelled. The confirmation text did not match.');
      }
    }
  };

  const generateApiKey = () => {
    // Generate new API key with proper formatting
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newKey = 'pk_live_';
    for (let i = 0; i < 32; i++) {
      newKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setAccountData(prev => ({ 
      ...prev, 
      generatedApiKey: newKey,
      apiKeyVisible: true 
    }));
    
    // Show generation success
    setSaveStatus('key-generated');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleResetDefaults = () => {
    const confirmReset = window.confirm(
      'Reset all settings to default values?\n\n' +
      'This will restore:\n' +
      '• Default notification preferences\n' +
      '• Default privacy settings\n' +
      '• Default appearance settings\n' +
      '• Default application preferences'
    );
    
    if (confirmReset) {
      setNotifications({
        email: true,
        push: false,
        discord: true,
        updates: true,
        security: true,
        marketing: false,
        serverAlerts: true,
        commandUsage: false
      });
      
      setPrivacy({
        profilePublic: false,
        showStats: true,
        allowAnalytics: true,
        shareUsageData: false,
        enableTelemetry: true,
        publicActivity: false
      });
      
      setPreferences({
        autoSave: true,
        compactMode: false,
        animationsEnabled: true,
        soundEnabled: true,
        autoRefresh: true,
        showTooltips: true,
        defaultView: 'dashboard',
        itemsPerPage: 10
      });
      
      setSaveStatus('reset');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleAvatarUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert('File size must be less than 5MB');
          return;
        }
        
        setSaveStatus('uploading-avatar');
        console.log('Starting avatar upload for file:', file.name, 'Size:', file.size, 'Type:', file.type);
        
        try {
          // Use global updateAvatar function from AppContext
          const result = await updateAvatar(file);
          console.log('Avatar upload result:', result);
          
          if (result.success) {
            // Create image preview URL for local state
            const reader = new FileReader();
            reader.onload = (e) => {
              setAccountData(prev => ({ 
                ...prev, 
                avatar: e.target.result 
              }));
              setSaveStatus('avatar-uploaded');
              setTimeout(() => setSaveStatus(''), 3000);
            };
            reader.readAsDataURL(file);
          } else {
            console.error('Avatar upload failed:', result.error);
            // Show specific error message from API
            alert(`❌ ${result.error || 'Failed to upload avatar. Please try again.'}`);
            setSaveStatus('avatar-error');
            setTimeout(() => setSaveStatus(''), 3000);
          }
        } catch (error) {
          console.error('Avatar upload failed:', error);
          setSaveStatus('avatar-error');
          setTimeout(() => setSaveStatus(''), 3000);
        }
      }
    };
    input.click();
  };

  // Generate secret key for 2FA
  const generateSecretKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };

  // Generate backup codes
  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 8; i++) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      codes.push(code);
    }
    return codes;
  };

  // Start 2FA setup process
  const start2FASetup = () => {
    const secret = generateSecretKey();
    const codes = generateBackupCodes();
    
    setQrCodeSecret(secret);
    setBackupCodes(codes);
    setTwoFAStep(1);
    setShow2FAModal(true);
    setSaveStatus('');
  };

  // Verify 2FA code
  const verify2FACode = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      // Create professional validation feedback
      const errorToast = document.createElement('div');
      errorToast.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 16px 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 1001; display: flex; align-items: center; gap: 12px; transform: translateX(100%); transition: transform 0.3s ease;">
          <span style="font-size: 20px;">⚠️</span>
          <div>
            <div style="font-weight: 600; font-size: 14px;">Invalid Code Format</div>
            <div style="font-size: 12px; opacity: 0.9;">Please enter a valid 6-digit code</div>
          </div>
        </div>
      `;
      document.body.appendChild(errorToast);
      
      // Animate in
      setTimeout(() => {
        errorToast.firstElementChild.style.transform = 'translateX(0)';
      }, 100);
      
      // Animate out and remove
      setTimeout(() => {
        errorToast.firstElementChild.style.transform = 'translateX(100%)';
        setTimeout(() => errorToast.remove(), 300);
      }, 3000);
      return;
    }

    // Simulate verification (in real app, this would be server-side)
    if (verificationCode === '123456' || verificationCode.match(/^\d{6}$/)) {
      // Show success feedback
      const successToast = document.createElement('div');
      successToast.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 1001; display: flex; align-items: center; gap: 12px; transform: translateX(100%); transition: transform 0.3s ease;">
          <span style="font-size: 20px;">✅</span>
          <div>
            <div style="font-weight: 600; font-size: 14px;">Code Verified!</div>
            <div style="font-size: 12px; opacity: 0.9;">Completing 2FA setup...</div>
          </div>
        </div>
      `;
      document.body.appendChild(successToast);
      
      setTimeout(() => {
        successToast.firstElementChild.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        successToast.firstElementChild.style.transform = 'translateX(100%)';
        setTimeout(() => successToast.remove(), 300);
      }, 2000);
      
      setTwoFAStep(3);
      setTimeout(() => {
        setAccountData(prev => ({ ...prev, twoFactorEnabled: true }));
        setShow2FAModal(false);
        setSaveStatus('2fa-enabled');
        setTimeout(() => setSaveStatus(''), 3000);
      }, 1000);
    } else {
      // Create professional error feedback
      const errorToast = document.createElement('div');
      errorToast.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 16px 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 1001; display: flex; align-items: center; gap: 12px; transform: translateX(100%); transition: transform 0.3s ease;">
          <span style="font-size: 20px;">❌</span>
          <div>
            <div style="font-weight: 600; font-size: 14px;">Invalid Code</div>
            <div style="font-size: 12px; opacity: 0.9;">Please check and try again</div>
          </div>
        </div>
      `;
      document.body.appendChild(errorToast);
      
      setTimeout(() => {
        errorToast.firstElementChild.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        errorToast.firstElementChild.style.transform = 'translateX(100%)';
        setTimeout(() => errorToast.remove(), 300);
      }, 3000);
    }
  };

  // Close 2FA modal
  const close2FAModal = () => {
    setShow2FAModal(false);
    setTwoFAStep(1);
    setVerificationCode('');
    setQrCodeSecret('');
    setBackupCodes([]);
  };

  const tabs = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'data', label: 'Data Management', icon: Database }
  ];

  const TabIcon = tabs.find(tab => tab.id === activeTab)?.icon || Settings;

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold piwpiw-text-gradient flex items-center gap-2">
            <Settings className="h-8 w-8" />
            {t('settings.title')}
          </h2>
          <p className="text-muted-foreground mt-1">
            ⚙️ Customize your PiwPiw experience with advanced settings and preferences
          </p>
          {/* Status Messages */}
          {saveStatus && (
            <div className={`mt-3 px-3 py-2 rounded-lg text-sm font-medium animate-in slide-in-from-top-2 ${
              saveStatus === 'saved' || saveStatus === 'exported' || saveStatus === 'key-generated' || saveStatus === 'reset' || saveStatus === 'avatar-uploaded' || saveStatus === 'copied' || saveStatus === '2fa-enabled' || saveStatus === 'sms-sent' || saveStatus === 'sms-resent' || saveStatus === 'email-sent' || saveStatus === 'email-resent' || saveStatus === 'biometric-enabled' || saveStatus === 'social-connected' || saveStatus === 'hardware-enabled' || saveStatus === 'theme-changed' || saveStatus === 'accent-changed' || saveStatus === 'language-changed' || saveStatus === 'preference-updated' || saveStatus === 'layout-changed' || saveStatus === 'notification-tested' || saveStatus === 'notification-updated' || saveStatus === 'sound-tested' || saveStatus === 'sound-updated' || saveStatus === 'dnd-disabled' || saveStatus === 'all-notifications-enabled' || saveStatus === 'only-security-enabled' || saveStatus === 'security-analyzed' || saveStatus === 'privacy-updated' || saveStatus === 'data-preference-updated' || saveStatus === 'security-updated' || saveStatus === 'sessions-managed' || saveStatus === 'password-changed' || saveStatus === 'data-exported' || saveStatus === 'api-keys-managed' || saveStatus === 'maximum-privacy-enabled' || saveStatus === 'balanced-privacy-enabled' || saveStatus === 'public-profile-enabled' || saveStatus === 'session-revoked' || saveStatus === 'account-deletion-confirmed' || saveStatus === 'account-deletion-cancelled' || saveStatus === 'api-key-created' || saveStatus === 'api-key-copied' || saveStatus === 'api-key-regenerated' || saveStatus === 'api-key-deleted'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : saveStatus === 'error' || saveStatus === 'export-error' || saveStatus === 'avatar-error'
                ? 'bg-red-100 text-red-800 border border-red-200'
                : saveStatus === 'saving' || saveStatus === 'deleting' || saveStatus === 'setting-up-2fa' || saveStatus === 'qr-code-generated' || saveStatus === 'verifying-code' || saveStatus === 'disabling-2fa' || saveStatus === 'sending-sms' || saveStatus === 'resending-sms' || saveStatus === 'verifying-sms' || saveStatus === 'sending-email' || saveStatus === 'verifying-email' || saveStatus === 'biometric-setup' || saveStatus === 'social-auth' || saveStatus === 'hardware-setup' || saveStatus === 'uploading-avatar'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : saveStatus === '2fa-disabled' || saveStatus === 'dnd-enabled' || saveStatus === 'all-notifications-disabled' || saveStatus === 'account-deletion-requested' || saveStatus === 'account-deletion-processing'
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}>
              {saveStatus === 'saved' && '✅ Settings saved successfully!'}
              {saveStatus === 'exported' && '📄 Data exported successfully!'}
              {saveStatus === 'key-generated' && '🔑 New API key generated!'}
              {saveStatus === 'reset' && '🔄 Settings reset to defaults!'}
              {saveStatus === 'uploading-avatar' && '📤 Uploading avatar...'}
              {saveStatus === 'avatar-uploaded' && '📸 Avatar updated successfully!'}
              {saveStatus === 'avatar-error' && '❌ Failed to upload avatar. Please try again.'}
              {saveStatus === 'copied' && '📋 API key copied to clipboard!'}
              {saveStatus === 'saving' && '⏳ Saving your settings...'}
              {saveStatus === 'deleting' && '⚠️ Processing account deletion...'}
              {saveStatus === 'setting-up-2fa' && '🔐 Initializing Two-Factor Authentication setup...'}
              {saveStatus === 'qr-code-generated' && '📱 QR Code generated! Scan with your authenticator app.'}
              {saveStatus === 'verifying-code' && '🔍 Verifying authentication code...'}
              {saveStatus === '2fa-enabled' && '✅ Two-Factor Authentication enabled successfully!'}
              {saveStatus === 'disabling-2fa' && '⚠️ Disabling Two-Factor Authentication...'}
              {saveStatus === '2fa-disabled' && '❌ Two-Factor Authentication has been disabled.'}
              {saveStatus === 'sending-sms' && '📱 Sending SMS verification code...'}
              {saveStatus === 'sms-sent' && '✅ SMS code sent! Check your phone'}
              {saveStatus === 'resending-sms' && '📱 Resending SMS code...'}
              {saveStatus === 'sms-resent' && '✅ SMS code resent! Check your phone'}
              {saveStatus === 'verifying-sms' && '🔍 Verifying SMS code...'}
              {saveStatus === 'sending-email' && '✉️ Sending email verification...'}
              {saveStatus === 'email-sent' && '✅ Email sent! Check your inbox'}
              {saveStatus === 'email-resent' && '✅ Email resent! Check your inbox'}
              {saveStatus === 'verifying-email' && '🔍 Verifying email code...'}
              {saveStatus === 'biometric-setup' && '👆 Setting up biometric authentication...'}
              {saveStatus === 'biometric-enabled' && '✅ Biometric authentication enabled!'}
              {saveStatus === 'social-auth' && '🚀 Connecting to social provider...'}
              {saveStatus === 'social-connected' && '✅ Social authentication connected!'}
              {saveStatus === 'hardware-setup' && '🔑 Setting up hardware key...'}
              {saveStatus === 'hardware-enabled' && '✅ Hardware key enabled!'}
              {saveStatus === 'theme-changed' && '🎨 Theme updated successfully!'}
              {saveStatus === 'accent-changed' && '🌈 Accent color changed!'}
              {saveStatus === 'language-changed' && '🌍 Language updated!'}
              {saveStatus === 'preference-updated' && '⚙️ Preference saved!'}
              {saveStatus === 'layout-changed' && '📐 Layout updated!'}
              {saveStatus === 'notification-tested' && '🔔 Test notification sent!'}
              {saveStatus === 'notification-updated' && '✅ Notification preference saved!'}
              {saveStatus === 'sound-tested' && '🔊 Test sound played!'}
              {saveStatus === 'sound-updated' && '🔊 Sound preference updated!'}
              {saveStatus === 'dnd-enabled' && '🌙 Do Not Disturb enabled'}
              {saveStatus === 'dnd-disabled' && '🔔 Do Not Disturb disabled'}
              {saveStatus === 'all-notifications-enabled' && '✅ All notifications enabled!'}
              {saveStatus === 'only-security-enabled' && '🛡️ Only security notifications enabled'}
              {saveStatus === 'all-notifications-disabled' && '🔕 All notifications disabled'}
              {saveStatus === 'security-analyzed' && '🔍 Security scan completed!'}
              {saveStatus === 'privacy-updated' && '🔐 Privacy setting updated!'}
              {saveStatus === 'data-preference-updated' && '📊 Data preference saved!'}
              {saveStatus === 'security-updated' && '🛡️ Security setting updated!'}
              {saveStatus === 'sessions-managed' && '💻 Sessions managed successfully!'}
              {saveStatus === 'password-changed' && '🔑 Password change initiated!'}
              {saveStatus === 'data-exported' && '📥 Data export started!'}
              {saveStatus === 'account-deletion-requested' && '🗑️ Account deletion requested!'}
              {saveStatus === 'api-keys-managed' && '🔧 API keys managed!'}
              {saveStatus === 'maximum-privacy-enabled' && '🔒 Maximum privacy enabled!'}
              {saveStatus === 'balanced-privacy-enabled' && '⚖️ Balanced privacy settings applied!'}
              {saveStatus === 'public-profile-enabled' && '🌍 Public profile enabled!'}
              {saveStatus === 'session-revoked' && '🚫 Mobile session revoked!'}
              {saveStatus === 'account-deletion-confirmed' && '⚠️ Account deletion confirmed!'}
              {saveStatus === 'account-deletion-processing' && '🗑️ Processing account deletion...'}
              {saveStatus === 'account-deletion-cancelled' && '✅ Account deletion cancelled!'}
              {saveStatus === 'api-key-created' && '🔑 New API key created!'}
              {saveStatus === 'api-key-copied' && '📋 API key copied to clipboard!'}
              {saveStatus === 'api-key-regenerated' && '🔄 API key regenerated!'}
              {saveStatus === 'api-key-deleted' && '🗑️ API key deleted!'}
              {saveStatus === 'preference-updated' && '⚙️ Preference updated successfully!'}
              {saveStatus === 'performance-updated' && '⚡ Performance mode updated!'}
              {saveStatus === 'cache-clearing' && '🔄 Clearing cache...'}
              {saveStatus === 'cache-cleared' && '🗑️ Cache cleared successfully!'}
              {saveStatus === 'cache-optimizing' && '⚡ Optimizing cache...'}
              {saveStatus === 'cache-optimized' && '🚀 Cache optimized!'}
              {saveStatus === 'automation-updated' && '🤖 Automation rule updated!'}
              {saveStatus === 'default-updated' && '🏠 Default setting updated!'}
              {saveStatus === 'pagination-updated' && '📄 Pagination setting updated!'}
              {saveStatus === 'format-updated' && '📅 Date format updated!'}
              {saveStatus === 'developer-updated' && '🔧 Developer option updated!'}
              {saveStatus === 'preferences-optimized' && '✨ Preferences optimized for best performance!'}
              {saveStatus === 'preferences-reset' && '🔄 All preferences reset to defaults!'}
              {saveStatus === 'preferences-exported' && '📥 Preferences exported successfully!'}
              {saveStatus === 'preferences-synced' && '🔄 Preferences synchronized!'}
              {saveStatus === 'api-docs-opened' && '📚 API documentation opened!'}
              {saveStatus === 'webhook-configured' && '🔗 Webhook URL configured successfully!'}
              {saveStatus === 'webhook-cancelled' && '❌ Webhook configuration cancelled'}
              {saveStatus === 'usage-stats-viewed' && '📊 Usage statistics displayed!'}
              {saveStatus === 'category-exported' && '📦 Data category exported successfully!'}
              {saveStatus === 'category-configured' && '⚙️ Category settings updated!'}
              {saveStatus === 'export-json' && '📄 Exporting JSON format...'}
              {saveStatus === 'export-csv' && '📊 Exporting CSV format...'}
              {saveStatus === 'export-xml' && '🏷️ Exporting XML format...'}
              {saveStatus === 'export-pdf' && '📋 Exporting PDF format...'}
              {saveStatus === 'export-completed' && '✅ Export completed successfully!'}
              {saveStatus === 'import-processing' && '⏳ Processing import file...'}
              {saveStatus === 'import-completed' && '✅ Data imported successfully!'}
              {saveStatus === 'backup-setting-updated' && '🔧 Backup setting updated!'}
              {saveStatus === 'backup-restored' && '♻️ Backup restored successfully!'}
              {saveStatus === 'backup-downloaded' && '📥 Backup downloaded!'}
              {saveStatus === 'manual-backup-started' && '⏳ Creating manual backup...'}
              {saveStatus === 'manual-backup-completed' && '✅ Manual backup completed!'}
              {saveStatus === 'optimization-remove-duplicates' && '🔍 Removing duplicate files...'}
              {saveStatus === 'optimization-clear-cache' && '🗑️ Clearing cache...'}
              {saveStatus === 'optimization-compress-data' && '📦 Compressing data...'}
              {saveStatus === 'optimization-clean-logs' && '📝 Cleaning logs...'}
              {saveStatus === 'optimization-completed' && '✅ Optimization completed!'}
              {saveStatus === 'full-optimization-started' && '⚡ Running full optimization...'}
              {saveStatus === 'full-optimization-completed' && '🚀 Full optimization completed! Storage saved!'}
              {saveStatus === 'purge-clear-all-logs' && '🗑️ All logs cleared!'}
              {saveStatus === 'purge-reset-analytics' && '📊 Analytics data reset!'}
              {saveStatus === 'purge-purge-old-backups' && '📦 Old backups purged!'}
              {saveStatus === 'purge-factory-reset' && '🔄 Factory reset completed!'}
              {saveStatus === 'metric-total-records-analyzed' && '📊 Total records analyzed in detail!'}
              {saveStatus === 'metric-data-quality-analyzed' && '✅ Data quality metrics reviewed!'}
              {saveStatus === 'metric-storage-efficiency-analyzed' && '⚡ Storage efficiency report generated!'}
              {saveStatus === 'metric-backup-health-analyzed' && '🛡️ Backup health status verified!'}
              {saveStatus === 'dashboard-refreshed' && '🔄 Dashboard data refreshed!'}
              {saveStatus === 'analytics-opened' && '📊 Analytics dashboard opened!'}
              {saveStatus === 'health-check-completed' && '✅ System health check completed!'}
              {saveStatus === 'instant-backup-created' && '💾 Instant backup created successfully!'}
              {saveStatus === 'backup-schedule-updated' && '📅 Backup schedule updated!'}
              {saveStatus === 'backup-verified' && '✅ Backup integrity verified!'}
              {saveStatus === 'data-synchronized' && '🔄 All data synchronized successfully!'}
              {saveStatus === 'data-validated' && '✅ Data validation completed!'}
              {saveStatus === 'migration-started' && '📦 Data migration process started!'}
              {saveStatus === 'system-scanned' && '🔍 System scan completed!'}
              {saveStatus === 'maintenance-performed' && '🔧 System maintenance performed!'}
              {saveStatus === 'diagnostics-run' && '🔬 System diagnostics completed!'}
              {saveStatus === 'emergency-backup-created' && '🚨 Emergency backup created!'}
              {saveStatus === 'processes-stopped' && '⏹️ All processes stopped safely!'}
              {saveStatus === 'recovery-mode-activated' && '🔄 Recovery mode activated!'}
              {saveStatus === 'support-contacted' && '📞 Support team contacted!'}
              {saveStatus === 'deletion-process-explained' && '📋 Account deletion process explained!'}
              {saveStatus === 'secret-copied' && '📋 Secret key copied to clipboard!'}
              {saveStatus === 'error' && '❌ Failed to save settings. Please try again.'}
              {saveStatus === 'export-error' && '❌ Failed to export data. Please try again.'}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="piwpiw-button-outline"
            onClick={handleResetDefaults}
            disabled={saveStatus === 'saving' || saveStatus === 'deleting'}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button 
            onClick={handleSave} 
            className="piwpiw-button"
            disabled={saveStatus === 'saving' || saveStatus === 'deleting'}
          >
            {saveStatus === 'saving' ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : saveStatus === 'saved' ? (
              <Check className="mr-2 h-4 w-4" />
            ) : saveStatus === 'exported' ? (
              <Download className="mr-2 h-4 w-4" />
            ) : saveStatus === 'key-generated' ? (
              <Key className="mr-2 h-4 w-4" />
            ) : saveStatus === 'reset' ? (
              <RefreshCw className="mr-2 h-4 w-4" />
            ) : saveStatus === 'avatar-uploaded' ? (
              <Upload className="mr-2 h-4 w-4" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saveStatus === 'saving' ? 'Saving...' : 
             saveStatus === 'saved' ? 'Saved Successfully!' : 
             saveStatus === 'exported' ? 'Data Exported!' :
             saveStatus === 'key-generated' ? 'API Key Generated!' :
             saveStatus === 'reset' ? 'Settings Reset!' :
             saveStatus === 'avatar-uploaded' ? 'Avatar Updated!' :
             saveStatus === 'error' ? 'Save Failed' :
             saveStatus === 'export-error' ? 'Export Failed' :
             'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Enhanced Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="piwpiw-card-hover bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <p className="text-2xl font-bold text-blue-600">Premium</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active since 2023
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Crown className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="piwpiw-card-hover bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold text-green-600">98%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Excellent security
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="piwpiw-card-hover bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">API Usage</p>
                <p className="text-2xl font-bold text-purple-600">2.4K</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Requests this month
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="piwpiw-card-hover bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold text-orange-600">1.2GB</p>
                <p className="text-xs text-muted-foreground mt-1">
                  of 10GB available
                </p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Database className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Settings Navigation */}
        <div className="space-y-2">
          <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Settings Menu</CardTitle>
              <CardDescription>Navigate through different settings</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-1">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={`w-full justify-start transition-all duration-200 ${
                        activeTab === tab.id ? 'piwpiw-button' : ''
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      style={{ animationDelay: `${600 + index * 50}ms` }}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Quick Actions
                <Badge variant="outline" className="ml-auto text-xs bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Essential tools for account management
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {/* Export Data Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 group"
                  onClick={handleExportData}
                  disabled={saveStatus === 'saving' || saveStatus === 'deleting' || saveStatus === 'exporting'}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {saveStatus === 'exporting' ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin text-blue-600" />
                      ) : (
                        <Download className="mr-2 h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                      )}
                      <span>{saveStatus === 'exporting' ? 'Exporting...' : 'Export Data'}</span>
                    </div>
                    {saveStatus === 'exported' && (
                      <Check className="h-4 w-4 text-green-600 ml-auto" />
                    )}
                  </div>
                </Button>
                {/* Generate API Key Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start transition-all duration-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 group"
                  onClick={generateApiKey}
                  disabled={saveStatus === 'saving' || saveStatus === 'deleting' || saveStatus === 'generating-key'}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {saveStatus === 'generating-key' ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin text-purple-600" />
                      ) : (
                        <Key className="mr-2 h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform" />
                      )}
                      <span>{saveStatus === 'generating-key' ? 'Generating...' : 'Generate API Key'}</span>
                    </div>
                    {saveStatus === 'key-generated' && (
                      <Check className="h-4 w-4 text-green-600 ml-auto" />
                    )}
                  </div>
                </Button>
                {/* Delete Account Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200 group"
                  onClick={handleDeleteAccount}
                  disabled={saveStatus === 'saving' || saveStatus === 'deleting' || saveStatus === 'backing-up-data' || saveStatus === 'deactivating-account' || saveStatus === 'removing-data'}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {saveStatus === 'deleting' || saveStatus === 'backing-up-data' || saveStatus === 'deactivating-account' || saveStatus === 'removing-data' ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin text-red-600" />
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4 text-red-600 group-hover:scale-110 transition-transform" />
                      )}
                      <span>{
                        saveStatus === 'deleting' ? 'Processing...' :
                        saveStatus === 'backing-up-data' ? 'Backing up...' :
                        saveStatus === 'deactivating-account' ? 'Deactivating...' :
                        saveStatus === 'removing-data' ? 'Removing data...' :
                        'Delete Account'
                      }</span>
                    </div>
                    {saveStatus === 'account-deletion-confirmed' && (
                      <AlertTriangle className="h-4 w-4 text-orange-600 ml-auto" />
                    )}
                  </div>
                </Button>
              </div>
              {/* Quick Actions Status */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status:</span>
                  <div className="flex items-center gap-1">
                    {saveStatus === 'exporting' || saveStatus === 'generating-key' || saveStatus === 'deleting' || saveStatus === 'backing-up-data' || saveStatus === 'deactivating-account' || saveStatus === 'removing-data' ? (
                      <>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-600 font-medium">Processing...</span>
                      </>
                    ) : saveStatus === 'exported' || saveStatus === 'key-generated' || saveStatus === 'account-deletion-confirmed' ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 font-medium">Completed</span>
                      </>
                    ) : saveStatus === 'export-error' || saveStatus === 'key-generation-error' || saveStatus === 'deletion-error' ? (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-red-600 font-medium">Error</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 font-medium">All Actions Ready</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {saveStatus === 'exporting' ? '📤 Exporting your data...' :
                   saveStatus === 'generating-key' ? '🔑 Generating new API key...' :
                   saveStatus === 'deleting' ? '⚠️ Processing deletion request...' :
                   saveStatus === 'backing-up-data' ? '💾 Creating backup...' :
                   saveStatus === 'deactivating-account' ? '🚫 Deactivating account...' :
                   saveStatus === 'removing-data' ? '🗑️ Removing data...' :
                   saveStatus === 'exported' ? '✅ Data exported successfully!' :
                   saveStatus === 'key-generated' ? '🔑 API key generated!' :
                   saveStatus === 'account-deletion-confirmed' ? '⚠️ Deletion request submitted' :
                   saveStatus === 'export-error' ? '❌ Export failed' :
                   saveStatus === 'key-generation-error' ? '❌ Key generation failed' :
                   saveStatus === 'deletion-error' ? '❌ Deletion failed' :
                   'Ready to use'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Settings
                  <Badge variant="outline" className="ml-auto">Premium</Badge>
                </CardTitle>
                <CardDescription>
                  Update your account information and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <Avatar className="h-20 w-20 ring-4 ring-blue-500/20 transition-all duration-300 hover:ring-blue-500/40">
                    <AvatarImage src={accountData.avatar || user?.avatar} />
                    <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {accountData.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-lg">{accountData.username}</h4>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Crown className="mr-1 h-3 w-3" />
                        Premium
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{accountData.email}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleAvatarUpload}
                        disabled={saveStatus === 'saving' || saveStatus === 'deleting'}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Navigating to profile page...');
                          
                          // Direct state change without URL manipulation
                          const event = new CustomEvent('navigate', { 
                            detail: 'profile',
                            bubbles: true,
                            cancelable: true
                          });
                          
                          // Dispatch immediately
                          window.dispatchEvent(event);
                          
                          // Also set focus to ensure proper state change
                          setTimeout(() => {
                            console.log('Profile navigation dispatched');
                          }, 100);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={accountData.username}
                        onChange={(e) => setAccountData(prev => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={accountData.email}
                        onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter new password"
                          value={accountData.newPassword}
                          onChange={(e) => setAccountData(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirm-password" 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm new password"
                          value={accountData.confirmPassword}
                          onChange={(e) => setAccountData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Two-Factor Authentication
                  </h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        {accountData.twoFactorEnabled 
                          ? 'Multiple security methods available • Click to manage' 
                          : 'SMS, Email, Biometric, Social Auth & more • Click to setup'
                        }
                      </p>
                      {accountData.twoFactorEnabled && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 font-medium">Active & Secure</span>
                        </div>
                      )}
                    </div>
                    <Switch
                      checked={accountData.twoFactorEnabled}
                      onCheckedChange={(checked) => {
                        console.log('2FA Switch clicked:', checked);
                        
                        if (checked) {
                          // Start professional 2FA setup with modal
                          start2FASetup();
                        } else {
                          // Enhanced disable confirmation with security warning
                          const confirmDisable = window.confirm(
                            '⚠️ Disable Two-Factor Authentication?\n\n' +
                            'Security Warning:\n' +
                            '• Your account will be less secure\n' +
                            '• You may lose access to premium features\n' +
                            '• Recommended to keep 2FA enabled\n\n' +
                            'If you\'re having trouble with your authenticator:\n' +
                            '• Try syncing your device time\n' +
                            '• Use backup codes instead\n' +
                            '• Contact support for assistance\n\n' +
                            'Are you sure you want to disable 2FA?'
                          );
                          
                          if (confirmDisable) {
                            // Additional confirmation for security
                            const finalConfirm = window.confirm(
                              '🚨 FINAL CONFIRMATION\n\n' +
                              'Disabling 2FA will immediately remove this security layer.\n' +
                              'Type "DISABLE" in the next prompt to confirm.'
                            );
                            
                            if (finalConfirm) {
                              const typeConfirm = window.prompt(
                                'Type "DISABLE" to confirm removing Two-Factor Authentication:'
                              );
                              
                              if (typeConfirm === 'DISABLE') {
                                setSaveStatus('disabling-2fa');
                                setTimeout(() => {
                                  setAccountData(prev => ({ ...prev, twoFactorEnabled: false }));
                                  setSaveStatus('2fa-disabled');
                                  setTimeout(() => setSaveStatus(''), 3000);
                                }, 1000);
                              } else {
                                alert('❌ Confirmation failed. 2FA remains enabled for your security.');
                              }
                            }
                          } else {
                            console.log('2FA disable cancelled by user');
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* API Key Section */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    API Access
                  </h4>
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">API Key</p>
                        <p className="text-sm text-muted-foreground">
                          Use this key to access PiwPiw API
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={generateApiKey}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={accountData.apiKeyVisible ? 
                          (accountData.generatedApiKey || "pk_live_1234567890abcdef") : 
                          "••••••••••••••••••••••••••••••••••••••"}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAccountData(prev => ({ ...prev, apiKeyVisible: !prev.apiKeyVisible }))}
                      >
                        {accountData.apiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const keyToCopy = accountData.generatedApiKey || "pk_live_1234567890abcdef";
                          navigator.clipboard.writeText(keyToCopy);
                          setSaveStatus('copied');
                          setTimeout(() => setSaveStatus(''), 2000);
                        }}
                      >
                        📋
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance & Theme
                </CardTitle>
                <CardDescription>
                  🎨 Customize your dashboard appearance and create your perfect visual experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Theme Selection with Live Preview */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Theme Selection
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {theme === 'dark' ? '🌙 Dark Mode' : theme === 'light' ? '☀️ Light Mode' : '🖥️ Auto'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { 
                        id: 'light', 
                        label: 'Light Mode', 
                        icon: Sun, 
                        desc: 'Clean and bright interface',
                        preview: 'bg-gradient-to-br from-blue-50 to-indigo-100',
                        border: 'border-blue-200'
                      },
                      { 
                        id: 'dark', 
                        label: 'Dark Mode', 
                        icon: Moon, 
                        desc: 'Easy on the eyes, perfect for night',
                        preview: 'bg-gradient-to-br from-slate-800 to-slate-900',
                        border: 'border-slate-600'
                      },
                      { 
                        id: 'system', 
                        label: 'Auto Mode', 
                        icon: Laptop, 
                        desc: 'Follow your system preference',
                        preview: 'bg-gradient-to-br from-amber-100 to-orange-200',
                        border: 'border-amber-300'
                      }
                    ].map((themeOption) => {
                      const Icon = themeOption.icon;
                      const isActive = theme === themeOption.id;
                      return (
                        <div
                          key={themeOption.id}
                          className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                            isActive 
                              ? `${themeOption.border} bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md` 
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                          onClick={() => {
                            if (theme !== themeOption.id) {
                              toggleTheme();
                              setSaveStatus('theme-changed');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }
                          }}
                        >
                          {/* Theme Preview */}
                          <div className={`w-full h-16 rounded-lg mb-3 ${themeOption.preview} flex items-center justify-center`}>
                            <Icon className={`h-6 w-6 ${themeOption.id === 'dark' ? 'text-white' : 'text-slate-700'}`} />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-sm">{themeOption.label}</p>
                              {isActive && (
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{themeOption.desc}</p>
                          </div>
                          
                          {isActive && (
                            <div className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Accent Color Customization */}
                <div className="space-y-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Accent Colors
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {[
                      { name: 'Blue', id: 'blue', color: 'bg-blue-500', hover: 'hover:bg-blue-600' },
                      { name: 'Purple', id: 'purple', color: 'bg-purple-500', hover: 'hover:bg-purple-600' },
                      { name: 'Green', id: 'green', color: 'bg-emerald-500', hover: 'hover:bg-emerald-600' },
                      { name: 'Orange', id: 'orange', color: 'bg-orange-500', hover: 'hover:bg-orange-600' },
                      { name: 'Rose', id: 'rose', color: 'bg-rose-500', hover: 'hover:bg-rose-600' },
                      { name: 'Indigo', id: 'indigo', color: 'bg-indigo-500', hover: 'hover:bg-indigo-600' }
                    ].map((colorOption) => {
                      const isActive = appearanceSettings.accentColor === colorOption.id;
                      return (
                        <div
                          key={colorOption.name}
                          className={`group relative w-full h-12 rounded-lg cursor-pointer transition-all duration-200 ${colorOption.color} ${colorOption.hover} hover:scale-110 ${
                            isActive ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                          }`}
                          onClick={() => {
                            setAppearanceSettings(prev => ({ ...prev, accentColor: colorOption.id }));
                            
                            // Apply color changes to multiple UI elements
                            const root = document.documentElement;
                            const colorMap = {
                              blue: { rgb: '59 130 246', hex: '#3b82f6' },
                              purple: { rgb: '139 92 246', hex: '#8b5cf6' }, 
                              green: { rgb: '16 185 129', hex: '#10b981' },
                              orange: { rgb: '249 115 22', hex: '#f97316' },
                              rose: { rgb: '244 63 94', hex: '#f43f5e' },
                              indigo: { rgb: '99 102 241', hex: '#6366f1' }
                            };
                            
                            const selectedColor = colorMap[colorOption.id];
                            
                            // Update CSS variables
                            root.style.setProperty('--accent-color', selectedColor.rgb);
                            root.style.setProperty('--accent-color-hex', selectedColor.hex);
                            
                            // Apply to existing buttons and elements immediately
                            const buttons = document.querySelectorAll('.bg-blue-600, .text-blue-600, .border-blue-600');
                            buttons.forEach(btn => {
                              btn.style.backgroundColor = selectedColor.hex;
                              btn.style.color = selectedColor.hex;
                              btn.style.borderColor = selectedColor.hex;
                            });
                            
                            // Update switch colors
                            const switches = document.querySelectorAll('[data-state="checked"]');
                            switches.forEach(sw => {
                              sw.style.backgroundColor = selectedColor.hex;
                            });
                            
                            setSaveStatus('accent-changed');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              {colorOption.name}
                            </span>
                          </div>
                          {isActive && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                              <Check className="h-2 w-2" style={{ color: `rgb(${colorOption.id === 'blue' ? '59 130 246' : colorOption.id === 'purple' ? '139 92 246' : colorOption.id === 'green' ? '16 185 129' : colorOption.id === 'orange' ? '249 115 22' : colorOption.id === 'rose' ? '244 63 94' : '99 102 241'})` }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Language & Region */}
                <div className="space-y-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language & Region
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        id: 'en', 
                        label: 'English', 
                        flag: '🇺🇸', 
                        desc: 'English (United States)',
                        stats: '1.2B speakers worldwide'
                      },
                      { 
                        id: 'ar', 
                        label: 'العربية', 
                        flag: '🇸🇦', 
                        desc: 'Arabic (Saudi Arabia)',
                        stats: '422M speakers worldwide'
                      }
                    ].map((langOption) => {
                      const isActive = language === langOption.id;
                      return (
                        <div
                          key={langOption.id}
                          className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                            isActive 
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md' 
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                          onClick={() => {
                            if (language !== langOption.id) {
                              toggleLanguage();
                              setSaveStatus('language-changed');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-3xl">{langOption.flag}</div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-semibold">{langOption.label}</p>
                                {isActive && (
                                  <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{langOption.desc}</p>
                              <p className="text-xs text-blue-600 font-medium">{langOption.stats}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Font & Typography */}
                <div className="space-y-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Font & Typography
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Font Size */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Font Size</Label>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-muted-foreground">Small</span>
                        <div className="flex-1">
                          <input
                            type="range"
                            min="12"
                            max="18"
                            value={appearanceSettings.fontSize}
                            onChange={(e) => {
                              const newSize = parseInt(e.target.value);
                              setAppearanceSettings(prev => ({ ...prev, fontSize: newSize }));
                              // Apply font size to root
                              document.documentElement.style.setProperty('--base-font-size', `${newSize}px`);
                              setSaveStatus('preference-updated');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">Large</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Preview: <span style={{ fontSize: `${appearanceSettings.fontSize}px` }}>The quick brown fox jumps over the lazy dog</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {appearanceSettings.fontSize}px
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Font Family */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Font Family</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { name: 'System Default', id: 'system', family: 'ui-sans-serif, system-ui' },
                          { name: 'Inter', id: 'inter', family: 'Inter, sans-serif' },
                          { name: 'Roboto', id: 'roboto', family: 'Roboto, sans-serif' }
                        ].map((font) => {
                          const isActive = appearanceSettings.fontFamily === font.id;
                          return (
                            <div
                              key={font.name}
                              className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:shadow-md ${
                                isActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                              }`}
                              style={{ fontFamily: font.family }}
                              onClick={() => {
                                setAppearanceSettings(prev => ({ ...prev, fontFamily: font.id }));
                                // Apply font to root
                                document.documentElement.style.setProperty('--font-family', font.family);
                                setSaveStatus('preference-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm">{font.name}</p>
                                  <p className="text-xs text-muted-foreground">Aa Bb Cc 123</p>
                                </div>
                                {isActive && (
                                  <Check className="h-4 w-4 text-blue-500" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Advanced Display Preferences */}
                <div className="space-y-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Display Preferences
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        key: 'compactMode', 
                        label: 'Compact Mode', 
                        desc: 'Reduce spacing and padding for more content',
                        icon: '📐'
                      },
                      { 
                        key: 'animationsEnabled', 
                        label: 'Smooth Animations', 
                        desc: 'Enable beautiful transitions and micro-interactions',
                        icon: '✨'
                      },
                      { 
                        key: 'showTooltips', 
                        label: 'Helpful Tooltips', 
                        desc: 'Show informative tooltips on hover',
                        icon: '💡'
                      },
                      { 
                        key: 'autoSave', 
                        label: 'Auto-Save Settings', 
                        desc: 'Automatically save your preferences',
                        icon: '💾'
                      }
                    ].map((pref) => (
                      <div key={pref.key} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <span className="text-xl">{pref.icon}</span>
                            <div className="space-y-1">
                              <Label className="font-medium">{pref.label}</Label>
                              <p className="text-sm text-muted-foreground leading-relaxed">{pref.desc}</p>
                            </div>
                          </div>
                          <Switch
                            checked={preferences[pref.key]}
                            onCheckedChange={(checked) => {
                              setPreferences(prev => ({ ...prev, [pref.key]: checked }));
                              
                              // Apply immediate visual changes
                              const body = document.body;
                              
                              if (pref.key === 'compactMode') {
                                if (checked) {
                                  body.classList.add('compact-mode');
                                  // Reduce all padding and margins
                                  const cards = document.querySelectorAll('.p-4, .p-5, .p-6');
                                  cards.forEach(card => {
                                    card.style.padding = '0.5rem';
                                  });
                                } else {
                                  body.classList.remove('compact-mode');
                                  // Restore normal padding
                                  const cards = document.querySelectorAll('.p-4, .p-5, .p-6');
                                  cards.forEach(card => {
                                    card.style.padding = '';
                                  });
                                }
                              }
                              
                              if (pref.key === 'animationsEnabled') {
                                if (checked) {
                                  body.style.setProperty('--animation-duration', '0.3s');
                                  body.classList.remove('no-animations');
                                } else {
                                  body.style.setProperty('--animation-duration', '0s');
                                  body.classList.add('no-animations');
                                }
                              }
                              
                              if (pref.key === 'showTooltips') {
                                const tooltips = document.querySelectorAll('[title]');
                                tooltips.forEach(tooltip => {
                                  tooltip.style.pointerEvents = checked ? 'auto' : 'none';
                                });
                              }
                              
                              setSaveStatus('preference-updated');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Layout Options */}
                <div className="space-y-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Layout & Navigation
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: 'Sidebar Navigation',
                        id: 'sidebar',
                        desc: 'Classic sidebar with icons and labels',
                        preview: 'flex h-12 bg-slate-100 rounded'
                      },
                      {
                        name: 'Top Navigation',
                        id: 'topbar', 
                        desc: 'Horizontal navigation bar at the top',
                        preview: 'flex flex-col h-12 bg-slate-100 rounded'
                      }
                    ].map((layout) => {
                      const isActive = appearanceSettings.layoutStyle === layout.id;
                      return (
                        <div
                          key={layout.name}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                            isActive 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                          onClick={() => {
                            setAppearanceSettings(prev => ({ ...prev, layoutStyle: layout.id }));
                            
                            // Apply immediate layout changes with visual feedback
                            const body = document.body;
                            const sidebar = document.querySelector('.sidebar');
                            const mainContent = document.querySelector('.main-content, main');
                            
                            // Clear previous layout classes
                            body.classList.remove('layout-sidebar', 'layout-topbar');
                            
                            if (layout.id === 'sidebar') {
                              body.classList.add('layout-sidebar');
                              if (sidebar) {
                                sidebar.style.transform = 'translateX(0)';
                                sidebar.style.opacity = '1';
                              }
                              if (mainContent) {
                                mainContent.style.marginLeft = '16rem';
                                mainContent.style.transition = 'margin-left 0.3s ease';
                              }
                            } else if (layout.id === 'topbar') {
                              body.classList.add('layout-topbar');
                              if (sidebar) {
                                sidebar.style.transform = 'translateX(-100%)';
                                sidebar.style.opacity = '0';
                              }
                              if (mainContent) {
                                mainContent.style.marginLeft = '0';
                                mainContent.style.transition = 'margin-left 0.3s ease';
                              }
                              
                              // Show visual indication of top navigation
                              const header = document.querySelector('header, .header');
                              if (header) {
                                header.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
                                header.style.color = 'white';
                                header.style.transition = 'all 0.3s ease';
                              }
                            }
                            
                            // Set data attribute for CSS targeting
                            document.documentElement.setAttribute('data-layout', layout.id);
                            
                            setSaveStatus('layout-changed');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                        <div className="space-y-3">
                          <div className={layout.preview}>
                            <div className="w-8 h-8 bg-blue-500 rounded m-2"></div>
                            <div className="flex-1 space-y-1 py-2">
                              <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-2 bg-slate-300 rounded w-1/2"></div>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{layout.name}</p>
                            <p className="text-xs text-muted-foreground">{layout.desc}</p>
                          </div>
                          {isActive && (
                            <div className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-blue-500" />
                              <span className="text-xs text-blue-600 font-medium">Current</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Center
                </CardTitle>
                <CardDescription>
                  🔔 Configure how and when you receive notifications with professional controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Notification Status Overview */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Bell className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Notification Status</h4>
                        <p className="text-sm text-slate-600">
                          {Object.values(notifications).filter(Boolean).length} of {Object.keys(notifications).length} notifications enabled
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Test notification
                          if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification('PiwPiw Test Notification', {
                              body: 'This is a test notification from your dashboard!',
                              icon: '/favicon.ico'
                            });
                          } else if (Notification.permission !== 'denied') {
                            Notification.requestPermission().then((permission) => {
                              if (permission === 'granted') {
                                new Notification('PiwPiw Test Notification', {
                                  body: 'Notifications are now enabled!',
                                  icon: '/favicon.ico'
                                });
                              }
                            });
                          }
                          setSaveStatus('notification-tested');
                          setTimeout(() => setSaveStatus(''), 2000);
                        }}
                      >
                        <Bell className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {Object.values(notifications).filter(Boolean).length} Active
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Email Notifications */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Notifications
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {[notifications.email, notifications.security, notifications.updates, notifications.marketing].filter(Boolean).length}/4 Active
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        key: 'email', 
                        label: 'General Updates', 
                        desc: 'Receive general updates and announcements', 
                        icon: Mail,
                        priority: 'Medium',
                        frequency: 'Weekly'
                      },
                      { 
                        key: 'security', 
                        label: 'Security Alerts', 
                        desc: 'Important security and login notifications', 
                        icon: Shield,
                        priority: 'High',
                        frequency: 'Instant'
                      },
                      { 
                        key: 'updates', 
                        label: 'Product Updates', 
                        desc: 'New features and improvements', 
                        icon: Zap,
                        priority: 'Medium',
                        frequency: 'Bi-weekly'
                      },
                      { 
                        key: 'marketing', 
                        label: 'Marketing & Offers', 
                        desc: 'Promotional content and special offers', 
                        icon: MessageSquare,
                        priority: 'Low',
                        frequency: 'Monthly'
                      }
                    ].map((notif) => {
                      const Icon = notif.icon;
                      const isActive = notifications[notif.key];
                      return (
                        <div 
                          key={notif.key} 
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                            isActive 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <Label className="font-medium">{notif.label}</Label>
                                <p className="text-sm text-muted-foreground leading-relaxed">{notif.desc}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      notif.priority === 'High' ? 'text-red-600 border-red-200' :
                                      notif.priority === 'Medium' ? 'text-orange-600 border-orange-200' :
                                      'text-slate-600 border-slate-200'
                                    }`}
                                  >
                                    {notif.priority} Priority
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{notif.frequency}</span>
                                </div>
                              </div>
                            </div>
                            <Switch
                              checked={isActive}
                              onCheckedChange={(checked) => {
                                setNotifications(prev => ({ ...prev, [notif.key]: checked }));
                                setSaveStatus('notification-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Push Notifications
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {[notifications.push, notifications.discord, notifications.serverAlerts, notifications.commandUsage].filter(Boolean).length}/4 Active
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        key: 'push', 
                        label: 'Browser Push', 
                        desc: 'Receive notifications in your browser', 
                        icon: Monitor,
                        realtime: true,
                        status: 'Browser dependent'
                      },
                      { 
                        key: 'discord', 
                        label: 'Discord Alerts', 
                        desc: 'Bot status and server notifications', 
                        icon: MessageSquare,
                        realtime: true,
                        status: 'Connected'
                      },
                      { 
                        key: 'serverAlerts', 
                        label: 'Server Alerts', 
                        desc: 'Critical server issues and downtime', 
                        icon: AlertTriangle,
                        realtime: true,
                        status: 'Monitoring'
                      },
                      { 
                        key: 'commandUsage', 
                        label: 'Usage Warnings', 
                        desc: 'High usage and rate limit warnings', 
                        icon: Activity,
                        realtime: false,
                        status: 'Batched'
                      }
                    ].map((notif) => {
                      const Icon = notif.icon;
                      const isActive = notifications[notif.key];
                      return (
                        <div 
                          key={notif.key} 
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                            isActive 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-slate-200 hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isActive ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <Label className="font-medium">{notif.label}</Label>
                                <p className="text-sm text-muted-foreground leading-relaxed">{notif.desc}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                      notif.realtime ? 'bg-green-500' : 'bg-orange-500'
                                    }`} />
                                    <span className="text-xs text-muted-foreground">
                                      {notif.realtime ? 'Real-time' : 'Batched'}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{notif.status}</span>
                                </div>
                              </div>
                            </div>
                            <Switch
                              checked={isActive}
                              onCheckedChange={(checked) => {
                                setNotifications(prev => ({ ...prev, [notif.key]: checked }));
                                setSaveStatus('notification-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Advanced Settings */}
                <div className="space-y-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Sound & Advanced Settings
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sound Settings */}
                    <div className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                      preferences.soundEnabled 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-slate-200 hover:border-purple-300'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            preferences.soundEnabled ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {preferences.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                          </div>
                          <div className="space-y-1">
                            <Label className="font-medium">Notification Sounds</Label>
                            <p className="text-sm text-muted-foreground">Play sounds for incoming notifications</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-6 text-xs"
                              onClick={() => {
                                if (preferences.soundEnabled) {
                                  // Play test sound
                                  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+PyvGclByz7x/DTgzETJmqD7eOocRgOUqPo7r1LF');
                                  audio.play().catch(() => {});
                                }
                                setSaveStatus('sound-tested');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            >
                              🔊 Test Sound
                            </Button>
                          </div>
                        </div>
                        <Switch
                          checked={preferences.soundEnabled}
                          onCheckedChange={(checked) => {
                            setPreferences(prev => ({ ...prev, soundEnabled: checked }));
                            setSaveStatus('sound-updated');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        />
                      </div>
                    </div>

                    {/* Do Not Disturb */}
                    <div className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                      notifications.doNotDisturb 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-slate-200 hover:border-amber-300'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            notifications.doNotDisturb ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Moon className="w-4 h-4" />
                          </div>
                          <div className="space-y-1">
                            <Label className="font-medium">Do Not Disturb</Label>
                            <p className="text-sm text-muted-foreground">Pause all notifications temporarily</p>
                            {notifications.doNotDisturb && (
                              <div className="text-xs text-amber-600 font-medium mt-1">
                                🌙 Quiet mode active
                              </div>
                            )}
                          </div>
                        </div>
                        <Switch
                          checked={notifications.doNotDisturb || false}
                          onCheckedChange={(checked) => {
                            setNotifications(prev => ({ ...prev, doNotDisturb: checked }));
                            setSaveStatus(checked ? 'dnd-enabled' : 'dnd-disabled');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="font-medium">Quick Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Enable all notifications
                        setNotifications(prev => Object.keys(prev).reduce((acc, key) => {
                          acc[key] = key !== 'doNotDisturb' ? true : false;
                          return acc;
                        }, {}));
                        setSaveStatus('all-notifications-enabled');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Enable All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Disable all notifications except security
                        setNotifications(prev => Object.keys(prev).reduce((acc, key) => {
                          acc[key] = key === 'security' ? true : false;
                          return acc;
                        }, {}));
                        setSaveStatus('only-security-enabled');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Security Only
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Disable all notifications
                        setNotifications(prev => Object.keys(prev).reduce((acc, key) => {
                          acc[key] = false;
                          return acc;
                        }, {}));
                        setSaveStatus('all-notifications-disabled');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Disable All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy & Security Settings */}
          {activeTab === 'privacy' && (
            <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security Center
                </CardTitle>
                <CardDescription>
                  🔐 Advanced privacy controls and enterprise-grade security features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Security Score & Overview */}
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Security Dashboard</h4>
                        <p className="text-sm text-slate-600">Your account security health</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        {privacy.securityScore || 85}%
                      </div>
                      <p className="text-xs text-slate-500">Security Score</p>
                    </div>
                  </div>
                  
                  <Progress 
                    value={privacy.securityScore || 85} 
                    className="h-3 mb-4" 
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white/60 rounded-lg border border-emerald-100">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        accountData.twoFactorEnabled ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {accountData.twoFactorEnabled ? <Check className="w-4 h-4 text-white" /> : <AlertTriangle className="w-4 h-4 text-white" />}
                      </div>
                      <p className="text-xs font-medium">2FA Status</p>
                      <p className="text-xs text-slate-600">{accountData.twoFactorEnabled ? 'Active' : 'Inactive'}</p>
                    </div>
                    
                    <div className="text-center p-3 bg-white/60 rounded-lg border border-emerald-100">
                      <div className="w-8 h-8 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-medium">Password</p>
                      <p className="text-xs text-slate-600">Strong</p>
                    </div>
                    
                    <div className="text-center p-3 bg-white/60 rounded-lg border border-emerald-100">
                      <div className="w-8 h-8 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-medium">Last Login</p>
                      <p className="text-xs text-slate-600">2 mins ago</p>
                    </div>
                    
                    <div className="text-center p-3 bg-white/60 rounded-lg border border-emerald-100">
                      <div className="w-8 h-8 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-medium">Sessions</p>
                      <p className="text-xs text-slate-600">3 Active</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSaveStatus('security-analyzed');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Search className="w-4 h-4 mr-1" />
                      Run Security Scan
                    </Button>
                  </div>
                </div>

                {/* Profile Privacy */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile Privacy
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {[privacy.profilePublic, privacy.showStats, privacy.publicActivity].filter(Boolean).length}/3 Public
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        key: 'profilePublic', 
                        label: 'Public Profile', 
                        desc: 'Make your profile visible to other users', 
                        icon: Globe,
                        risk: 'Medium',
                        impact: 'Others can see your profile info'
                      },
                      { 
                        key: 'showStats', 
                        label: 'Show Statistics', 
                        desc: 'Display your bot usage statistics publicly', 
                        icon: BarChart3,
                        risk: 'Low',
                        impact: 'Usage data visible to others'
                      },
                      { 
                        key: 'publicActivity', 
                        label: 'Public Activity', 
                        desc: 'Show your recent activity to others', 
                        icon: Activity,
                        risk: 'High',
                        impact: 'Activity timeline visible'
                      },
                      { 
                        key: 'indexable', 
                        label: 'Search Indexing', 
                        desc: 'Allow search engines to index your profile', 
                        icon: Search,
                        risk: 'Medium',
                        impact: 'Profile appears in search results'
                      }
                    ].map((setting) => {
                      const Icon = setting.icon;
                      const isActive = privacy[setting.key];
                      return (
                        <div 
                          key={setting.key} 
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                            isActive 
                              ? 'border-indigo-500 bg-indigo-50' 
                              : 'border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <Label className="font-medium">{setting.label}</Label>
                                <p className="text-sm text-muted-foreground leading-relaxed">{setting.desc}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      setting.risk === 'High' ? 'text-red-600 border-red-200' :
                                      setting.risk === 'Medium' ? 'text-orange-600 border-orange-200' :
                                      'text-green-600 border-green-200'
                                    }`}
                                  >
                                    {setting.risk} Risk
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{setting.impact}</span>
                                </div>
                              </div>
                            </div>
                            <Switch
                              checked={isActive}
                              onCheckedChange={(checked) => {
                                setPrivacy(prev => ({ ...prev, [setting.key]: checked }));
                                setSaveStatus('privacy-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Data & Analytics */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Data & Analytics
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {[privacy.allowAnalytics, privacy.shareUsageData, privacy.enableTelemetry].filter(Boolean).length}/3 Enabled
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        key: 'allowAnalytics', 
                        label: 'Usage Analytics', 
                        desc: 'Help improve the service with anonymous usage data', 
                        icon: BarChart3,
                        dataType: 'Anonymous',
                        frequency: 'Real-time'
                      },
                      { 
                        key: 'shareUsageData', 
                        label: 'Share Usage Data', 
                        desc: 'Share aggregated usage data for research', 
                        icon: Database,
                        dataType: 'Aggregated',
                        frequency: 'Weekly'
                      },
                      { 
                        key: 'enableTelemetry', 
                        label: 'Telemetry Data', 
                        desc: 'Send diagnostic and performance data', 
                        icon: Activity,
                        dataType: 'Technical',
                        frequency: 'Daily'
                      },
                      { 
                        key: 'crashReports', 
                        label: 'Crash Reports', 
                        desc: 'Automatically send crash reports to help fix bugs', 
                        icon: AlertTriangle,
                        dataType: 'Error logs',
                        frequency: 'On incident'
                      }
                    ].map((setting) => {
                      const Icon = setting.icon;
                      const isActive = privacy[setting.key];
                      return (
                        <div 
                          key={setting.key} 
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                            isActive 
                              ? 'border-cyan-500 bg-cyan-50' 
                              : 'border-slate-200 hover:border-cyan-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isActive ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <Label className="font-medium">{setting.label}</Label>
                                <p className="text-sm text-muted-foreground leading-relaxed">{setting.desc}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                                    {setting.dataType}
                                  </span>
                                  <span className="text-xs text-muted-foreground">{setting.frequency}</span>
                                </div>
                              </div>
                            </div>
                            <Switch
                              checked={isActive}
                              onCheckedChange={(checked) => {
                                setPrivacy(prev => ({ ...prev, [setting.key]: checked }));
                                setSaveStatus('data-preference-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Advanced Security */}
                <div className="space-y-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Advanced Security Controls
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Session Management */}
                    <div className="p-4 border-2 border-violet-200 bg-violet-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-500 text-white flex items-center justify-center">
                          <Monitor className="w-4 h-4" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <Label className="font-medium">Active Sessions</Label>
                            <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Current session (Windows)</span>
                              <Badge variant="secondary" className="text-xs">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Mobile device</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-xs text-red-600 hover:text-red-700"
                                onClick={() => {
                                  setSaveStatus('session-revoked');
                                  setTimeout(() => setSaveStatus(''), 2000);
                                }}
                              >
                                Revoke
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setSaveStatus('sessions-managed');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }}
                          >
                            <LogOut className="w-4 h-4 mr-1" />
                            Manage All Sessions
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Login Security */}
                    <div className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                          <Key className="w-4 h-4" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <Label className="font-medium">Login Security</Label>
                            <p className="text-sm text-muted-foreground">Advanced login protection</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Login alerts</span>
                              <Switch
                                checked={privacy.loginAlerts !== false}
                                onCheckedChange={(checked) => {
                                  setPrivacy(prev => ({ ...prev, loginAlerts: checked }));
                                  setSaveStatus('security-updated');
                                  setTimeout(() => setSaveStatus(''), 2000);
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Suspicious activity blocking</span>
                              <Switch
                                checked={privacy.suspiciousBlocking !== false}
                                onCheckedChange={(checked) => {
                                  setPrivacy(prev => ({ ...prev, suspiciousBlocking: checked }));
                                  setSaveStatus('security-updated');
                                  setTimeout(() => setSaveStatus(''), 2000);
                                }}
                              />
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setShowPasswordModal(true);
                            }}
                          >
                            <Key className="w-4 h-4 mr-1" />
                            Change Password
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Data Export & Deletion */}
                    <div className="p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center">
                          <Download className="w-4 h-4" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <Label className="font-medium">Data Control</Label>
                            <p className="text-sm text-muted-foreground">Export or delete your data</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                // Create and download a mock data export
                                const exportData = {
                                  user: user,
                                  settings: {
                                    privacy: privacy,
                                    notifications: notifications,
                                    preferences: preferences
                                  },
                                  exportDate: new Date().toISOString(),
                                  version: "1.0"
                                };
                                
                                const dataStr = JSON.stringify(exportData, null, 2);
                                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                                
                                const exportFileDefaultName = `piwpiw-data-export-${new Date().toISOString().split('T')[0]}.json`;
                                
                                const linkElement = document.createElement('a');
                                linkElement.setAttribute('href', dataUri);
                                linkElement.setAttribute('download', exportFileDefaultName);
                                linkElement.click();
                                
                                setSaveStatus('data-exported');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Export
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                const confirmed = window.confirm(
                                  "⚠️ DANGER: This will permanently delete your account and all data!\n\n" +
                                  "Are you absolutely sure? This action cannot be undone.\n\n" +
                                  "Type 'DELETE' in the next prompt to confirm."
                                );
                                
                                if (confirmed) {
                                  const verification = window.prompt(
                                    "Type 'DELETE' to confirm account deletion:"
                                  );
                                  
                                  if (verification === 'DELETE') {
                                    setSaveStatus('account-deletion-confirmed');
                                    setTimeout(() => {
                                      setSaveStatus('account-deletion-processing');
                                      setTimeout(() => setSaveStatus(''), 3000);
                                    }, 2000);
                                  } else {
                                    setSaveStatus('account-deletion-cancelled');
                                    setTimeout(() => setSaveStatus(''), 2000);
                                  }
                                } else {
                                  setSaveStatus('account-deletion-cancelled');
                                  setTimeout(() => setSaveStatus(''), 2000);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* API Access */}
                    <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center">
                          <Code className="w-4 h-4" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <Label className="font-medium">API Access</Label>
                            <p className="text-sm text-muted-foreground">Manage API keys and integrations</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Active API keys</span>
                              <Badge variant="secondary">2</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Third-party apps</span>
                              <Badge variant="secondary">1</Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setShowAPIModal(true);
                            }}
                          >
                            <Code className="w-4 h-4 mr-1" />
                            Manage API Keys
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="font-medium">Privacy Quick Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Maximum privacy
                        setPrivacy(prev => ({
                          ...prev,
                          profilePublic: false,
                          showStats: false,
                          publicActivity: false,
                          indexable: false,
                          allowAnalytics: false,
                          shareUsageData: false,
                          enableTelemetry: false,
                          crashReports: false
                        }));
                        setSaveStatus('maximum-privacy-enabled');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <EyeOff className="w-4 h-4 mr-1" />
                      Maximum Privacy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Balanced privacy
                        setPrivacy(prev => ({
                          ...prev,
                          profilePublic: true,
                          showStats: false,
                          publicActivity: false,
                          indexable: false,
                          allowAnalytics: true,
                          shareUsageData: false,
                          enableTelemetry: true,
                          crashReports: true
                        }));
                        setSaveStatus('balanced-privacy-enabled');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Scale className="w-4 h-4 mr-1" />
                      Balanced
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Public profile
                        setPrivacy(prev => ({
                          ...prev,
                          profilePublic: true,
                          showStats: true,
                          publicActivity: true,
                          indexable: true,
                          allowAnalytics: true,
                          shareUsageData: true,
                          enableTelemetry: true,
                          crashReports: true
                        }));
                        setSaveStatus('public-profile-enabled');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      Public Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Settings */}
          {activeTab === 'preferences' && (
            <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Application Preferences
                </CardTitle>
                <CardDescription>
                  Customize your application behavior, performance, and advanced settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Smart Interface Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Smart Interface Settings
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {Object.values(preferences).filter(v => v === true).length} active
                    </Badge>
                  </div>
                  
                  <div className="grid gap-4">
                    {[
                      { 
                        key: 'autoSave', 
                        label: 'Auto Save', 
                        desc: 'Automatically save changes as you work', 
                        icon: Save,
                        category: 'Productivity',
                        advanced: false
                      },
                      { 
                        key: 'autoRefresh', 
                        label: 'Auto Refresh', 
                        desc: 'Automatically refresh data every 30 seconds', 
                        icon: RefreshCw,
                        category: 'Data',
                        advanced: false
                      },
                      { 
                        key: 'compactMode', 
                        label: 'Compact Mode', 
                        desc: 'Use a more compact interface layout', 
                        icon: Monitor,
                        category: 'Layout',
                        advanced: false
                      },
                      { 
                        key: 'smartNotifications', 
                        label: 'Smart Notifications', 
                        desc: 'AI-powered priority filtering for notifications', 
                        icon: Bell,
                        category: 'Intelligence',
                        advanced: true
                      },
                      { 
                        key: 'predictiveSearch', 
                        label: 'Predictive Search', 
                        desc: 'Search suggestions based on your usage patterns', 
                        icon: Search,
                        category: 'Intelligence',
                        advanced: true
                      },
                      { 
                        key: 'adaptiveUI', 
                        label: 'Adaptive UI', 
                        desc: 'Interface adapts to your most-used features', 
                        icon: Activity,
                        category: 'Intelligence',
                        advanced: true
                      }
                    ].map((pref) => {
                      const Icon = pref.icon;
                      const isEnabled = preferences[pref.key] || false;
                      
                      return (
                        <div key={pref.key} className={`relative p-4 border-2 rounded-lg transition-all duration-200 ${
                          isEnabled 
                            ? 'border-blue-200 bg-blue-50/50 shadow-sm' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isEnabled 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <Label className="font-medium">{pref.label}</Label>
                                  <Badge 
                                    variant={pref.advanced ? "secondary" : "outline"} 
                                    className="text-xs"
                                  >
                                    {pref.category}
                                  </Badge>
                                  {pref.advanced && (
                                    <Badge variant="gradient" className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                      AI
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{pref.desc}</p>
                                {isEnabled && (
                                  <div className="flex items-center gap-1 text-xs text-green-600">
                                    <Check className="w-3 h-3" />
                                    <span>Active & Learning</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Switch
                              checked={isEnabled}
                              onCheckedChange={(checked) => {
                                setPreferences(prev => ({ ...prev, [pref.key]: checked }));
                                setSaveStatus('preference-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Performance & Optimization */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Performance & Optimization
                  </h4>
                  
                  <div className="grid gap-4">
                    {/* Performance Mode */}
                    <div className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">Performance Mode</Label>
                          <p className="text-sm text-muted-foreground">Optimize app performance based on your usage</p>
                        </div>
                        <select 
                          className="p-2 border rounded-md bg-white min-w-[140px]"
                          value={preferences.performanceMode || 'balanced'}
                          onChange={(e) => {
                            const mode = e.target.value;
                            setPreferences(prev => ({ ...prev, performanceMode: mode }));
                            
                            // Update performance metrics based on mode
                            const metrics = document.querySelectorAll('[data-metric]');
                            metrics.forEach(metric => {
                              const type = metric.getAttribute('data-metric');
                              let value = '';
                              
                              switch (mode) {
                                case 'power-saver':
                                  value = type === 'cpu' ? '8%' : type === 'memory' ? '180MB' : '65ms';
                                  break;
                                case 'balanced':
                                  value = type === 'cpu' ? '12%' : type === 'memory' ? '256MB' : '45ms';
                                  break;
                                case 'performance':
                                  value = type === 'cpu' ? '18%' : type === 'memory' ? '384MB' : '25ms';
                                  break;
                                case 'gaming':
                                  value = type === 'cpu' ? '25%' : type === 'memory' ? '512MB' : '15ms';
                                  break;
                              }
                              metric.textContent = value;
                            });
                            
                            setSaveStatus('performance-updated');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                          <option value="power-saver">Power Saver</option>
                          <option value="balanced">Balanced</option>
                          <option value="performance">High Performance</option>
                          <option value="gaming">Gaming Mode</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-medium text-green-700">CPU Usage</div>
                          <div className="text-green-600" data-metric="cpu">12%</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-medium text-blue-700">Memory</div>
                          <div className="text-blue-600" data-metric="memory">256MB</div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="font-medium text-purple-700">Network</div>
                          <div className="text-purple-600" data-metric="network">45ms</div>
                        </div>
                      </div>
                    </div>

                    {/* Cache Management */}
                    <div className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">Cache Management</Label>
                          <p className="text-sm text-muted-foreground">Manage application cache and temporary data</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Cache Size</span>
                        <span className="font-medium" data-cache-size>124 MB</span>
                      </div>
                      <Progress value={35} className="h-2" data-cache-progress />
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            // Simulate cache clearing with progress
                            setSaveStatus('cache-clearing');
                            setTimeout(() => {
                              // Update cache size display
                              const cacheSizeEl = document.querySelector('[data-cache-size]');
                              const progressEl = document.querySelector('[data-cache-progress]');
                              if (cacheSizeEl) cacheSizeEl.textContent = '12 MB';
                              if (progressEl) progressEl.value = 5;
                              
                              setSaveStatus('cache-cleared');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }, 1500);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Clear Cache
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            // Simulate cache optimization
                            setSaveStatus('cache-optimizing');
                            setTimeout(() => {
                              const cacheSizeEl = document.querySelector('[data-cache-size]');
                              const progressEl = document.querySelector('[data-cache-progress]');
                              if (cacheSizeEl) cacheSizeEl.textContent = '89 MB';
                              if (progressEl) progressEl.value = 25;
                              
                              setSaveStatus('cache-optimized');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }, 2000);
                          }}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Optimize
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Smart Automation Rules */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    Smart Automation Rules
                  </h4>
                  
                  <div className="space-y-3">
                    {[
                      {
                        id: 1,
                        name: 'Auto-organize Dashboard',
                        description: 'Automatically arrange widgets based on usage frequency',
                        enabled: preferences.autoOrganize || false,
                        trigger: 'Daily at 6 AM',
                        impact: 'High'
                      },
                      {
                        id: 2,
                        name: 'Smart Data Cleanup',
                        description: 'Remove old logs and temporary files automatically',
                        enabled: preferences.autoCleanup || false,
                        trigger: 'Weekly on Sunday',
                        impact: 'Medium'
                      },
                      {
                        id: 3,
                        name: 'Predictive Preloading',
                        description: 'Preload likely-needed data based on your patterns',
                        enabled: preferences.predictiveLoad || false,
                        trigger: 'Real-time',
                        impact: 'Performance'
                      }
                    ].map((rule) => (
                      <div key={rule.id} className={`p-4 border-2 rounded-lg transition-all ${
                        rule.enabled 
                          ? 'border-green-200 bg-green-50/30' 
                          : 'border-gray-200 bg-gray-50/30'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium">{rule.name}</h5>
                              <Badge variant={rule.enabled ? "success" : "secondary"} className="text-xs">
                                {rule.enabled ? 'Active' : 'Disabled'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {rule.impact}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{rule.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Trigger: {rule.trigger}</span>
                              {rule.enabled && (
                                <span className="flex items-center gap-1 text-green-600">
                                  <Activity className="w-3 h-3" />
                                  Running
                                </span>
                              )}
                            </div>
                          </div>
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={(checked) => {
                              const key = rule.name.toLowerCase().replace(/[^a-z]/g, '');
                              setPreferences(prev => ({ ...prev, [key]: checked }));
                              setSaveStatus('automation-updated');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Advanced Configuration */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Advanced Configuration
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Default Settings */}
                    <div className="space-y-3">
                      <Label className="font-medium">Application Defaults</Label>
                      
                      <div className="space-y-2">
                        <Label className="text-sm">Default Landing Page</Label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={preferences.defaultView || 'dashboard'}
                          onChange={(e) => {
                            setPreferences(prev => ({ ...prev, defaultView: e.target.value }));
                            setSaveStatus('default-updated');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                          <option value="dashboard">📊 Dashboard</option>
                          <option value="servers">🖥️ Servers</option>
                          <option value="analytics">📈 Analytics</option>
                          <option value="commands">⚡ Commands</option>
                          <option value="settings">⚙️ Settings</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Items Per Page</Label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={preferences.itemsPerPage || 25}
                          onChange={(e) => {
                            setPreferences(prev => ({ ...prev, itemsPerPage: parseInt(e.target.value) }));
                            setSaveStatus('pagination-updated');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                          <option value={5}>5 items</option>
                          <option value={10}>10 items</option>
                          <option value={25}>25 items (Recommended)</option>
                          <option value={50}>50 items</option>
                          <option value={100}>100 items</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Date Format</Label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={preferences.dateFormat || 'relative'}
                          onChange={(e) => {
                            setPreferences(prev => ({ ...prev, dateFormat: e.target.value }));
                            setSaveStatus('format-updated');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                          <option value="relative">Relative (2 hours ago)</option>
                          <option value="full">Full (January 15, 2024 at 3:45 PM)</option>
                          <option value="short">Short (Jan 15, 2024)</option>
                          <option value="iso">ISO (2024-01-15T15:45:00)</option>
                        </select>
                      </div>
                    </div>

                    {/* Developer Options */}
                    <div className="space-y-3">
                      <Label className="font-medium">Developer Options</Label>
                      
                      <div className="space-y-3">
                        {[
                          { key: 'debugMode', label: 'Debug Mode', desc: 'Show detailed error information' },
                          { key: 'developerTools', label: 'Developer Tools', desc: 'Enable advanced debugging features' },
                          { key: 'betaFeatures', label: 'Beta Features', desc: 'Access experimental functionality' },
                          { key: 'apiLogging', label: 'API Request Logging', desc: 'Log all API calls for debugging' }
                        ].map((opt) => (
                          <div key={opt.key} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="flex items-center gap-2">
                                <Label className="text-sm">{opt.label}</Label>
                                {opt.key === 'betaFeatures' && (
                                  <Badge variant="destructive" className="text-xs">BETA</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{opt.desc}</p>
                            </div>
                            <Switch
                              checked={preferences[opt.key] || false}
                              onCheckedChange={(checked) => {
                                setPreferences(prev => ({ ...prev, [opt.key]: checked }));
                                setSaveStatus('developer-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Quick Actions
                    </h5>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-auto py-3"
                      onClick={() => {
                        // Reset to optimal defaults
                        setPreferences({
                          autoSave: true,
                          autoRefresh: true,
                          compactMode: false,
                          smartNotifications: true,
                          performanceMode: 'balanced',
                          defaultView: 'dashboard',
                          itemsPerPage: 25
                        });
                        setSaveStatus('preferences-optimized');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Settings className="w-4 h-4 mb-1" />
                      <span className="text-xs">Optimize</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-auto py-3"
                      onClick={() => {
                        // Reset all to defaults
                        setPreferences({});
                        setSaveStatus('preferences-reset');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mb-1" />
                      <span className="text-xs">Reset</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-auto py-3"
                      onClick={() => {
                        // Export preferences
                        const prefData = JSON.stringify(preferences, null, 2);
                        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(prefData);
                        const link = document.createElement('a');
                        link.href = dataUri;
                        link.download = 'piwpiw-preferences.json';
                        link.click();
                        setSaveStatus('preferences-exported');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Download className="w-4 h-4 mb-1" />
                      <span className="text-xs">Export</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-auto py-3"
                      onClick={() => {
                        setSaveStatus('preferences-synced');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Activity className="w-4 h-4 mb-1" />
                      <span className="text-xs">Sync</span>
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {/* Data Management Settings */}
          {activeTab === 'data' && (
            <Card className="piwpiw-card-hover animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management Center
                </CardTitle>
                <CardDescription>
                  Comprehensive data management, backup automation, and intelligent analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Data Dashboard */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Data Overview Dashboard
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Total Records', value: '47,392', change: '+12%', color: 'blue', icon: '📊' },
                      { name: 'Data Quality', value: '94.7%', change: '+2.1%', color: 'green', icon: '✅' },
                      { name: 'Storage Efficiency', value: '87.3%', change: '+5.4%', color: 'purple', icon: '⚡' },
                      { name: 'Backup Health', value: '100%', change: '0%', color: 'emerald', icon: '🛡️' }
                    ].map((metric) => (
                      <div 
                        key={metric.name} 
                        className={`p-4 border-2 rounded-lg bg-${metric.color}-50/30 border-${metric.color}-200 cursor-pointer transition-all hover:scale-105 hover:shadow-lg`}
                        onClick={() => {
                          setSaveStatus(`metric-${metric.name.toLowerCase().replace(/\s+/g, '-')}-analyzed`);
                          setTimeout(() => setSaveStatus(''), 2000);
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{metric.icon}</span>
                          <Badge variant="outline" className={`text-${metric.color}-700 bg-${metric.color}-100`}>
                            {metric.change}
                          </Badge>
                        </div>
                        <div className={`text-2xl font-bold text-${metric.color}-700`}>{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.name}</div>
                        <div className="mt-2 text-xs text-muted-foreground opacity-70">Click for details</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Dashboard Quick Actions */}
                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSaveStatus('dashboard-refreshed');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Data
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSaveStatus('analytics-opened');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSaveStatus('health-check-completed');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Health Check
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Smart Data Categories */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Smart Data Categories
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      6 categories managed
                    </Badge>
                  </div>
                  
                  <div className="grid gap-4">
                    {[
                      {
                        name: 'User Profiles & Settings',
                        size: '850 MB',
                        files: '12,847',
                        lastSync: '2 hours ago',
                        status: 'active',
                        retention: '2 years',
                        icon: User,
                        color: 'blue'
                      },
                      {
                        name: 'Server Logs & Analytics',
                        size: '2.1 GB',
                        files: '89,450',
                        lastSync: '15 min ago',
                        status: 'syncing',
                        retention: '6 months',
                        icon: Activity,
                        color: 'green'
                      },
                      {
                        name: 'Bot Commands & Responses',
                        size: '340 MB',
                        files: '5,692',
                        lastSync: '1 hour ago',
                        status: 'active',
                        retention: '1 year',
                        icon: Bot,
                        color: 'purple'
                      },
                      {
                        name: 'Configuration Backups',
                        size: '120 MB',
                        files: '1,234',
                        lastSync: '4 hours ago',
                        status: 'active',
                        retention: '5 years',
                        icon: Settings,
                        color: 'orange'
                      }
                    ].map((category) => {
                      const Icon = category.icon;
                      return (
                        <div key={category.name} className={`p-4 border-2 rounded-lg transition-all hover:shadow-sm ${
                          category.status === 'syncing' 
                            ? 'border-blue-200 bg-blue-50/30' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`w-10 h-10 rounded-lg bg-${category.color}-500 text-white flex items-center justify-center`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{category.name}</h5>
                                  <Badge 
                                    variant={category.status === 'syncing' ? 'default' : 'secondary'} 
                                    className="text-xs"
                                  >
                                    {category.status === 'syncing' ? '🔄 Syncing' : '✅ Active'}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                  <span>Size: <strong>{category.size}</strong></span>
                                  <span>Files: <strong>{category.files}</strong></span>
                                  <span>Last sync: <strong>{category.lastSync}</strong></span>
                                  <span>Retention: <strong>{categoryConfigMap[category.name]?.retention || category.retention}</strong></span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => exportCategoryData(category)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openCategorySettings(category)}
                              >
                                <Settings className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Advanced Export Options */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Advanced Export & Import
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Export Options */}
                    <div className="space-y-4">
                      <h5 className="font-medium">Export Options</h5>
                      
                      <div className="space-y-3">
                        {[
                          { format: 'JSON', desc: 'Complete data export', size: '2.4 MB', icon: '📄' },
                          { format: 'CSV', desc: 'Spreadsheet compatible', size: '1.8 MB', icon: '📊' },
                          { format: 'XML', desc: 'Structured export', size: '3.1 MB', icon: '🏷️' },
                          { format: 'PDF', desc: 'Readable report', size: '1.2 MB', icon: '📋' }
                        ].map((option) => (
                          <div key={option.format} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{option.icon}</span>
                              <div>
                                <div className="font-medium">{option.format}</div>
                                <div className="text-sm text-muted-foreground">{option.desc}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{option.size}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Simulate export with format
                                  setSaveStatus(`export-${option.format.toLowerCase()}`);
                                  setTimeout(() => {
                                    // Create and download mock file
                                    const data = {
                                      format: option.format,
                                      exportDate: new Date().toISOString(),
                                      user: user,
                                      dataSize: option.size
                                    };
                                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = `piwpiw-export-${option.format.toLowerCase()}-${new Date().toISOString().split('T')[0]}.${option.format.toLowerCase()}`;
                                    link.click();
                                    URL.revokeObjectURL(url);
                                    
                                    setSaveStatus('export-completed');
                                    setTimeout(() => setSaveStatus(''), 2000);
                                  }, 1500);
                                }}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Import Options */}
                    <div className="space-y-4">
                      <h5 className="font-medium">Import & Restore</h5>
                      
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <div className="space-y-3">
                          <div className="text-4xl">📁</div>
                          <div>
                            <div className="font-medium">Drop files here</div>
                            <div className="text-sm text-muted-foreground">or click to browse</div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Simulate file picker
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = '.json,.csv,.xml';
                              input.onchange = (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setSaveStatus('import-processing');
                                  setTimeout(() => {
                                    setSaveStatus('import-completed');
                                    setTimeout(() => setSaveStatus(''), 2000);
                                  }, 2000);
                                }
                              };
                              input.click();
                            }}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Browse Files
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>✅ Supports: JSON, CSV, XML formats</div>
                        <div>✅ Max file size: 50 MB</div>
                        <div>✅ Auto-validation & conflict resolution</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Automated Backup System */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Automated Backup System
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-green-800">Backup Status: Active</div>
                            <div className="text-sm text-green-600">Last backup: 2 hours ago</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Next scheduled backup:</span>
                            <span className="font-medium">In 6 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Backup frequency:</span>
                            <span className="font-medium">Every 8 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Retention period:</span>
                            <span className="font-medium">30 days</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="font-medium">Backup Settings</Label>
                        {[
                          { key: 'autoBackup', label: 'Automatic Backups', desc: 'Enable scheduled backups' },
                          { key: 'incrementalBackup', label: 'Incremental Backups', desc: 'Only backup changed data' },
                          { key: 'encryptBackups', label: 'Encrypt Backups', desc: 'AES-256 encryption' },
                          { key: 'cloudSync', label: 'Cloud Synchronization', desc: 'Sync to secure cloud storage' }
                        ].map((setting) => (
                          <div key={setting.key} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{setting.label}</div>
                              <div className="text-sm text-muted-foreground">{setting.desc}</div>
                            </div>
                            <Switch
                              checked={preferences[setting.key] || false}
                              onCheckedChange={(checked) => {
                                setPreferences(prev => ({ ...prev, [setting.key]: checked }));
                                setSaveStatus('backup-setting-updated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Backup History</h5>
                      
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {[
                          { date: '2024-01-15 14:30', size: '2.4 MB', type: 'Full', status: 'completed' },
                          { date: '2024-01-15 06:30', size: '340 KB', type: 'Incremental', status: 'completed' },
                          { date: '2024-01-14 22:30', size: '180 KB', type: 'Incremental', status: 'completed' },
                          { date: '2024-01-14 14:30', size: '2.1 MB', type: 'Full', status: 'completed' },
                          { date: '2024-01-14 06:30', size: '290 KB', type: 'Incremental', status: 'completed' }
                        ].map((backup, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant={backup.type === 'Full' ? 'default' : 'secondary'} className="text-xs">
                                  {backup.type}
                                </Badge>
                                <span className="font-medium">{backup.size}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">{backup.date}</div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSaveStatus('backup-restored');
                                  setTimeout(() => setSaveStatus(''), 2000);
                                }}
                              >
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSaveStatus('backup-downloaded');
                                  setTimeout(() => setSaveStatus(''), 2000);
                                }}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSaveStatus('manual-backup-started');
                          setTimeout(() => {
                            setSaveStatus('manual-backup-completed');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }, 3000);
                        }}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Create Manual Backup
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Storage Optimization */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Storage Optimization
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-3">Current Usage</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Total Storage</span>
                            <span className="font-medium" data-total-storage>3.2 GB of 10 GB</span>
                          </div>
                          <Progress value={32} className="h-3" data-storage-progress />
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex justify-between">
                              <span>Active Data</span>
                              <span className="font-medium">2.1 GB</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cached Files</span>
                              <span className="font-medium">640 MB</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Temp Files</span>
                              <span className="font-medium">280 MB</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Redundant</span>
                              <span className="font-medium">180 MB</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-2">Optimization Recommendations</h5>
                        <div className="space-y-2 text-sm text-blue-700">
                          <div>💡 Remove duplicate files: Save ~180 MB</div>
                          <div>💡 Clear old cache: Save ~240 MB</div>
                          <div>💡 Compress archives: Save ~150 MB</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Optimization Tools</h5>
                      
                      <div className="space-y-3">
                        {[
                          { name: 'Remove Duplicates', desc: 'Find and remove duplicate files', impact: '~180 MB', icon: '🔍' },
                          { name: 'Clear Cache', desc: 'Remove temporary cached data', impact: '~240 MB', icon: '🗑️' },
                          { name: 'Compress Data', desc: 'Compress old archived data', impact: '~150 MB', icon: '📦' },
                          { name: 'Clean Logs', desc: 'Remove old log files', impact: '~90 MB', icon: '📝' }
                        ].map((tool) => (
                          <div key={tool.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{tool.icon}</span>
                              <div>
                                <div className="font-medium">{tool.name}</div>
                                <div className="text-sm text-muted-foreground">{tool.desc}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{tool.impact}</Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSaveStatus(`optimization-${tool.name.toLowerCase().replace(' ', '-')}`);
                                  setTimeout(() => {
                                    setSaveStatus('optimization-completed');
                                    setTimeout(() => setSaveStatus(''), 2000);
                                  }, 2000);
                                }}
                              >
                                Run
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                          setSaveStatus('full-optimization-started');
                          setTimeout(() => {
                            // Update storage display
                            const storageEl = document.querySelector('[data-total-storage]');
                            const progressEl = document.querySelector('[data-storage-progress]');
                            if (storageEl) storageEl.textContent = '2.3 GB of 10 GB';
                            if (progressEl) progressEl.value = 23;
                            
                            setSaveStatus('full-optimization-completed');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }, 4000);
                        }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Run Full Optimization
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Enhanced Danger Zone */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Advanced Data Controls
                  </h4>
                  
                  <div className="grid gap-4">
                    {/* Data Purge Options */}
                    <div className="p-4 border border-orange-200 rounded-lg bg-orange-50/50">
                      <h5 className="font-medium text-orange-800 mb-3">⚠️ Data Purge Options</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { name: 'Clear All Logs', desc: 'Remove all system logs (30+ days old)', risk: 'Low' },
                          { name: 'Reset Analytics', desc: 'Clear all analytics and usage data', risk: 'Medium' },
                          { name: 'Purge Old Backups', desc: 'Remove backups older than 90 days', risk: 'Medium' },
                          { name: 'Factory Reset', desc: 'Reset all settings to defaults', risk: 'High' }
                        ].map((action) => (
                          <div key={action.name} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{action.name}</span>
                                <Badge 
                                  variant={action.risk === 'High' ? 'destructive' : action.risk === 'Medium' ? 'secondary' : 'outline'}
                                  className="text-xs"
                                >
                                  {action.risk} Risk
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{action.desc}</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const confirmed = window.confirm(`Are you sure you want to ${action.name}? This action cannot be undone.`);
                                if (confirmed) {
                                  setSaveStatus(`purge-${action.name.toLowerCase().replace(' ', '-')}`);
                                  setTimeout(() => setSaveStatus(''), 2000);
                                }
                              }}
                            >
                              Execute
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Account Deletion */}
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50/50">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div className="space-y-3 flex-1">
                          <div>
                            <p className="font-medium text-red-900">🚨 Permanent Account Deletion</p>
                            <p className="text-sm text-red-700">
                              This will permanently delete your account and ALL associated data. This action is irreversible.
                            </p>
                          </div>
                          
                          <div className="space-y-2 text-sm text-red-700">
                            <div>❌ All user data and settings will be deleted</div>
                            <div>❌ All backups and exports will be removed</div>
                            <div>❌ All server configurations will be lost</div>
                            <div>❌ This action cannot be undone</div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              onClick={handleDeleteAccount} 
                              variant="destructive" 
                              size="sm"
                              disabled={saveStatus === 'saving' || saveStatus === 'deleting'}
                            >
                              {saveStatus === 'deleting' ? (
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="mr-2 h-4 w-4" />
                              )}
                              {saveStatus === 'deleting' ? 'Processing...' : 'Delete Account'}
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Create professional information modal content
                                const modalContent = document.createElement('div');
                                modalContent.innerHTML = `
                                  <div style="max-width: 400px; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                      <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                        <span style="color: white; font-size: 18px;">🚨</span>
                                      </div>
                                      <h3 style="margin: 0; color: #1f2937; font-size: 18px; font-weight: 600;">Account Deletion Process</h3>
                                    </div>
                                    <div style="color: #6b7280; margin-bottom: 20px; line-height: 1.5;">
                                      <div style="margin-bottom: 12px;"><strong>Step-by-step process:</strong></div>
                                      <div style="margin: 8px 0;">🔑 1. Enter your current password</div>
                                      <div style="margin: 8px 0;">✍️ 2. Type "DELETE" to confirm</div>
                                      <div style="margin: 8px 0;">📧 3. Wait for verification email</div>
                                      <div style="margin: 8px 0;">🔗 4. Click final confirmation link</div>
                                      <div style="margin: 8px 0;">⏰ 5. Account deleted within 24 hours</div>
                                      <div style="margin-top: 16px; padding: 12px; background: #fef2f2; border-radius: 8px; color: #dc2626; font-size: 13px;">
                                        ⚠️ This action is permanent and cannot be undone!
                                      </div>
                                    </div>
                                    <button onclick="this.parentElement.parentElement.remove()" style="width: 100%; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer;">
                                      Understood
                                    </button>
                                  </div>
                                `;
                                
                                const overlay = document.createElement('div');
                                overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';
                                overlay.appendChild(modalContent);
                                overlay.onclick = (e) => e.target === overlay && overlay.remove();
                                document.body.appendChild(overlay);
                                
                                setSaveStatus('deletion-process-explained');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }}
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Data Management Quick Actions Panel */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Quick Actions Center
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Backup Actions */}
                    <div className="p-4 border rounded-lg bg-blue-50/50 border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Backup Actions
                      </h5>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional backup progress modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 450px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="backup-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                    <span style="color: white; font-size: 20px;">💾</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Creating Instant Backup</h3>
                                    <p id="backup-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Initializing backup process...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Progress</span>
                                    <span id="backup-percentage" style="color: #3b82f6; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="backup-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div id="backup-details" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">FILES PROCESSED</div>
                                    <div id="files-count" style="color: #3b82f6; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">SIZE COMPRESSED</div>
                                    <div id="backup-size" style="color: #10b981; font-size: 16px; font-weight: 600;">0 MB</div>
                                  </div>
                                </div>
                                
                                <div id="backup-actions" style="display: flex; gap: 12px;">
                                  <button id="backup-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="backup-background" style="flex: 1; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Run in Background
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate backup progress
                            let progress = 0;
                            let files = 0;
                            let size = 0;
                            const statuses = [
                              'Scanning data directories...',
                              'Compressing user profiles...',
                              'Backing up server configurations...',
                              'Processing analytics data...',
                              'Creating backup manifest...',
                              'Finalizing backup archive...'
                            ];
                            
                            const progressInterval = setInterval(() => {
                              progress += Math.random() * 20;
                              files += Math.floor(Math.random() * 150) + 50;
                              size += Math.random() * 0.5;
                              
                              if (progress >= 100) {
                                progress = 100;
                                clearInterval(progressInterval);
                                
                                document.getElementById('backup-status').textContent = '✅ Backup completed successfully!';
                                document.getElementById('backup-actions').innerHTML = `
                                  <button onclick="this.closest('.fixed').remove()" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Download Backup
                                  </button>
                                `;
                                
                                // Create and download backup file
                                const backupData = {
                                  timestamp: new Date().toISOString(),
                                  type: 'instant_backup',
                                  files: files,
                                  size: size.toFixed(1) + ' MB',
                                  status: 'completed'
                                };
                                const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = `piwpiw-instant-backup-${new Date().toISOString().split('T')[0]}.json`;
                                link.click();
                                URL.revokeObjectURL(url);
                                
                                setSaveStatus('instant-backup-created');
                                setTimeout(() => setSaveStatus(''), 2000);
                              } else {
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('backup-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                              }
                              
                              document.getElementById('backup-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('backup-progress').style.width = progress + '%';
                              document.getElementById('files-count').textContent = files.toLocaleString();
                              document.getElementById('backup-size').textContent = size.toFixed(1) + ' MB';
                            }, 800);
                            
                            // Cancel button
                            document.getElementById('backup-cancel').onclick = () => {
                              clearInterval(progressInterval);
                              overlay.remove();
                            };
                            
                            // Background button
                            document.getElementById('backup-background').onclick = () => {
                              overlay.remove();
                              // Continue backup in background (simulation)
                              setTimeout(() => {
                                setSaveStatus('instant-backup-created');
                                setTimeout(() => setSaveStatus(''), 2000);
                              }, 5000);
                            };
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Create Instant Backup
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional backup scheduler modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 500px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 20px;">⏰</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Backup Schedule Settings</h3>
                                    <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Configure automated backup frequency</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">Backup Frequency</label>
                                  <select id="backup-frequency" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; background: white; color: #374151;">
                                    <option value="1h">Every Hour</option>
                                    <option value="4h">Every 4 Hours</option>
                                    <option value="8h" selected>Every 8 Hours (Current)</option>
                                    <option value="12h">Every 12 Hours</option>
                                    <option value="24h">Daily</option>
                                    <option value="weekly">Weekly</option>
                                  </select>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">Preferred Time</label>
                                  <input type="time" id="backup-time" value="02:00" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; background: white; color: #374151;">
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">Retention Period</label>
                                  <select id="backup-retention" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; background: white; color: #374151;">
                                    <option value="7d">7 Days</option>
                                    <option value="14d">14 Days</option>
                                    <option value="30d" selected>30 Days (Current)</option>
                                    <option value="60d">60 Days</option>
                                    <option value="90d">90 Days</option>
                                    <option value="1y">1 Year</option>
                                  </select>
                                </div>
                                
                                <div style="margin-bottom: 20px; padding: 16px; background: #f3f4f6; border-radius: 12px;">
                                  <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px; font-weight: 600;">Current Schedule</h4>
                                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-sm;">
                                    <div>
                                      <span style="color: #6b7280;">Next Backup:</span>
                                      <div style="color: #1f2937; font-weight: 500;">In 6 hours 23 min</div>
                                    </div>
                                    <div>
                                      <span style="color: #6b7280;">Last Backup:</span>
                                      <div style="color: #10b981; font-weight: 500;">2 hours ago ✅</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div style="display: flex; gap: 12px;">
                                  <button onclick="this.closest('.fixed').remove()" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="save-schedule" style="flex: 1; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Save Schedule
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            overlay.onclick = (e) => e.target === overlay && overlay.remove();
                            document.body.appendChild(overlay);
                            
                            // Save schedule button
                            document.getElementById('save-schedule').onclick = () => {
                              const frequency = document.getElementById('backup-frequency').value;
                              const time = document.getElementById('backup-time').value;
                              const retention = document.getElementById('backup-retention').value;
                              
                              // Create success toast
                              const toast = document.createElement('div');
                              toast.innerHTML = `
                                <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 16px 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 1001; display: flex; align-items: center; gap: 12px; transform: translateX(100%); transition: transform 0.3s ease;">
                                  <span style="font-size: 20px;">⏰</span>
                                  <div>
                                    <div style="font-weight: 600; font-size: 14px;">Schedule Updated!</div>
                                    <div style="font-size: 12px; opacity: 0.9;">Backup every ${frequency} at ${time}</div>
                                  </div>
                                </div>
                              `;
                              document.body.appendChild(toast);
                              
                              setTimeout(() => {
                                toast.firstElementChild.style.transform = 'translateX(0)';
                              }, 100);
                              
                              setTimeout(() => {
                                toast.firstElementChild.style.transform = 'translateX(100%)';
                                setTimeout(() => toast.remove(), 300);
                              }, 3000);
                              
                              overlay.remove();
                              setSaveStatus('backup-schedule-updated');
                              setTimeout(() => setSaveStatus(''), 2000);
                            };
                          }}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Update Schedule
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional integrity verification modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 480px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="verify-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                    <span style="color: white; font-size: 20px;">🔍</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Backup Integrity Verification</h3>
                                    <p id="verify-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Starting verification process...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Verification Progress</span>
                                    <span id="verify-percentage" style="color: #10b981; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="verify-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981, #059669); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div id="verify-results" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">FILES CHECKED</div>
                                    <div id="files-checked" style="color: #10b981; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">ERRORS FOUND</div>
                                    <div id="errors-found" style="color: #ef4444; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">HEALTH SCORE</div>
                                    <div id="health-score" style="color: #10b981; font-size: 16px; font-weight: 600;">100%</div>
                                  </div>
                                </div>
                                
                                <div id="verify-checks" style="margin-bottom: 20px; space-y: 8px;">
                                  <div id="check-checksums" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="checksum-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Verifying file checksums...</span>
                                  </div>
                                  <div id="check-structure" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="structure-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Checking backup structure...</span>
                                  </div>
                                  <div id="check-compression" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="compression-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Testing compression integrity...</span>
                                  </div>
                                  <div id="check-metadata" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px;">
                                    <div id="metadata-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Validating metadata consistency...</span>
                                  </div>
                                </div>
                                
                                <div id="verify-actions" style="display: flex; gap: 12px;">
                                  <button id="verify-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="verify-details" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                    View Details
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate verification process
                            let progress = 0;
                            let filesChecked = 0;
                            let currentCheck = 0;
                            const checks = ['checksums', 'structure', 'compression', 'metadata'];
                            const statuses = [
                              'Initializing verification...',
                              'Scanning backup files...',
                              'Computing checksums...',
                              'Validating file structure...',
                              'Testing compression integrity...',
                              'Checking metadata consistency...',
                              'Finalizing verification report...'
                            ];
                            
                            const verifyInterval = setInterval(() => {
                              progress += Math.random() * 25;
                              filesChecked += Math.floor(Math.random() * 80) + 20;
                              
                              if (progress >= 100) {
                                progress = 100;
                                clearInterval(verifyInterval);
                                
                                // Complete all checks
                                checks.forEach(check => {
                                  const icon = document.getElementById(`${check}-icon`);
                                  icon.style.background = '#10b981';
                                  icon.textContent = '✓';
                                  icon.style.color = 'white';
                                });
                                
                                document.getElementById('verify-status').textContent = '✅ Verification completed successfully!';
                                document.getElementById('verify-status').style.color = '#10b981';
                                document.getElementById('verify-details').style.display = 'block';
                                document.getElementById('verify-cancel').textContent = 'Close';
                                
                                setSaveStatus('backup-verified');
                                setTimeout(() => setSaveStatus(''), 2000);
                              } else {
                                // Update current check
                                const checkIndex = Math.floor((progress / 100) * checks.length);
                                if (checkIndex !== currentCheck && checkIndex < checks.length) {
                                  if (currentCheck < checks.length) {
                                    const prevIcon = document.getElementById(`${checks[currentCheck]}-icon`);
                                    prevIcon.style.background = '#10b981';
                                    prevIcon.textContent = '✓';
                                    prevIcon.style.color = 'white';
                                  }
                                  currentCheck = checkIndex;
                                  
                                  const currentIcon = document.getElementById(`${checks[currentCheck]}-icon`);
                                  currentIcon.style.background = '#3b82f6';
                                  currentIcon.textContent = '⏳';
                                  currentIcon.style.color = 'white';
                                }
                                
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('verify-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                              }
                              
                              document.getElementById('verify-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('verify-progress').style.width = progress + '%';
                              document.getElementById('files-checked').textContent = filesChecked.toLocaleString();
                            }, 1000);
                            
                            // Cancel button
                            document.getElementById('verify-cancel').onclick = () => {
                              clearInterval(verifyInterval);
                              overlay.remove();
                            };
                            
                            // Details button
                            document.getElementById('verify-details').onclick = () => {
                              alert('Backup Verification Report:\n\n✅ All files verified successfully\n✅ No corruption detected\n✅ Checksums match\n✅ Structure integrity confirmed\n\nBackup is healthy and restorable.');
                            };
                          }}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Verify Integrity
                        </Button>
                      </div>
                    </div>

                    {/* Data Operations */}
                    <div className="p-4 border rounded-lg bg-green-50/50 border-green-200">
                      <h5 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Data Operations
                      </h5>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional data sync modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 450px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="sync-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: spin 2s linear infinite;">
                                    <span style="color: white; font-size: 20px;">🔄</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Data Synchronization</h3>
                                    <p id="sync-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Preparing synchronization...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Sync Progress</span>
                                    <span id="sync-percentage" style="color: #10b981; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="sync-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981, #059669); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">RECORDS SYNCED</div>
                                    <div id="records-synced" style="color: #10b981; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">CONFLICTS RESOLVED</div>
                                    <div id="conflicts-resolved" style="color: #f59e0b; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                </div>
                                
                                <div style="display: flex; gap: 12px;">
                                  <button onclick="this.closest('.fixed').remove()" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Run in Background
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate sync process
                            let progress = 0;
                            let records = 0;
                            let conflicts = 0;
                            const statuses = [
                              'Connecting to data sources...',
                              'Analyzing data changes...',
                              'Synchronizing user profiles...',
                              'Updating server configurations...',
                              'Resolving data conflicts...',
                              'Finalizing synchronization...'
                            ];
                            
                            const syncInterval = setInterval(() => {
                              progress += Math.random() * 20;
                              records += Math.floor(Math.random() * 200) + 100;
                              conflicts += Math.floor(Math.random() * 3);
                              
                              if (progress >= 100) {
                                progress = 100;
                                clearInterval(syncInterval);
                                
                                document.getElementById('sync-status').textContent = '✅ Synchronization completed successfully!';
                                document.getElementById('sync-status').style.color = '#10b981';
                                
                                setSaveStatus('data-synchronized');
                                setTimeout(() => setSaveStatus(''), 2000);
                                
                                setTimeout(() => overlay.remove(), 2000);
                              } else {
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('sync-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                              }
                              
                              document.getElementById('sync-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('sync-progress').style.width = progress + '%';
                              document.getElementById('records-synced').textContent = records.toLocaleString();
                              document.getElementById('conflicts-resolved').textContent = conflicts;
                            }, 1200);
                          }}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Sync All Data
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional data validation modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 500px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="validate-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                    <span style="color: white; font-size: 20px;">🛡️</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Data Validation Process</h3>
                                    <p id="validate-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Initializing data validation...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Validation Progress</span>
                                    <span id="validate-percentage" style="color: #10b981; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="validate-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981, #059669); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">RECORDS CHECKED</div>
                                    <div id="records-checked" style="color: #10b981; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">ERRORS FOUND</div>
                                    <div id="validation-errors" style="color: #ef4444; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">ACCURACY SCORE</div>
                                    <div id="accuracy-score" style="color: #10b981; font-size: 16px; font-weight: 600;">100%</div>
                                  </div>
                                </div>
                                
                                <div id="validation-tests" style="margin-bottom: 20px;">
                                  <div id="test-schema" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="schema-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Schema validation...</span>
                                  </div>
                                  <div id="test-integrity" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="integrity-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Data integrity checks...</span>
                                  </div>
                                  <div id="test-duplicates" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="duplicates-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Duplicate detection...</span>
                                  </div>
                                  <div id="test-references" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px;">
                                    <div id="references-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Reference validation...</span>
                                  </div>
                                </div>
                                
                                <div id="validate-actions" style="display: flex; gap: 12px;">
                                  <button id="validate-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="validate-report" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                    View Report
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate validation process
                            let progress = 0;
                            let recordsChecked = 0;
                            let errors = 0;
                            let currentTest = 0;
                            const tests = ['schema', 'integrity', 'duplicates', 'references'];
                            const statuses = [
                              'Loading data structure...',
                              'Checking schema compliance...',
                              'Validating data integrity...',
                              'Scanning for duplicates...',
                              'Verifying references...',
                              'Generating validation report...'
                            ];
                            
                            const validateInterval = setInterval(() => {
                              progress += Math.random() * 20;
                              recordsChecked += Math.floor(Math.random() * 300) + 100;
                              
                              if (Math.random() < 0.1) errors += 1; // Occasional errors
                              
                              if (progress >= 100) {
                                progress = 100;
                                clearInterval(validateInterval);
                                
                                // Complete all tests
                                tests.forEach(test => {
                                  const icon = document.getElementById(`${test}-icon`);
                                  icon.style.background = '#10b981';
                                  icon.textContent = '✓';
                                  icon.style.color = 'white';
                                });
                                
                                const accuracy = Math.max(85, 100 - errors * 2);
                                document.getElementById('accuracy-score').textContent = accuracy + '%';
                                document.getElementById('validate-status').textContent = `✅ Validation completed! ${errors} issues found`;
                                document.getElementById('validate-status').style.color = errors > 0 ? '#f59e0b' : '#10b981';
                                document.getElementById('validate-report').style.display = 'block';
                                document.getElementById('validate-cancel').textContent = 'Close';
                                
                                setSaveStatus('data-validated');
                                setTimeout(() => setSaveStatus(''), 2000);
                              } else {
                                // Update current test
                                const testIndex = Math.floor((progress / 100) * tests.length);
                                if (testIndex !== currentTest && testIndex < tests.length) {
                                  if (currentTest < tests.length) {
                                    const prevIcon = document.getElementById(`${tests[currentTest]}-icon`);
                                    prevIcon.style.background = '#10b981';
                                    prevIcon.textContent = '✓';
                                    prevIcon.style.color = 'white';
                                  }
                                  currentTest = testIndex;
                                  
                                  const currentIcon = document.getElementById(`${tests[currentTest]}-icon`);
                                  currentIcon.style.background = '#3b82f6';
                                  currentIcon.textContent = '⏳';
                                  currentIcon.style.color = 'white';
                                }
                                
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('validate-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                              }
                              
                              document.getElementById('validate-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('validate-progress').style.width = progress + '%';
                              document.getElementById('records-checked').textContent = recordsChecked.toLocaleString();
                              document.getElementById('validation-errors').textContent = errors;
                            }, 1000);
                            
                            // Cancel button
                            document.getElementById('validate-cancel').onclick = () => {
                              clearInterval(validateInterval);
                              overlay.remove();
                            };
                            
                            // Report button
                            document.getElementById('validate-report').onclick = () => {
                              const reportData = {
                                timestamp: new Date().toISOString(),
                                recordsChecked: recordsChecked,
                                errorsFound: errors,
                                accuracyScore: Math.max(85, 100 - errors * 2),
                                tests: ['Schema: ✓ Passed', 'Integrity: ✓ Passed', 'Duplicates: ✓ Checked', 'References: ✓ Validated']
                              };
                              
                              const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `validation-report-${new Date().toISOString().split('T')[0]}.json`;
                              link.click();
                              URL.revokeObjectURL(url);
                            };
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Validate Data
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional data migration modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 520px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="migrate-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                    <span style="color: white; font-size: 20px;">🚀</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Data Migration Process</h3>
                                    <p id="migrate-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Preparing migration environment...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Migration Progress</span>
                                    <span id="migrate-percentage" style="color: #8b5cf6; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="migrate-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #8b5cf6, #7c3aed); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">TABLES MIGRATED</div>
                                    <div id="tables-migrated" style="color: #8b5cf6; font-size: 16px; font-weight: 600;">0/12</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">RECORDS TRANSFERRED</div>
                                    <div id="records-transferred" style="color: #10b981; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">TRANSFER SPEED</div>
                                    <div id="transfer-speed" style="color: #f59e0b; font-size: 16px; font-weight: 600;">0 MB/s</div>
                                  </div>
                                </div>
                                
                                <div id="migration-phases" style="margin-bottom: 20px;">
                                  <div id="phase-export" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="export-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Exporting source data...</span>
                                  </div>
                                  <div id="phase-transform" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="transform-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Transforming data format...</span>
                                  </div>
                                  <div id="phase-import" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="import-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Importing to destination...</span>
                                  </div>
                                  <div id="phase-verify" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px;">
                                    <div id="verify-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Verifying migration integrity...</span>
                                  </div>
                                </div>
                                
                                <div id="migrate-actions" style="display: flex; gap: 12px;">
                                  <button id="migrate-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="migrate-logs" style="flex: 1; padding: 10px; background: #8b5cf6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                    View Logs
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate migration process
                            let progress = 0;
                            let tablesMigrated = 0;
                            let recordsTransferred = 0;
                            let currentPhase = 0;
                            const phases = ['export', 'transform', 'import', 'verify'];
                            const statuses = [
                              'Initializing migration...',
                              'Scanning source database...',
                              'Exporting user data...',
                              'Transforming data schema...',
                              'Importing to new system...',
                              'Verifying data integrity...',
                              'Updating references...',
                              'Finalizing migration...'
                            ];
                            
                            const migrateInterval = setInterval(() => {
                              progress += Math.random() * 15;
                              recordsTransferred += Math.floor(Math.random() * 500) + 200;
                              const speed = (Math.random() * 15 + 5).toFixed(1);
                              
                              // Update tables migrated based on progress
                              const newTablesMigrated = Math.min(12, Math.floor((progress / 100) * 12));
                              if (newTablesMigrated > tablesMigrated) {
                                tablesMigrated = newTablesMigrated;
                              }
                              
                              if (progress >= 100) {
                                progress = 100;
                                tablesMigrated = 12;
                                clearInterval(migrateInterval);
                                
                                // Complete all phases
                                phases.forEach(phase => {
                                  const icon = document.getElementById(`${phase}-icon`);
                                  icon.style.background = '#8b5cf6';
                                  icon.textContent = '✓';
                                  icon.style.color = 'white';
                                });
                                
                                document.getElementById('migrate-status').textContent = '✅ Migration completed successfully!';
                                document.getElementById('migrate-status').style.color = '#8b5cf6';
                                document.getElementById('migrate-logs').style.display = 'block';
                                document.getElementById('migrate-cancel').textContent = 'Close';
                                document.getElementById('transfer-speed').textContent = '0 MB/s';
                                
                                setSaveStatus('migration-started');
                                setTimeout(() => setSaveStatus(''), 2000);
                              } else {
                                // Update current phase
                                const phaseIndex = Math.floor((progress / 100) * phases.length);
                                if (phaseIndex !== currentPhase && phaseIndex < phases.length) {
                                  if (currentPhase < phases.length) {
                                    const prevIcon = document.getElementById(`${phases[currentPhase]}-icon`);
                                    prevIcon.style.background = '#8b5cf6';
                                    prevIcon.textContent = '✓';
                                    prevIcon.style.color = 'white';
                                  }
                                  currentPhase = phaseIndex;
                                  
                                  const currentIcon = document.getElementById(`${phases[currentPhase]}-icon`);
                                  currentIcon.style.background = '#f59e0b';
                                  currentIcon.textContent = '⏳';
                                  currentIcon.style.color = 'white';
                                }
                                
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('migrate-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                                document.getElementById('transfer-speed').textContent = speed + ' MB/s';
                              }
                              
                              document.getElementById('migrate-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('migrate-progress').style.width = progress + '%';
                              document.getElementById('tables-migrated').textContent = `${tablesMigrated}/12`;
                              document.getElementById('records-transferred').textContent = recordsTransferred.toLocaleString();
                            }, 1200);
                            
                            // Cancel button
                            document.getElementById('migrate-cancel').onclick = () => {
                              clearInterval(migrateInterval);
                              overlay.remove();
                            };
                            
                            // Logs button
                            document.getElementById('migrate-logs').onclick = () => {
                              const logData = {
                                timestamp: new Date().toISOString(),
                                tablesMigrated: tablesMigrated,
                                recordsTransferred: recordsTransferred,
                                phases: ['Export: ✓ Completed', 'Transform: ✓ Completed', 'Import: ✓ Completed', 'Verify: ✓ Completed'],
                                summary: 'Migration completed successfully with no errors'
                              };
                              
                              const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `migration-logs-${new Date().toISOString().split('T')[0]}.json`;
                              link.click();
                              URL.revokeObjectURL(url);
                            };
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Migrate Data
                        </Button>
                      </div>
                    </div>

                    {/* System Tools */}
                    <div className="p-4 border rounded-lg bg-purple-50/50 border-purple-200">
                      <h5 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        System Tools
                      </h5>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional system scan modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 480px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="scan-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #6366f1, #4f46e5); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                    <span style="color: white; font-size: 20px;">🔍</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">System Security Scan</h3>
                                    <p id="scan-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Initializing security scan...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Scan Progress</span>
                                    <span id="scan-percentage" style="color: #6366f1; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="scan-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #6366f1, #4f46e5); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">FILES SCANNED</div>
                                    <div id="files-scanned" style="color: #6366f1; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">THREATS FOUND</div>
                                    <div id="threats-found" style="color: #ef4444; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">SECURITY SCORE</div>
                                    <div id="security-score" style="color: #10b981; font-size: 16px; font-weight: 600;">100%</div>
                                  </div>
                                </div>
                                
                                <div id="scan-components" style="margin-bottom: 20px;">
                                  <div id="scan-files" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="files-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Scanning system files...</span>
                                  </div>
                                  <div id="scan-network" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="network-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Checking network security...</span>
                                  </div>
                                  <div id="scan-processes" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="processes-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Analyzing running processes...</span>
                                  </div>
                                  <div id="scan-permissions" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px;">
                                    <div id="permissions-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Verifying permissions...</span>
                                  </div>
                                </div>
                                
                                <div id="scan-actions" style="display: flex; gap: 12px;">
                                  <button id="scan-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="scan-results" style="flex: 1; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                    View Results
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate scanning process
                            let progress = 0;
                            let filesScanned = 0;
                            let threats = 0;
                            let currentComponent = 0;
                            const components = ['files', 'network', 'processes', 'permissions'];
                            const statuses = [
                              'Starting security scan...',
                              'Scanning system files...',
                              'Checking network ports...',
                              'Analyzing running processes...',
                              'Verifying file permissions...',
                              'Generating security report...'
                            ];
                            
                            const scanInterval = setInterval(() => {
                              progress += Math.random() * 18;
                              filesScanned += Math.floor(Math.random() * 250) + 100;
                              
                              if (Math.random() < 0.05) threats += 1; // Rare threats
                              
                              if (progress >= 100) {
                                progress = 100;
                                clearInterval(scanInterval);
                                
                                // Complete all components
                                components.forEach(component => {
                                  const icon = document.getElementById(`${component}-icon`);
                                  icon.style.background = '#6366f1';
                                  icon.textContent = '✓';
                                  icon.style.color = 'white';
                                });
                                
                                const securityScore = Math.max(75, 100 - threats * 5);
                                document.getElementById('security-score').textContent = securityScore + '%';
                                document.getElementById('scan-status').textContent = `✅ Security scan completed! ${threats} threats detected`;
                                document.getElementById('scan-status').style.color = threats > 0 ? '#f59e0b' : '#6366f1';
                                document.getElementById('scan-results').style.display = 'block';
                                document.getElementById('scan-cancel').textContent = 'Close';
                                
                                setSaveStatus('system-scanned');
                                setTimeout(() => setSaveStatus(''), 2000);
                              } else {
                                // Update current component
                                const componentIndex = Math.floor((progress / 100) * components.length);
                                if (componentIndex !== currentComponent && componentIndex < components.length) {
                                  if (currentComponent < components.length) {
                                    const prevIcon = document.getElementById(`${components[currentComponent]}-icon`);
                                    prevIcon.style.background = '#6366f1';
                                    prevIcon.textContent = '✓';
                                    prevIcon.style.color = 'white';
                                  }
                                  currentComponent = componentIndex;
                                  
                                  const currentIcon = document.getElementById(`${components[currentComponent]}-icon`);
                                  currentIcon.style.background = '#f59e0b';
                                  currentIcon.textContent = '⏳';
                                  currentIcon.style.color = 'white';
                                }
                                
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('scan-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                              }
                              
                              document.getElementById('scan-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('scan-progress').style.width = progress + '%';
                              document.getElementById('files-scanned').textContent = filesScanned.toLocaleString();
                              document.getElementById('threats-found').textContent = threats;
                            }, 1000);
                            
                            // Cancel button
                            document.getElementById('scan-cancel').onclick = () => {
                              clearInterval(scanInterval);
                              overlay.remove();
                            };
                            
                            // Results button
                            document.getElementById('scan-results').onclick = () => {
                              const results = {
                                timestamp: new Date().toISOString(),
                                filesScanned: filesScanned,
                                threatsFound: threats,
                                securityScore: Math.max(75, 100 - threats * 5),
                                components: ['Files: ✓ Clean', 'Network: ✓ Secure', 'Processes: ✓ Normal', 'Permissions: ✓ Valid'],
                                recommendations: threats > 0 ? ['Update security patches', 'Review file permissions'] : ['System is secure']
                              };
                              
                              const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `security-scan-${new Date().toISOString().split('T')[0]}.json`;
                              link.click();
                              URL.revokeObjectURL(url);
                            };
                          }}
                        >
                          <Search className="w-4 h-4 mr-2" />
                          System Scan
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional maintenance modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 500px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="maintenance-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                    <span style="color: white; font-size: 20px;">⚡</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">System Maintenance</h3>
                                    <p id="maintenance-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Preparing maintenance tasks...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Maintenance Progress</span>
                                    <span id="maintenance-percentage" style="color: #f59e0b; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="maintenance-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #f59e0b, #d97706); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">TASKS COMPLETED</div>
                                    <div id="tasks-completed" style="color: #f59e0b; font-size: 16px; font-weight: 600;">0/8</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">CACHE CLEARED</div>
                                    <div id="cache-cleared" style="color: #10b981; font-size: 16px; font-weight: 600;">0 MB</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">SYSTEM HEALTH</div>
                                    <div id="system-health" style="color: #10b981; font-size: 16px; font-weight: 600;">100%</div>
                                  </div>
                                </div>
                                
                                <div id="maintenance-tasks" style="margin-bottom: 20px;">
                                  <div id="task-cleanup" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="cleanup-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Cleaning temporary files...</span>
                                  </div>
                                  <div id="task-cache" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="cache-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Clearing system cache...</span>
                                  </div>
                                  <div id="task-logs" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="logs-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Rotating log files...</span>
                                  </div>
                                  <div id="task-optimize" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px;">
                                    <div id="optimize-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Optimizing database...</span>
                                  </div>
                                </div>
                                
                                <div id="maintenance-actions" style="display: flex; gap: 12px;">
                                  <button id="maintenance-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="maintenance-report" style="flex: 1; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                    View Report
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate maintenance process
                            let progress = 0;
                            let tasksCompleted = 0;
                            let cacheCleared = 0;
                            let currentTask = 0;
                            const tasks = ['cleanup', 'cache', 'logs', 'optimize'];
                            const statuses = [
                              'Starting maintenance routine...',
                              'Scanning system files...',
                              'Cleaning temporary files...',
                              'Clearing system cache...',
                              'Rotating log files...',
                              'Optimizing database...',
                              'Updating system indexes...',
                              'Finalizing maintenance...'
                            ];
                            
                            const maintenanceInterval = setInterval(() => {
                              progress += Math.random() * 15;
                              cacheCleared += Math.random() * 5;
                              
                              if (progress >= 100) {
                                progress = 100;
                                tasksCompleted = 8;
                                clearInterval(maintenanceInterval);
                                
                                // Complete all tasks
                                tasks.forEach(task => {
                                  const icon = document.getElementById(`${task}-icon`);
                                  icon.style.background = '#f59e0b';
                                  icon.textContent = '✓';
                                  icon.style.color = 'white';
                                });
                                
                                document.getElementById('maintenance-status').textContent = '✅ System maintenance completed successfully!';
                                document.getElementById('maintenance-status').style.color = '#f59e0b';
                                document.getElementById('maintenance-report').style.display = 'block';
                                document.getElementById('maintenance-cancel').textContent = 'Close';
                                
                                setSaveStatus('maintenance-performed');
                                setTimeout(() => setSaveStatus(''), 2000);
                              } else {
                                // Update current task
                                const taskIndex = Math.floor((progress / 100) * tasks.length);
                                if (taskIndex !== currentTask && taskIndex < tasks.length) {
                                  if (currentTask < tasks.length) {
                                    const prevIcon = document.getElementById(`${tasks[currentTask]}-icon`);
                                    prevIcon.style.background = '#f59e0b';
                                    prevIcon.textContent = '✓';
                                    prevIcon.style.color = 'white';
                                  }
                                  currentTask = taskIndex;
                                  
                                  if (currentTask < tasks.length) {
                                    const currentIcon = document.getElementById(`${tasks[currentTask]}-icon`);
                                    currentIcon.style.background = '#3b82f6';
                                    currentIcon.textContent = '⏳';
                                    currentIcon.style.color = 'white';
                                  }
                                }
                                
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('maintenance-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                                tasksCompleted = Math.floor((progress / 100) * 8);
                              }
                              
                              document.getElementById('maintenance-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('maintenance-progress').style.width = progress + '%';
                              document.getElementById('tasks-completed').textContent = `${tasksCompleted}/8`;
                              document.getElementById('cache-cleared').textContent = Math.floor(cacheCleared) + ' MB';
                            }, 1000);
                            
                            // Cancel button
                            document.getElementById('maintenance-cancel').onclick = () => {
                              clearInterval(maintenanceInterval);
                              overlay.remove();
                            };
                            
                            // Report button
                            document.getElementById('maintenance-report').onclick = () => {
                              const reportData = {
                                timestamp: new Date().toISOString(),
                                tasksCompleted: tasksCompleted,
                                cacheCleared: Math.floor(cacheCleared) + ' MB',
                                systemHealth: '100%',
                                tasks: ['Cleanup: ✓ Completed', 'Cache: ✓ Cleared', 'Logs: ✓ Rotated', 'Database: ✓ Optimized'],
                                summary: 'System maintenance completed successfully'
                              };
                              
                              const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `maintenance-report-${new Date().toISOString().split('T')[0]}.json`;
                              link.click();
                              URL.revokeObjectURL(url);
                            };
                          }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Maintenance
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            // Create professional diagnostics modal
                            const modalContent = document.createElement('div');
                            modalContent.innerHTML = `
                              <div style="max-width: 520px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                  <div id="diagnostics-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                    <span style="color: white; font-size: 20px;">🔬</span>
                                  </div>
                                  <div>
                                    <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">System Diagnostics</h3>
                                    <p id="diagnostics-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Initializing diagnostic scan...</p>
                                  </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                    <span style="color: #374151; font-weight: 500;">Diagnostic Progress</span>
                                    <span id="diagnostics-percentage" style="color: #ef4444; font-weight: 600;">0%</span>
                                  </div>
                                  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                    <div id="diagnostics-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ef4444, #dc2626); transition: width 0.5s ease;"></div>
                                  </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">TESTS RUN</div>
                                    <div id="tests-run" style="color: #ef4444; font-size: 16px; font-weight: 600;">0/12</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">ISSUES FOUND</div>
                                    <div id="issues-found" style="color: #f59e0b; font-size: 16px; font-weight: 600;">0</div>
                                  </div>
                                  <div>
                                    <div style="color: #6b7280; font-size: 12px;">HEALTH SCORE</div>
                                    <div id="health-score" style="color: #10b981; font-size: 16px; font-weight: 600;">100%</div>
                                  </div>
                                </div>
                                
                                <div id="diagnostic-categories" style="margin-bottom: 20px;">
                                  <div id="cat-performance" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="performance-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Performance tests...</span>
                                  </div>
                                  <div id="cat-memory" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="memory-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Memory diagnostics...</span>
                                  </div>
                                  <div id="cat-network" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="network-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Network connectivity...</span>
                                  </div>
                                  <div id="cat-storage" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                                    <div id="storage-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Storage health...</span>
                                  </div>
                                  <div id="cat-security" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px;">
                                    <div id="security-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                    <span style="color: #374151; font-size: 14px;">Security assessment...</span>
                                  </div>
                                </div>
                                
                                <div id="diagnostics-actions" style="display: flex; gap: 12px;">
                                  <button id="diagnostics-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                    Cancel
                                  </button>
                                  <button id="diagnostics-report" style="flex: 1; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                    Download Report
                                  </button>
                                </div>
                              </div>
                            `;
                            
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                            overlay.appendChild(modalContent);
                            document.body.appendChild(overlay);
                            
                            // Simulate diagnostics process
                            let progress = 0;
                            let testsRun = 0;
                            let issues = 0;
                            let currentCategory = 0;
                            const categories = ['performance', 'memory', 'network', 'storage', 'security'];
                            const statuses = [
                              'Starting diagnostic tests...',
                              'Running performance benchmarks...',
                              'Analyzing memory usage patterns...',
                              'Testing network connectivity...',
                              'Checking storage health...',
                              'Performing security assessment...',
                              'Analyzing system logs...',
                              'Generating diagnostic report...'
                            ];
                            
                            const diagnosticsInterval = setInterval(() => {
                              progress += Math.random() * 12;
                              testsRun = Math.floor((progress / 100) * 12);
                              
                              if (Math.random() < 0.15) issues += 1; // Occasional issues
                              
                              if (progress >= 100) {
                                progress = 100;
                                testsRun = 12;
                                clearInterval(diagnosticsInterval);
                                
                                // Complete all categories
                                categories.forEach(category => {
                                  const icon = document.getElementById(`${category}-icon`);
                                  icon.style.background = issues > 0 ? '#f59e0b' : '#ef4444';
                                  icon.textContent = '✓';
                                  icon.style.color = 'white';
                                });
                                
                                const healthScore = Math.max(70, 100 - issues * 8);
                                document.getElementById('health-score').textContent = healthScore + '%';
                                document.getElementById('diagnostics-status').textContent = `🔬 Diagnostics completed! ${issues} issues detected`;
                                document.getElementById('diagnostics-status').style.color = issues > 2 ? '#ef4444' : issues > 0 ? '#f59e0b' : '#10b981';
                                document.getElementById('diagnostics-report').style.display = 'block';
                                document.getElementById('diagnostics-cancel').textContent = 'Close';
                                
                                setSaveStatus('diagnostics-run');
                                setTimeout(() => setSaveStatus(''), 2000);
                              } else {
                                // Update current category
                                const categoryIndex = Math.floor((progress / 100) * categories.length);
                                if (categoryIndex !== currentCategory && categoryIndex < categories.length) {
                                  if (currentCategory < categories.length) {
                                    const prevIcon = document.getElementById(`${categories[currentCategory]}-icon`);
                                    prevIcon.style.background = '#ef4444';
                                    prevIcon.textContent = '✓';
                                    prevIcon.style.color = 'white';
                                  }
                                  currentCategory = categoryIndex;
                                  
                                  if (currentCategory < categories.length) {
                                    const currentIcon = document.getElementById(`${categories[currentCategory]}-icon`);
                                    currentIcon.style.background = '#3b82f6';
                                    currentIcon.textContent = '⏳';
                                    currentIcon.style.color = 'white';
                                  }
                                }
                                
                                const statusIndex = Math.floor((progress / 100) * statuses.length);
                                document.getElementById('diagnostics-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                              }
                              
                              document.getElementById('diagnostics-percentage').textContent = Math.floor(progress) + '%';
                              document.getElementById('diagnostics-progress').style.width = progress + '%';
                              document.getElementById('tests-run').textContent = `${testsRun}/12`;
                              document.getElementById('issues-found').textContent = issues;
                            }, 1200);
                            
                            // Cancel button
                            document.getElementById('diagnostics-cancel').onclick = () => {
                              clearInterval(diagnosticsInterval);
                              overlay.remove();
                            };
                            
                            // Report button
                            document.getElementById('diagnostics-report').onclick = () => {
                              const reportData = {
                                timestamp: new Date().toISOString(),
                                testsRun: testsRun,
                                issuesFound: issues,
                                healthScore: Math.max(70, 100 - issues * 8) + '%',
                                categories: [
                                  'Performance: ✓ Tested',
                                  'Memory: ✓ Analyzed', 
                                  'Network: ✓ Verified',
                                  'Storage: ✓ Checked',
                                  'Security: ✓ Assessed'
                                ],
                                recommendations: issues > 0 ? 
                                  ['Update system drivers', 'Clear temporary files', 'Check network settings'] : 
                                  ['System running optimally', 'No critical issues found'],
                                summary: `Diagnostic scan completed with ${issues} issues found`
                              };
                              
                              const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `diagnostics-report-${new Date().toISOString().split('T')[0]}.json`;
                              link.click();
                              URL.revokeObjectURL(url);
                            };
                          }}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Run Diagnostics
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Actions */}
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50/50">
                    <h5 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Emergency Actions
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Create professional emergency backup modal
                          const modalContent = document.createElement('div');
                          modalContent.innerHTML = `
                            <div style="max-width: 480px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                <div id="emergency-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #dc2626, #b91c1c); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                  <span style="color: white; font-size: 20px;">🚨</span>
                                </div>
                                <div>
                                  <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Emergency Backup</h3>
                                  <p id="emergency-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Critical data protection in progress...</p>
                                </div>
                              </div>
                              
                              <div style="margin-bottom: 20px;">
                                <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                  <span style="color: #374151; font-weight: 500;">Emergency Progress</span>
                                  <span id="emergency-percentage" style="color: #dc2626; font-weight: 600;">0%</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                  <div id="emergency-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #dc2626, #b91c1c); transition: width 0.5s ease;"></div>
                                </div>
                              </div>
                              
                              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">CRITICAL DATA</div>
                                  <div id="critical-data" style="color: #dc2626; font-size: 16px; font-weight: 600;">0 GB</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">ENCRYPTED</div>
                                  <div id="encrypted-data" style="color: #10b981; font-size: 16px; font-weight: 600;">100%</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">PRIORITY</div>
                                  <div id="priority-level" style="color: #dc2626; font-size: 16px; font-weight: 600;">URGENT</div>
                                </div>
                              </div>
                              
                              <div id="emergency-phases" style="margin-bottom: 20px;">
                                <div id="phase-identify" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #dc2626;">
                                  <div id="identify-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Identifying critical systems...</span>
                                </div>
                                <div id="phase-secure" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #dc2626;">
                                  <div id="secure-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Securing data channels...</span>
                                </div>
                                <div id="phase-backup" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #dc2626;">
                                  <div id="backup-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Creating emergency backup...</span>
                                </div>
                                <div id="phase-verify" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #dc2626;">
                                  <div id="verify-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Verifying backup integrity...</span>
                                </div>
                              </div>
                              
                              <div id="emergency-actions" style="display: flex; gap: 12px;">
                                <button id="emergency-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                  Cancel
                                </button>
                                <button id="emergency-download" style="flex: 1; padding: 10px; background: #dc2626; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                  Download Backup
                                </button>
                              </div>
                            </div>
                          `;
                          
                          const overlay = document.createElement('div');
                          overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                          overlay.appendChild(modalContent);
                          document.body.appendChild(overlay);
                          
                          // Simulate emergency backup process
                          let progress = 0;
                          let criticalData = 0;
                          let currentPhase = 0;
                          const phases = ['identify', 'secure', 'backup', 'verify'];
                          const statuses = [
                            'Initiating emergency protocol...',
                            'Scanning for critical data...',
                            'Prioritizing essential systems...',
                            'Establishing secure channels...',
                            'Creating encrypted backup...',
                            'Verifying data integrity...',
                            'Finalizing emergency backup...'
                          ];
                          
                          const emergencyInterval = setInterval(() => {
                            progress += Math.random() * 18;
                            criticalData += Math.random() * 0.8;
                            
                            if (progress >= 100) {
                              progress = 100;
                              clearInterval(emergencyInterval);
                              
                              // Complete all phases
                              phases.forEach(phase => {
                                const icon = document.getElementById(`${phase}-icon`);
                                icon.style.background = '#dc2626';
                                icon.textContent = '✓';
                                icon.style.color = 'white';
                              });
                              
                              document.getElementById('emergency-status').textContent = '🚨 Emergency backup completed successfully!';
                              document.getElementById('emergency-status').style.color = '#dc2626';
                              document.getElementById('emergency-download').style.display = 'block';
                              document.getElementById('emergency-cancel').textContent = 'Close';
                              
                              setSaveStatus('emergency-backup-created');
                              setTimeout(() => setSaveStatus(''), 2000);
                            } else {
                              // Update current phase
                              const phaseIndex = Math.floor((progress / 100) * phases.length);
                              if (phaseIndex !== currentPhase && phaseIndex < phases.length) {
                                if (currentPhase < phases.length) {
                                  const prevIcon = document.getElementById(`${phases[currentPhase]}-icon`);
                                  prevIcon.style.background = '#dc2626';
                                  prevIcon.textContent = '✓';
                                  prevIcon.style.color = 'white';
                                }
                                currentPhase = phaseIndex;
                                
                                if (currentPhase < phases.length) {
                                  const currentIcon = document.getElementById(`${phases[currentPhase]}-icon`);
                                  currentIcon.style.background = '#f59e0b';
                                  currentIcon.textContent = '⚡';
                                  currentIcon.style.color = 'white';
                                }
                              }
                              
                              const statusIndex = Math.floor((progress / 100) * statuses.length);
                              document.getElementById('emergency-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                            }
                            
                            document.getElementById('emergency-percentage').textContent = Math.floor(progress) + '%';
                            document.getElementById('emergency-progress').style.width = progress + '%';
                            document.getElementById('critical-data').textContent = Math.floor(criticalData * 10) / 10 + ' GB';
                          }, 800);
                          
                          // Cancel button
                          document.getElementById('emergency-cancel').onclick = () => {
                            clearInterval(emergencyInterval);
                            overlay.remove();
                          };
                          
                          // Download button
                          document.getElementById('emergency-download').onclick = () => {
                            const backupData = {
                              timestamp: new Date().toISOString(),
                              type: 'emergency_backup',
                              criticalData: Math.floor(criticalData * 10) / 10 + ' GB',
                              encryption: '100%',
                              priority: 'URGENT',
                              phases: ['Identify: ✓ Completed', 'Secure: ✓ Completed', 'Backup: ✓ Completed', 'Verify: ✓ Completed'],
                              summary: 'Emergency backup completed successfully with full encryption'
                            };
                            
                            const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `emergency-backup-${new Date().toISOString().split('T')[0]}.json`;
                            link.click();
                            URL.revokeObjectURL(url);
                          };
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Emergency Backup
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Create professional stop processes modal
                          const modalContent = document.createElement('div');
                          modalContent.innerHTML = `
                            <div style="max-width: 500px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                <div id="stop-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                  <span style="color: white; font-size: 20px;">⏹️</span>
                                </div>
                                <div>
                                  <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Stop Processes</h3>
                                  <p id="stop-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Safely terminating active processes...</p>
                                </div>
                              </div>
                              
                              <div style="margin-bottom: 20px;">
                                <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                  <span style="color: #374151; font-weight: 500;">Shutdown Progress</span>
                                  <span id="stop-percentage" style="color: #ef4444; font-weight: 600;">0%</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                  <div id="stop-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ef4444, #dc2626); transition: width 0.5s ease;"></div>
                                </div>
                              </div>
                              
                              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">ACTIVE PROCESSES</div>
                                  <div id="active-processes" style="color: #ef4444; font-size: 16px; font-weight: 600;">12</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">STOPPED</div>
                                  <div id="stopped-processes" style="color: #10b981; font-size: 16px; font-weight: 600;">0</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">STATUS</div>
                                  <div id="system-status" style="color: #ef4444; font-size: 16px; font-weight: 600;">ACTIVE</div>
                                </div>
                              </div>
                              
                              <div id="process-list" style="margin-bottom: 20px;">
                                <div id="proc-api" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #ef4444;">
                                  <div id="api-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">🔴</div>
                                  <span style="color: #374151; font-size: 14px;">API Server (PID: 1234)</span>
                                </div>
                                <div id="proc-worker" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #ef4444;">
                                  <div id="worker-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">🔴</div>
                                  <span style="color: #374151; font-size: 14px;">Background Workers (PID: 5678)</span>
                                </div>
                                <div id="proc-scheduler" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #ef4444;">
                                  <div id="scheduler-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">🔴</div>
                                  <span style="color: #374151; font-size: 14px;">Task Scheduler (PID: 9012)</span>
                                </div>
                                <div id="proc-monitor" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
                                  <div id="monitor-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">🔴</div>
                                  <span style="color: #374151; font-size: 14px;">System Monitor (PID: 3456)</span>
                                </div>
                              </div>
                              
                              <div id="stop-actions" style="display: flex; gap: 12px;">
                                <button id="stop-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                  Cancel
                                </button>
                                <button id="stop-report" style="flex: 1; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                  View Report
                                </button>
                              </div>
                            </div>
                          `;
                          
                          const overlay = document.createElement('div');
                          overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                          overlay.appendChild(modalContent);
                          document.body.appendChild(overlay);
                          
                          // Simulate stop processes
                          let progress = 0;
                          let activeProcesses = 12;
                          let stoppedProcesses = 0;
                          let currentProcess = 0;
                          const processes = ['api', 'worker', 'scheduler', 'monitor'];
                          const statuses = [
                            'Sending shutdown signals...',
                            'Gracefully stopping API server...',
                            'Terminating background workers...',
                            'Stopping task scheduler...',
                            'Shutting down system monitor...',
                            'Cleaning up resources...',
                            'All processes stopped safely'
                          ];
                          
                          const stopInterval = setInterval(() => {
                            progress += Math.random() * 20;
                            
                            if (progress >= 100) {
                              progress = 100;
                              activeProcesses = 0;
                              stoppedProcesses = 12;
                              clearInterval(stopInterval);
                              
                              // Stop all processes
                              processes.forEach(proc => {
                                const icon = document.getElementById(`${proc}-icon`);
                                icon.style.background = '#6b7280';
                                icon.textContent = '⏹️';
                                icon.style.color = 'white';
                              });
                              
                              document.getElementById('stop-status').textContent = '⏹️ All processes stopped successfully!';
                              document.getElementById('stop-status').style.color = '#10b981';
                              document.getElementById('system-status').textContent = 'STOPPED';
                              document.getElementById('system-status').style.color = '#6b7280';
                              document.getElementById('stop-report').style.display = 'block';
                              document.getElementById('stop-cancel').textContent = 'Close';
                              
                              setSaveStatus('processes-stopped');
                              setTimeout(() => setSaveStatus(''), 2000);
                            } else {
                              // Update current process
                              const processIndex = Math.floor((progress / 100) * processes.length);
                              if (processIndex !== currentProcess && processIndex < processes.length) {
                                if (currentProcess < processes.length) {
                                  const prevIcon = document.getElementById(`${processes[currentProcess]}-icon`);
                                  prevIcon.style.background = '#6b7280';
                                  prevIcon.textContent = '⏹️';
                                  prevIcon.style.color = 'white';
                                }
                                currentProcess = processIndex;
                                
                                if (currentProcess < processes.length) {
                                  const currentIcon = document.getElementById(`${processes[currentProcess]}-icon`);
                                  currentIcon.style.background = '#f59e0b';
                                  currentIcon.textContent = '⏸️';
                                  currentIcon.style.color = 'white';
                                }
                              }
                              
                              activeProcesses = 12 - Math.floor((progress / 100) * 12);
                              stoppedProcesses = 12 - activeProcesses;
                              
                              const statusIndex = Math.floor((progress / 100) * statuses.length);
                              document.getElementById('stop-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                            }
                            
                            document.getElementById('stop-percentage').textContent = Math.floor(progress) + '%';
                            document.getElementById('stop-progress').style.width = progress + '%';
                            document.getElementById('active-processes').textContent = activeProcesses;
                            document.getElementById('stopped-processes').textContent = stoppedProcesses;
                          }, 1000);
                          
                          // Cancel button
                          document.getElementById('stop-cancel').onclick = () => {
                            clearInterval(stopInterval);
                            overlay.remove();
                          };
                          
                          // Report button
                          document.getElementById('stop-report').onclick = () => {
                            const reportData = {
                              timestamp: new Date().toISOString(),
                              action: 'stop_processes',
                              totalProcesses: 12,
                              activeProcesses: activeProcesses,
                              stoppedProcesses: stoppedProcesses,
                              processDetails: [
                                'API Server (PID: 1234): ⏹️ Stopped',
                                'Background Workers (PID: 5678): ⏹️ Stopped',
                                'Task Scheduler (PID: 9012): ⏹️ Stopped',
                                'System Monitor (PID: 3456): ⏹️ Stopped'
                              ],
                              summary: 'All system processes stopped successfully'
                            };
                            
                            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `stop-processes-report-${new Date().toISOString().split('T')[0]}.json`;
                            link.click();
                            URL.revokeObjectURL(url);
                          };
                        }}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Stop Processes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Create professional recovery mode modal
                          const modalContent = document.createElement('div');
                          modalContent.innerHTML = `
                            <div style="max-width: 520px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                <div id="recovery-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                  <span style="color: white; font-size: 20px;">🔄</span>
                                </div>
                                <div>
                                  <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Recovery Mode</h3>
                                  <p id="recovery-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Initiating system recovery protocol...</p>
                                </div>
                              </div>
                              
                              <div style="margin-bottom: 20px;">
                                <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                  <span style="color: #374151; font-weight: 500;">Recovery Progress</span>
                                  <span id="recovery-percentage" style="color: #3b82f6; font-weight: 600;">0%</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                  <div id="recovery-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb); transition: width 0.5s ease;"></div>
                                </div>
                              </div>
                              
                              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">SERVICES</div>
                                  <div id="services-recovered" style="color: #3b82f6; font-size: 16px; font-weight: 600;">0/8</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">DATA INTEGRITY</div>
                                  <div id="data-integrity" style="color: #10b981; font-size: 16px; font-weight: 600;">100%</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">RECOVERY STATUS</div>
                                  <div id="recovery-health" style="color: #3b82f6; font-size: 16px; font-weight: 600;">ACTIVE</div>
                                </div>
                              </div>
                              
                              <div id="recovery-stages" style="margin-bottom: 20px;">
                                <div id="stage-assess" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #eff6ff; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #3b82f6;">
                                  <div id="assess-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Assessing system damage...</span>
                                </div>
                                <div id="stage-restore" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #eff6ff; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #3b82f6;">
                                  <div id="restore-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Restoring critical services...</span>
                                </div>
                                <div id="stage-rebuild" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #eff6ff; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #3b82f6;">
                                  <div id="rebuild-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Rebuilding configurations...</span>
                                </div>
                                <div id="stage-validate" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                  <div id="validate-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Validating system health...</span>
                                </div>
                              </div>
                              
                              <div id="recovery-actions" style="display: flex; gap: 12px;">
                                <button id="recovery-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                  Cancel
                                </button>
                                <button id="recovery-log" style="flex: 1; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                  Download Log
                                </button>
                              </div>
                            </div>
                          `;
                          
                          const overlay = document.createElement('div');
                          overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                          overlay.appendChild(modalContent);
                          document.body.appendChild(overlay);
                          
                          // Simulate recovery process
                          let progress = 0;
                          let servicesRecovered = 0;
                          let currentStage = 0;
                          const stages = ['assess', 'restore', 'rebuild', 'validate'];
                          const statuses = [
                            'Initializing recovery protocol...',
                            'Scanning for system issues...',
                            'Assessing damage severity...',
                            'Restoring core services...',
                            'Rebuilding damaged components...',
                            'Validating system integrity...',
                            'Recovery completed successfully'
                          ];
                          
                          const recoveryInterval = setInterval(() => {
                            progress += Math.random() * 15;
                            servicesRecovered = Math.floor((progress / 100) * 8);
                            
                            if (progress >= 100) {
                              progress = 100;
                              servicesRecovered = 8;
                              clearInterval(recoveryInterval);
                              
                              // Complete all stages
                              stages.forEach(stage => {
                                const icon = document.getElementById(`${stage}-icon`);
                                icon.style.background = '#3b82f6';
                                icon.textContent = '✓';
                                icon.style.color = 'white';
                              });
                              
                              document.getElementById('recovery-status').textContent = '🔄 System recovery completed successfully!';
                              document.getElementById('recovery-status').style.color = '#10b981';
                              document.getElementById('recovery-health').textContent = 'RESTORED';
                              document.getElementById('recovery-health').style.color = '#10b981';
                              document.getElementById('recovery-log').style.display = 'block';
                              document.getElementById('recovery-cancel').textContent = 'Close';
                              
                              setSaveStatus('recovery-mode-activated');
                              setTimeout(() => setSaveStatus(''), 2000);
                            } else {
                              // Update current stage
                              const stageIndex = Math.floor((progress / 100) * stages.length);
                              if (stageIndex !== currentStage && stageIndex < stages.length) {
                                if (currentStage < stages.length) {
                                  const prevIcon = document.getElementById(`${stages[currentStage]}-icon`);
                                  prevIcon.style.background = '#3b82f6';
                                  prevIcon.textContent = '✓';
                                  prevIcon.style.color = 'white';
                                }
                                currentStage = stageIndex;
                                
                                if (currentStage < stages.length) {
                                  const currentIcon = document.getElementById(`${stages[currentStage]}-icon`);
                                  currentIcon.style.background = '#f59e0b';
                                  currentIcon.textContent = '🔄';
                                  currentIcon.style.color = 'white';
                                }
                              }
                              
                              const statusIndex = Math.floor((progress / 100) * statuses.length);
                              document.getElementById('recovery-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                            }
                            
                            document.getElementById('recovery-percentage').textContent = Math.floor(progress) + '%';
                            document.getElementById('recovery-progress').style.width = progress + '%';
                            document.getElementById('services-recovered').textContent = `${servicesRecovered}/8`;
                          }, 1100);
                          
                          // Cancel button
                          document.getElementById('recovery-cancel').onclick = () => {
                            clearInterval(recoveryInterval);
                            overlay.remove();
                          };
                          
                          // Log button
                          document.getElementById('recovery-log').onclick = () => {
                            const logData = {
                              timestamp: new Date().toISOString(),
                              action: 'system_recovery',
                              servicesRecovered: servicesRecovered,
                              totalServices: 8,
                              dataIntegrity: '100%',
                              recoveryStages: [
                                'Assessment: ✓ Completed',
                                'Restore: ✓ Completed',
                                'Rebuild: ✓ Completed',
                                'Validation: ✓ Completed'
                              ],
                              summary: 'System recovery completed with full data integrity'
                            };
                            
                            const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `recovery-log-${new Date().toISOString().split('T')[0]}.json`;
                            link.click();
                            URL.revokeObjectURL(url);
                          };
                        }}
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Recovery Mode
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Create professional contact support modal
                          const modalContent = document.createElement('div');
                          modalContent.innerHTML = `
                            <div style="max-width: 480px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                <div id="support-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                                  <span style="color: white; font-size: 20px;">📞</span>
                                </div>
                                <div>
                                  <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">Contact Support</h3>
                                  <p id="support-status" style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Connecting to support team...</p>
                                </div>
                              </div>
                              
                              <div style="margin-bottom: 20px;">
                                <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                                  <span style="color: #374151; font-weight: 500;">Connection Progress</span>
                                  <span id="support-percentage" style="color: #10b981; font-weight: 600;">0%</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                                  <div id="support-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981, #059669); transition: width 0.5s ease;"></div>
                                </div>
                              </div>
                              
                              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">PRIORITY</div>
                                  <div id="support-priority" style="color: #dc2626; font-size: 16px; font-weight: 600;">URGENT</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">TICKET ID</div>
                                  <div id="support-ticket" style="color: #10b981; font-size: 16px; font-weight: 600;">#${Math.floor(Math.random() * 10000)}</div>
                                </div>
                                <div>
                                  <div style="color: #6b7280; font-size: 12px;">ETA</div>
                                  <div id="support-eta" style="color: #3b82f6; font-size: 16px; font-weight: 600;">< 5 min</div>
                                </div>
                              </div>
                              
                              <div id="support-methods" style="margin-bottom: 20px;">
                                <div id="method-phone" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f0fdf4; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #10b981;">
                                  <div id="phone-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Phone Support (24/7)</span>
                                </div>
                                <div id="method-chat" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f0fdf4; border-radius: 8px; margin-bottom: 6px; border-left: 4px solid #10b981;">
                                  <div id="chat-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Live Chat Support</span>
                                </div>
                                <div id="method-email" style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                                  <div id="email-icon" style="width: 20px; height: 20px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">⏳</div>
                                  <span style="color: #374151; font-size: 14px;">Email Support Team</span>
                                </div>
                              </div>
                              
                              <div id="support-actions" style="display: flex; gap: 12px;">
                                <button id="support-cancel" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                                  Cancel
                                </button>
                                <button id="support-call" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; display: none;">
                                  Call Now
                                </button>
                              </div>
                            </div>
                          `;
                          
                          const overlay = document.createElement('div');
                          overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                          overlay.appendChild(modalContent);
                          document.body.appendChild(overlay);
                          
                          // Simulate support connection
                          let progress = 0;
                          let currentMethod = 0;
                          const methods = ['phone', 'chat', 'email'];
                          const statuses = [
                            'Initializing support request...',
                            'Verifying account credentials...',
                            'Routing to available agent...',
                            'Connecting to support team...',
                            'Support team ready to assist'
                          ];
                          
                          const supportInterval = setInterval(() => {
                            progress += Math.random() * 25;
                            
                            if (progress >= 100) {
                              progress = 100;
                              clearInterval(supportInterval);
                              
                              // Complete all methods
                              methods.forEach(method => {
                                const icon = document.getElementById(`${method}-icon`);
                                icon.style.background = '#10b981';
                                icon.textContent = '✓';
                                icon.style.color = 'white';
                              });
                              
                              document.getElementById('support-status').textContent = '📞 Support team is ready to assist you!';
                              document.getElementById('support-status').style.color = '#10b981';
                              document.getElementById('support-call').style.display = 'block';
                              document.getElementById('support-cancel').textContent = 'Close';
                              
                              setSaveStatus('support-contacted');
                              setTimeout(() => setSaveStatus(''), 2000);
                            } else {
                              // Update current method
                              const methodIndex = Math.floor((progress / 100) * methods.length);
                              if (methodIndex !== currentMethod && methodIndex < methods.length) {
                                if (currentMethod < methods.length) {
                                  const prevIcon = document.getElementById(`${methods[currentMethod]}-icon`);
                                  prevIcon.style.background = '#10b981';
                                  prevIcon.textContent = '✓';
                                  prevIcon.style.color = 'white';
                                }
                                currentMethod = methodIndex;
                                
                                if (currentMethod < methods.length) {
                                  const currentIcon = document.getElementById(`${methods[currentMethod]}-icon`);
                                  currentIcon.style.background = '#3b82f6';
                                  currentIcon.textContent = '📞';
                                  currentIcon.style.color = 'white';
                                }
                              }
                              
                              const statusIndex = Math.floor((progress / 100) * statuses.length);
                              document.getElementById('support-status').textContent = statuses[statusIndex] || statuses[statuses.length - 1];
                            }
                            
                            document.getElementById('support-percentage').textContent = Math.floor(progress) + '%';
                            document.getElementById('support-progress').style.width = progress + '%';
                          }, 800);
                          
                          // Cancel button
                          document.getElementById('support-cancel').onclick = () => {
                            clearInterval(supportInterval);
                            overlay.remove();
                          };
                          
                          // Call button
                          document.getElementById('support-call').onclick = () => {
                            // Create professional toast notification
                            const toast = document.createElement('div');
                            toast.innerHTML = `
                              <div style="position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 16px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1001; animation: slideIn 0.3s ease;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                  <span style="font-size: 16px;">📞</span>
                                  <span style="font-weight: 500;">Calling Support: +1-800-SUPPORT</span>
                                </div>
                              </div>
                            `;
                            document.body.appendChild(toast);
                            
                            setTimeout(() => {
                              toast.remove();
                              overlay.remove();
                            }, 3000);
                          };
                        }}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Professional 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl border ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-opacity-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {twoFAStep === 1 && 'Choose Security Method'}
                    {twoFAStep === 'sms' && 'SMS Setup'}
                    {twoFAStep === 'sms-verify' && 'SMS Verification'}
                    {twoFAStep === 'email' && 'Email Setup'}
                    {twoFAStep === 'email-verify' && 'Email Verification'}
                    {twoFAStep === 'biometric' && 'Biometric Setup'}
                    {twoFAStep === 'social' && 'Social Authentication'}
                    {twoFAStep === 'hardware' && 'Hardware Key Setup'}
                    {(twoFAStep === 2 || twoFAStep === 3) && `Step ${twoFAStep} of 3`}
                  </p>
                </div>
              </div>
              <button
                onClick={close2FAModal}
                className={`p-2 rounded-lg hover:bg-opacity-20 transition-colors ${
                  theme === 'dark' ? 'hover:bg-slate-600' : 'hover:bg-slate-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Step 1: Choose Security Method */}
              {twoFAStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Choose Security Method
                    </h4>
                    <p className="text-muted-foreground">
                      Select your preferred two-factor authentication method
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* SMS Authentication */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-green-500' 
                          : 'border-slate-200 bg-slate-50 hover:bg-green-50 hover:border-green-300'
                      }`}
                      onClick={() => setTwoFAStep('sms')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            SMS Verification
                          </h5>
                          <p className="text-sm text-muted-foreground">Get codes via text message</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600 font-medium">Easy Setup</span>
                          </div>
                        </div>
                        <div className="text-green-600 text-2xl">📱</div>
                      </div>
                    </div>

                    {/* Email Authentication */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-blue-500' 
                          : 'border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300'
                      }`}
                      onClick={() => setTwoFAStep('email')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Email Verification
                          </h5>
                          <p className="text-sm text-muted-foreground">Receive codes in your email</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-blue-600 font-medium">Instant Access</span>
                          </div>
                        </div>
                        <div className="text-blue-600 text-2xl">✉️</div>
                      </div>
                    </div>

                    {/* Biometric Authentication */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-purple-500' 
                          : 'border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-300'
                      }`}
                      onClick={() => setTwoFAStep('biometric')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl">👆</span>
                        </div>
                        <div className="flex-1">
                          <h5 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Biometric Security
                          </h5>
                          <p className="text-sm text-muted-foreground">Fingerprint or Face ID</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-xs text-purple-600 font-medium">Most Secure</span>
                          </div>
                        </div>
                        <div className="text-purple-600 text-2xl">🔒</div>
                      </div>
                    </div>

                    {/* Social Login Integration */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-red-500' 
                          : 'border-slate-200 bg-slate-50 hover:bg-red-50 hover:border-red-300'
                      }`}
                      onClick={() => setTwoFAStep('social')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl font-bold">G</span>
                        </div>
                        <div className="flex-1">
                          <h5 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Social Authentication
                          </h5>
                          <p className="text-sm text-muted-foreground">Google, Microsoft, GitHub</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-xs text-orange-600 font-medium">One-Click</span>
                          </div>
                        </div>
                        <div className="text-red-600 text-2xl">🚀</div>
                      </div>
                    </div>

                    {/* Hardware Keys */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-amber-500' 
                          : 'border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                      onClick={() => setTwoFAStep('hardware')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                          <Key className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Hardware Security Key
                          </h5>
                          <p className="text-sm text-muted-foreground">YubiKey, FIDO2 compatible</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-xs text-amber-600 font-medium">Enterprise</span>
                          </div>
                        </div>
                        <div className="text-amber-600 text-2xl">🔑</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                      Choose the method that works best for you. You can change this later.
                    </p>
                  </div>
                </div>
              )}

              {/* SMS Setup Flow */}
              {twoFAStep === 'sms' && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      SMS Verification Setup
                    </h4>
                    <p className="text-muted-foreground">
                      Enter your phone number to receive verification codes
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Phone Number
                      </label>
                      <div className="flex space-x-2">
                        <select className={`px-3 py-2 border rounded-lg ${
                          theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                        }`}>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+212">🇲🇦 +212</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          className={`flex-1 px-3 py-2 border rounded-lg ${
                            theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                          }`}
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-700/50' : 'bg-green-50'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-medium">Secure & Encrypted</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your phone number will be encrypted and only used for 2FA
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFAStep(1)}
                      className="flex-1"
                    >
                      ← Back
                    </Button>
                    <Button 
                      onClick={() => {
                        setSaveStatus('sending-sms');
                        setTimeout(() => {
                          setTwoFAStep('sms-verify');
                          setSaveStatus('sms-sent');
                          setTimeout(() => setSaveStatus(''), 2000);
                        }, 1500);
                      }}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      Send Code
                    </Button>
                  </div>
                </div>
              )}

              {/* SMS Verification */}
              {twoFAStep === 'sms-verify' && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Enter SMS Code
                    </h4>
                    <p className="text-muted-foreground">
                      We sent a 6-digit code to your phone
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Verification Code
                      </label>
                      <input
                        type="text"
                        placeholder="000000"
                        maxLength="6"
                        className={`w-full px-4 py-3 text-center text-2xl font-mono border rounded-lg tracking-wider ${
                          theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                        }`}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSaveStatus('resending-sms');
                        setTimeout(() => {
                          setSaveStatus('sms-resent');
                          setTimeout(() => setSaveStatus(''), 2000);
                        }, 1000);
                      }}
                    >
                      Didn't receive code? Resend
                    </Button>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFAStep('sms')}
                      className="flex-1"
                    >
                      ← Back
                    </Button>
                    <Button 
                      onClick={() => {
                        if (verificationCode.length === 6) {
                          setSaveStatus('verifying-sms');
                          setTimeout(() => {
                            setAccountData(prev => ({ ...prev, twoFactorEnabled: true }));
                            setSaveStatus('2fa-enabled');
                            setShow2FAModal(false);
                            setVerificationCode('');
                            setTimeout(() => setSaveStatus(''), 3000);
                          }, 2000);
                        }
                      }}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      disabled={verificationCode.length !== 6}
                    >
                      Verify & Enable
                    </Button>
                  </div>
                </div>
              )}

              {/* Email Setup Flow */}
              {twoFAStep === 'email' && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Email Verification Setup
                    </h4>
                    <p className="text-muted-foreground">
                      We'll send verification codes to your email address
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-slate-600 bg-slate-700/30' : 'border-blue-200 bg-blue-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {accountData.email}
                          </p>
                          <p className="text-sm text-muted-foreground">Primary email address</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-700/50' : 'bg-blue-50'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-blue-600 font-medium">Instant Delivery</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Codes arrive in seconds to your inbox
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFAStep(1)}
                      className="flex-1"
                    >
                      ← Back
                    </Button>
                    <Button 
                      onClick={() => {
                        setSaveStatus('sending-email');
                        setTimeout(() => {
                          setTwoFAStep('email-verify');
                          setSaveStatus('email-sent');
                          setTimeout(() => setSaveStatus(''), 2000);
                        }, 1500);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      Send Test Code
                    </Button>
                  </div>
                </div>
              )}

              {/* Biometric Setup Flow */}
              {twoFAStep === 'biometric' && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-2xl">👆</span>
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Biometric Security Setup
                    </h4>
                    <p className="text-muted-foreground">
                      Enable fingerprint or Face ID authentication
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-slate-600 bg-slate-700/30' : 'border-purple-200 bg-purple-50'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">🔒</span>
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Secure Biometric Authentication
                          </p>
                          <p className="text-sm text-muted-foreground">Your biometric data stays on your device</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-purple-600">Fingerprint Recognition</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-purple-600">Face ID Support</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-purple-600">Hardware Encryption</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFAStep(1)}
                      className="flex-1"
                    >
                      ← Back
                    </Button>
                    <Button 
                      onClick={() => {
                        setSaveStatus('biometric-setup');
                        setTimeout(() => {
                          setAccountData(prev => ({ ...prev, twoFactorEnabled: true }));
                          setSaveStatus('biometric-enabled');
                          setShow2FAModal(false);
                          setTimeout(() => setSaveStatus(''), 3000);
                        }, 2000);
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    >
                      Enable Biometric
                    </Button>
                  </div>
                </div>
              )}

              {/* Social Authentication Setup */}
              {twoFAStep === 'social' && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-xl font-bold">G</span>
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Social Authentication
                    </h4>
                    <p className="text-muted-foreground">
                      Connect with your social accounts for secure access
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Google */}
                    <button 
                      className={`w-full p-4 border rounded-lg transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-red-500' 
                          : 'border-slate-200 bg-white hover:bg-red-50 hover:border-red-300'
                      }`}
                      onClick={() => {
                        setSaveStatus('social-auth');
                        setTimeout(() => {
                          setAccountData(prev => ({ ...prev, twoFactorEnabled: true }));
                          setSaveStatus('social-connected');
                          setShow2FAModal(false);
                          setTimeout(() => setSaveStatus(''), 3000);
                        }, 2000);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">G</span>
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Continue with Google
                          </p>
                          <p className="text-sm text-muted-foreground">Secure OAuth 2.0 authentication</p>
                        </div>
                        <span className="text-red-600">→</span>
                      </div>
                    </button>

                    {/* Microsoft */}
                    <button 
                      className={`w-full p-4 border rounded-lg transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-blue-500' 
                          : 'border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300'
                      }`}
                      onClick={() => {
                        setSaveStatus('social-auth');
                        setTimeout(() => {
                          setAccountData(prev => ({ ...prev, twoFactorEnabled: true }));
                          setSaveStatus('social-connected');
                          setShow2FAModal(false);
                          setTimeout(() => setSaveStatus(''), 3000);
                        }, 2000);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">⊞</span>
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Continue with Microsoft
                          </p>
                          <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
                        </div>
                        <span className="text-blue-600">→</span>
                      </div>
                    </button>

                    {/* GitHub */}
                    <button 
                      className={`w-full p-4 border rounded-lg transition-all hover:scale-[1.02] ${
                        theme === 'dark' 
                          ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 hover:border-gray-500' 
                          : 'border-slate-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSaveStatus('social-auth');
                        setTimeout(() => {
                          setAccountData(prev => ({ ...prev, twoFactorEnabled: true }));
                          setSaveStatus('social-connected');
                          setShow2FAModal(false);
                          setTimeout(() => setSaveStatus(''), 3000);
                        }, 2000);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">⚡</span>
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Continue with GitHub
                          </p>
                          <p className="text-sm text-muted-foreground">Developer-friendly authentication</p>
                        </div>
                        <span className="text-gray-600">→</span>
                      </div>
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFAStep(1)}
                    >
                      ← Back to methods
                    </Button>
                  </div>
                </div>
              )}

              {/* Hardware Key Setup */}
              {twoFAStep === 'hardware' && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto">
                      <Key className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Hardware Security Key
                    </h4>
                    <p className="text-muted-foreground">
                      Use a physical security key for maximum protection
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-slate-600 bg-slate-700/30' : 'border-amber-200 bg-amber-50'
                    }`}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Key className="w-5 h-5 text-amber-600" />
                          <div>
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              Supported Hardware Keys
                            </p>
                            <p className="text-sm text-muted-foreground">FIDO2 and WebAuthn compatible</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 ml-8">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-sm text-amber-600">YubiKey Series</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-sm text-amber-600">Google Titan Security Key</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-sm text-amber-600">SoloKeys</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-700/50' : 'bg-amber-50'
                    }`}>
                      <p className="text-sm text-muted-foreground">
                        💡 <strong>Tip:</strong> Insert your security key when prompted and touch the button to activate.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFAStep(1)}
                      className="flex-1"
                    >
                      ← Back
                    </Button>
                    <Button 
                      onClick={() => {
                        setSaveStatus('hardware-setup');
                        setTimeout(() => {
                          setAccountData(prev => ({ ...prev, twoFactorEnabled: true }));
                          setSaveStatus('hardware-enabled');
                          setShow2FAModal(false);
                          setTimeout(() => setSaveStatus(''), 3000);
                        }, 2500);
                      }}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700"
                    >
                      Setup Hardware Key
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Scan QR Code */}
              {twoFAStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Scan QR Code
                    </h4>
                    <p className="text-muted-foreground">
                      Open your authenticator app and scan this QR code
                    </p>
                  </div>

                  {/* QR Code Area */}
                  <div className="bg-white p-6 rounded-xl mx-auto w-fit">
                    <div className="w-48 h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                      {/* QR Code Pattern Simulation */}
                      <div className="absolute inset-2 bg-white rounded">
                        <div className="grid grid-cols-8 gap-1 p-2 h-full">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manual Setup Option */}
                  <div className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'border-slate-600 bg-slate-700/30' : 'border-slate-200 bg-slate-50'
                  }`}>
                    <p className="text-sm font-medium mb-2">Can't scan? Enter this code manually:</p>
                    <div className="flex items-center space-x-2">
                      <code className={`px-3 py-2 rounded font-mono text-sm flex-1 ${
                        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                      }`}>
                        {qrCodeSecret}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(qrCodeSecret);
                          // Create professional copy confirmation toast
                          const toast = document.createElement('div');
                          toast.innerHTML = `
                            <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 1001; display: flex; align-items: center; gap: 12px; transform: translateX(100%); transition: transform 0.3s ease;">
                              <span style="font-size: 20px;">📋</span>
                              <div>
                                <div style="font-weight: 600; font-size: 14px;">Secret Key Copied!</div>
                                <div style="font-size: 12px; opacity: 0.9;">Backup code saved to clipboard</div>
                              </div>
                            </div>
                          `;
                          document.body.appendChild(toast);
                          
                          // Animate in
                          setTimeout(() => {
                            toast.firstElementChild.style.transform = 'translateX(0)';
                          }, 100);
                          
                          // Animate out and remove
                          setTimeout(() => {
                            toast.firstElementChild.style.transform = 'translateX(100%)';
                            setTimeout(() => toast.remove(), 300);
                          }, 3000);
                          
                          setSaveStatus('secret-copied');
                          setTimeout(() => setSaveStatus(''), 2000);
                        }}
                      >
                        📋
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setTwoFAStep(3)} 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    I've added it to my app
                  </Button>
                </div>
              )}

              {/* Step 3: Verify Code */}
              {twoFAStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                      <Key className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Enter Verification Code
                    </h4>
                    <p className="text-muted-foreground">
                      Enter the 6-digit code from your authenticator app
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-2xl font-mono tracking-widest"
                      maxLength={6}
                    />
                    
                    <p className="text-sm text-muted-foreground text-center">
                      The code changes every 30 seconds
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFAStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={verify2FACode}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                      disabled={verificationCode.length !== 6}
                    >
                      Verify & Enable
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* API Keys Management Modal */}
      {showAPIModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">API Keys Management</h3>
                  <p className="text-sm text-muted-foreground">Manage your API keys and integrations</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAPIModal(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Create New API Key */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create New API Key
                </h4>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter API key name (e.g., Mobile App, Analytics)"
                    value={newAPIKeyName}
                    onChange={(e) => setNewAPIKeyName(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (newAPIKeyName.trim()) {
                        const newKey = {
                          id: Date.now(),
                          name: newAPIKeyName,
                          key: `pk_live_****${Math.random().toString(36).substr(2, 4)}`,
                          created: new Date().toISOString().split('T')[0],
                          lastUsed: 'Never',
                          permissions: ['read']
                        };
                        setApiKeys(prev => [...prev, newKey]);
                        setNewAPIKeyName('');
                        setSaveStatus('api-key-created');
                        setTimeout(() => setSaveStatus(''), 2000);
                      }
                    }}
                    disabled={!newAPIKeyName.trim()}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create
                  </Button>
                </div>
              </div>

              {/* API Keys List */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center justify-between">
                  Active API Keys
                  <Badge variant="outline">{apiKeys.length} total</Badge>
                </h4>
                
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-3">
                          <h5 className="font-medium">{apiKey.name}</h5>
                          <div className="flex space-x-1">
                            {apiKey.permissions.map(perm => (
                              <Badge key={perm} variant="secondary" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Created: {apiKey.created}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                            {apiKey.key}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(apiKey.key.replace('****', Math.random().toString(36).substr(2, 8)));
                              setSaveStatus('api-key-copied');
                              setTimeout(() => setSaveStatus(''), 2000);
                            }}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSaveStatus('api-key-regenerated');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Regenerate
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setApiKeys(prev => prev.filter(k => k.id !== apiKey.id));
                            setSaveStatus('api-key-deleted');
                            setTimeout(() => setSaveStatus(''), 2000);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* API Documentation */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  API Documentation
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to integrate with PiwPiw API using your keys
                </p>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Simulate opening API documentation
                      window.open('https://docs.piwpiw.com/api', '_blank');
                      setSaveStatus('api-docs-opened');
                      setTimeout(() => setSaveStatus(''), 2000);
                    }}
                  >
                    📚 View Docs
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Simulate webhook configuration
                      const webhookUrl = prompt('Enter webhook URL:');
                      if (webhookUrl) {
                        setSaveStatus('webhook-configured');
                      } else {
                        setSaveStatus('webhook-cancelled');
                      }
                      setTimeout(() => setSaveStatus(''), 2000);
                    }}
                  >
                    🔗 Webhooks
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Create professional usage statistics modal
                      const modalContent = document.createElement('div');
                      modalContent.innerHTML = `
                        <div style="max-width: 500px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                              <span style="color: white; font-size: 20px;">📊</span>
                            </div>
                            <div>
                              <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600;">API Usage Statistics</h3>
                              <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Real-time API usage data</p>
                            </div>
                          </div>
                          
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                            <div style="padding: 16px; background: #f0f9ff; border-radius: 12px; border-left: 4px solid #3b82f6;">
                              <div style="color: #1e40af; font-size: 13px; font-weight: 500; margin-bottom: 4px;">REQUESTS TODAY</div>
                              <div style="color: #1f2937; font-size: 24px; font-weight: 700;">1,234</div>
                              <div style="color: #059669; font-size: 12px; margin-top: 4px;">+12% vs yesterday</div>
                            </div>
                            <div style="padding: 16px; background: #f0fdf4; border-radius: 12px; border-left: 4px solid #10b981;">
                              <div style="color: #047857; font-size: 13px; font-weight: 500; margin-bottom: 4px;">RATE LIMIT</div>
                              <div style="color: #1f2937; font-size: 24px; font-weight: 700;">5,000/hr</div>
                              <div style="color: #6b7280; font-size: 12px; margin-top: 4px;">Reset in 58 min</div>
                            </div>
                          </div>
                          
                          <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
                              <span style="color: #374151; font-weight: 500;">Quota Usage</span>
                              <span style="color: #3b82f6; font-weight: 600;">24.7%</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                              <div style="width: 24.7%; height: 100%; background: linear-gradient(90deg, #3b82f6, #1d4ed8);"></div>
                            </div>
                          </div>
                          
                          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
                            <div>
                              <div style="color: #6b7280; font-size: 12px;">SUCCESS RATE</div>
                              <div style="color: #059669; font-size: 16px; font-weight: 600;">99.8%</div>
                            </div>
                            <div>
                              <div style="color: #6b7280; font-size: 12px;">AVG RESPONSE</div>
                              <div style="color: #3b82f6; font-size: 16px; font-weight: 600;">142ms</div>
                            </div>
                            <div>
                              <div style="color: #6b7280; font-size: 12px;">LAST RESET</div>
                              <div style="color: #6b7280; font-size: 16px; font-weight: 600;">2h ago</div>
                            </div>
                          </div>
                          
                          <div style="display: flex; gap: 12px;">
                            <button onclick="this.parentElement.parentElement.remove()" style="flex: 1; padding: 10px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                              Close
                            </button>
                            <button onclick="window.open('/api/docs', '_blank')" style="flex: 1; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">
                              View Details
                            </button>
                          </div>
                        </div>
                      `;
                      
                      const overlay = document.createElement('div');
                      overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);';
                      overlay.appendChild(modalContent);
                      overlay.onclick = (e) => e.target === overlay && overlay.remove();
                      document.body.appendChild(overlay);
                      
                      setSaveStatus('usage-stats-viewed');
                      setTimeout(() => setSaveStatus(''), 2000);
                    }}
                  >
                    📊 Usage Stats
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-slate-50 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAPIModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Category Settings Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <SettingsIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCategory?.name}</h3>
                  <p className="text-sm text-muted-foreground">Configure retention and sync options</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCategoryModal(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Retention</Label>
                <Select value={categoryModalData.retention} onValueChange={(value) => setCategoryModalData(prev => ({ ...prev, retention: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select retention" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="1 year">1 year</SelectItem>
                    <SelectItem value="2 years">2 years</SelectItem>
                    <SelectItem value="5 years">5 years</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Sync</span>
                <Switch checked={categoryModalData.autoSync} onCheckedChange={(checked) => setCategoryModalData(prev => ({ ...prev, autoSync: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notify on sync completion</span>
                <Switch checked={categoryModalData.notifyOnSync} onCheckedChange={(checked) => setCategoryModalData(prev => ({ ...prev, notifyOnSync: checked }))} />
              </div>
              <div className="space-y-2">
                <Label>Cleanup Policy</Label>
                <Select value={categoryModalData.cleanupPolicy} onValueChange={(value) => setCategoryModalData(prev => ({ ...prev, cleanupPolicy: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="archive">Archive old items</SelectItem>
                    <SelectItem value="delete">Delete permanently</SelectItem>
                    <SelectItem value="retain">Retain indefinitely</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCategoryModal(false)}>
                Cancel
              </Button>
              <Button onClick={saveCategorySettings}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Change Password</h3>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPasswordModal(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              
              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Password Strength</span>
                  <span className="text-green-600 font-medium">Strong</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>8+ characters</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Special character</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Number</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Upper & lowercase</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-slate-50 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowPasswordModal(false);
                  setSaveStatus('password-changed');
                  setTimeout(() => setSaveStatus(''), 2000);
                }}
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
