/* ============================================================
   WALAILAK LAW FIRM — English Site — main.js
   ============================================================ */
(function(){
  'use strict';

  /* Nav scroll */
  const nav = document.querySelector('.nav');
  if(nav){
    const tick = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', tick, {passive:true});
    tick();
  }

  /* Mobile toggle */
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if(toggle && mobile){
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobile.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobile.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }));
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && mobile.classList.contains('open')){
        toggle.classList.remove('open');
        mobile.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
      }
    });
  }

  /* Active nav link */
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link, .nav-dropdown-item, .nav-mobile-link').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if(href === path || (path !== '/' && path.startsWith(href) && href !== '/'))
      a.classList.add('active');
  });

  /* Active sidebar link */
  document.querySelectorAll('.sidebar-link').forEach(a => {
    if((a.getAttribute('href') || '') === window.location.pathname)
      a.classList.add('active');
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if(!open) item.classList.add('open');
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  /* Contact form */
  const form = document.getElementById('contact-form');
  if(form){
    const btn = form.querySelector('.form-submit');
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if(form.querySelector('[name="website"]')?.value) return;
      const orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      if(status) status.className = 'form-status';
      try{
        const res = await fetch('/api/contact', {method:'POST', body:new FormData(form)});
        const data = await res.json();
        if(data.success){ window.location.href = '/thank-you.html'; }
        else {
          if(status){ status.textContent = data.message || 'Something went wrong. Please try again.'; status.className = 'form-status error'; }
          btn.textContent = orig; btn.disabled = false;
        }
      } catch {
        if(status){ status.textContent = 'Unable to send right now. Please call us directly.'; status.className = 'form-status error'; }
        btn.textContent = orig; btn.disabled = false;
      }
    });
  }

  /* Scroll reveal */
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    const els = document.querySelectorAll('.service-card, .point, .office-card, .faq-item, .credential-card, .team-photo');
    els.forEach(el => { el.style.opacity='0'; el.style.transform='translateY(18px)'; el.style.transition='opacity .5s ease, transform .5s ease'; });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if(entry.isIntersecting){
          setTimeout(() => { entry.target.style.opacity='1'; entry.target.style.transform='translateY(0)'; }, i * 55);
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:.1, rootMargin:'0px 0px -40px 0px'});
    els.forEach(el => obs.observe(el));
  }

  /* Analytics tracking */
  const track = (event, params) => { if(typeof window.dataLayer !== 'undefined') window.dataLayer.push({event, ...params}); };
  document.querySelectorAll('a[href^="tel:"]').forEach(a => a.addEventListener('click', () => track('phone_click',{phone:a.href})));
  document.querySelectorAll('a[href*="wa.me"]').forEach(a  => a.addEventListener('click', () => track('whatsapp_click',{})));
  document.querySelectorAll('a[href*="line.me"]').forEach(a => a.addEventListener('click', () => track('line_click',{})));
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => a.addEventListener('click', () => track('email_click',{email:a.href})));

  /* Footer year */
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();
})();
