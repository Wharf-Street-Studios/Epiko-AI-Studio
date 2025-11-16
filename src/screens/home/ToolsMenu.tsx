import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '../../context/TokenContext';
import { BottomNavigation } from '../../components/ui';
import {
  UserIcon,
  SparklesIcon,
  FavouriteIcon,
  Time01Icon,
  MagicWand02Icon,
  Image02Icon
} from 'hugeicons-react';

// PRD v2.0 - 7 Launch Tools
const allTools = [
  {
    id: 'face-swap',
    name: 'Face Swap',
    icon: UserIcon,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    description: 'Replace faces in photos',
    cost: 1, // 1 credit per PRD v2.0
    path: '/tools/face-swap',
  },
  {
    id: 'ai-avatar',
    name: 'AI Avatar',
    icon: SparklesIcon,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop',
    description: 'Stylized portraits',
    cost: 2, // 2 credits per PRD v2.0
    path: '/tools/ai-avatar',
  },
  {
    id: 'duo-portrait',
    name: 'Duo Portrait',
    icon: FavouriteIcon,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=600&fit=crop',
    description: 'Two-person AI scenes',
    cost: 3, // 3 credits per PRD v2.0
    path: '/tools/duo-portrait',
  },
  {
    id: 'poster-maker',
    name: 'Poster Maker',
    icon: Image02Icon,
    image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=600&h=600&fit=crop',
    description: 'Movie-style posters',
    cost: 3, // 3 credits per PRD v2.0
    path: '/tools/poster-maker', // TODO: Create this tool screen
  },
  {
    id: 'age-transform',
    name: 'Age Transform',
    icon: Time01Icon,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop',
    description: 'Age progression/regression',
    cost: 2, // 2 credits per PRD v2.0
    path: '/tools/age-transform',
  },
  {
    id: 'enhance',
    name: 'HD Enhance',
    icon: MagicWand02Icon,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop',
    description: 'AI upscale & sharpen',
    cost: 1, // 1 credit per PRD v2.0
    path: '/tools/enhance',
  },
  // Note: Studio Content Packs will be integrated into these tools
];

const ToolsMenu: React.FC = () => {
  const navigate = useNavigate();
  const { balance } = useCredits();

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header
        className="bg-black/60 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-10"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white drop-shadow-lg">Create</h1>
          <button
            onClick={() => navigate('/wallet')}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 active:scale-95 transition-all"
          >
            <SparklesIcon size={18} color="#ffffff" />
            <span className="font-semibold text-white text-sm">{balance}</span>
          </button>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="p-4 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {allTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                className="rounded-3xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group shadow-2xl border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                }}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Glass Icon Container */}
                  <div className="absolute top-3 right-3">
                    <div
                      className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-lg"
                      style={{
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                    >
                      <Icon size={20} color="#ffffff" />
                    </div>
                  </div>

                  {/* Glass Bottom Container */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-xl border-t border-white/10"
                    style={{
                      backdropFilter: 'blur(20px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                    }}
                  >
                    <h3 className="font-bold text-white text-base mb-1 drop-shadow-lg">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-white/80 mb-3 line-clamp-1">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-white/90">
                      <SparklesIcon size={14} color="#ffffff" />
                      <span className="text-xs font-semibold">{tool.cost} {tool.cost === 1 ? 'credit' : 'credits'}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Get Credits CTA */}
        <div
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl"
          style={{
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <SparklesIcon size={24} color="#000000" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-base mb-1 drop-shadow-lg">Need more credits?</h3>
              <p className="text-sm text-white/70 mb-4">
                Purchase AI Credits with EPIKO Tokens
              </p>
              <button
                onClick={() => navigate('/wallet')}
                className="w-full bg-white/90 backdrop-blur-md text-black font-semibold text-sm py-3 rounded-xl hover:bg-white active:scale-98 transition-all shadow-lg"
              >
                Buy Credits
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ToolsMenu;
