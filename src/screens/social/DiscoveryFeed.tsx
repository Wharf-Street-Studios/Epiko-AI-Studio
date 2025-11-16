import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostInteraction } from '../../context/PostInteractionContext';
import { useToast } from '../../context/ToastContext';
import { BottomNavigation, Avatar, ReportModal } from '../../components/ui';
import {
  Search01Icon,
  FavouriteIcon,
  Message01Icon,
  Share08Icon,
  BookmarkAdd01Icon,
  SparklesIcon,
  MoreVerticalIcon
} from 'hugeicons-react';

interface Post {
  id: string;
  creator: {
    username: string;
    avatar: string;
  };
  image: string;
  tool: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: 'post_1',
    creator: { username: 'sarah_creates', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop',
    tool: 'Face Swap',
    timestamp: '2h',
    likes: 234,
    comments: 12,
  },
  {
    id: 'post_2',
    creator: { username: 'john_ai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop',
    tool: 'AI Avatar',
    timestamp: '5h',
    likes: 567,
    comments: 34,
  },
  {
    id: 'post_3',
    creator: { username: 'creative_mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    tool: 'HD Enhance',
    timestamp: '1d',
    likes: 890,
    comments: 45,
  },
  {
    id: 'post_4',
    creator: { username: 'art_lover', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    tool: 'Age Transform',
    timestamp: '2d',
    likes: 1234,
    comments: 89,
  },
];

const DiscoveryFeed: React.FC = () => {
  const navigate = useNavigate();
  const { isLiked, likePost, unlikePost, getLikeCount, isSaved, savePost, unsavePost, getCommentCount } = usePostInteraction();
  const { showToast } = useToast();
  const [doubleTapPostId, setDoubleTapPostId] = useState<string | null>(null);
  const [lastTap, setLastTap] = useState<number>(0);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportingPost, setReportingPost] = useState<Post | null>(null);
  const [animatingAction, setAnimatingAction] = useState<{ postId: string; action: 'like' | 'comment' | 'share' | 'bookmark' } | null>(null);

  const handleLike = (postId: string) => {
    setAnimatingAction({ postId, action: 'like' });
    setTimeout(() => setAnimatingAction(null), 600);

    if (isLiked(postId)) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const handleBookmark = (postId: string) => {
    setAnimatingAction({ postId, action: 'bookmark' });
    setTimeout(() => setAnimatingAction(null), 600);

    if (isSaved(postId)) {
      unsavePost(postId);
    } else {
      savePost(postId);
    }
  };

  const handleShare = (post: Post) => {
    setAnimatingAction({ postId: post.id, action: 'share' });
    setTimeout(() => setAnimatingAction(null), 600);

    if (navigator.share) {
      navigator.share({
        title: `Check out this ${post.tool} creation by @${post.creator.username}`,
        text: `Amazing AI creation using ${post.tool}`,
        url: window.location.origin + `/reel/${post.id}`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/reel/${post.id}`);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  const handleDoubleTap = (postId: string) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (!isLiked(postId)) {
        likePost(postId);
        setDoubleTapPostId(postId);
        setTimeout(() => setDoubleTapPostId(null), 1000);
      }
    }
    setLastTap(now);
  };

  const handleOpenReport = (post: Post) => {
    setReportingPost(post);
    setReportModalOpen(true);
  };

  const handleCloseReport = () => {
    setReportModalOpen(false);
    setTimeout(() => setReportingPost(null), 300);
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header
        className="bg-black/60 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-10"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white drop-shadow-lg">Feed</h1>
          <button
            onClick={() => navigate('/search')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all backdrop-blur-md relative group"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search01Icon size={24} color="#ffffff" className="relative z-10" />
          </button>
        </div>
      </header>

      {/* Feed Content */}
      <main className="max-w-2xl mx-auto">
        {mockPosts.map((post) => {
          const postLiked = isLiked(post.id);
          const postSaved = isSaved(post.id);
          const likeCount = getLikeCount(post.id, post.likes);
          const commentCount = getCommentCount(post.id, post.comments);

          return (
          <article
            key={post.id}
            className="border-b border-dark-100 bg-black"
          >
            {/* Creator Header */}
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${post.creator.username}`)}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <Avatar
                  name={post.creator.username}
                  src={post.creator.avatar}
                  size="medium"
                />
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-semibold text-white text-sm truncate max-w-full">
                    {post.creator.username}
                  </span>
                  <span className="text-xs text-dark-500">{post.timestamp}</span>
                </div>
              </button>
              <button
                onClick={() => handleOpenReport(post)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all flex-shrink-0"
              >
                <MoreVerticalIcon size={20} color="#a3a3a3" />
              </button>
            </div>

            {/* Content Image */}
            <div
              className="w-full aspect-square bg-dark-100 cursor-pointer relative select-none"
              onClick={(e) => {
                handleDoubleTap(post.id);
                if (Date.now() - lastTap >= 300) {
                  navigate(`/reel/${post.id}`);
                }
              }}
            >
              <img
                src={post.image}
                alt={`${post.tool} by ${post.creator.username}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Double Tap Like Animation */}
              {doubleTapPostId === post.id && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <FavouriteIcon
                    size={120}
                    color="#ffffff"
                    className="fill-current animate-like-burst drop-shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(post.id)}
                    className="relative flex items-center gap-2 transition-all duration-300 group"
                  >
                    {/* Glow effect on interaction */}
                    {animatingAction?.postId === post.id && animatingAction.action === 'like' && (
                      <div
                        className="absolute inset-0 -m-2 rounded-full animate-pulse-ring"
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #f87171)',
                          opacity: 0.6,
                          filter: 'blur(8px)',
                        }}
                      />
                    )}
                    <FavouriteIcon
                      size={26}
                      color={postLiked ? '#ef4444' : '#ffffff'}
                      className={`transition-all duration-300 relative z-10 ${
                        postLiked ? 'fill-current' : ''
                      } ${
                        animatingAction?.postId === post.id && animatingAction.action === 'like'
                          ? 'animate-bounce-in'
                          : ''
                      } ${
                        !postLiked ? 'group-hover:scale-110' : ''
                      }`}
                    />
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => {
                      setAnimatingAction({ postId: post.id, action: 'comment' });
                      setTimeout(() => setAnimatingAction(null), 600);
                      navigate(`/reel/${post.id}`);
                    }}
                    className="relative flex items-center gap-2 transition-all duration-300 group"
                  >
                    {animatingAction?.postId === post.id && animatingAction.action === 'comment' && (
                      <div
                        className="absolute inset-0 -m-2 rounded-full animate-pulse-ring"
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          opacity: 0.6,
                          filter: 'blur(8px)',
                        }}
                      />
                    )}
                    <Message01Icon
                      size={26}
                      color="#ffffff"
                      className={`transition-all duration-300 relative z-10 group-hover:scale-110 ${
                        animatingAction?.postId === post.id && animatingAction.action === 'comment'
                          ? 'animate-bounce-in'
                          : ''
                      }`}
                    />
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(post)}
                    className="relative flex items-center gap-2 transition-all duration-300 group"
                  >
                    {animatingAction?.postId === post.id && animatingAction.action === 'share' && (
                      <div
                        className="absolute inset-0 -m-2 rounded-full animate-pulse-ring"
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #34d399)',
                          opacity: 0.6,
                          filter: 'blur(8px)',
                        }}
                      />
                    )}
                    <Share08Icon
                      size={26}
                      color="#ffffff"
                      className={`transition-all duration-300 relative z-10 group-hover:scale-110 ${
                        animatingAction?.postId === post.id && animatingAction.action === 'share'
                          ? 'animate-bounce-in'
                          : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => handleBookmark(post.id)}
                  className="relative transition-all duration-300 group"
                >
                  {animatingAction?.postId === post.id && animatingAction.action === 'bookmark' && (
                    <div
                      className="absolute inset-0 -m-2 rounded-full animate-pulse-ring"
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                        opacity: 0.6,
                        filter: 'blur(8px)',
                      }}
                    />
                  )}
                  <BookmarkAdd01Icon
                    size={26}
                    color={postSaved ? '#f59e0b' : '#ffffff'}
                    className={`transition-all duration-300 relative z-10 ${
                      postSaved ? 'fill-current' : ''
                    } ${
                      animatingAction?.postId === post.id && animatingAction.action === 'bookmark'
                        ? 'animate-bounce-in'
                        : ''
                    } ${
                      !postSaved ? 'group-hover:scale-110' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Likes Count */}
              <div className="mb-2">
                <span className="font-semibold text-white text-sm">
                  {likeCount.toLocaleString()} likes
                </span>
              </div>

              {/* Tool Badge Chip */}
              <div className="mb-3">
                <button
                  onClick={() => navigate('/tools')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <SparklesIcon size={14} color="#ffffff" />
                  <span className="text-xs font-semibold text-white relative z-10">
                    {post.tool}
                  </span>
                </button>
              </div>

              {/* Comments Link */}
              {commentCount > 0 && (
                <button
                  onClick={() => navigate(`/reel/${post.id}`)}
                  className="text-sm text-dark-500 hover:text-dark-600 transition-colors"
                >
                  View all {commentCount} comments
                </button>
              )}
            </div>
          </article>
          );
        })}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Report Modal */}
      {reportingPost && (
        <ReportModal
          isOpen={reportModalOpen}
          onClose={handleCloseReport}
          postId={reportingPost.id}
          username={reportingPost.creator.username}
        />
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes like-burst {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.2;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-like-burst {
          animation: like-burst 0.6s ease-out;
        }

        .animate-pulse-ring {
          animation: pulse-ring 0.6s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
};

export default DiscoveryFeed;
