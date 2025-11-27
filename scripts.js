// scripts.js
// Small enhancement for topbar/navigation: play a quick click animation
// then navigate so the user sees a pleasant transition on link clicks.

(function () {
  const navLinks = document.querySelectorAll('.topbar a');
  if (!navLinks.length) return;

  function animateAndNavigate(el, href) {
    el.classList.add('link-click-animate');
    // keep the animation short; navigate after it finishes
    setTimeout(() => {
      // If href is an in-page hash, jump within same page
      if (href.startsWith('#')) {
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        el.classList.remove('link-click-animate');
        return;
      }
      // Otherwise, go to the target page
      window.location.href = href;
    }, 160);
  }

  navLinks.forEach((a) => {
    // Only attach to normal links (ignore javascript: or external specially)
    const href = a.getAttribute('href') || '';
    a.addEventListener('click', function (e) {
      // let modifier keys skip our animation and behave normally
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // if link targets a file or page (non-empty), animate
      if (!href) return;
      e.preventDefault();
      animateAndNavigate(a, href);
    });

    // keyboard accessibility: Enter should behave similarly
    a.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const href = a.getAttribute('href') || '';
        if (!href) return;
        e.preventDefault();
        animateAndNavigate(a, href);
      }
    });
  });
})();
