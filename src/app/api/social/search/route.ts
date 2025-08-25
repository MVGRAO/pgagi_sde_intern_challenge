import { NextResponse } from 'next/server';

const allPosts = [
  {
    id: '1',
    content: 'Just launched our new AI-powered dashboard! 🚀 #AI #Dashboard #Tech',
    author: 'TechCorp',
    avatar: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=TC',
    timestamp: '2024-01-15T10:30:00Z',
    likes: 156,
    shares: 23,
    hashtags: ['AI', 'Dashboard', 'Tech'],
    type: 'social'
  },
  {
    id: '2',
    content: 'The future of web development is here with Next.js 15! 🔥 #NextJS #WebDev #React',
    author: 'WebDevPro',
    avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=WD',
    timestamp: '2024-01-15T09:15:00Z',
    likes: 89,
    shares: 12,
    hashtags: ['NextJS', 'WebDev', 'React'],
    type: 'social'
  },
  {
    id: '3',
    content: 'TypeScript + Redux Toolkit = Perfect state management! 💪 #TypeScript #Redux #StateManagement',
    author: 'CodeMaster',
    avatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=CM',
    timestamp: '2024-01-15T08:45:00Z',
    likes: 234,
    shares: 45,
    hashtags: ['TypeScript', 'Redux', 'StateManagement'],
    type: 'social'
  },
  {
    id: '4',
    content: 'Dark mode is not just a trend, it\'s a necessity! 🌙 #DarkMode #UX #Design',
    author: 'UXDesigner',
    avatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=UX',
    timestamp: '2024-01-15T07:30:00Z',
    likes: 67,
    shares: 8,
    hashtags: ['DarkMode', 'UX', 'Design'],
    type: 'social'
  },
  {
    id: '5',
    content: 'Testing your React components is crucial for maintainable code! 🧪 #Testing #React #Jest',
    author: 'TestGuru',
    avatar: 'https://via.placeholder.com/40x40/EF4444/FFFFFF?text=TG',
    timestamp: '2024-01-15T06:20:00Z',
    likes: 123,
    shares: 19,
    hashtags: ['Testing', 'React', 'Jest'],
    type: 'social'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ posts: [] });
  }
  
  const searchResults = allPosts.filter(post => 
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.author.toLowerCase().includes(query.toLowerCase()) ||
    post.hashtags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
  
  return NextResponse.json({ posts: searchResults });
}


