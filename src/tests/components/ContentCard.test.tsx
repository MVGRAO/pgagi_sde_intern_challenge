import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentCard from '@/components/feed/ContentCard';
import feedReducer from '@/redux/slices/feedSlice';

// Create a mock store for testing
const createTestStore = () => {
  return configureStore({
    reducer: {
      feed: feedReducer,
    },
  });
};

describe('ContentCard', () => {
  const mockProps = {
    id: 'test-id',
    title: 'Test Article Title',
    description: 'This is a test article description that should be displayed in the card.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/article',
    category: 'technology',
    source: 'Test Source',
    publishedAt: '2024-01-15T10:30:00Z',
    type: 'news' as const,
    isFavorite: false,
  };

  it('renders content card with all information', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContentCard {...mockProps} />
      </Provider>
    );

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test article description that should be displayed in the card.')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('technology')).toBeInTheDocument();
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('displays favorite button with correct state', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContentCard {...mockProps} isFavorite={true} />
      </Provider>
    );

    const favoriteButton = screen.getByLabelText('Remove from favorites');
    expect(favoriteButton).toBeInTheDocument();
  });

  it('displays correct button text based on content type', () => {
    const store = createTestStore();
    
    const { rerender } = render(
      <Provider store={store}>
        <ContentCard {...mockProps} type="movie" />
      </Provider>
    );

    expect(screen.getByText('Watch Now')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <ContentCard {...mockProps} type="social" />
      </Provider>
    );

    expect(screen.getByText('View Post')).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContentCard {...mockProps} image={undefined} />
      </Provider>
    );

    // Should still render without crashing
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContentCard {...mockProps} />
      </Provider>
    );

    // Check if date is formatted (should contain month abbreviation)
    const dateElement = screen.getByText(/Jan 15/);
    expect(dateElement).toBeInTheDocument();
  });
});


