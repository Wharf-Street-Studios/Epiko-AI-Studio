import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFollow } from '../../context/FollowContext';
import { Button } from '../../components/ui';
import { ArrowLeft01Icon, GridIcon, FavouriteIcon } from 'hugeicons-react';

interface CreatorData {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
}

const mockCreatorData: CreatorData = {
  id: '2',
  username: 'sarah_creates',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  bio: 'AI Artist & Content Creator\nLove creating romantic & dreamy content\nCheck out my latest creations',
  posts: 124,
  followers: 15600,
  following: 234,
};

const mockCreations = [
  { id: 1, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop', likes: 234 },
  { id: 2, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop', likes: 567 },
  { id: 3, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop', likes: 890 },
  { id: 4, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop', likes: 432 },
  { id: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop', likes: 678 },
  { id: 6, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop', likes: 345 },
];

const CreatorProfile: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { isFollowing, followUser, unfollowUser, getFollowerCount } = useFollow();
  const [creator] = useState<CreatorData>(mockCreatorData);
  const [activeTab, setActiveTab] = useState<'grid' | 'liked'>('grid');

  const following = isFollowing(creator.id);
  const followerCount = getFollowerCount(creator.id);

  const handleFollowToggle = () => {
    if (following) {
      unfollowUser(creator.id);
    } else {
      followUser(creator.id);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-6">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white ml-3">{username}</h1>
        </div>
      </header>

      {/* Profile Info */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-dark-100">
            <img
              src={creator.avatar}
              alt={creator.username}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Stats */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{creator.username}</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <p className="font-bold text-white">{creator.posts}</p>
                <p className="text-dark-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">{followerCount.toLocaleString()}</p>
                <p className="text-dark-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">{creator.following}</p>
                <p className="text-dark-500">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-white whitespace-pre-line">{creator.bio}</p>
        </div>

        {/* Follow Button */}
        <Button
          variant={following ? 'outline' : 'primary'}
          size="medium"
          fullWidth
          onClick={handleFollowToggle}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-dark-100 bg-black sticky top-16 z-40">
        <div className="flex max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('grid')}
            className={`flex-1 py-4 text-center font-semibold transition-all relative flex items-center justify-center gap-2 ${
              activeTab === 'grid'
                ? 'text-white'
                : 'text-dark-500 hover:text-white'
            }`}
          >
            <GridIcon size={20} color="currentColor" />
            Grid
            {activeTab === 'grid' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-4 text-center font-semibold transition-all relative flex items-center justify-center gap-2 ${
              activeTab === 'liked'
                ? 'text-white'
                : 'text-dark-500 hover:text-white'
            }`}
          >
            <FavouriteIcon size={20} color="currentColor" />
            Liked
            {activeTab === 'liked' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
            )}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-3 py-3 max-w-2xl mx-auto">
        {activeTab === 'grid' && (
          <div className="grid grid-cols-3 gap-3">
            {mockCreations.map((creation) => (
              <button
                key={creation.id}
                onClick={() => navigate(`/reel/${creation.id}`)}
                className="aspect-square bg-dark-100 rounded-2xl overflow-hidden relative hover:opacity-80 transition-opacity"
              >
                <img
                  src={creation.image}
                  alt={`Creation ${creation.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                  <FavouriteIcon size={14} color="#ffffff" />
                  <span className="text-white text-xs font-semibold">{creation.likes}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="py-16 text-center">
            <FavouriteIcon size={80} color="#737373" className="mx-auto mb-6" />
            <p className="text-dark-500 text-lg font-medium">Liked content will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;
