import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '../../context/TokenContext';
import { BottomNavigation } from '../../components/ui';
import {
  ArrowLeft01Icon,
  Coins01Icon,
  SparklesIcon,
  Wallet03Icon,
  CreditCardIcon,
  SmartPhone01Icon
} from 'hugeicons-react';

// Credit packages with INR pricing
const creditPackages = [
  { credits: 20, inr: 99, epikoTokens: 100, popular: false },
  { credits: 50, inr: 199, epikoTokens: 200, popular: false },
  { credits: 100, inr: 349, epikoTokens: 350, popular: true },
  { credits: 250, inr: 749, epikoTokens: 750, popular: false },
  { credits: 500, inr: 1299, epikoTokens: 1400, popular: false },
];

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { balance, transactions, purchaseCredits } = useCredits();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof creditPackages[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePurchaseClick = (pkg: typeof creditPackages[0]) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  const handleTokenPurchase = (credits: number, epikoTokens: number) => {
    if (confirm(`Purchase ${credits} AI Credits for ${epikoTokens} EPIKO Tokens?\n\nThis will connect your wallet to complete the transaction.`)) {
      // In production, this would integrate with WalletConnect
      purchaseCredits(credits, epikoTokens);
      alert(`✓ Purchase successful!\n\n${credits} AI Credits have been added to your balance.`);
      setShowPaymentModal(false);
    }
  };

  const handleCardPayment = async () => {
    if (!selectedPackage) return;

    setIsProcessing(true);

    try {
      // Create order on backend
      const response = await fetch('http://localhost:5001/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credits: selectedPackage.credits,
          amount: selectedPackage.inr
        })
      });

      const { orderId, amount } = await response.json();

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay key
        amount: amount,
        currency: 'INR',
        name: 'Epiko AI Studio',
        description: `${selectedPackage.credits} AI Credits`,
        order_id: orderId,
        handler: function (response: any) {
          // Payment successful
          purchaseCredits(selectedPackage.credits, 0);
          alert(`✓ Payment successful!\n\n${selectedPackage.credits} AI Credits added to your balance.`);
          setShowPaymentModal(false);
          setIsProcessing(false);
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        theme: {
          color: '#a855f7'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleUPIPayment = async () => {
    if (!selectedPackage) return;

    setIsProcessing(true);

    try {
      // Create order on backend
      const response = await fetch('http://localhost:5001/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credits: selectedPackage.credits,
          amount: selectedPackage.inr
        })
      });

      const { orderId, amount } = await response.json();

      // Initialize Razorpay with UPI as preferred method
      const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay key
        amount: amount,
        currency: 'INR',
        name: 'Epiko AI Studio',
        description: `${selectedPackage.credits} AI Credits`,
        order_id: orderId,
        handler: function (response: any) {
          // Payment successful
          purchaseCredits(selectedPackage.credits, 0);
          alert(`✓ Payment successful!\n\n${selectedPackage.credits} AI Credits added to your balance.`);
          setShowPaymentModal(false);
          setIsProcessing(false);
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        method: {
          upi: true
        },
        theme: {
          color: '#a855f7'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:bg-white/30 transition-all backdrop-blur-xl border border-white/10"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Wallet</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Balance Display */}
        <div className="p-4 pt-6">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <p className="text-sm text-white/80 mb-2 font-medium">AI Credits Balance</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <SparklesIcon size={48} color="#ffffff" />
                <span className="text-6xl font-bold text-white">{balance}</span>
              </div>
              <p className="text-sm text-white/80 font-medium">Available Credits</p>
            </div>
          </div>
        </div>

        {/* Wallet Connect Banner */}
        <div className="px-4 pb-6">
          <div className="bg-dark-100 rounded-3xl p-5 border border-dark-200">
            <div className="flex items-center gap-3 mb-3">
              <Wallet03Icon size={24} color="#ffffff" />
              <h3 className="text-base font-bold text-white">EPIKO Token Payment</h3>
            </div>
            <p className="text-sm text-dark-500 mb-3">
              Purchase AI Credits using EPIKO Tokens from your connected wallet
            </p>
            <button
              className="w-full text-white font-semibold py-2.5 rounded-xl border border-white/20 hover:bg-white/20 active:scale-98 transition-all backdrop-blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              Connect Wallet
            </button>
          </div>
        </div>

        {/* Credit Packages */}
        <div className="px-4 pb-6">
          <h2 className="text-lg font-bold text-white mb-4">Buy AI Credits</h2>
          <div className="grid grid-cols-2 gap-3">
            {creditPackages.map((pkg) => (
              <button
                key={pkg.credits}
                onClick={() => handlePurchaseClick(pkg)}
                className={`relative rounded-3xl p-5 text-center transition-all active:scale-95 backdrop-blur-xl ${
                  pkg.popular
                    ? 'bg-white text-black'
                    : 'text-white border border-white/10 hover:bg-white/20'
                }`}
                style={!pkg.popular ? {
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                } : undefined}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BEST VALUE
                  </div>
                )}
                <div className="mb-3">
                  <Coins01Icon
                    size={40}
                    color={pkg.popular ? '#000000' : '#fbbf24'}
                  />
                </div>
                <p className={`text-3xl font-bold mb-1 ${pkg.popular ? 'text-black' : 'text-white'}`}>
                  {pkg.credits}
                </p>
                <p className={`text-xs mb-3 ${pkg.popular ? 'text-gray-600' : 'text-dark-500'}`}>
                  AI Credits
                </p>
                <div className={`flex items-center justify-center gap-1.5 ${pkg.popular ? 'text-black' : 'text-white'}`}>
                  <span className="font-bold text-lg">₹{pkg.inr}</span>
                </div>
                <p className={`text-xs mt-1 ${pkg.popular ? 'text-gray-600' : 'text-dark-500'}`}>
                  via Card/UPI
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedPackage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 max-w-md w-full border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Purchase Credits</h3>
              <p className="text-white/70 text-sm mb-6">
                {selectedPackage.credits} AI Credits for ₹{selectedPackage.inr}
              </p>

              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleCardPayment}
                  disabled={isProcessing}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <CreditCardIcon size={24} color="#ffffff" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-white text-sm">Credit/Debit Card</p>
                      <p className="text-xs text-white/60">Visa, Mastercard, Rupay</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleUPIPayment}
                  disabled={isProcessing}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <SmartPhone01Icon size={24} color="#ffffff" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-white text-sm">UPI Payment</p>
                      <p className="text-xs text-white/60">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleTokenPurchase(selectedPackage.credits, selectedPackage.epikoTokens)}
                  disabled={isProcessing}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Wallet03Icon size={24} color="#ffffff" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-white text-sm">EPIKO Tokens</p>
                      <p className="text-xs text-white/60">{selectedPackage.epikoTokens} Tokens</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessing}
                className="w-full bg-white/5 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
              >
                Cancel
              </button>

              {isProcessing && (
                <div className="mt-4 text-center">
                  <div className="inline-block w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <p className="text-white/70 text-sm mt-2">Processing payment...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Credit Uses */}
        <div className="px-4 pb-6">
          <h2 className="text-lg font-bold text-white mb-4">Credit Cost Per Tool</h2>
          <div className="bg-dark-100 rounded-3xl p-5 space-y-3 border border-dark-100">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Face Swap</span>
              <span className="text-white font-bold">1 Credit</span>
            </div>
            <div className="h-px bg-dark-150" />
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">HD Enhance</span>
              <span className="text-white font-bold">1 Credit</span>
            </div>
            <div className="h-px bg-dark-150" />
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">AI Avatar</span>
              <span className="text-white font-bold">2 Credits</span>
            </div>
            <div className="h-px bg-dark-150" />
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Age Transform</span>
              <span className="text-white font-bold">2 Credits</span>
            </div>
            <div className="h-px bg-dark-150" />
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">AR Filters</span>
              <span className="text-white font-bold">2 Credits</span>
            </div>
            <div className="h-px bg-dark-150" />
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Duo Portrait</span>
              <span className="text-white font-bold">3 Credits</span>
            </div>
            <div className="h-px bg-dark-150" />
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Poster Maker</span>
              <span className="text-white font-bold">3 Credits</span>
            </div>
            <div className="h-px bg-dark-150" />
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">AR Posters</span>
              <span className="text-white font-bold">3 Credits</span>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        {transactions.length > 0 && (
          <div className="px-4 pb-6">
            <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
            <div className="bg-dark-100 rounded-3xl overflow-hidden border border-dark-100">
              {transactions.slice(0, 10).map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`p-4 flex items-center justify-between ${
                    index !== 0 ? 'border-t border-dark-150' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-dark-150 rounded-full flex items-center justify-center flex-shrink-0">
                      <Coins01Icon
                        size={20}
                        color={transaction.type === 'spend' ? '#ef4444' : '#22c55e'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-dark-500">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-bold text-base flex-shrink-0 ml-3 ${
                      transaction.type === 'spend' ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {transaction.type === 'spend' ? '-' : '+'}
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Wallet;
