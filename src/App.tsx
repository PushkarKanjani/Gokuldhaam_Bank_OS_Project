import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import LoadingTransition from './components/LoadingTransition';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PayPage from './pages/PayPage';
import BalancePage from './pages/BalancePage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { user, loading } = useAuth();
  const [showTransition, setShowTransition] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (user && !showTransition && !isTransitionComplete) {
    setShowTransition(true);
  }

  if (showTransition && !isTransitionComplete) {
    return (
      <LoadingTransition
        onComplete={() => {
          setShowTransition(false);
          setIsTransitionComplete(true);
        }}
      />
    );
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'pay':
        return <PayPage onNavigate={handleNavigate} />;
      case 'balance':
        return <BalancePage />;
      case 'history':
        return <TransactionHistoryPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}

export default App;
