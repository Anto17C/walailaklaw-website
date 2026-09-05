import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

const locations = [
  {
    slug: 'chonburi', name: 'Chonburi', image: 'company-registration-lawyer.webp',
    title: 'English-Speaking Lawyers in Chonburi | Walailak Law Firm',
    description: 'English-speaking legal services in Chonburi for international businesses, foreign residents and families, provided by Walailak Law Firm with local support when useful.',
    lead: 'Comprehensive legal support for international businesses, foreign residents and families across Chonburi province—from commercial and industrial matters to property, disputes and urgent representation.',
    contextTitle: 'A connected legal market with very different client needs',
    context: 'Chonburi combines major industrial estates, international supply chains, Laem Chabang Port, established residential communities and Pattaya’s tourism economy. A matter may involve provincial courts and authorities, an industrial estate, a Land Office or specialist local attendance. Walailak Law Firm leads each engagement and can handle the matter directly, adding suitable local counsel only when the work benefits from it.',
    clients: ['Manufacturers and foreign-invested companies', 'Executives and international employees', 'Property buyers and long-term residents', 'Overseas counsel needing Thai representation'],
    services: [
      ['Company, BOI & investment support', 'Company structuring, foreign ownership questions, contracts and practical coordination for businesses entering or operating in the Eastern Economic Corridor.', '/company-registration-services'],
      ['Commercial disputes & debt recovery', 'Contract claims, trade debts, negotiation, litigation strategy and enforcement planning involving Chonburi businesses.', '/civil-litigation-services'],
      ['Property & Land Office matters', 'Independent due diligence, contract review, title checks and registration support for residential and commercial property.', '/real-estate-lawyer'],
      ['Employment & regulatory matters', 'Employment documentation, workplace disputes, work permits and liaison with relevant authorities.', '/visa-work-permit']
    ],
    focus: 'Chonburi is a broad provincial market. Walailak Law Firm determines whether to handle the full matter directly or include additional counsel for a particular court, authority or local task.',
    related: [['Pattaya Office','/pattaya-law-office'],['Si Racha','/locations/si-racha'],['Laem Chabang','/locations/laem-chabang']]
  },
  {
    slug: 'si-racha', name: 'Si Racha', image: 'arbitration-lawyer.webp',
    title: 'English-Speaking Lawyers in Si Racha | Walailak Law Firm',
    description: 'Legal services in Si Racha for international companies, executives and foreign residents, with local capability available when the matter requires it.',
    lead: 'Business-focused legal assistance for international companies, executives and families in Si Racha and the surrounding Eastern Seaboard industrial area.',
    contextTitle: 'Legal support shaped around industry and international management',
    context: 'Si Racha sits between major industrial estates, residential communities and Laem Chabang’s logistics economy. Clients commonly need help that crosses company, employment, immigration, contract and property issues. Walailak Law Firm leads the matter in English and may handle it directly or add suitable local counsel for specific location-dependent work.',
    clients: ['Foreign-invested and Thai operating companies', 'International directors and managers', 'Suppliers, contractors and trade creditors', 'Foreign employees and their families'],
    services: [
      ['Corporate & commercial support', 'Company establishment, governance, shareholder and contract matters for operating businesses.', '/company-registration-services'],
      ['Employment, visa & work permits', 'Coordinated advice for lawful employment, management roles, work authorization and workforce issues.', '/visa-work-permit'],
      ['Contract and payment disputes', 'Practical assessment, demand strategy, negotiation and litigation support for commercial disagreements.', '/civil-litigation-services'],
      ['Executive property matters', 'Independent review of purchases, leases and property arrangements for foreign executives and families.', '/real-estate-lawyer']
    ],
    focus: 'The Si Racha page is intentionally centred on corporate operations, executives and industrial relationships rather than duplicating Pattaya’s tourism and residential focus.',
    related: [['Chonburi','/locations/chonburi'],['Laem Chabang','/locations/laem-chabang'],['Rayong Office','/rayong-law-office']]
  },
  {
    slug: 'laem-chabang', name: 'Laem Chabang', image: 'civil-litigation-lawyer.webp',
    title: 'English-Speaking Lawyers in Laem Chabang | Walailak Law Firm',
    description: 'Legal support in Laem Chabang for logistics, shipping, industrial and trading businesses, with local capability available when required.',
    lead: 'Legal assistance for logistics operators, importers, exporters, manufacturers, contractors and international businesses connected to Laem Chabang.',
    contextTitle: 'Commercial legal work around Thailand’s principal port economy',
    context: 'Laem Chabang’s commercial environment brings together port operations, shipping, customs coordination, warehousing, industrial estates and cross-border trade. Legal problems can involve several contracts and parties at once. We help clients define responsibility, preserve documents and coordinate the appropriate Thai legal response.',
    clients: ['Logistics and customs-service businesses', 'Importers, exporters and overseas suppliers', 'Manufacturers and warehouse operators', 'Shipping and transport counterparties'],
    services: [
      ['Shipping & logistics disputes', 'Contract and liability review involving transport, demurrage, detention, cargo, agency and payment issues.', '/civil-litigation-services'],
      ['Trade debt recovery', 'Assessment, demand letters, negotiation, court proceedings and enforcement strategy for unpaid commercial obligations.', '/civil-litigation-services'],
      ['Commercial contracts', 'Drafting and review for suppliers, service providers, contractors and operating partners.', '/legal-documents-services'],
      ['Company & workforce support', 'Company, licensing, employment, visa and work-permit coordination for businesses operating locally.', '/company-registration-services']
    ],
    focus: 'Walailak Law Firm may handle the full engagement directly. If a dispute, court, authority or operational issue calls for additional local capability, the firm selects and manages that support while remaining responsible for the engagement and the client relationship.',
    related: [['Si Racha','/locations/si-racha'],['Chonburi','/locations/chonburi'],['Rayong Office','/rayong-law-office']]
  },
  {
    slug: 'phuket', name: 'Phuket', image: 'real-estate-lawyer.webp',
    title: 'English-Speaking Lawyers in Phuket | Walailak Law Firm',
    description: 'Independent legal assistance in Phuket for foreign property buyers, international residents and hospitality businesses, coordinated by Walailak Law Firm.',
    lead: 'Independent legal guidance for foreign property buyers, international residents and businesses in Phuket, with local capability available when it adds value.',
    contextTitle: 'Property and business decisions require independent review',
    context: 'Phuket’s villa, condominium, leasehold and hospitality markets create valuable opportunities alongside significant legal risk. Buyers and investors should verify title, building status, seller authority, contracts and the proposed ownership structure before committing funds. Businesses also need structures that reflect genuine ownership and comply with Thai law.',
    clients: ['Overseas villa and condominium buyers', 'Foreign residents and international families', 'Hospitality, restaurant and tourism businesses', 'Investors seeking lawful company structures'],
    services: [
      ['Property due diligence', 'Independent title, encumbrance, seller-authority, building and contract checks before a deposit or completion.', '/real-estate-lawyer'],
      ['Lease, usufruct & superficies advice', 'Advice on the rights, limitations and registration steps relevant to foreign-funded property arrangements.', '/real-estate-lawyer'],
      ['Company setup & foreign ownership', 'Lawful structuring, shareholder documentation, licensing and compliance without nominee arrangements.', '/company-registration-services'],
      ['Wills & international family matters', 'Thai wills, succession planning, family agreements and cross-border coordination for residents and property owners.', '/family-law-services']
    ],
    focus: 'Walailak’s role is not to represent the seller, agent or developer. Conflict checks and independent instructions are established before confidential documents are reviewed.',
    related: [['Pattaya Office','/pattaya-law-office'],['Chiang Mai','/locations/chiang-mai'],['All locations','/locations']]
  },
  {
    slug: 'chiang-mai', name: 'Chiang Mai', image: 'family-lawyer.webp',
    title: 'English-Speaking Lawyers in Chiang Mai | Walailak Law Firm',
    description: 'English-speaking legal services in Chiang Mai for foreign residents, international families, property matters and businesses.',
    lead: 'Clear legal support for foreign residents, international families, property clients and businesses in Chiang Mai through one trusted point of contact.',
    contextTitle: 'Practical legal support for long-term residents and international families',
    context: 'Chiang Mai attracts long-term foreign residents, international couples, retirees, entrepreneurs and small businesses. Their matters often combine Thai documentation with overseas assets, family relationships or remote decision-makers. Walailak Law Firm can manage the engagement remotely or arrange travel as appropriate, bringing in Chiang Mai counsel only when local attendance or added capability benefits the client.',
    clients: ['International couples and families', 'Retirees and long-term foreign residents', 'Property buyers, owners and tenants', 'Entrepreneurs and small international businesses'],
    services: [
      ['Family agreements & disputes', 'Separation, mediation, divorce, children and cross-border family coordination handled with discretion.', '/family-law-services'],
      ['Wills & estate planning', 'Thai wills and succession planning for local property, accounts and international family circumstances.', '/legal-documents-services'],
      ['Property and lease review', 'Independent due diligence, title checks, purchase agreements and lease documentation.', '/real-estate-lawyer'],
      ['Company, employment & immigration', 'Business establishment, contracts, employment documentation, visas and work permits.', '/company-registration-services']
    ],
    focus: 'Remote consultations and document review can begin before a client travels. Walailak Law Firm decides whether to handle every stage directly, arrange travel when appropriate or add a Chiang Mai lawyer for a defined local role while the firm continues to lead the matter.',
    related: [['Phuket','/locations/phuket'],['Bangkok enquiries','/contact'],['All locations','/locations']]
  }
];

const contactRow = `<div class="contact-module"><div><h4>Discuss a matter confidentially</h4><p>Contact Kae directly for an initial review, strategy and scope.</p></div><div class="contact-icons"><a href="https://wa.me/66946463940?text=I%20need%20legal%20assistance%20in%20this%20location.%20Please%20contact%20me." class="icon-circle ic-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="ti ti-brand-whatsapp"></i></a><a href="https://line.me/ti/p/~kaezeeds" class="icon-circle ic-line" target="_blank" rel="noopener" aria-label="LINE"><img src="/images/line-icon.png" alt="" style="width:34px;height:34px;border-radius:8px;"></a><a href="tel:+66946463940" class="icon-circle ic-phone" aria-label="Call"><i class="ti ti-phone"></i></a></div></div>`;

const tracking = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-53CDHSWB" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53CDHSWB');</script>`;

function head(title, description, canonical) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="https://walailaklaw.com${canonical}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:image" content="https://walailaklaw.com/images/og-image.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="https://walailaklaw.com/images/og-image.jpg"><link rel="icon" type="image/svg+xml" href="/images/favicon.svg"><link rel="apple-touch-icon" href="/images/apple-touch-icon.png"><link rel="canonical" href="https://walailaklaw.com${canonical}"><link rel="alternate" hreflang="en" href="https://walailaklaw.com${canonical}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.44.0/dist/tabler-icons.min.css"><link rel="stylesheet" href="/css/style.css"></head><body>`;
}

const header = `<header class="site-header"><div class="container nav-row"><a href="/" class="logo"><img src="/images/walailak-primary-logo.webp" alt="Walailak Law Firm" class="logo-full"><img src="/images/walailak-primary-logo.webp" alt="Walailak Law Firm" class="logo-icon-mobile"></a><nav class="nav-links"><a href="/">Home</a><a href="/about">About</a><div class="nav-item"><a href="/services">Practice Areas <span class="caret">&#9662;</span></a><div class="dropdown-menu"><a href="/criminal-defence-lawyer">Criminal Defence</a><a href="/family-law-services">Family Law</a><a href="/real-estate-lawyer">Real Estate</a><a href="/company-registration-services">Company &amp; BOI</a><a href="/civil-litigation-services">Civil Litigation</a><a href="/legal-documents-services">Legal Documents</a></div></div><a href="/faqs">FAQs</a><div class="nav-item"><a href="/contact">Contact <span class="caret">&#9662;</span></a><div class="dropdown-menu"><a href="/pattaya-law-office">Pattaya Office</a><a href="/rayong-law-office">Rayong Office</a></div></div></nav><div class="nav-cta"><div class="lang-item"><a href="#" class="lang-trigger">EN <span class="caret">&#9662;</span></a><div class="lang-dropdown"><a href="/th/">TH</a><a href="/fr/">FR</a></div></div><div class="nav-socials"><a href="tel:+66946463940" class="nav-social-link"><i class="ti ti-phone"></i></a><a href="mailto:kae@walailaklaw.com" class="nav-social-link"><i class="ti ti-mail"></i></a><a href="https://wa.me/66946463940" class="nav-social-link"><i class="ti ti-brand-whatsapp"></i></a><a href="https://line.me/ti/p/~kaezeeds" class="nav-social-link nav-social-line"><img src="/images/line-icon.png" alt=""></a></div><a href="/contact" class="btn btn-primary btn-sm">Book a consultation</a></div><button class="menu-toggle" aria-label="Menu"><i class="ti ti-menu-2"></i></button></div></header>`;

const footer = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><div class="footer-logo"><img src="/images/walailak-primary-logo.webp" alt="Walailak Law Firm"></div><p>Clear English-language legal support with offices in Rayong and Pattaya and additional local capability across Thailand.</p></div><div><h5>Legal Services</h5><p><a href="/real-estate-lawyer">Real Estate</a></p><p><a href="/company-registration-services">Company &amp; BOI</a></p><p><a href="/family-law-services">Family Law</a></p><p><a href="/civil-litigation-services">Civil Litigation</a></p></div><div><h5>Locations</h5><p><a href="/locations">All locations</a></p><p><a href="/rayong-law-office">Rayong Office</a></p><p><a href="/pattaya-law-office">Pattaya Office</a></p><p><a href="/locations/chonburi">Chonburi</a></p><p><a href="/locations/phuket">Phuket</a></p></div><div><h5>Contact Us</h5><p><a href="tel:+66946463940">+66 94 646 3940</a></p><p><a href="mailto:kae@walailaklaw.com">kae@walailaklaw.com</a></p><p><a href="/contact">Confidential enquiry</a></p></div></div><div class="footer-bottom"><span>© 2026 Walailak Law Firm. All rights reserved.</span><span>Independent advice · Clear coordination · Local capability</span></div></div></footer><script src="/js/main.js"></script></body></html>`;

function locationPage(x) {
  const cards = x.services.map(([t,d,h]) => `<div class="service-card"><div class="service-icon"><i class="ti ti-scale"></i></div><h3>${t}</h3><p>${d}</p><a href="${h}" class="link">Explore the service <i class="ti ti-arrow-right"></i></a></div>`).join('');
  const clients = x.clients.map(v => `<li><i class="ti ti-check"></i>${v}</li>`).join('');
  const related = x.related.map(([t,h]) => `<a href="${h}" class="tag">${t}</a>`).join('');
  return `${head(x.title,x.description,`/locations/${x.slug}`)}${tracking}${header}<main><section class="hero hero-sm" style="--hero-img-mobile:url('/images/${x.image}');background-image:linear-gradient(90deg,rgba(20,17,13,.97) 0%,rgba(20,17,13,.91) 38%,rgba(20,17,13,.35) 100%),url('/images/${x.image}');"><div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="/">Home</a> / <a href="/locations">Locations</a> / ${x.name}</div><span class="eyebrow">NATIONWIDE SERVICE · LOCAL CAPABILITY</span><h1>English-Speaking Lawyers in ${x.name}</h1><p class="lead">${x.lead}</p></div></div></section><section class="section"><div class="container"><div class="two-col"><div><span class="eyebrow light">Legal support in ${x.name}</span><h2 style="margin:14px 0 16px;">${x.contextTitle}</h2><p class="text-secondary location-copy">${x.context}</p></div><div class="location-panel"><h3>Who we assist</h3><ul class="location-checks">${clients}</ul></div></div></div></section><section class="section on-tint"><div class="container"><div class="section-header"><span class="eyebrow light">Relevant services</span><h2>Legal matters we handle in ${x.name}</h2><p>Walailak Law Firm determines whether to handle the matter directly or include local counsel for a defined role, based on the facts, jurisdiction and practical needs.</p></div><div class="services-grid location-services">${cards}</div></div></section><section class="section"><div class="container"><div class="two-col"><div><span class="eyebrow light">How our flexible model works</span><h2 style="margin:14px 0 16px;">One accountable law firm, flexible delivery</h2><p class="text-secondary location-copy">${x.focus}</p><ol class="location-steps"><li><strong>Initial review:</strong> Walailak Law Firm assesses the facts, urgency and conflicts.</li><li><strong>Clear scope:</strong> You receive a clear plan explaining who will handle each part of the work and the fees.</li><li><strong>Managed delivery:</strong> Walailak Law Firm provides and manages the engagement, whether the matter is handled entirely by the firm or supported by local counsel for a defined task.</li></ol></div><div>${contactRow}</div></div></div></section><section class="section-sm on-tint"><div class="container"><h2 style="font-size:20px;margin-bottom:16px;">Related locations</h2><div class="location-related">${related}</div></div></section></main>${footer}`;
}

const hubCards = [
  ['Rayong','Our principal Eastern Seaboard office for property, industry, disputes and urgent matters.','/rayong-law-office','Office'],
  ['Pattaya','Our Pattaya office for property, business, family and criminal matters.','/pattaya-law-office','Office'],
  ...locations.map(x => [x.name, x.lead, `/locations/${x.slug}`, 'Nationwide coverage'])
].map(([n,d,h,k]) => `<article class="location-card"><span>${k}</span><h3>${n}</h3><p>${d}</p><a href="${h}" class="link">View location <i class="ti ti-arrow-right"></i></a></article>`).join('');

const hub = `${head('Legal Services Across Thailand | Walailak Law Firm','Find Walailak Law Firm offices and legal services in Rayong, Pattaya, Chonburi, Si Racha, Laem Chabang, Phuket and Chiang Mai.','/locations')}${tracking}${header}<main><section class="hero hero-sm" style="--hero-img-mobile:url('/images/office-signage-hero.webp');background-image:linear-gradient(90deg,rgba(20,17,13,.97),rgba(20,17,13,.75)),url('/images/office-signage-hero.webp');"><div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="/">Home</a> / Locations</div><span class="eyebrow">OFFICES · NATIONWIDE LEGAL SERVICES</span><h1>Legal Services Across Thailand</h1><p class="lead">Walailak Law Firm provides legal services throughout Thailand, handling matters directly and using additional local capability only when the work requires it.</p></div></div></section><section class="section"><div class="container"><div class="section-header"><span class="eyebrow light">Where we work</span><h2>One trusted point of contact, backed by local capability</h2><p>Rayong and Pattaya are our physical offices. In other listed locations, Walailak Law Firm provides and manages the legal service nationwide, arranging local attendance or additional counsel only when appropriate.</p></div><div class="location-grid">${hubCards}</div></div></section><section class="section on-dark"><div class="container"><div class="two-col"><div><span class="eyebrow">THE WALAILAK MODEL</span><h2 style="color:#fff;margin:14px 0 16px;">Direct leadership with flexible delivery</h2><p class="location-copy" style="color:var(--text-on-dark-secondary);">Walailak Law Firm reviews the enquiry and decides the best way to handle it. The firm may manage every stage directly, work remotely or arrange travel; additional local counsel is used only when attendance, specialist input or practical efficiency benefits the client.</p></div><div>${contactRow}</div></div></div></section></main>${footer}`;

function cleanHtml(html) {
  return html
    .replaceAll('&family=', '&amp;family=')
    .replaceAll('&display=', '&amp;display=')
    .replaceAll(' & ', ' &amp; ');
}

writeFileSync(resolve(root, 'locations.html'), cleanHtml(hub));
mkdirSync(resolve(root, 'locations'), { recursive: true });
for (const x of locations) writeFileSync(resolve(root, 'locations', `${x.slug}.html`), cleanHtml(locationPage(x)));
