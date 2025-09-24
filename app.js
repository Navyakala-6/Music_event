document.addEventListener('DOMContentLoaded', function() {
  // Dropdown logic
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && e.target !== menuToggle) {
        menu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const fabToggle = document.getElementById('fabToggle');
  const fabMenu = document.getElementById('fabMenu');
  if (fabToggle && fabMenu) {
    fabToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = fabMenu.classList.toggle('open');
      fabToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function(e) {
      if (!fabMenu.contains(e.target) && e.target !== fabToggle) {
        fabMenu.classList.remove('open');
        fabToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile sidebar swipe logic (attach listeners outside dropdown logic)
  let touchStartX = null;
  let touchEndX = null;
  const sidebar = document.querySelector('.sidebar');
  const sidebarBarToggle = document.getElementById('sidebarBarToggle');
  function handleTouchStart(e) {
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
    }
  }
  function handleTouchMove(e) {
    if (e.touches && e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
    }
  }
  function handleTouchEnd() {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchEndX - touchStartX;
      // Swipe right to expand sidebar
      if (diff > 60 && window.innerWidth <= 900) {
        sidebar.classList.add('expanded');
        if (sidebarBarToggle) sidebarBarToggle.classList.add('hide');
      }
      // Swipe left to collapse sidebar
      if (diff < -60 && window.innerWidth <= 900) {
        sidebar.classList.remove('expanded');
        if (sidebarBarToggle) sidebarBarToggle.classList.remove('hide');
      }
    }
    touchStartX = null;
    touchEndX = null;
  }
  // Attach listeners to sidebar toggle bar and sidebar for swipe detection
  if (sidebarBarToggle) {
    sidebarBarToggle.addEventListener('touchstart', handleTouchStart);
    sidebarBarToggle.addEventListener('touchmove', handleTouchMove);
    sidebarBarToggle.addEventListener('touchend', handleTouchEnd);
  }
  if (sidebar) {
    sidebar.addEventListener('touchstart', handleTouchStart);
    sidebar.addEventListener('touchmove', handleTouchMove);
    sidebar.addEventListener('touchend', handleTouchEnd);
  }

  // Login dropdown logic
  const loginMenuToggle = document.getElementById('loginMenuToggle');
  const loginMenu = document.getElementById('loginMenu');
  if (loginMenuToggle && loginMenu) {
    loginMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = loginMenu.classList.toggle('open');
      loginMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function(e) {
      if (!loginMenu.contains(e.target) && e.target !== loginMenuToggle) {
        loginMenu.classList.remove('open');
        loginMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Instrument rendering
  const listEl = document.getElementById('instrumentList');
  const instruments = [
    { id: 'piano', name: 'Piano', emoji: '🎹' },
    { id: 'guitar', name: 'Guitar', emoji: '🎸' },
    { id: 'violin', name: 'Violin', emoji: '🎻' },
    { id: 'trumpet', name: 'Trumpet', emoji: '🎺' },
    { id: 'saxophone', name: 'Saxophone', emoji: '🎷' },
    { id: 'drum', name: 'Drums', emoji: '🥁' },
    { id: 'microphone', name: 'Vocal', emoji: '🎤' },
    { id: 'accordion', name: 'Accordion', emoji: '🪗' },
    { id: 'banjo', name: 'Banjo', emoji: '🪕' },
    { id: 'flute', name: 'Flute', emoji: '🪈' },
    { id: 'harp', name: 'Harp', emoji: '🎼' },
    { id: 'clarinet', name: 'Clarinet', emoji: '🎶' },
    { id: 'cello', name: 'Cello', emoji: '🎼' },
    { id: 'tabla', name: 'Tabla', emoji: '🪘' },
    { id: 'trombone', name: 'Trombone', emoji: '🎼' },
    { id: 'bass', name: 'Bass', emoji: '🎼' },
    { id: 'harmonica', name: 'Harmonica', emoji: '🎼' }
  ];
  listEl.innerHTML = '';
  instruments.forEach(function(inst) {
    const li = document.createElement('li');
    li.className = 'instrument-item';
    li.setAttribute('data-id', inst.id);
    const emoji = document.createElement('span');
    emoji.className = 'instrument-emoji';
    emoji.textContent = inst.emoji;
    const name = document.createElement('span');
    name.className = 'instrument-name';
    name.textContent = inst.name;
    li.appendChild(emoji);
    li.appendChild(name);
    listEl.appendChild(li);
  });
});

