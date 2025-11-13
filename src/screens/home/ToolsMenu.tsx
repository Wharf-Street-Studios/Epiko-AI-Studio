import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { BottomNavigation } from '../../components/ui';
import {
  Coins01Icon,
  UserIcon,
  SparklesIcon,
  FavouriteIcon,
  Baby01Icon,
  UserMultiple02Icon,
  Time01Icon,
  MagicWand02Icon
} from 'hugeicons-react';

const allTools = [
  {
    id: 'face-swap',
    name: 'Face Swap',
    icon: UserIcon,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    description: 'Replace faces in photos',
    cost: 10,
    path: '/tools/face-swap',
  },
  {
    id: 'ai-avatar',
    name: 'AI Avatar',
    icon: SparklesIcon,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    description: 'Stylized portraits',
    cost: 10,
    path: '/tools/ai-avatar',
  },
  {
    id: 'couple-photo',
    name: 'Couple Photo',
    icon: FavouriteIcon,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
    description: 'Romantic scenes',
    cost: 15,
    path: '/tools/couple-photo',
  },
  {
    id: 'baby-predictor',
    name: 'Baby Predictor',
    icon: Baby01Icon,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
    description: 'Future baby preview',
    cost: 15,
    path: '/tools/baby-predictor',
  },
  {
    id: 'gender-swap',
    name: 'Gender Swap',
    icon: UserMultiple02Icon,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    description: 'Gender transformation',
    cost: 10,
    path: '/tools/gender-swap',
  },
  {
    id: 'age-transform',
    name: 'Age Transform',
    icon: Time01Icon,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    description: 'Age progression',
    cost: 10,
    path: '/tools/age-transform',
  },
  {
    id: 'enhance',
    name: 'Enhance',
    icon: MagicWand02Icon,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    description: 'HD quality boost',
    cost: 15,
    path: '/tools/enhance',
  },
];

const ToolsMenu: React.FC = () => {
  const navigate = useNavigate();
  const { balance } = useTokens();

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Create</h1>
          <button
            onClick={() => navigate('/wallet')}
            className="flex items-center gap-2 px-3 py-1.5 bg-dark-100 rounded-full hover:bg-dark-150 active:scale-95 transition-all"
          >
            <Coins01Icon size={16} color="#ffffff" />
            <span className="font-semibold text-white text-sm">{balance}</span>
          </button>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {allTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                className="bg-dark-100 border border-dark-100 rounded-2xl overflow-hidden hover:bg-dark-150 active:bg-dark-150 transition-colors text-left group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                    <Icon size={24} color="#ffffff" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-white text-sm mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-dark-600 mb-2 line-clamp-1">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-dark-500">
                    <Coins01Icon size={12} color="#737373" />
                    <span className="font-medium">{tool.cost} tokens</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Get Tokens CTA */}
        <div className="mt-6 bg-dark-100 text-white rounded-2xl p-5 border border-dark-100">
          <h3 className="font-semibold text-base mb-1">Need more tokens?</h3>
          <p className="text-sm text-dark-600 mb-4">
            Unlock unlimited creativity
          </p>
          <button
            onClick={() => navigate('/wallet')}
            className="w-full bg-white text-black font-semibold text-sm py-2.5 rounded-xl hover:bg-neutral-100 active:scale-98 transition-all"
          >
            Get Tokens
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ToolsMenu;
