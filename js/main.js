document.addEventListener('DOMContentLoaded', function () {
  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var icon = i.querySelector('.icon');
        if (icon) icon.textContent = '+';
      });
      if (!wasOpen) {
        item.classList.add('open');
        var icon = item.querySelector('.icon');
        if (icon) icon.textContent = '−';
      }
    });
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('mobile-open');
    });
  }

  // Mobile dropdown tap-to-expand (Practice Areas submenu)
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var link = item.querySelector('a');
    if (!link) return;
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 880) {
        e.preventDefault();
        item.classList.toggle('mobile-open');
      }
    });
  });

  // Scroll-to-top button
  var scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = '<i class="ti ti-arrow-up"></i>';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
