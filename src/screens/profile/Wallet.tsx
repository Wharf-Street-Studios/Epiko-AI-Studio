import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { BottomNavigation } from '../../components/ui';
import {
  ArrowLeft01Icon,
  Coins01Icon,
  SparklesIcon,
  CrownIcon,
  ChartLineData01Icon,
  CheckmarkCircle02Icon
} from 'hugeicons-react';

const tokenPackages = [
  { tokens: 100, price: 4.99, bonus: 0, popular: false },
  { tokens: 500, price: 19.99, bonus: 50, popular: true },
  { tokens: 1000, price: 34.99, bonus: 150, popular: false },
  { tokens: 2500, price: 79.99, bonus: 500, popular: false },
];

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { balance, transactions, purchaseTokens } = useTokens();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePurchase = (tokens: number, price: number) => {
    if (confirm(`Purchase ${tokens} Epiko Tokens for $${price}?`)) {
      purchaseTokens(tokens);
      alert('Purchase successful!');
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:bg-dark-150 transition-colors"
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
              <p className="text-sm text-white/80 mb-2 font-medium">Current Balance</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Coins01Icon size={48} color="#ffffff" />
                <span className="text-6xl font-bold text-white">{balance}</span>
              </div>
              <p className="text-sm text-white/80 font-medium">Epiko Tokens</p>
            </div>
          </div>
        </div>

        {/* Token Packages */}
        <div className="px-4 pb-6">
          <h2 className="text-lg font-bold text-white mb-4">Purchase Tokens</h2>
          <div className="grid grid-cols-2 gap-3">
            {tokenPackages.map((pkg) => (
              <button
                key={pkg.tokens}
                onClick={() => handlePurchase(pkg.tokens + pkg.bonus, pkg.price)}
                className={`relative rounded-3xl p-5 text-center transition-all active:scale-95 ${
                  pkg.popular
                    ? 'bg-white text-black'
                    : 'bg-dark-100 text-white border border-dark-100 hover:bg-dark-150'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <div className="mb-3">
                  <Coins01Icon
                    size={40}
                    color={pkg.popular ? '#000000' : '#ffffff'}
                  />
                </div>
                <p className={`text-3xl font-bold mb-1 ${pkg.popular ? 'text-black' : 'text-white'}`}>
                  {pkg.tokens}
                  {pkg.bonus > 0 && (
                    <span className="text-sm text-green-500"> +{pkg.bonus}</span>
                  )}
                </p>
                <p className={`text-xs mb-4 ${pkg.popular ? 'text-gray-600' : 'text-dark-500'}`}>
                  Epiko Tokens
                </p>
                <div className={`font-bold text-lg ${pkg.popular ? 'text-black' : 'text-white'}`}>
                  ${pkg.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Token Uses */}
        <div className="px-4 pb-6">
          <h2 className="text-lg font-bold text-white mb-4">How to Use Tokens</h2>
          <div className="bg-dark-100 rounded-3xl p-5 space-y-4 border border-dark-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-150 rounded-2xl flex items-center justify-center flex-shrink-0">
                <SparklesIcon size={24} color="#ffffff" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm mb-0.5">AI Tools</p>
                <p className="text-sm text-dark-500">10-15 tokens per creation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-150 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CrownIcon size={24} color="#ffffff" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm mb-0.5">Premium Templates</p>
                <p className="text-sm text-dark-500">Unlock exclusive styles</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-150 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ChartLineData01Icon size={24} color="#ffffff" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm mb-0.5">Boost Visibility</p>
                <p className="text-sm text-dark-500">Promote your creations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-150 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckmarkCircle02Icon size={24} color="#ffffff" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm mb-0.5">Extra Generations</p>
                <p className="text-sm text-dark-500">Beyond daily limits</p>
              </div>
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
