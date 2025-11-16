import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home01Icon, SparklesIcon, UserIcon } from 'hugeicons-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
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
        className="fixed bottom-0 left-0 right-0 safe-area-bottom z-50 bg-black/60 backdrop-blur-2xl border-t"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderImage: 'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3)) 1',
        }}
      >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
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
                className={`flex flex-col items-center justify-center flex-1 h-full group gap-1 transition-all duration-300 relative ${
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

                {/* Icon with Gradient Border */}
                <div className="relative">
                  {/* Gradient Ring on Active/Animating */}
                  {(active || isAnimating) && (
                    <div
                      className={`absolute inset-0 -m-2 rounded-full ${
                        isAnimating ? 'animate-pulse-ring' : ''
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                        opacity: isAnimating ? 0.6 : 0.3,
                        filter: 'blur(8px)',
                      }}
                    />
                  )}

                  {/* Icon Container with Gradient */}
                  <div
                    className={`relative transition-all duration-500 ${
                      isAnimating ? 'animate-bounce-in' : ''
                    } ${active ? 'drop-shadow-[0_0_12px_var(--glow-color)]' : ''}`}
                    style={active ? { '--glow-color': color.shadow } as React.CSSProperties : {}}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md'
                          : 'hover:bg-white/5'
                      }`}
                      style={active ? {
                        border: `1px solid ${color.from}40`,
                      } : {}}
                    >
                      <div className={`transition-all duration-300 ${
                        isAnimating ? 'scale-125' : 'scale-100'
                      }`}>
                        <Icon
                          size={26}
                          color={active ? color.from : '#737373'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Label with Gradient Text */}
                <span
                  className={`text-xs transition-all duration-300 ${
                    active ? 'font-semibold' : 'text-dark-500'
                  }`}
                  style={active ? {
                    background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  } : {}}
                >
                  {item.label}
                </span>
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
