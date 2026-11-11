# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step and no dependencies (decided by the owner). Deployed on Vercel (https://portfolioweb-roan-two.vercel.app/). The old Tailwind CDN include is dropped.

## Users

People who might hire Cecilia Pelayo ("Cece"), a graphic designer and illustrator trained at UDIT (Madrid):

- Small product brands (wine, tinned food, coffee, drinks) needing packaging, labels or identity.
- Publishers and cultural institutions (museums, festivals) needing books, catalogues, signage, posters.
- Design studios and agencies looking to hire or subcontract a designer.
- Recruiters and in-house design teams hiring a junior profile.

They arrive from a link (Instagram, Behance, LinkedIn, a CV or an email), skim fast, judge quality in seconds and decide whether to write. Success is that they contact her.

## Product Purpose

A single-page portfolio that sells Cecilia's work: show the strongest projects immediately, explain what she can be hired for, and make contacting her effortless. No section navigation and no separate pages.

## Positioning

She draws her own illustration (Procreate) and turns it into real, finished product: tins, coffee boxes, wine labels, book covers. Design and illustration in one person, so a client does not need to hire an illustrator separately.

## Capabilities and Constraints

- One page, bilingual Spanish/English with an ES/EN toggle on the same page (texts held in a single translations source; browser language detected; choice remembered). Spanish is the primary language.
- Projects open in a modal gallery with description and a fact sheet (year, role, tools, context).
- Contact is direct: public email `cecilia.pelayorodriguez@gmail.com` (mailto + copy) plus Instagram, Behance and LinkedIn. No contact form.
- Original images in `source-images/<project>/` are heavy (427 MB total), stay untouched and are excluded from the deploy (`.vercelignore`); the site serves optimised WebP copies from `assets/img/<project>/` with matching names.
- `portfolio.html`, `personal.html`, `contacto.html` and `css/masonry.css` are retired.

## Brand Commitments

- Logo: `source-images/brand/logo.png` (web copy `assets/img/brand/logo.webp`), a turquoise bubble-graffiti "CECE" with petrol-blue shadow and black outline. Used as is; it is binding.
- Name presented as the CECE logo plus "Cecilia Pelayo — Diseñadora gráfica"; page title "Cecilia Pelayo · Diseño gráfico".
- Honesty in project labelling: a "Context" field replaces "Client" (e.g. "Proyecto académico · UDIT", "Concurso Cata la Lata", "Propuesta para Black Sheep (no encargo)").

## Evidence on Hand

Six projects (images in `source-images/<project>/`):

1. Cata la Lata 2026 · 8ª edición: illustrated packaging for three tins (tuna, sardines, mussels). Competition. Featured piece.
2. Colores: three-volume book collection (blue, red, yellow), covers, interiors, promo and merchandising. Academic, UDIT, 2025.
3. Buna Coffee: premium coffee pack, six varieties plus collective pack, illustrated. Academic, UDIT, 2026.
4. Cháchara: Valencian wine brand identity and labels. Academic, UDIT, 2023.
5. En el ojo del artista: Neil Leifer exhibition (signage, catalogue, tickets, spaces). Academic, UDIT, 2024.
6. Black Sheep Iced Coffee: 3D packaging in Cinema 4D. Speculative proposal, not a commission. 2026.

Personal pieces: `source-images/personal/jazz.png`, `source-images/personal/feelit.png`.

Tools: Illustrator, InDesign, Photoshop, Figma, Procreate, After Effects, Premiere, Cinema 4D.

Absent and not to be fabricated: client testimonials, commissioned-client list, prices, awards beyond what is stated, years of experience.

## Product Principles

1. The work leads: real projects are visible in the first viewport.
2. Contact is never more than one action away.
3. Honest framing: academic, competition and speculative work are labelled as such.
4. Fast everywhere, including mobile data.
5. Her own hand (illustration) is the differentiator and should be felt.

## Accessibility & Inclusion

No product-specific requirement established beyond sound practice: readable contrast, keyboard-usable modal and gallery, reduced-motion respected, system cursor kept outside project hover.
