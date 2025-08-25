"use client";
import { useEffect, useState } from 'react';
import { useGetTrendingMoviesQuery } from '@/redux/services/moviesApi';
import { useGetTrendingHashtagsQuery } from '@/redux/services/socialApi';
import { motion } from 'framer-motion';
import ContentCard from '@/components/feed/ContentCard';

interface TrendingItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  category: string;
  source: string;
  publishedAt: string;
  type: 'news' | 'movie' | 'social';
  trend: 'up' | 'down' | 'stable';
  count?: number;
}

export default function TrendingPage() {
  const [trendingContent, setTrendingContent] = useState<TrendingItem[]>([]);
  
  const { data: moviesData, isLoading: moviesLoading } = useGetTrendingMoviesQuery();
  const { data: hashtagsData, isLoading: hashtagsLoading } = useGetTrendingHashtagsQuery();

  useEffect(() => {
    const combined: TrendingItem[] = [];
    
    if (moviesData?.results) {
      const movieItems = moviesData.results.slice(0, 6).map((movie: any) => ({
        id: `movie-${movie.id}`,
        title: movie.title,
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        category: 'entertainment',
        source: 'TMDB',
        publishedAt: movie.release_date,
        type: 'movie' as const,
        trend: 'up' as const
      }));
      combined.push(...movieItems);
    }
    
    if (hashtagsData?.hashtags) {
      const hashtagItems = hashtagsData.hashtags.slice(0, 6).map((hashtag: any) => ({
        id: `hashtag-${hashtag.tag}`,
        title: `#${hashtag.tag}`,
        description: `${hashtag.count.toLocaleString()} mentions in the last 24 hours`,
        image: `https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=%23${hashtag.tag}`,
        url: `#trending-${hashtag.tag}`,
        category: 'social',
        source: 'Social Media',
        publishedAt: new Date().toISOString(),
        type: 'social' as const,
        trend: hashtag.trend,
        count: hashtag.count
      }));
      combined.push(...hashtagItems);
    }
    
    setTrendingContent(combined);
  }, [moviesData, hashtagsData]);

  const isLoading = moviesLoading || hashtagsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🔥 Trending Now
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover what's hot right now across movies, social media, and more.
        </p>
      </div>

      {/* Trending Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-2">🎬 Movies</h3>
          <p className="text-blue-100">Top trending films this week</p>
        </motion.div>
        
        <motion.div
          className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-2">💬 Social</h3>
          <p className="text-green-100">Viral hashtags and posts</p>
        </motion.div>
        
        <motion.div
          className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-2">📰 News</h3>
          <p className="text-orange-100">Breaking stories and updates</p>
        </motion.div>
      </div>

      {/* Trending Content */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trending Content
        </h2>
        
        {trendingContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ContentCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  url={item.url}
                  category={item.category}
                  source={item.source}
                  publishedAt={item.publishedAt}
                  type={item.type}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No trending content available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
