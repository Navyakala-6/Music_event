import React, { useState, useRef, useEffect } from 'react';

function Sidebar({ expanded, setExpanded, onInstrumentSelect }) {
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const sidebarRef = useRef(null);
  const barBtnRef = useRef(null);

  const instruments = [
    { id: "piano", name: "Piano", emoji: "🎹" },
    { id: "guitar", name: "Guitar", emoji: "🎸" },
    { id: "violin", name: "Violin", emoji: "🎻" },
    { id: "trumpet", name: "Trumpet", emoji: "🎺" },
    { id: "saxophone", name: "Saxophone", emoji: "🎷" },
    { id: "drum", name: "Drums", emoji: "🥁" },
    { id: "microphone", name: "Vocal", emoji: "🎤" },
    { id: "accordion", name: "Accordion", emoji: "🪗" },
    { id: "banjo", name: "Banjo", emoji: "🪕" },
    { id: "flute", name: "Flute", emoji: "🪈" },
    { id: "harp", name: "Harp", emoji: "🎼" },
    { id: "clarinet", name: "Clarinet", emoji: "🎶" },
    { id: "cello", name: "Cello", emoji: "🎼" },
    { id: "tabla", name: "Tabla", emoji: "🪘" },
    { id: "trombone", name: "Trombone", emoji: "🎼" },
    { id: "bass", name: "Bass", emoji: "🎼" },
    { id: "harmonica", name: "Harmonica", emoji: "🎼" }
  ];

  // Media manifest for instruments
  const mediaManifest = {
    'Piano': [
      { type: 'image', src: 'assets/Piano/Piano1.jpg', title: 'Piano 1', description: 'Piano' },
      { type: 'image', src: 'assets/Piano/Piano2.jpg', title: 'Piano 2', description: 'Piano' },
      { type: 'image', src: 'assets/Piano/Piano3.jpg', title: 'Piano 3', description: 'Piano' }
    ],
    'Guitar': [
      { type: 'image', src: 'assets/Guitar/Guitar1.jpg', title: 'Guitar 1', description: 'Guitar' },
      { type: 'image', src: 'assets/Guitar/Guitar2.jpg', title: 'Guitar 2', description: 'Guitar' },
      { type: 'image', src: 'assets/Guitar/Guitar3.jpg', title: 'Guitar 3', description: 'Guitar' }
    ],
    'Violin': [
      { type: 'image', src: 'assets/Violin/Violin1.jpg', title: 'Violin 1', description: 'Violin' },
      { type: 'image', src: 'assets/Violin/Violin2.jpg', title: 'Violin 2', description: 'Violin' },
      { type: 'image', src: 'assets/Violin/Violin3.jpg', title: 'Violin 3', description: 'Violin' }
    ],
    'Trumpet': [
      { type: 'image', src: 'assets/Trumpe/Trumpet1.jpg', title: 'Trumpet 1', description: 'Trumpet' },
      { type: 'image', src: 'assets/Trumpe/Trumpet2.jpg', title: 'Trumpet 2', description: 'Trumpet' },
      { type: 'image', src: 'assets/Trumpe/Trumpet3.jpg', title: 'Trumpet 3', description: 'Trumpet' }
    ],
    'Saxophone': [
      { type: 'image', src: 'assets/Saxophone/Saxophone1.jpg', title: 'Sax 1', description: 'Saxophone' },
      { type: 'image', src: 'assets/Saxophone/Saxophone2.jpg', title: 'Sax 2', description: 'Saxophone' },
      { type: 'image', src: 'assets/Saxophone/Saxophone3.jpg', title: 'Sax 3', description: 'Saxophone' }
    ],
    'Drums': [
      { type: 'image', src: 'assets/Drums/Drums1.jpg', title: 'Drum 1', description: 'Drums' },
      { type: 'image', src: 'assets/Drums/Drums2.jpg', title: 'Drum 2', description: 'Drums' },
      { type: 'image', src: 'assets/Drums/Drums3.jpg', title: 'Drum 3', description: 'Drums' }
    ]
  };

  // Create lowercase aliases
  mediaManifest['piano'] = mediaManifest['Piano'];
  mediaManifest['guitar'] = mediaManifest['Guitar'];
  mediaManifest['violin'] = mediaManifest['Violin'];
  mediaManifest['trumpet'] = mediaManifest['Trumpet'];
  mediaManifest['saxophone'] = mediaManifest['Saxophone'];
  mediaManifest['drum'] = mediaManifest['Drums'];

  useEffect(() => {
    const sidebarBarToggle = document.getElementById('sidebarBarToggle');
    const sidebar = sidebarRef.current;
    if (!sidebarBarToggle || !sidebar) return;

    let isSidebarOpen = expanded;

    const toggleSidebar = (forceState = null) => {
      if (forceState !== null) {
        isSidebarOpen = forceState;
      } else {
        isSidebarOpen = !isSidebarOpen;
      }

      setExpanded(isSidebarOpen);

      if (isSidebarOpen) {
        sidebar.classList.add("expanded");
      } else {
        sidebar.classList.remove("expanded");
      }
    };

    const handleToggleClick = () => toggleSidebar();

    // Touch/swipe handlers for mobile
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        if (deltaX > 0 && !isSidebarOpen) {
          toggleSidebar(true);
        } else if (deltaX < 0 && isSidebarOpen) {
          toggleSidebar(false);
        }
        isDragging = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    // Global touch handlers for screen swipe
    let screenStartX = 0;
    let screenStartY = 0;
    let screenDragging = false;

    const handleScreenTouchStart = (e) => {
      if (!e.touches || !e.touches[0]) return;
      screenStartX = e.touches[0].clientX;
      screenStartY = e.touches[0].clientY;
      screenDragging = true;
    };

    const handleScreenTouchMove = (e) => {
      if (!screenDragging || !e.touches || !e.touches[0]) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - screenStartX;
      const deltaY = currentY - screenStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (screenStartX < 40 && deltaX > 40 && !isSidebarOpen) {
          toggleSidebar(true);
          screenDragging = false;
        }
        if (isSidebarOpen && deltaX < -40) {
          toggleSidebar(false);
          screenDragging = false;
        }
      }
    };

    const handleScreenTouchEnd = () => { screenDragging = false; };

    const handleDocumentClick = (e) => {
      if (isSidebarOpen && !sidebar.contains(e.target) && !sidebarBarToggle.contains(e.target)) {
        toggleSidebar(false);
      }
    };

    sidebarBarToggle.addEventListener("click", handleToggleClick);
    sidebarBarToggle.addEventListener("touchstart", handleTouchStart, { passive: true });
    sidebarBarToggle.addEventListener("touchmove", handleTouchMove, { passive: true });
    sidebarBarToggle.addEventListener("touchend", handleTouchEnd, { passive: true });

    document.addEventListener('touchstart', handleScreenTouchStart, { passive: true });
    document.addEventListener('touchmove', handleScreenTouchMove, { passive: true });
    document.addEventListener('touchend', handleScreenTouchEnd, { passive: true });
    document.addEventListener("click", handleDocumentClick);

    return () => {
      sidebarBarToggle.removeEventListener("click", handleToggleClick);
      sidebarBarToggle.removeEventListener("touchstart", handleTouchStart);
      sidebarBarToggle.removeEventListener("touchmove", handleTouchMove);
      sidebarBarToggle.removeEventListener("touchend", handleTouchEnd);

      document.removeEventListener('touchstart', handleScreenTouchStart);
      document.removeEventListener('touchmove', handleScreenTouchMove);
      document.removeEventListener('touchend', handleScreenTouchEnd);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [expanded, setExpanded]);

  const handleInstrumentClick = (instrument) => {
    setSelectedInstrument(instrument.id);
    onInstrumentSelect(instrument.name);
  };

  return (
    <>
      <button
        type="button"
        className={`sidebar-bar-toggle ${expanded ? 'is-open' : ''}`}
        id="sidebarBarToggle"
        aria-label="Toggle instruments"
        aria-expanded={expanded}
      >
        <span className="mobile-toggle-track">
          <span className="mobile-toggle-thumb" ref={barBtnRef} />
        </span>
      </button>
      <aside className={`sidebar ${expanded ? 'expanded' : ''}`} ref={sidebarRef} aria-label="Instrument selector">
        <div className="sidebar-header">
          <h2>Instruments</h2>
        </div>
        <ul className="instrument-list" id="instrumentList" tabIndex="0" aria-multiselectable="true">
          {instruments.map((instrument) => (
            <li
              key={instrument.id}
              className={`instrument-item ${selectedInstrument === instrument.id ? 'selected' : ''}`}
              data-id={instrument.id}
              onClick={() => handleInstrumentClick(instrument)}
            >
              <span className="instrument-emoji">{instrument.emoji}</span>
              <span className="instrument-name">{instrument.name}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
