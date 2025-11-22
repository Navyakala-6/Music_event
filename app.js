// ============================================================
// MUSIC EVENTS ORGANISATION — FULL UPDATED JAVASCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const fabToggle = document.getElementById("fabToggle");
  const fabMenu = document.getElementById("fabMenu");
  const loginMenuToggle = document.getElementById("loginMenuToggle");
  const loginMenu = document.getElementById("loginMenu");
  
  // Mobile sidebar toggle functionality
  const sidebarBarToggle = document.getElementById("sidebarBarToggle");
  const sidebar = document.querySelector(".sidebar");
  const barBtn = document.getElementById("barBtn");

  /* ---------------- Alphabetic dropdown (A–Z) ---------------- */
  function populateAlphabetMenu() {
    if (!menu) return;
    // If the page already contains custom .menu-item elements (author edited HTML), keep them.
    const existing = menu.querySelectorAll('.menu-item');
    if (existing && existing.length > 0) {
      // still attach touch/mouse scroll behavior to the existing menu
      attachMenuScrollHandlers(menu);
      return;
    }

    // Default alphabet names; allow first few to be customized here
    const custom = ["Ohm", "Sri", "Chinna", "Ammu", "Moon", "Star", "Sun", "Sky"];
    const labels = [];
    for (let i = 0; i < 26; i++) {
      if (i < custom.length && custom[i]) labels.push(custom[i]);
      else labels.push(String.fromCharCode(65 + i));
    }

    menu.innerHTML = "";
    labels.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'menu-item';
      btn.textContent = label;
      menu.appendChild(btn);
    });
    attachMenuScrollHandlers(menu);
  }
  populateAlphabetMenu();

  function attachMenuScrollHandlers(menuEl) {
    if (!menuEl) return;
    let isScrolling = false;
    let startY = 0;
    let scrollTop = 0;
    menuEl.addEventListener('touchstart', (e) => {
      isScrolling = true;
      startY = e.touches[0].pageY - menuEl.offsetTop;
      scrollTop = menuEl.scrollTop;
    }, { passive: true });
    menuEl.addEventListener('touchmove', (e) => {
      if (!isScrolling) return;
      e.preventDefault();
      const y = e.touches[0].pageY - menuEl.offsetTop;
      const walk = (y - startY) * 2;
      menuEl.scrollTop = scrollTop - walk;
    }, { passive: false });
    menuEl.addEventListener('touchend', () => { isScrolling = false; }, { passive: true });
    menuEl.addEventListener('wheel', (e) => { e.preventDefault(); menuEl.scrollTop += e.deltaY; }, { passive: false });
  }

  /* ---------------- Instrument list ---------------- */
  const listEl = document.getElementById("instrumentList");
  if (listEl) {
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
    listEl.innerHTML = "";
    instruments.forEach((inst) => {
      const li = document.createElement("li");
      li.className = "instrument-item";
      li.setAttribute("data-id", inst.id);
      li.innerHTML = `<span class="instrument-emoji">${inst.emoji}</span>
                      <span class="instrument-name">${inst.name}</span>`;
      listEl.appendChild(li);
    });
  }

  /* ---------------- Bottom number boxes (1–29) ---------------- */
  const bottomBoxes = document.getElementById("bottomBoxes");
  if (bottomBoxes) {
    // If author already provided labelled boxes, keep them — otherwise create defaults
    const existingBoxes = bottomBoxes.querySelectorAll('.number-box');
    if (!existingBoxes || existingBoxes.length === 0) {
      const demoLabels = [
        'Chadi Thalinkana', 'Shiv Dhol Thasha', 'Gabra', '4....', '5', '6', '7', '8', '9', '10',
        '11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29'
      ];
      bottomBoxes.innerHTML = '';
      demoLabels.forEach(lbl => {
        const div = document.createElement('div');
        div.className = 'number-box';
        div.textContent = lbl;
        bottomBoxes.appendChild(div);
      });
    }
  }

  /* ---------------- Floating music symbols ---------------- */
  const musicBg = document.getElementById("musicBg");
  function populateMusicSymbols() {
    if (!musicBg) return;
    musicBg.innerHTML = "";
    const icons = ["🎵", "🎶", "🎷", "🎸", "🥁", "🎺", "🎻", "🎹", "🎤", "🪈", "🪗", "🎼"];
    const count = Math.max(40, Math.ceil(window.innerWidth / 30));
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = "music-symbol";
      span.textContent = icons[Math.floor(Math.random() * icons.length)];
      span.style.top = `${Math.random() * 90 + 5}%`;
      span.style.left = `${Math.random() * 94 + 3}%`;
      
      // Set CSS custom properties for floatVar animation
      for (let p = 0; p <= 4; p++) {
        const x = `${(Math.random() * 420 - 210).toFixed(1)}px`;
        const y = `${(Math.random() * 420 - 210).toFixed(1)}px`;
        const r = `${(Math.random() * 140 - 70).toFixed(1)}deg`;
        span.style.setProperty(`--x${p}`, x);
        span.style.setProperty(`--y${p}`, y);
        span.style.setProperty(`--r${p}`, r);
      }
      
      // Use floatVar animation for dynamically created symbols
      span.style.animationName = "floatVar";
      span.style.animationDuration = `${(10 + Math.random() * 12).toFixed(2)}s`;
      span.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
      musicBg.appendChild(span);
    }
  }
  populateMusicSymbols();
  window.addEventListener("resize", populateMusicSymbols);

  /* ---------------- Media manifest + dynamic loader ---------------- */
  // Generated manifest mapping folder/label -> array of media items (images/videos)
  const mediaManifest = {
    /* Bottom boxes: folders with 3 images each */
    'Chadi Thalinkana': [
      { type: 'image', src: 'assets/Chadi Thalinkana/WhatsApp Image 2025-11-22 at 14.31.56_3562779f.jpg', title: 'Chadi 1', description: 'Chadi Thalinkana' },
      { type: 'image', src: 'assets/Chadi Thalinkana/WhatsApp Image 2025-11-22 at 14.31.57_3213cb1a.jpg', title: 'Chadi 2', description: 'Chadi Thalinkana' },
      { type: 'image', src: 'assets/Chadi Thalinkana/WhatsApp Image 2025-11-22 at 14.31.57_dc91632e.jpg', title: 'Chadi 3', description: 'Chadi Thalinkana' }
    ],
    'Shiv Dhol Thasha': [
      { type: 'image', src: 'assets/Shiv Dhol Thasha/WhatsApp Image 2025-11-22 at 14.31.58_ab50abcb.jpg', title: 'Shiv 1', description: 'Shiv Dhol Thasha' },
      { type: 'image', src: 'assets/Shiv Dhol Thasha/WhatsApp Image 2025-11-22 at 14.31.58_4b4027cd.jpg', title: 'Shiv 2', description: 'Shiv Dhol Thasha' },
      { type: 'image', src: 'assets/Shiv Dhol Thasha/WhatsApp Image 2025-11-22 at 14.31.57_f192b04f.jpg', title: 'Shiv 3', description: 'Shiv Dhol Thasha' }
    ],
    'Gabra': [
      { type: 'image', src: 'assets/Gabra/WhatsApp Image 2025-11-22 at 14.31.59_12bbadca.jpg', title: 'Gabra 1', description: 'Gabra' },
      { type: 'image', src: 'assets/Gabra/WhatsApp Image 2025-11-22 at 14.32.00_2b544b10.jpg', title: 'Gabra 2', description: 'Gabra' },
      { type: 'image', src: 'assets/Gabra/WhatsApp Image 2025-11-22 at 14.31.59_12bbadca.jpg', title: 'Gabra 3', description: 'Gabra' }
    ],

    /* Instruments (map both folder name and lowercase id used in instrument list) */
    'Piano': [
      { type: 'image', src: 'assets/Piano/WhatsApp Image 2025-11-22 at 14.17.55_aacab3db.jpg', title: 'Piano 1', description: 'Piano' },
      { type: 'image', src: 'assets/Piano/WhatsApp Image 2025-11-22 at 14.17.56_b726d2c3.jpg', title: 'Piano 2', description: 'Piano' },
      { type: 'image', src: 'assets/Piano/WhatsApp Image 2025-11-22 at 14.17.56_6ebf8e76.jpg', title: 'Piano 3', description: 'Piano' }
    ],
    'piano': [] ,
    'Guitar': [
      { type: 'image', src: 'assets/Guitar/WhatsApp Image 2025-11-22 at 14.31.49_14c19661.jpg', title: 'Guitar 1', description: 'Guitar' },
      { type: 'image', src: 'assets/Guitar/WhatsApp Image 2025-11-22 at 14.31.49_7c881c60.jpg', title: 'Guitar 2', description: 'Guitar' },
      { type: 'image', src: 'assets/Guitar/WhatsApp Image 2025-11-22 at 14.31.50_46fc9ccd.jpg', title: 'Guitar 3', description: 'Guitar' }
    ],
    'guitar': [],
    'Violin': [
      { type: 'image', src: 'assets/Violin/WhatsApp Image 2025-11-22 at 14.31.51_c63d7995.jpg', title: 'Violin 1', description: 'Violin' },
      { type: 'image', src: 'assets/Violin/WhatsApp Image 2025-11-22 at 14.31.51_4fdc6638.jpg', title: 'Violin 2', description: 'Violin' },
      { type: 'image', src: 'assets/Violin/WhatsApp Image 2025-11-22 at 14.31.50_92a947a6.jpg', title: 'Violin 3', description: 'Violin' }
    ],
    'violin': [],
    'Trumpet': [
      { type: 'image', src: 'assets/Trumpet/WhatsApp Image 2025-11-22 at 14.31.52_e8df4a95.jpg', title: 'Trumpet 1', description: 'Trumpet' },
      { type: 'image', src: 'assets/Trumpet/WhatsApp Image 2025-11-22 at 14.31.52_fbc64624.jpg', title: 'Trumpet 2', description: 'Trumpet' },
      { type: 'image', src: 'assets/Trumpet/WhatsApp Image 2025-11-22 at 14.31.53_d1d46468.jpg', title: 'Trumpet 3', description: 'Trumpet' }
    ],
    'trumpet': [],
    'Saxophone': [
      { type: 'image', src: 'assets/Saxophone/WhatsApp Image 2025-11-22 at 14.31.54_5239ac92.jpg', title: 'Sax 1', description: 'Saxophone' },
      { type: 'image', src: 'assets/Saxophone/WhatsApp Image 2025-11-22 at 14.31.53_4e308af9.jpg', title: 'Sax 2', description: 'Saxophone' },
      { type: 'image', src: 'assets/Saxophone/WhatsApp Image 2025-11-22 at 14.31.54_96259198.jpg', title: 'Sax 3', description: 'Saxophone' }
    ],
    'saxophone': [],
    'Drums': [
      { type: 'image', src: 'assets/Drums/WhatsApp Image 2025-11-22 at 14.31.55_26bbb54c.jpg', title: 'Drum 1', description: 'Drums' },
      { type: 'image', src: 'assets/Drums/WhatsApp Image 2025-11-22 at 14.31.55_c097ec9c.jpg', title: 'Drum 2', description: 'Drums' },
      { type: 'image', src: 'assets/Drums/WhatsApp Image 2025-11-22 at 14.31.56_546b306a.jpg', title: 'Drum 3', description: 'Drums' }
    ],
    'drum': []
  };
  // create lowercase aliases for instrument keys so list data-id names map to correct folders
  mediaManifest['piano'] = mediaManifest['Piano'];
  mediaManifest['guitar'] = mediaManifest['Guitar'];
  mediaManifest['violin'] = mediaManifest['Violin'];
  mediaManifest['trumpet'] = mediaManifest['Trumpet'];
  mediaManifest['saxophone'] = mediaManifest['Saxophone'];
  mediaManifest['drum'] = mediaManifest['Drums'];

  function renderMediaAssets(mediaAssets) {
    const content = document.querySelector('.content');
    if (!content) return;
    content.innerHTML = `
      <div class="media-scroller">
        <div class="media-container">
          ${mediaAssets.map((asset, index) => `
            <div class="media-item" data-index="${index}">
              <div class="media-wrapper">
                ${asset.type === 'video' ? 
                  `<video class="media-content" autoplay muted loop playsinline>
                     <source src="${asset.src}" type="video/mp4">
                     Your browser does not support the video tag.
                   </video>` :
                  `<img class="media-content" src="${asset.src}" alt="${asset.title}" loading="lazy">`
                }
                <div class="media-overlay">
                  <div class="media-info">
                    <h3 class="media-title">${asset.title}</h3>
                    <p class="media-description">${asset.description}</p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="scroll-indicator">
          <div class="scroll-dots">
            ${mediaAssets.map((_, index) => `<div class="scroll-dot" data-index="${index}"></div>`).join('')}
          </div>
        </div>
      </div>
    `;
    initializeScrollBehavior();
  }

  function loadMediaFor(key) {
    const assets = mediaManifest[key];
    if (assets && assets.length) {
      renderMediaAssets(assets);
      return;
    }

    // If manifest doesn't have the key, try server-side folder listing (requires local helper server)
    (async () => {
      try {
        const folder = encodeURIComponent(key);
        const resp = await fetch(`/list-assets/${folder}`);
        if (resp.ok) {
          const json = await resp.json();
          if (json.files && json.files.length) {
            // build media objects
            const built = json.files.map((f, i) => {
              const lower = f.toLowerCase();
              const type = /\.(mp4|webm|mov)$/i.test(lower) ? 'video' : 'image';
              return { type, src: f, title: `${key} ${i+1}`, description: key };
            });
            // cache into manifest for future clicks
            mediaManifest[key] = built;
            renderMediaAssets(built);
            return;
          }
        }
      } catch (err) {
        console.warn('list-assets fetch failed', err);
      }
      // fallback to default scroller if no assets found
      initializeMediaScroller();
    })();
  }

  /* ---------------- Menu & FAB interactions ---------------- */
  function closeAllDropdowns() {
    menu?.classList.remove("open");
    fabMenu?.classList.remove("open");
    loginMenu?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    fabToggle?.setAttribute("aria-expanded", "false");
    loginMenuToggle?.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      
      // Close other dropdowns when opening this one
      if (isOpen) {
        fabMenu?.classList.remove("open");
        loginMenu?.classList.remove("open");
        fabToggle?.setAttribute("aria-expanded", "false");
        loginMenuToggle?.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== menuToggle) {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Menu wrapper click: load media for the selected label and highlight
  if (menu) {
    menu.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-item');
      if (!btn) return;
      const label = btn.textContent.trim();

      // highlight active menu item
      menu.querySelectorAll('.menu-item').forEach(x => x.classList.toggle('active', x === btn));

      // clear other selections
      document.querySelectorAll('.number-box').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.instrument-item').forEach(x => x.classList.remove('selected'));

      // load media (if manifest entry missing, fallback to default scroller)
      if (mediaManifest[label] && mediaManifest[label].length) {
        loadMediaFor(label);
      } else {
        // fallback: try lowercase key
        if (mediaManifest[label.toLowerCase()] && mediaManifest[label.toLowerCase()].length) {
          loadMediaFor(label.toLowerCase());
        } else {
          // no media available in manifest for this label
          initializeMediaScroller();
        }
      }

      // close menu after selection
      menu.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  }

  if (fabToggle && fabMenu) {
    fabToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = fabMenu.classList.toggle("open");
      fabToggle.setAttribute("aria-expanded", String(open));
      
      // Close other dropdowns when opening this one
      if (open) {
        menu?.classList.remove("open");
        loginMenu?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
        loginMenuToggle?.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("click", (e) => {
      if (!fabMenu.contains(e.target) && e.target !== fabToggle) {
        fabMenu.classList.remove("open");
        fabToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (loginMenuToggle && loginMenu) {
    loginMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = loginMenu.classList.toggle("open");
      loginMenuToggle.setAttribute("aria-expanded", String(open));
      
      // Close other dropdowns when opening this one
      if (open) {
        menu?.classList.remove("open");
        fabMenu?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
        fabToggle?.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("click", (e) => {
      if (!loginMenu.contains(e.target) && e.target !== loginMenuToggle) {
        loginMenu.classList.remove("open");
        loginMenuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------- Mobile Sidebar Toggle ---------------- */
  if (sidebarBarToggle && sidebar && barBtn) {
    let isSidebarOpen = false;
    
    // Click handler for toggle bar
    sidebarBarToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSidebar();
    });
    
    // Touch/swipe handlers for mobile
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    sidebarBarToggle.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });
    
    sidebarBarToggle.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      
      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        if (deltaX > 0 && !isSidebarOpen) {
          // Swipe right - open sidebar
          toggleSidebar(true);
        } else if (deltaX < 0 && isSidebarOpen) {
          // Swipe left - close sidebar
          toggleSidebar(false);
        }
        isDragging = false;
      }
    }, { passive: true });
    
    sidebarBarToggle.addEventListener("touchend", () => {
      isDragging = false;
    }, { passive: true });
    
    function toggleSidebar(forceState = null) {
      if (forceState !== null) {
        isSidebarOpen = forceState;
      } else {
        isSidebarOpen = !isSidebarOpen;
      }
      
      if (isSidebarOpen) {
        sidebar.classList.add("expanded");
        sidebarBarToggle.classList.add("hide");
        barBtn.style.transform = "rotate(180deg)";
      } else {
        sidebar.classList.remove("expanded");
        sidebarBarToggle.classList.remove("hide");
        barBtn.style.transform = "rotate(0deg)";
      }
    }
    
    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (isSidebarOpen && !sidebar.contains(e.target) && !sidebarBarToggle.contains(e.target)) {
        toggleSidebar(false);
      }
    });

    // Global touch handlers for opening/closing the sidebar by swiping the screen.
    // - Swipe right from the left edge (startX < 40) to open the sidebar.
    // - When sidebar is open, swipe left anywhere to close it.
    let screenStartX = 0;
    let screenStartY = 0;
    let screenDragging = false;

    document.addEventListener('touchstart', (e) => {
      if (!e.touches || !e.touches[0]) return;
      screenStartX = e.touches[0].clientX;
      screenStartY = e.touches[0].clientY;
      screenDragging = true;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!screenDragging || !e.touches || !e.touches[0]) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - screenStartX;
      const deltaY = currentY - screenStartY;

      // Only consider primarily horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Swipe right from left edge to open
        if (screenStartX < 40 && deltaX > 40 && !isSidebarOpen) {
          toggleSidebar(true);
          screenDragging = false;
        }
        // Swipe left to close when sidebar open
        if (isSidebarOpen && deltaX < -40) {
          toggleSidebar(false);
          screenDragging = false;
        }
      }
    }, { passive: true });

    document.addEventListener('touchend', () => { screenDragging = false; }, { passive: true });
  }

  /* ---------------- Instagram Reels Style Media Scroller ---------------- */
  function initializeMediaScroller() {
    const content = document.querySelector(".content");
    if (!content) return;
    
    // Media assets from the assets folder
    const mediaAssets = [
      {
        type: "video",
        src: "assets/WhatsApp Video 2025-10-12 at 1.40.08 PM.mp4",
        title: "Music Event Video 1",
        description: "Amazing musical performance"
      },
      {
        type: "image",
        src: "assets/15bb5d5c-a260-4377-bff9-c57d04ceb75f.jpg",
        title: "Music Event Image 1",
        description: "Beautiful musical moment"
      },
      {
        type: "image",
        src: "assets/47f2aa63-7c09-4430-9862-534827de4fe3.jpg",
        title: "Music Event Image 2",
        description: "Inspiring musical scene"
      },
      {
        type: "image",
        src: "assets/699810f9-dc48-43fe-8c7b-4a924769ac59.jpg",
        title: "Music Event Image 3",
        description: "Captivating musical experience"
      },
      {
        type: "image",
        src: "assets/e2b85c2e-1297-41ba-97a5-04b2a4eaa095.jpg",
        title: "Music Event Image 4",
        description: "Memorable musical moment"
      }
    ];
    
    // Create the media scroller container
    content.innerHTML = `
      <div class="media-scroller">
        <div class="media-container">
          ${mediaAssets.map((asset, index) => `
            <div class="media-item" data-index="${index}">
              <div class="media-wrapper">
                ${asset.type === "video" ? 
                  `<video class="media-content" autoplay muted loop playsinline>
                     <source src="${asset.src}" type="video/mp4">
                     Your browser does not support the video tag.
                   </video>` :
                  `<img class="media-content" src="${asset.src}" alt="${asset.title}" loading="lazy">`
                }
                <div class="media-overlay">
                  <div class="media-info">
                    <h3 class="media-title">${asset.title}</h3>
                    <p class="media-description">${asset.description}</p>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="scroll-indicator">
          <div class="scroll-dots">
            ${mediaAssets.map((_, index) => `<div class="scroll-dot" data-index="${index}"></div>`).join("")}
          </div>
        </div>
      </div>
    `;
    
    // Initialize scroll behavior
    initializeScrollBehavior();
  }
  
  function initializeScrollBehavior() {
    const mediaScroller = document.querySelector(".media-scroller");
    const mediaItems = document.querySelectorAll(".media-item");
    const scrollDots = document.querySelectorAll(".scroll-dot");
    
    if (!mediaScroller || !mediaItems.length) return;
    
    let currentIndex = 0;
    let isScrolling = false;
    let startY = 0;
    let startTime = 0;
    
    // Touch/swipe handlers for vertical scrolling
    mediaScroller.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isScrolling = true;
    }, { passive: true });
    
    // Allow native touch scrolling (don't prevent default). We'll react to the resulting
    // scroll position in a debounced scroll handler to update dots/videos.
    mediaScroller.addEventListener("touchmove", (e) => {
      if (!isScrolling) return;
      // Do not call preventDefault() so the browser can perform native scrolling.
    }, { passive: true });
    
    mediaScroller.addEventListener("touchend", (e) => {
      if (!isScrolling) return;
      
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      const deltaTime = Date.now() - startTime;
      const velocity = Math.abs(deltaY) / deltaTime;
      
      // More controlled swipe detection - require larger movement or slower velocity
      if (Math.abs(deltaY) > 80 || (velocity > 0.2 && Math.abs(deltaY) > 40)) {
        if (deltaY > 0 && currentIndex < mediaItems.length - 1) {
          // Swipe up - next item
          scrollToItem(currentIndex + 1);
        } else if (deltaY < 0 && currentIndex > 0) {
          // Swipe down - previous item
          scrollToItem(currentIndex - 1);
        }
      }
      
      isScrolling = false;
    }, { passive: true });
    
    // Mouse wheel / trackpad support — allow native scrolling and snap after scroll ends.
    let wheelTimeout;
    mediaScroller.addEventListener("wheel", (e) => {
      // Do not call preventDefault() so trackpad/mouse wheel can perform natural scrolling.
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        // On wheel end, snap to nearest item
          const pageHeight = mediaScroller.clientHeight || window.innerHeight;
          const newIndex = Math.round(mediaScroller.scrollTop / pageHeight);
        if (newIndex !== currentIndex) scrollToItem(newIndex);
      }, 120);
    }, { passive: true });
    
    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && currentIndex < mediaItems.length - 1) {
        e.preventDefault();
        scrollToItem(currentIndex + 1);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        scrollToItem(currentIndex - 1);
      }
    });
    
    function scrollToItem(index) {
      if (index < 0 || index >= mediaItems.length) return;
      
      currentIndex = index;
      
      // Update scroll position
        const pageHeight = mediaScroller.clientHeight || window.innerHeight;
        mediaScroller.scrollTo({
          top: index * pageHeight,
          behavior: "smooth"
        });
      
      // Update scroll dots
      scrollDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      
      // Pause all videos except current
      const videos = document.querySelectorAll("video");
      videos.forEach((video, i) => {
        if (i === index) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
    
    // Initialize first item as active
    if (scrollDots.length > 0) {
      scrollDots[0].classList.add("active");
    }

    // Update currentIndex when user scrolls (native scroll). Debounced to run after
    // scrolling stops, so we snap to the nearest item and update UI/videos.
    let scrollEndTimeout;
    mediaScroller.addEventListener('scroll', () => {
      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => {
        const newIndex = Math.round(mediaScroller.scrollTop / window.innerHeight);
        if (newIndex !== currentIndex) {
          scrollToItem(newIndex);
        } else {
          // Even if index unchanged, ensure active dot and video state are synced
          scrollDots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
          const videos = document.querySelectorAll('video');
          videos.forEach((video, i) => {
            if (i === currentIndex) video.play(); else video.pause();
          });
        }
      }, 120);
    }, { passive: true });
    
    // Click handlers for scroll dots — only enable on non-touch/precise-pointer devices
    const isTouchDevice = ('ontouchstart' in window) || window.matchMedia('(pointer: coarse)').matches;
    if (!isTouchDevice) {
      scrollDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          scrollToItem(index);
        });
      });
    } else {
      // On touch devices, make dots non-interactive so users scroll by touch gestures
      scrollDots.forEach((dot) => { dot.style.pointerEvents = 'none'; });
    }
    
    // Auto-play first video
    const firstVideo = mediaItems[0]?.querySelector("video");
    if (firstVideo) {
      firstVideo.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }
  
  // Initialize media scroller — prefer loading the 'Chadi Thalinkana' folder if present
  if (mediaManifest['Chadi Thalinkana']) loadMediaFor('Chadi Thalinkana'); else initializeMediaScroller();

  /* ---------------- FAB button options ---------------- */
  const suggestionBtn = document.getElementById("suggestionBtn");
  const helpBtn = document.getElementById("helpBtn");
  suggestionBtn?.addEventListener("click", () => {
    alert("Suggestion clicked — open your suggestion flow here.");
  });
  helpBtn?.addEventListener("click", () => {
    alert("Help clicked — open your help flow here.");
  });

  /* ---------------- Hook up bottom boxes and instrument clicks ---------------- */
  if (bottomBoxes) {
    bottomBoxes.addEventListener('click', (e) => {
      const box = e.target.closest('.number-box');
      if (!box) return;
      const label = box.textContent.trim();
      // highlight
      bottomBoxes.querySelectorAll('.number-box').forEach(x => x.classList.toggle('active', x === box));
      // clear other selections
      if (menu) menu.querySelectorAll('.menu-item').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.instrument-item').forEach(x => x.classList.remove('selected'));
      loadMediaFor(label);
    });
  }

  if (listEl) {
    listEl.addEventListener('click', (e) => {
      const item = e.target.closest('.instrument-item');
      if (!item) return;
      const id = item.getAttribute('data-id');
      // highlight selected instrument
      listEl.querySelectorAll('.instrument-item').forEach(x => x.classList.toggle('selected', x === item));
      // clear other selections
      if (menu) menu.querySelectorAll('.menu-item').forEach(x => x.classList.remove('active'));
      if (bottomBoxes) bottomBoxes.querySelectorAll('.number-box').forEach(x => x.classList.remove('active'));
      loadMediaFor(id || item.textContent.trim());
    });
  }

  /* ---------------- Suggestion & Help modals (FAB) ---------------- */
  function showModalWithContent(title, html) {
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    if (!modalBackdrop || !modalTitle || !modalBody) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modalBackdrop.style.display = '';
    modalBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function showSuggestionModal() {
    showModalWithContent('Suggestion / Question', `
      <form id="suggestionForm">
        <div><label>Name *</label><input type="text" id="suggestionName" required></div>
        <div><label>Email *</label><input type="email" id="suggestionEmail" required></div>
        <div><label>Mobile *</label><input type="tel" id="suggestionPhone" required></div>
        <div><label>Message *</label><textarea id="suggestionMessage" rows="4" required></textarea></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
          <button type="submit" class="btn btn-primary">Send</button>
        </div>
      </form>
    `);
  }

  function showHelpModal() {
    showModalWithContent('Contact / Help', `
      <form id="helpForm">
        <div><label>Name *</label><input type="text" id="helpName" required></div>
        <div><label>Email *</label><input type="email" id="helpEmail" required></div>
        <div><label>Mobile *</label><input type="tel" id="helpPhone" required></div>
        <div><label>Message *</label><textarea id="helpMessage" rows="4" required></textarea></div>
        <div style="margin-top:8px;">Admin contact: <strong>navyakalayatham@gmail.com</strong></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
          <button type="submit" class="btn btn-primary">Send</button>
        </div>
      </form>
    `);
  }

  suggestionBtn?.addEventListener('click', (e) => { e.stopPropagation(); showSuggestionModal(); });
  helpBtn?.addEventListener('click', (e) => { e.stopPropagation(); showHelpModal(); });

  // Handle suggestion/help form submission — try server POST to /send-message, fallback to mailto
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form) return;
    if (form.id === 'suggestionForm') {
      e.preventDefault();
      const name = (document.getElementById('suggestionName')||{}).value || '';
      const email = (document.getElementById('suggestionEmail')||{}).value || '';
      const phone = (document.getElementById('suggestionPhone')||{}).value || '';
      const msg = (document.getElementById('suggestionMessage')||{}).value || '';
      if (!name || !email || !phone || !msg) { alert('Please fill all fields'); return; }
      // Try to send to server endpoint /send-message (server must be running)
      (async () => {
        try {
          const resp = await fetch('/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, subject: 'Suggestion / Question from ' + name, message: msg, type: 'suggestion' })
          });
          if (resp.ok) {
            alert('Suggestion sent. Thank you!');
            const modalBackdrop = document.getElementById('modalBackdrop');
            if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; document.body.style.overflow = ''; }
            return;
          }
          // server responded with error — fall back to mailto
        } catch (err) {
          console.warn('POST /send-message failed', err);
        }

        // Fallback: open mail client if server unavailable
        const subject = encodeURIComponent('Suggestion / Question from ' + name);
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nMobile: ' + phone + '\n\nMessage:\n' + msg);
        window.location.href = 'mailto:navyakalayatham@gmail.com?subject=' + subject + '&body=' + body;
        const modalBackdrop = document.getElementById('modalBackdrop');
        if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; document.body.style.overflow = ''; }
      })();
      return;
    }
    if (form.id === 'helpForm') {
      e.preventDefault();
      const name = (document.getElementById('helpName')||{}).value || '';
      const email = (document.getElementById('helpEmail')||{}).value || '';
      const phone = (document.getElementById('helpPhone')||{}).value || '';
      const msg = (document.getElementById('helpMessage')||{}).value || '';
      if (!name || !email || !phone || !msg) { alert('Please fill all fields'); return; }
      (async () => {
        try {
          const resp = await fetch('/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, subject: 'Help request from ' + name, message: msg, type: 'help' })
          });
          if (resp.ok) {
            alert('Help request sent. We will contact you soon.');
            const modalBackdrop = document.getElementById('modalBackdrop');
            if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; document.body.style.overflow = ''; }
            return;
          }
        } catch (err) {
          console.warn('POST /send-message failed', err);
        }

        // fallback to mail client if server not available
        const subject = encodeURIComponent('Help request from ' + name);
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nMobile: ' + phone + '\n\nMessage:\n' + msg + '\n\nAdmin Email: navyakalayatham@gmail.com');
        window.location.href = 'mailto:navyakalayatham@gmail.com?subject=' + subject + '&body=' + body;
        const modalBackdrop = document.getElementById('modalBackdrop');
        if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; document.body.style.overflow = ''; }
      })();
      return;
    }
  }, true);
});
