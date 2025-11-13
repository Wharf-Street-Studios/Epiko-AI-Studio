import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, Avatar } from '../../components/ui';
import {
  Search01Icon,
  FavouriteIcon,
  Message01Icon,
  Share08Icon,
  BookmarkAdd01Icon,
  SparklesIcon,
  MoreVerticalIcon
} from 'hugeicons-react';

interface Post {
  id: number;
  creator: {
    username: string;
    avatar: string;
  };
  image: string;
  tool: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const mockPosts: Post[] = [
  {
    id: 1,
    creator: { username: 'sarah_creates', avatar: '' },
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    tool: 'Face Swap',
    timestamp: '2h',
    likes: 234,
    comments: 12,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    creator: { username: 'john_ai', avatar: '' },
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    tool: 'AI Avatar',
    timestamp: '5h',
    likes: 567,
    comments: 34,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 3,
    creator: { username: 'creative_mind', avatar: '' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    tool: 'Enhancement',
    timestamp: '1d',
    likes: 890,
    comments: 45,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 4,
    creator: { username: 'art_lover', avatar: '' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    tool: 'Gender Swap',
    timestamp: '2d',
    likes: 1234,
    comments: 89,
    isLiked: false,
    isBookmarked: false,
  },
];

const DiscoveryFeed: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked,
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Feed</h1>
          <button
            onClick={() => navigate('/search')}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all duration-150"
          >
            <Search01Icon size={22} color="#ffffff" />
          </button>
        </div>
      </header>

      {/* Feed Content */}
      <main>
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="border-b border-dark-100 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Creator Header */}
            <div className="px-4 pt-3 pb-2 flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${post.creator.username}`)}
                className="flex items-center gap-2.5 group"
              >
                <Avatar name={post.creator.username} size="small" />
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-white text-sm group-hover:underline">
                    {post.creator.username}
                  </span>
                  <span className="text-xs text-dark-500">{post.timestamp}</span>
                </div>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all">
                <MoreVerticalIcon size={18} color="#737373" />
              </button>
            </div>

            {/* Content Image */}
            <div
              className="w-full aspect-square bg-dark-100 cursor-pointer"
              onClick={() => navigate(`/reel/${post.id}`)}
            >
              <img
                src={post.image}
                alt="AI generated content"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Actions Bar */}
            <div className="px-4 py-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 group active:scale-95 transition-transform"
                  >
                    <FavouriteIcon
                      size={22}
                      color={post.isLiked ? '#ef4444' : '#ffffff'}
                      className={`transition-all ${post.isLiked ? 'fill-current' : ''}`}
                    />
                    <span className="text-sm text-dark-700">{post.likes}</span>
                  </button>

                  <button
                    onClick={() => navigate(`/reel/${post.id}`)}
                    className="flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Message01Icon size={22} color="#ffffff" />
                    <span className="text-sm text-dark-700">{post.comments}</span>
                  </button>

                  <button className="active:scale-95 transition-transform">
                    <Share08Icon size={22} color="#ffffff" />
                  </button>
                </div>

                <button
                  onClick={() => handleBookmark(post.id)}
                  className="active:scale-95 transition-transform"
                >
                  <BookmarkAdd01Icon
                    size={22}
                    color="#ffffff"
                    className={post.isBookmarked ? 'fill-current' : ''}
                  />
                </button>
              </div>

              {/* Tool Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dark-100 rounded-full">
                <SparklesIcon size={12} color="#ffffff" />
                <span className="text-xs font-medium text-dark-700">{post.tool}</span>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default DiscoveryFeed;
