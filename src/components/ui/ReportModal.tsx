import React, { useState } from 'react';
import {
  Cancel01Icon,
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  SpamIcon,
  Alert02Icon,
  UserBlock01Icon,
  Sword01Icon,
  CopyrightIcon,
  MoreHorizontalIcon
} from 'hugeicons-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  username: string;
}

const reportReasons = [
  { id: 'spam', label: 'Spam or misleading', Icon: SpamIcon },
  { id: 'inappropriate', label: 'Inappropriate content', Icon: Alert02Icon },
  { id: 'harassment', label: 'Harassment or hate speech', Icon: UserBlock01Icon },
  { id: 'violence', label: 'Violence or dangerous content', Icon: Sword01Icon },
  { id: 'copyright', label: 'Copyright violation', Icon: CopyrightIcon },
  { id: 'other', label: 'Other', Icon: MoreHorizontalIcon },
];

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, postId, username }) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReported, setIsReported] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsReported(true);

    // Close after showing success message
    setTimeout(() => {
      onClose();
      setIsReported(false);
      setSelectedReason(null);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up flex justify-center">
        <div
          className="bg-black/80 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl shadow-2xl w-full max-w-md"
          style={{
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          }}
        >
          {/* Handle Bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-white/30 rounded-full" />
          </div>

          <div className="px-6 pb-8 pb-safe">
            {!isReported ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white drop-shadow-lg">Report Post</h2>
                    <p className="text-sm text-white/60 mt-1">by @{username}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
                  >
                    <Cancel01Icon size={24} color="#ffffff" />
                  </button>
                </div>

                {/* Report Reasons */}
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-semibold text-white/80 mb-3">Why are you reporting this?</p>
                  {reportReasons.map((reason) => {
                    const ReasonIcon = reason.Icon;
                    return (
                      <button
                        key={reason.id}
                        onClick={() => setSelectedReason(reason.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                          selectedReason === reason.id
                            ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-2 border-red-400/50 scale-[0.98]'
                            : 'bg-white/10 border border-white/20 hover:bg-white/15'
                        }`}
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          selectedReason === reason.id ? 'bg-red-500/20' : 'bg-white/10'
                        }`}>
                          <ReasonIcon
                            size={24}
                            color={selectedReason === reason.id ? '#ef4444' : '#ffffff'}
                          />
                        </div>
                        <span className="font-medium text-white text-left flex-1">{reason.label}</span>
                        {selectedReason === reason.id && (
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                            <CheckmarkCircle01Icon size={16} color="#ffffff" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!selectedReason || isSubmitting}
                  className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
                    selectedReason && !isSubmitting
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 active:scale-98 shadow-lg'
                      : 'bg-white/10 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>

                {/* Info */}
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                  <div className="flex gap-2">
                    <AlertCircleIcon size={20} color="#60a5fa" className="flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-200">
                      Your report is anonymous. We'll review it and take appropriate action if needed.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <CheckmarkCircle01Icon size={48} color="#ffffff" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Report Submitted</h3>
                <p className="text-white/70">Thank you for helping keep our community safe</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
};

export default ReportModal;
