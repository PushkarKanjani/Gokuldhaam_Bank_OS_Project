import { Eye, EyeOff, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function BalancePage() {
  const { profile } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(balance);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Balance</h1>
        <p className="text-gray-600">View your current account balance</p>
      </div>

      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-100 text-sm mb-1">Gokuldhaam Bank</p>
            <p className="text-blue-100 text-xs">Savings Account</p>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-all"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>

        <div className="mb-8">
          <p className="text-blue-100 text-sm mb-2">Available Balance</p>
          <h2 className="text-5xl font-bold mb-1">
            {showBalance ? formatBalance(profile?.balance || 0) : '₹ ••••••'}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
          <div>
            <p className="text-blue-100 text-xs mb-1">Account Number</p>
            <p className="font-semibold">{profile?.account_number}</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs mb-1">Account Holder</p>
            <p className="font-semibold">{profile?.full_name}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Active</h3>
          </div>
          <p className="text-sm text-gray-600">Account Status</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">INR</span>
            </div>
            <h3 className="font-semibold text-gray-800">Indian Rupee</h3>
          </div>
          <p className="text-sm text-gray-600">Currency</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold">24/7</span>
            </div>
            <h3 className="font-semibold text-gray-800">Available</h3>
          </div>
          <p className="text-sm text-gray-600">Access</p>
        </div>
      </div>
    </div>
  );
}
