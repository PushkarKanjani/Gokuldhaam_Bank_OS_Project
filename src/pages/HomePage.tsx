import { useState, useEffect } from 'react';
import { Send, History, Wallet, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Contact } from '../lib/supabase';

type HomePageProps = {
  onNavigate: (page: string) => void;
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const { profile } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchRecentContacts();
  }, []);

  const fetchRecentContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('is_recent', true)
        .order('last_contacted', { ascending: false })
        .limit(5);

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const mainActions = [
    { id: 'pay', label: 'Pay', icon: Send, color: 'from-blue-500 to-blue-600' },
    { id: 'balance', label: 'Check Balance', icon: Wallet, color: 'from-orange-500 to-orange-600' },
    { id: 'history', label: 'Transaction History', icon: History, color: 'from-blue-600 to-blue-700' }
  ];

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(balance);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {profile?.full_name}
        </h1>
        <p className="text-gray-600">Manage your account and transactions</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm mb-2">Available Balance</p>
            <h2 className="text-4xl font-bold mb-4">{formatBalance(profile?.balance || 0)}</h2>
            <p className="text-blue-100 text-sm">Account: {profile?.account_number}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <User className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mainActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className={`bg-gradient-to-r ${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{action.label}</h4>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Contacts</h3>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No contacts yet
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('pay')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {contact.contact_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{contact.contact_name}</h4>
                      <p className="text-sm text-gray-600">{contact.account_number}</p>
                    </div>
                    <Send className="w-5 h-5 text-gray-400" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
