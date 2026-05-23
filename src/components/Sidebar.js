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
      { type: 'image', src: 'assets/Piano/WhatsApp Image 2025-11-22 at 14.17.55_aacab3db.jpg', title: 'Piano 1', description: 'Piano' },
      { type: 'image', src: 'assets/Piano/WhatsApp Image 2025-11-22 at 14.17.56_b726d2c3.jpg', title: 'Piano 2', description: 'Piano' },
      { type: 'image', src: 'assets/Piano/WhatsApp Image 2025-11-22 at 14.17.56_6ebf8e76.jpg', title: 'Piano 3', description: 'Piano' }
    ],
    'Guitar': [
      { type: 'image', src: 'assets/Guitar/WhatsApp Image 2025-11-22 at 14.31.49_14c19661.jpg', title: 'Guitar 1', description: 'Guitar' },
      { type: 'image', src: 'assets/Guitar/WhatsApp Image 2025-11-22 at 14.31.49_7c881c60.jpg', title: 'Guitar 2', description: 'Guitar' },
      { type: 'image', src: 'assets/Guitar/WhatsApp Image 2025-11-22 at 14.31.50_46fc9ccd.jpg', title: 'Guitar 3', description: 'Guitar' }
    ],
    'Violin': [
      { type: 'image', src: 'assets/Violin/WhatsApp Image 2025-11-22 at 14.31.51_c63d7995.jpg', title: 'Violin 1', description: 'Violin' },
      { type: 'image', src: 'assets/Violin/WhatsApp Image 2025-11-22 at 14.31.51_4fdc6638.jpg', title: 'Violin 2', description: 'Violin' },
      { type: 'image', src: 'assets/Violin/WhatsApp Image 2025-11-22 at 14.31.50_92a947a6.jpg', title: 'Violin 3', description: 'Violin' }
    ],
    'Trumpet': [
      { type: 'image', src: 'assets/Trumpet/WhatsApp Image 2025-11-22 at 14.31.52_e8df4a95.jpg', title: 'Trumpet 1', description: 'Trumpet' },
      { type: 'image', src: 'assets/Trumpet/WhatsApp Image 2025-11-22 at 14.31.52_fbc64624.jpg', title: 'Trumpet 2', description: 'Trumpet' },
      { type: 'image', src: 'assets/Trumpet/WhatsApp Image 2025-11-22 at 14.31.53_d1d46468.jpg', title: 'Trumpet 3', description: 'Trumpet' }
    ],
    'Saxophone': [
      { type: 'image', src: 'assets/Saxophone/WhatsApp Image 2025-11-22 at 14.31.54_5239ac92.jpg', title: 'Sax 1', description: 'Saxophone' },
      { type: 'image', src: 'assets/Saxophone/WhatsApp Image 2025-11-22 at 14.31.53_4e308af9.jpg', title: 'Sax 2', description: 'Saxophone' },
      { type: 'image', src: 'assets/Saxophone/WhatsApp Image 2025-11-22 at 14.31.54_96259198.jpg', title: 'Sax 3', description: 'Saxophone' }
    ],
    'Drums': [
      { type: 'image', src: 'assets/Drums/WhatsApp Image 2025-11-22 at 14.31.55_26bbb54c.jpg', title: 'Drum 1', description: 'Drums' },
      { type: 'image', src: 'assets/Drums/WhatsApp Image 2025-11-22 at 14.31.55_c097ec9c.jpg', title: 'Drum 2', description: 'Drums' },
      { type: 'image', src: 'assets/Drums/WhatsApp Image 2025-11-22 at 14.31.56_546b306a.jpg', title: 'Drum 3', description: 'Drums' }
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
