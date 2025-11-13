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
    creator: { username: 'sarah_creates', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop',
    tool: 'Face Swap',
    timestamp: '2h',
    likes: 234,
    comments: 12,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    creator: { username: 'john_ai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop',
    tool: 'AI Avatar',
    timestamp: '5h',
    likes: 567,
    comments: 34,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 3,
    creator: { username: 'creative_mind', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    tool: 'Enhancement',
    timestamp: '1d',
    likes: 890,
    comments: 45,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 4,
    creator: { username: 'art_lover', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
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
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white">Feed</h1>
          <button
            onClick={() => navigate('/search')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:bg-dark-150 transition-colors"
          >
            <Search01Icon size={24} color="#ffffff" />
          </button>
        </div>
      </header>

      {/* Feed Content */}
      <main className="max-w-2xl mx-auto">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border-b border-dark-100 bg-black"
          >
            {/* Creator Header */}
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${post.creator.username}`)}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <Avatar
                  name={post.creator.username}
                  src={post.creator.avatar}
                  size="medium"
                />
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-semibold text-white text-sm truncate max-w-full">
                    {post.creator.username}
                  </span>
                  <span className="text-xs text-dark-500">{post.timestamp}</span>
                </div>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 transition-colors flex-shrink-0">
                <MoreVerticalIcon size={20} color="#a3a3a3" />
              </button>
            </div>

            {/* Content Image */}
            <div
              className="w-full aspect-square bg-dark-100 cursor-pointer"
              onClick={() => navigate(`/reel/${post.id}`)}
            >
              <img
                src={post.image}
                alt={`${post.tool} by ${post.creator.username}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Actions Bar */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <FavouriteIcon
                      size={26}
                      color={post.isLiked ? '#ef4444' : '#ffffff'}
                      className={`transition-colors ${post.isLiked ? 'fill-current' : ''}`}
                    />
                  </button>

                  <button
                    onClick={() => navigate(`/reel/${post.id}`)}
                    className="flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <Message01Icon size={26} color="#ffffff" />
                  </button>

                  <button
                    onClick={() => alert('Share coming soon')}
                    className="flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <Share08Icon size={26} color="#ffffff" />
                  </button>
                </div>

                <button
                  onClick={() => handleBookmark(post.id)}
                  className="active:scale-95 transition-transform"
                >
                  <BookmarkAdd01Icon
                    size={26}
                    color="#ffffff"
                    className={post.isBookmarked ? 'fill-current' : ''}
                  />
                </button>
              </div>

              {/* Likes Count */}
              <div className="mb-2">
                <span className="font-semibold text-white text-sm">
                  {post.likes.toLocaleString()} likes
                </span>
              </div>

              {/* Tool Badge */}
              <button
                onClick={() => navigate('/tools')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dark-100 rounded-full hover:bg-dark-150 transition-colors mb-2"
              >
                <SparklesIcon size={14} color="#ffffff" />
                <span className="text-xs font-medium text-white">
                  {post.tool}
                </span>
              </button>

              {/* Comments Link */}
              {post.comments > 0 && (
                <button
                  onClick={() => navigate(`/reel/${post.id}`)}
                  className="text-sm text-dark-500 hover:text-dark-600 transition-colors"
                >
                  View all {post.comments} comments
                </button>
              )}
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
