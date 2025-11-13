import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Avatar } from '../../components/ui';
import { ArrowLeft01Icon, ImageUpload01Icon } from 'hugeicons-react';

const CreateAccountAvatar: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
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
      await signUp(fullName, email, username, password, '');
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

  const accountDetails = sessionStorage.getItem('accountDetails');
  const fullName = accountDetails ? JSON.parse(accountDetails).fullName : '';

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="px-4 py-3 border-b border-dark-100">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-dark-150 active:scale-95 transition-all"
        >
          <ArrowLeft01Icon size={22} color="#ffffff" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-md mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            Your Profile is Ready
          </h1>
          <p className="text-base text-dark-600">
            Your avatar will show your initials automatically
          </p>
        </div>

        {/* Avatar Preview */}
        <div className="mb-8">
          <Avatar name={fullName} size="xlarge" />
        </div>

        {/* Info Box */}
        <div className="mb-8 p-4 bg-dark-100 rounded-2xl border border-dark-100 max-w-xs">
          <p className="text-sm text-dark-600 text-center">
            You can upload a custom profile picture later from your profile settings
          </p>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={handleCompleteSetup}
            disabled={loading}
            className="w-full bg-white text-black font-semibold text-base py-3 rounded-xl hover:bg-neutral-100 active:scale-98 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Setup'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountAvatar;
