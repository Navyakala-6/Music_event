import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import BottomBoxes from './components/BottomBoxes';
import FAB from './components/FAB';
import MusicBackground from './components/MusicBackground';
import AuthProvider, { useAuth } from './components/AuthProvider';
import LandingPage from './components/LandingPage';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { getAssetsForFolder, getShuffledAllAssets } from './utils/assets';
import { WishlistProvider } from './components/WishlistContext';

function MainApp() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(() => getShuffledAllAssets());
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleMenuSelect = (folder) => {
    setCurrentMedia(getAssetsForFolder(folder));
  };

  const handleInstrumentSelect = (folder) => {
    setCurrentMedia(getAssetsForFolder(folder));
  };

  const handleHomeClick = () => {
    setCurrentMedia(getShuffledAllAssets());
  };

  const handleWishlistSelect = (item) => {
    setCurrentMedia([item]);
  };

  return (
    <div className="App">
      <Topbar
        onLogout={handleLogout}
        onMenuSelect={handleMenuSelect}
        onHomeClick={handleHomeClick}
        onWishlistSelect={handleWishlistSelect}
        onAuthAction={(mode) => {
          // mode: 'login' | 'signup'
          window.location.href = `${process.env.PUBLIC_URL || ''}/?auth=${mode}`;
        }}
      />
      <div className="layout">
        <Sidebar
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          onInstrumentSelect={handleInstrumentSelect}
        />
        <Content mediaAssets={currentMedia} />
      </div>
      <BottomBoxes onBoxSelect={setCurrentMedia} />
      <FAB />
      <MusicBackground />
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/app" replace /> : <LandingPage />}
      />
      <Route
        path="/app"
        element={
          user ? (
            <WishlistProvider>
              <MainApp />
            </WishlistProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  // eslint-disable-next-line no-undef

  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <AppRoutes />
        <div className='footerLanding'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MailIcon />
            <label>navyakalayatham@gmail.com</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PhoneIcon />
            <label>9876543210</label>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
