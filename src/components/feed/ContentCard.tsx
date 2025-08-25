"use client";
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/slices/feedSlice';
import { motion } from 'framer-motion';
import { ContentItem } from '@/types/ContentItem';

interface Props extends Omit<ContentItem, 'id'> {
  id: string;
  isFavorite?: boolean;
}

export default function ContentCard({ 
  id, 
  title, 
  description, 
  image, 
  url, 
  category, 
  source, 
  publishedAt, 
  type,
  isFavorite = false 
}: Props) {
  const dispatch = useDispatch();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  const handleReadMore = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'news': return '📰';
      case 'movie': return '🎬';
      case 'social': return '💬';
      case 'music': return '🎵';
      case 'video': return '📺';
      case 'crypto': return '₿';
      case 'tech': return '💻';
      default: return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {getTypeIcon()} {category}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {title}
          </h3>
          <motion.button
            onClick={handleFavoriteToggle}
            className={`ml-2 p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-400 hover:text-red-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </motion.button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>{source}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        
        <div className="flex space-x-2">
          {url && (
            <motion.button
              onClick={handleReadMore}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {type === 'movie' ? 'Watch Now' : 
               type === 'social' ? 'View Post' : 
               type === 'music' ? 'Listen Now' : 
               type === 'video' ? 'Watch Video' : 
               type === 'crypto' ? 'View Details' : 
               type === 'tech' ? 'Read More' : 
               'Read More'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
