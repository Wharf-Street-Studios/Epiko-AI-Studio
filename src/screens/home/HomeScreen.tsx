import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTokens } from '../../context/TokenContext';
import { Card, Button, BottomNavigation } from '../../components/ui';
import { Search01Icon, Coins01Icon, Notification02Icon, UserIcon, ChartLineData01Icon, ArrowRight01Icon, FaceIdIcon, UserCircleIcon, FavouriteIcon, Time01Icon, MagicWand02Icon, Image02Icon } from 'hugeicons-react';

// PRD v2.0 - 6 Launch Tools
const aiTools = [
  { id: 'face-swap', name: 'Face Swap', Icon: FaceIdIcon, path: '/tools/face-swap', popular: true },
  { id: 'ai-avatar', name: 'AI Avatar', Icon: UserCircleIcon, path: '/tools/ai-avatar', popular: true },
  { id: 'duo-portrait', name: 'Duo Portrait', Icon: FavouriteIcon, path: '/tools/duo-portrait', popular: true },
  { id: 'poster-maker', name: 'Poster Maker', Icon: Image02Icon, path: '/tools/poster-maker', popular: false },
  { id: 'age-transform', name: 'Age Transform', Icon: Time01Icon, path: '/tools/age-transform', popular: false },
  { id: 'enhance', name: 'HD Enhance', Icon: MagicWand02Icon, path: '/tools/enhance', popular: false },
];

const categories = [
  { id: 'romantic', name: 'Romantic Vibes', gradient: 'from-pink-500 to-rose-500' },
  { id: 'trending', name: 'Trending Now', gradient: 'from-orange-500 to-red-500' },
];

const topCreators = [
  { username: 'sarah_creates', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces', posts: 124 },
  { username: 'john_ai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces', posts: 89 },
  { username: 'creative_mind', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces', posts: 156 },
  { username: 'art_lover', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces', posts: 203 },
];

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance } = useTokens();

  const popularTools = aiTools.filter(tool => tool.popular);
  const otherTools = aiTools.filter(tool => !tool.popular);

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-white">
              Epiko AI Studio
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/wallet')}
                className="flex items-center gap-1.5 bg-dark-100 px-3 py-2 rounded-xl hover:bg-dark-150 transition-colors"
              >
                <Coins01Icon size={18} color="#3b82f6" />
                <span className="font-bold text-white">{balance}</span>
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 transition-colors"
              >
                <Notification02Icon size={24} color="#ffffff" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 transition-colors"
              >
                <UserIcon size={24} color="#ffffff" />
              </button>
            </div>
          </div>
          {/* Search Bar */}
          <button
            onClick={() => navigate('/search')}
            className="w-full bg-dark-100 rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-dark-150 transition-colors"
          >
            <Search01Icon size={20} color="#737373" />
            <span className="text-dark-500 text-sm">Search tools, creators...</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-2xl mx-auto space-y-8">
        {/* Popular Tools Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ChartLineData01Icon size={24} color="#f97316" />
              Popular Tools
            </h2>
            <button
              onClick={() => navigate('/tools')}
              className="text-sm text-dark-500 font-medium hover:text-white flex items-center gap-1 transition-colors"
            >
              View All
              <ArrowRight01Icon size={16} color="currentColor" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {popularTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                className="bg-dark-100 rounded-3xl p-4 aspect-square flex flex-col items-center justify-center gap-2 hover:bg-dark-150 active:scale-98 transition-all"
              >
                <tool.Icon size={32} color="#ffffff" />
                <span className="font-semibold text-white text-xs text-center">{tool.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* More Tools Section */}
        <section>
          <h2 className="text-lg font-bold text-white mb-4">
            More Tools
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {otherTools.slice(0, 4).map((tool) => (
              <button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                className="bg-dark-100 rounded-3xl p-3 aspect-square flex flex-col items-center justify-center gap-1.5 hover:bg-dark-150 active:scale-98 transition-all"
              >
                <tool.Icon size={28} color="#ffffff" />
                <span className="font-medium text-white text-[10px] text-center leading-tight">{tool.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Explore Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            Explore
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate('/discover')}
                className={`bg-gradient-to-br ${category.gradient} rounded-3xl p-6 aspect-[4/3] flex flex-col items-center justify-center hover:scale-105 active:scale-98 transition-all`}
              >
                <span className="font-semibold text-white text-lg">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Top Creators Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">
              Top Creators
            </h2>
            <button
              onClick={() => navigate('/discover')}
              className="text-sm text-dark-500 font-medium hover:text-white transition-colors"
            >
              View All
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
            {topCreators.map((creator) => (
              <button
                key={creator.username}
                onClick={() => navigate(`/profile/${creator.username}`)}
                className="flex-shrink-0 text-center"
              >
                <div className="w-20 h-20 rounded-full mb-2 border-2 border-dark-100 hover:border-white transition-colors overflow-hidden">
                  <img
                    src={creator.avatar}
                    alt={creator.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-white max-w-[80px] truncate">
                  {creator.username}
                </p>
                <p className="text-xs text-dark-500">
                  {creator.posts} posts
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Discovery Feed CTA */}
        <section>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={() => navigate('/discover')}
          >
            <span className="flex items-center justify-center gap-2">
              <Search01Icon size={20} color="#000000" />
              Explore Discovery Feed
            </span>
          </Button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;
