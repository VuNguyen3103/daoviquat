/* ============================================================
   ĐÀO VỊ QUẤT — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  const navSearch = document.querySelector('.nav-search');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks?.classList.toggle('open');
      navSearch?.classList.toggle('open');
      const bars = navToggle.querySelectorAll('span');
      bars[0].style.transform = navLinks?.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
      bars[1].style.opacity   = navLinks?.classList.contains('open') ? '0' : '1';
      bars[2].style.transform = navLinks?.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
  }

  /* ── Scroll fade-in animation ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Library filter buttons ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const bookCards  = document.querySelectorAll('.book-card[data-category]');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.filter;
        bookCards.forEach(card => {
          const match = cat === 'all' || card.dataset.category === cat;
          card.style.display = match ? '' : 'none';
          if (match) {
            card.style.animation = 'none';
            card.offsetHeight; // reflow
            card.style.animation = '';
          }
        });
      });
    });
  }

});
