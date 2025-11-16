import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon, MagicWand02Icon, Image02Icon, UserMultiple02Icon } from 'hugeicons-react';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Logo and Branding */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 animate-scale-in">
          <SparklesIcon size={36} color="#000000" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Epiko AI Studio
        </h1>

        <p className="text-base text-dark-600 text-center max-w-xs mb-12">
          Create stunning AI-powered content
        </p>

        {/* Feature Highlights */}
        <div className="w-full max-w-sm space-y-6 mb-16">
          <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-11 h-11 bg-dark-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MagicWand02Icon size={20} color="#ffffff" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-base mb-0.5">AI-Powered Tools</h3>
              <p className="text-sm text-dark-600 leading-snug">
                6 professional tools including face swap, avatars, and enhancement
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-11 h-11 bg-dark-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Image02Icon size={20} color="#ffffff" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-base mb-0.5">Discover Content</h3>
              <p className="text-sm text-dark-600 leading-snug">
                Explore creations from our community of creators
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-11 h-11 bg-dark-100 rounded-full flex items-center justify-center flex-shrink-0">
              <UserMultiple02Icon size={20} color="#ffffff" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-base mb-0.5">Join Creators</h3>
              <p className="text-sm text-dark-600 leading-snug">
                Share your creations and grow your following
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="px-6 pb-8 pt-4 border-t border-dark-100">
        <div className="w-full max-w-sm mx-auto space-y-3">
          <button
            onClick={() => navigate('/create-account')}
            className="w-full bg-white text-black font-semibold text-base py-3 rounded-xl hover:bg-dark-800 active:scale-98 transition-all duration-150 shadow-sm"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate('/sign-in')}
            className="w-full bg-dark-100 text-white font-semibold text-base py-3 rounded-xl border border-dark-200 hover:bg-dark-150 active:scale-98 transition-all duration-150"
          >
            Sign In
          </button>
        </div>

        <p className="text-xs text-dark-500 text-center mt-6 px-8 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
