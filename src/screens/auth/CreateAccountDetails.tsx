import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/ui';

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
      // Store form data in sessionStorage to pass to next screen
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
    if (!password) return '';
    if (password.length < 8) return 'Weak';
    if (password.length < 12) return 'Medium';
    return 'Strong';
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
            Create Account
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in your details to get started
          </p>
        </div>

        <div className="space-y-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
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
            {username && !errors.username && (
              <p className="mt-2 text-sm text-green-600 font-semibold flex items-center gap-1 animate-fade-in">
                <span>✓</span> Username is available
              </p>
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
              <div className="mt-3 flex items-center space-x-3 animate-fade-in">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden shadow-soft">
                  <div
                    className={`h-full transition-all duration-500 ${
                      getPasswordStrength() === 'Weak'
                        ? 'w-1/3 bg-gradient-to-r from-red-500 to-red-400'
                        : getPasswordStrength() === 'Medium'
                        ? 'w-2/3 bg-gradient-to-r from-yellow-500 to-yellow-400'
                        : 'w-full bg-gradient-to-r from-green-500 to-green-400'
                    }`}
                  />
                </div>
                <span className={`text-sm font-semibold ${
                  getPasswordStrength() === 'Weak'
                    ? 'text-red-600'
                    : getPasswordStrength() === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}>
                  {getPasswordStrength()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountDetails;
