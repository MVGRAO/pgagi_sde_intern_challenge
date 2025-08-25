import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDarkMode } from '@/redux/slices/preferencesSlice';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme ? JSON.parse(savedTheme) : prefersDark;
    setIsDark(initialTheme);
    dispatch(setDarkMode(initialTheme));
    
    // Apply dark mode class to HTML element
    if (initialTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dispatch]);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    dispatch(setDarkMode(newTheme));
    localStorage.setItem('darkMode', JSON.stringify(newTheme));
    
    // Apply dark mode class to HTML element
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { isDark, toggleDarkMode };
}
