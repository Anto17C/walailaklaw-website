#!/usr/bin/env python3
"""Add JSON-LD structured data to the hand-authored core pages (all four languages).

Usage:  python3 scripts/add-structured-data.py

What it adds (one <script type="application/ld+json" data-wlf="1"> block per page, re-runnable):
  - Home page:        the firm (LegalService) plus both offices
  - Office pages:     that office (address, phone, hours, map position)
  - Contact page:     both offices
  - Any page with FAQ items (class="faq-item"): FAQPage built from the page's own Q&A text
  - Every page with a visible breadcrumb (<div class="breadcrumb">), in all languages and the
    locations folder: BreadcrumbList built from that breadcrumb, in its own
    <script type="application/ld+json" data-wlf="breadcrumb"> block (re-runnable)

Only facts already shown on the site are used (addresses, phone, email, hours; the map
positions come from the embedded Google Maps on the office pages). Languages are limited to
English and Thai because the FR/ZH pages explain matters in English, not in French or Chinese.
"""
import html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://walailaklaw.com'
PREFIXES = ['', 'th/', 'fr/', 'zh/']
CORE = ['index', 'about', 'services', 'faqs', 'contact', 'criminal-defence-lawyer', 'bail-bond-services',
        'family-law-services', 'real-estate-lawyer', 'company-registration-services', 'visa-work-permit',
        'civil-litigation-services', 'arbitration-lawyer', 'legal-documents-services',
        'pattaya-law-office', 'rayong-law-office', 'off-plan-property-purchase-review',
        'condominium-purchase-foreign-quota-thailand',
        'personal-injury-accident-claims-thailand',
        'pattaya-bar-entertainment-venue-licensing',
        'labour-disputes-employment-claims-thailand',
        'child-legitimation-thailand']
NAME = {'': 'Walailak Law Firm', 'th/': 'สำนักงานกฎหมายวลัยลักษณ์', 'fr/': 'Walailak Law Firm', 'zh/': '瓦莱拉克律师事务所'}
LANG = {'': 'en', 'th/': 'th', 'fr/': 'fr', 'zh/': 'zh-Hans'}
OFFICE_LABEL = {
    'rayong': {'': 'Rayong Office', 'th/': 'สำนักงานระยอง', 'fr/': 'Bureau de Rayong', 'zh/': '罗勇办公室'},
    'pattaya': {'': 'Pattaya Office', 'th/': 'สำนักงานพัทยา', 'fr/': 'Bureau de Pattaya', 'zh/': '芭堤雅办公室'},
}
MARK = 'data-wlf="1"'

HOURS = [
    {'@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
     'opens': '09:00', 'closes': '17:30'},
    {'@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Saturday', 'opens': '09:30', 'closes': '14:00'},
]
OFFICES = {
    'rayong': dict(slug='rayong-law-office', label='Rayong Office', street='131/40 Moo 2, Thap Ma Subdistrict',
                   city='Mueang Rayong', region='Rayong', postal='21000', lat=12.69769, lng=101.21741),
    'pattaya': dict(slug='pattaya-law-office', label='Pattaya Office', street='340/102 Moo 9, Nongprue Subdistrict',
                    city='Banglamung', region='Chonburi', postal='20150', lat=12.93903, lng=100.90209),
}


def page_url(prefix, slug):
    path = '' if slug == 'index' else slug
    return f"{SITE}/{prefix}{path}".rstrip('/') + ('/' if slug == 'index' else '')


def firm_ref(prefix):
    return {'@type': 'Organization', 'name': NAME[prefix], 'url': page_url(prefix, 'index')}


def office_node(key, prefix):
    o = OFFICES[key]
    return {
        '@type': 'LegalService',
        'name': f"{NAME[prefix]} - {OFFICE_LABEL[key][prefix]}",
        'url': page_url(prefix, o['slug']),
        'image': f'{SITE}/images/walailak-primary-logo.webp',
        'telephone': '+66946463940',
        'email': 'kae@walailaklaw.com',
        'address': {'@type': 'PostalAddress', 'streetAddress': o['street'], 'addressLocality': o['city'],
                    'addressRegion': o['region'], 'postalCode': o['postal'], 'addressCountry': 'TH'},
        'geo': {'@type': 'GeoCoordinates', 'latitude': o['lat'], 'longitude': o['lng']},
        'openingHoursSpecification': HOURS,
        'areaServed': {'@type': 'Country', 'name': 'Thailand'},
        'availableLanguage': ['English', 'Thai'],
        'parentOrganization': firm_ref(prefix),
    }


def firm_node(prefix):
    return {
        '@type': 'LegalService',
        'name': NAME[prefix],
        'alternateName': 'Walailak Law Firm',
        'url': page_url(prefix, 'index'),
        'logo': f'{SITE}/images/walailak-primary-logo.webp',
        'image': f'{SITE}/images/walailak-primary-logo.webp',
        'telephone': '+66946463940',
        'email': 'kae@walailaklaw.com',
        'areaServed': {'@type': 'Country', 'name': 'Thailand'},
        'availableLanguage': ['English', 'Thai'],
    }


def clean(text):
    text = re.sub(r'<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()


def faq_node(source, lang):
    items = re.findall(r'<button class="faq-q">(.*?)</button>\s*<div class="faq-a">(.*?)</div>', source, re.S)
    qa = []
    for q, a in items:
        q = clean(re.sub(r'<span class="icon">.*?</span>', '', q, flags=re.S))
        a = clean(a)
        if q and a:
            qa.append({'@type': 'Question', 'name': q,
                       'acceptedAnswer': {'@type': 'Answer', 'text': a}})
    if not qa:
        return None
    return {'@type': 'FAQPage', 'inLanguage': lang, 'mainEntity': qa}


def build(prefix, slug, source):
    nodes = []
    if slug == 'index':
        nodes += [firm_node(prefix), office_node('rayong', prefix), office_node('pattaya', prefix)]
    elif slug in ('rayong-law-office', 'pattaya-law-office'):
        nodes.append(office_node(slug.split('-')[0], prefix))
    elif slug == 'contact':
        nodes += [office_node('pattaya', prefix), office_node('rayong', prefix)]
    faq = faq_node(source, LANG[prefix])
    if faq:
        nodes.append(faq)
    return nodes


BC_MARK = 'data-wlf="breadcrumb"'
BC_DIRS = ['', 'th/', 'fr/', 'zh/', 'locations/', 'th/locations/', 'fr/locations/', 'zh/locations/']


def abs_url(href):
    return href if href.startswith('http') else SITE + href


def own_url(rel_path):
    """Canonical URL of a page from its path relative to the site root."""
    path = rel_path[:-5] if rel_path.endswith('.html') else rel_path
    if path == 'index':
        return SITE + '/'
    if path.endswith('/index'):
        return SITE + '/' + path[:-5]
    return f'{SITE}/{path}'


def breadcrumb_node(source, rel_path):
    m = re.search(r'<div class="breadcrumb">(.*?)</div>', source, re.S)
    if not m:
        return None
    parts = [p.strip() for p in m.group(1).split(' / ') if p.strip()]
    items = []
    for i, part in enumerate(parts, 1):
        link = re.match(r'<a href="([^"]+)"[^>]*>(.*?)</a>$', part, re.S)
        if link:
            items.append({'@type': 'ListItem', 'position': i, 'name': clean(link.group(2)),
                          'item': abs_url(link.group(1))})
        else:
            items.append({'@type': 'ListItem', 'position': i, 'name': clean(part), 'item': own_url(rel_path)})
    if len(items) < 2:
        return None
    return {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': items}


def add_breadcrumbs():
    done = 0
    for folder in BC_DIRS:
        base = os.path.join(ROOT, folder)
        if not os.path.isdir(base):
            continue
        for name in sorted(os.listdir(base)):
            if not name.endswith('.html') or name in ('404.html', 'index.html'):
                continue
            path = os.path.join(base, name)
            source = open(path, encoding='utf-8').read()
            cleaned = re.sub(r'<script type="application/ld\+json" ' + re.escape(BC_MARK) + r'>.*?</script>\n?', '',
                             source, flags=re.S)
            node = breadcrumb_node(cleaned, folder + name)
            if node:
                payload = json.dumps(node, ensure_ascii=False, indent=1).replace('</', '<\\/')
                block = f'<script type="application/ld+json" {BC_MARK}>\n{payload}\n</script>\n'
                cleaned = cleaned.replace('</head>', block + '</head>', 1)
                done += 1
            if cleaned != source:
                open(path, 'w', encoding='utf-8').write(cleaned)
    print(f'breadcrumb markup written to {done} pages')


def main():
    changed = 0
    for prefix in PREFIXES:
        for slug in CORE:
            path = os.path.join(ROOT, f'{prefix}{slug}.html')
            if not os.path.exists(path):
                continue
            source = open(path, encoding='utf-8').read()
            source = re.sub(r'<script type="application/ld\+json" ' + re.escape(MARK) + r'>.*?</script>\n?', '',
                            source, flags=re.S)
            nodes = build(prefix, slug, source)
            if nodes:
                data = {'@context': 'https://schema.org', '@graph': nodes}
                payload = json.dumps(data, ensure_ascii=False, indent=1).replace('</', '<\\/')
                block = f'<script type="application/ld+json" {MARK}>\n{payload}\n</script>\n'
                source = source.replace('</head>', block + '</head>', 1)
                changed += 1
            open(path, 'w', encoding='utf-8').write(source)
    print(f'structured data written to {changed} pages')
    add_breadcrumbs()


if __name__ == '__main__':
    main()
