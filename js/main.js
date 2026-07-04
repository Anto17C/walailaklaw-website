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

  // Mobile nav toggle: opening the menu also expands every submenu at once
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpening = !links.classList.contains('mobile-open');
      links.classList.toggle('mobile-open');
      if (isOpening) {
        links.querySelectorAll('.nav-item').forEach(function (item) {
          if (item.querySelector('.dropdown-menu')) {
            item.classList.add('mobile-open');
          }
        });
      }
    });
  }

  // Mobile dropdown: tapping the caret expands the submenu, tapping the label navigates normally
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var caret = item.querySelector('.caret');
    if (!caret) return;
    caret.addEventListener('click', function (e) {
      if (window.innerWidth <= 880) {
        e.preventDefault();
        e.stopPropagation();
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

  // Sticky mobile contact button — WhatsApp (EN pages) or Line (TH pages), whichever exists on this page
  var existingWhatsapp = document.querySelector('.ic-whatsapp');
  var existingLine = document.querySelector('.ic-line');
  if (existingWhatsapp) {
    var waBtn = document.createElement('a');
    waBtn.className = 'sticky-whatsapp-btn';
    waBtn.href = existingWhatsapp.href;
    waBtn.target = '_blank';
    waBtn.rel = 'noopener';
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.innerHTML = '<i class="ti ti-brand-whatsapp"></i>';
    document.body.appendChild(waBtn);
  } else if (existingLine) {
    var lineBtn = document.createElement('a');
    lineBtn.className = 'sticky-whatsapp-btn sticky-line-btn';
    lineBtn.href = existingLine.href;
    lineBtn.target = '_blank';
    lineBtn.rel = 'noopener';
    lineBtn.setAttribute('aria-label', 'แชทผ่าน Line');
    lineBtn.innerHTML = '<img src="' + (document.documentElement.lang === 'th' ? '../images/line-icon.png' : 'images/line-icon.png') + '" alt="Line" style="width:30px;height:30px;border-radius:6px;">';
    document.body.appendChild(lineBtn);
  }
});
