import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../../context/FollowContext';
import { Avatar } from '../../components/ui';
import { ArrowLeft01Icon } from 'hugeicons-react';

const FollowersList: React.FC = () => {
  const navigate = useNavigate();
  const { getFollowers, isFollowing, followUser, unfollowUser } = useFollow();
  const followers = getFollowers();

  const handleFollowToggle = (userId: string) => {
    if (isFollowing(userId)) {
      unfollowUser(userId);
    } else {
      followUser(userId);
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
          <h1 className="text-xl font-bold text-white ml-3">Followers</h1>
        </div>
      </header>

      {/* Followers List */}
      <div className="max-w-2xl mx-auto">
        {followers.length === 0 ? (
          <div className="py-20 text-center px-4">
            <p className="text-dark-500 text-base">No followers yet</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-100">
            {followers.map((user) => (
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
                  onClick={() => handleFollowToggle(user.id)}
                  className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all ${
                    isFollowing(user.id)
                      ? 'bg-dark-100 text-white border border-dark-200 hover:bg-dark-150'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {isFollowing(user.id) ? 'Following' : 'Follow Back'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowersList;
