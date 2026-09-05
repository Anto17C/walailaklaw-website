document.addEventListener('DOMContentLoaded', function () {
  var path = window.location.pathname;
  var language = path.indexOf('/th/') === 0 ? 'th' : (path.indexOf('/fr/') === 0 ? 'fr' : 'en');
  var prefix = language === 'en' ? '' : '/' + language;

  // Keep the primary header focused: offices move from Contact into Locations.
  var nav = document.querySelector('.nav-links');
  if (nav) {
    var labels = {
      en: { locations: 'Locations', other: 'Other locations', contact: 'Contact', pattaya: 'Pattaya Office', rayong: 'Rayong Office' },
      th: { locations: 'พื้นที่ให้บริการ', other: 'พื้นที่อื่น ๆ', contact: 'ติดต่อเรา', pattaya: 'สำนักงานพัทยา', rayong: 'สำนักงานระยอง' },
      fr: { locations: 'Implantations', other: 'Autres implantations', contact: 'Contact', pattaya: 'Bureau de Pattaya', rayong: 'Bureau de Rayong' }
    }[language];
    var contactLink = nav.querySelector('a[href="' + prefix + '/contact"]');
    if (contactLink) {
      var contactItem = contactLink.closest('.nav-item');
      var locationsItem = document.createElement('div');
      locationsItem.className = 'nav-item';
      locationsItem.innerHTML =
        '<a href="/locations">' + labels.locations + ' <span class="caret">&#9662;</span></a>' +
        '<div class="dropdown-menu">' +
          '<a href="' + prefix + '/rayong-law-office">' + labels.rayong + '</a>' +
          '<a href="' + prefix + '/pattaya-law-office">' + labels.pattaya + '</a>' +
          '<a href="/locations/chonburi">Chonburi</a>' +
          '<a href="/locations/si-racha">Si Racha</a>' +
          '<a href="/locations/laem-chabang">Laem Chabang</a>' +
          '<a href="/locations/phuket">Phuket</a>' +
          '<a href="/locations/chiang-mai">Chiang Mai</a>' +
          '<a href="/locations">' + labels.other + '</a>' +
        '</div>';
      contactItem.parentNode.insertBefore(locationsItem, contactItem);
      var plainContact = document.createElement('a');
      plainContact.href = prefix + '/contact';
      plainContact.textContent = labels.contact;
      contactItem.parentNode.replaceChild(plainContact, contactItem);
    }
  }

  // Move direct contact choices into the hero. The homepage omits phone because
  // its primary actions already contain a Call now button.
  var heroInner = document.querySelector('.hero .hero-inner');
  if (heroInner) {
    var headerContacts = document.querySelector('.nav-socials');
    var followingContact = document.querySelector('.hero + .section-tight .contact-module');
    var source = followingContact || headerContacts;
    if (source) {
      function hrefFor(selector, fallback) {
        var link = source.querySelector(selector) || (headerContacts && headerContacts.querySelector(selector));
        return link ? link.getAttribute('href') : fallback;
      }
      var isHome = path === '/' || path === '/index.html' || path === '/th/' || path === '/th/index.html' || path === '/fr/' || path === '/fr/index.html';
      var directLabels = {
        en: { prompt: 'Speak with us directly?', phone: 'Call Walailak Law Firm', email: 'Email Walailak Law Firm' },
        th: { prompt: 'ติดต่อเราโดยตรง', phone: 'โทรหาสำนักงานกฎหมายวลัยลักษณ์', email: 'อีเมลสำนักงานกฎหมายวลัยลักษณ์' },
        fr: { prompt: 'Contactez-nous directement', phone: 'Appeler Walailak Law Firm', email: 'Envoyer un e-mail à Walailak Law Firm' }
      }[language];
      var links = [];
      if (!isHome) {
        links.push('<a href="' + hrefFor('a[href^="tel:"]', 'tel:+66946463940') + '" class="hero-direct-link is-phone" aria-label="' + directLabels.phone + '" title="' + directLabels.phone + '"><i class="ti ti-phone"></i></a>');
      }
      links.push('<a href="' + hrefFor('a[href^="mailto:"]', 'mailto:kae@walailaklaw.com') + '" class="hero-direct-link is-email" aria-label="' + directLabels.email + '" title="' + directLabels.email + '"><i class="ti ti-mail"></i></a>');
      links.push('<a href="' + hrefFor('a[href*="wa.me"]', 'https://wa.me/66946463940') + '" class="hero-direct-link is-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp Walailak Law Firm" title="WhatsApp"><i class="ti ti-brand-whatsapp"></i></a>');
      links.push('<a href="' + hrefFor('a[href*="line.me"]', 'https://line.me/ti/p/~kaezeeds') + '" class="hero-direct-link is-line" target="_blank" rel="noopener" aria-label="LINE Walailak Law Firm" title="LINE"><img src="/images/line-icon.png" alt=""></a>');
      var direct = document.createElement('div');
      direct.className = 'hero-direct-contact';
      direct.setAttribute('aria-label', directLabels.prompt);
      direct.innerHTML = '<span class="hero-direct-label">' + directLabels.prompt + '</span><div class="hero-direct-icons">' + links.join('') + '</div>';
      heroInner.appendChild(direct);

      if (followingContact) {
        var contactSection = followingContact.closest('.section-tight');
        if (contactSection) contactSection.remove();
      }
    }
  }

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

  // Language dropdown: click to toggle at any width, click outside to close
  document.querySelectorAll('.lang-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      trigger.closest('.lang-item').classList.toggle('open');
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.lang-item.open').forEach(function (item) {
      if (!item.contains(e.target)) item.classList.remove('open');
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
