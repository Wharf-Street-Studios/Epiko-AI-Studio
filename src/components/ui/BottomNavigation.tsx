import React from 'react';
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 safe-area-bottom z-50 bg-black/60 backdrop-blur-2xl border-t border-white/10"
      style={{
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
      }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full group gap-1 transition-all duration-200 ${
                  active ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div className={`transition-all duration-200 ${active ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
                  <Icon
                    size={26}
                    color={active ? '#ffffff' : '#737373'}
                  />
                </div>
                <span className={`text-xs transition-all duration-200 ${active ? 'text-white font-semibold' : 'text-dark-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
