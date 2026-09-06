#!/usr/bin/env python3
"""Generate the Thai and French versions of the 99 locations/service pages, and (re)write the
English versions of those same 99 pages with correct th/fr hreflang + language-switcher links.

This is the source of truth for keeping all three languages of these 99 pages in sync. The
English *content* itself (titles, copy, service lists, etc.) still lives in
scripts/generate-location-pages.mjs and scripts/generate-city-service-pages.mjs — this script
reads it straight out of those two files (see js_array_to_json below) so there is only one place
to edit English copy. The Thai and French translations live in this directory as JSON
(city-pages-i18n.json, location-pages-i18n.json, hub-i18n.json), keyed by the same `slug` used
in the .mjs files.

Usage:  python3 scripts/i18n/generate_i18n.py [--dry]

Run this from the repository root (or anywhere — paths below are resolved relative to this
file). Requires Python 3 only, no dependencies. If you change English copy in the .mjs files,
re-run this script afterwards; if a slug's English fields changed, update its entry in the
matching *-i18n.json file too so the translation stays accurate.
"""
import json, re, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))  # scripts/i18n -> scripts -> repo root

def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# ---------- Pull the English page data straight out of the two .mjs generators ----------
def js_array_to_json(block):
    """Convert a JS array-of-object-literals (single-quoted strings, unquoted keys, no escapes)
    into JSON text. Good enough for the specific, simple data shape used in the two .mjs files."""
    out = []
    i, n = 0, len(block)
    while i < n:
        c = block[i]
        if c == "'":
            j = i + 1
            buf = []
            while j < n and block[j] != "'":
                buf.append(block[j]); j += 1
            out.append(json.dumps(''.join(buf), ensure_ascii=False))
            i = j + 1
        else:
            out.append(c); i += 1
    s = ''.join(out)
    s = re.sub(r'([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)', r'\1"\2"\3', s)
    s = re.sub(r',(\s*[\]}])', r'\1', s)
    return s

def extract_js_array(mjs_path, varname):
    src = read(mjs_path)
    start = src.index(f'const {varname} = [')
    start = src.index('[', start)
    depth, i = 0, start
    while i < len(src):
        if src[i] == '[':
            depth += 1
        elif src[i] == ']':
            depth -= 1
            if depth == 0:
                break
        i += 1
    return json.loads(js_array_to_json(src[start:i + 1]))

city_pages = extract_js_array(f"{ROOT}/scripts/generate-city-service-pages.mjs", 'pages')
loc_pages = extract_js_array(f"{ROOT}/scripts/generate-location-pages.mjs", 'locations')

# ---------- Load the Thai/French translations (hand-authored, kept in this directory) ----------
city_i18n = {x['slug']: x for x in json.load(open(f"{HERE}/city-pages-i18n.json", encoding='utf-8'))}
loc_i18n = {x['slug']: x for x in json.load(open(f"{HERE}/location-pages-i18n.json", encoding='utf-8'))}
hub_i18n = json.load(open(f"{HERE}/hub-i18n.json", encoding='utf-8'))

THAI_NAME = {
    'Rayong':'ระยอง','Pattaya':'พัทยา','Chonburi':'ชลบุรี','Si Racha':'ศรีราชา',
    'Laem Chabang':'แหลมฉบัง','Phuket':'ภูเก็ต','Chiang Mai':'เชียงใหม่','Hua Hin':'หัวหิน',
    'Koh Samui':'เกาะสมุย','Surat Thani':'สุราษฎร์ธานี','Pathum Thani':'ปทุมธานี',
    'Nonthaburi':'นนทบุรี','Samut Prakan':'สมุทรปราการ','Ayutthaya':'อยุธยา',
    'Chiang Rai':'เชียงราย','Khon Kaen':'ขอนแก่น','Udon Thani':'อุดรธานี','Korat':'โคราช',
    'Chanthaburi':'จันทบุรี','Trat':'ตราด',
}

# Static UI strings per locale
UI = {
  'th': {
    'home':'หน้าแรก','locations':'พื้นที่ให้บริการ',
    'nationwide_eyebrow':'บริการทั่วประเทศ · ศักยภาพในพื้นที่',
    'focused_advice':'คำแนะนำเฉพาะพื้นที่','when_contact':'เมื่อลูกความติดต่อเรา',
    'scope_assist':'ขอบเขตความช่วยเหลือ','how_assist':'สำนักงานกฎหมายวลัยลักษณ์ช่วยเหลืออย่างไร',
    'scope_note':'ขอบเขตที่ชัดเจนจะได้รับการยืนยันหลังจากตรวจสอบผลประโยชน์ทับซ้อน เอกสาร วัตถุประสงค์ และความเร่งด่วนแล้ว',
    'typical_work':'งานโดยทั่วไป','practical_point':'ประเด็นเชิงปฏิบัติ',
    'view_practice':'ดูบริการหลักด้านนี้','starting_matter':'การเริ่มต้นดำเนินเรื่อง',
    'clear_review':'การตรวจสอบ ขอบเขตงาน และขั้นตอนถัดไปที่ชัดเจน',
    'step1_t':'การตรวจสอบเบื้องต้น:','step1_d':'เราจะระบุผลประโยชน์ทับซ้อน ความเร่งด่วน วัตถุประสงค์ และข้อมูลสำคัญที่ยังขาดหายไป',
    'step2_t':'ขอบเขตที่ชัดเจน:','step2_d':'ท่านจะได้รับข้อเสนอที่อธิบายงาน ความรับผิดชอบ ค่าธรรมเนียม และค่าใช้จ่ายจากบุคคลภายนอกที่อาจเกิดขึ้น',
    'step3_t':'การดำเนินงานทางกฎหมาย:','step3_d':'สำนักงานกฎหมายวลัยลักษณ์ดูแลการดำเนินงานและแจ้งความคืบหน้าให้ท่านทราบอย่างชัดเจน',
    'related_services':'บริการทางกฎหมายที่เกี่ยวข้อง',
    'discuss':'ปรึกษาเรื่องของท่านเป็นความลับ','discuss_p':'ติดต่อแก้วโดยตรงเพื่อรับการตรวจสอบเบื้องต้น กลยุทธ์ และขอบเขตงาน',
    'legal_support_in':'การสนับสนุนทางกฎหมายใน','who_assist':'กลุ่มลูกความที่เราให้บริการ',
    'relevant_services':'บริการที่เกี่ยวข้อง','matters_we_handle_in':'เรื่องทางกฎหมายที่เราดำเนินการใน',
    'matters_note_pre':'สำนักงานกฎหมายวลัยลักษณ์จะพิจารณาว่าจะดำเนินเรื่องโดยตรงหรือให้ทนายความท้องถิ่นที่เราร่วมงานด้วยใน',
    'matters_note_post':'เข้ามาช่วยในบทบาทที่กำหนดไว้ โดยพิจารณาจากข้อเท็จจริง เขตอำนาจศาล และความจำเป็นในทางปฏิบัติ',
    'explore_service':'ดูรายละเอียดบริการ','flexible_model':'รูปแบบการทำงานที่ยืดหยุ่นของเรา',
    'one_firm':'สำนักงานกฎหมายเดียวที่รับผิดชอบ พร้อมการดำเนินงานที่ยืดหยุ่น',
    'lstep1_t':'การตรวจสอบเบื้องต้น:','lstep1_d':'สำนักงานกฎหมายวลัยลักษณ์จะประเมินข้อเท็จจริง ความเร่งด่วน และผลประโยชน์ทับซ้อน',
    'lstep2_t':'ขอบเขตที่ชัดเจน:','lstep2_d':'ท่านจะได้รับแผนที่ชัดเจนซึ่งอธิบายว่าใครจะดำเนินการในแต่ละส่วนของงานและค่าธรรมเนียม',
    'lstep3_t':'การดำเนินงานที่มีการดูแล:','lstep3_d':'สำนักงานกฎหมายวลัยลักษณ์ให้บริการและดูแลการดำเนินงาน ไม่ว่าจะดำเนินการทั้งหมดโดยสำนักงานเองหรือได้รับการสนับสนุนจากทนายความท้องถิ่นที่เราร่วมงานด้วยสำหรับงานที่กำหนดไว้',
    'related_locations':'พื้นที่ที่เกี่ยวข้อง',
    'call_aria':'โทร',
  },
  'fr': {
    'home':'Accueil','locations':'Zones desservies',
    'nationwide_eyebrow':'SERVICE NATIONAL · CAPACITÉ LOCALE',
    'focused_advice':'Conseils locaux ciblés','when_contact':'Quand les clients nous contactent',
    'scope_assist':"Étendue de l'assistance",'how_assist':'Comment Walailak Law Firm peut vous aider',
    'scope_note':"L'étendue précise est confirmée après examen des conflits d'intérêts, des documents, des objectifs et de l'urgence.",
    'typical_work':'Travail habituel','practical_point':'Un point pratique',
    'view_practice':'Voir le domaine de pratique principal','starting_matter':'Démarrer le dossier',
    'clear_review':'Un examen clair, un périmètre et les prochaines étapes',
    'step1_t':'Examen initial :','step1_d':"Nous identifions les conflits d'intérêts, l'urgence, les objectifs et les informations clés manquantes.",
    'step2_t':'Périmètre défini :','step2_d':"Vous recevez une proposition expliquant le travail, les responsabilités, les honoraires et les coûts probables de tiers.",
    'step3_t':'Travail juridique :','step3_d':'Walailak Law Firm gère le dossier et vous tient informé clairement en français.',
    'related_services':'Services juridiques connexes',
    'discuss':'Discutez d’une affaire en toute confidentialité','discuss_p':'Contactez Kae directement pour un premier examen, une stratégie et un périmètre.',
    'legal_support_in':'Soutien juridique à','who_assist':'Qui nous accompagnons',
    'relevant_services':'Services pertinents','matters_we_handle_in':'Affaires juridiques que nous traitons à',
    'matters_note_pre':"Walailak Law Firm détermine s'il convient de traiter l'affaire directement ou d'associer notre conseil local établi à",
    'matters_note_post':"pour un rôle défini, en fonction des faits, de la juridiction et des besoins pratiques.",
    'explore_service':'Découvrir le service','flexible_model':'Comment fonctionne notre modèle flexible',
    'one_firm':'Un seul cabinet responsable, une exécution flexible',
    'lstep1_t':'Examen initial :','lstep1_d':"Walailak Law Firm évalue les faits, l'urgence et les conflits d'intérêts.",
    'lstep2_t':'Périmètre clair :','lstep2_d':'Vous recevez un plan clair expliquant qui traitera chaque partie du travail et les honoraires.',
    'lstep3_t':'Exécution gérée :','lstep3_d':"Walailak Law Firm fournit et gère la mission, qu'elle soit traitée entièrement par le cabinet ou soutenue par notre conseil local établi pour une tâche définie.",
    'related_locations':'Zones connexes',
    'call_aria':'Appeler',
  }
}

WA_TEXT = {
  'en': 'I%20need%20legal%20assistance%20in%20this%20location.%20Please%20contact%20me.',
  'th': 'I%20need%20legal%20assistance%20in%20this%20location.%20Please%20contact%20me.',
  'fr': 'J%27ai%20besoin%20d%27une%20assistance%20juridique.%20Merci%20de%20me%20contacter.',
}
WA_TEXT_SERVICE = {
  'en': '',
  'th': '',
  'fr': '',
}

def localize_path(en_path, locale):
    """en_path like '/locations', '/locations/chonburi', '/rayong-law-office', '/civil-litigation-services'"""
    if locale == 'en':
        return en_path
    return f'/{locale}{en_path}'

print("Data loaded OK:", len(city_pages), len(loc_pages))

# ---------- Header / Footer extraction ----------
def extract(html, tag):
    m = re.search(rf'<{tag} class="site-{"header" if tag=="header" else "footer"}">.*?</{tag}>', html, re.S)
    return m.group(0)

en_home = read(f"{ROOT}/index.html")
th_home = read(f"{ROOT}/th/index.html")
fr_home = read(f"{ROOT}/fr/index.html")

en_header_raw = extract(en_home, 'header').replace('src="images/', 'src="/images/')
th_header_raw = extract(th_home, 'header').replace('src="../images/', 'src="/images/').replace('href="/th/', 'href="/th/')
fr_header_raw = extract(fr_home, 'header').replace('src="../images/', 'src="/images/')

en_footer = extract(en_home, 'footer').replace('src="images/', 'src="/images/')
th_footer_raw = extract(th_home, 'footer').replace('src="../images/', 'src="/images/')
fr_footer_raw = extract(fr_home, 'footer').replace('src="../images/', 'src="/images/')

def fix_footer_locations(footer_html, locale):
    """Prefix internal footer-locations-bar hrefs with /th or /fr."""
    def repl(m):
        return f'href="/{locale}{m.group(1)}"'
    # only touch hrefs inside the footer-locations-list nav
    m = re.search(r'(<nav class="footer-locations-list".*?</nav>)', footer_html, re.S)
    block = m.group(1)
    fixed = re.sub(r'href="(/(?:rayong-law-office|pattaya-law-office|locations(?:/[a-z-]+)?))"', repl, block)
    return footer_html.replace(block, fixed)

th_footer = fix_footer_locations(th_footer_raw, 'th')
fr_footer = fix_footer_locations(fr_footer_raw, 'fr')

def set_lang_item(header_html, locale, en_path):
    """Replace the .lang-item block so it points to the correct sibling-language equivalents."""
    if locale == 'en':
        trigger = 'EN'
        dropdown = f'<a href="/th{en_path}">TH</a><a href="/fr{en_path}">FR</a>'
    elif locale == 'th':
        trigger = 'ไทย'
        dropdown = f'<a href="{en_path}">EN</a><a href="/fr{en_path}">FR</a>'
    else:
        trigger = 'FR'
        dropdown = f'<a href="{en_path}">EN</a><a href="/th{en_path}">TH</a>'
    new_block = f'<div class="lang-item"><a href="#" class="lang-trigger">{trigger} <span class="caret">&#9662;</span></a><div class="lang-dropdown">{dropdown}</div></div>'
    return re.sub(r'<div class="lang-item">.*?</div></div>', new_block, header_html, count=1, flags=re.S)

def header_for(locale, en_path):
    base = {'en': en_header_raw, 'th': th_header_raw, 'fr': fr_header_raw}[locale]
    return set_lang_item(base, locale, en_path)

def footer_for(locale):
    return {'en': en_footer, 'th': th_footer, 'fr': fr_footer}[locale]

TRACKING = "<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-53CDHSWB\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53CDHSWB');</script>"

STANDARD_OVERLAY = 'linear-gradient(90deg,rgba(20,17,13,0.97) 0%,rgba(20,17,13,0.93) 30%,rgba(20,17,13,0.55) 65%,rgba(20,17,13,0.15) 100%)'

def head(locale, title, description, en_path):
    canonical = f'https://walailaklaw.com{localize_path(en_path, locale)}'
    lang = locale
    hreflang_links = ''.join(
        f'<link rel="alternate" hreflang="{lc}" href="https://walailaklaw.com{localize_path(en_path, lc)}">'
        for lc in ['en', 'th', 'fr']
    )
    return (f'<!DOCTYPE html><html lang="{lang}"><head><meta charset="UTF-8">'
        f'<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{title}</title>'
        f'<meta name="description" content="{description}"><meta property="og:type" content="website">'
        f'<meta property="og:url" content="{canonical}"><meta property="og:title" content="{title}">'
        f'<meta property="og:description" content="{description}">'
        f'<meta property="og:image" content="https://walailaklaw.com/images/og-image.jpg">'
        f'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{title}">'
        f'<meta name="twitter:description" content="{description}">'
        f'<meta name="twitter:image" content="https://walailaklaw.com/images/og-image.jpg">'
        f'<link rel="icon" type="image/svg+xml" href="/images/favicon.svg">'
        f'<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">'
        f'<link rel="canonical" href="{canonical}">{hreflang_links}'
        f'<link rel="preconnect" href="https://fonts.googleapis.com">'
        f'<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet">'
        f'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.44.0/dist/tabler-icons.min.css">'
        f'<link rel="stylesheet" href="/css/style.css"></head><body>')

def contact_module(locale, with_text=True):
    txt = UI.get(locale, {})
    if locale == 'en':
        title, body = 'Discuss a matter confidentially', 'Contact Kae directly for an initial review, strategy and scope.'
    else:
        title, body = txt['discuss'], txt['discuss_p']
    wa_href = 'https://wa.me/66946463940'
    if with_text:
        wa_href += f"?text={WA_TEXT.get(locale, WA_TEXT['en'])}"
    return (f'<div class="contact-module"><div><h4>{title}</h4><p>{body}</p></div>'
        f'<div class="contact-icons"><a href="{wa_href}" class="icon-circle ic-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="ti ti-brand-whatsapp"></i></a>'
        f'<a href="https://line.me/ti/p/~kaezeeds" class="icon-circle ic-line" target="_blank" rel="noopener" aria-label="LINE"><img src="/images/line-icon.png" alt="" style="width:34px;height:34px;border-radius:8px;"></a>'
        f'<a href="tel:+66946463940" class="icon-circle ic-phone" aria-label="Call"><i class="ti ti-phone"></i></a></div></div>')

def service_icon(title, href):
    s = f'{title} {href}'.lower()
    if re.search(r'shipping|logistics', s): return 'ti-ship'
    if re.search(r'employment|visa|work-permit|work permit|workforce', s): return 'ti-e-passport'
    if re.search(r'family|divorce|mediation', s): return 'ti-heart-handshake'
    if re.search(r'wills|estate|succession', s): return 'ti-file-text'
    if re.search(r'dispute|debt|litigation|recovery', s): return 'ti-scale'
    if re.search(r'property|real-estate|real estate|condominium|landlord|tenant', s): return 'ti-building-estate'
    if re.search(r'company|boi|commercial|contract|business|investment|hospitality|trade', s): return 'ti-briefcase'
    return 'ti-file-text'

def clean(html):
    return (html.replace(' & ', ' &amp; '))

print("Header/footer/head helpers ready")

# ---------- service hero (city-service pages) ----------
PRACTICE_HERO = {
    '/criminal-defence-lawyer': ('criminal-defence-lawyer.webp', 'center'),
    '/bail-bond-services': ('Bail-Bond-Lawyer.webp', 'center 80%'),
    '/family-law-services': ('family-lawyer.webp', 'center 85%'),
    '/real-estate-lawyer': ('real-estate-lawyer.webp', 'center 65%'),
    '/company-registration-services': ('company-registration-lawyer.webp', 'center 70%'),
    '/visa-work-permit': ('visa-work-permit-thailand.webp', 'center 90%'),
    '/civil-litigation-services': ('civil-litigation-lawyer.webp', 'center 60%'),
    '/arbitration-lawyer': ('arbitration-lawyer.webp', 'center 55%'),
    '/legal-documents-services': ('legal-documents-lawyer.webp', 'center 80%'),
}

def service_hero(p):
    slug = p['slug']
    if re.search(r'visa|work-permit|employment|workforce', slug):
        return 'visa-work-permit-thailand.webp', 'center 90%'
    if re.search(r'wills|estate', slug):
        return 'legal-documents-lawyer.webp', 'center 80%'
    if p['practice'] in PRACTICE_HERO:
        return PRACTICE_HERO[p['practice']]
    return p['image'], 'center'

def list_items(items):
    return ''.join(f'<li><i class="ti ti-check"></i>{v}</li>' for v in items)

def render_city_page(en, locale):
    slug = en['slug']
    t = en if locale == 'en' else city_i18n[slug][locale]
    ui = UI.get(locale)
    en_path = f'/{slug}'
    title = t['title']; desc = t['description']
    heroimg, heropos = service_hero(en)
    if locale == 'en':
        city_name = en['city']
        office_href = en['office']
        practice_href = en['practice']
    else:
        city_name = THAI_NAME.get(en['city'], en['city']) if locale == 'th' else en['city']
        office_href = f"/{locale}{en['office']}"
        practice_href = f"/{locale}{en['practice']}"
    related_items = t['related'] if locale != 'en' else [r[0] for r in en['related']]
    related_hrefs = [r[1] for r in en['related']]
    if locale != 'en':
        related_hrefs = [f'/{locale}{h}' for h in related_hrefs]
    related_html = ''.join(f'<a href="{h}" class="tag">{lbl}</a>' for lbl, h in zip(related_items, related_hrefs))

    h1 = t['h1'] if locale == 'en' else t['h1']
    eyebrow = t['eyebrow']
    lead = t['lead']
    breadcrumb_home = 'Home' if locale == 'en' else ui['home']
    situations = list_items(t['situations'])
    checks = list_items(t['checks'])

    if locale == 'en':
        focused_advice = 'Focused local advice'
        when_contact = 'When clients contact us'
        scope_assist = 'Scope of assistance'
        how_assist = 'How Walailak Law Firm can assist'
        scope_note = 'The precise scope is confirmed after conflicts, documents, objectives and urgency are reviewed.'
        typical_work = 'Typical work'
        practical_point = 'A practical point'
        view_practice = 'View the main practice area'
        starting_matter = 'Starting the matter'
        clear_review = 'Clear review, scope and next steps'
        step1_t, step1_d = 'Initial review:', 'We identify conflicts, urgency, objectives and key missing information.'
        step2_t, step2_d = 'Defined scope:', 'You receive a proposal explaining the work, responsibilities, fees and likely third-party costs.'
        step3_t, step3_d = 'Legal work:', 'Walailak Law Firm manages the engagement and keeps you informed in clear English.'
        related_services = 'Related legal services'
    else:
        focused_advice = ui['focused_advice']; when_contact = ui['when_contact']
        scope_assist = ui['scope_assist']; how_assist = ui['how_assist']; scope_note = ui['scope_note']
        typical_work = ui['typical_work']; practical_point = ui['practical_point']; view_practice = ui['view_practice']
        starting_matter = ui['starting_matter']; clear_review = ui['clear_review']
        step1_t, step1_d = ui['step1_t'], ui['step1_d']
        step2_t, step2_d = ui['step2_t'], ui['step2_d']
        step3_t, step3_d = ui['step3_t'], ui['step3_d']
        related_services = ui['related_services']

    h = head(locale, title, desc, en_path)
    header = header_for(locale, en_path)
    footer = footer_for(locale)
    contact = contact_module(locale, with_text=False)

    html = (f'{h}{TRACKING}{header}<main>'
        f'<section class="hero hero-sm" style="--hero-img-mobile:url(\'/images/{heroimg}\');background-image:{STANDARD_OVERLAY},url(\'/images/{heroimg}\');background-size:cover;background-position:{heropos};">'
        f'<div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="/{locale+"/" if locale!="en" else ""}">{breadcrumb_home}</a> / <a href="{office_href}">{city_name}</a> / {h1}</div>'
        f'<span class="eyebrow">{eyebrow}</span><h1>{h1}</h1><p class="lead">{lead}</p></div></div></section>'
        f'<section class="section"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow light">{focused_advice}</span><h2 style="margin:14px 0 16px;">{t["introTitle"]}</h2>'
        f'<p class="text-secondary location-copy">{t["intro"]}</p></div>'
        f'<div class="location-panel"><h3>{when_contact}</h3><ul class="location-checks">{situations}</ul></div>'
        f'</div></div></section>'
        f'<section class="section on-tint"><div class="container"><div class="section-header">'
        f'<span class="eyebrow light">{scope_assist}</span><h2>{how_assist}</h2><p>{scope_note}</p></div>'
        f'<div class="two-col"><div class="location-panel"><h3>{typical_work}</h3><ul class="location-checks">{checks}</ul></div>'
        f'<div><span class="eyebrow light">{practical_point}</span><h2 style="margin:14px 0 16px;">{t["warningTitle"]}</h2>'
        f'<p class="text-secondary location-copy">{t["warning"]}</p>'
        f'<p style="margin-top:18px;"><a href="{practice_href}" class="link">{view_practice} <i class="ti ti-arrow-right"></i></a></p>'
        f'</div></div></div></section>'
        f'<section class="section"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow light">{starting_matter}</span><h2 style="margin:14px 0 16px;">{clear_review}</h2>'
        f'<ol class="location-steps"><li><strong>{step1_t}</strong> {step1_d}</li>'
        f'<li><strong>{step2_t}</strong> {step2_d}</li><li><strong>{step3_t}</strong> {step3_d}</li></ol>'
        f'</div><div>{contact}</div></div></div></section>'
        f'<section class="section-sm on-tint"><div class="container"><h2 style="font-size:20px;margin-bottom:16px;">{related_services}</h2>'
        f'<div class="location-related">{related_html}</div></div></section>'
        f'</main>{footer}<script src="/js/main.js"></script></body></html>')
    return clean(html)

print("City-page renderer ready")

# ---------- location page renderer ----------
def city_disp(name, locale):
    if locale == 'th':
        return THAI_NAME.get(name, name)
    return name

def render_location_page(en, locale):
    slug = en['slug']
    t = en if locale == 'en' else loc_i18n[slug][locale]
    ui = UI.get(locale)
    en_path = f'/locations/{slug}'
    title = t['title']; desc = t['description']
    name_disp = city_disp(en['name'], locale)
    heroimg = f'location-{slug}-hero.webp'

    if locale == 'en':
        h1 = f"English-Speaking Lawyers in {en['name']}"
        breadcrumb_home = 'Home'; locations_label = 'Locations'
        eyebrow = 'NATIONWIDE SERVICE · LOCAL CAPABILITY'
        legal_support_in = f"Legal support in {en['name']}"
        who_assist = 'Who we assist'
        relevant_services = 'Relevant services'
        matters_h2 = f"Legal matters we handle in {en['name']}"
        matters_p = (f"Walailak Law Firm determines whether to handle the matter directly or include our local "
                     f"counsel in {en['name']} for a defined role, based on the facts, jurisdiction and practical needs.")
        explore_service = 'Explore the service'
        flexible_model = 'How our flexible model works'
        one_firm = 'One accountable law firm, flexible delivery'
        lstep1_t, lstep1_d = 'Initial review:', 'Walailak Law Firm assesses the facts, urgency and conflicts.'
        lstep2_t, lstep2_d = 'Clear scope:', 'You receive a clear plan explaining who will handle each part of the work and the fees.'
        lstep3_t, lstep3_d = 'Managed delivery:', 'Walailak Law Firm provides and manages the engagement, whether the matter is handled entirely by the firm or supported by our established local counsel for a defined task.'
        related_locations_lbl = 'Related locations'
        clients = en['clients']
        services = en['services']
        focus = en['focus']
        related_pairs = en['related']
        lead = en['lead']; context_title = en['contextTitle']; context = en['context']
    else:
        h1 = t['title'].split(' | ')[0]
        breadcrumb_home = ui['home']; locations_label = ui['locations']
        eyebrow = ui['nationwide_eyebrow']
        legal_support_in = f"{ui['legal_support_in']} {name_disp}" if locale == 'th' else f"{ui['legal_support_in']} {name_disp}"
        who_assist = ui['who_assist']
        relevant_services = ui['relevant_services']
        matters_h2 = f"{ui['matters_we_handle_in']}{'' if locale=='th' else ' '}{name_disp}" if locale=='th' else f"{ui['matters_we_handle_in']} {name_disp}"
        matters_p = f"{ui['matters_note_pre']}{name_disp}{ui['matters_note_post']}" if locale == 'th' else f"{ui['matters_note_pre']} {name_disp} {ui['matters_note_post']}"
        explore_service = ui['explore_service']
        flexible_model = ui['flexible_model']
        one_firm = ui['one_firm']
        lstep1_t, lstep1_d = ui['lstep1_t'], ui['lstep1_d']
        lstep2_t, lstep2_d = ui['lstep2_t'], ui['lstep2_d']
        lstep3_t, lstep3_d = ui['lstep3_t'], ui['lstep3_d']
        related_locations_lbl = ui['related_locations']
        clients = t['clients']
        services = t['services']
        focus = t['focus']
        related_pairs = list(zip(t['related'], [r[1] for r in en['related']]))
        lead = t['lead']; context_title = t['contextTitle']; context = t['context']

    clients_html = ''.join(f'<li><i class="ti ti-check"></i>{v}</li>' for v in clients)
    cards_html = ''
    for svc, en_svc in zip(services, en['services']):
        s_title, s_desc, s_href = svc
        _, _, en_href = en_svc
        href = s_href if locale == 'en' else f'/{locale}{en_href}'
        icon = service_icon(en_svc[0], en_svc[2])
        cards_html += (f'<div class="service-card"><div class="service-icon"><i class="ti {icon}"></i></div>'
            f'<h3>{s_title}</h3><p>{s_desc}</p><a href="{href}" class="link">{explore_service} <i class="ti ti-arrow-right"></i></a></div>')
    related_html = ''
    for (lbl, en_href) in related_pairs:
        href = en_href if locale == 'en' else f'/{locale}{en_href}'
        related_html += f'<a href="{href}" class="tag">{lbl}</a>'

    home_href = '/' if locale == 'en' else f'/{locale}/'
    locations_href = '/locations' if locale == 'en' else f'/{locale}/locations'

    h = head(locale, title, desc, en_path)
    header = header_for(locale, en_path)
    footer = footer_for(locale)
    contact = contact_module(locale)

    html = (f'{h}{TRACKING}{header}<main>'
        f'<section class="hero hero-sm" style="--hero-img-mobile:url(\'/images/{heroimg}\');background-image:{STANDARD_OVERLAY},url(\'/images/{heroimg}\');">'
        f'<div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="{home_href}">{breadcrumb_home}</a> / <a href="{locations_href}">{locations_label}</a> / {name_disp}</div>'
        f'<span class="eyebrow">{eyebrow}</span><h1>{h1}</h1><p class="lead">{lead}</p></div></div></section>'
        f'<section class="section"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow light">{legal_support_in}</span><h2 style="margin:14px 0 16px;">{context_title}</h2>'
        f'<p class="text-secondary location-copy">{context}</p></div>'
        f'<div class="location-panel"><h3>{who_assist}</h3><ul class="location-checks">{clients_html}</ul></div>'
        f'</div></div></section>'
        f'<section class="section on-tint"><div class="container"><div class="section-header">'
        f'<span class="eyebrow light">{relevant_services}</span><h2>{matters_h2}</h2><p>{matters_p}</p></div>'
        f'<div class="services-grid location-services">{cards_html}</div></div></section>'
        f'<section class="section"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow light">{flexible_model}</span><h2 style="margin:14px 0 16px;">{one_firm}</h2>'
        f'<p class="text-secondary location-copy">{focus}</p>'
        f'<ol class="location-steps"><li><strong>{lstep1_t}</strong> {lstep1_d}</li>'
        f'<li><strong>{lstep2_t}</strong> {lstep2_d}</li><li><strong>{lstep3_t}</strong> {lstep3_d}</li></ol>'
        f'</div><div>{contact}</div></div></div></section>'
        f'<section class="section-sm on-tint"><div class="container"><h2 style="font-size:20px;margin-bottom:16px;">{related_locations_lbl}</h2>'
        f'<div class="location-related">{related_html}</div></div></section>'
        f'</main>{footer}<script src="/js/main.js"></script></body></html>')
    return clean(html)

print("Location-page renderer ready")

# ---------- hub renderer ----------
def render_hub(locale):
    en_path = '/locations'
    if locale == 'en':
        title = 'Legal Services Across Thailand | Walailak Law Firm'
        description = 'Find Walailak Law Firm offices and legal services in Rayong, Pattaya, Chonburi, Si Racha, Laem Chabang, Phuket and Chiang Mai.'
        eyebrow = 'OFFICES · NATIONWIDE LEGAL SERVICES'
        h1 = 'Legal Services Across Thailand'
        lead = ('Walailak Law Firm provides legal services throughout Thailand, handling matters directly and '
                'working with our established local counsel only when the matter requires local support.')
        where_eyebrow = 'Where we work'
        where_h2 = 'One trusted point of contact, backed by local capability'
        where_body = ('Rayong and Pattaya are our physical offices. In other listed locations, Walailak Law Firm '
                       'provides and manages the legal service nationwide, working with our established local counsel only when appropriate.')
        model_eyebrow = 'THE WALAILAK MODEL'
        model_h2 = 'Direct leadership with flexible delivery'
        model_body = ('Walailak Law Firm reviews the enquiry and decides the best way to handle it. The firm may manage '
                       'every stage directly, work remotely or arrange travel; our established local counsel is involved '
                       'only when attendance, specialist input or practical efficiency benefits the client.')
        office_label = 'Office'; coverage_label = 'Nationwide coverage'; view_location = 'View location'
        breadcrumb_home = 'Home'; breadcrumb_self = 'Locations'
        rayong_desc = 'Our principal Eastern Seaboard office for property, industry, disputes and urgent matters.'
        pattaya_desc = 'Our Pattaya office for property, business, family and criminal matters.'
        rayong_name, pattaya_name = 'Rayong', 'Pattaya'
    else:
        t = hub_i18n[locale]
        title = t['title']; description = t['description']; eyebrow = t['eyebrow']; h1 = t['h1']; lead = t['lead']
        where_eyebrow = t['whereEyebrow']; where_h2 = t['whereH2']; where_body = t['whereBody']
        model_eyebrow = t['modelEyebrow']; model_h2 = t['modelH2']; model_body = t['modelBody']
        office_label = t['officeLabel']; coverage_label = t['coverageLabel']; view_location = t['viewLocation']
        breadcrumb_home = t['breadcrumbHome']
        rayong_desc = t['rayongDesc']; pattaya_desc = t['pattayaDesc']
        rayong_name = THAI_NAME['Rayong'] if locale == 'th' else 'Rayong'
        pattaya_name = THAI_NAME['Pattaya'] if locale == 'th' else 'Pattaya'
        breadcrumb_self = t['breadcrumbSelf']

    cards = []
    rayong_href = '/rayong-law-office' if locale == 'en' else f'/{locale}/rayong-law-office'
    pattaya_href = '/pattaya-law-office' if locale == 'en' else f'/{locale}/pattaya-law-office'
    cards.append((office_label, rayong_name, rayong_desc, rayong_href))
    cards.append((office_label, pattaya_name, pattaya_desc, pattaya_href))
    for loc in loc_pages:
        slug = loc['slug']
        if locale == 'en':
            name = loc['name']; desc = loc['lead']
        else:
            name = city_disp(loc['name'], locale)
            desc = loc_i18n[slug][locale]['lead']
        href = f'/locations/{slug}' if locale == 'en' else f'/{locale}/locations/{slug}'
        cards.append((coverage_label, name, desc, href))
    cards_html = ''.join(
        f'<article class="location-card"><span>{k}</span><h3>{n}</h3><p>{d}</p>'
        f'<a href="{h}" class="link">{view_location} <i class="ti ti-arrow-right"></i></a></article>'
        for (k, n, d, h) in cards)

    home_href = '/' if locale == 'en' else f'/{locale}/'

    h = head(locale, title, description, en_path)
    header = header_for(locale, en_path)
    footer = footer_for(locale)
    contact = contact_module(locale)

    html = (f'{h}{TRACKING}{header}<main class="locations-hub">'
        f'<section class="hero hero-sm" style="--hero-img-mobile:url(\'/images/locations-thailand-hero.webp\');background-image:linear-gradient(90deg,rgba(20,17,13,.97),rgba(20,17,13,.75)),url(\'/images/locations-thailand-hero.webp\');">'
        f'<div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="{home_href}">{breadcrumb_home}</a> / {breadcrumb_self}</div>'
        f'<span class="eyebrow">{eyebrow}</span><h1>{h1}</h1><p class="lead">{lead}</p></div></div></section>'
        f'<section class="section"><div class="container"><div class="section-header">'
        f'<span class="eyebrow light">{where_eyebrow}</span><h2>{where_h2}</h2><p>{where_body}</p></div>'
        f'<div class="location-grid">{cards_html}</div></div></section>'
        f'<section class="section on-dark locations-model"><div class="container"><div class="two-col"><div>'
        f'<span class="eyebrow">{model_eyebrow}</span><h2 style="color:#fff;margin:14px 0 16px;">{model_h2}</h2>'
        f'<p class="location-copy" style="color:var(--text-on-dark-secondary);">{model_body}</p></div>'
        f'<div>{contact}</div></div></div></section>'
        f'</main>{footer}<script src="/js/main.js"></script></body></html>')
    return clean(html)

print("Hub renderer ready")

# ---------- Main write loop ----------
def path_for(locale, kind, slug=None):
    prefix = '' if locale == 'en' else f'{locale}/'
    if kind == 'hub':
        return f'{ROOT}/{prefix}locations.html'
    if kind == 'location':
        return f'{ROOT}/{prefix}locations/{slug}.html'
    return f'{ROOT}/{prefix}{slug}.html'

if __name__ == '__main__':
    import sys
    DRY = '--dry' in sys.argv
    written = []
    for locale in ['en', 'th', 'fr']:
        # hub
        out = render_hub(locale)
        p = path_for(locale, 'hub')
        if not DRY: write(p, out)
        written.append(p)
        # 18 location pages
        for loc in loc_pages:
            out = render_location_page(loc, locale)
            p = path_for(locale, 'location', loc['slug'])
            if not DRY: write(p, out)
            written.append(p)
        # 80 city-service pages
        for cp in city_pages:
            out = render_city_page(cp, locale)
            p = path_for(locale, 'service', cp['slug'])
            if not DRY: write(p, out)
            written.append(p)
    print(f"Total files {'planned' if DRY else 'written'}:", len(written))
    print("EN:", sum(1 for p in written if '/th/' not in p and '/fr/' not in p))
    print("TH:", sum(1 for p in written if '/th/' in p))
    print("FR:", sum(1 for p in written if '/fr/' in p))
