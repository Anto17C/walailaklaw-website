# Firefly Hero Image Inventory and Production Plan

## Final recommendation

Create a distinct hero image for every new page. Reuse the visual system and prompt framework, but do not reuse the exact same image across multiple pages. This preserves local relevance, prevents adjacent pages from looking duplicated and gives each service page a clear visual subject.

The completed rollout contains **99 new pages requiring hero-image decisions**:

- 1 nationwide locations hub
- 18 city location pages
- 80 city/service pages

This means the final production target is **99 optimized WebP files**. The workload stays manageable by using eight shared prompt families with page-specific subjects and locations.

## File and composition standard

- Firefly output: landscape, ideally 2400 × 1000 px or the closest available wide ratio
- Final website format: WebP
- Final filename for the hub: `locations-thailand-hero.webp`
- Final filename for a city page: `location-{city-slug}-hero.webp`
- Final filename for a service page: `{page-slug}-hero.webp`
- Photorealistic editorial/commercial photography, refined and credible
- Thailand-specific setting, architecture, landscape or business context
- Primary visual interest in the right-hand 45% of the frame
- Left-hand 55% calm, darker and uncluttered for white page copy
- Enough central detail for a useful mobile crop
- Natural warm daylight or restrained cinematic light; no heavy orange cast
- No visible text, signage text, logos, watermarks, flags, maps or UI
- Avoid gavels, scales of justice, courthouse columns, staged handshakes and generic stock-photo legal clichés
- Avoid identifiable public figures and close, recognizable faces
- Do not depict conduct that could imply guaranteed outcomes, government affiliation or specialist credentials not stated on the page

## Shared prompt families

Every page receives an individual prompt, but its prompt should derive from one of these families:

1. **Nationwide network:** refined geographic breadth, connected Thai business centres and professional coordination.
2. **City overview:** a locally recognizable but non-touristic city, industrial, coastal, island or regional setting.
3. **Company, BOI and commercial:** modern operating business, industrial estate, logistics, hospitality or professional meeting appropriate to the city.
4. **Property due diligence:** the relevant property type with documents, site review or architectural detail; never a staged key handover.
5. **Disputes and debt recovery:** restrained document review, contract evidence, cargo, goods, project or business context; no aggressive confrontation.
6. **Family, wills and estates:** discreet intergenerational or household context with documents and Thai property cues; no melodrama.
7. **Employment, visa and work permits:** international professional in a real operating environment with document review; no passport close-ups showing data.
8. **Trade, shipping and hospitality:** port, supply chain, tourism, marine, agricultural or goods context tailored to the actual page.

## Page inventory

The filename is formed directly from each route as described above.

### Nationwide hub — 1 image

- `/locations` → `locations-thailand-hero.webp` — Nationwide network family

### Location overview pages — 18 images

- `/locations/chonburi`
- `/locations/si-racha`
- `/locations/laem-chabang`
- `/locations/phuket`
- `/locations/chiang-mai`
- `/locations/hua-hin`
- `/locations/koh-samui`
- `/locations/surat-thani`
- `/locations/pathum-thani`
- `/locations/nonthaburi`
- `/locations/samut-prakan`
- `/locations/ayutthaya`
- `/locations/chiang-rai`
- `/locations/khon-kaen`
- `/locations/udon-thani`
- `/locations/korat`
- `/locations/chanthaburi`
- `/locations/trat`

All use the City overview family and filenames in the form `location-{city-slug}-hero.webp`.

### Rayong service pages — 5 images

- `/rayong-property-due-diligence`
- `/rayong-property-disputes`
- `/rayong-wills-estate-planning`
- `/rayong-company-registration-boi`
- `/rayong-debt-recovery-litigation`

### Pattaya service pages — 3 images

- `/pattaya-property-due-diligence`
- `/pattaya-wills-estate-planning`
- `/pattaya-landlord-tenant-disputes`

### Phuket service pages — 4 images

- `/phuket-property-due-diligence`
- `/phuket-property-disputes`
- `/phuket-company-registration-hospitality`
- `/phuket-wills-estate-planning`

### Chiang Mai service pages — 4 images

- `/chiang-mai-family-divorce-mediation`
- `/chiang-mai-wills-estate-planning`
- `/chiang-mai-property-due-diligence`
- `/chiang-mai-company-visa-work-permit`

### Si Racha service pages — 4 images

- `/si-racha-corporate-commercial-lawyer`
- `/si-racha-employment-visa-work-permit`
- `/si-racha-commercial-disputes-debt-recovery`
- `/si-racha-property-due-diligence`

### Laem Chabang service pages — 4 images

- `/laem-chabang-shipping-logistics-disputes`
- `/laem-chabang-trade-debt-recovery`
- `/laem-chabang-commercial-contracts`
- `/laem-chabang-company-workforce-support`

### Chonburi service pages — 4 images

- `/chonburi-company-boi-investment`
- `/chonburi-commercial-disputes-debt-recovery`
- `/chonburi-property-due-diligence`
- `/chonburi-wills-estate-planning`

### Hua Hin service pages — 4 images

- `/hua-hin-property-due-diligence`
- `/hua-hin-wills-estate-planning`
- `/hua-hin-family-divorce-mediation`
- `/hua-hin-company-hospitality-services`

### Koh Samui service pages — 4 images

- `/koh-samui-property-due-diligence`
- `/koh-samui-company-hospitality-compliance`
- `/koh-samui-property-commercial-disputes`
- `/koh-samui-wills-estate-planning`

### Surat Thani service pages — 4 images

- `/surat-thani-company-commercial-support`
- `/surat-thani-trade-disputes-debt-recovery`
- `/surat-thani-property-due-diligence`
- `/surat-thani-wills-estate-planning`

### Pathum Thani service pages — 4 images

- `/pathum-thani-company-boi-technology`
- `/pathum-thani-commercial-disputes-debt-recovery`
- `/pathum-thani-industrial-property-due-diligence`
- `/pathum-thani-employment-visa-work-permit`

### Nonthaburi service pages — 4 images

- `/nonthaburi-company-commercial-contracts`
- `/nonthaburi-condominium-property-due-diligence`
- `/nonthaburi-civil-disputes-debt-recovery`
- `/nonthaburi-family-wills-estates`

### Samut Prakan service pages — 4 images

- `/samut-prakan-company-boi-investment`
- `/samut-prakan-commercial-disputes-debt-recovery`
- `/samut-prakan-industrial-property-due-diligence`
- `/samut-prakan-employment-visa-work-permit`

### Ayutthaya service pages — 4 images

- `/ayutthaya-company-boi-investment`
- `/ayutthaya-supply-chain-disputes-debt-recovery`
- `/ayutthaya-industrial-property-due-diligence`
- `/ayutthaya-employment-visa-work-permit`

### Chiang Rai service pages — 4 images

- `/chiang-rai-company-cross-border-trade`
- `/chiang-rai-property-due-diligence`
- `/chiang-rai-commercial-disputes-debt-recovery`
- `/chiang-rai-family-wills-estates`

### Khon Kaen service pages — 4 images

- `/khon-kaen-company-boi-commercial`
- `/khon-kaen-commercial-disputes-debt-recovery`
- `/khon-kaen-property-development-due-diligence`
- `/khon-kaen-family-wills-estates`

### Udon Thani service pages — 4 images

- `/udon-thani-company-cross-border-business`
- `/udon-thani-commercial-disputes-debt-recovery`
- `/udon-thani-property-due-diligence`
- `/udon-thani-family-wills-estates`

### Korat service pages — 4 images

- `/korat-company-boi-industrial-investment`
- `/korat-commercial-disputes-debt-recovery`
- `/korat-industrial-property-due-diligence`
- `/korat-employment-visa-work-permit`

### Chanthaburi service pages — 4 images

- `/chanthaburi-company-trade-contracts`
- `/chanthaburi-trade-disputes-debt-recovery`
- `/chanthaburi-property-due-diligence`
- `/chanthaburi-family-wills-estates`

### Trat service pages — 4 images

- `/trat-company-tourism-hospitality`
- `/trat-commercial-cross-border-disputes`
- `/trat-island-coastal-property-due-diligence`
- `/trat-family-wills-estates`

## Production sequence

Produce the images in batches so the visual direction can be corrected before all 99 are generated:

1. **Calibration batch — 5 images:** nationwide hub, one city overview, one business page, one property page and one family/dispute page.
2. **Location batch — 17 remaining city images:** confirm that each city is distinct and avoids postcard clichés.
3. **Eastern Seaboard batch:** Rayong, Pattaya, Chonburi, Si Racha, Laem Chabang, Chanthaburi and Trat services.
4. **Island and resort batch:** Phuket, Hua Hin and Koh Samui services.
5. **Bangkok-region and industrial batch:** Pathum Thani, Nonthaburi, Samut Prakan and Ayutthaya services.
6. **Northern and Northeast batch:** Chiang Mai, Chiang Rai, Khon Kaen, Udon Thani and Korat services.
7. **Southern regional batch:** Surat Thani services.

After every batch, reject images with invented text, malformed documents or hands, geographically misleading landmarks, overly prominent faces, incorrect driving orientation, or insufficient negative space for the hero copy.

## Integration rule

Do not update generator image fields until an image has been approved and saved under its final filename. After each approved batch, update both page generators, regenerate the HTML, inspect desktop and mobile crops, and verify that every referenced image exists.
