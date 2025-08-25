import { NextResponse } from 'next/server';

const trendingHashtags = [
  { tag: 'AI', count: 15420, trend: 'up' },
  { tag: 'NextJS', count: 8920, trend: 'up' },
  { tag: 'TypeScript', count: 7650, trend: 'up' },
  { tag: 'React', count: 12340, trend: 'stable' },
  { tag: 'Redux', count: 5430, trend: 'up' },
  { tag: 'Testing', count: 4320, trend: 'up' },
  { tag: 'DarkMode', count: 6780, trend: 'stable' },
  { tag: 'WebDev', count: 9870, trend: 'up' },
  { tag: 'Dashboard', count: 3450, trend: 'up' },
  { tag: 'StateManagement', count: 2340, trend: 'up' }
];

export async function GET() {
  return NextResponse.json({ hashtags: trendingHashtags });
}


