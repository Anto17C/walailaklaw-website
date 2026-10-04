#!/usr/bin/env python3
"""Build the off-plan property purchase contract review page in all four languages.

Usage:  python3 scripts/build-offplan-page.py

Writes off-plan-property-purchase-review.html plus th/, fr/ and zh/ versions, using the same
header, footer, hero and card styles as the rest of the site (via scripts/i18n/generate_i18n.py).
Afterwards run scripts/add-structured-data.py (adds the FAQ markup), scripts/add-regional-links.py
(links the page from the real-estate practice page) and scripts/build-sitemap.py.

The content is general guidance drawn from the kinds of questions buyers ask. It contains no
client names or details, and no fees.
"""
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts', 'i18n'))
os.chdir(ROOT)
import generate_i18n as g  # noqa: E402

SLUG = 'off-plan-property-purchase-review'
EN_PATH = f'/{SLUG}'
ICONS = ['ti-building-estate', 'ti-cash', 'ti-shield-lock', 'ti-calendar-time', 'ti-receipt-refund',
         'ti-arrows-exchange', 'ti-clipboard-check', 'ti-receipt-tax', 'ti-gavel']

C = {}

C['en'] = dict(
    title="Off-Plan Condo & Villa Purchase Contract Review in Thailand | Walailak Law Firm",
    description="Independent review of off-plan condo and villa purchase contracts in Thailand: payments, completion, refunds, transfer and the points worth negotiating.",
    eyebrow="OFF-PLAN PROPERTY CONTRACTS",
    h1="Off-Plan Condo & Villa Purchase Contract Review in Thailand",
    lead="Independent English-language review of reservation and sale agreements before you sign or pay the next instalment, for buyers in Thailand and abroad.",
    practice="Real Estate",
    introEyebrow="Off-plan buyers",
    introTitle="When you buy before it is built, the contract is your protection",
    intro="With an off-plan purchase you usually pay in stages while the building is still under construction and before any title exists for your unit. A title search today shows only today's position, so your real protection is what the contract says if something goes wrong later: if the unit cannot be transferred as promised, if completion is delayed, or if the relationship breaks down. Walailak Law Firm reads the agreement as a buyer will have to live with it, explains each risk in plain English and tells you which points matter most. This is a contract review. Checking the land title, approvals and the developer's standing is separate due diligence, which we can add if you want it.",
    whenTitle="When buyers contact us",
    situations=["A reservation or draft sale and purchase agreement for a condo or villa under construction",
                "A request to pay the next instalment, and you want to know what evidence to ask for first",
                "A developer who has refused to change the contract",
                "A buyer abroad who cannot inspect the project in person",
                "A foreign buyer relying on the foreign ownership quota or a leasehold structure",
                "A delayed project, or a developer asking you to accept new terms"],
    reviewEyebrow="Scope of review",
    reviewTitle="What we check in the contract",
    reviewIntro="We work clause by clause and rank the issues we find by importance.",
    cards=[("Foreign ownership and quota", "Whether the contract protects you if the unit cannot legally be transferred to you as a foreign owner, and whether a refund applies."),
           ("Payment schedule and proof", "How instalments are tied to construction or approval milestones, and what evidence you should receive before each payment."),
           ("Security for your payments", "Whether any escrow, bank guarantee or similar protection exists for money paid before transfer."),
           ("Completion date and extensions", "The developer's right to extend completion, how it is defined, and what remedies apply once the extended date passes."),
           ("Default, forfeiture and refunds", "Clauses that let the developer keep part of your money, delay a refund or limit your claims, and whether they are balanced."),
           ("Final payment and transfer", "The order of delivery, final payment and registration of ownership at the Land Office."),
           ("Inspection, defects and warranty", "Deemed acceptance, inspection deadlines and protection for hidden or structural defects."),
           ("Taxes, fees and ongoing costs", "Who pays transfer fees and taxes, and the sinking fund and common-area fees that follow."),
           ("Governing law and disputes", "Language, governing law and whether the contract respects mandatory Thai protections.")],
    noEyebrow="When the answer is no",
    noTitle="Decide what is essential before you sign",
    noText="Developers often refuse changes, especially to standard forms. That does not mean you must accept every risk or walk away. We rank the issues so you know which points are essential conditions, which are worth negotiating, and which you can accept with a written clarification or a practical safeguard instead.",
    fallbackTitle="Fallback protections we look at",
    fallbacks=["Written evidence before each instalment, such as approvals and construction milestones",
               "A short addendum covering the refund if transfer cannot be completed as promised",
               "Written clarification of unclear clauses instead of a change to the main text",
               "Staging or holding back payments where the contract allows it",
               "Clear exit points: the conditions on which you should not proceed"],
    stagesEyebrow="Support in stages",
    stagesTitle="Choose the stages you need",
    stages=[("Contract review and priority list:", "A clause-by-clause report with the issues ranked by importance."),
            ("Amendment wording:", "Short, ready-to-send addendum wording for the points you decide to pursue."),
            ("Enforceability opinion:", "Our view on whether specific clauses are valid and enforceable under Thai law, when you ask for it."),
            ("Milestone and approval checks:", "Review of the evidence the developer provides before each instalment."),
            ("Completion and transfer:", "Support at inspection, handover and Land Office registration, in person or through an authorised representative.")],
    stagesNote="Each stage has its own scope, agreed with you in writing. You can stop after any stage.",
    faqTitle="Frequently asked questions",
    faq=[("Do I need a lawyer before paying an off-plan reservation?", "A reservation often commits you to the terms of the later sale agreement or puts the deposit at risk. It is usually worth having the draft contract read before you pay anything beyond a small reservation, and certainly before the first construction instalment."),
         ("Is a title or land check enough?", "A title check shows the position on the day it is done and cannot prevent a later charge on the land. For an off-plan purchase the contract remedies matter just as much. We review the contract, and can add checks on the land, approvals and developer as separate due diligence."),
         ("Can a developer keep part of my payments if I default?", "Some contracts let the developer keep a share of the money paid and refund the rest only after resale. Whether such a clause is fair and enforceable depends on its wording and on mandatory Thai law, so we review the clause and explain the risk and the negotiating options."),
         ("What if the developer refuses to change anything?", "We rank the points as essential, negotiable or acceptable with a clarification, so you can decide whether to proceed, ask for a written safeguard or stop."),
         ("Can you act for me if I live abroad?", "Yes. Most of this work is done remotely in English, with written reports, video or WhatsApp calls, and a power of attorney or authorised representative where something must be done in Thailand."),
         ("Which documents do you need?", "The draft agreement with its annexes, the reservation form, the payment schedule and your correspondence with the developer. We confirm conflicts before you share any documents.")],
    related=["Real estate lawyer", "Property disputes in Phuket", "Property due diligence in Phuket", "Property due diligence in Pattaya"],
)

C['th'] = dict(
    title="ตรวจสอบสัญญาซื้อคอนโดและวิลล่าก่อนก่อสร้างเสร็จในประเทศไทย | สำนักงานกฎหมายวลัยลักษณ์",
    description="บริการตรวจสอบสัญญาจะซื้อจะขายคอนโดและวิลล่าที่ยังก่อสร้างไม่เสร็จในประเทศไทย ทั้งการชำระเงิน กำหนดแล้วเสร็จ การคืนเงิน การโอน และประเด็นที่ควรเจรจา",
    eyebrow="สัญญาซื้อขายอสังหาริมทรัพย์ก่อนก่อสร้างเสร็จ",
    h1="บริการตรวจสอบสัญญาซื้อคอนโดและวิลล่าก่อนก่อสร้างเสร็จในประเทศไทย",
    lead="การตรวจสอบสัญญาจองและสัญญาซื้อขายเป็นภาษาอังกฤษอย่างเป็นอิสระ ก่อนลงนามหรือชำระงวดถัดไป สำหรับผู้ซื้อในประเทศไทยและต่างประเทศ",
    practice="อสังหาริมทรัพย์",
    introEyebrow="ผู้ซื้อก่อนก่อสร้างเสร็จ",
    introTitle="เมื่อซื้อก่อนสร้างเสร็จ สัญญาคือสิ่งที่คุ้มครองคุณ",
    intro="การซื้อโครงการที่ยังก่อสร้างไม่เสร็จมักต้องชำระเงินเป็นงวดขณะที่อาคารยังอยู่ระหว่างก่อสร้าง และก่อนที่จะมีกรรมสิทธิ์สำหรับห้องของคุณ การตรวจโฉนดในวันนี้แสดงเพียงสถานะ ณ วันนี้ ความคุ้มครองที่แท้จริงจึงอยู่ที่ข้อสัญญาว่าจะเกิดอะไรขึ้นหากมีปัญหาในภายหลัง เช่น ไม่สามารถโอนห้องได้ตามที่สัญญา การก่อสร้างล่าช้า หรือความสัมพันธ์สิ้นสุดลง สำนักงานกฎหมายวลัยลักษณ์อ่านสัญญาในมุมของผู้ซื้อที่ต้องอยู่กับสัญญานั้น อธิบายความเสี่ยงแต่ละข้อเป็นภาษาอังกฤษที่เข้าใจง่าย และบอกว่าประเด็นใดสำคัญที่สุด นี่คือการตรวจสอบสัญญา ส่วนการตรวจสอบกรรมสิทธิ์ที่ดิน ใบอนุญาต และสถานะของผู้พัฒนาโครงการเป็นการตรวจสอบสถานะทางกฎหมายแยกต่างหาก ซึ่งเราเพิ่มให้ได้หากคุณต้องการ",
    whenTitle="เมื่อผู้ซื้อติดต่อเรา",
    situations=["ใบจองหรือร่างสัญญาซื้อขายคอนโดหรือวิลล่าที่ยังอยู่ระหว่างก่อสร้าง",
                "ถูกเรียกให้ชำระงวดถัดไป และต้องการทราบว่าควรขอหลักฐานอะไรก่อน",
                "ผู้พัฒนาโครงการปฏิเสธที่จะแก้ไขสัญญา",
                "ผู้ซื้อที่อยู่ต่างประเทศและไม่สามารถไปตรวจสอบโครงการด้วยตนเอง",
                "ผู้ซื้อชาวต่างชาติที่อาศัยโควตาการถือครองของชาวต่างชาติหรือโครงสร้างสิทธิการเช่า",
                "โครงการที่ล่าช้า หรือผู้พัฒนาโครงการขอให้ยอมรับเงื่อนไขใหม่"],
    reviewEyebrow="ขอบเขตการตรวจสอบ",
    reviewTitle="ประเด็นที่เราตรวจสอบในสัญญา",
    reviewIntro="เราทำงานเป็นข้อต่อข้อและจัดลำดับความสำคัญของประเด็นที่พบ",
    cards=[("การถือครองของชาวต่างชาติและโควตา", "สัญญาคุ้มครองคุณหรือไม่หากไม่สามารถโอนห้องให้คุณในฐานะชาวต่างชาติได้ตามกฎหมาย และมีการคืนเงินหรือไม่"),
           ("ตารางชำระเงินและหลักฐาน", "การผูกงวดชำระกับความคืบหน้าการก่อสร้างหรือการอนุมัติ และหลักฐานที่คุณควรได้รับก่อนชำระแต่ละงวด"),
           ("หลักประกันสำหรับเงินที่ชำระ", "มีบัญชีเอสโครว์ หนังสือค้ำประกันของธนาคาร หรือหลักประกันอื่นสำหรับเงินที่ชำระก่อนโอนหรือไม่"),
           ("กำหนดแล้วเสร็จและการขยายเวลา", "สิทธิของผู้พัฒนาโครงการในการขยายเวลา การกำหนดเงื่อนไข และการเยียวยาเมื่อพ้นกำหนดที่ขยาย"),
           ("การผิดสัญญา การริบเงิน และการคืนเงิน", "ข้อสัญญาที่ให้ผู้พัฒนาโครงการยึดเงินบางส่วน ชะลอการคืนเงิน หรือจำกัดสิทธิเรียกร้องของคุณ และความสมดุลของข้อสัญญา"),
           ("การชำระงวดสุดท้ายและการโอน", "ลำดับของการส่งมอบ การชำระงวดสุดท้าย และการจดทะเบียนโอนกรรมสิทธิ์ที่สำนักงานที่ดิน"),
           ("การตรวจรับ ข้อบกพร่อง และการรับประกัน", "การถือว่ายอมรับ กำหนดเวลาตรวจรับ และการคุ้มครองข้อบกพร่องที่ซ่อนเร้นหรือเกี่ยวกับโครงสร้าง"),
           ("ภาษี ค่าธรรมเนียม และค่าใช้จ่ายต่อเนื่อง", "ใครรับผิดชอบค่าธรรมเนียมและภาษีการโอน รวมถึงกองทุนสำรองและค่าส่วนกลางที่ตามมา"),
           ("กฎหมายที่ใช้บังคับและการระงับข้อพิพาท", "ภาษา กฎหมายที่ใช้บังคับ และสัญญาเคารพการคุ้มครองตามกฎหมายไทยที่เป็นข้อบังคับหรือไม่")],
    noEyebrow="เมื่อคำตอบคือไม่",
    noTitle="ตัดสินใจให้ชัดว่าอะไรจำเป็นก่อนลงนาม",
    noText="ผู้พัฒนาโครงการมักปฏิเสธการแก้ไข โดยเฉพาะแบบสัญญามาตรฐาน แต่นั่นไม่ได้หมายความว่าคุณต้องยอมรับทุกความเสี่ยงหรือต้องยกเลิกการซื้อ เราจัดลำดับประเด็นเพื่อให้คุณทราบว่าข้อใดเป็นเงื่อนไขจำเป็น ข้อใดควรเจรจา และข้อใดยอมรับได้หากมีหนังสือชี้แจงหรือมาตรการป้องกันในทางปฏิบัติแทน",
    fallbackTitle="มาตรการป้องกันที่เราพิจารณา",
    fallbacks=["หลักฐานเป็นหนังสือก่อนชำระแต่ละงวด เช่น ใบอนุญาตและความคืบหน้าการก่อสร้าง",
               "ข้อตกลงเพิ่มเติมสั้น ๆ เรื่องการคืนเงินหากไม่สามารถโอนได้ตามที่สัญญา",
               "หนังสือชี้แจงข้อสัญญาที่ไม่ชัดเจน แทนการแก้ไขเนื้อหาสัญญาหลัก",
               "การชะลอหรือแบ่งชำระเงินในกรณีที่สัญญาอนุญาต",
               "จุดยุติที่ชัดเจน คือเงื่อนไขที่คุณไม่ควรดำเนินการต่อ"],
    stagesEyebrow="การสนับสนุนเป็นขั้นตอน",
    stagesTitle="เลือกขั้นตอนที่คุณต้องการ",
    stages=[("ตรวจสอบสัญญาและจัดลำดับประเด็น:", "รายงานเป็นข้อต่อข้อ พร้อมจัดลำดับประเด็นตามความสำคัญ"),
            ("ถ้อยคำแก้ไขสัญญา:", "ข้อความข้อตกลงเพิ่มเติมสั้น ๆ พร้อมส่งสำหรับประเด็นที่คุณตัดสินใจดำเนินการ"),
            ("ความเห็นเรื่องการบังคับใช้ได้:", "ความเห็นของเราว่าข้อสัญญาใดมีผลสมบูรณ์และบังคับใช้ได้ตามกฎหมายไทยหรือไม่ เมื่อคุณขอ"),
            ("ตรวจสอบความคืบหน้าและการอนุมัติ:", "ตรวจสอบหลักฐานที่ผู้พัฒนาโครงการให้ก่อนชำระแต่ละงวด"),
            ("การแล้วเสร็จและการโอน:", "สนับสนุนในการตรวจรับ ส่งมอบ และจดทะเบียนที่สำนักงานที่ดิน ด้วยตนเองหรือผ่านตัวแทนที่ได้รับมอบอำนาจ")],
    stagesNote="แต่ละขั้นตอนมีขอบเขตของตนเองซึ่งตกลงกับคุณเป็นลายลักษณ์อักษร คุณหยุดได้หลังจากขั้นตอนใดก็ได้",
    faqTitle="คำถามที่พบบ่อย",
    faq=[("ต้องปรึกษาทนายความก่อนชำระเงินจองหรือไม่?", "การจองมักผูกพันคุณตามเงื่อนไขของสัญญาซื้อขายฉบับต่อมา หรือทำให้เงินมัดจำมีความเสี่ยง โดยทั่วไปควรให้ตรวจสอบร่างสัญญาก่อนชำระเงินเกินกว่าเงินจองจำนวนเล็กน้อย และควรทำก่อนชำระงวดก่อสร้างงวดแรกเสมอ"),
         ("การตรวจโฉนดหรือที่ดินเพียงอย่างเดียวเพียงพอหรือไม่?", "การตรวจกรรมสิทธิ์แสดงสถานะ ณ วันที่ตรวจ และไม่อาจป้องกันภาระผูกพันที่เกิดขึ้นบนที่ดินในภายหลังได้ สำหรับการซื้อก่อนก่อสร้างเสร็จ การเยียวยาตามสัญญามีความสำคัญไม่แพ้กัน เราตรวจสอบสัญญา และเพิ่มการตรวจสอบที่ดิน ใบอนุญาต และผู้พัฒนาโครงการเป็นงานแยกต่างหากได้"),
         ("ผู้พัฒนาโครงการยึดเงินบางส่วนได้หรือไม่หากฉันผิดสัญญา?", "สัญญาบางฉบับให้ผู้พัฒนาโครงการยึดเงินส่วนหนึ่งที่ชำระแล้วและคืนส่วนที่เหลือหลังขายต่อเท่านั้น ข้อสัญญาเช่นนี้ยุติธรรมและบังคับใช้ได้หรือไม่ขึ้นอยู่กับถ้อยคำและกฎหมายไทยที่เป็นข้อบังคับ เราจึงตรวจสอบข้อสัญญา อธิบายความเสี่ยง และทางเลือกในการเจรจา"),
         ("ถ้าผู้พัฒนาโครงการไม่ยอมแก้ไขอะไรเลยจะทำอย่างไร?", "เราจัดประเด็นเป็นจำเป็น เจรจาได้ หรือยอมรับได้หากมีหนังสือชี้แจง เพื่อให้คุณตัดสินใจได้ว่าจะดำเนินการต่อ ขอมาตรการป้องกันเป็นหนังสือ หรือยุติ"),
         ("ทำงานให้ฉันได้หรือไม่หากฉันอยู่ต่างประเทศ?", "ได้ งานส่วนใหญ่ดำเนินการจากระยะไกลเป็นภาษาอังกฤษ พร้อมรายงานเป็นลายลักษณ์อักษร วิดีโอคอลหรือ WhatsApp และหนังสือมอบอำนาจหรือตัวแทนที่ได้รับมอบอำนาจเมื่อต้องดำเนินการในประเทศไทย"),
         ("ต้องใช้เอกสารอะไรบ้าง?", "ร่างสัญญาพร้อมเอกสารแนบ แบบฟอร์มจอง ตารางชำระเงิน และการติดต่อกับผู้พัฒนาโครงการ เราตรวจสอบความขัดแย้งทางผลประโยชน์ก่อนที่คุณจะส่งเอกสาร")],
    related=["ทนายความอสังหาริมทรัพย์", "ข้อพิพาททรัพย์สินในภูเก็ต", "การตรวจสอบทรัพย์สินก่อนซื้อในภูเก็ต", "การตรวจสอบทรัพย์สินก่อนซื้อในพัทยา"],
)

C['fr'] = dict(
    title="Revue de Contrat d'Achat sur Plan de Condo et Villa en Thaïlande | Walailak Law Firm",
    description="Examen indépendant des contrats d'achat sur plan de condominiums et villas en Thaïlande : paiements, livraison, remboursements, transfert et points à négocier.",
    eyebrow="CONTRATS IMMOBILIERS SUR PLAN",
    h1="Revue de Contrat d'Achat sur Plan de Condo et Villa en Thaïlande",
    lead="Examen indépendant, en anglais, des contrats de réservation et de vente avant que vous ne signiez ou ne versiez l'échéance suivante, pour les acheteurs en Thaïlande et à l'étranger.",
    practice="Immobilier",
    introEyebrow="Acheteurs sur plan",
    introTitle="Quand vous achetez avant la construction, le contrat est votre protection",
    intro="Dans un achat sur plan, vous payez généralement par étapes pendant que l'immeuble est en construction, et avant qu'un titre existe pour votre lot. Une recherche de titre effectuée aujourd'hui n'indique que la situation du jour : votre véritable protection est ce que prévoit le contrat si un problème survient plus tard, par exemple si le lot ne peut pas être transféré comme promis, si la livraison est retardée ou si la relation se détériore. Walailak Law Firm lit le contrat comme un acheteur devra le vivre, explique chaque risque en termes clairs et indique les points qui comptent le plus. Il s'agit d'une revue de contrat ; la vérification du titre foncier, des autorisations et de la situation du promoteur est une due diligence distincte, que nous pouvons ajouter si vous le souhaitez.",
    whenTitle="Quand les acheteurs nous contactent",
    situations=["Une réservation ou un projet de contrat de vente pour un condominium ou une villa en construction",
                "Une demande de payer l'échéance suivante, et vous voulez savoir quelles preuves exiger d'abord",
                "Un promoteur qui a refusé de modifier le contrat",
                "Un acheteur à l'étranger qui ne peut pas inspecter le projet en personne",
                "Un acheteur étranger qui s'appuie sur le quota de propriété étrangère ou sur un bail",
                "Un projet en retard, ou un promoteur qui demande d'accepter de nouvelles conditions"],
    reviewEyebrow="Étendue de l'examen",
    reviewTitle="Ce que nous examinons dans le contrat",
    reviewIntro="Nous travaillons clause par clause et classons les points relevés par ordre d'importance.",
    cards=[("Propriété étrangère et quota", "Le contrat vous protège-t-il si le lot ne peut légalement pas vous être transféré en tant qu'étranger, et un remboursement est-il prévu ?"),
           ("Échéancier et preuves", "La façon dont les échéances sont liées à des jalons de construction ou d'autorisation, et les preuves que vous devez recevoir avant chaque paiement."),
           ("Garantie des paiements", "Existe-t-il un séquestre, une garantie bancaire ou une protection comparable pour les sommes versées avant le transfert ?"),
           ("Date d'achèvement et prorogations", "Les droits du promoteur de proroger le délai, leur définition, et les recours applicables une fois la date prorogée dépassée."),
           ("Défaut, retenue et remboursements", "Les clauses qui permettent au promoteur de conserver une partie de vos fonds, de retarder un remboursement ou de limiter vos recours, et leur équilibre."),
           ("Paiement final et transfert", "L'ordre entre la livraison, le paiement final et l'enregistrement de la propriété au Bureau des terres."),
           ("Inspection, défauts et garantie", "L'acceptation réputée, les délais d'inspection et la protection contre les vices cachés ou structurels."),
           ("Taxes, frais et coûts récurrents", "Qui supporte les frais et taxes de transfert, ainsi que le fonds de réserve et les charges communes qui suivent."),
           ("Droit applicable et litiges", "La langue, le droit applicable et le respect ou non des protections impératives du droit thaïlandais.")],
    noEyebrow="Quand la réponse est non",
    noTitle="Décider de l'essentiel avant de signer",
    noText="Les promoteurs refusent souvent les modifications, surtout sur des contrats types. Cela ne signifie pas que vous devez accepter tous les risques ni renoncer. Nous classons les points pour que vous sachiez lesquels sont des conditions essentielles, lesquels méritent une négociation, et lesquels peuvent être acceptés avec une clarification écrite ou une garantie pratique à la place.",
    fallbackTitle="Garanties de repli que nous examinons",
    fallbacks=["Des preuves écrites avant chaque échéance, telles que les autorisations et l'avancement des travaux",
               "Un court avenant sur le remboursement si le transfert ne peut pas être réalisé comme promis",
               "Une clarification écrite des clauses ambiguës plutôt qu'une modification du texte principal",
               "Le report ou l'échelonnement des paiements lorsque le contrat le permet",
               "Des points de sortie clairs : les conditions dans lesquelles vous ne devriez pas poursuivre"],
    stagesEyebrow="Accompagnement par étapes",
    stagesTitle="Choisir les étapes dont vous avez besoin",
    stages=[("Revue du contrat et liste des priorités :", "Un rapport clause par clause, avec les points classés par importance."),
            ("Rédaction des modifications :", "Un court avenant prêt à envoyer pour les points que vous décidez de défendre."),
            ("Avis sur l'opposabilité :", "Notre avis sur la validité et l'exécution de certaines clauses en droit thaïlandais, lorsque vous le demandez."),
            ("Vérification des jalons et autorisations :", "Examen des preuves fournies par le promoteur avant chaque échéance."),
            ("Livraison et transfert :", "Assistance lors de l'inspection, de la remise des clés et de l'enregistrement au Bureau des terres, en personne ou via un représentant autorisé.")],
    stagesNote="Chaque étape a son propre périmètre, convenu avec vous par écrit. Vous pouvez vous arrêter après n'importe quelle étape.",
    faqTitle="Questions fréquentes",
    faq=[("Faut-il consulter un avocat avant de payer une réservation sur plan ?", "Une réservation vous engage souvent aux conditions du contrat de vente ultérieur ou met l'acompte en danger. Il vaut généralement la peine de faire lire le projet de contrat avant tout paiement supérieur à une petite réservation, et certainement avant la première échéance de construction."),
         ("Une vérification du titre ou du terrain suffit-elle ?", "Une vérification du titre montre la situation le jour où elle est faite et ne peut pas empêcher une charge ultérieure sur le terrain. Pour un achat sur plan, les recours prévus au contrat comptent tout autant. Nous examinons le contrat et pouvons ajouter, comme due diligence distincte, des vérifications sur le terrain, les autorisations et le promoteur."),
         ("Un promoteur peut-il conserver une partie de mes paiements si je suis en défaut ?", "Certains contrats permettent au promoteur de conserver une part des sommes versées et de ne rembourser le reste qu'après revente. Le caractère équitable et exécutoire d'une telle clause dépend de sa rédaction et du droit thaïlandais impératif ; nous examinons donc la clause et expliquons le risque et les options de négociation."),
         ("Que faire si le promoteur refuse tout changement ?", "Nous classons les points en essentiels, négociables ou acceptables avec une clarification, afin que vous puissiez décider de poursuivre, de demander une garantie écrite ou de vous arrêter."),
         ("Pouvez-vous agir pour moi si je vis à l'étranger ?", "Oui. L'essentiel du travail se fait à distance, en anglais, avec des rapports écrits, des appels vidéo ou WhatsApp, et une procuration ou un représentant autorisé lorsqu'une démarche doit être faite en Thaïlande."),
         ("Quels documents faut-il fournir ?", "Le projet de contrat avec ses annexes, le formulaire de réservation, l'échéancier de paiement et vos échanges avec le promoteur. Nous vérifions les conflits d'intérêts avant que vous ne partagiez des documents.")],
    related=["Services immobiliers", "Litiges immobiliers à Phuket", "Due diligence immobilière à Phuket", "Due diligence immobilière à Pattaya"],
)

C['zh'] = dict(
    title="泰国期房公寓与别墅购房合同审查 | 瓦莱拉克律师事务所",
    description="为在泰国购买期房及预售公寓、别墅的买家提供独立的购房合同审查，涵盖付款安排、交付与延期、违约退款、过户及值得谈判的条款，并以英文清楚说明风险与后续步骤，适合身在泰国或海外的买家。",
    eyebrow="期房购房合同",
    h1="泰国期房公寓与别墅购房合同审查",
    lead="在您签署合同或支付下一期款项之前，为身在泰国或海外的买家提供独立的英文预订协议与买卖合同审查。",
    practice="房地产",
    introEyebrow="期房买家",
    introTitle="买期房时，合同才是您的保障",
    intro="购买期房通常要在楼宇施工期间分期付款，而此时您的单位尚未有产权。今天的产权查册只能反映当下的状况，因此真正的保障取决于合同在日后出问题时如何约定，例如单位无法按承诺过户、工期延误，或双方关系破裂。瓦莱拉克律师事务所以买家的角度审读合同，用通俗的英文说明每项风险，并指出哪些条款最为关键。这是合同审查；核查土地产权、审批文件及开发商状况属于另行开展的尽职调查，如您需要，我们也可以加入。",
    whenTitle="买家联系我们的常见情形",
    situations=["在建公寓或别墅的预订协议或买卖合同草案",
                "被要求支付下一期款项，想先了解应索取哪些证明",
                "开发商拒绝修改合同",
                "身在海外、无法亲自查看项目的买家",
                "依靠外国人持有配额或租赁结构的外籍买家",
                "项目延期，或开发商要求接受新条款"],
    reviewEyebrow="审查范围",
    reviewTitle="我们在合同中审查的内容",
    reviewIntro="我们逐条审阅，并按重要性对发现的问题排序。",
    cards=[("外国人持有与配额", "如果单位依法无法过户给您这样的外国买家，合同是否保护您，是否会退款。"),
           ("付款安排与证明", "各期款项如何与施工或审批节点挂钩，以及每次付款前您应当取得哪些证明。"),
           ("付款保障", "在过户前支付的款项，是否有托管账户、银行保函或类似保障。"),
           ("交付日期与延期", "开发商延长工期的权利如何界定，以及延期日期届满后可采取哪些救济。"),
           ("违约、没收与退款", "允许开发商保留部分款项、推迟退款或限制您索赔的条款，以及这些条款是否平衡。"),
           ("尾款与过户", "交付、支付尾款与在土地局办理产权登记的先后顺序。"),
           ("验收、瑕疵与保修", "视为接受、验收期限，以及对隐蔽瑕疵或结构瑕疵的保护。"),
           ("税费与持续成本", "过户费用与税款由谁承担，以及随后产生的公共基金与公共区域管理费。"),
           ("适用法律与争议", "语言、适用法律，以及合同是否尊重泰国法律的强制性保护。")],
    noEyebrow="遭到拒绝时",
    noTitle="签约前先确定哪些是必要条件",
    noText="开发商常常拒绝修改，尤其是标准格式合同。但这并不意味着您必须接受所有风险或放弃购买。我们会对问题排序，让您知道哪些是必要条件，哪些值得谈判，哪些可以通过书面澄清或实际的防范措施来接受。",
    fallbackTitle="我们会考虑的备选保护措施",
    fallbacks=["每期付款前取得书面证明，例如审批文件和施工进度",
               "就无法按承诺过户时的退款签署简短补充协议",
               "对含糊条款取得书面澄清，而不是修改合同正文",
               "在合同允许时，暂缓或分阶段付款",
               "明确的退出点：即不应继续推进的条件"],
    stagesEyebrow="分阶段支持",
    stagesTitle="按需选择所需的阶段",
    stages=[("合同审查与优先事项清单：", "逐条审查报告，并按重要性排序问题。"),
            ("修改条款措辞：", "为您决定争取的事项提供可直接发送的简短补充条款。"),
            ("可执行性意见：", "应您的要求，就具体条款在泰国法律下是否有效及可执行提出我们的意见。"),
            ("节点与审批核查：", "在每期付款前，审查开发商提供的证明材料。"),
            ("交付与过户：", "在验收、交接及土地局登记时提供协助，可亲自到场或通过授权代表办理。")],
    stagesNote="每个阶段都有各自的范围，并与您书面约定。您可以在任一阶段后停止。",
    faqTitle="常见问题",
    faq=[("支付期房预订款前需要律师吗？", "预订往往会让您受之后买卖合同条款的约束，或使定金面临风险。通常，在支付超出少量预订款的任何款项之前，都值得先请人审读合同草案，在支付第一期施工款之前更应如此。"),
         ("只做产权或土地查册就足够吗？", "产权查册只反映查册当天的状况，无法阻止日后土地上设立负担。对于期房，合同约定的救济同样重要。我们审查合同，并可另行加入对土地、审批和开发商的尽职调查。"),
         ("如果我违约，开发商可以保留部分款项吗？", "有些合同允许开发商保留已付款项的一部分，并在转售后才退还其余部分。此类条款是否公平、可执行，取决于具体措辞和泰国法律的强制性规定，因此我们会审查该条款，并说明风险和谈判选项。"),
         ("如果开发商拒绝做任何修改怎么办？", "我们会把问题分为必要、可谈判，或附书面澄清后可接受三类，让您决定是继续、要求书面保障，还是停止。"),
         ("我住在海外，你们能代理吗？", "可以。大部分工作以英文远程完成，包括书面报告、视频或WhatsApp通话，需要在泰国办理事项时，则通过授权委托书或授权代表进行。"),
         ("需要提供哪些文件？", "合同草案及其附件、预订表、付款安排，以及您与开发商之间的往来。在您分享文件之前，我们会先做利益冲突核查。")],
    related=["房地产服务", "普吉房产纠纷", "普吉房产尽职调查", "芭堤雅房产尽职调查"],
)

RELATED_HREFS = ['/real-estate-lawyer', '/phuket-property-disputes', '/phuket-property-due-diligence',
                 '/pattaya-property-due-diligence']


def render(locale):
    t = C[locale]
    ui = g.UI.get(locale, {})
    pre = '' if locale == 'en' else f'/{locale}'
    home_label = 'Home' if locale == 'en' else ui['home']
    related_title = 'Related legal services' if locale == 'en' else ui['related_services']
    heroimg, heropos = 'real-estate-lawyer.webp', 'center 65%'
    cards = ''.join(
        f'<div class="service-card"><div class="service-icon"><i class="ti {ic}"></i></div><h3>{ti}</h3><p>{de}</p></div>'
        for (ti, de), ic in zip(t['cards'], ICONS))
    situations = g.list_items(t['situations'])
    fallbacks = g.list_items(t['fallbacks'])
    steps = ''.join(f'<li><strong>{a}</strong> {b}</li>' for a, b in t['stages'])
    faq = ''
    for i, (q, a) in enumerate(t['faq']):
        opened = ' open' if i == 0 else ''
        icon = '−' if i == 0 else '+'
        faq += (f'<div class="faq-item{opened}"><button class="faq-q">{q} <span class="icon">{icon}</span></button>'
                f'<div class="faq-a">{a}</div></div>')
    related = ''.join(f'<a href="{pre}{h}" class="tag">{lbl}</a>' for lbl, h in zip(t['related'], RELATED_HREFS))
    h = g.head(locale, t['title'], t['description'], EN_PATH)
    header = g.header_for(locale, EN_PATH)
    footer = g.footer_for(locale)
    contact = g.contact_module(locale, with_text=False)
    html = (
        f'{h}{g.TRACKING}{header}<main>'
        f'<section class="hero hero-sm" style="--hero-img-mobile:url(\'/images/{heroimg}\');background-image:{g.STANDARD_OVERLAY},url(\'/images/{heroimg}\');background-size:cover;background-position:{heropos};">'
        f'<div class="container"><div class="hero-inner"><div class="breadcrumb"><a href="{pre}/">{home_label}</a> / <a href="{pre}/real-estate-lawyer">{t["practice"]}</a> / {t["h1"]}</div>'
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
    for locale in ['en', 'th', 'fr', 'zh']:
        path = f'{"" if locale == "en" else locale + "/"}{SLUG}.html'
        open(path, 'w', encoding='utf-8').write(render(locale))
        d = C[locale]['description']
        print(f'wrote {path}  (meta description {len(d)} chars)')


if __name__ == '__main__':
    main()
