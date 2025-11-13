import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui';
import { Cancel01Icon, SparklesIcon } from 'hugeicons-react';

const SignInScreen: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        await signIn(email, password);
        navigate('/discover');
      } catch (error) {
        setErrors({ form: 'Invalid email or password' });
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-150">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all"
        >
          <Cancel01Icon size={24} color="#000000" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12">
        <div className="max-w-sm mx-auto w-full">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-black rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <SparklesIcon size={28} color="#ffffff" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-neutral-500">
              Sign in to continue creating
            </p>
          </div>

          {errors.form && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{errors.form}</p>
            </div>
          )}

          <div className="space-y-4 mb-4">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              error={errors.password}
              required
            />

            <div className="flex justify-end">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-neutral-700 hover:text-black font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-black text-white font-semibold text-base py-3 rounded-xl hover:bg-neutral-900 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center">
            <span className="text-sm text-neutral-600">Don't have an account? </span>
            <button
              onClick={() => navigate('/create-account')}
              className="text-sm text-black font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
