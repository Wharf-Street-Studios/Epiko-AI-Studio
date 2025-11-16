import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../../context/FollowContext';
import { Avatar } from '../../components/ui';
import { ArrowLeft01Icon } from 'hugeicons-react';

const FollowingList: React.FC = () => {
  const navigate = useNavigate();
  const { getFollowing, unfollowUser } = useFollow();
  const following = getFollowing();

  const handleUnfollow = (userId: string, username: string) => {
    if (confirm(`Unfollow @${username}?`)) {
      unfollowUser(userId);
    }
  };

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
          <h1 className="text-xl font-bold text-white ml-3">Following</h1>
        </div>
      </header>

      {/* Following List */}
      <div className="max-w-2xl mx-auto">
        {following.length === 0 ? (
          <div className="py-20 text-center px-4">
            <p className="text-dark-500 text-base">Not following anyone yet</p>
            <button
              onClick={() => navigate('/search')}
              className="mt-4 bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-gray-100 active:scale-98 transition-all"
            >
              Discover Creators
            </button>
          </div>
        ) : (
          <div className="divide-y divide-dark-100">
            {following.map((user) => (
              <div
                key={user.id}
                className="px-4 py-4 flex items-center gap-3 hover:bg-dark-50 transition-colors"
              >
                <button
                  onClick={() => navigate(`/profile/${user.username}`)}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <Avatar
                    name={user.fullName}
                    src={user.avatar}
                    size="medium"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-semibold text-white text-sm truncate">
                      {user.username}
                    </p>
                    <p className="text-dark-500 text-xs truncate">
                      {user.fullName}
                    </p>
                    {user.bio && (
                      <p className="text-dark-400 text-xs mt-0.5 truncate">
                        {user.bio.split('\n')[0]}
                      </p>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => handleUnfollow(user.id, user.username)}
                  className="px-4 py-1.5 rounded-lg font-semibold text-sm bg-dark-100 text-white border border-dark-200 hover:bg-dark-150 transition-all"
                >
                  Following
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingList;
