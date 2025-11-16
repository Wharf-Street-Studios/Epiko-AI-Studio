import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Avatar } from '../../components/ui';
import { ArrowLeft01Icon, Camera01Icon, UserIcon } from 'hugeicons-react';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    bio: 'AI content creator | Exploring the creative possibilities',
    avatar: user?.avatar || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate('/profile');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black border-b border-dark-100 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-dark-150 active:scale-95 transition-all"
            >
              <ArrowLeft01Icon size={22} color="#ffffff" />
            </button>
            <h1 className="text-xl font-bold text-white">Edit Profile</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-white font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-dark-100 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Avatar Section */}
        <section>
          <label className="block text-sm font-semibold text-white mb-3">Profile Picture</label>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Avatar
                name={formData.fullName}
                src={formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces'}
                size="xlarge"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all">
                <Camera01Icon size={16} color="#000000" />
              </button>
            </div>
          </div>
          <p className="text-xs text-dark-600 text-center">
            Click camera icon to change your profile picture
          </p>
        </section>

        {/* Form Fields */}
        <section className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(value) => setFormData({ ...formData, fullName: value })}
            error={errors.fullName}
            required
          />

          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            value={formData.username}
            onChange={(value) => setFormData({ ...formData, username: value })}
            error={errors.username}
            required
          />

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-4 py-3 bg-dark-100 border border-dark-100 rounded-xl focus:outline-none focus:border-white transition-all text-white resize-none"
            />
            <p className="text-xs text-dark-600 mt-2">{formData.bio.length}/150 characters</p>
          </div>
        </section>

        {/* Account Stats */}
        <section className="p-4 bg-dark-100 rounded-2xl border border-dark-100">
          <h3 className="text-sm font-semibold text-white mb-4">Your Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-white">3</p>
              <p className="text-xs text-dark-600">Posts</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">1.2K</p>
              <p className="text-xs text-dark-600">Followers</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">345</p>
              <p className="text-xs text-dark-600">Following</p>
            </div>
          </div>
        </section>

        {/* Delete Account */}
        <section className="pt-6">
          <button
            onClick={() => confirm('Are you sure you want to delete your account? This action cannot be undone.') && alert('Account deletion coming soon')}
            className="w-full px-4 py-3 bg-red-950/50 text-red-400 rounded-xl font-semibold hover:bg-red-950 transition-all border border-red-900"
          >
            Delete Account
          </button>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;
