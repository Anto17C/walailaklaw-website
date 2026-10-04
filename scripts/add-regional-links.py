#!/usr/bin/env python3
"""Add "by location" link sections to the practice-area pages (all four languages).

Usage:  python3 scripts/add-regional-links.py

Why: the regional city-service pages (89 per language) were linked only from their own location
page. Each practice page now links to the matching regional pages, so they get internal links from
pages search engines already crawl. Link text is each page's own H1, in the page's language.

Re-runnable: the block between <!-- regional-links --> markers is replaced each time, so run it again
after adding a city-service page (after scripts/i18n/generate_i18n.py).
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts', 'i18n'))
os.chdir(ROOT)
import generate_i18n as g  # noqa: E402  (loads the city-page data; prints a few status lines)

PREFIXES = {'en': '', 'th': 'th/', 'fr': 'fr/', 'zh': 'zh/'}

# practice page -> topic
PAGE_TOPIC = {
    'real-estate-lawyer': 'property',
    'visa-work-permit': 'visa',
    'company-registration-services': 'company',
    'civil-litigation-services': 'disputes',
    'legal-documents-services': 'wills',
    'family-law-services': 'family',
    'criminal-defence-lawyer': 'criminal',
    'bail-bond-services': 'criminal',
    'arbitration-lawyer': 'commercial',
}

TEXT = {
    'property': {
        'en': ('Property due diligence across Thailand', 'Independent property checks, contract review and Land Office support by location:'),
        'th': ('การตรวจสอบทรัพย์สินก่อนซื้อทั่วประเทศไทย', 'การตรวจสอบทรัพย์สินอย่างอิสระ การตรวจสอบสัญญา และการสนับสนุนที่สำนักงานที่ดิน แยกตามพื้นที่:'),
        'fr': ('Due diligence immobilière partout en Thaïlande', "Vérifications immobilières indépendantes, examen des contrats et assistance au Bureau des terres, par zone :"),
        'zh': ('泰国各地房产尽职调查', '按地区提供独立的房产核查、合同审查及土地局办理协助：')},
    'visa': {
        'en': ('Work permit and visa support by location', 'Employment, visa and work permit guidance for employers and foreign employees:'),
        'th': ('บริการใบอนุญาตทำงานและวีซ่าแยกตามพื้นที่', 'คำแนะนำด้านการจ้างงาน วีซ่า และใบอนุญาตทำงานสำหรับนายจ้างและพนักงานต่างชาติ:'),
        'fr': ('Permis de travail et visa par zone', "Conseils en matière d'emploi, de visa et de permis de travail pour les employeurs et les salariés étrangers :"),
        'zh': ('各地工作许可与签证服务', '为雇主及外籍员工提供雇佣、签证及工作许可方面的指导：')},
    'company': {
        'en': ('Company, BOI and business support by location', 'Company setup, foreign investment and commercial support for businesses:'),
        'th': ('บริการด้านบริษัท BOI และธุรกิจแยกตามพื้นที่', 'การจัดตั้งบริษัท การลงทุนจากต่างชาติ และการสนับสนุนทางพาณิชย์สำหรับธุรกิจ:'),
        'fr': ("Société, BOI et soutien aux entreprises par zone", "Création de société, investissement étranger et soutien commercial pour les entreprises :"),
        'zh': ('各地公司、BOI及商业支持', '为企业提供公司设立、外国投资及商业支持：')},
    'disputes': {
        'en': ('Commercial disputes and debt recovery by location', 'Contract claims, unpaid debts, tenancy and enforcement matters:'),
        'th': ('ข้อพิพาททางการค้าและการติดตามหนี้แยกตามพื้นที่', 'ข้อเรียกร้องตามสัญญา หนี้ค้างชำระ เรื่องการเช่า และการบังคับคดี:'),
        'fr': ('Litiges commerciaux et recouvrement par zone', 'Réclamations contractuelles, créances impayées, litiges locatifs et exécution :'),
        'zh': ('各地商业纠纷与债务追收', '合同索赔、欠款、租赁及执行事务：')},
    'wills': {
        'en': ('Wills and estate planning by location', 'Thai wills, estate planning and estate administration:'),
        'th': ('พินัยกรรมและการวางแผนมรดกแยกตามพื้นที่', 'พินัยกรรมไทย การวางแผนมรดก และการจัดการมรดก:'),
        'fr': ('Testaments et successions par zone', "Testaments thaïlandais, planification successorale et administration de succession :"),
        'zh': ('各地遗嘱与遗产规划', '泰国遗嘱、遗产规划及遗产管理：')},
    'criminal': {
        'en': ('Criminal defence appeals and victim assistance', 'Appeals, case-status enquiries and help for complainants in Pattaya:'),
        'th': ('การอุทธรณ์คดีอาญาและการช่วยเหลือผู้เสียหาย', 'การอุทธรณ์ การสอบถามสถานะคดี และการช่วยเหลือผู้ร้องทุกข์ในพัทยา:'),
        'fr': ('Appels pénaux et assistance aux victimes', "Appels, vérification de l'état d'une affaire et assistance aux plaignants à Pattaya :"),
        'zh': ('刑事上诉与受害人协助', '芭堤雅的上诉、案件状态查询及报案人协助：')},
    'commercial': {
        'en': ('Commercial disputes and enforcement by location', 'Contract claims, unpaid trade debts and enforcement planning for businesses:'),
        'th': ('ข้อพิพาททางการค้าและการบังคับคดีแยกตามพื้นที่', 'ข้อเรียกร้องตามสัญญา หนี้การค้าที่ค้างชำระ และการวางแผนบังคับคดีสำหรับธุรกิจ:'),
        'fr': ('Litiges commerciaux et exécution par zone', "Réclamations contractuelles, créances commerciales impayées et planification de l'exécution pour les entreprises :"),
        'zh': ('各地商业纠纷与执行', '为企业提供合同索赔、拖欠贸易款项及执行规划：')},
    'family': {
        'en': ('Family and estate matters by location', 'Family law, divorce mediation and family estate planning:'),
        'th': ('เรื่องครอบครัวและมรดกแยกตามพื้นที่', 'กฎหมายครอบครัว การไกล่เกลี่ยการหย่า และการวางแผนมรดกครอบครัว:'),
        'fr': ('Questions familiales et successorales par zone', 'Droit de la famille, médiation en cas de divorce et planification successorale familiale :'),
        'zh': ('各地家事与遗产事务', '家事法律、离婚调解及家庭遗产规划：')},
}


def topics_of(slug):
    """Which practice topics a regional page belongs to."""
    if 'criminal' in slug:
        return ['criminal']
    if 'visa' in slug or 'workforce' in slug:
        return ['visa']
    if 'wills' in slug or 'family' in slug:
        out = []
        if 'wills' in slug:
            out.append('wills')
        if 'family' in slug:
            out.append('family')
        return out
    if 'company' in slug or 'corporate' in slug:
        return ['company']
    if 'property' in slug and 'disputes' not in slug:
        return ['property']
    out = ['disputes']
    if re.search(r'commercial-disputes|trade-disputes|shipping|supply-chain|debt-recovery|trade-debt', slug) \
            and 'landlord' not in slug:
        out.append('commercial')
    return out


def h1_of(page, locale):
    return page['h1'] if locale == 'en' else g.city_i18n[page['slug']][locale]['h1']


# extra links placed first in a topic block: topic -> slug -> localized link text
EXTRA = {'property': [('off-plan-property-purchase-review', {
    'en': 'Off-Plan Condo & Villa Purchase Contract Review in Thailand',
    'th': 'บริการตรวจสอบสัญญาซื้อคอนโดและวิลล่าก่อนก่อสร้างเสร็จในประเทศไทย',
    'fr': "Revue de Contrat d'Achat sur Plan de Condo et Villa en Thaïlande",
    'zh': '泰国期房公寓与别墅购房合同审查'})]}


def build_block(topic, locale):
    pages = [p for p in g.city_pages if topic in topics_of(p['slug'])
             and (locale == 'en' or p['slug'] in g.city_i18n)]
    pages.sort(key=lambda p: (p['city'], p['slug']))
    prefix = '' if locale == 'en' else f'/{locale}'
    head, intro = TEXT[topic][locale]
    extra = ''.join(f'<a href="{prefix}/{slug}" class="tag">{names[locale]}</a>' for slug, names in EXTRA.get(topic, []))
    tags = extra + ''.join(f'<a href="{prefix}/{p["slug"]}" class="tag">{h1_of(p, locale)}</a>' for p in pages)
    return ('<!-- regional-links -->\n<section class="section-sm">\n  <div class="container">\n'
            f'    <h2 style="font-size:20px; margin-bottom:10px;">{head}</h2>\n'
            f'    <p class="text-secondary" style="font-size:14px; margin-bottom:16px; max-width:680px;">{intro}</p>\n'
            f'    <div class="location-related">{tags}</div>\n  </div>\n</section>\n<!-- /regional-links -->\n\n'), len(pages)


def main():
    done = 0
    for locale, pre in PREFIXES.items():
        for slug, topic in PAGE_TOPIC.items():
            path = f'{pre}{slug}.html'
            if not os.path.exists(path):
                continue
            source = open(path, encoding='utf-8').read()
            source = re.sub(r'<!-- regional-links -->.*?<!-- /regional-links -->\n\n?', '', source, flags=re.S)
            block, n = build_block(topic, locale)
            anchor = '<footer class="site-footer">'
            assert source.count(anchor) == 1, path
            source = source.replace(anchor, block + anchor, 1)
            open(path, 'w', encoding='utf-8').write(source)
            done += 1
            if locale == 'en':
                print(f'{slug}: {n} regional links')
    print(f'updated {done} pages')


if __name__ == '__main__':
    main()
