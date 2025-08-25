"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { 
  setCategories, 
  addCategory, 
  removeCategory, 
  setLanguage, 
  setAutoRefresh, 
  setRefreshInterval 
} from "@/redux/slices/preferencesSlice";
import { motion } from 'framer-motion';

const availableCategories = [
  'technology', 'business', 'entertainment', 'sports', 'health', 
  'science', 'politics', 'world', 'environment', 'education',
  'music', 'gaming', 'crypto', 'youtube', 'reddit'
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' }
];

const refreshIntervals = [
  { value: 60000, label: '1 minute' },
  { value: 300000, label: '5 minutes' },
  { value: 600000, label: '10 minutes' },
  { value: 1800000, label: '30 minutes' },
  { value: 3600000, label: '1 hour' }
];

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { 
    categories, 
    language, 
    autoRefresh, 
    refreshInterval 
  } = useSelector((state: RootState) => state.preferences);

  const handleCategoryToggle = (category: string) => {
    if (categories.includes(category)) {
      dispatch(removeCategory(category));
    } else {
      dispatch(addCategory(category));
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(event.target.value));
  };

  const handleAutoRefreshToggle = () => {
    dispatch(setAutoRefresh(!autoRefresh));
  };

  const handleRefreshIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRefreshInterval(parseInt(event.target.value)));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ⚙️ Settings & Preferences
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your dashboard experience and content preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Content Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📰 Content Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select the types of content you want to see in your feed. You can choose multiple categories.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {availableCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  categories.includes(category)
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="capitalize">{category}</span>
              </motion.button>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Selected: {categories.length} categories
          </p>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🌍 Language & Localization
          </h2>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Language
            </label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Auto-Refresh Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔄 Auto-Refresh Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Enable Auto-Refresh
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically refresh content at regular intervals
                </p>
              </div>
              <motion.button
                onClick={handleAutoRefreshToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoRefresh ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </motion.button>
            </div>

            {autoRefresh && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-xs"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Refresh Interval
                </label>
                <select
                  value={refreshInterval}
                  onChange={handleRefreshIntervalChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  {refreshIntervals.map((interval) => (
                    <option key={interval.value} value={interval.value}>
                      {interval.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Export/Import Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📤 Export & Import
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Export your preferences or import them from another device.
          </p>
          
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => {
                const dataStr = JSON.stringify({ categories, language, autoRefresh, refreshInterval }, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'dashboard-preferences.json';
                link.click();
              }}
            >
              Export Preferences
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      try {
                        const data = JSON.parse(e.target?.result as string);
                        if (data.categories) dispatch(setCategories(data.categories));
                        if (data.language) dispatch(setLanguage(data.language));
                        if (data.autoRefresh !== undefined) dispatch(setAutoRefresh(data.autoRefresh));
                        if (data.refreshInterval) dispatch(setRefreshInterval(data.refreshInterval));
                        alert('Preferences imported successfully!');
                      } catch (error) {
                        alert('Invalid preferences file.');
                      }
                    };
                    reader.readAsText(file);
                  }
                };
                input.click();
              }}
            >
              Import Preferences
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
