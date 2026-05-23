import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Content from './Content';
import BottomBoxes from './BottomBoxes';
import FAB from './FAB';
import MusicBackground from './MusicBackground';
import { getAssetsForFolder, getShuffledAllAssets } from '../utils/assets';
import { useAuth } from './AuthProvider';
import { useState } from 'react';

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

  const handleHomeClick = () => {
    setCurrentMedia(getAssetsForFolder('all'));
  };

  const handleInstrumentSelect = (folder) => {
    setCurrentMedia(getAssetsForFolder(folder));
    setSidebarExpanded(false);
  };

  const handleBoxSelect = (folder) => {
    setCurrentMedia(getAssetsForFolder(folder));
  };

  return (
    <div className="App">
      <Topbar 
        onLogout={handleLogout} 
        onMenuSelect={handleMenuSelect} 
        onHomeClick={handleHomeClick} 
      />
      <div className="layout">
        <Sidebar
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          onInstrumentSelect={handleInstrumentSelect}
        />
        <Content mediaAssets={currentMedia} />
      </div>
      <BottomBoxes onBoxSelect={handleBoxSelect} />
      <FAB />
      <MusicBackground />
    </div>
  );
}

export default MainApp;

