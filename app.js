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
      for (let p = 0; p <= 4; p++) {
        const x = `${(Math.random() * 420 - 210).toFixed(1)}px`;
        const y = `${(Math.random() * 420 - 210).toFixed(1)}px`;
        const r = `${(Math.random() * 140 - 70).toFixed(1)}deg`;
        span.style.setProperty(`--x${p}`, x);
        span.style.setProperty(`--y${p}`, y);
        span.style.setProperty(`--r${p}`, r);
      }
      span.style.animationDuration = `${(10 + Math.random() * 12).toFixed(2)}s`;
      span.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
      musicBg.appendChild(span);
    }
  }
  populateMusicSymbols();
  window.addEventListener("resize", populateMusicSymbols);

  /* ---------------- Menu & FAB interactions ---------------- */
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      fabMenu?.classList.remove("open");
      loginMenu?.classList.remove("open");
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
      menu?.classList.remove("open");
      loginMenu?.classList.remove("open");
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
      fabMenu?.classList.remove("open");
      fabToggle?.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("click", (e) => {
      if (!loginMenu.contains(e.target) && e.target !== loginMenuToggle) {
        loginMenu.classList.remove("open");
        loginMenuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

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
