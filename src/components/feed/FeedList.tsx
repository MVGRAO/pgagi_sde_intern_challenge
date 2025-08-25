"use client";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSearchQuery, setLoading, setError, addContent, setCurrentPage, setHasMore } from '@/redux/slices/feedSlice';
import { useGetNewsByCategoryQuery } from '@/redux/services/newsApi';
import { useGetTrendingMoviesQuery } from '@/redux/services/moviesApi';
import { useGetSocialPostsQuery } from '@/redux/services/socialApi';
import { useGetNewReleasesQuery } from '@/redux/services/spotifyApi';
import { useGetTrendingVideosQuery } from '@/redux/services/youtubeApi';
import { useGetHotPostsQuery } from '@/redux/services/redditApi';
import { useGetTopCoinsQuery } from '@/redux/services/cryptoApi';
import { useGetTopStoriesQuery, useGetStoryItemQuery } from '@/redux/services/hackerNewsApi';
import DragDropWrapper from './DragDropWrapper';
import Spinner from '../ui/Spinner';
import useDebounce from '@/hooks/userDebounce';
import { ContentItem } from '@/types/ContentItem';

export default function FeedList() {
  const dispatch = useDispatch();
  const { searchQuery, currentPage, hasMore, isLoading: feedLoading } = useSelector((state: RootState) => state.feed);
  const { categories } = useSelector((state: RootState) => state.preferences);
  
  const [searchInput, setSearchInput] = useState('');
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  
  const debouncedSearch = useDebounce(searchInput, 500);
  
  // Fetch data from different APIs
  const { data: newsData, isLoading: newsLoading, error: newsError } = useGetNewsByCategoryQuery(categories[0] || 'technology');
  
  useEffect(() => {
    console.log('Fetched news data:', newsData);
    console.log('News loading:', newsLoading);
    console.log('News error:', newsError);
  }, [newsData, newsLoading, newsError]);

  useEffect(() => {
    console.log('Fetched news data:', newsData);
  }, [newsData]);
  const { data: moviesData, isLoading: moviesLoading, error: moviesError } = useGetTrendingMoviesQuery();
  const { data: socialData, isLoading: socialLoading, error: socialError } = useGetSocialPostsQuery('tech');
  const { data: musicData, isLoading: musicLoading, error: musicError } = useGetNewReleasesQuery();
  const { data: videoData, isLoading: videoLoading, error: videoError } = useGetTrendingVideosQuery();
  const { data: redditData, isLoading: redditLoading, error: redditError } = useGetHotPostsQuery('popular');
  const { data: cryptoData, isLoading: cryptoLoading, error: cryptoError } = useGetTopCoinsQuery();
  const { data: hackerNewsData, isLoading: hackerNewsLoading, error: hackerNewsError } = useGetTopStoriesQuery();

  // Debug logging for API responses
  useEffect(() => {
    console.log('API Responses:', {
      newsData,
      moviesData,
      socialData,
      musicData,
      videoData,
      redditData,
      cryptoData,
      hackerNewsData
    });
  }, [newsData, moviesData, socialData, musicData, videoData, redditData, cryptoData, hackerNewsData]);

  // Debug logging for API errors
  useEffect(() => {
    const errors = {
      newsError,
      moviesError,
      socialError,
      musicError,
      videoError,
      redditError,
      cryptoError,
      hackerNewsError
    };
    
    // Filter out undefined and empty error objects
    const validErrors = Object.fromEntries(
      Object.entries(errors).filter(([key, error]) => 
        error !== undefined && error !== null && Object.keys(error).length > 0
      )
    );
    
    if (Object.keys(validErrors).length > 0) {
      console.error('API Errors:', validErrors);
      
      // Dispatch error to Redux store for better error handling
      const errorMessages = Object.entries(validErrors)
        .map(([api, error]) => `${api}: ${JSON.stringify(error)}`)
        .join(', ');
      
      dispatch(setError(`API errors detected: ${errorMessages}`));
    } else {
      dispatch(setError(null));
    }
  }, [newsError, moviesError, socialError, musicError, videoError, redditError, cryptoError, hackerNewsError, dispatch]);

  // Combine and transform data from different sources
  useEffect(() => {
    const combinedContent: ContentItem[] = [];
    
    if (newsData?.results) {
      const newsItems = newsData.results.slice(0, 5).map((article) => ({
        id: article.link || `news-${Date.now()}-${Math.random()}`,
        title: article.title,
        description: article.description,
        image: article.image_url,
        url: article.link,
        category: 'general',
        source: article.source_id || 'Unknown',
        publishedAt: article.pubDate,
        type: 'news' as const,
      }));
      combinedContent.push(...newsItems);
    }    
    
    if (moviesData?.results) {
      const movieItems = moviesData.results.slice(0, 3).map((movie: { id: number; title: string; overview: string; poster_path?: string; release_date: string }) => ({
        id: `movie-${movie.id}`,
        title: movie.title,
        description: movie.overview,
        image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        category: 'entertainment',
        source: 'TMDB',
        publishedAt: movie.release_date,
        type: 'movie' as const
      }));
      combinedContent.push(...movieItems);
    }
    
    if (socialData?.posts) {
      const socialItems = socialData.posts.slice(0, 3).map((post: { id: string; author: string; content: string; avatar?: string; hashtags: string[]; timestamp: string }) => ({
        id: post.id,
        title: post.author,
        description: post.content,
        image: post.avatar,
        url: `#post-${post.id}`,
        category: post.hashtags[0] || 'social',
        source: post.author,
        publishedAt: post.timestamp,
        type: 'social' as const
      }));
      combinedContent.push(...socialItems);
    }

    if (musicData?.results) {
      const musicItems = musicData.results.slice(0, 3).map((album: { collectionId: number; collectionName: string; artistName: string; artworkUrl100: string; collectionViewUrl: string; releaseDate: string }) => ({
        id: `music-${album.collectionId}`,
        title: album.collectionName,
        description: `Album by ${album.artistName}`,
        image: album.artworkUrl100,
        url: album.collectionViewUrl,
        category: 'music',
        source: 'iTunes',
        publishedAt: album.releaseDate,
        type: 'music' as const
      }));
      combinedContent.push(...musicItems);
    }

    if (videoData?.items) {
      const videoItems = videoData.items.slice(0, 3).map((video: { id: string; snippet?: { title: string; description: string; thumbnails?: { medium?: { url: string } }; publishedAt: string } }) => ({
        id: `video-${video.id}`,
        title: video.snippet?.title || 'Untitled Video',
        description: video.snippet?.description || 'No description available',
        image: video.snippet?.thumbnails?.medium?.url,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        category: 'video',
        source: 'YouTube',
        publishedAt: video.snippet?.publishedAt || new Date().toISOString(),
        type: 'video' as const
      }));
      combinedContent.push(...videoItems);
    }

    if (redditData?.data?.children) {
      const redditItems = redditData.data.children.slice(0, 3).map((post: { data: { id: string; title: string; selftext: string; thumbnail: string; permalink: string; subreddit: string; created_utc: number } }) => ({
        id: `reddit-${post.data.id}`,
        title: post.data.title,
        description: post.data.selftext || 'Reddit post',
        image: post.data.thumbnail !== 'self' ? post.data.thumbnail : undefined,
        url: `https://reddit.com${post.data.permalink}`,
        category: 'social',
        source: `r/${post.data.subreddit}`,
        publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
        type: 'social' as const
      }));
      combinedContent.push(...redditItems);
    }

    if (cryptoData) {
      const cryptoItems = cryptoData.slice(0, 3).map((coin: { id: string; name: string; symbol?: string; current_price?: number; price_change_percentage_24h?: number; image?: string }) => ({
        id: `crypto-${coin.id}`,
        title: `${coin.name} (${coin.symbol?.toUpperCase() || 'N/A'})`,
        description: `Current price: $${coin.current_price?.toFixed(2) || 'N/A'} | 24h change: ${coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%`,
        image: coin.image,
        url: `https://coingecko.com/en/coins/${coin.id}`,
        category: 'crypto',
        source: 'CoinGecko',
        publishedAt: new Date().toISOString(),
        type: 'crypto' as const
      }));
      combinedContent.push(...cryptoItems);
    }
    
    setAllContent(combinedContent);
    setFilteredContent(combinedContent);
  }, [newsData, moviesData, socialData, musicData, videoData, redditData, cryptoData]);

  // Handle search
  useEffect(() => {
    if (debouncedSearch) {
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setFilteredContent(filtered);
      dispatch(setSearchQuery(debouncedSearch));
    } else {
      setFilteredContent(allContent);
      dispatch(setSearchQuery(''));
    }
  }, [debouncedSearch, allContent, dispatch]);

  // Handle infinite scroll
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (hasMore && !feedLoading) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, feedLoading, currentPage, dispatch]);

  const isLoading = newsLoading || moviesLoading || socialLoading || musicLoading || 
                    videoLoading || redditLoading || cryptoLoading || hackerNewsLoading || feedLoading;
  const hasError = newsError || moviesError || socialError || musicError || 
                   videoError || redditError || cryptoError || hackerNewsError;

  if (hasError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load content. Please try again later.</p>
      </div>
    );
  }

  if (isLoading && allContent.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search content..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Content Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredContent.length} items
        {searchInput && ` for "${searchInput}"`}
      </div>

      {/* Content Grid */}
      {filteredContent.length > 0 ? (
        <DragDropWrapper items={filteredContent} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {searchInput ? 'No content found for your search.' : 'No content available.'}
          </p>
        </div>
      )}

      {/* Loading indicator for infinite scroll */}
      {isLoading && allContent.length > 0 && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}
