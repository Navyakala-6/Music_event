document.addEventListener('DOMContentLoaded', function() {
  // Dropdown logic
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    function closeFab(){ if(fabMenu) fabMenu.classList.remove('open'); if(fabToggle) fabToggle.setAttribute('aria-expanded','false'); }
    function closeLogin(){ if(loginMenu) loginMenu.classList.remove('open'); if(loginMenuToggle) loginMenuToggle.setAttribute('aria-expanded','false'); }

    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('open');
      // if opening menu, close others
      if(isOpen){ closeFab(); closeLogin(); }
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && e.target !== menuToggle) {
        menu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Populate the menu with A-Z alphabet options and make it scrollable
    function populateAlphabetMenu(){
      // clear existing contents
      while(menu.firstChild) menu.removeChild(menu.firstChild);
      const fragment = document.createDocumentFragment();
      for(let i=0;i<26;i++){
        const letter = String.fromCharCode(65 + i);
        const btn = document.createElement('button');
        btn.className = 'menu-item';
        btn.type = 'button';
        btn.textContent = letter;
        btn.setAttribute('data-letter', letter);
        fragment.appendChild(btn);
      }
      menu.appendChild(fragment);

      // style the menu to cover half width and half height of viewport and be scrollable
      try{
        menu.style.boxSizing = 'border-box';
        // set width to half of the present/computed dropdown width
        const computedWidth = parseFloat(window.getComputedStyle(menu).width) || 260;
        const halfWidth = Math.round(computedWidth / 2) || 130;
        menu.style.width = halfWidth + 'px';
        menu.style.maxWidth = halfWidth + 'px';
        menu.style.maxHeight = Math.round(window.innerHeight / 2) + 'px';
        menu.style.overflowY = 'auto';
        menu.style.overflowX = 'hidden';
      }catch(_){ }
    }

    // initial populate
    populateAlphabetMenu();
    // recompute on resize
    window.addEventListener('resize', function(){ populateAlphabetMenu(); });
  }

  const fabToggle = document.getElementById('fabToggle');
  const fabMenu = document.getElementById('fabMenu');
  if (fabToggle && fabMenu) {
    function closeMenu(){ if(menu) menu.classList.remove('open'); if(menuToggle) menuToggle.setAttribute('aria-expanded','false'); }
    function closeLogin(){ if(loginMenu) loginMenu.classList.remove('open'); if(loginMenuToggle) loginMenuToggle.setAttribute('aria-expanded','false'); }

    fabToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = fabMenu.classList.toggle('open');
      // if opening fab, close others
      if(isOpen){ closeMenu(); closeLogin(); }
      fabToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function(e) {
      if (!fabMenu.contains(e.target) && e.target !== fabToggle) {
        fabMenu.classList.remove('open');
        fabToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile sidebar swipe logic (attach listeners to main content area for global swipe)
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
  // Attach listeners to main content area for swipe detection
  const mainContent = document.querySelector('main.content');
  if (mainContent) {
    mainContent.addEventListener('touchstart', handleTouchStart);
    mainContent.addEventListener('touchmove', handleTouchMove);
    mainContent.addEventListener('touchend', handleTouchEnd);
  }

  // Login dropdown logic
  const loginMenuToggle = document.getElementById('loginMenuToggle');
  const loginMenu = document.getElementById('loginMenu');
  if (loginMenuToggle && loginMenu) {
    function closeMenu(){ if(menu) menu.classList.remove('open'); if(menuToggle) menuToggle.setAttribute('aria-expanded','false'); }
    function closeFab(){ if(fabMenu) fabMenu.classList.remove('open'); if(fabToggle) fabToggle.setAttribute('aria-expanded','false'); }

    loginMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = loginMenu.classList.toggle('open');
      // if opening login menu, close others
      if(isOpen){ closeMenu(); closeFab(); }
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

