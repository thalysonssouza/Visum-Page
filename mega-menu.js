// ==========================================
// MEGA MENU
// ==========================================
(function () {
  document.querySelectorAll('.nav-has-dropdown').forEach(function (el) {
    var timer;
    el.addEventListener('mouseenter', function () {
      clearTimeout(timer);
      el.classList.add('open');
    });
    el.addEventListener('mouseleave', function () {
      timer = setTimeout(function () { el.classList.remove('open'); }, 120);
    });
    var panel = el.querySelector('.nav-mega-panel');
    if (panel) {
      panel.addEventListener('mouseenter', function () { clearTimeout(timer); el.classList.add('open'); });
      panel.addEventListener('mouseleave', function () { timer = setTimeout(function () { el.classList.remove('open'); }, 120); });
    }
  });
})();

// ==========================================
// FEATURE PAGE ACCORDIONS (how + faq)
// ==========================================
(function () {
  // How-section accordion
  document.querySelectorAll('.how-acc-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.closest('.how-content') && item.closest('.how-content').querySelectorAll('.how-acc-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.closest('.faq-list') && item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Practice tabs
  document.querySelectorAll('.practice-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var wrap = tab.closest('.practice-section') || tab.closest('section');
      var target = tab.dataset.tab;
      wrap.querySelectorAll('.practice-tab').forEach(function (t) { t.classList.remove('active'); });
      wrap.querySelectorAll('.practice-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = wrap.querySelector('[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  // Open first accordion items on load
  document.querySelectorAll('.how-acc-item:first-child').forEach(function (i) { i.classList.add('open'); });
  document.querySelectorAll('.faq-item:first-child').forEach(function (i) { i.classList.add('open'); });
})();
