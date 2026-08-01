# NAVANA Website

Premium single-page web portfolio for **NAVANA** ([navana.co.in](https://navana.co.in)), a luxury real estate, interior design, modular kitchen, and sanitaryware supply firm based in Nerul, Navi Mumbai.

> **Tagline:** *"Where properties breathe, & designs live!"*

---

## 🎨 Visual Identity & Design System

The design is engineered to feel premium and spacious, drawing architectural inspiration from clean lines and minimalist lookbooks.

*   **Color Palette:**
    *   Primary Background: Warm Cream/Beige (`#F5F0E6`)
    *   Primary Text / Accents: Dark Brown (`#3E2F2F`)
    *   Secondary Accent / Details: Tan (`#B89A7E`)
    *   Muted Sections Background: Soft Ivory (`#FCFAF7`)
*   **Typography:**
    *   **Montserrat**: Spaced-out sans-serif (`letter-spacing: 0.15em`, all-caps) for titles and heading hierarchy.
    *   **Plus Jakarta Sans**: High-readability sans-serif for body descriptions and feature lists.
*   **Aesthetics:** Parallax-blended hero image background, dynamic scroll entrance reveals, and custom-designed inline SVG illustration mapping the Nerul Sec 19A office.

---

## 📂 Project Directory Structure

```text
Navana Website/
├── index.html                     # Semantic HTML5 document containing all sections and layouts
├── style.css                      # Styling rules containing CSS variables, components, and media queries
├── script.js                      # Core JS logic: scroll reveals, menus, and support hubs
├── logo.jpg                       # Isolated transparent logo image (PNG formatted for alpha channel support)
├── Havens.png                     # Night-lit luxury villa render (Hero full-screen background)
├── Regency_Palms.jpg              # Twin luxury high-rise towers render (Haven service section image)
├── Interior_Design.jpg            # Luxury living room with teal sofa render (Designs service section image)
├── Real_Kitchen_Design.jpg        # Luxury modular galley kitchen photo (Kitchens service section image)
├── Real_Essenttials_Bathroom.jpg  # Luxury bathroom with matte black waterfall faucet (Essentials service section image)
└── README.md                      # Project manual and documentation
```

---

## 🏛️ Business Divisions & Dials

The website is segmented into four distinct columns of architecture, each linked with customized WhatsApp pre-filled enquiries and tel hooks:

1.  **HAVEN (Real Estate)**
    *   *Tagline:* "Haven for properties, harmony for living!"
    *   *Hotline Desk:* `+91 70780 88098`
    *   *Service focus:* Residential property sourcing, commercial space advisory, legal transaction support, Nerul location scouting.
2.  **DESIGNS (Interior Design)**
    *   *Tagline:* "Where properties breathe and designs live!"
    *   *Hotline Desk:* `+91 97688 17629`
    *   *Service focus:* End-to-end luxury interiors, space planning, bespoke carpentry, architectural lighting.
3.  **KITCHENS (Modular Kitchens)**
    *   *Tagline:* "Expertly sourced, Seamlessly Supplied!"
    *   *Hotline Desk:* `+91 99877 34354`
    *   *Service focus:* German modular layouts, premium stone countertops, smart appliance integration, custom cabinet systems.
4.  **ESSENTIALS (Sanitaryware & Fittings)**
    *   *Tagline:* "Essential fittings, Perfect start!"
    *   *Hotline Desk:* `+91 77158 38389`
    *   *Service focus:* Designer faucets, premium door hardware/locks, architectural electrical switches, imported sanitaryware supply.

---

## 🖥️ Local Hosting & Verification

The project is structured to run as a static website. You can open `index.html` directly in any web browser, or serve it locally.

### Start local PowerShell server
A lightweight native background web server runs on port **8000** on .NET's `HttpListener` using the command:
```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\majir\.gemini\antigravity-ide\scratch\server.ps1"
```
You can view the live site in your browser at:
**[http://localhost:8000](http://localhost:8000)**
