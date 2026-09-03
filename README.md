# NAVANA website

Static website for [navana.co.in](https://navana.co.in), a NAVANA business website organised around four divisions:

- NAVANA Haven — real estate enquiries
- NAVANA Designs — interior design
- NAVANA Kitchens — modular kitchens
- NAVANA Essentials — bathroom and architectural fittings

## Structure

- `index.html` — homepage
- `about/index.html` — business and division overview
- `haven/index.html`, `designs/index.html`, `kitchens/index.html`, `essentials/index.html` — division pages
- `contact/index.html` — division directory and dynamic enquiry form
- `privacy/index.html` — website enquiry privacy notice
- `404.html` — not-found page
- `style.css` and `script.js` — shared presentation and behaviour
- `assets/` — web-optimised derivatives of the original logo and displayed reference images; the source files remain unchanged at the repository root
- Root-level `haven.html`, `designs.html`, `kitchens.html`, `essentials.html` and `contact.html` preserve older file URLs and use the directory URL as canonical.

## Published contact information

- Studio: Shop 53, 19 East, Sec:19A, Nerul, Navi Mumbai, Maharashtra 400706, India
- Email: navana.19east@gmail.com
- Haven: +91 70780 88098
- Designs: +91 97688 17629
- Kitchens: +91 99877 34354
- Essentials: +91 77158 38389

## Maintenance rules

- Do not publish projects, clients, testimonials, locations, brands, credentials, performance figures or business history without owner-supplied evidence.
- Do not describe reference images as completed NAVANA work unless ownership and project association have been confirmed.
- Keep root-level legacy HTML copies in sync with their corresponding directory pages.
- Keep visible contact information and JSON-LD data consistent.
- Preserve one H1, self-referencing canonicals, keyboard focus styles and reduced-motion behaviour on every indexable page.

## Owner confirmation required

- Founder or leadership name and professional background
- Founding year, registrations and professional credentials
- Current business hours and verified map link
- Legal business name and privacy retention period
- Meaning of “55+ AUM”, including currency, unit, period and evidence
- Image ownership and association with any NAVANA project or supplied product
- Verified completed work, clients, testimonials and product brands

Serve the repository root through a local HTTP server when testing so root-relative URLs behave as they do in production.
