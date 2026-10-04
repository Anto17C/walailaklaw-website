#!/usr/bin/env python3
"""Add JSON-LD structured data to the hand-authored core pages (all four languages).

Usage:  python3 scripts/add-structured-data.py

What it adds (one <script type="application/ld+json" data-wlf="1"> block per page, re-runnable):
  - Home page:        the firm (LegalService) plus both offices
  - Office pages:     that office (address, phone, hours, map position)
  - Contact page:     both offices
  - Any page with FAQ items (class="faq-item"): FAQPage built from the page's own Q&A text

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
        'pattaya-law-office', 'rayong-law-office']
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


if __name__ == '__main__':
    main()
