import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';

const presetAvatars = [
  '👨', '👩', '🧑', '👨‍💼', '👩‍💼', '🧑‍💼',
  '👨‍🎨', '👩‍🎨', '🧑‍🎨',
];

const CreateAccountAvatar: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user came from previous step
    const accountDetails = sessionStorage.getItem('accountDetails');
    if (!accountDetails) {
      navigate('/create-account');
    }
  }, [navigate]);

  const handleCompleteSetup = async () => {
    const accountDetails = sessionStorage.getItem('accountDetails');
    if (!accountDetails) {
      navigate('/create-account');
      return;
    }

    const { fullName, email, username, password } = JSON.parse(accountDetails);

    setLoading(true);
    try {
      await signUp(fullName, email, username, password, selectedAvatar);
      sessionStorage.removeItem('accountDetails');
      // Auto-navigate to Discovery Feed after completion
      setTimeout(() => {
        navigate('/discover');
      }, 500);
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-10 shadow-soft">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span className="text-xl">←</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-md mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Choose Your Avatar
          </h1>
          <p className="text-gray-600 text-lg">
            Select a preset or upload your own
          </p>
        </div>

        {/* Upload Custom Avatar */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <button className="w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 flex flex-col items-center justify-center space-y-2 shadow-soft hover:shadow-medium group bg-white">
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📷</span>
            <span className="text-sm text-gray-600 font-semibold group-hover:text-primary-600 transition-colors">Upload Custom Avatar</span>
          </button>
        </div>

        {/* Preset Avatars */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Preset Avatars
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {presetAvatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelectedAvatar(avatar)}
                className={`aspect-square rounded-2xl border-2 transition-all duration-300 flex items-center justify-center text-5xl shadow-soft hover:shadow-medium transform
                  ${selectedAvatar === avatar
                    ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 scale-95 shadow-medium'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gradient-to-br hover:from-primary-50 hover:to-accent-50 bg-white hover:scale-105'
                  }
                `}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleCompleteSetup}
            disabled={!selectedAvatar || loading}
          >
            {loading ? 'Creating Account...' : 'Complete Setup'}
          </Button>

          <button
            onClick={handleCompleteSetup}
            className="w-full text-center text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors duration-300"
            disabled={loading}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountAvatar;
