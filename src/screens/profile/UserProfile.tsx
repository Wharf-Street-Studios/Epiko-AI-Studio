import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BottomNavigation, Avatar } from '../../components/ui';
import { Settings02Icon, GridIcon, FavouriteIcon, UserIcon } from 'hugeicons-react';

const mockUserCreations = [
  { id: 1, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', likes: 45, tool: 'Face Swap' },
  { id: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', likes: 89, tool: 'Scene Swap' },
  { id: 3, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', likes: 123, tool: 'AI Avatar' },
  { id: 4, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', likes: 67, tool: 'Gender Swap' },
  { id: 5, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop', likes: 234, tool: 'Enhancement' },
  { id: 6, image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop', likes: 156, tool: 'Couple Photo' },
];

const mockLikedContent = [
  { id: 1, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', creator: 'sarah_creates', likes: 890 },
  { id: 2, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop', creator: 'john_ai', likes: 567 },
  { id: 3, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop', creator: 'art_lover', likes: 1234 },
];

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'liked'>('posts');

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 pb-20">
        <div className="text-center max-w-sm">
          <div className="mx-auto mb-6 flex justify-center">
            <Avatar size="xlarge" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-base text-dark-500 mb-8">
            Sign in to view your profile and creations
          </p>
          <button
            onClick={() => navigate('/sign-in')}
            className="bg-white text-black font-semibold text-base px-8 py-3 rounded-xl hover:bg-gray-100 active:scale-98 transition-all"
          >
            Sign In
          </button>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold text-white">{user.username}</h1>
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:bg-dark-150 transition-colors"
          >
            <Settings02Icon size={24} color="#ffffff" />
          </button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          {/* Avatar */}
          <Avatar
            name={user.fullName}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces"
            size="xlarge"
          />

          {/* Stats */}
          <div className="flex gap-8">
            <div className="text-center">
              <div className="font-bold text-white text-lg mb-1">{mockUserCreations.length}</div>
              <div className="text-sm text-dark-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-lg mb-1">1.2K</div>
              <div className="text-sm text-dark-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-lg mb-1">890</div>
              <div className="text-sm text-dark-500">Following</div>
            </div>
          </div>
        </div>

        {/* Name and Bio */}
        <div className="mb-6">
          <h2 className="font-bold text-white text-base mb-1.5">{user.fullName}</h2>
          <p className="text-sm text-dark-500 leading-relaxed">
            Creating AI-powered content
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/profile/edit')}
            className="flex-1 bg-dark-100 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-dark-150 active:scale-98 transition-all"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate('/wallet')}
            className="flex-1 bg-dark-100 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-dark-150 active:scale-98 transition-all"
          >
            Wallet
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-y border-dark-100">
        <div className="flex max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors relative ${
              activeTab === 'posts' ? 'text-white' : 'text-dark-500'
            }`}
          >
            <GridIcon size={22} color={activeTab === 'posts' ? '#ffffff' : '#737373'} />
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors relative ${
              activeTab === 'liked' ? 'text-white' : 'text-dark-500'
            }`}
          >
            <FavouriteIcon
              size={22}
              color={activeTab === 'liked' ? '#ffffff' : '#737373'}
              className={activeTab === 'liked' ? 'fill-current' : ''}
            />
            {activeTab === 'liked' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-1 bg-black max-w-2xl mx-auto">
        {(activeTab === 'posts' ? mockUserCreations : mockLikedContent).map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/reel/${item.id}`)}
            className="aspect-square bg-dark-100 overflow-hidden active:opacity-70 transition-opacity"
          >
            <img
              src={item.image}
              alt={`Post ${item.id}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Empty State */}
      {activeTab === 'posts' && mockUserCreations.length === 0 && (
        <div className="py-20 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GridIcon size={28} color="#737373" />
          </div>
          <p className="text-base font-semibold text-white mb-2">No posts yet</p>
          <p className="text-sm text-dark-500">
            Start creating with AI tools
          </p>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default UserProfile;
