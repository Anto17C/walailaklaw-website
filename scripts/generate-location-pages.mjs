import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const homeHtml = readFileSync(resolve(root, 'index.html'), 'utf8');

const locations = [
  {
    slug: 'chonburi', name: 'Chonburi', image: 'company-registration-lawyer.webp',
    title: 'English-Speaking Lawyers in Chonburi | Walailak Law Firm',
    description: 'English-speaking legal services in Chonburi for international businesses, foreign residents and families, provided by Walailak Law Firm with local support when useful.',
    lead: 'Comprehensive legal support for international businesses, foreign residents and families across Chonburi province—from commercial and industrial matters to property, disputes and urgent representation.',
    contextTitle: 'A connected legal market with very different client needs',
    context: 'Chonburi combines major industrial estates, international supply chains, Laem Chabang Port, established residential communities and Pattaya’s tourism economy. A matter may involve provincial courts and authorities, an industrial estate, a Land Office or specialist local attendance. Walailak Law Firm leads each engagement and can handle the matter directly, involving our established local counsel only when the work benefits from it.',
    clients: ['Manufacturers and foreign-invested companies', 'Executives and international employees', 'Property buyers and long-term residents', 'Overseas counsel needing Thai representation'],
    services: [
      ['Company, BOI & investment support', 'Company structuring, foreign ownership questions, contracts and practical coordination for businesses entering or operating in the Eastern Economic Corridor.', '/chonburi-company-boi-investment'],
      ['Commercial disputes & debt recovery', 'Contract claims, trade debts, negotiation, litigation strategy and enforcement planning involving Chonburi businesses.', '/chonburi-commercial-disputes-debt-recovery'],
      ['Property & Land Office matters', 'Independent due diligence, contract review, title checks and registration support for residential and commercial property.', '/chonburi-property-due-diligence'],
      ['Wills & estate planning', 'Thai wills and coordinated planning for property owners, international families and overseas beneficiaries.', '/chonburi-wills-estate-planning']
    ],
    focus: 'Chonburi is a broad provincial market. Walailak Law Firm determines whether to handle the full matter directly or involve our Chonburi local counsel for a particular court, authority or local task.',
    related: [['Pattaya Office','/pattaya-law-office'],['Si Racha','/locations/si-racha'],['Laem Chabang','/locations/laem-chabang']]
  },
  {
    slug: 'si-racha', name: 'Si Racha', image: 'arbitration-lawyer.webp',
    title: 'English-Speaking Lawyers in Si Racha | Walailak Law Firm',
    description: 'Legal services in Si Racha for international companies, executives and foreign residents, with local capability available when the matter requires it.',
    lead: 'Business-focused legal assistance for international companies, executives and families in Si Racha and the surrounding Eastern Seaboard industrial area.',
    contextTitle: 'Legal support shaped around industry and international management',
    context: 'Si Racha sits between major industrial estates, residential communities and Laem Chabang’s logistics economy. Clients commonly need help that crosses company, employment, immigration, contract and property issues. Walailak Law Firm leads the matter in English and may handle it directly or involve our Si Racha local counsel for specific location-dependent work.',
    clients: ['Foreign-invested and Thai operating companies', 'International directors and managers', 'Suppliers, contractors and trade creditors', 'Foreign employees and their families'],
    services: [
      ['Corporate & commercial support', 'Company establishment, governance, shareholder and contract matters for operating businesses.', '/si-racha-corporate-commercial-lawyer'],
      ['Employment, visa & work permits', 'Coordinated advice for lawful employment, management roles, work authorization and workforce issues.', '/si-racha-employment-visa-work-permit'],
      ['Contract and payment disputes', 'Practical assessment, demand strategy, negotiation and litigation support for commercial disagreements.', '/si-racha-commercial-disputes-debt-recovery'],
      ['Executive property matters', 'Independent review of purchases, leases and property arrangements for foreign executives and families.', '/si-racha-property-due-diligence']
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
      ['Shipping & logistics disputes', 'Contract and liability review involving transport, demurrage, detention, cargo, agency and payment issues.', '/laem-chabang-shipping-logistics-disputes'],
      ['Trade debt recovery', 'Assessment, demand letters, negotiation, court proceedings and enforcement strategy for unpaid commercial obligations.', '/laem-chabang-trade-debt-recovery'],
      ['Commercial contracts', 'Drafting and review for suppliers, service providers, contractors and operating partners.', '/laem-chabang-commercial-contracts'],
      ['Company & workforce support', 'Company, licensing, employment, visa and work-permit coordination for businesses operating locally.', '/laem-chabang-company-workforce-support']
    ],
    focus: 'Walailak Law Firm may handle the full engagement directly. If a dispute, court, authority or operational issue calls for local support, the firm involves and manages our Laem Chabang local counsel while remaining responsible for the engagement and the client relationship.',
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
      ['Property due diligence', 'Independent title, encumbrance, seller-authority, building and contract checks before a deposit or completion.', '/phuket-property-due-diligence'],
      ['Property & leasehold disputes', 'Advice and representation for developer, defect, lease, management and property-contract disputes.', '/phuket-property-disputes'],
      ['Company & hospitality services', 'Lawful structuring, shareholder documentation, licensing and operational support without nominee arrangements.', '/phuket-company-registration-hospitality'],
      ['Wills & estate planning', 'Thai wills and succession planning for residents, villa and condominium owners and overseas beneficiaries.', '/phuket-wills-estate-planning']
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
    context: 'Chiang Mai attracts long-term foreign residents, international couples, retirees, entrepreneurs and small businesses. Their matters often combine Thai documentation with overseas assets, family relationships or remote decision-makers. Walailak Law Firm can manage the engagement remotely or arrange travel as appropriate, involving our Chiang Mai local counsel only when local attendance or added capability benefits the client.',
    clients: ['International couples and families', 'Retirees and long-term foreign residents', 'Property buyers, owners and tenants', 'Entrepreneurs and small international businesses'],
    services: [
      ['Family, divorce & mediation', 'Separation, mediation, divorce, children and cross-border family coordination handled with discretion.', '/chiang-mai-family-divorce-mediation'],
      ['Wills & estate planning', 'Thai wills and succession planning for local property, accounts and international family circumstances.', '/chiang-mai-wills-estate-planning'],
      ['Property due diligence', 'Independent due diligence, title checks, purchase agreements and lease documentation.', '/chiang-mai-property-due-diligence'],
      ['Company, visa & work permits', 'Business establishment, contracts, employment documentation, visas and work permits.', '/chiang-mai-company-visa-work-permit']
    ],
    focus: 'Remote consultations and document review can begin before a client travels. Walailak Law Firm decides whether to handle every stage directly, arrange travel when appropriate or involve our Chiang Mai local counsel for a defined role while the firm continues to lead the matter.',
    related: [['Phuket','/locations/phuket'],['Bangkok enquiries','/contact'],['All locations','/locations']]
  },
  {
    slug: 'hua-hin', name: 'Hua Hin', image: 'real-estate-lawyer.webp',
    title: 'English-Speaking Lawyers in Hua Hin | Walailak Law Firm',
    description: 'English-speaking legal services in Hua Hin for foreign residents, property owners, international families and hospitality businesses.',
    lead: 'Independent legal support for foreign residents, property clients, international families and businesses in Hua Hin and nearby resort communities.',
    contextTitle: 'Legal support for a mature resort and residential market',
    context: 'Hua Hin combines established resort businesses, condominium and villa developments, retirement communities and long-term international residents. Legal matters often involve property ownership, Thai wills, international family circumstances or businesses serving the tourism and residential market. Walailak Law Firm provides the service directly and involves our Hua Hin local counsel when local attendance adds practical value.',
    clients: ['Foreign residents and retirees', 'Villa, house and condominium buyers', 'International couples and families', 'Hospitality and service-business operators'],
    services: [
      ['Property due diligence', 'Independent title, contract and ownership review for houses, villas, condominiums, land and leasehold interests.', '/hua-hin-property-due-diligence'],
      ['Wills & estate planning', 'Thai wills and succession planning for local property, accounts, family arrangements and overseas beneficiaries.', '/hua-hin-wills-estate-planning'],
      ['Family, divorce & mediation', 'Discreet advice on separation, divorce, children, financial arrangements and cross-border family matters.', '/hua-hin-family-divorce-mediation'],
      ['Company & hospitality support', 'Lawful business structuring, contracts, employment and operational coordination for hospitality and service businesses.', '/hua-hin-company-hospitality-services']
    ],
    focus: 'Walailak Law Firm may manage the entire engagement remotely or travel when appropriate. If a Land Office, court, authority or other local step benefits from support in Hua Hin, the firm assigns and manages our established local counsel while remaining responsible for the matter.',
    related: [['Bangkok enquiries','/contact'],['Phuket','/locations/phuket'],['All locations','/locations']]
  },
  {
    slug: 'koh-samui', name: 'Koh Samui', image: 'real-estate-lawyer.webp',
    title: 'English-Speaking Lawyers in Koh Samui | Walailak Law Firm',
    description: 'English-speaking legal services in Koh Samui for foreign property buyers, residents, international families and hospitality businesses.',
    lead: 'Independent legal support for property clients, foreign residents, international families and businesses in Koh Samui.',
    contextTitle: 'Independent legal review in a high-value island market',
    context: 'Koh Samui’s villa, resort, hospitality and long-term residential market creates legal questions involving land, buildings, leases, companies, licences and cross-border family arrangements. Walailak Law Firm handles the engagement directly and adds our Koh Samui local counsel when an island-based inspection, authority, court or other defined task benefits the client.',
    clients: ['Overseas villa and property buyers', 'Foreign residents and international families', 'Hotel, restaurant and wellness businesses', 'Owners facing property or commercial disputes'],
    services: [
      ['Property due diligence', 'Independent title, access, building, contract and ownership review before buying or leasing island property.', '/koh-samui-property-due-diligence'],
      ['Company & hospitality compliance', 'Lawful company structures, ownership reviews, contracts and operational support without nominee arrangements.', '/koh-samui-company-hospitality-compliance'],
      ['Property & commercial disputes', 'Strategy and representation for developer, lease, construction, shareholder, contract and payment disputes.', '/koh-samui-property-commercial-disputes'],
      ['Wills & estate planning', 'Thai wills and succession planning for island property, company interests, accounts and overseas beneficiaries.', '/koh-samui-wills-estate-planning']
    ],
    focus: 'Walailak Law Firm remains responsible for the client relationship and legal strategy. The firm may handle the complete matter remotely or travel; our established Koh Samui local counsel is involved only where local attendance or additional capability is useful.',
    related: [['Phuket','/locations/phuket'],['Hua Hin','/locations/hua-hin'],['All locations','/locations']]
  },
  {
    slug: 'surat-thani', name: 'Surat Thani', image: 'company-registration-lawyer.webp',
    title: 'English-Speaking Lawyers in Surat Thani | Walailak Law Firm',
    description: 'English-speaking legal services in Surat Thani for businesses, creditors, property clients, foreign residents and international families.',
    lead: 'Practical legal support for businesses, property clients, foreign residents and international families in Surat Thani.',
    contextTitle: 'Commercial legal support for an Upper Southern hub',
    context: 'Mainland Surat Thani connects agriculture, processing, wholesale trade, transport, logistics, services and the province’s island economy. Matters may involve several counterparties, provincial authorities, commercial land or family assets. Walailak Law Firm provides and manages the service directly, adding our Surat Thani local counsel when a defined local step benefits the client.',
    clients: ['Trading, processing and logistics businesses', 'Thai and overseas commercial creditors', 'Property buyers, owners and investors', 'Foreign residents and international families'],
    services: [
      ['Company & commercial support', 'Company structures, contracts, governance, employment and operational coordination for mainland businesses.', '/surat-thani-company-commercial-support'],
      ['Trade disputes & debt recovery', 'Evidence-led demands, negotiation, litigation and enforcement planning for commercial claims.', '/surat-thani-trade-disputes-debt-recovery'],
      ['Property due diligence', 'Independent review of residential, commercial and agricultural property transactions and leases.', '/surat-thani-property-due-diligence'],
      ['Wills & estate planning', 'Thai wills and succession planning for local property, businesses, accounts and overseas beneficiaries.', '/surat-thani-wills-estate-planning']
    ],
    focus: 'Walailak Law Firm may handle the entire matter remotely or arrange travel. Where a court, Land Office, authority or evidence-gathering task requires local attendance, the firm assigns and manages our established Surat Thani local counsel while remaining accountable for the engagement.',
    related: [['Koh Samui','/locations/koh-samui'],['Hua Hin','/locations/hua-hin'],['All locations','/locations']]
  },
  {
    slug: 'pathum-thani', name: 'Pathum Thani', image: 'company-registration-lawyer.webp',
    title: 'English-Speaking Lawyers in Pathum Thani | Walailak Law Firm',
    description: 'English-speaking legal services in Pathum Thani for industrial, technology and logistics businesses, property clients and employers.',
    lead: 'Business-focused legal support for companies, investors, employers and property clients in Pathum Thani and the northern Bangkok industrial corridor.',
    contextTitle: 'Legal support for industry, technology and regional operations',
    context: 'Pathum Thani combines major industrial communities, manufacturing and distribution operations, science and technology activity, universities and fast-growing residential areas. Walailak Law Firm handles matters directly and involves our Pathum Thani local counsel when court, authority, Land Office or other local attendance adds practical value.',
    clients: ['Manufacturers and foreign-invested companies', 'Technology and data-infrastructure businesses', 'Suppliers, distributors and commercial creditors', 'Employers, executives and property investors'],
    services: [
      ['Company, BOI & technology support', 'Structuring, investment-promotion, governance and commercial support for industrial and technology projects.', '/pathum-thani-company-boi-technology'],
      ['Commercial disputes & debt recovery', 'Contract claims, unpaid invoices, supplier disputes, litigation and enforcement planning.', '/pathum-thani-commercial-disputes-debt-recovery'],
      ['Industrial property due diligence', 'Independent review of factories, warehouses, commercial land, leases and operating premises.', '/pathum-thani-industrial-property-due-diligence'],
      ['Employment, visa & work permits', 'Employment documentation, workplace issues and coordinated authorization for foreign personnel.', '/pathum-thani-employment-visa-work-permit']
    ],
    focus: 'Walailak Law Firm provides and manages the engagement, whether handled entirely by the firm or supported by our established Pathum Thani local counsel for a defined court, authority, property or evidence-related task.',
    related: [['Bangkok enquiries','/contact'],['Ayutthaya enquiries','/contact'],['All locations','/locations']]
  },
  {
    slug: 'nonthaburi', name: 'Nonthaburi', image: 'family-lawyer.webp',
    title: 'English-Speaking Lawyers in Nonthaburi | Walailak Law Firm',
    description: 'English-speaking legal services in Nonthaburi for businesses, condominium owners, foreign residents and international families.',
    lead: 'Clear legal support for businesses, property owners, foreign residents and international families in Nonthaburi.',
    contextTitle: 'Bangkok-connected legal work with a distinct local setting',
    context: 'Nonthaburi combines dense residential communities, condominium developments, commercial centres and businesses operating across the wider Bangkok region. Matters often require coordination between local property, court or registration steps and clients elsewhere in Thailand or overseas. Walailak Law Firm provides and manages the engagement directly.',
    clients: ['Foreign residents and international families', 'Condominium and residential property clients', 'SMEs, shareholders and commercial operators', 'Thai and overseas creditors or counterparties'],
    services: [
      ['Company & commercial contracts', 'Company establishment, governance and practical contract support for Bangkok-region businesses.', '/nonthaburi-company-commercial-contracts'],
      ['Condominium & property due diligence', 'Independent review of titles, purchase agreements, leases and residential property arrangements.', '/nonthaburi-condominium-property-due-diligence'],
      ['Civil disputes & debt recovery', 'Evidence-led strategy for contract, property, shareholder and payment disputes.', '/nonthaburi-civil-disputes-debt-recovery'],
      ['Family, wills & estates', 'Divorce, family arrangements, Thai wills and succession planning for international households.', '/nonthaburi-family-wills-estates']
    ],
    focus: 'Walailak Law Firm may handle the complete matter directly. When a Nonthaburi court, Land Office, district office or other local step requires attendance, the firm assigns and manages our established Nonthaburi local counsel while remaining responsible for the engagement.',
    related: [['Pathum Thani','/locations/pathum-thani'],['Bangkok enquiries','/contact'],['All locations','/locations']]
  },
  {
    slug: 'samut-prakan', name: 'Samut Prakan', image: 'company-registration-lawyer.webp',
    title: 'English-Speaking Lawyers in Samut Prakan | Walailak Law Firm',
    description: 'Legal services in Samut Prakan for manufacturers, logistics businesses, investors, employers and industrial property clients.',
    lead: 'Business-focused legal support for manufacturers, logistics operators, investors and employers in Samut Prakan.',
    contextTitle: 'Legal support for a major industrial and logistics gateway',
    context: 'Samut Prakan combines manufacturing estates, warehouses, logistics operations, airport-connected businesses and dense commercial communities. Walailak Law Firm handles matters directly and adds our Samut Prakan local counsel when a court, authority, Land Office or on-site task benefits the client.',
    clients: ['Manufacturers and foreign-invested companies','Logistics, warehouse and distribution operators','Suppliers, creditors and commercial counterparties','Employers, executives and industrial property clients'],
    services: [
      ['Company, BOI & investment support','Company structuring, promotion, governance and operational coordination for industrial projects.','/samut-prakan-company-boi-investment'],
      ['Commercial disputes & debt recovery','Contract claims, supply disputes, unpaid debts, litigation and enforcement planning.','/samut-prakan-commercial-disputes-debt-recovery'],
      ['Industrial property due diligence','Independent review of factories, warehouses, industrial land, leases and operating premises.','/samut-prakan-industrial-property-due-diligence'],
      ['Employment, visa & work permits','Employment documentation, workplace issues and coordinated authorization for foreign personnel.','/samut-prakan-employment-visa-work-permit']
    ],
    focus: 'Walailak Law Firm provides and manages the engagement, whether handled entirely by the firm or supported by our established Samut Prakan local counsel for a defined local task.',
    related: [['Bangkok enquiries','/contact'],['Chonburi','/locations/chonburi'],['All locations','/locations']]
  },
  {
    slug:'ayutthaya',name:'Ayutthaya',image:'company-registration-lawyer.webp',title:'English-Speaking Lawyers in Ayutthaya | Walailak Law Firm',description:'Legal services in Ayutthaya for manufacturers, investors, suppliers, employers and industrial property clients.',lead:'Business-focused legal support for manufacturers, investors, suppliers and employers in Ayutthaya.',contextTitle:'Legal support for a major manufacturing centre',context:'Ayutthaya combines large industrial estates, international manufacturers, supply chains and historic urban communities. Walailak Law Firm handles matters directly and adds our Ayutthaya local counsel when court, authority, Land Office or on-site work benefits the client.',clients:['Manufacturers and foreign-invested companies','Suppliers, contractors and commercial creditors','Employers, executives and foreign specialists','Factory, warehouse and industrial land clients'],services:[['Company, BOI & investment support','Structuring, promotion, governance and operational support for industrial projects.','/ayutthaya-company-boi-investment'],['Supply-chain disputes & debt recovery','Contract claims, unpaid debts, manufacturing disputes and enforcement planning.','/ayutthaya-supply-chain-disputes-debt-recovery'],['Industrial property due diligence','Independent review of factories, warehouses, industrial land and leases.','/ayutthaya-industrial-property-due-diligence'],['Employment, visa & work permits','Employment documentation, workplace disputes and foreign-personnel authorization.','/ayutthaya-employment-visa-work-permit']],focus:'Walailak Law Firm provides and manages the engagement, whether handled entirely by the firm or supported by our established Ayutthaya local counsel for a defined local task.',related:[['Pathum Thani','/locations/pathum-thani'],['Bangkok enquiries','/contact'],['All locations','/locations']]
  },
  {
    slug:'chiang-rai',name:'Chiang Rai',image:'real-estate-lawyer.webp',title:'English-Speaking Lawyers in Chiang Rai | Walailak Law Firm',description:'Legal services in Chiang Rai for cross-border businesses, property clients, foreign residents and international families.',lead:'Independent legal support for businesses, property clients, foreign residents and international families in Chiang Rai.',contextTitle:'Legal support for a northern border economy',context:'Chiang Rai combines cross-border trade, agriculture and processing, tourism, residential property and international communities. Walailak Law Firm provides and manages each engagement directly, involving our Chiang Rai local counsel when a court, authority, Land Office or local evidence task benefits the client.',clients:['Cross-border traders and regional businesses','Foreign residents and international families','Property buyers, owners and investors','Suppliers, creditors and commercial counterparties'],services:[['Cross-border company & trade support','Company structures, contracts and practical coordination for trade and regional operations.','/chiang-rai-company-cross-border-trade'],['Property due diligence','Independent review of land, houses, developments, leases and proposed ownership arrangements.','/chiang-rai-property-due-diligence'],['Commercial disputes & debt recovery','Contract claims, unpaid debts, negotiation, litigation and enforcement planning.','/chiang-rai-commercial-disputes-debt-recovery'],['Family, wills & estates','International family advice, Thai wills and succession planning.','/chiang-rai-family-wills-estates']],focus:'Walailak Law Firm may handle the complete matter remotely or arrange travel. Our established Chiang Rai local counsel is added only for a defined local role when useful, while the firm remains responsible for strategy and delivery.',related:[['Chiang Mai','/locations/chiang-mai'],['All locations','/locations'],['Contact the firm','/contact']]
  },
  {slug:'khon-kaen',name:'Khon Kaen',image:'company-registration-lawyer.webp',title:'English-Speaking Lawyers in Khon Kaen | Walailak Law Firm',description:'Legal services in Khon Kaen for businesses, investors, property clients and international families.',lead:'Regional legal support for businesses, investors, property clients and international families in Khon Kaen.',contextTitle:'Legal support for a Northeast commercial centre',context:'Khon Kaen serves as a regional centre for trade, services, education, healthcare, property development and growing investment. Walailak Law Firm provides and manages matters directly, involving our Khon Kaen local counsel when a court, authority, Land Office or local task benefits the client.',clients:['Regional and foreign-invested businesses','Suppliers, contractors and commercial creditors','Property owners, developers and investors','Foreign residents and international families'],services:[['Company, BOI & commercial support','Company structures, investment, governance and contracts for regional operations.','/khon-kaen-company-boi-commercial'],['Commercial disputes & debt recovery','Contract claims, unpaid debts, negotiation, litigation and enforcement planning.','/khon-kaen-commercial-disputes-debt-recovery'],['Property & development due diligence','Independent review of land, buildings, projects, leases and ownership arrangements.','/khon-kaen-property-development-due-diligence'],['Family, wills & estates','International family advice, Thai wills and succession planning.','/khon-kaen-family-wills-estates']],focus:'Walailak Law Firm may handle the complete engagement directly or assign a defined local role to our established Khon Kaen local counsel while remaining responsible for strategy, communication and delivery.',related:[['Udon Thani','/locations/udon-thani'],['Korat enquiries','/contact'],['All locations','/locations']]},
  {slug:'udon-thani',name:'Udon Thani',image:'company-registration-lawyer.webp',title:'English-Speaking Lawyers in Udon Thani | Walailak Law Firm',description:'Legal services in Udon Thani for regional businesses, property clients, foreign residents and international families.',lead:'Clear legal support for regional businesses, property clients, foreign residents and international families in Udon Thani.',contextTitle:'Legal support for a growing Northeast and cross-border market',context:'Udon Thani is a commercial and residential centre for the upper Northeast, with regional trading relationships, businesses serving markets connected with Laos, active property transactions and an established international community. Walailak Law Firm provides and manages each engagement directly, involving our Udon Thani local counsel when a court, authority, Land Office or local evidence task benefits the client.',clients:['Regional and cross-border businesses','Suppliers, distributors and commercial creditors','Property buyers, owners and investors','Foreign residents and international families'],services:[['Company & cross-border business support','Company structures, contracts and practical legal support for regional and cross-border operations.','/udon-thani-company-cross-border-business'],['Commercial disputes & debt recovery','Contract, supply and payment claims, negotiation, litigation and enforcement planning.','/udon-thani-commercial-disputes-debt-recovery'],['Property due diligence','Independent review of houses, land, commercial property, leases and ownership arrangements.','/udon-thani-property-due-diligence'],['Family, wills & estates','International family advice, Thai wills and succession planning for local and overseas assets.','/udon-thani-family-wills-estates']],focus:'Walailak Law Firm may handle the complete engagement directly or assign a defined local role to our established Udon Thani local counsel while remaining responsible for strategy, communication and delivery.',related:[['Khon Kaen','/locations/khon-kaen'],['Korat','/locations/korat'],['All locations','/locations']]},
  {slug:'korat',name:'Korat',image:'company-registration-lawyer.webp',title:'English-Speaking Lawyers in Korat | Walailak Law Firm',description:'Legal services in Korat and Nakhon Ratchasima for manufacturers, investors, businesses, employers and property clients.',lead:'Business-focused legal support for manufacturers, investors, employers and property clients in Korat and Nakhon Ratchasima.',contextTitle:'Legal support at a major gateway to Northeast Thailand',context:'Korat, officially Nakhon Ratchasima, combines industrial estates, manufacturing, logistics, agriculture-related businesses, property development and a large regional market. Walailak Law Firm provides and manages matters directly, involving our Korat local counsel when a court, authority, Land Office or on-site task benefits the client.',clients:['Manufacturers and foreign-invested companies','Suppliers, contractors and commercial creditors','Employers, executives and foreign specialists','Factory, warehouse and property investors'],services:[['Company, BOI & industrial investment','Company structures, investment promotion, governance and contracts for industrial and regional operations.','/korat-company-boi-industrial-investment'],['Commercial disputes & debt recovery','Contract, supply, construction and payment claims, litigation and enforcement planning.','/korat-commercial-disputes-debt-recovery'],['Industrial & property due diligence','Independent review of factories, warehouses, commercial land, development sites and leases.','/korat-industrial-property-due-diligence'],['Employment, visa & work permits','Employment documentation, workplace issues and coordinated authorization for foreign personnel.','/korat-employment-visa-work-permit']],focus:'Walailak Law Firm may handle the complete engagement directly or assign a defined local role to our established Korat local counsel while remaining responsible for strategy, communication and delivery.',related:[['Khon Kaen','/locations/khon-kaen'],['Udon Thani','/locations/udon-thani'],['All locations','/locations']]},
  {slug:'chanthaburi',name:'Chanthaburi',image:'company-registration-lawyer.webp',title:'English-Speaking Lawyers in Chanthaburi | Walailak Law Firm',description:'Legal services in Chanthaburi for trading businesses, property clients, creditors, foreign residents and international families.',lead:'Clear legal support for trading businesses, property clients, foreign residents and international families in Chanthaburi.',contextTitle:'Legal support for a distinctive trading and agricultural economy',context:'Chanthaburi combines the gem and jewellery trade, fruit and agricultural supply chains, tourism, coastal and rural property, and commercial links across eastern Thailand. Walailak Law Firm provides and manages each engagement directly, involving our Chanthaburi local counsel when a court, authority, Land Office or local evidence task benefits the client.',clients:['Gem, jewellery and agricultural businesses','Suppliers, traders and commercial creditors','Property buyers, owners and investors','Foreign residents and international families'],services:[['Company & trade contract support','Company structures, governance and contracts for gem, agricultural and other trading businesses.','/chanthaburi-company-trade-contracts'],['Trade disputes & debt recovery','Contract, quality, delivery and payment claims, negotiation, litigation and enforcement planning.','/chanthaburi-trade-disputes-debt-recovery'],['Property due diligence','Independent review of residential, commercial, rural and coastal property transactions.','/chanthaburi-property-due-diligence'],['Family, wills & estates','International family advice, Thai wills and succession planning for local and overseas assets.','/chanthaburi-family-wills-estates']],focus:'Walailak Law Firm may handle the complete engagement directly or assign a defined local role to our established Chanthaburi local counsel while remaining responsible for strategy, communication and delivery.',related:[['Rayong','/rayong-law-office'],['Trat','/locations/trat'],['All locations','/locations']]},
  {slug:'trat',name:'Trat',image:'real-estate-lawyer.webp',title:'English-Speaking Lawyers in Trat | Walailak Law Firm',description:'Legal services in Trat for tourism businesses, property clients, traders, foreign residents and international families.',lead:'Clear legal support for tourism businesses, property clients, traders, foreign residents and international families in Trat.',contextTitle:'Legal support for an island, coastal and border economy',context:'Trat combines mainland commerce, tourism and hospitality on Koh Chang and nearby islands, coastal property, marine services and trading relationships near the Cambodian border. Walailak Law Firm provides and manages each engagement directly, involving our Trat local counsel when a court, authority, Land Office or local evidence task benefits the client.',clients:['Tourism, hospitality and marine businesses','Traders, suppliers and commercial creditors','Island, coastal and mainland property clients','Foreign residents and international families'],services:[['Company, tourism & hospitality support','Company structures, contracts and operational legal support for tourism and hospitality businesses.','/trat-company-tourism-hospitality'],['Commercial & cross-border disputes','Contract, supply, service and payment claims involving Thai or overseas counterparties.','/trat-commercial-cross-border-disputes'],['Island & coastal property due diligence','Independent review of land, buildings, leases and proposed ownership arrangements in Trat and its islands.','/trat-island-coastal-property-due-diligence'],['Family, wills & estates','International family advice, Thai wills and succession planning for local and overseas assets.','/trat-family-wills-estates']],focus:'Walailak Law Firm may handle the complete engagement directly or assign a defined local role to our established Trat local counsel while remaining responsible for strategy, communication and delivery.',related:[['Chanthaburi','/locations/chanthaburi'],['Rayong','/rayong-law-office'],['All locations','/locations']]}
];

const contactRow = `<div class="contact-module"><div><h4>Discuss a matter confidentially</h4><p>Contact Kae directly for an initial review, strategy and scope.</p></div><div class="contact-icons"><a href="https://wa.me/66946463940?text=I%20need%20legal%20assistance%20in%20this%20location.%20Please%20contact%20me." class="icon-circle ic-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="ti ti-brand-whatsapp"></i></a><a href="https://line.me/ti/p/~kaezeeds" class="icon-circle ic-line" target="_blank" rel="noopener" aria-label="LINE"><img src="/images/line-icon.png" alt="" style="width:34px;height:34px;border-radius:8px;"></a><a href="tel:+66946463940" class="icon-circle ic-phone" aria-label="Call"><i class="ti ti-phone"></i></a></div></div>`;

const tracking = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-53CDHSWB" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53CDHSWB');</script>`;

function head(title, description, canonical) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="https://walailaklaw.com${canonical}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:image" content="https://walailaklaw.com/images/og-image.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="https://walailaklaw.com/images/og-image.jpg"><link rel="icon" type="image/svg+xml" href="/images/favicon.svg"><link rel="apple-touch-icon" href="/images/apple-touch-icon.png"><link rel="canonical" href="https://walailaklaw.com${canonical}"><link rel="alternate" hreflang="en" href="https://walailaklaw.com${canonical}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.44.0/dist/tabler-icons.min.css"><link rel="stylesheet" href="/css/style.css"></head><body>`;
}

const header = homeHtml
  .match(/<header class="site-header">[\s\S]*?<\/header>/)[0]
  .replaceAll('src="images/', 'src="/images/');

const footer = homeHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0];

function serviceIcon(title, href) {
  const service = `${title} ${href}`.toLowerCase();
  if (/shipping|logistics/.test(service)) return 'ti-ship';
  if (/employment|visa|work-permit|work permit|workforce/.test(service)) return 'ti-e-passport';
  if (/family|divorce|mediation/.test(service)) return 'ti-heart-handshake';
  if (/wills|estate|succession/.test(service)) return 'ti-file-text';
  if (/dispute|debt|litigation|recovery/.test(service)) return 'ti-scale';
  if (/property|real-estate|real estate|condominium|landlord|tenant/.test(service)) return 'ti-building-estate';
  if (/company|boi|commercial|contract|business|investment|hospitality|trade/.test(service)) return 'ti-briefcase';
  return 'ti-file-text';
}

function locationPage(x) {
  const cards = x.services.map(([t,d,h]) => `<div class="service-card"><div class="service-icon"><i class="ti ${serviceIcon(t,h)}"></i></div><h3>${t}</h3><p>${d}</p><a href="${h}" class="link">Explore the service <i class="ti ti-arrow-right"></i></a></div>`).join('');
  const clients = x.clients.map(v => `<li><i class="ti ti-check"></i>${v}</li>`).join('');
  const related = x.related.map(([t,h]) => `<a href="${h}" class="tag">${t}</a>`).join('');
  return `${head(x.title,x.description,`/locations/${x.slug}`)}${tracking}${header}<main><section class="hero hero-sm" style="--hero-img-mobile:url('/images/${x.image}');background-image:linear-gradient(90deg,rgba(20,17,13,.97) 0%,rgba(20,17,13,.91) 38%,rgba(20,17,13,.35) 100%),url('/images/${x.image}');"><div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="/">Home</a> / <a href="/locations">Locations</a> / ${x.name}</div><span class="eyebrow">NATIONWIDE SERVICE · LOCAL CAPABILITY</span><h1>English-Speaking Lawyers in ${x.name}</h1><p class="lead">${x.lead}</p></div></div></section><section class="section"><div class="container"><div class="two-col"><div><span class="eyebrow light">Legal support in ${x.name}</span><h2 style="margin:14px 0 16px;">${x.contextTitle}</h2><p class="text-secondary location-copy">${x.context}</p></div><div class="location-panel"><h3>Who we assist</h3><ul class="location-checks">${clients}</ul></div></div></div></section><section class="section on-tint"><div class="container"><div class="section-header"><span class="eyebrow light">Relevant services</span><h2>Legal matters we handle in ${x.name}</h2><p>Walailak Law Firm determines whether to handle the matter directly or include our local counsel in ${x.name} for a defined role, based on the facts, jurisdiction and practical needs.</p></div><div class="services-grid location-services">${cards}</div></div></section><section class="section"><div class="container"><div class="two-col"><div><span class="eyebrow light">How our flexible model works</span><h2 style="margin:14px 0 16px;">One accountable law firm, flexible delivery</h2><p class="text-secondary location-copy">${x.focus}</p><ol class="location-steps"><li><strong>Initial review:</strong> Walailak Law Firm assesses the facts, urgency and conflicts.</li><li><strong>Clear scope:</strong> You receive a clear plan explaining who will handle each part of the work and the fees.</li><li><strong>Managed delivery:</strong> Walailak Law Firm provides and manages the engagement, whether the matter is handled entirely by the firm or supported by our established local counsel for a defined task.</li></ol></div><div>${contactRow}</div></div></div></section><section class="section-sm on-tint"><div class="container"><h2 style="font-size:20px;margin-bottom:16px;">Related locations</h2><div class="location-related">${related}</div></div></section></main>${footer}<script src="/js/main.js"></script></body></html>`;
}

const hubCards = [
  ['Rayong','Our principal Eastern Seaboard office for property, industry, disputes and urgent matters.','/rayong-law-office','Office'],
  ['Pattaya','Our Pattaya office for property, business, family and criminal matters.','/pattaya-law-office','Office'],
  ...locations.map(x => [x.name, x.lead, `/locations/${x.slug}`, 'Nationwide coverage'])
].map(([n,d,h,k]) => `<article class="location-card"><span>${k}</span><h3>${n}</h3><p>${d}</p><a href="${h}" class="link">View location <i class="ti ti-arrow-right"></i></a></article>`).join('');

const hub = `${head('Legal Services Across Thailand | Walailak Law Firm','Find Walailak Law Firm offices and legal services in Rayong, Pattaya, Chonburi, Si Racha, Laem Chabang, Phuket and Chiang Mai.','/locations')}${tracking}${header}<main><section class="hero hero-sm" style="--hero-img-mobile:url('/images/office-signage-hero.webp');background-image:linear-gradient(90deg,rgba(20,17,13,.97),rgba(20,17,13,.75)),url('/images/office-signage-hero.webp');"><div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="/">Home</a> / Locations</div><span class="eyebrow">OFFICES · NATIONWIDE LEGAL SERVICES</span><h1>Legal Services Across Thailand</h1><p class="lead">Walailak Law Firm provides legal services throughout Thailand, handling matters directly and working with our established local counsel only when the matter requires local support.</p></div></div></section><section class="section"><div class="container"><div class="section-header"><span class="eyebrow light">Where we work</span><h2>One trusted point of contact, backed by local capability</h2><p>Rayong and Pattaya are our physical offices. In other listed locations, Walailak Law Firm provides and manages the legal service nationwide, working with our established local counsel only when appropriate.</p></div><div class="location-grid">${hubCards}</div></div></section><section class="section on-dark"><div class="container"><div class="two-col"><div><span class="eyebrow">THE WALAILAK MODEL</span><h2 style="color:#fff;margin:14px 0 16px;">Direct leadership with flexible delivery</h2><p class="location-copy" style="color:var(--text-on-dark-secondary);">Walailak Law Firm reviews the enquiry and decides the best way to handle it. The firm may manage every stage directly, work remotely or arrange travel; our established local counsel is involved only when attendance, specialist input or practical efficiency benefits the client.</p></div><div>${contactRow}</div></div></div></section></main>${footer}<script src="/js/main.js"></script></body></html>`;

function cleanHtml(html) {
  return html
    .replaceAll('&family=', '&amp;family=')
    .replaceAll('&display=', '&amp;display=')
    .replaceAll(' & ', ' &amp; ');
}

writeFileSync(resolve(root, 'locations.html'), cleanHtml(hub));
mkdirSync(resolve(root, 'locations'), { recursive: true });
for (const x of locations) writeFileSync(resolve(root, 'locations', `${x.slug}.html`), cleanHtml(locationPage(x)));
