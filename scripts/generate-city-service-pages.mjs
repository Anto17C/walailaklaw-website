import fs from 'node:fs';

const officeHtml = fs.readFileSync('rayong-law-office.html', 'utf8');
const header = officeHtml.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
const footer = officeHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0];

const pages = [
  {
    slug: 'rayong-property-due-diligence', city: 'Rayong', office: '/rayong-law-office', practice: '/real-estate-lawyer', image: 'real-estate-lawyer.webp',
    title: 'Property Due Diligence Lawyer in Rayong | Walailak Law Firm',
    description: 'Independent property due diligence in Rayong for house, land, condominium and leasehold purchases, including title, contract and transfer review.',
    eyebrow: 'RAYONG PROPERTY SERVICES', h1: 'Property Due Diligence in Rayong',
    lead: 'Independent legal checks for buyers of houses, land, condominiums and leasehold interests before a deposit, contract signing or Land Office transfer.',
    introTitle: 'Know what is being purchased before funds are committed',
    intro: 'Property enquiries in Rayong often involve a foreign-funded purchase in a Thai spouse or partner’s name, a registered lease, a condominium foreign-quota transfer or a house whose ownership documents do not perfectly match the land. Walailak Law Firm reviews the proposed transaction independently from the seller, agent and developer and explains the practical risks in English.',
    situations: ['A house and land purchase involving a Thai spouse or partner','A condominium purchase under the foreign ownership quota','A leasehold house or development resale','A property with an existing mortgage or other registered right','An overseas buyer who needs remote review before travelling'],
    checks: ['Verify the title, registered owner and material encumbrances','Review seller authority, company status and signing powers where relevant','Examine the sale, lease or reservation agreement before payment','Review available building, access and development documents','Plan the transfer, registration steps, taxes and supporting documents','Provide a written English summary of material findings and next steps'],
    warningTitle: 'Due diligence should match the actual property structure',
    warning: 'A Chanote, house registration, building permit, lease and sale agreement answer different questions. One document alone does not establish every right a buyer expects to receive. The review scope should therefore be agreed after the available documents and intended ownership arrangement are understood.',
    related: [['Property disputes in Rayong','/rayong-property-disputes'],['Wills and estate planning in Rayong','/rayong-wills-estate-planning'],['Rayong law office','/rayong-law-office']]
  },
  {
    slug: 'rayong-property-disputes', city: 'Rayong', office: '/rayong-law-office', practice: '/civil-litigation-services', image: 'civil-litigation-lawyer.webp',
    title: 'Property and Condominium Dispute Lawyer in Rayong | Walailak Law Firm',
    description: 'Legal assistance for property, condominium, leasehold, defect, fee and contract disputes in Rayong, from early assessment through litigation.',
    eyebrow: 'RAYONG PROPERTY DISPUTES', h1: 'Property & Condominium Disputes in Rayong',
    lead: 'Practical legal assistance when a purchase, lease, renovation, defect, management charge or property agreement has become disputed.',
    introTitle: 'Early document review can preserve better options',
    intro: 'Recent enquiries have involved water damage, disputed renovation charges, promised company shares that were not transferred, building defects, annual charges and requests to cancel long-running purchase arrangements. These cases turn on the signed documents, payment history, communications, technical evidence and applicable time limits—not only on what each party remembers being promised.',
    situations: ['Developer or seller breach of a purchase agreement','Condominium management or juristic-person charges','Water ingress, drainage or construction defects','Leasehold cancellation, repayment or renewal disputes','Deposit recovery and failed completion','Disagreements over usufruct, lease or property-related contracts'],
    checks: ['Conflict check before confidential documents are reviewed','Chronology of contracts, payments, notices and alleged breaches','Assessment of evidence, responsible parties and practical remedies','Preservation of photographs, reports, messages and payment records','Demand, negotiation or mediation strategy','Court proceedings and enforcement planning where proportionate'],
    warningTitle: 'Do not wait for the dispute to resolve itself',
    warning: 'Delay can weaken evidence, complicate urgent remedies and affect limitation analysis. A focused initial review should identify the documents still needed, immediate notices to send and whether commercial negotiation or formal proceedings are the better next step.',
    related: [['Property due diligence in Rayong','/rayong-property-due-diligence'],['Commercial debt recovery in Rayong','/rayong-debt-recovery-litigation'],['Rayong law office','/rayong-law-office']]
  },
  {
    slug: 'rayong-wills-estate-planning', city: 'Rayong', office: '/rayong-law-office', practice: '/legal-documents-services', image: 'family-lawyer.webp',
    title: 'Wills and Estate Planning Lawyer in Rayong | Walailak Law Firm',
    description: 'Thai wills and estate planning in Rayong for foreign residents, international families, property owners, spouses and overseas beneficiaries.',
    eyebrow: 'RAYONG WILLS & ESTATES', h1: 'Wills & Estate Planning in Rayong',
    lead: 'Clear planning for Thai property, bank accounts, family arrangements and overseas beneficiaries—prepared around the assets and people involved.',
    introTitle: 'A will is strongest when it reflects the real asset structure',
    intro: 'Rayong enquiries frequently involve homes registered in a Thai spouse’s name, foreign-funded construction, usufruct or lease rights, Thai bank accounts, vehicles and children or beneficiaries living overseas. Walailak Law Firm first maps who legally owns each asset and which rights are registered before recommending the documents and implementation steps.',
    situations: ['A foreign resident preparing a Thai will','Spouses who want coordinated succession arrangements','A home or land registered in a Thai spouse’s name','Existing usufruct, lease or superficies rights','Thai assets intended for an overseas child or beneficiary','A client who needs an accessible office consultation'],
    checks: ['Identify Thai assets, ownership records and intended beneficiaries','Review existing wills, registered rights and family circumstances','Consider executor, witness, language and safekeeping arrangements','Coordinate property-related agreements where a will alone is insufficient','Prepare clear Thai and English documentation as agreed','Explain signing and later-update requirements'],
    warningTitle: 'Estate planning is more than inserting names into a template',
    warning: 'A will cannot safely be designed without understanding ownership, marital and family circumstances, registered property rights and cross-border elements. Overseas assets may also require advice in the relevant jurisdiction. The goal is a workable Thai plan, not an unrealistic promise that one document controls every country and asset.',
    related: [['Property due diligence in Rayong','/rayong-property-due-diligence'],['Legal document services','/legal-documents-services'],['Rayong law office','/rayong-law-office']]
  },
  {
    slug: 'rayong-company-registration-boi', city: 'Rayong', office: '/rayong-law-office', practice: '/company-registration-services', image: 'company-registration-lawyer.webp',
    title: 'Company Registration and BOI Lawyer in Rayong | Walailak Law Firm',
    description: 'Company registration, foreign ownership and BOI legal support in Rayong for manufacturers, contractors, traders and international investors.',
    eyebrow: 'RAYONG BUSINESS SERVICES', h1: 'Company Registration & BOI Support in Rayong',
    lead: 'Business structuring and implementation for investors, manufacturers, contractors and trading companies entering or expanding in Rayong.',
    introTitle: 'The right structure starts with the proposed business activity',
    intro: 'Enquiries commonly begin with a proposed shareholding percentage, registered capital and business description. Those details matter, but the legal route also depends on what the company will actually do, where it will operate, whether foreign-business restrictions apply, the roles of directors and employees, and whether the project may qualify for investment promotion.',
    situations: ['A foreign investor establishing a Rayong operating company','A manufacturer considering BOI promotion','A contractor or building-material business with Thai and foreign shareholders','A business relocating into the Eastern Economic Corridor','An existing company adding activities, capital or foreign personnel'],
    checks: ['Clarify activities, customers, revenue model and operating location','Assess lawful ownership and control options without nominee arrangements','Compare ordinary registration, licensing and BOI pathways','Prepare corporate documents and coordinate registration steps','Plan employment, visa and work-permit requirements','Support contracts, governance and post-registration compliance'],
    warningTitle: 'Registration is only one part of becoming operational',
    warning: 'A registered company is not automatically authorized for every activity, and BOI promotion is not appropriate for every project. Advice should connect the ownership structure, promoted activity, licences, premises, tax registration, employment and immigration requirements into one practical implementation plan.',
    related: [['Company registration services','/company-registration-services'],['Commercial debt recovery in Rayong','/rayong-debt-recovery-litigation'],['Rayong law office','/rayong-law-office']]
  },
  {
    slug: 'rayong-debt-recovery-litigation', city: 'Rayong', office: '/rayong-law-office', practice: '/civil-litigation-services', image: 'arbitration-lawyer.webp',
    title: 'Debt Recovery and Commercial Litigation Lawyer in Rayong | Walailak Law Firm',
    description: 'Debt recovery and commercial litigation in Rayong for Thai and overseas creditors, manufacturers, suppliers and trading businesses.',
    eyebrow: 'RAYONG COMMERCIAL DISPUTES', h1: 'Debt Recovery & Commercial Litigation in Rayong',
    lead: 'Evidence-led recovery strategy for unpaid trade debts, manufacturing disputes and cross-border commercial claims involving Rayong businesses.',
    introTitle: 'Choose the recovery route after testing the claim and debtor',
    intro: 'Rayong’s manufacturing and supply-chain economy produces disputes involving delivered goods, advance payments, debt acknowledgements, guarantees, payment plans and financially distressed counterparties. Walailak Law Firm reviews both the legal claim and the commercial recovery objective before recommending correspondence, negotiation, civil proceedings, enforcement planning or specialist insolvency advice.',
    situations: ['An overseas supplier owed money by a Thai manufacturer','A signed debt acknowledgement or payment plan','Unpaid goods, services or advance-payment disputes','A debtor with secured bank debt or signs of financial distress','Urgent defence of a commercial claim or court deadline'],
    checks: ['Conflict and jurisdiction review','Contract, invoice, delivery and payment evidence analysis','Limitation, notice and dispute-risk assessment','Corporate, asset and counterparty checks where appropriate','Demand and negotiated-settlement strategy','Litigation, defence and enforcement planning with staged costs'],
    warningTitle: 'Pressure must be legally and commercially justified',
    warning: 'Bankruptcy or other formal proceedings should not be treated as a generic collection threat. The correct route depends on the nature and certainty of the debt, available evidence, debtor response, jurisdiction, recoverable assets and the creditor’s time and cost objectives.',
    related: [['Civil litigation services','/civil-litigation-services'],['Company and BOI support in Rayong','/rayong-company-registration-boi'],['Rayong law office','/rayong-law-office']]
  },
  {
    slug: 'pattaya-property-due-diligence', city: 'Pattaya', office: '/pattaya-law-office', practice: '/real-estate-lawyer', image: 'real-estate-lawyer.webp',
    title: 'Property Due Diligence Lawyer in Pattaya | Walailak Law Firm',
    description: 'Independent property due diligence in Pattaya, Jomtien, Huai Yai and Bang Lamung for condominium, house, land and leasehold purchases.',
    eyebrow: 'PATTAYA PROPERTY SERVICES', h1: 'Property Due Diligence in Pattaya',
    lead: 'Independent contract, title and ownership review for condominium, house and leasehold purchases across Pattaya, Jomtien, Huai Yai and Bang Lamung.',
    introTitle: 'Independent advice before signing or paying a substantial deposit',
    intro: 'Pattaya property enquiries often involve developer contracts, a Thai spouse or partner purchasing land, an existing mortgage to be discharged at closing, or a foreign buyer seeking registered protection without using a Thai company. Walailak Law Firm acts on the buyer’s instructions and assesses the proposed structure before documents are signed or funds are committed.',
    situations: ['A new-build or resale condominium in Pattaya or Jomtien','A house purchase in Huai Yai or Bang Lamung','Land purchased by a Thai spouse or partner','A sale requiring mortgage discharge at completion','A proposed lease, usufruct or superficies arrangement','An overseas buyer needing digital consultation and document review'],
    checks: ['Title, registered-owner and encumbrance verification','Seller or developer authority and contract review','Foreign-quota and remittance-document planning for condominiums','Review of mortgage discharge and closing sequence','Assessment of proposed registered rights and building ownership','Land Office transfer support where included in scope'],
    warningTitle: 'The protective structure must fit the transaction',
    warning: 'A lease, usufruct and superficies are different legal rights and should not be stacked together without a clear purpose. The house, land, permit, financing and succession objectives must be reviewed as one transaction before deciding which documents should be registered.',
    related: [['Wills and estate planning in Pattaya','/pattaya-wills-estate-planning'],['Landlord and tenant disputes in Pattaya','/pattaya-landlord-tenant-disputes'],['Pattaya law office','/pattaya-law-office']]
  },
  {
    slug: 'pattaya-wills-estate-planning', city: 'Pattaya', office: '/pattaya-law-office', practice: '/legal-documents-services', image: 'family-lawyer.webp',
    title: 'Wills and Estate Planning Lawyer in Pattaya | Walailak Law Firm',
    description: 'Thai wills and estate planning in Pattaya for condominium owners, foreign residents, international couples and overseas beneficiaries.',
    eyebrow: 'PATTAYA WILLS & ESTATES', h1: 'Wills & Estate Planning in Pattaya',
    lead: 'Thai estate planning for condominium owners, foreign residents, international couples and families with beneficiaries overseas.',
    introTitle: 'Plan around the assets actually held in Thailand',
    intro: 'A common Pattaya enquiry is straightforward: a foreign owner has a condominium and wants to know what a Thai will should cover. Other matters involve bank accounts, vehicles, a Thai spouse, children abroad, existing overseas wills or property held through a company or lease. Walailak Law Firm defines the Thai asset scope before preparing the plan.',
    situations: ['A foreign owner with a Pattaya condominium','A resident with Thai bank accounts and personal property','International spouses preparing coordinated wills','Children or beneficiaries who live outside Thailand','An executor who may need to act from overseas'],
    checks: ['Confirm ownership and identify the Thai estate','Review family and beneficiary information','Coordinate with existing foreign wills where necessary','Select an appropriate executor and signing arrangement','Prepare the agreed Thai will and English explanation','Explain storage, copies and future updates'],
    warningTitle: 'Simple can still be carefully prepared',
    warning: 'Even a short will should use accurate names, asset descriptions and family information and should be signed with proper formalities. Where the estate includes company interests, disputed ownership, registered property rights or several jurisdictions, additional planning may be needed.',
    related: [['Property due diligence in Pattaya','/pattaya-property-due-diligence'],['Legal document services','/legal-documents-services'],['Pattaya law office','/pattaya-law-office']]
  },
  {
    slug: 'pattaya-landlord-tenant-disputes', city: 'Pattaya', office: '/pattaya-law-office', practice: '/civil-litigation-services', image: 'civil-litigation-lawyer.webp',
    title: 'Landlord and Tenant Dispute Lawyer in Pattaya | Walailak Law Firm',
    description: 'Legal assistance for Pattaya lease, security deposit, landlord, tenant, notice and residential property disputes in Pattaya and Bang Lamung.',
    eyebrow: 'PATTAYA RENTAL DISPUTES', h1: 'Landlord & Tenant Disputes in Pattaya',
    lead: 'Contract review, notices, deposit recovery and dispute strategy for residential leases in Pattaya, Jomtien, Mabprachan and Bang Lamung.',
    introTitle: 'The lease, release agreement and written record matter',
    intro: 'Rental disputes can continue after a tenant has vacated, especially where the parties disagree about the security deposit, remaining rent, property condition, replacement tenancy, access or the address for formal correspondence. Walailak Law Firm reviews the complete written record and helps define a proportionate next step.',
    situations: ['A security deposit has not been returned','A lease release or settlement agreement is disputed','The landlord alleges damage or unpaid charges','There were access, privacy or notice concerns','A party needs a professional correspondence arrangement connected to an active matter','Court papers or formal notices may be expected'],
    checks: ['Review the lease, inventory, release agreement and notices','Organize payment, inspection, photograph and message evidence','Clarify notice addresses and any authority required','Prepare a demand or structured settlement proposal','Advise on escalation, costs and likely practical outcomes','Represent the client if separate dispute instructions are agreed'],
    warningTitle: 'Administrative support and legal representation are different scopes',
    warning: 'Using a professional address, receiving correspondence and accepting formal legal documents may require different arrangements. The engagement should state exactly what the firm is authorized to receive, how notice will be given and whether advice or representation is included.',
    related: [['Property due diligence in Pattaya','/pattaya-property-due-diligence'],['Civil litigation services','/civil-litigation-services'],['Pattaya law office','/pattaya-law-office']]
  },
  {
    slug: 'phuket-property-due-diligence', city: 'Phuket', office: '/locations/phuket', practice: '/real-estate-lawyer', image: 'real-estate-lawyer.webp',
    title: 'Property Due Diligence Lawyer in Phuket | Walailak Law Firm',
    description: 'Independent property due diligence in Phuket for villa, condominium, house and leasehold purchases, including title, building and contract review.',
    eyebrow: 'PHUKET PROPERTY SERVICES', h1: 'Property Due Diligence in Phuket',
    lead: 'Independent legal review for foreign buyers and investors before reserving, contracting for or completing a Phuket property purchase.',
    introTitle: 'Verify the property and ownership structure before committing funds',
    intro: 'Phuket transactions may involve a condominium under the foreign ownership quota, a villa on leased land, a Thai spouse purchasing land, a resale within a managed development or a proposed company structure. Walailak Law Firm reviews the actual documents and intended rights independently from the seller, agent and developer before advising on the transaction.',
    situations: ['An off-plan or completed condominium purchase','A villa or house within a managed development','A leasehold acquisition or assignment','Land purchased by a Thai spouse or partner','A resale involving a company, developer or existing mortgage','An overseas buyer reviewing documents remotely'],
    checks: ['Verify title, registered owner and material encumbrances','Review seller, developer or company authority','Examine contracts, payment stages and completion conditions','Review available permits, access and common-area arrangements','Assess foreign-quota, remittance and registration documentation','Plan closing, Land Office attendance and post-completion records'],
    warningTitle: 'Marketing descriptions do not define the legal asset',
    warning: 'A “villa purchase” may legally involve several different rights and documents relating to the land, building, lease, common areas and management arrangements. Due diligence should identify exactly what will be owned or registered, for how long, and under which enforceable documents.',
    related: [['Leasehold and property disputes in Phuket','/phuket-property-disputes'],['Wills and estate planning in Phuket','/phuket-wills-estate-planning'],['Phuket legal services','/locations/phuket']]
  },
  {
    slug: 'phuket-property-disputes', city: 'Phuket', office: '/locations/phuket', practice: '/civil-litigation-services', image: 'civil-litigation-lawyer.webp',
    title: 'Property and Leasehold Dispute Lawyer in Phuket | Walailak Law Firm',
    description: 'Legal assistance for Phuket villa, condominium, leasehold, developer, management-fee, defect and property contract disputes.',
    eyebrow: 'PHUKET PROPERTY DISPUTES', h1: 'Property & Leasehold Disputes in Phuket',
    lead: 'Contract assessment, negotiation and representation when a Phuket property purchase, lease or development relationship becomes disputed.',
    introTitle: 'The legal response begins with the transaction documents',
    intro: 'Property disputes in Phuket can involve delayed construction, defects, unfulfilled developer promises, lease renewal language, management charges, withheld deposits, ownership structures or disagreement over the use and transfer of a villa or condominium. The available remedy depends on the documents, evidence, parties and timing of the dispute.',
    situations: ['A developer has delayed or failed to complete','The delivered property differs from the agreement','A lease renewal, assignment or termination is disputed','Management, common-area or maintenance charges are challenged','A deposit or purchase payment is being withheld','Ownership or control of a property-holding company is disputed'],
    checks: ['Conflict check and document chronology','Contract, payment and correspondence analysis','Review of photographs, inspection material and expert evidence','Assessment of notices, termination and available remedies','Negotiation, mediation or settlement strategy','Court proceedings and enforcement planning where appropriate'],
    warningTitle: 'Act before positions and evidence deteriorate',
    warning: 'Continuing to pay, accepting revised terms or waiting through repeated informal promises may affect the practical options. Early advice can identify which rights should be reserved, which evidence should be secured and whether a negotiated or formal route is proportionate.',
    related: [['Property due diligence in Phuket','/phuket-property-due-diligence'],['Company and hospitality services in Phuket','/phuket-company-registration-hospitality'],['Phuket legal services','/locations/phuket']]
  },
  {
    slug: 'phuket-company-registration-hospitality', city: 'Phuket', office: '/locations/phuket', practice: '/company-registration-services', image: 'company-registration-lawyer.webp',
    title: 'Company Registration and Hospitality Lawyer in Phuket | Walailak Law Firm',
    description: 'Company registration, foreign ownership, contracts and hospitality business legal support in Phuket for investors and operators.',
    eyebrow: 'PHUKET BUSINESS SERVICES', h1: 'Company & Hospitality Legal Services in Phuket',
    lead: 'Lawful business structuring and operational support for Phuket hospitality, tourism, property-service and international ventures.',
    introTitle: 'Build the structure around the real business—not a nominal arrangement',
    intro: 'A Phuket business may combine premises, licences, staff, foreign investment, management agreements and customer contracts. Walailak Law Firm begins with the actual activity, ownership, funding and decision-making model before advising on company registration, foreign-business restrictions, investment promotion or other operational requirements.',
    situations: ['A hotel, resort, restaurant or hospitality venture','A property-management or tourism-related service','An investor acquiring shares in an existing Phuket company','A foreign entrepreneur establishing an operating business','A business reviewing ownership, directors or shareholder arrangements','An operator needing employment, contract and compliance support'],
    checks: ['Clarify activities, ownership, funding and management control','Assess lawful registration, licensing and foreign-investment routes','Conduct company and transaction due diligence where relevant','Prepare shareholder, director and commercial documents','Coordinate employment, visa and work-permit planning','Support leases, operating contracts and continuing compliance'],
    warningTitle: 'Nominee ownership is not a business solution',
    warning: 'Shareholders and governance arrangements should reflect genuine legal and commercial relationships. A structure designed only to conceal foreign ownership or control can create regulatory, criminal, asset and dispute risk. The correct route depends on the activity, investment and licences actually required.',
    related: [['Property due diligence in Phuket','/phuket-property-due-diligence'],['Property disputes in Phuket','/phuket-property-disputes'],['Phuket legal services','/locations/phuket']]
  },
  {
    slug: 'phuket-wills-estate-planning', city: 'Phuket', office: '/locations/phuket', practice: '/legal-documents-services', image: 'family-lawyer.webp',
    title: 'Wills and Estate Planning Lawyer in Phuket | Walailak Law Firm',
    description: 'Thai wills and estate planning in Phuket for foreign residents, villa and condominium owners, international families and overseas beneficiaries.',
    eyebrow: 'PHUKET WILLS & ESTATES', h1: 'Wills & Estate Planning in Phuket',
    lead: 'Thai estate planning for villa and condominium owners, foreign residents, international couples and beneficiaries living overseas.',
    introTitle: 'Plan around the rights actually owned in Thailand',
    intro: 'Phuket estates may include a foreign-owned condominium, a villa building, leasehold rights, shares in a Thai company, bank accounts, vehicles or agreements connected to land held by a spouse. Walailak Law Firm identifies the legal owner and nature of each Thai asset before preparing the will and any related succession documents.',
    situations: ['A foreign owner of a Phuket condominium','A villa owner with registered leasehold rights','A resident holding shares in a Thai company','International spouses with Thai and overseas assets','Children, executors or beneficiaries outside Thailand','An existing foreign will that must be coordinated with Thai planning'],
    checks: ['Map Thai assets, ownership and registered rights','Review family, marriage and beneficiary circumstances','Coordinate the Thai scope with foreign planning where necessary','Select suitable executor and signing arrangements','Prepare the agreed will and supporting explanation','Address storage, copies and future changes'],
    warningTitle: 'A will passes the rights that form part of the estate',
    warning: 'The estate may not include every asset a client informally regards as theirs. Lease terms, company ownership, matrimonial arrangements and registered property rights can affect what passes and how it is administered. Those issues should be identified before the document is finalized.',
    related: [['Property due diligence in Phuket','/phuket-property-due-diligence'],['Company and hospitality services in Phuket','/phuket-company-registration-hospitality'],['Phuket legal services','/locations/phuket']]
  }
];

const tracking = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-53CDHSWB" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53CDHSWB');</script>`;
const contact = `<div class="contact-module"><div><h4>Discuss a matter confidentially</h4><p>Contact Kae directly for an initial review, strategy and scope.</p></div><div class="contact-icons"><a href="https://wa.me/66946463940" class="icon-circle ic-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="ti ti-brand-whatsapp"></i></a><a href="https://line.me/ti/p/~kaezeeds" class="icon-circle ic-line" target="_blank" rel="noopener" aria-label="LINE"><img src="/images/line-icon.png" alt="" style="width:34px;height:34px;border-radius:8px;"></a><a href="tel:+66946463940" class="icon-circle ic-phone" aria-label="Call"><i class="ti ti-phone"></i></a></div></div>`;

function list(items) { return items.map(v => `<li><i class="ti ti-check"></i>${v}</li>`).join(''); }
function head(p) { return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${p.title}</title><meta name="description" content="${p.description}"><meta property="og:type" content="website"><meta property="og:url" content="https://walailaklaw.com/${p.slug}"><meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.description}"><meta property="og:image" content="https://walailaklaw.com/images/og-image.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${p.title}"><meta name="twitter:description" content="${p.description}"><meta name="twitter:image" content="https://walailaklaw.com/images/og-image.jpg"><link rel="icon" type="image/svg+xml" href="/images/favicon.svg"><link rel="apple-touch-icon" href="/images/apple-touch-icon.png"><link rel="canonical" href="https://walailaklaw.com/${p.slug}"><link rel="alternate" hreflang="en" href="https://walailaklaw.com/${p.slug}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.44.0/dist/tabler-icons.min.css"><link rel="stylesheet" href="/css/style.css"></head><body>`; }

function render(p) {
  const related = p.related.map(([t,h]) => `<a href="${h}" class="tag">${t}</a>`).join('');
  return `${head(p)}${tracking}${header}<main><section class="hero hero-sm" style="--hero-img-mobile:url('/images/${p.image}');background-image:linear-gradient(90deg,rgba(20,17,13,.97) 0%,rgba(20,17,13,.91) 40%,rgba(20,17,13,.34) 100%),url('/images/${p.image}');"><div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="/">Home</a> / <a href="${p.office}">${p.city}</a> / ${p.h1}</div><span class="eyebrow">${p.eyebrow}</span><h1>${p.h1}</h1><p class="lead">${p.lead}</p></div></div></section><section class="section"><div class="container"><div class="two-col"><div><span class="eyebrow light">Focused local advice</span><h2 style="margin:14px 0 16px;">${p.introTitle}</h2><p class="text-secondary location-copy">${p.intro}</p></div><div class="location-panel"><h3>When clients contact us</h3><ul class="location-checks">${list(p.situations)}</ul></div></div></div></section><section class="section on-tint"><div class="container"><div class="section-header"><span class="eyebrow light">Scope of assistance</span><h2>How Walailak Law Firm can assist</h2><p>The precise scope is confirmed after conflicts, documents, objectives and urgency are reviewed.</p></div><div class="two-col"><div class="location-panel"><h3>Typical work</h3><ul class="location-checks">${list(p.checks)}</ul></div><div><span class="eyebrow light">A practical point</span><h2 style="margin:14px 0 16px;">${p.warningTitle}</h2><p class="text-secondary location-copy">${p.warning}</p><p style="margin-top:18px;"><a href="${p.practice}" class="link">View the main practice area <i class="ti ti-arrow-right"></i></a></p></div></div></div></section><section class="section"><div class="container"><div class="two-col"><div><span class="eyebrow light">Starting the matter</span><h2 style="margin:14px 0 16px;">Clear review, scope and next steps</h2><ol class="location-steps"><li><strong>Initial review:</strong> We identify conflicts, urgency, objectives and key missing information.</li><li><strong>Defined scope:</strong> You receive a proposal explaining the work, responsibilities, fees and likely third-party costs.</li><li><strong>Legal work:</strong> Walailak Law Firm manages the engagement and keeps you informed in clear English.</li></ol></div><div>${contact}</div></div></div></section><section class="section-sm on-tint"><div class="container"><h2 style="font-size:20px;margin-bottom:16px;">Related legal services</h2><div class="location-related">${related}</div></div></section></main>${footer}<script src="/js/main.js"></script></body></html>`;
}

for (const page of pages) fs.writeFileSync(`${page.slug}.html`, render(page).replace(/ & /g, ' &amp; '));
