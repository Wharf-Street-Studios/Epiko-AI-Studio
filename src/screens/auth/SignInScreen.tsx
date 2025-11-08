import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/ui';

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
        <div className="mb-10 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-medium">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-3 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Sign in to continue creating
          </p>
        </div>

        {errors.form && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-soft animate-slide-up">
            <p className="text-sm text-red-600 font-medium">{errors.form}</p>
          </div>
        )}

        <div className="space-y-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            error={errors.password}
            required
          />

          <div className="flex justify-end">
            <button className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300">
              Forgot Password?
            </button>
          </div>
        </div>

        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>

        <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={() => navigate('/create-account')}
            className="text-primary-600 font-bold hover:text-primary-700 transition-colors duration-300"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
