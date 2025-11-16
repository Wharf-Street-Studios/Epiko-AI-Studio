import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft01Icon, UserAdd01Icon, FavouriteIcon, Message01Icon, Notification02Icon } from 'hugeicons-react';

interface Notification {
  id: number;
  type: 'follow' | 'like' | 'comment' | 'system';
  user?: { username: string; avatar: string };
  content: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'follow',
    user: {
      username: 'sarah_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces'
    },
    content: 'started following you',
    timestamp: '2h ago',
    read: false
  },
  {
    id: 2,
    type: 'like',
    user: {
      username: 'john_ai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces'
    },
    content: 'liked your creation',
    timestamp: '5h ago',
    read: false
  },
  {
    id: 3,
    type: 'comment',
    user: {
      username: 'creative_mind',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces'
    },
    content: 'commented: "Amazing work!"',
    timestamp: '1d ago',
    read: false
  },
  {
    id: 4,
    type: 'system',
    content: 'You earned 25 tokens from weekly streak!',
    timestamp: '2d ago',
    read: true
  },
  {
    id: 5,
    type: 'like',
    user: {
      username: 'art_lover',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces'
    },
    content: 'liked your creation',
    timestamp: '3d ago',
    read: true
  },
];

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'follow':
        return <UserAdd01Icon size={24} color="#ffffff" />;
      case 'like':
        return <FavouriteIcon size={24} color="#ef4444" />;
      case 'comment':
        return <Message01Icon size={24} color="#ffffff" />;
      case 'system':
        return <Notification02Icon size={24} color="#3b82f6" />;
      default:
        return <Notification02Icon size={24} color="#ffffff" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
            >
              <ArrowLeft01Icon size={24} color="#ffffff" />
            </button>
            <h1 className="text-xl font-bold text-white ml-3">Notifications</h1>
          </div>
          <button className="text-sm text-dark-500 font-semibold hover:text-white transition-colors">
            Mark all read
          </button>
        </div>
      </header>

      {/* Notifications List */}
      <main className="px-4 py-4 max-w-2xl mx-auto space-y-2">
        {mockNotifications.map((notification) => (
          <button
            key={notification.id}
            className={`w-full bg-dark-100 rounded-3xl p-4 hover:bg-dark-150 transition-colors ${
              notification.read ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-dark-150 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                {notification.type === 'system' ? (
                  getNotificationIcon(notification.type)
                ) : (
                  <img
                    src={notification.user?.avatar}
                    alt={notification.user?.username}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-white">
                  {notification.user && (
                    <span className="font-semibold">{notification.user.username} </span>
                  )}
                  {notification.content}
                </p>
                <p className="text-sm text-dark-500 mt-1">{notification.timestamp}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </button>
        ))}
      </main>
    </div>
  );
};

export default Notifications;
