import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Auth Screens
import WelcomeScreen from './screens/auth/WelcomeScreen';
import CreateAccountDetails from './screens/auth/CreateAccountDetails';
import CreateAccountAvatar from './screens/auth/CreateAccountAvatar';
import SignInScreen from './screens/auth/SignInScreen';
import SocialSignIn from './screens/auth/SocialSignIn';

// Home & Navigation
import HomeScreen from './screens/home/HomeScreen';
import ToolsMenu from './screens/home/ToolsMenu';

// AI Tools
import FaceSwapTool from './screens/tools/FaceSwapTool';
import AIAvatarTool from './screens/tools/AIAvatarTool';
import CouplePhotoTool from './screens/tools/CouplePhotoTool';
import BabyPredictorTool from './screens/tools/BabyPredictorTool';
import GenderSwapTool from './screens/tools/GenderSwapTool';
import AgeTransformTool from './screens/tools/AgeTransformTool';
import EnhanceTool from './screens/tools/EnhanceTool';

// Social Screens
import DiscoveryFeed from './screens/social/DiscoveryFeed';
import SearchExplore from './screens/social/SearchExplore';
import ReelView from './screens/social/ReelView';
import CreatorProfile from './screens/social/CreatorProfile';

// Profile & Settings
import UserProfile from './screens/profile/UserProfile';
import Dashboard from './screens/profile/Dashboard';
import Settings from './screens/profile/Settings';
import ChoosePlan from './screens/profile/ChoosePlan';
import Wallet from './screens/profile/Wallet';
import Rewards from './screens/profile/Rewards';
import Notifications from './screens/profile/Notifications';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TokenProvider>
          <div className="min-h-screen bg-white">
            <Routes>
            {/* Public Auth Routes */}
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/social-sign-in" element={<SocialSignIn />} />
            <Route path="/create-account" element={<CreateAccountDetails />} />
            <Route path="/create-account/avatar" element={<CreateAccountAvatar />} />
            <Route path="/sign-in" element={<SignInScreen />} />

            {/* Protected Routes - Require Authentication */}
            <Route path="/" element={<ProtectedRoute><DiscoveryFeed /></ProtectedRoute>} />
            <Route path="/discover" element={<ProtectedRoute><DiscoveryFeed /></ProtectedRoute>} />
            <Route path="/home" element={<Navigate to="/discover" replace />} />

            {/* Tools */}
            <Route path="/tools" element={<ProtectedRoute><ToolsMenu /></ProtectedRoute>} />
            <Route path="/tools/face-swap" element={<ProtectedRoute><FaceSwapTool /></ProtectedRoute>} />
            <Route path="/tools/ai-avatar" element={<ProtectedRoute><AIAvatarTool /></ProtectedRoute>} />
            <Route path="/tools/couple-photo" element={<ProtectedRoute><CouplePhotoTool /></ProtectedRoute>} />
            <Route path="/tools/baby-predictor" element={<ProtectedRoute><BabyPredictorTool /></ProtectedRoute>} />
            <Route path="/tools/gender-swap" element={<ProtectedRoute><GenderSwapTool /></ProtectedRoute>} />
            <Route path="/tools/age-transform" element={<ProtectedRoute><AgeTransformTool /></ProtectedRoute>} />
            <Route path="/tools/enhance" element={<ProtectedRoute><EnhanceTool /></ProtectedRoute>} />

            {/* Social */}
            <Route path="/search" element={<ProtectedRoute><SearchExplore /></ProtectedRoute>} />
            <Route path="/reel/:id" element={<ProtectedRoute><ReelView /></ProtectedRoute>} />
            <Route path="/profile/:username" element={<ProtectedRoute><CreatorProfile /></ProtectedRoute>} />

            {/* Profile & Settings */}
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/plans" element={<ProtectedRoute><ChoosePlan /></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
            <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

            {/* Catch all - redirect to welcome if not authenticated */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
          </div>
        </TokenProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
