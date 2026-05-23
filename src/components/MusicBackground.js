import React, { useEffect, useState } from 'react';

function MusicBackground() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const bg = document.querySelector('.music-bg');
    if (!bg) return;

    const existing = bg.querySelectorAll('.music-symbol').length;
    const target = Math.max(40, Math.ceil(window.innerWidth / 30));
    const extraToAdd = Math.max(0, target - existing);

    const icons = ["🎵", "🎶", "🎷", "🎸", "🥁", "🎺", "🎻", "🎹", "🎤", "🪈", "🪗", "🎼"];

    for (let i = 0; i < extraToAdd; i++) {
      const span = document.createElement('span');
      span.className = 'music-symbol extra';
      const top = (5 + Math.random() * 90).toFixed(1) + '%';
      const left = (3 + Math.random() * 94).toFixed(1) + '%';
      const icon = icons[Math.floor(Math.random() * icons.length)];
      span.style.top = top;
      span.style.left = left;
      span.textContent = icon;
      bg.appendChild(span);
    }

    const syms = document.querySelectorAll('.music-symbol');
    syms.forEach(function(el) {
      for (let i = 0; i <= 4; i++) {
        const x = (Math.random() * 420 - 210).toFixed(1) + 'px';
        const y = (Math.random() * 420 - 210).toFixed(1) + 'px';
        const r = (Math.random() * 140 - 70).toFixed(1) + 'deg';
        el.style.setProperty('--x' + i, x);
        el.style.setProperty('--y' + i, y);
        el.style.setProperty('--r' + i, r);
      }
      const dur = (10 + Math.random() * 12).toFixed(2) + 's';
      const delay = (Math.random() * 6).toFixed(2) + 's';
      el.style.animationDuration = dur;
      el.style.animationDelay = delay;
    });
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div id="musicBg" className="music-bg" aria-hidden="true">
      <span className="music-symbol" style={{ top: '7%', left: '12%' }}>🎵</span>
      <span className="music-symbol" style={{ top: '18%', left: '77%' }}>🎶</span>
      <span className="music-symbol" style={{ top: '62%', left: '8%' }}>🎷</span>
      <span className="music-symbol" style={{ top: '73%', left: '68%' }}>🎸</span>
      <span className="music-symbol" style={{ top: '41%', left: '53%' }}>🪗</span>
      <span className="music-symbol" style={{ top: '81%', left: '27%' }}>🎹</span>
      <span className="music-symbol" style={{ top: '33%', left: '63%' }}>🎻</span>
      <span className="music-symbol" style={{ top: '52%', left: '88%' }}>🎺</span>
      <span className="music-symbol" style={{ top: '15%', left: '35%' }}>🎺</span>
      <span className="music-symbol" style={{ top: '85%', left: '55%' }}>🥁</span>
      <span className="music-symbol" style={{ top: '25%', left: '15%' }}>🪈</span>
      <span className="music-symbol" style={{ top: '60%', left: '80%' }}>🎼</span>
      <span className="music-symbol" style={{ top: '10%', left: '90%' }}>🎶</span>
      <span className="music-symbol" style={{ top: '90%', left: '10%' }}>🎷</span>
      <span className="music-symbol" style={{ top: '50%', left: '40%' }}>🎸</span>
      <span className="music-symbol" style={{ top: '70%', left: '20%' }}>🥁</span>
      <span className="music-symbol" style={{ top: '30%', left: '85%' }}>🎺</span>
      <span className="music-symbol" style={{ top: '80%', left: '70%' }}>🎻</span>
      <span className="music-symbol" style={{ top: '20%', left: '50%' }}>🎤</span>
      <span className="music-symbol" style={{ top: '60%', left: '60%' }}>🪗</span>
    </div>
  );
}

export default MusicBackground;
