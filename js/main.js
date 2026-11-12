document.addEventListener('DOMContentLoaded', function () {
  var path = window.location.pathname;
  var language = path.indexOf('/th/') === 0 ? 'th' : (path.indexOf('/fr/') === 0 ? 'fr' : (path.indexOf('/zh/') === 0 ? 'zh' : (path.indexOf('/ru/') === 0 ? 'ru' : 'en')));
  var prefix = language === 'en' ? '' : '/' + language;
  // Russian is a small pilot: only the pages that exist under /ru/ are linked there, the other locations stay on the English pages
  // Russian pilot: the regional pages that exist in Russian (rewritten by Tools/ru/activate-ru.py). Other regional links stay on the
  // English pages, are marked hreflang="en" (ru.css shows an EN cue) and use Russian city names.
  var ruLocations = ["locations", "bangkok", "chonburi", "si-racha", "laem-chabang", "phuket", "chiang-mai"];
  var cityNames = language === 'ru' ? { 'Bangkok': 'Бангкок', 'Chonburi': 'Чонбури', 'Si Racha': 'Сирача', 'Laem Chabang': 'Лаемчабанг', 'Phuket': 'Пхукет', 'Chiang Mai': 'Чиангмай' } : {};
  function cityName(n) { return cityNames[n] || n; }
  function locHref(slug) { // slug '' = the Locations hub
    var inRu = language === 'ru' && ruLocations.indexOf(slug || 'locations') !== -1;
    var base = language === 'ru' ? (inRu ? '/ru' : '') : prefix;
    return 'href="' + base + '/locations' + (slug ? '/' + slug : '') + '"' + (language === 'ru' && !inRu ? ' hreflang="en"' : '');
  }

  // Keep the primary header focused: offices move from Contact into Locations.
  var nav = document.querySelector('.nav-links');
  if (nav) {
    var labels = {
      en: { locations: 'Locations', other: 'Other locations', contact: 'Contact', pattaya: 'Pattaya Office', rayong: 'Rayong Office' },
      th: { locations: 'พื้นที่ให้บริการ', other: 'พื้นที่อื่น ๆ', contact: 'ติดต่อเรา', pattaya: 'สำนักงานพัทยา', rayong: 'สำนักงานระยอง' },
      fr: { locations: 'Implantations', other: 'Autres implantations', contact: 'Contact', pattaya: 'Bureau de Pattaya', rayong: 'Bureau de Rayong' },
      zh: { locations: '服务地区', other: '其他地区', contact: '联系我们', pattaya: '芭堤雅办公室', rayong: '罗勇办公室' },
      ru: { locations: 'Регионы', other: 'Другие регионы', contact: 'Контакты', pattaya: 'Офис в Паттайе', rayong: 'Офис в Районге' }
    }[language];
    var contactLink = nav.querySelector('a[href="' + prefix + '/contact"]');
    if (contactLink) {
      var contactItem = contactLink.closest('.nav-item');
      var locationsItem = document.createElement('div');
      locationsItem.className = 'nav-item';
      locationsItem.innerHTML =
        '<a ' + locHref('') + '>' + labels.locations + ' <span class="caret">&#9662;</span></a>' +
        '<div class="dropdown-menu">' +
          '<a href="' + prefix + '/rayong-law-office">' + labels.rayong + '</a>' +
          '<a href="' + prefix + '/pattaya-law-office">' + labels.pattaya + '</a>' +
          '<a ' + locHref('bangkok') + '>' + cityName('Bangkok') + '</a>' +
          '<a ' + locHref('chonburi') + '>' + cityName('Chonburi') + '</a>' +
          '<a ' + locHref('si-racha') + '>' + cityName('Si Racha') + '</a>' +
          '<a ' + locHref('laem-chabang') + '>' + cityName('Laem Chabang') + '</a>' +
          '<a ' + locHref('phuket') + '>' + cityName('Phuket') + '</a>' +
          '<a ' + locHref('chiang-mai') + '>' + cityName('Chiang Mai') + '</a>' +
          '<a ' + locHref('') + '>' + labels.other + '</a>' +
        '</div>';
      contactItem.parentNode.insertBefore(locationsItem, contactItem);
      var plainContact = document.createElement('a');
      plainContact.href = prefix + '/contact';
      plainContact.textContent = labels.contact;
      plainContact.className = 'nav-contact-plain';
      contactItem.parentNode.replaceChild(plainContact, contactItem);
      // In the hamburger menu the plain Contact link is replaced by the header's booking button
      // (same label and link in each language); on desktop the plain link stays and this is hidden.
      var headerCta = document.querySelector('.nav-cta .btn-primary');
      if (headerCta) {
        var menuCta = document.createElement('a');
        menuCta.href = headerCta.getAttribute('href');
        menuCta.className = 'btn btn-primary nav-menu-cta';
        menuCta.textContent = headerCta.textContent.trim();
        plainContact.parentNode.insertBefore(menuCta, plainContact.nextSibling);
      }
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
      var isHome = path === '/' || path === '/index.html' || path === '/th/' || path === '/th/index.html' || path === '/fr/' || path === '/fr/index.html' || path === '/zh/' || path === '/zh/index.html' || path === '/ru/' || path === '/ru/index.html';
      var directLabels = {
        en: { prompt: 'Speak with us directly?', phone: 'Call Walailak Law Firm', email: 'Email Walailak Law Firm' },
        th: { prompt: 'ติดต่อเราโดยตรง', phone: 'โทรหาสำนักงานกฎหมายวลัยลักษณ์', email: 'อีเมลสำนักงานกฎหมายวลัยลักษณ์' },
        fr: { prompt: 'Contactez-nous directement', phone: 'Appeler Walailak Law Firm', email: 'Envoyer un e-mail à Walailak Law Firm' },
        zh: { prompt: '直接与我们联系？', phone: '致电瓦莱拉克律师事务所', email: '发送邮件至瓦莱拉克律师事务所' },
        ru: { prompt: 'Связаться с нами напрямую', phone: 'Позвонить в Walailak Law Firm', email: 'Написать в Walailak Law Firm' }
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

  // Mobile submenus are independent disclosures beside the section links.
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.setAttribute('aria-expanded', 'false');
    var submenuButtons = [];
    links.querySelectorAll('.nav-item').forEach(function (item) {
      var title = item.querySelector('a');
      var submenu = item.querySelector('.dropdown-menu');
      if (!title || !submenu) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'submenu-toggle';
      button.setAttribute('aria-label', title.textContent.replace(/\u25be/g, '').trim());
      button.setAttribute('aria-expanded', 'false');
      submenu.id = 'header-submenu-' + (submenuButtons.length + 1);
      button.setAttribute('aria-controls', submenu.id);
      button.innerHTML = '<span aria-hidden="true">&#9662;</span>';
      title.after(button);
      item.classList.add('has-submenu-toggle');
      submenuButtons.push(button);
      button.addEventListener('click', function () {
        var expanded = item.classList.toggle('mobile-open');
        button.setAttribute('aria-expanded', String(expanded));
      });
    });

    toggle.addEventListener('click', function () {
      var expanded = links.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', String(expanded));
      if (!expanded) {
        submenuButtons.forEach(function (button) {
          button.parentElement.classList.remove('mobile-open');
          button.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // Language dropdown: click to toggle at any width, click outside to close
  document.querySelectorAll('.lang-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var item = trigger.closest('.lang-item');
      trigger.setAttribute('aria-expanded', item.classList.toggle('open') ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.lang-item.open').forEach(function (item) {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
        var t = item.querySelector('.lang-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.lang-item.open').forEach(function (item) {
      item.classList.remove('open');
      var t = item.querySelector('.lang-trigger');
      if (t) { t.setAttribute('aria-expanded', 'false'); t.focus(); }
    });
  });

  // Contact-method click tracking (WhatsApp, phone, LINE, email) — pushes a dataLayer
  // event so GTM/GA4 can report these clicks distinctly from the contact form.
  // Delegated on document so it also catches the hero-direct and sticky buttons
  // above, which are created dynamically after this listener is attached.
  function contactMethodFor(href) {
    if (!href) return null;
    if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) return 'whatsapp';
    if (href.indexOf('line.me') !== -1) return 'line';
    if (href.indexOf('tel:') === 0) return 'phone';
    if (href.indexOf('mailto:') === 0) return 'email';
    return null;
  }
  function contactLocationFor(link) {
    var cls = link.className || '';
    if (/footer-social/.test(cls)) return 'footer';
    if (/nav-social/.test(cls)) return 'header';
    if (/hero-direct-link/.test(cls)) return 'hero';
    if (/icon-circle/.test(cls)) return 'contact_module';
    if (/sticky-whatsapp-btn|sticky-line-btn/.test(cls)) return 'sticky';
    if (link.closest('.contact-module')) return 'contact_module';
    if (link.closest('.site-footer')) return 'footer';
    return 'body';
  }
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var method = contactMethodFor(link.getAttribute('href'));
    if (!method) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: method + '_click',
      link_location: contactLocationFor(link),
      link_url: link.getAttribute('href')
    });
  });

  // Scroll-to-top button
  var scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', language === 'ru' ? 'Наверх' : 'Scroll to top');
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
    waBtn.setAttribute('aria-label', language === 'ru' ? 'Написать в WhatsApp' : 'Chat on WhatsApp');
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
