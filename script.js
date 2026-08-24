/* ════════════════════════════════════════
   WEDDING INVITATION JS — Dr. Sreelakshmi & Dr. Souraj
   ════════════════════════════════════════ */

// ─── COUNTDOWN TIMER ─────────────────────────────────────────
(function initCountdown() {
  const weddingDate = new Date('2026-08-30T12:00:00+05:30');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    animateNumber('days', pad(days));
    animateNumber('hours', pad(hours));
    animateNumber('minutes', pad(minutes));
    animateNumber('seconds', pad(seconds));
  }

  function animateNumber(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== value) {
      el.style.transform = 'scale(1.15)';
      el.style.color = 'var(--gold)';
      setTimeout(() => {
        el.textContent = value;
        el.style.transform = 'scale(1)';
        el.style.color = '';
      }, 150);
    }
  }

  tick();
  setInterval(tick, 1000);
})();

// ─── FLOATING PETAL PARTICLES ────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#DB7C9B', '#C9A227', '#F3C9A9', '#0F6E72'];
  const count = 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 8 + 5;
    const left = Math.random() * 100;
    const duration = Math.random() * 16 + 12;
    const delay = Math.random() * 12;
    const opacity = Math.random() * 0.5 + 0.15;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
      background: ${colors[Math.floor(Math.random() * colors.length)]};
    `;
    container.appendChild(p);
  }
})();

// ─── SCROLL-IN ANIMATIONS ────────────────────────────────────
(function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  const sections = document.querySelectorAll(
    '.countdown-section, .invitation-section, .couple-section, .event-section, .rsvp-section'
  );
  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(sec);
  });

  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .countdown-section.visible, .invitation-section.visible, .couple-section.visible,
    .event-section.visible, .rsvp-section.visible {
      opacity: 1 !important; transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleEl);
})();

// ─── COUPLE IMAGE FALLBACK ────────────────────────────────────
(function handleImageFallback() {
  const img = document.getElementById('couple-img');
  if (!img) return;
  img.addEventListener('error', function () {
    this.style.background = 'linear-gradient(135deg, #F6D7E1, #F3C9A9)';
  });
})();

// ─── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── LOCATION BUTTON RIPPLE ───────────────────────────────────
document.querySelectorAll('.btn-loc').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute; width: 10px; height: 10px;
      background: rgba(255,255,255,0.4); border-radius: 50%;
      pointer-events: none; transform: scale(0);
      animation: rippleAnim 0.6s ease-out;
      left: ${e.offsetX - 5}px; top: ${e.offsetY - 5}px;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(20); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

if (window.lucide) lucide.createIcons();

// ─── BACKGROUND MUSIC PLAYER ──────────────────────────────────
(function initMusicPlayer() {
  const musicBtn = document.createElement('button');
  musicBtn.className = 'music-toggle';
  musicBtn.setAttribute('aria-label', 'Toggle Music');
  musicBtn.innerHTML = '<i data-lucide="volume-x"></i>';
  document.body.appendChild(musicBtn);

  const audio = document.createElement('audio');
  audio.id = 'bg-music';
  audio.src = 'song.mp3';
  audio.loop = true;
  document.body.appendChild(audio);

  let isPlaying = false;

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.innerHTML = '<i data-lucide="volume-x"></i>';
      if (window.lucide) lucide.createIcons();
      isPlaying = false;
    } else {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i data-lucide="volume-2"></i>';
        if (window.lucide) lucide.createIcons();
        isPlaying = true;
      }).catch(() => {
        // Autoplay blocked by browser — user can tap again
        isPlaying = false;
      });
    }
  }

  musicBtn.addEventListener('click', togglePlay);
  window.__toggleWeddingMusic = togglePlay;
  window.__isWeddingMusicPlaying = () => isPlaying;
})();

// Lock body scroll on load
document.body.classList.add('scroll-locked');

// Preloader hide
(function initPreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  window.addEventListener('load', () => {
    setTimeout(() => el.classList.add('is-hidden'), 500);
  });
  setTimeout(() => el.classList.add('is-hidden'), 3000);
})();

// Arch reveal (signature door-opening interaction)
(function initArchReveal() {
  const cta = document.getElementById('archCta');
  const frame = document.getElementById('archFrame');
  const hero = document.getElementById('hero');
  if (!cta || !frame) return;

  function openArch() {
    frame.classList.add('is-open');
    if (hero) hero.classList.add('is-open');
    document.body.classList.remove('scroll-locked');
    spawnRingParticles();

    if (typeof window.__toggleWeddingMusic === 'function' && !window.__isWeddingMusicPlaying()) {
      window.__toggleWeddingMusic();
    }
  }

  cta.addEventListener('click', openArch);
  cta.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openArch();
  });
})();

// Ring / petal particle burst on gate open
function spawnRingParticles() {
  const holder = document.getElementById('ringParticles');
  if (!holder || holder.dataset.played) return;
  holder.dataset.played = 'true';

  const RING_SVG = (size, hue) => `
    <svg viewBox="0 0 40 40" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="15" fill="none" stroke="${hue}" stroke-width="2.2"/>
    </svg>`;

  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'ring-particle';

    const size = 12 + Math.random() * 20;
    const hue = Math.random() > 0.5 ? '#E4C878' : '#DB7C9B';
    p.innerHTML = RING_SVG(size, hue);

    const startX = 50 + (Math.random() * 60 - 30);
    const drift = (Math.random() * 220 - 110);
    const rise = 260 + Math.random() * 220;
    const rotate = (Math.random() * 360 - 180).toFixed(0);
    const delay = (Math.random() * 0.35).toFixed(2);
    const duration = (2.2 + Math.random() * 1.4).toFixed(2);

    p.style.left = `${startX}%`;
    p.style.setProperty('--drift', `${drift}px`);
    p.style.setProperty('--rise', `-${rise}px`);
    p.style.setProperty('--rotate', `${rotate}deg`);
    p.style.animationDelay = `${delay}s`;
    p.style.animationDuration = `${duration}s`;

    holder.appendChild(p);
    setTimeout(() => p.remove(), (parseFloat(duration) + parseFloat(delay)) * 1000 + 200);
  }
}

console.log('💍 Dr. Sreelakshmi & Dr. Souraj — Wedding Invitation Loaded');

// ─── RSVP FORM ───────────────────────────────────────────────
(function initRSVP() {
  // To collect RSVPs into a Google Sheet, set this to your own Google Apps
  // Script Web App URL (Extensions → Apps Script → Deploy → Web app).
  // Until then, responses are safely stored in the guest's browser only.
  const SCRIPT_URL = '';
  const STORAGE_KEY = 'sreelakshmi_souraj_rsvp';

  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');
  const editRsvpBtn = document.getElementById('edit-rsvp-btn');
  const guestsGroup = document.getElementById('guests-group');
  const guestsInput = document.getElementById('rsvp-guests');
  const attendYes = document.getElementById('attend-yes');
  const attendNo = document.getElementById('attend-no');

  if (!rsvpForm) return;

  function syncGuestField() {
    const attending = attendYes && attendYes.checked;
    if (guestsGroup) guestsGroup.style.display = attending ? 'flex' : 'none';
    if (guestsInput) {
      if (attending) {
        if (!guestsInput.value || guestsInput.value === '0') guestsInput.value = '1';
        guestsInput.setAttribute('required', 'true');
      } else {
        guestsInput.value = '0';
        guestsInput.removeAttribute('required');
      }
    }
  }

  if (attendYes && attendNo) {
    attendYes.addEventListener('change', syncGuestField);
    attendNo.addEventListener('change', syncGuestField);
  }
  syncGuestField();

  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    try { showSuccessState(JSON.parse(existing)); } catch (e) { /* ignore corrupt data */ }
  }

  rsvpForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const checkedAttendance = document.querySelector('input[name="attendance"]:checked');
    if (!checkedAttendance) return;

    const attendance = checkedAttendance.value;
    const name = document.getElementById('rsvp-name').value.trim();
    const mobile = document.getElementById('rsvp-mobile').value.trim();
    const guests = attendance.toLowerCase().includes('yes')
      ? (parseInt(guestsInput ? guestsInput.value : '1') || 1)
      : 0;
    const message = document.getElementById('rsvp-message')
      ? document.getElementById('rsvp-message').value.trim()
      : '';

    if (!name) { document.getElementById('rsvp-name').focus(); return; }
    if (!mobile) { document.getElementById('rsvp-mobile').focus(); return; }

    const submitBtn = rsvpForm.querySelector('.rsvp-submit-btn');
    const originalText = submitBtn ? submitBtn.innerText : '';
    if (submitBtn) { submitBtn.innerText = 'Submitting…'; submitBtn.disabled = true; }

    if (SCRIPT_URL) {
      const payload = { sheetName: 'Sheet1', name, mobile, attendance, guests, message };
      try {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Sheet submit failed (saved locally):', err);
      }
    }

    if (submitBtn) { submitBtn.innerText = originalText; submitBtn.disabled = false; }

    const rsvpRecord = { attendance, name, mobile, guests, message, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvpRecord));

    showSuccessState(rsvpRecord);
    rsvpForm.reset();
    syncGuestField();
  });

  if (editRsvpBtn) {
    editRsvpBtn.addEventListener('click', () => {
      if (rsvpSuccess) rsvpSuccess.style.display = 'none';
      rsvpForm.style.display = 'flex';

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        const isYes = d.attendance.toLowerCase().includes('yes');
        if (attendYes) attendYes.checked = isYes;
        if (attendNo) attendNo.checked = !isYes;
        syncGuestField();
        if (guestsInput && isYes) guestsInput.value = d.guests;
        const nameEl = document.getElementById('rsvp-name');
        const mobileEl = document.getElementById('rsvp-mobile');
        const messageEl = document.getElementById('rsvp-message');
        if (nameEl) nameEl.value = d.name;
        if (mobileEl) mobileEl.value = d.mobile;
        if (messageEl) messageEl.value = d.message;
      }
    });
  }

  function showSuccessState(data) {
    rsvpForm.style.display = 'none';
    if (rsvpSuccess) rsvpSuccess.style.display = 'block';

    const para = rsvpSuccess ? rsvpSuccess.querySelector('.rsvp-success__text') : null;
    if (!para) return;

    if (data.attendance.toLowerCase().includes('yes')) {
      para.innerHTML = `
        Your RSVP has been received!<br>
        <strong>Attending:</strong> Yes, I'll be there
        ${data.guests > 0 ? '&nbsp;(' + data.guests + ' guest' + (data.guests > 1 ? 's' : '') + ')' : ''}<br>
        We look forward to welcoming you on the big day! 🎉
      `;
    } else {
      para.innerHTML = `
        Your response has been received.<br>
        <strong>Attending:</strong> Sorry, can't attend.<br>
        Thank you for letting us know. Your blessings mean a lot! 🤍
      `;
    }
  }
})();
