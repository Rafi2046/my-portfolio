# Portfolio Design Spec — Ishmak Rahat Rafi

**Date:** 2026-09-24  
**Status:** Implemented (v1)  
**Approach:** Single-page cinematic portfolio (Approach 1)

## Goal

Build a modern, premium, single-page portfolio for **Ishmak Rahat Rafi**, a Flutter developer at Onesttech Software Solutions. The site must feel fluid and interactive (glassmorphism, cyan neon accents, Framer Motion scroll reveals, 3D tilt project cards) while remaining fully responsive and easy to update via a central content module.

## Constraints

- Stack: Next.js 16 (App Router) + Tailwind CSS 4 + Framer Motion
- Dark theme only: deep navy + cyan glowing gradients (no purple primary palette)
- Contact form: complete UI + client validation; async submit stub for future API/Resend
- Main project grid: polished **placeholder** case studies (swap-ready)
- Real identity, role, socials, and a slim “Also shipping” strip for live store apps
- Respect `prefers-reduced-motion`
- Follow Next.js 16 docs under `node_modules/next/dist/docs/` when implementing

## Out of scope

- Real email backend / Resend integration
- Multi-page case-study routes
- CMS, blog, or auth
- Light mode toggle

## Page structure (top → bottom)

1. **Navbar** — sticky glass; brand “Rafi”; anchors: About, Skills, Projects, Contact  
2. **Hero** — name as brand, role line, one supporting sentence, CTAs (Projects / Contact), ambient cyan orbs  
3. **About** — short bio (Flutter, live shipping, CS foundations)  
4. **Skills** — Flutter, Dart, system architecture, compiler design + supporting tools  
5. **Projects** — 3–4 glass cards with 3D tilt + neon glow hover  
6. **Also shipping** — Budget Mint, RUSHD, Quran Audio with real store links  
7. **Contact** — glass form with glowing validation states + submit stub  
8. **Footer** — social links + copyright  

## Visual system

| Token | Value / direction |
|-------|-------------------|
| Base | `#030712` → `#0a1628` |
| Accent | Cyan `#22d3ee` / `#67e8f9` |
| Glass | `bg-white/5`, `border-white/10`, `backdrop-blur-xl` |
| Display font | **Syne** (Google Fonts) for name and section headings |
| Body font | **DM Sans** (Google Fonts) for body and UI |
| Neon hover | Cyan border + soft box-shadow lift on project cards |

Hero stays typography-first: brand name, one headline, one sentence, CTA group, ambient background — no stats strips, floating badges, or card clutter in the first viewport.

## Content

### Identity

- **Full name:** Ishmak Rahat Rafi  
- **Nav brand:** Rafi  
- **Role:** Flutter Developer at Onesttech Software Solutions  
- **GitHub:** https://github.com/Rafi2046  
- **LinkedIn:** https://www.linkedin.com/in/ishmakrafi/  
- **Instagram:** https://instagram.com/ishmak_rafi  
- **Facebook:** https://facebook.com/ishmakrafi (profile slug from GitHub socials)  
- **Email:** `hello@example.com` placeholder in `lib/content.ts` until a real address is provided

### Placeholder projects (main grid)

1. **Flux Architecture Kit** — modular Flutter clean architecture, DI, feature modules  
2. **DartForge Compiler Lab** — toy Dart subset: lexer → AST → bytecode  
3. **Nimbus Sync Engine** — offline-first sync & conflict resolution  
4. **Pulse Design System** — Flutter UI kit + theming tokens  

### Skills clusters

Flutter · Dart · System Architecture · Compiler Design · State Management · Firebase · REST/GraphQL · CI/CD  

### Live apps (“Also shipping”)

| App | Links |
|-----|--------|
| Budget Mint | Play Store + App Store (from GitHub README) |
| RUSHD | Play Store + App Store |
| Quran Audio | Play Store + App Store |

## Component architecture

```
app/
  layout.tsx          # fonts, metadata, dark body shell
  page.tsx            # composes sections (server-friendly)
  globals.css         # CSS variables, glow utilities
components/
  Navbar.tsx
  Hero.tsx
  About.tsx
  Skills.tsx
  Projects.tsx
  ProjectCard.tsx     # glass + tilt + neon
  AlsoShipping.tsx
  Contact.tsx
  Footer.tsx
  MotionSection.tsx   # scroll-reveal wrapper
lib/
  content.ts          # all copy, skills, projects, socials, live apps
  contact.ts          # submitContact() stub + TODO for API/Resend
```

- Client components only where needed (motion, tilt, form, sticky nav interactions).  
- All editable content centralized in `lib/content.ts`.

## Contact form behavior

1. Fields: name, email, message (all required).  
2. Client validation: empty fields + email format.  
3. Invalid: glowing error border (cyan-red tint).  
4. Valid submit: call `await submitContact(payload)`.  
5. Stub: simulate network delay, resolve success; success UI = cyan glow + confirmation message.  
6. Code comment documents wiring to `app/api/contact` or Resend later.

## Motion & interaction

- Section enter: fade + slight translate via Framer Motion (`whileInView`, once).  
- Hero: short entrance stagger on name / role / CTAs.  
- ProjectCard: pointer-based 3D tilt (CSS `transform: perspective` + rotateX/Y); neon glow intensifies on hover.  
- Reduced motion: disable tilt and large translates; keep opacity fades minimal or static.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`, section headings).  
- Visible focus rings on interactive elements.  
- Form labels associated with inputs; `aria-invalid` / error text when invalid.  
- External links: `rel="noopener noreferrer"` where `target="_blank"`.

## Success criteria

- [ ] Single-page portfolio loads on desktop and mobile with no horizontal overflow  
- [ ] Glass navbar + project cards; cyan neon + 3D tilt on project hover  
- [ ] Scroll-reveal animations present and muted under reduced motion  
- [ ] Skills emphasize Flutter, Dart, architecture, compiler design  
- [ ] Contact form shows validation and success states; stub is clearly marked for backend  
- [ ] Real socials work; content editable from `lib/content.ts`  
- [ ] `npm run build` succeeds  

## Dependencies to add

- `framer-motion`

## Non-goals for v1 polish

- Custom WebGL / Three.js backgrounds  
- Cursor trail / particle systems beyond CSS gradient orbs  
- Blog or MDX case studies  
