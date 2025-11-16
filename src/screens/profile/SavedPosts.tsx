import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostInteraction } from '../../context/PostInteractionContext';
import { ArrowLeft01Icon, BookmarkAdd01Icon } from 'hugeicons-react';

// Mock posts data (same as DiscoveryFeed)
const mockPostsData = [
  {
    id: 'post_1',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop',
    tool: 'Face Swap',
    likes: 234,
  },
  {
    id: 'post_2',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop',
    tool: 'AI Avatar',
    likes: 567,
  },
  {
    id: 'post_3',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    tool: 'HD Enhance',
    likes: 890,
  },
  {
    id: 'post_4',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    tool: 'Age Transform',
    likes: 1234,
  },
];

const SavedPosts: React.FC = () => {
  const navigate = useNavigate();
  const { getSavedPosts, getLikeCount } = usePostInteraction();
  const savedPostIds = getSavedPosts();

  const savedPosts = mockPostsData.filter((post) => savedPostIds.includes(post.id));

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white ml-3">Saved Posts</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {savedPosts.length === 0 ? (
          <div className="py-20 text-center px-4">
            <div className="w-20 h-20 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkAdd01Icon size={32} color="#737373" />
            </div>
            <p className="text-white font-semibold text-base mb-2">No saved posts yet</p>
            <p className="text-dark-500 text-sm mb-6">
              Save posts to view them later
            </p>
            <button
              onClick={() => navigate('/discover')}
              className="bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-gray-100 active:scale-98 transition-all"
            >
              Explore Feed
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 p-1">
            {savedPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => navigate(`/reel/${post.id}`)}
                className="aspect-square bg-dark-100 overflow-hidden relative hover:opacity-80 transition-opacity"
              >
                <img
                  src={post.image}
                  alt={post.tool}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  <BookmarkAdd01Icon size={20} color="#ffffff" className="fill-current drop-shadow-lg" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
