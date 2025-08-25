"use client";
import { motion, Reorder } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { reorderContent } from '@/redux/slices/feedSlice';
import ContentCard from './ContentCard';
import { ContentItem } from '@/types/ContentItem';

interface DragDropWrapperProps {
  items: ContentItem[];
  onReorder?: (items: ContentItem[]) => void;
}

export default function DragDropWrapper({ items, onReorder }: DragDropWrapperProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.feed.favorites);

  const handleReorder = (newOrder: ContentItem[]) => {
    // Find the indices of the reordered items
    const fromIndex = items.findIndex(item => item.id === newOrder[0].id);
    const toIndex = 0;
    
    if (fromIndex !== toIndex) {
      dispatch(reorderContent({ fromIndex, toIndex }));
    }
    
    if (onReorder) {
      onReorder(newOrder);
    }
  };

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={handleReorder}
      className="space-y-4"
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          whileDrag={{ scale: 1.02, zIndex: 10 }}
          whileHover={{ scale: 1.01 }}
          className="cursor-grab active:cursor-grabbing"
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
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
              isFavorite={favorites.includes(item.id)}
            />
          </motion.div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}


