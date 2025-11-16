import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home01Icon, SparklesIcon, UserIcon } from 'hugeicons-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; color?: string; variant?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/discover', icon: Home01Icon },
  { id: 'create', label: 'Create', path: '/tools', icon: SparklesIcon },
  { id: 'profile', label: 'Profile', path: '/profile', icon: UserIcon },
];

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleTabClick = (path: string, id: string) => {
    if (!isActive(path)) {
      setAnimatingTab(id);
      setTimeout(() => setAnimatingTab(null), 600);
      navigate(path);
    }
  };

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-t pb-safe"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderImage: 'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3)) 1',
        }}
      >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const colors = [
              { from: '#3b82f6', to: '#8b5cf6', shadow: 'rgba(59, 130, 246, 0.6)' }, // blue to purple
              { from: '#8b5cf6', to: '#ec4899', shadow: 'rgba(168, 85, 247, 0.6)' }, // purple to pink
              { from: '#ec4899', to: '#f43f5e', shadow: 'rgba(236, 72, 153, 0.6)' }, // pink to rose
            ];
            const color = colors[index];

            const isAnimating = animatingTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path, item.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full group transition-all duration-300 relative ${
                  active ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                {/* Gradient Top Indicator */}
                {active && (
                  <div
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full animate-slide-in"
                    style={{
                      background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
                      boxShadow: `0 0 12px ${color.shadow}`,
                    }}
                  />
                )}

                {/* Icon */}
                <div className="flex flex-col items-center">
                  <Icon
                    size={24}
                    color={active ? color.from : '#9ca3af'}
                    variant={active ? 'solid' : 'stroke'}
                  />

                  {/* Label */}
                  <span
                    className={`text-[10px] mt-1 transition-all duration-300 ${
                      active ? 'font-semibold' : 'font-medium'
                    }`}
                    style={active ? {
                      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    } : { color: '#9ca3af' }}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slide-in {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 3rem;
            opacity: 1;
          }
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.2;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-pulse-ring {
          animation: pulse-ring 0.6s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </>
  );
};

export default BottomNavigation;
