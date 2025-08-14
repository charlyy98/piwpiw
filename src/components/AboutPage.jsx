import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Bot, 
  Heart, 
  Users, 
  Server, 
  Globe, 
  Code, 
  Shield, 
  Zap,
  Github,
  ExternalLink,
  Crown,
  Star,
  Award,
  Activity,
  Clock,
  Languages,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Rocket,
  Target,
  Eye,
  Coffee,
  Lightbulb,
  Lock,
  FileText,
  Monitor,
  Navigation,
  BookOpen,
  HelpCircle
} from 'lucide-react';

const AboutPage = () => {
  const { user, theme } = useApp();
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      title: "About PiwPiw Bot",
      subtitle: "Your Ultimate Discord Companion",
      sections: {
        overview: {
          title: "🤖 Bot Overview",
          description: "PiwPiw is a comprehensive Moroccan interactive bot that provides games, challenges, points system, virtual store, and advanced server management.",
          features: [
            "🇲🇦 Supports Moroccan Darija",
            "💎 Professional UI and user-friendly interface",
            "🔄 Continuous updates based on user feedback",
            "🏅 Verified Bot Status",
            "⚡ Advanced server management tools"
          ]
        },
        tech: {
          title: "🔧 Technical Specifications",
          specs: [
            { label: "Version", value: "v2.5.1", icon: "🏷️" },
            { label: "Language", value: "Python 3.11.13", icon: "🐍" },
            { label: "Framework", value: "discord.py 2.3.2", icon: "⚙️" },
            { label: "Database", value: "JSON", icon: "📄" },
            { label: "Uptime", value: "2h 32m", icon: "⏱️" },
            { label: "Status", value: "🟢 Online", icon: "🔴" }
          ]
        },
        stats: {
          title: "📊 Live Statistics",
          data: [
            { label: "Servers", value: "4", change: "+2 this month", icon: Server },
            { label: "Users", value: "1,649", change: "+247 this week", icon: Users },
            { label: "Commands Used", value: "25,847", change: "+1,203 today", icon: Zap },
            { label: "Uptime", value: "99.8%", change: "Excellent", icon: Activity }
          ]
        },
        mission: {
          title: "🎯 Mission & Vision",
          mission: "Our goal is to provide a comprehensive entertainment and management experience for all Moroccan and Arabic servers.",
          vision: "We believe that interaction and fun should be accessible to everyone!",
          values: [
            { title: "Innovation", desc: "Continuous improvement and new features", icon: Lightbulb },
            { title: "Community", desc: "Building stronger Discord communities", icon: Users },
            { title: "Quality", desc: "Premium experience for all users", icon: Star },
            { title: "Support", desc: "24/7 community support", icon: Heart }
          ]
        },
        developer: {
          title: "👨‍💻 Developer & Team",
          developer: {
            name: "Laylay98",
            role: "Lead Developer",
            nickname: "worldofficial❤️Dev",
            discord: "Laylay98#0001",
            expertise: ["Discord Bot Development", "UI/UX Design", "Python Programming", "Database Management"]
          },
          contributors: ["@user1", "@user2"],
          contact: "For support or suggestions, contact us via Discord or our official website."
        },
        updates: {
          title: "🆕 Latest Updates",
          updates: [
            { version: "v2.5.1", date: "Today", changes: ["Added professional About section", "Improved user interface", "Security fixes"] },
            { version: "v2.5.0", date: "Last week", changes: ["New dashboard features", "Performance improvements", "Bug fixes"] },
            { version: "v2.4.8", date: "2 weeks ago", changes: ["Added new games", "Enhanced moderation tools", "UI enhancements"] }
          ]
        },
        resources: {
          title: "🌐 Resources & Support",
          links: [
            { name: "GitHub Repository", url: "#", icon: Github },
            { name: "Documentation", url: "#", icon: FileText },
            { name: "Invite Bot", url: "https://discord.com/oauth2/authorize?client_id=1397634031268663448", icon: Bot },
            { name: "Support Server", url: "https://discord.gg/AX9JrDmU2c", icon: ExternalLink }
          ]
        },
        dashboard: {
          title: "🎛️ Dashboard Guide",
          description: "Learn how to navigate and use the PiwPiw dashboard effectively",
          techSpecs: {
            title: "🔧 Dashboard Technical Specifications",
            specs: [
              { label: "Frontend Framework", value: "React 18.2.0", icon: "⚛️" },
              { label: "UI Library", value: "Tailwind CSS + Radix UI", icon: "🎨" },
              { label: "Build Tool", value: "Vite 4.4.5", icon: "⚡" },
              { label: "State Management", value: "React Context API", icon: "🔄" },
              { label: "Responsive Design", value: "Mobile-First Approach", icon: "📱" },
              { label: "Theme Support", value: "Light/Dark Mode", icon: "🌙" },
              { label: "Language Support", value: "English/Arabic (RTL)", icon: "🌍" },
              { label: "Performance", value: "Optimized Loading", icon: "🚀" },
              { label: "Browser Support", value: "Modern Browsers", icon: "🌐" },
              { label: "Security", value: "HTTPS + Authentication", icon: "🔒" }
            ]
          },
          sections: [
            {
              title: "Getting Started",
              icon: "🚀",
              content: "Welcome to your PiwPiw dashboard! This is your central hub for managing your Discord bot across all servers.",
              features: [
                "Real-time server statistics",
                "Quick access to all bot features",
                "Comprehensive analytics",
                "User-friendly interface"
              ]
            },
            {
              title: "Navigation Guide",
              icon: "🧭",
              content: "Navigate through different sections using the sidebar menu:",
              features: [
                "Dashboard - Overview and key metrics",
                "Servers - Manage your Discord servers",
                "Commands - View and configure bot commands",
                "Analytics - Detailed performance insights",
                "Settings - Customize your preferences",
                "Profile - Manage your account information"
              ]
            },
            {
              title: "Key Features",
              icon: "⭐",
              content: "Explore the powerful features available in your dashboard:",
              features: [
                "Live server monitoring",
                "Command usage analytics",
                "User engagement tracking",
                "Performance optimization tools",
                "Multi-language support",
                "Advanced security settings"
              ]
            },
            {
              title: "Pro Tips",
              icon: "💡",
              content: "Make the most of your PiwPiw dashboard with these tips:",
              features: [
                "Use the search function to quickly find commands",
                "Check analytics regularly for insights",
                "Customize your dashboard layout",
                "Enable notifications for important events",
                "Use keyboard shortcuts for faster navigation",
                "Export data for external analysis"
              ]
            }
          ]
        },
        privacy: {
          title: "🔒 Privacy & Security",
          points: [
            "All data is secure and not shared with any third parties",
            "You can request data deletion at any time",
            "GDPR compliant data handling",
            "Encrypted data transmission"
          ]
        }
      }
    },
    ar: {
      title: "حول بوت PiwPiw",
      subtitle: "رفيقك المثالي في ديسكورد",
      sections: {
        overview: {
          title: "🤖 نظرة عامة على البوت",
          description: "PiwPiw هو بوت تفاعلي مغربي متكامل يقدم ألعاب، تحديات، نظام نقاط، متجر افتراضي، وإدارة متقدمة للسيرفرات.",
          features: [
            "🇲🇦 يدعم الدارجة المغربية",
            "💎 واجهة UI احترافية وسهلة الاستخدام",
            "🔄 تحديثات مستمرة بناءً على اقتراحات المستخدمين",
            "🏅 حالة البوت المؤكدة",
            "⚡ أدوات إدارة متقدمة للسيرفرات"
          ]
        },
        tech: {
          title: "🔧 المواصفات التقنية",
          specs: [
            { label: "الإصدار", value: "v2.5.1", icon: "🏷️" },
            { label: "اللغة", value: "Python 3.11.13", icon: "🐍" },
            { label: "الإطار", value: "discord.py 2.3.2", icon: "⚙️" },
            { label: "قاعدة البيانات", value: "JSON", icon: "📄" },
            { label: "مدة التشغيل", value: "2 ساعة و 32 دقيقة", icon: "⏱️" },
            { label: "الحالة", value: "🟢 متصل", icon: "🔴" }
          ]
        },
        stats: {
          title: "📊 الإحصائيات المباشرة",
          data: [
            { label: "السيرفرات", value: "4", change: "+2 هذا الشهر", icon: Server },
            { label: "المستخدمين", value: "1,649", change: "+247 هذا الأسبوع", icon: Users },
            { label: "الأوامر المستخدمة", value: "25,847", change: "+1,203 اليوم", icon: Zap },
            { label: "وقت التشغيل", value: "99.8%", change: "ممتاز", icon: Activity }
          ]
        },
        mission: {
          title: "🎯 المهمة والرؤية",
          mission: "هدفنا هو تقديم تجربة ترفيهية وإدارية متكاملة لكل السيرفرات المغربية والعربية.",
          vision: "نؤمن بأن التفاعل والمرح يجب أن يكونا في متناول الجميع!",
          values: [
            { title: "الابتكار", desc: "التحسين المستمر والميزات الجديدة", icon: Lightbulb },
            { title: "المجتمع", desc: "بناء مجتمعات ديسكورد أقوى", icon: Users },
            { title: "الجودة", desc: "تجربة مميزة لجميع المستخدمين", icon: Star },
            { title: "الدعم", desc: "دعم المجتمع على مدار الساعة", icon: Heart }
          ]
        },
        developer: {
          title: "👨‍💻 المطور والفريق",
          developer: {
            name: "Laylay98",
            role: "المطور الرئيسي",
            nickname: "worldofficial❤️Dev",
            discord: "Laylay98#0001",
            expertise: ["تطوير بوتات ديسكورد", "تصميم واجهة المستخدم", "برمجة Python", "إدارة قواعد البيانات"]
          },
          contributors: ["@user1", "@user2"],
          contact: "للدعم الفني أو اقتراحات جديدة، تواصل معنا عبر الديسكورد أو الموقع الرسمي."
        },
        updates: {
          title: "🆕 آخر التحديثات",
          updates: [
            { version: "v2.5.1", date: "اليوم", changes: ["إضافة قسم About احترافي", "تحسين واجهة المستخدم", "إصلاحات أمنية"] },
            { version: "v2.5.0", date: "الأسبوع الماضي", changes: ["ميزات جديدة للوحة التحكم", "تحسينات في الأداء", "إصلاح الأخطاء"] },
            { version: "v2.4.8", date: "منذ أسبوعين", changes: ["إضافة ألعاب جديدة", "تحسين أدوات الإشراف", "تحسينات واجهة المستخدم"] }
          ]
        },
        resources: {
          title: "🌐 الموارد والدعم",
          links: [
            { name: "مستودع GitHub", url: "#", icon: Github },
            { name: "الوثائق", url: "#", icon: FileText },
            { name: "دعوة البوت", url: "https://discord.com/oauth2/authorize?client_id=1397634031268663448", icon: Bot },
            { name: "سيرفر الدعم", url: "https://discord.gg/AX9JrDmU2c", icon: ExternalLink }
          ]
        },
        dashboard: {
          title: "🎛️ دليل لوحة التحكم",
          description: "تعلم كيفية التنقل واستخدام لوحة تحكم PiwPiw بفعالية",
          techSpecs: {
            title: "🔧 المواصفات التقنية للوحة التحكم",
            specs: [
              { label: "إطار العمل الأمامي", value: "React 18.2.0", icon: "⚛️" },
              { label: "مكتبة واجهة المستخدم", value: "Tailwind CSS + Radix UI", icon: "🎨" },
              { label: "أداة البناء", value: "Vite 4.4.5", icon: "⚡" },
              { label: "إدارة الحالة", value: "React Context API", icon: "🔄" },
              { label: "التصميم المتجاوب", value: "نهج الهاتف المحمول أولاً", icon: "📱" },
              { label: "دعم الثيمات", value: "الوضع الفاتح/المظلم", icon: "🌙" },
              { label: "دعم اللغات", value: "الإنجليزية/العربية (RTL)", icon: "🌍" },
              { label: "الأداء", value: "تحميل محسن", icon: "🚀" },
              { label: "دعم المتصفحات", value: "المتصفحات الحديثة", icon: "🌐" },
              { label: "الأمان", value: "HTTPS + المصادقة", icon: "🔒" }
            ]
          },
          sections: [
            {
              title: "البداية",
              icon: "🚀",
              content: "مرحباً بك في لوحة تحكم PiwPiw! هذا هو المركز الرئيسي لإدارة بوت ديسكورد الخاص بك عبر جميع السيرفرات.",
              features: [
                "إحصائيات السيرفر في الوقت الفعلي",
                "وصول سريع لجميع ميزات البوت",
                "تحليلات شاملة",
                "واجهة سهلة الاستخدام"
              ]
            },
            {
              title: "دليل التنقل",
              icon: "🧭",
              content: "تنقل عبر الأقسام المختلفة باستخدام القائمة الجانبية:",
              features: [
                "لوحة التحكم - نظرة عامة والمقاييس الرئيسية",
                "السيرفرات - إدارة سيرفرات ديسكورد",
                "الأوامر - عرض وتكوين أوامر البوت",
                "التحليلات - رؤى أداء مفصلة",
                "الإعدادات - تخصيص تفضيلاتك",
                "الملف الشخصي - إدارة معلومات حسابك"
              ]
            },
            {
              title: "الميزات الرئيسية",
              icon: "⭐",
              content: "استكشف الميزات القوية المتاحة في لوحة التحكم:",
              features: [
                "مراقبة السيرفر المباشرة",
                "تحليلات استخدام الأوامر",
                "تتبع تفاعل المستخدمين",
                "أدوات تحسين الأداء",
                "دعم متعدد اللغات",
                "إعدادات أمان متقدمة"
              ]
            },
            {
              title: "نصائح احترافية",
              icon: "💡",
              content: "استفد إلى أقصى حد من لوحة تحكم PiwPiw مع هذه النصائح:",
              features: [
                "استخدم وظيفة البحث للعثور على الأوامر بسرعة",
                "تحقق من التحليلات بانتظام للحصول على رؤى",
                "خصص تخطيط لوحة التحكم",
                "فعّل الإشعارات للأحداث المهمة",
                "استخدم اختصارات لوحة المفاتيح للتنقل السريع",
                "صدّر البيانات للتحليل الخارجي"
              ]
            }
          ]
        },
        privacy: {
          title: "🔒 الخصوصية والأمان",
          points: [
            "جميع البيانات آمنة ولا يتم مشاركتها مع أي طرف ثالث",
            "يمكنك طلب حذف بياناتك في أي وقت",
            "معالجة البيانات متوافقة مع GDPR",
            "نقل البيانات مشفر"
          ]
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-10 -right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 -right-10 w-36 h-36 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-10 -left-20 w-28 h-28 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-lg animate-pulse"></div>
              <div className="relative p-4 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                <Bot className="w-12 h-12" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {currentContent.title}
              </h1>
              <p className="text-blue-100 text-lg md:text-xl mt-2">
                {currentContent.subtitle}
              </p>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 border border-white/30">
              <Button
                onClick={() => setLanguage('en')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                English
              </Button>
              <Button
                onClick={() => setLanguage('ar')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  language === 'ar' 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                العربية
              </Button>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-green-500/20 text-green-100 border-green-400/30 px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-100 border-yellow-400/30 px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              Verified
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-100 border-purple-400/30 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Premium
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentContent.sections.stats.data.map((stat, index) => {
          const colors = [
            { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", icon: "bg-blue-500", badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" },
            { bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-200 dark:border-green-800", icon: "bg-green-500", badge: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" },
            { bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-800", icon: "bg-orange-500", badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300" },
            { bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-800", icon: "bg-purple-500", badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300" }
          ];
          const color = colors[index % colors.length];
          
          return (
            <Card key={index} className={`relative overflow-hidden ${color.bg} border-2 ${color.border} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${color.icon} rounded-xl shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={`text-xs ${color.badge} border-0`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bot Overview */}
        <Card className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-800">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-blue-900 dark:text-blue-100">{currentContent.sections.overview.title}</span>
            </CardTitle>
            <CardDescription className="text-base leading-relaxed text-blue-700 dark:text-blue-300">
              {currentContent.sections.overview.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-3">
              {currentContent.sections.overview.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Specs */}
        <Card className="bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-purple-50 dark:bg-purple-950/30 border-b border-purple-200 dark:border-purple-800">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-purple-500 rounded-lg shadow-md">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-purple-900 dark:text-purple-100">{currentContent.sections.tech.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4">
              {currentContent.sections.tech.specs.map((spec, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{spec.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{spec.label}</span>
                  </div>
                  <Badge className="font-mono bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-0">
                    {spec.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mission & Values */}
      <Card className="bg-white dark:bg-slate-900 border-2 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-200 dark:border-green-800">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="p-2 bg-green-500 rounded-lg shadow-md">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-900 dark:text-green-100">{currentContent.sections.mission.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-800/50">
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-green-800 dark:text-green-200">Mission</span>
              </h4>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{currentContent.sections.mission.mission}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200">Vision</span>
              </h4>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{currentContent.sections.mission.vision}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentContent.sections.mission.values.map((value, index) => {
              const colors = [
                { bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800", icon: "bg-blue-500", text: "text-blue-800 dark:text-blue-200" },
                { bg: "bg-purple-50 dark:bg-purple-950/20", border: "border-purple-200 dark:border-purple-800", icon: "bg-purple-500", text: "text-purple-800 dark:text-purple-200" },
                { bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-800", icon: "bg-orange-500", text: "text-orange-800 dark:text-orange-200" },
                { bg: "bg-green-50 dark:bg-green-950/20", border: "border-green-200 dark:border-green-800", icon: "bg-green-500", text: "text-green-800 dark:text-green-200" }
              ];
              const color = colors[index % colors.length];
              
              return (
                <div key={index} className={`p-4 ${color.bg} rounded-lg border ${color.border}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 ${color.icon} rounded-lg shadow-md`}>
                      <value.icon className="w-4 h-4 text-white" />
                    </div>
                    <h5 className={`font-semibold ${color.text}`}>{value.title}</h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Developer Section */}
      <Card className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-orange-50 dark:bg-orange-950/30 border-b border-orange-200 dark:border-orange-800">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="p-2 bg-orange-500 rounded-lg shadow-md">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="text-orange-900 dark:text-orange-100">{currentContent.sections.developer.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center space-x-6 p-6 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-800">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur opacity-20"></div>
              <div className="relative w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                L
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{currentContent.sections.developer.developer.name}</h4>
              <p className="text-orange-600 dark:text-orange-400 font-medium">{currentContent.sections.developer.developer.role}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{currentContent.sections.developer.developer.nickname}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{currentContent.sections.developer.developer.discord}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-semibold flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-slate-800 dark:text-slate-200">Expertise</span>
            </h5>
            <div className="flex flex-wrap gap-2">
              {currentContent.sections.developer.developer.expertise.map((skill, index) => (
                <Badge key={index} className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-0">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              {currentContent.sections.developer.contact}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Guide Section */}
      <Card className="bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-teal-50 dark:bg-teal-950/30 border-b border-teal-200 dark:border-teal-800">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="p-2 bg-teal-500 rounded-lg shadow-md">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="text-teal-900 dark:text-teal-100">{currentContent.sections.dashboard.title}</span>
          </CardTitle>
          <CardDescription className="text-base leading-relaxed text-teal-700 dark:text-teal-300">
            {currentContent.sections.dashboard.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Technical Specifications */}
          <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span>{currentContent.sections.dashboard.techSpecs.title}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentContent.sections.dashboard.techSpecs.specs.map((spec, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-base">{spec.icon}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{spec.label}</span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-0 text-xs font-mono">
                    {spec.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentContent.sections.dashboard.sections.map((section, index) => {
              const colors = [
                { bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800", icon: "bg-blue-500", text: "text-blue-800 dark:text-blue-200" },
                { bg: "bg-green-50 dark:bg-green-950/20", border: "border-green-200 dark:border-green-800", icon: "bg-green-500", text: "text-green-800 dark:text-green-200" },
                { bg: "bg-purple-50 dark:bg-purple-950/20", border: "border-purple-200 dark:border-purple-800", icon: "bg-purple-500", text: "text-purple-800 dark:text-purple-200" },
                { bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-800", icon: "bg-orange-500", text: "text-orange-800 dark:text-orange-200" }
              ];
              const color = colors[index % colors.length];
              
              return (
                <div key={index} className={`p-5 ${color.bg} rounded-xl border ${color.border} hover:shadow-md transition-all duration-300`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">{section.icon}</div>
                    <h4 className={`text-lg font-bold ${color.text}`}>{section.title}</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {section.content}
                  </p>
                  <div className="space-y-2">
                    {section.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 ${color.icon.replace('bg-', 'bg-')} rounded-full`}></div>
                        <span className="text-xs text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-800">
            <div className="flex items-center space-x-3 mb-2">
              <HelpCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h5 className="font-semibold text-teal-800 dark:text-teal-200">Need Help?</h5>
            </div>
            <p className="text-sm text-teal-700 dark:text-teal-300">
              {language === 'en' 
                ? "If you need assistance with the dashboard, check our documentation or contact our support team." 
                : "إذا كنت بحاجة إلى مساعدة مع لوحة التحكم، تحقق من وثائقنا أو اتصل بفريق الدعم."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Updates & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Updates */}
        <Card className="bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-950/30 border-b border-indigo-200 dark:border-indigo-800">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-indigo-500 rounded-lg shadow-md">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-indigo-900 dark:text-indigo-100">{currentContent.sections.updates.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {currentContent.sections.updates.updates.map((update, index) => (
              <div key={index} className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border-0">
                    {update.version}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{update.date}</span>
                </div>
                <ul className="space-y-1">
                  {update.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="text-sm flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      <span className="text-slate-700 dark:text-slate-300">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="bg-white dark:bg-slate-900 border-2 border-cyan-200 dark:border-cyan-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-cyan-50 dark:bg-cyan-950/30 border-b border-cyan-200 dark:border-cyan-800">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-cyan-500 rounded-lg shadow-md">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-cyan-900 dark:text-cyan-100">{currentContent.sections.resources.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-3">
              {currentContent.sections.resources.links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-12 p-4 bg-cyan-50 dark:bg-cyan-950/20 hover:bg-cyan-100 dark:hover:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800 text-slate-700 dark:text-slate-300"
                  onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                  disabled={link.url === '#'}
                >
                  <div className="flex items-center space-x-3">
                    <link.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <span>{link.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto text-slate-400" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Section */}
      <Card className="bg-white dark:bg-slate-900 border-2 border-red-200 dark:border-red-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-800">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="p-2 bg-red-500 rounded-lg shadow-md">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-red-900 dark:text-red-100">{currentContent.sections.privacy.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentContent.sections.privacy.points.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-800/50">
                <div className="p-1 bg-red-100 dark:bg-red-900/50 rounded-full mt-1">
                  <Shield className="w-3 h-3 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
