#!/usr/bin/env python3
"""Build the five inquiry-driven practice pages in all four languages.

Usage:  python3 scripts/build-gap-pages.py

Pages (content lives in scripts/gap_pages/*.py):
  condominium-purchase-foreign-quota-thailand
  personal-injury-accident-claims-thailand
  pattaya-bar-entertainment-venue-licensing
  labour-disputes-employment-claims-thailand
  child-legitimation-thailand

Each page is written for EN, TH, FR and ZH with the same header, footer, hero and card styles as the
rest of the site (via scripts/i18n/generate_i18n.py). Afterwards run scripts/add-structured-data.py,
scripts/add-regional-links.py and scripts/build-sitemap.py.

The content is general guidance drawn from the kinds of questions clients ask. It contains no client
names or details and no fees.
"""
import glob, importlib.util, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts', 'i18n'))
os.chdir(ROOT)
import generate_i18n as g  # noqa: E402

# Labels shared by every page (a page can override any of them in its own dict).
SHARED = {
    'en': dict(whenTitle="When clients contact us", reviewEyebrow="Scope of advice",
               stagesEyebrow="Support in stages", stagesTitle="Choose the stages you need",
               stagesNote="Each stage has its own scope, agreed with you in writing. You can stop after any stage.",
               faqTitle="Frequently asked questions"),
    'th': dict(whenTitle="เมื่อลูกค้าติดต่อเรา", reviewEyebrow="ขอบเขตการให้คำปรึกษา",
               stagesEyebrow="การสนับสนุนเป็นขั้นตอน", stagesTitle="เลือกขั้นตอนที่คุณต้องการ",
               stagesNote="แต่ละขั้นตอนมีขอบเขตของตนเองซึ่งตกลงกับคุณเป็นลายลักษณ์อักษร คุณหยุดได้หลังจากขั้นตอนใดก็ได้",
               faqTitle="คำถามที่พบบ่อย"),
    'fr': dict(whenTitle="Quand les clients nous contactent", reviewEyebrow="Étendue des conseils",
               stagesEyebrow="Accompagnement par étapes", stagesTitle="Choisir les étapes dont vous avez besoin",
               stagesNote="Chaque étape a son propre périmètre, convenu avec vous par écrit. Vous pouvez vous arrêter après n'importe quelle étape.",
               faqTitle="Questions fréquentes"),
    'zh': dict(whenTitle="客户联系我们的常见情形", reviewEyebrow="咨询范围",
               stagesEyebrow="分阶段支持", stagesTitle="按需选择所需的阶段",
               stagesNote="每个阶段都有各自的范围，并与您书面约定。您可以在任一阶段后停止。",
               faqTitle="常见问题"),
}


def load_pages():
    pages = []
    for path in sorted(glob.glob(os.path.join(ROOT, 'scripts', 'gap_pages', 'p*.py'))):
        spec = importlib.util.spec_from_file_location(os.path.basename(path)[:-3], path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        pages.append(mod.PAGE)
    return pages


def h1_of(slug, locale):
    """Heading of an existing page, used as the link text for related pages."""
    path = f'{"" if locale == "en" else locale + "/"}{slug.lstrip("/")}.html'
    source = open(path, encoding='utf-8').read()
    m = re.search(r'<h1[^>]*>(.*?)</h1>', source, re.S)
    return re.sub(r'<[^>]+>', '', m.group(1)).strip()


def render(page, locale):
    t = {**SHARED[locale], **page['C'][locale]}
    slug = page['slug']
    en_path = f'/{slug}'
    ui = g.UI.get(locale, {})
    pre = '' if locale == 'en' else f'/{locale}'
    home_label = 'Home' if locale == 'en' else ui['home']
    related_title = 'Related legal services' if locale == 'en' else ui['related_services']
    cards = ''.join(
        f'<div class="service-card"><div class="service-icon"><i class="ti {ic}"></i></div><h3>{ti}</h3><p>{de}</p></div>'
        for (ti, de), ic in zip(t['cards'], page['icons']))
    situations = g.list_items(t['situations'])
    fallbacks = g.list_items(t['fallbacks'])
    steps = ''.join(f'<li><strong>{a}</strong> {b}</li>' for a, b in t['stages'])
    faq = ''
    for i, (q, a) in enumerate(t['faq']):
        opened = ' open' if i == 0 else ''
        icon = '−' if i == 0 else '+'
        faq += (f'<div class="faq-item{opened}"><button class="faq-q">{q} <span class="icon">{icon}</span></button>'
                f'<div class="faq-a">{a}</div></div>')
    related = ''.join(f'<a href="{pre}/{s}" class="tag">{h1_of(s, locale)}</a>' for s in page['related'])
    h = g.head(locale, t['title'], t['description'], en_path)
    header = g.header_for(locale, en_path)
    footer = g.footer_for(locale)
    contact = g.contact_module(locale, with_text=False)
    heroimg, heropos = page['heroimg'], page.get('heropos', 'center 65%')
    practice_label = h1_of(page['practice'], locale)
    html = (
        f'{h}{g.TRACKING}{header}<main>'
        f'<section class="hero hero-sm" style="--hero-img-mobile:url(\'/images/{heroimg}\');background-image:{g.STANDARD_OVERLAY},url(\'/images/{heroimg}\');background-size:cover;background-position:{heropos};">'
        f'<div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="{pre}/">{home_label}</a> / <a href="{pre}/{page["practice"]}">{practice_label}</a> / {t["h1"]}</div>'
        f'<span class="eyebrow">{t["eyebrow"]}</span><h1>{t["h1"]}</h1><p class="lead">{t["lead"]}</p></div></div></section>'
        f'<section class="section"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow light">{t["introEyebrow"]}</span><h2 style="margin:14px 0 16px;">{t["introTitle"]}</h2>'
        f'<p class="text-secondary location-copy">{t["intro"]}</p></div>'
        f'<div class="location-panel"><h3>{t["whenTitle"]}</h3><ul class="location-checks">{situations}</ul></div>'
        f'</div></div></section>'
        f'<section class="section on-tint"><div class="container"><div class="section-header">'
        f'<span class="eyebrow light">{t["reviewEyebrow"]}</span><h2>{t["reviewTitle"]}</h2><p>{t["reviewIntro"]}</p></div>'
        f'<div class="services-grid services-grid-three">{cards}</div></div></section>'
        f'<section class="section"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow light">{t["noEyebrow"]}</span><h2 style="margin:14px 0 16px;">{t["noTitle"]}</h2>'
        f'<p class="text-secondary location-copy">{t["noText"]}</p></div>'
        f'<div class="location-panel"><h3>{t["fallbackTitle"]}</h3><ul class="location-checks">{fallbacks}</ul></div>'
        f'</div></div></section>'
        f'<section class="section on-tint"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow light">{t["stagesEyebrow"]}</span><h2 style="margin:14px 0 16px;">{t["stagesTitle"]}</h2>'
        f'<ol class="location-steps">{steps}</ol>'
        f'<p class="text-secondary" style="margin-top:18px;font-size:14px;">{t["stagesNote"]}</p></div>'
        f'<div>{contact}</div></div></div></section>'
        f'<section class="section"><div class="container"><h2 style="font-size:22px; margin-bottom:18px;">{t["faqTitle"]}</h2>'
        f'<div class="faq-list" style="max-width:760px;">{faq}</div></div></section>'
        f'<section class="section-sm on-tint"><div class="container"><h2 style="font-size:20px;margin-bottom:16px;">{related_title}</h2>'
        f'<div class="location-related">{related}</div></div></section>'
        f'</main>{footer}<script src="/js/main.js"></script></body></html>')
    return g.clean(html)


def main():
    for page in load_pages():
        for locale in ['en', 'th', 'fr', 'zh']:
            c = page['C'][locale]
            assert len(c['cards']) == len(page['icons']), (page['slug'], locale, 'cards vs icons')
            path = f'{"" if locale == "en" else locale + "/"}{page["slug"]}.html'
            open(path, 'w', encoding='utf-8').write(render(page, locale))
            print(f'wrote {path}  (meta description {len(c["description"])} chars)')


if __name__ == '__main__':
    main()
