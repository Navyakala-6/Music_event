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
  { id: 'harmonica', name: 'Harmonica', emoji: '🎼' },
];

const state = {
  selected: new Set(),
  query: '',
};

const listEl = document.getElementById('instrumentList');
const searchEl = document.getElementById('instrumentSearch');
const chipsEl = document.getElementById('selectedChips');
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
const fabToggle = document.getElementById('fabToggle');
const fabMenu = document.getElementById('fabMenu');

function renderList() {
  const q = state.query.trim().toLowerCase();
  const filtered = instruments.filter(i => i.name.toLowerCase().includes(q));
  listEl.innerHTML = '';
  filtered.forEach(inst => {
    const li = document.createElement('li');
    li.className = 'instrument-item' + (state.selected.has(inst.id) ? ' selected' : '');
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
}

function renderChips() {
  chipsEl.innerHTML = '';
  [...state.selected].forEach(id => {
    const inst = instruments.find(i => i.id === id);
    if (!inst) return;
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.innerHTML = `${inst.emoji} ${inst.name} <button class="remove" aria-label="Remove ${inst.name}">✖</button>`;
    chip.querySelector('.remove').addEventListener('click', () => {
      state.selected.delete(inst.id);
      renderList();
      renderChips();
    });
    chipsEl.appendChild(chip);
  });
}

listEl.addEventListener('click', (e) => {
  const li = e.target.closest('.instrument-item');
  if (!li) return;
  const id = li.getAttribute('data-id');
  if (state.selected.has(id)) state.selected.delete(id); else state.selected.add(id);
  renderList();
  renderChips();
});

searchEl.addEventListener('input', (e) => {
  state.query = e.target.value;
  renderList();
});

// Modal logic (simple placeholders)
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

function openModal(title, bodyHtml) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHtml;
  modal.classList.remove('hidden');
}
function hideModal() {
  modal.classList.add('hidden');
}
closeModal.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

// Hamburger menu interactions
menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && e.target !== menuToggle) {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// FAB interactions
fabToggle.addEventListener('click', () => {
  const isOpen = fabMenu.classList.toggle('open');
  fabToggle.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', (e) => {
  if (!fabMenu.contains(e.target) && e.target !== fabToggle) {
    fabMenu.classList.remove('open');
    fabToggle.setAttribute('aria-expanded', 'false');
  }
});

// Login Hamburger Dropdown interactions
const loginMenuToggle = document.getElementById('loginMenuToggle');
const loginMenu = document.getElementById('loginMenu');
loginMenuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = loginMenu.classList.toggle('open');
  loginMenuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', (e) => {
  if (!loginMenu.contains(e.target) && e.target !== loginMenuToggle) {
    loginMenu.classList.remove('open');
    loginMenuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Hook up dropdown items (demo behavior)
['liveBandBtn','marriageBtn','partyBtn','familyBtn','pubLiveBtn'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', () => {
    openModal('Selected', `<p>You chose: ${el.textContent}</p>`);
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('suggestionBtn').addEventListener('click', () => {
  openModal('Suggestion', `<p>Tell us your preferences. We will tailor the event.</p>`);
  fabMenu.classList.remove('open');
  fabToggle.setAttribute('aria-expanded', 'false');
});
document.getElementById('helpBtn').addEventListener('click', () => {
  openModal('Help', `<p>Need assistance? Contact us at support@example.com</p>`);
  fabMenu.classList.remove('open');
  fabToggle.setAttribute('aria-expanded', 'false');
});

document.getElementById('loginBtn').addEventListener('click', () => {
  openModal('Login', `
    <form class="auth-form">
      <label>Email<br><input type="email" required></label><br><br>
      <label>Password<br><input type="password" required></label><br><br>
      <button type="submit">Login</button>
    </form>
  `);
});
document.getElementById('signupBtn').addEventListener('click', () => {
  openModal('Signup', `
    <form class="auth-form">
      <label>Name<br><input type="text" required></label><br><br>
      <label>Email<br><input type="email" required></label><br><br>
      <label>Password<br><input type="password" required></label><br><br>
      <button type="submit">Create account</button>
    </form>
  `);
});
document.getElementById('settingsBtn').addEventListener('click', () => {
  openModal('Settings', `
    <div>
      <label><input type="checkbox"> Receive event updates</label><br><br>
      <label><input type="checkbox"> Dark mode (coming soon)</label>
    </div>
  `);
});
document.getElementById('logoutBtn').addEventListener('click', () => {
  openModal('Logout', `<p>You have been logged out (demo). Login to continue.</p>`);
});


// Initial render
renderList();
renderChips();


// Mobile sidebar swipe right to expand (show instrument names)
const sidebar = document.querySelector('.sidebar');
const layout = document.querySelector('.layout');
let touchStartX = null;
let touchEndX = null;

function isMobileSidebar() {
  return window.innerWidth <= 900;
}

function handleTouchStart(e) {
  if (!isMobileSidebar()) return;
  if (e.touches && e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchEndX = touchStartX;
  }
}
function handleTouchMove(e) {
  if (!isMobileSidebar()) return;
  if (e.touches && e.touches.length === 1) {
    touchEndX = e.touches[0].clientX;
  }
}
function handleTouchEnd() {
  if (!isMobileSidebar()) return;
  if (touchStartX !== null && touchEndX !== null) {
    const dx = touchEndX - touchStartX;
    if (dx > 60) { // swipe right
      sidebar.classList.add('expanded');
      layout.classList.add('sidebar-expanded');
    } else if (dx < -60) { // swipe left to collapse
      sidebar.classList.remove('expanded');
      layout.classList.remove('sidebar-expanded');
    }
  }
  touchStartX = null;
  touchEndX = null;
}
if (sidebar) {
  sidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
  sidebar.addEventListener('touchmove', handleTouchMove, { passive: true });
  sidebar.addEventListener('touchend', handleTouchEnd, { passive: true });
}
// Remove expanded state if resizing to desktop
window.addEventListener('resize', () => {
  if (!isMobileSidebar()) {
    sidebar.classList.remove('expanded');
    layout.classList.remove('sidebar-expanded');
  }
});


