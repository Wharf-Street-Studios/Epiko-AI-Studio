import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BottomNavigation } from '../../components/ui';
import {
  Notification02Icon,
  LockIcon,
  Logout01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  InformationCircleIcon
} from 'hugeicons-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
      navigate('/welcome');
    }
  };

  const settingsOptions = [
    {
      icon: Notification02Icon,
      label: 'Notifications',
      onClick: () => navigate('/notifications'),
    },
    {
      icon: LockIcon,
      label: 'Privacy & Security',
      onClick: () => alert('Privacy settings coming soon'),
    },
  ];

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black border-b border-dark-100 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-dark-150 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Settings</h1>
        </div>
      </header>

      {/* Settings Options */}
      <main>
        {/* Account Section */}
        <div className="py-2">
          <h2 className="text-xs font-semibold text-dark-600 uppercase tracking-wide px-4 py-2">
            Account
          </h2>
          <div>
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={option.onClick}
                  className="w-full flex items-center justify-between px-4 py-4 border-b border-dark-100 hover:bg-dark-100 active:bg-dark-150 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={22} color="#ffffff" />
                    <span className="text-base text-white">{option.label}</span>
                  </div>
                  <ArrowRight01Icon size={20} color="#737373" />
                </button>
              );
            })}
          </div>
        </div>

        {/* App Info */}
        <div className="py-2 mt-4">
          <h2 className="text-xs font-semibold text-dark-600 uppercase tracking-wide px-4 py-2">
            About
          </h2>
          <div>
            <button className="w-full flex items-center justify-between px-4 py-4 border-b border-dark-100">
              <div className="flex items-center gap-3">
                <InformationCircleIcon size={22} color="#ffffff" />
                <span className="text-base text-white">About Epiko AI Studio</span>
              </div>
              <span className="text-sm text-dark-600">v1.0.0</span>
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="px-4 py-6">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-dark-100 text-white font-semibold text-base py-3 rounded-xl hover:bg-dark-150 active:scale-98 transition-all"
          >
            <Logout01Icon size={20} color="#ffffff" />
            <span>Sign Out</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Settings;
