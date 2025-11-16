import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../../components/ui';
import {
  ArrowLeft01Icon,
  Search01Icon,
  FavouriteIcon,
  FireIcon,
  UserIcon,
  SparklesIcon,
  ArrowUpRight01Icon
} from 'hugeicons-react';

const trendingHashtags = [
  { tag: '#AIArt', count: '12.5K', gradient: 'from-blue-500 to-purple-500' },
  { tag: '#FaceSwap', count: '8.3K', gradient: 'from-purple-500 to-pink-500' },
  { tag: '#CoupleGoals', count: '5.2K', gradient: 'from-pink-500 to-rose-500' },
  { tag: '#AIAvatar', count: '9.1K', gradient: 'from-orange-500 to-amber-500' },
  { tag: '#Transform', count: '6.7K', gradient: 'from-cyan-500 to-blue-500' },
  { tag: '#GlowUp', count: '4.9K', gradient: 'from-emerald-500 to-teal-500' },
];

const categories = [
  { id: 'all', name: 'All', icon: SparklesIcon, gradient: 'from-blue-500 to-purple-500' },
  { id: 'face-swap', name: 'Face Swap', icon: UserIcon, gradient: 'from-purple-500 to-pink-500' },
  { id: 'avatar', name: 'AI Avatar', icon: SparklesIcon, gradient: 'from-pink-500 to-rose-500' },
  { id: 'trending', name: 'Trending', icon: ArrowUpRight01Icon, gradient: 'from-orange-500 to-amber-500' },
];

const mockSearchResults = [
  { id: 1, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop', creator: 'sarah_creates', likes: 234, trending: true },
  { id: 2, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop', creator: 'john_ai', likes: 567, trending: false },
  { id: 3, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop', creator: 'creative_mind', likes: 890, trending: true },
  { id: 4, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop', creator: 'art_lover', likes: 432, trending: false },
  { id: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop', creator: 'couple_goals', likes: 678, trending: true },
  { id: 6, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop', creator: 'baby_magic', likes: 345, trending: false },
];

const SearchExplore: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header with Gradient */}
      <header
        className="bg-black/60 backdrop-blur-2xl border-b sticky top-0 z-10"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderImage: 'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3)) 1',
        }}
      >
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md"
            >
              <ArrowLeft01Icon size={24} color="#ffffff" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search creators, content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full px-4 py-3.5 pl-12 rounded-2xl focus:outline-none transition-all text-white font-medium placeholder:text-white/50 ${
                  isSearchFocused
                    ? 'bg-white/10 border-2'
                    : 'bg-white/5 border-2 border-white/10'
                }`}
                style={isSearchFocused ? {
                  borderImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6) 1',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                } : {
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              />
              <div
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: isSearchFocused
                    ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                    : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Search01Icon size={18} color="#ffffff" />
              </div>
            </div>
          </div>

          {/* Trending Hashtags with Gradients */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {trendingHashtags.map((item, index) => (
              <button
                key={item.tag}
                onClick={() => setSearchQuery(item.tag)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold text-white hover:scale-105 active:scale-95 transition-all relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${item.gradient.includes('blue') ? '#3b82f6' : item.gradient.includes('purple') ? '#8b5cf6' : item.gradient.includes('pink') ? '#ec4899' : item.gradient.includes('orange') ? '#f97316' : item.gradient.includes('cyan') ? '#06b6d4' : '#10b981'}, ${item.gradient.includes('purple') ? '#8b5cf6' : item.gradient.includes('pink') ? '#ec4899' : item.gradient.includes('rose') ? '#f43f5e' : item.gradient.includes('amber') ? '#fbbf24' : item.gradient.includes('blue') ? '#3b82f6' : '#34d3a1'})`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-2">
                  <FireIcon size={14} color="#ffffff" />
                  <span>{item.tag}</span>
                  <span className="text-xs opacity-80">{item.count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Category Pills */}
      <div className="px-4 py-6 max-w-2xl mx-auto overflow-visible">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3 -mx-1 px-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            // Parse gradient colors
            const gradientParts = category.gradient.split(' ');
            const fromColor = gradientParts[0]?.replace('from-', '') || 'blue-500';
            const toColor = gradientParts[1]?.replace('to-', '') || 'purple-500';

            // Map color names to hex values
            const colorMap: Record<string, string> = {
              'blue-500': '#3b82f6',
              'purple-500': '#8b5cf6',
              'pink-500': '#ec4899',
              'rose-500': '#f43f5e',
              'orange-500': '#f97316',
              'amber-500': '#fbbf24',
            };

            const fromHex = colorMap[fromColor] || '#3b82f6';
            const toHex = colorMap[toColor] || '#8b5cf6';

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-transform duration-200 ${
                  isActive ? 'scale-105' : 'hover:scale-105 active:scale-95'
                }`}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${fromHex}, ${toHex})`,
                  color: '#ffffff',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                } : {
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Icon size={18} color="#ffffff" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results or Discover State */}
      <main className="px-4 max-w-2xl mx-auto">
        {searchQuery || selectedCategory !== 'all' ? (
          <div>
            {searchQuery && (
              <p className="text-sm text-white/60 font-semibold mb-5">
                Showing results for{' '}
                <span
                  className="font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  "{searchQuery}"
                </span>
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              {mockSearchResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => navigate(`/reel/${result.id}`)}
                  className="rounded-3xl overflow-hidden relative hover:scale-[1.02] active:scale-[0.98] transition-all group"
                  style={{
                    animation: `fade-in-up 0.3s ease-out ${index * 0.05}s backwards`,
                  }}
                >
                  <div className="w-full aspect-square relative">
                    <img
                      src={result.image}
                      alt={`Creation by ${result.creator}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {result.trending && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 backdrop-blur-md flex items-center gap-1">
                        <FireIcon size={12} color="#ffffff" />
                        <span className="text-xs font-bold text-white">Hot</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    <div className="flex items-center justify-between text-white text-sm">
                      <span className="font-bold truncate">@{result.creator}</span>
                      <div
                        className="flex items-center gap-1.5 px-2 py-1 rounded-full flex-shrink-0"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                        }}
                      >
                        <FavouriteIcon size={12} color="#ec4899" className="fill-current" />
                        <span className="font-bold text-xs">{result.likes}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div
              className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
              }}
            >
              <Search01Icon size={48} color="#ffffff" />
            </div>
            <h3
              className="text-3xl font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #ffffff, #a0a0a0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Discover Amazing Content
            </h3>
            <p className="text-white/60 text-base max-w-sm mx-auto">
              Search for creators or explore trending hashtags to find inspiration
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchExplore;
