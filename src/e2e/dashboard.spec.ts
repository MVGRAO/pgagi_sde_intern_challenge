import { test, expect } from '@playwright/test';

test.describe('Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main dashboard page', async ({ page }) => {
    // Check if the main title is displayed
    await expect(page.getByRole('heading', { name: 'Personalized Content Feed' })).toBeVisible();
    
    // Check if navigation sidebar is present
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Check if header with search is present
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('should navigate between different pages', async ({ page }) => {
    // Navigate to Trending page
    await page.getByRole('link', { name: '🔥 Trending' }).click();
    await expect(page.getByRole('heading', { name: '🔥 Trending Now' })).toBeVisible();
    
    // Navigate to Favorites page
    await page.getByRole('link', { name: '❤️ Favorites' }).click();
    await expect(page.getByRole('heading', { name: '❤️ My Favorites' })).toBeVisible();
    
    // Navigate to Settings page
    await page.getByRole('link', { name: '⚙️ Settings' }).click();
    await expect(page.getByRole('heading', { name: '⚙️ Settings & Preferences' })).toBeVisible();
    
    // Navigate back to Feed
    await page.getByRole('link', { name: '📰 Feed' }).click();
    await expect(page.getByRole('heading', { name: 'Personalized Content Feed' })).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    // Find the theme toggle button
    const themeToggle = page.locator('[aria-label="Toggle dark mode"]');
    await expect(themeToggle).toBeVisible();
    
    // Click the theme toggle
    await themeToggle.click();
    
    // Check if dark mode classes are applied
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Toggle back to light mode
    await themeToggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('should search for content', async ({ page }) => {
    // Find the search input
    const searchInput = page.getByPlaceholder('Search content...');
    await expect(searchInput).toBeVisible();
    
    // Type in search query
    await searchInput.fill('technology');
    await searchInput.press('Enter');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Check if search results are displayed
    await expect(page.getByText('Showing')).toBeVisible();
  });

  test('should add content to favorites', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Find the first favorite button
    const favoriteButton = page.locator('[aria-label="Add to favorites"]').first();
    
    if (await favoriteButton.isVisible()) {
      // Click to add to favorites
      await favoriteButton.click();
      
      // Check if the button state changed
      await expect(page.locator('[aria-label="Remove from favorites"]').first()).toBeVisible();
    }
  });

  test('should access settings and modify preferences', async ({ page }) => {
    // Navigate to Settings
    await page.getByRole('link', { name: '⚙️ Settings' }).click();
    
    // Check if category selection is available
    await expect(page.getByText('Content Categories')).toBeVisible();
    
    // Select a category
    const technologyButton = page.getByRole('button', { name: 'technology' });
    await technologyButton.click();
    
    // Check if category is selected
    await expect(technologyButton).toHaveClass(/bg-blue-100/);
    
    // Check language selection
    const languageSelect = page.getByRole('combobox', { name: 'Preferred Language' });
    await expect(languageSelect).toBeVisible();
    
    // Change language
    await languageSelect.selectOption('es');
    await expect(languageSelect).toHaveValue('es');
  });

  test('should handle responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if content is still accessible
    await expect(page.getByRole('heading', { name: 'Personalized Content Feed' })).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'Personalized Content Feed' })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: 'Personalized Content Feed' })).toBeVisible();
  });
});


