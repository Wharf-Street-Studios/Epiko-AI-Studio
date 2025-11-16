import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui';
import { ArrowLeft01Icon, GoogleIcon, AppleIcon, Facebook02Icon, SecurityLockIcon } from 'hugeicons-react';

const SocialSignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithApple, signInWithFacebook } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading('google');
    try {
      await signInWithGoogle();
      showToast('Successfully signed in with Google!', 'success');
      navigate('/discover');
    } catch (error) {
      showToast('Failed to sign in with Google', 'error');
    } finally {
      setLoading(null);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading('apple');
    try {
      await signInWithApple();
      showToast('Successfully signed in with Apple!', 'success');
      navigate('/discover');
    } catch (error) {
      showToast('Failed to sign in with Apple', 'error');
    } finally {
      setLoading(null);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading('facebook');
    try {
      await signInWithFacebook();
      showToast('Successfully signed in with Facebook!', 'success');
      navigate('/discover');
    } catch (error) {
      showToast('Failed to sign in with Facebook', 'error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8 max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-dark-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <SecurityLockIcon size={40} color="#ffffff" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Continue with
          </h1>
          <p className="text-dark-500">
            Quick and secure sign-in
          </p>
        </div>

        {/* Social Sign-In Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-dark-100 bg-dark-100 rounded-xl hover:bg-dark-150 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon size={24} color="#ffffff" />
            <span className="font-semibold text-white">
              {loading === 'google' ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>

          <button
            onClick={handleAppleSignIn}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-xl hover:bg-gray-100 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AppleIcon size={24} color="#000000" />
            <span className="font-semibold text-black">
              {loading === 'apple' ? 'Signing in...' : 'Continue with Apple'}
            </span>
          </button>

          <button
            onClick={handleFacebookSignIn}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-dark-100 bg-dark-100 rounded-xl hover:bg-dark-150 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Facebook02Icon size={24} color="#ffffff" />
            <span className="font-semibold text-white">
              {loading === 'facebook' ? 'Signing in...' : 'Continue with Facebook'}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-1 h-px bg-dark-100"></div>
          <span className="px-4 text-dark-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-dark-100"></div>
        </div>

        {/* Email Sign-In Link */}
        <Button
          variant="outline"
          size="large"
          fullWidth
          onClick={() => navigate('/sign-in')}
        >
          Sign in with email
        </Button>

        {/* Privacy Notice */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <SecurityLockIcon size={16} color="#737373" />
          <p className="text-sm text-dark-500">
            We never post without your permission
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialSignIn;
