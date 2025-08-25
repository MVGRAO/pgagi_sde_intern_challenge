"use client";
import { motion } from 'framer-motion';
import useDarkMode from '@/hooks/userDarkMode';

export default function ThemeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <span className="text-xs">☀️</span>
        <span className="text-xs">🌙</span>
      </div>
    </motion.button>
  );
}
