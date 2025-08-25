"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navigationItems = [
  { href: '/', label: 'Feed', icon: '📰' },
  { href: '/trending', label: 'Trending', icon: '🔥' },
  { href: '/favorites', label: 'Favorites', icon: '❤️' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 p-6 bg-gray-50 dark:bg-gray-900 h-screen border-r border-gray-200 dark:border-gray-700">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Navigation</h2>
      </div>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="w-1 h-6 bg-blue-500 rounded-full ml-auto"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Quick Stats
          </h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Articles Read:</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span>Favorites:</span>
              <span className="font-medium">12</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
