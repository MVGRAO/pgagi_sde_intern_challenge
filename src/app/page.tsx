"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/slices/userSlice';
import FeedList from '@/components/feed/FeedList';

export default function HomePage() {
  const dispatch = useDispatch();

  // Mock user login for demonstration
  useEffect(() => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=JD',
      preferences: {
        favoriteCategories: ['technology', 'business', 'entertainment'],
        notificationSettings: {
          email: true,
          push: false,
        },
      },
    };
    
    dispatch(loginSuccess(mockUser));
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Personalized Content Feed
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover the latest news, trending movies, and social media posts tailored to your interests.
        </p>
      </div>
      
      <FeedList />
    </div>
  );
}
