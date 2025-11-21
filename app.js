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
    menu.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const btn = document.createElement("button");
      btn.className = "menu-item";
      btn.textContent = String.fromCharCode(i);
      menu.appendChild(btn);
    }
    
    // Add scroll functionality to the menu
    let isScrolling = false;
    let startY = 0;
    let scrollTop = 0;
    
    menu.addEventListener('touchstart', (e) => {
      isScrolling = true;
      startY = e.touches[0].pageY - menu.offsetTop;
      scrollTop = menu.scrollTop;
    }, { passive: true });
    
    menu.addEventListener('touchmove', (e) => {
      if (!isScrolling) return;
      e.preventDefault();
      const y = e.touches[0].pageY - menu.offsetTop;
      const walk = (y - startY) * 2;
      menu.scrollTop = scrollTop - walk;
    }, { passive: false });
    
    menu.addEventListener('touchend', () => {
      isScrolling = false;
    }, { passive: true });
    
    // Also add mouse wheel support
    menu.addEventListener('wheel', (e) => {
      e.preventDefault();
      menu.scrollTop += e.deltaY;
    }, { passive: false });
  }
  populateAlphabetMenu();

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
    bottomBoxes.innerHTML = "";
    for (let i = 1; i <= 29; i++) {
      const div = document.createElement("div");
      div.className = "number-box";
      div.textContent = i;
      bottomBoxes.appendChild(div);
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
    
    // Mouse wheel support for desktop - more controlled scrolling
    let wheelTimeout;
    mediaScroller.addEventListener("wheel", (e) => {
      e.preventDefault();
      
      // Debounce wheel events to prevent rapid scrolling
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 50 && currentIndex < mediaItems.length - 1) {
          // Scroll down - next item (require larger delta)
          scrollToItem(currentIndex + 1);
        } else if (e.deltaY < -50 && currentIndex > 0) {
          // Scroll up - previous item (require larger delta)
          scrollToItem(currentIndex - 1);
        }
      }, 100); // 100ms debounce
    }, { passive: false });
    
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
      mediaScroller.scrollTo({
        top: index * window.innerHeight,
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
  
  // Initialize media scroller
  initializeMediaScroller();

  /* ---------------- FAB button options ---------------- */
  const suggestionBtn = document.getElementById("suggestionBtn");
  const helpBtn = document.getElementById("helpBtn");
  suggestionBtn?.addEventListener("click", () => {
    alert("Suggestion clicked — open your suggestion flow here.");
  });
  helpBtn?.addEventListener("click", () => {
    alert("Help clicked — open your help flow here.");
  });
});
