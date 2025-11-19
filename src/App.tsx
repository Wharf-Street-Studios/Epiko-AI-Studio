import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';
import { FollowProvider } from './context/FollowContext';
import { PostInteractionProvider } from './context/PostInteractionContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Auth Screens
import WelcomeScreen from './screens/auth/WelcomeScreen';
import CreateAccountDetails from './screens/auth/CreateAccountDetails';
import CreateAccountAvatar from './screens/auth/CreateAccountAvatar';
import SignInScreen from './screens/auth/SignInScreen';
import SocialSignIn from './screens/auth/SocialSignIn';
import ForgotPassword from './screens/auth/ForgotPassword';

// Home & Navigation
import HomeScreen from './screens/home/HomeScreen';
import ToolsMenu from './screens/home/ToolsMenu';

// AI Tools (v2.0 - Enhanced with AR Features)
import FaceSwapTool from './screens/tools/FaceSwapTool';
import AIAvatarTool from './screens/tools/AIAvatarTool';
import DuoPortraitTool from './screens/tools/CouplePhotoTool'; // Renamed from CouplePhoto
import PosterMakerTool from './screens/tools/PosterMakerTool';
import AgeTransformTool from './screens/tools/AgeTransformTool';
import EnhanceTool from './screens/tools/EnhanceTool';
import ARPostersTool from './screens/tools/ARPostersTool';
import CharacterFiltersTool from './screens/tools/CharacterFiltersTool';
// BabyPredictor and GenderSwap removed per PRD v2.0

// Social Screens
import DiscoveryFeed from './screens/social/DiscoveryFeed';
import SearchExplore from './screens/social/SearchExplore';
import ReelView from './screens/social/ReelView';
import CreatorProfile from './screens/social/CreatorProfile';

// Profile & Settings
import UserProfile from './screens/profile/UserProfile';
import EditProfile from './screens/profile/EditProfile';
import Dashboard from './screens/profile/Dashboard';
import Settings from './screens/profile/Settings';
import Wallet from './screens/profile/Wallet';
import Notifications from './screens/profile/Notifications';
import FollowersList from './screens/profile/FollowersList';
import FollowingList from './screens/profile/FollowingList';
import SavedPosts from './screens/profile/SavedPosts';
// Removed: ChoosePlan, Rewards (per PRD v2.0 - simplified to credits only)

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <TokenProvider>
            <FollowProvider>
              <PostInteractionProvider>
                <div className="min-h-screen bg-black">
                  <ScrollToTop />
                  <Routes>
            {/* Public Auth Routes */}
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/social-sign-in" element={<SocialSignIn />} />
            <Route path="/create-account" element={<CreateAccountDetails />} />
            <Route path="/create-account/avatar" element={<CreateAccountAvatar />} />
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes - Require Authentication */}
            <Route path="/" element={<ProtectedRoute><DiscoveryFeed /></ProtectedRoute>} />
            <Route path="/discover" element={<ProtectedRoute><DiscoveryFeed /></ProtectedRoute>} />
            <Route path="/home" element={<Navigate to="/discover" replace />} />

            {/* Tools - Enhanced with AR Features */}
            <Route path="/tools" element={<ProtectedRoute><ToolsMenu /></ProtectedRoute>} />
            <Route path="/tools/face-swap" element={<ProtectedRoute><FaceSwapTool /></ProtectedRoute>} />
            <Route path="/tools/ai-avatar" element={<ProtectedRoute><AIAvatarTool /></ProtectedRoute>} />
            <Route path="/tools/ar-posters" element={<ProtectedRoute><ARPostersTool /></ProtectedRoute>} />
            <Route path="/tools/character-filters" element={<ProtectedRoute><CharacterFiltersTool /></ProtectedRoute>} />
            <Route path="/tools/duo-portrait" element={<ProtectedRoute><DuoPortraitTool /></ProtectedRoute>} />
            <Route path="/tools/poster-maker" element={<ProtectedRoute><PosterMakerTool /></ProtectedRoute>} />
            <Route path="/tools/age-transform" element={<ProtectedRoute><AgeTransformTool /></ProtectedRoute>} />
            <Route path="/tools/enhance" element={<ProtectedRoute><EnhanceTool /></ProtectedRoute>} />
            {/* Removed: baby-predictor, gender-swap per PRD v2.0 */}

            {/* Social */}
            <Route path="/search" element={<ProtectedRoute><SearchExplore /></ProtectedRoute>} />
            <Route path="/reel/:id" element={<ProtectedRoute><ReelView /></ProtectedRoute>} />
            <Route path="/profile/:username" element={<ProtectedRoute><CreatorProfile /></ProtectedRoute>} />

            {/* Profile & Settings */}
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/profile/followers" element={<ProtectedRoute><FollowersList /></ProtectedRoute>} />
            <Route path="/profile/following" element={<ProtectedRoute><FollowingList /></ProtectedRoute>} />
            <Route path="/profile/saved" element={<ProtectedRoute><SavedPosts /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            {/* Removed: /plans, /rewards per PRD v2.0 */}
            {/* TODO: Add /studio/:id route */}

            {/* Catch all - redirect to welcome if not authenticated */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
                </div>
              </PostInteractionProvider>
            </FollowProvider>
          </TokenProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
