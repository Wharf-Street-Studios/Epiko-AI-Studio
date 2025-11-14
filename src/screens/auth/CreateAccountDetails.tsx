import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui';
import { ArrowLeft01Icon, CheckmarkCircle02Icon } from 'hugeicons-react';

const CreateAccountDetails: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      sessionStorage.setItem('accountDetails', JSON.stringify({
        fullName,
        email,
        username,
        password,
      }));
      navigate('/create-account/avatar');
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { label: '', width: '0%', color: '' };
    if (password.length < 8) return { label: 'Weak', width: '33%', color: 'bg-red-500' };
    if (password.length < 12) return { label: 'Medium', width: '66%', color: 'bg-yellow-500' };
    return { label: 'Strong', width: '100%', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-dark-100">
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:bg-dark-150 transition-colors"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 max-w-md mx-auto">
        <div className="mb-8 pt-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-base text-dark-500">
            Fill in your details to get started
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={setFullName}
            error={errors.fullName}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            error={errors.email}
            required
          />

          <div>
            <Input
              label="Username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={setUsername}
              error={errors.username}
              helperText="Your unique username (minimum 3 characters)"
              required
            />
            {username && username.length >= 3 && !errors.username && (
              <div className="mt-2 flex items-center gap-2 text-green-400">
                <CheckmarkCircle02Icon size={16} color="#4ade80" />
                <span className="text-sm font-medium">Username is available</span>
              </div>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              error={errors.password}
              required
            />
            {password && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-dark-500">Password strength</span>
                  <span className={`text-sm font-semibold ${
                    strength.label === 'Weak' ? 'text-red-400' :
                    strength.label === 'Medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-white text-black font-semibold text-base py-3 rounded-xl hover:bg-gray-100 active:scale-98 transition-all"
        >
          Continue
        </button>

        <div className="mt-6 text-center">
          <span className="text-sm text-dark-500">Already have an account? </span>
          <button
            onClick={() => navigate('/sign-in')}
            className="text-sm text-white font-semibold hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountDetails;
