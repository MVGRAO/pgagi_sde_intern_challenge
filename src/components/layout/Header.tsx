"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBar from '../ui/SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <header className="flex items-center justify-between p-4 shadow bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        {user && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Welcome, {user.name}!
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <SearchBar />
        <ThemeToggle />
        
        {user ? (
          <div className="flex items-center space-x-2">
            {user.avatar && (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.name}
            </span>
          </div>
        ) : (
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
