import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BottomNavigation } from '../../components/ui';
import {
  PencilEdit01Icon,
  Wallet01Icon,
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
      icon: PencilEdit01Icon,
      label: 'Edit Profile',
      onClick: () => navigate('/profile/edit'),
    },
    {
      icon: Wallet01Icon,
      label: 'Wallet & Tokens',
      onClick: () => navigate('/wallet'),
    },
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
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white border-b border-neutral-150 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={22} color="#000000" />
          </button>
          <h1 className="text-xl font-bold text-black">Settings</h1>
        </div>
      </header>

      {/* Settings Options */}
      <main>
        {/* Account Section */}
        <div className="py-2">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-4 py-2">
            Account
          </h2>
          <div>
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={option.onClick}
                  className="w-full flex items-center justify-between px-4 py-4 border-b border-neutral-150 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={22} color="#000000" />
                    <span className="text-base text-black">{option.label}</span>
                  </div>
                  <ArrowRight01Icon size={20} color="#a3a3a3" />
                </button>
              );
            })}
          </div>
        </div>

        {/* App Info */}
        <div className="py-2 mt-4">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-4 py-2">
            About
          </h2>
          <div>
            <button className="w-full flex items-center justify-between px-4 py-4 border-b border-neutral-150">
              <div className="flex items-center gap-3">
                <InformationCircleIcon size={22} color="#000000" />
                <span className="text-base text-black">About Epiko AI Studios</span>
              </div>
              <span className="text-sm text-neutral-500">v1.0.0</span>
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="px-4 py-6">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-neutral-100 text-black font-semibold text-base py-3 rounded-xl hover:bg-neutral-150 active:scale-98 transition-all"
          >
            <Logout01Icon size={20} color="#000000" />
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
