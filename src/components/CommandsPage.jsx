import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Terminal, Copy, ExternalLink } from 'lucide-react';
import mockData from '../data/mockData.json';

const CommandsPage = () => {
  const { t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Games', 'Economy', 'Utility', 'Add Questions', 'MiniGames', 'Detective', 'Owner/Admin'];
  
  const filteredCommands = mockData.commands.filter(command => {
    // Remove 'P' prefix from search term if it exists for better matching
    const cleanSearchTerm = searchTerm.toLowerCase().startsWith('p') ? searchTerm.slice(1) : searchTerm;
    const matchesSearch = command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.name.toLowerCase().includes(cleanSearchTerm.toLowerCase()) ||
                         command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.usage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || command.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Games': 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-600 border-pink-200',
      'Economy': 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-200',
      'Utility': 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-blue-200',
      'Add Questions': 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 border-orange-200',
      'MiniGames': 'bg-gradient-to-r from-indigo-500/10 to-purple-600/10 text-indigo-600 border-indigo-200',
      'Detective': 'bg-gradient-to-r from-gray-800/10 to-slate-600/10 text-gray-800 border-gray-300',
      'Owner/Admin': 'bg-gradient-to-r from-red-600/10 to-rose-700/10 text-red-700 border-red-300'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const getCommandIcon = (commandName) => {
    const icons = {
      'help': '❓',
      'ahla': '✨',
      'debate': '💬',
      't9darTdir': '💪',
      'mowazi': '⚖️',
      'neverhaveiever': '🤔',
      'top': '🏆',
      'categorytop': '📊',
      'profile': '👤',
      'buy': '🛒',
      'report': '🚨',
      'feedback': '💭',
      'truth': '🎯',
      'dare': '⚡',
      'wouldyou': '🤷',
      'points': '💰',
      'shop': '🏪',
      // Add Questions commands
      'addtruth': '📝',
      'adddare': '✏️',
      'adddebate': '💭',
      'addt9darTdir': '📋',
      'addahla': '⭐',
      'addmowazi': '📝',
      'addneverhaveiever': '📄',
      // MiniGames commands
      'minigames': '🎮',
      'rps': '✂️',
      'guess': '🎯',
      'quick': '⚡',
      'trivia': '🧠',
      'truefalse': '✅',
      'emojisecret': '🔮',
      'colormemory': '🌈',
      'fastclick': '⚡',
      // Detective commands
      'detective': '🕵️',
      'detective_start': '🔍',
      'detective_join': '👥',
      'detective_status': '📊',
      'detective_investigate': '🔎',
      'detective_interview': '💬',
      'detective_accuse': '⚖️',
      'detective_solve': '✅',
      'detective_quit': '❌',
      // Owner/Admin commands
      'addowner': '👑',
      'removeowner': '🚫',
      'addadmin': '⭐',
      'removeadmin': '❌',
      'addroleadmin': '🛡️',
      'removeroleadmin': '🗑️',
      'setavatar': '🖼️',
      'setbanner': '🎨',
      'searchpending': '🔍',
      'giftp': '💰',
      'gifp': '💸',
      'addcustom': '➕',
      'delcustom': '🗑️',
      'listcustom': '📋',
      'review': '👀',
      'accept': '✅',
      'reject': '❌',
      'addshopitem': '🛍️',
      'removeshopitem': '🗑️',
      'updateshopitem': '✏️',
      'listfeedback': '📝',
      'fixlevels': '🔧',
      'fixtitles': '⚙️',
      'debuglevel': '🐛'
    };
    return icons[commandName] || '⚡';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold piwpiw-text-gradient">
            {t('commands.title')}
          </h2>
          <p className="text-muted-foreground">
            Explore all available PiwPiw bot commands
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search commands... (try: pahla, pdebate, ptop)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${selectedCategory === category ? 'piwpiw-button' : 'hover:scale-105'}`}
              >
                {category === 'all' ? '🔍 All' : 
                 category === 'Games' ? '🎮 Games' :
                 category === 'Economy' ? '💰 Economy' : 
                 category === 'Utility' ? '🛠️ Utility' : 
                 category === 'Add Questions' ? '📝 Add Questions' : 
                 category === 'MiniGames' ? '🎯 MiniGames' : 
                 category === 'Detective' ? '🕵️ Detective' : '👑 Owner/Admin'}
                {category !== 'all' && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {mockData.commands.filter(c => c.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick access to new commands */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-4 border-l-4 border-primary">
          <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
            <span>✨</span>
            <span>New Commands</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-3">Recently added commands to enhance your server experience</p>
          
          {/* Game Commands */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-pink-600 mb-2 flex items-center space-x-1">
              <span>🎮</span>
              <span>New Game Commands</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {['ahla', 'debate', 't9darTdir', 'mowazi', 'neverhaveiever'].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(cmd)}
                  className="text-xs hover:bg-pink-100 hover:text-pink-700 transition-colors duration-200 border-pink-200"
                >
                  p{cmd}
                </Button>
              ))}
            </div>
          </div>

          {/* Utility Commands */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-blue-600 mb-2 flex items-center space-x-1">
              <span>🛠️</span>
              <span>New Utility Commands</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {['top', 'categorytop', 'profile', 'report', 'feedback'].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(cmd)}
                  className="text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 border-blue-200"
                >
                  p{cmd}
                </Button>
              ))}
            </div>
          </div>

          {/* Economy Commands */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center space-x-1">
              <span>💰</span>
              <span>New Economy Commands</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {['buy'].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(cmd)}
                  className="text-xs hover:bg-green-100 hover:text-green-700 transition-colors duration-200 border-green-200"
                >
                  p{cmd}
                </Button>
              ))}
            </div>
          </div>

          {/* Add Questions Commands */}
          <div>
            <h4 className="text-sm font-medium text-orange-600 mb-2 flex items-center space-x-1">
              <span>📝</span>
              <span>New Add Questions Commands</span>
            </h4>
            <p className="text-xs text-muted-foreground mb-2">Help expand the bot's question database by adding your own!</p>
            <div className="flex flex-wrap gap-2">
              {['addtruth', 'adddare', 'adddebate', 'addt9darTdir', 'addahla', 'addmowazi', 'addneverhaveiever'].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(cmd)}
                  className="text-xs hover:bg-orange-100 hover:text-orange-700 transition-colors duration-200 border-orange-200"
                >
                  p{cmd}
                </Button>
              ))}
            </div>
          </div>

          {/* MiniGames Commands */}
          <div>
            <h4 className="text-sm font-medium text-indigo-600 mb-2 flex items-center space-x-1">
              <span>🎯</span>
              <span>New MiniGames Commands</span>
            </h4>
            <p className="text-xs text-muted-foreground mb-2">Interactive mini-games for you and your friends to enjoy!</p>
            <div className="flex flex-wrap gap-2">
              {['minigames', 'rps', 'guess', 'quick', 'trivia', 'truefalse', 'emojisecret', 'colormemory', 'fastclick'].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(cmd)}
                  className="text-xs hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 border-indigo-200"
                >
                  p{cmd}
                </Button>
              ))}
            </div>
          </div>

          {/* Detective Commands */}
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center space-x-1">
              <span>🕵️</span>
              <span>New Detective Commands</span>
            </h4>
            <p className="text-xs text-muted-foreground mb-2">Solve mysteries and become the ultimate detective!</p>
            <div className="flex flex-wrap gap-2">
              {['detective', 'detective_start', 'detective_join', 'detective_status', 'detective_investigate', 'detective_interview', 'detective_accuse', 'detective_solve', 'detective_quit'].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(cmd)}
                  className="text-xs hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200 border-gray-300"
                >
                  p{cmd.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Owner/Admin Commands */}
          <div>
            <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center space-x-1">
              <span>👑</span>
              <span>New Owner/Admin Commands</span>
            </h4>
            <p className="text-xs text-muted-foreground mb-2">Powerful administrative tools for bot owners and admins!</p>
            <div className="flex flex-wrap gap-2">
              {['addowner', 'removeowner', 'addadmin', 'removeadmin', 'addroleadmin', 'removeroleadmin', 'setavatar', 'setbanner', 'searchpending', 'giftp', 'gifp', 'addcustom', 'delcustom', 'listcustom', 'review', 'accept', 'reject', 'addshopitem', 'removeshopitem', 'updateshopitem', 'listfeedback', 'fixlevels', 'fixtitles', 'debuglevel'].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(cmd)}
                  className="text-xs hover:bg-red-100 hover:text-red-800 transition-colors duration-200 border-red-300"
                >
                  p{cmd}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Commands grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommands.map((command, index) => (
          <Card key={index} className="piwpiw-card-hover group transition-all duration-300 hover:shadow-xl hover:scale-105 border-l-4 hover:border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {getCommandIcon(command.name)}
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-1">
                      <Terminal className="h-4 w-4 text-primary" />
                      <span className="font-mono">P{command.name}</span>
                    </CardTitle>
                  </div>
                </div>
                <Badge className={`${getCategoryColor(command.category)} font-medium px-3 py-1`}>
                  {command.category}
                </Badge>
              </div>
              <CardDescription className="text-sm leading-relaxed mt-2">
                {command.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Usage */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground flex items-center space-x-1">
                  <span>💻</span>
                  <span>Usage:</span>
                </p>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border group-hover:bg-gradient-to-r group-hover:from-primary/5 group-hover:to-primary/10 transition-colors duration-300">
                  <code className="text-sm font-mono text-foreground">{command.usage}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(command.usage)}
                    className="hover:bg-primary/20 transition-colors duration-200"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground flex items-center space-x-1">
                  <span>📝</span>
                  <span>Examples:</span>
                </p>
                <div className="space-y-2">
                  {command.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors duration-200">
                      <code className="text-xs font-mono text-muted-foreground">{example}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(example)}
                        className="hover:bg-primary/20 transition-colors duration-200"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage count with progress bar */}
              <div className="pt-3 border-t space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center space-x-1">
                    <span>📈</span>
                    <span>Usage count:</span>
                  </span>
                  <Badge variant="outline" className="font-mono">{command.usageCount.toLocaleString()}</Badge>
                </div>
                {/* Usage popularity bar */}
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((command.usageCount / Math.max(...mockData.commands.map(c => c.usageCount))) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredCommands.length === 0 && (
        <div className="text-center py-12">
          <Terminal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No commands found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Enhanced Command statistics */}
      <Card className="piwpiw-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>Command Statistics</span>
          </CardTitle>
          <CardDescription>
            Overview of command usage and categories across all servers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-2xl font-bold text-primary">{mockData.commands.length}</p>
              <p className="text-sm text-muted-foreground">Total Commands</p>
            </div>
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-pink-500/5 to-purple-500/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">🎮</div>
              <p className="text-2xl font-bold text-pink-600">
                {mockData.commands.filter(c => c.category === 'Games').length}
              </p>
              <p className="text-sm text-muted-foreground">Game Commands</p>
            </div>
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">🛠️</div>
              <p className="text-2xl font-bold text-blue-600">
                {mockData.commands.filter(c => c.category === 'Utility').length}
              </p>
              <p className="text-sm text-muted-foreground">Utility Commands</p>
            </div>
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-green-500/5 to-emerald-500/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-2xl font-bold text-green-600">
                {mockData.commands.filter(c => c.category === 'Economy').length}
              </p>
              <p className="text-sm text-muted-foreground">Economy Commands</p>
            </div>
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-orange-500/5 to-amber-500/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-2xl font-bold text-orange-600">
                {mockData.commands.filter(c => c.category === 'Add Questions').length}
              </p>
              <p className="text-sm text-muted-foreground">Add Questions</p>
            </div>
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-indigo-500/5 to-purple-600/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-2xl font-bold text-indigo-600">
                {mockData.commands.filter(c => c.category === 'MiniGames').length}
              </p>
              <p className="text-sm text-muted-foreground">MiniGames</p>
            </div>
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-gray-800/5 to-slate-600/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">🕵️</div>
              <p className="text-2xl font-bold text-gray-800">
                {mockData.commands.filter(c => c.category === 'Detective').length}
              </p>
              <p className="text-sm text-muted-foreground">Detective</p>
            </div>
            <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-red-600/5 to-rose-700/10 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">👑</div>
              <p className="text-2xl font-bold text-red-700">
                {mockData.commands.filter(c => c.category === 'Owner/Admin').length}
              </p>
              <p className="text-sm text-muted-foreground">Owner/Admin</p>
            </div>
          </div>
          
          {/* Usage Statistics */}
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-yellow-500/5 to-orange-500/10">
                <div className="text-3xl mb-2">🚀</div>
                <p className="text-2xl font-bold text-orange-600">
                  {mockData.commands.reduce((sum, c) => sum + c.usageCount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Command Usage</p>
              </div>
              <div className="text-center p-4 border rounded-xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10">
                <div className="text-3xl mb-2">📈</div>
                <p className="text-2xl font-bold text-indigo-600">
                  {Math.round(mockData.commands.reduce((sum, c) => sum + c.usageCount, 0) / mockData.commands.length).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Average Usage per Command</p>
              </div>
            </div>
          </div>

          {/* Top Commands Preview */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span>🏆</span>
              <span>Most Popular Commands</span>
            </h4>
            <div className="space-y-2">
              {mockData.commands
                .sort((a, b) => b.usageCount - a.usageCount)
                .slice(0, 5)
                .map((command, index) => (
                  <div key={command.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-xl">{getCommandIcon(command.name)}</span>
                      <span className="font-mono font-medium">P{command.name}</span>
                      <Badge className={getCategoryColor(command.category)} variant="outline">
                        {command.category}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {command.usageCount.toLocaleString()}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommandsPage;

