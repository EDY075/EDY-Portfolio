# CODEX WEB PROJECT MEMORY
## EDY — GOMES + ANDRÉA TUR
### Reusable Playbook for Future Websites

> Purpose: this file is a persistent engineering/design reference for Codex.
> At the start of future web projects, read this file before proposing architecture,
> motion, responsive behavior, image strategy, performance work, or QA.
>
> Reuse the principles, not the exact layouts.
> Never force these techniques when they do not fit the product.

---

# 1. CORE PRODUCT PRINCIPLE

Build the site around the product/user goal first.

Do not default to:
- SaaS landing-page patterns
- generic developer portfolio templates
- dashboards when a dashboard is not needed
- cyberpunk clichés
- excessive cards
- random animation showcases
- visual effects without UX value

Preferred approach:
- clear hierarchy
- strong visual identity
- restrained motion
- useful navigation
- real screenshots/content
- responsive-first thinking
- performance measured in the real experience, not only synthetic scores

Rule:
**The interface should feel intentional before it feels impressive.**

---

# 2. EDY — GOMES: VISUAL DIRECTION LEARNINGS

Identity:
- premium personal brand
- editorial
- cinematic
- black / charcoal / cream
- photography-led
- giant serif typography
- large negative space
- slow, controlled movement
- real project screenshots

Avoid:
- hacker UI clichés
- neon everywhere
- fake terminals
- excessive glow
- SaaS cards
- oversized blur/glass bars
- crowded grids
- too many simultaneous effects

Hero pattern that worked:
- giant EDY / GOMES lettering
- portrait crossing/interrupting the typography
- filled cream text as dominant layer
- outline as secondary depth layer only
- portrait is the main focal point
- supporting microcopy remains secondary

Important:
- never let outline typography reduce name recognition
- never let title layers unnecessarily obstruct eyes/face
- preserve facial identity over visual drama

---

# 3. EDY — GOMES: NAVIGATION PATTERN

Use two navigation systems with different roles.

## Free navigation
Floating header:
- logo/brand left
- page links right
- no large background bar
- no backdrop blur
- no glass strip
- no box shadow
- no horizontal blocker over content

Header states:
- top: full opacity
- active scrolling: lower opacity
- idle after scroll: partial recovery
- hover/focus: return to full opacity

Reference state used successfully:
- top: logo/menu 100%
- scrolling: logo ~70%, menu ~42%
- idle: logo ~85%, menu ~65%

Important:
- keep the header accessible during the whole page
- do not hide it completely on downward scroll
- do not update React state for every pixel of scroll
- throttle/debounce/RAF where appropriate

## Sequential navigation
Use editorial `NextChapter`:
HOME → ABOUT → WORK → CAPABILITIES → CONTACT → HOME

Case studies:
SHADOWCAT → VERDICT → RECON → SCANURL → HELPDESK → SOC ANALYTICS → ALL WORK

Rules:
- next navigation always opens destination at scroll position 0
- test browser Back behavior
- reuse the existing page-transition system
- do not create duplicate transition architectures
- next chapter should look editorial, not like a SaaS CTA card

---

# 4. SCROLL STRATEGY

## Desktop
Smooth scrolling can be used when it improves the experience.

EDY Portfolio stack:
- Lenis
- GSAP
- ScrollTrigger
- Framer Motion

But responsibilities must be separated.

### Lenis
Used for:
- desktop smooth scroll / inertia

Avoid:
- over-damped feel
- excessive lag after wheel input
- long "floating" tails
- duplicated RAF loops

Important measurement:
60 FPS does not automatically mean scroll feels good.
Measure:
- input → visual response
- tail after wheel stops
- frame pacing
- p95 / p99 frames
- long tasks

Successful EDY tuning:
- `lerp: 0.28`
- `wheelMultiplier: 0.90`
- mobile kept native

Earlier state felt too damped even without dropped frames.
Main lesson:
**perceived responsiveness matters as much as FPS.**

## Mobile
Prefer native scrolling.

Do not force Lenis on:
- touch
- coarse pointer
- mobile

Benefits:
- less JS work
- better native gesture behavior
- lower risk of scroll-jank
- easier compatibility

---

# 5. HOVER + SMOOTH SCROLL INTERACTION

Important EDY lesson:
A technically smooth page can still feel like it is stuttering when:
- Lenis still has momentum
- a project card crosses a stationary cursor
- hover scale activates at the same time

Fix that worked:
- block hover transforms during Lenis momentum
- return media immediately to `scale(1)`
- re-enable hover 150 ms after scroll idle
- max hover scale: `1.012`
- scale only the inner media/image
- never scale the full ProjectCard/container/frame
- freeze title/arrow hover transforms during active scroll
- do not change Lenis just to hide a hover problem

Desktop hover only:
`@media (hover: hover) and (pointer: fine)`

Principle:
**while the page moves, the layout stays calm; when the page stops, microinteractions return.**

---

# 6. MOTION RESPONSIBILITY SPLIT

Use each motion tool for a clear purpose.

## Lenis
- scroll smoothing only

## GSAP + ScrollTrigger
- scroll-linked sequences
- hero transitions
- large editorial scene changes
- controlled parallax where justified

## Framer Motion
- entry reveals
- menu transitions
- page curtains
- small UI transitions
- non-scroll microinteractions

Avoid:
- GSAP and Framer Motion controlling the same `transform` on the same element
- multiple scroll systems updating the same property
- too many simultaneous scrubs
- animations outside the viewport continuing forever

Cleanup:
- `gsap.context()`
- kill local ScrollTriggers
- destroy listeners
- avoid duplicate RAF loops

---

# 7. MOTION STYLE

Preferred:
- opacity
- transform
- small translate
- subtle scale
- mask/clip reveal
- modest stagger
- editorial easing

Avoid:
- large 3D tilt
- constant parallax
- intense cursor effects
- WebGL unless it is clearly justified
- particles
- heavy shaders
- animated blur
- long sticky scroll traps

Good motion should feel:
- slow enough to be premium
- fast enough to remain responsive
- visually calm during scrolling

Rule:
**motion serves identity; identity does not exist to justify motion.**

---

# 8. IMAGE STRATEGY

Use real images whenever they communicate the product better.

For portfolio projects:
- prefer actual product screenshots
- do not invent fake dashboards
- do not use abstract art when a real UI exists
- preserve screenshot legibility

Use:
- AVIF
- WebP
- responsive source sizes
- correct `sizes`
- lazy loading below the fold
- hero priority only where justified

EDY portrait optimization result:
- original PNG about 1.6 MB
- optimized desktop AVIF around 38.9–49 KB depending on pass
- desktop/high-DPI and mobile served responsive variants

Important:
Do not blindly upscale faces.
If upscaling invents:
- skin pores
- beard strands
- artificial sharpening
then reject it.

Natural face > fake 2K detail.

Use 2560×1440 validation for high-DPI layout quality.

---

# 9. PORTRAIT / PEOPLE IMAGES

When a portrait is central to identity:
- preserve facial recognition over cinematic styling
- keep eyes, nose, jaw, beard, expression consistent
- avoid over-sharpening skin
- avoid AI-looking beard strands
- do not smooth skin into plastic
- do not generate a new face just because it looks "better"

Use CSS/layout before regenerating:
- object-position
- crop
- mask
- gradient overlay
- contrast
- positioning

For different breakpoints, it is acceptable to use:
- horizontal portrait on desktop
- vertical portrait on mobile

if both are faithful and visually validated.

---

# 10. PERFORMANCE WORKFLOW

Never optimize blindly.

Use this loop:
1. measure baseline
2. isolate one likely bottleneck
3. change one class of behavior
4. measure again
5. compare before/after
6. keep only improvements with no visible regression

Track:
- Lighthouse Performance
- FCP
- LCP
- CLS
- TBT
- Speed Index
- frame time
- p95/p99 frame time
- long tasks
- dropped frames
- JS execution
- image transfer size
- decode/render delay where relevant

Typical targets:
- LCP ≤ 2.5 s when practical
- CLS ≤ 0.1
- INP ≤ 200 ms when available
- TBT ≤ 200 ms preferred
- frame target ~16.7 ms at 60 Hz

But:
**do not destroy visual quality to chase synthetic benchmark points.**

Priority:
1. perceived smoothness
2. stability
3. responsiveness
4. Web Vitals
5. benchmark score

---

# 11. LCP LESSONS

If the LCP image is already small, do not keep compressing it blindly.

Investigate:
- image discovery timing
- preload / priority
- responsive source selection
- decode time
- render delay
- opacity/mask animation delaying paint
- hydration
- JS main-thread work
- font blocking
- heavy initial GSAP/Framer setup

Important:
A 49 KB image can still have slow LCP if the problem is render delay.

Critical content should:
- exist in initial HTML when possible
- not wait for `useEffect`
- not remain artificially invisible too long
- not depend on below-the-fold animation code

---

# 12. HEADER PERFORMANCE

Avoid large fixed `backdrop-filter: blur()` strips over moving content.

They can:
- obscure content visually
- increase composition/paint cost
- create an unnecessary glass/SaaS appearance

Preferred:
- transparent fixed header
- text-only floating navigation
- opacity/transforms only

---

# 13. ANDRÉA TUR: KEY PERFORMANCE LEARNINGS

Project style:
- mobile-first travel website
- Hero video
- bottom mobile navigation
- public site + Admin
- WhatsApp contextual flow

## Scroll
Desktop:
- smooth scroll allowed

Final tuning:
- `lerp: 0.20`
- `wheelMultiplier: 1`
- `smoothWheel: true`
- RAF active only during movement

Mobile:
- native scroll only
- Lenis not loaded for touch/mobile/coarse pointer
- no intercepted `touchmove`

## Hero video
Keep:
- `muted`
- `playsInline`
- `loop`
- poster
- `object-fit: cover`

Mobile-specific optimized video:
- H.264
- 720×720
- ~2.89 MB → ~663 KB
- about 77% reduction

Lesson:
Do not send desktop video payloads to mobile when a smaller appropriate asset works.

Fade video on mobile with:
- opacity
- transform

Avoid:
- long scrub timelines
- animated filters
- heavy blur

## Bottom nav
The active indicator should:
- slide, not jump
- use `translate3d`
- avoid continuously animating width/left when transform can do the job
- respect safe area
- keep touch targets >= 44 px

Successful timing:
- 320 ms
- `cubic-bezier(.22, 1, .36, 1)`

---

# 14. RESPONSIVE DESIGN PRINCIPLE

Do not "shrink desktop into mobile."

Recompose.

Desktop can use:
- wide typography
- horizontal portrait
- large negative space
- complex editorial layouts

Mobile should:
- preserve hierarchy
- prioritize one focal element
- reduce parallax
- use native scroll
- keep text fully readable
- use appropriate image source sizes
- simplify, not degrade

Always validate:
- 390×844
- 430×932
- 1366×768
- 1440×900
- 1920×1080
- 2560×1440 when high-DPI matters

---

# 15. CONTENT & PRODUCT CREDIBILITY

Use:
- real screenshots
- real project names
- real features
- real links
- real results

Do not invent:
- testimonials
- metrics
- clients
- deployments
- credentials
- commercial data

For case studies:
- Problem
- Approach
- System / Solution
- Key Features
- Stack
- Outcomes / validated highlights
- Real screenshots

---

# 16. ACCESSIBILITY BASELINE

Always include:
- semantic HTML
- visible focus
- keyboard navigation
- sufficient contrast
- alt text
- sound never mandatory
- reduced-motion support
- touch targets >= 44 px where appropriate
- safe-area support on mobile

For `prefers-reduced-motion`:
- disable heavy parallax
- reduce inertia
- keep content accessible
- preserve simple fades if appropriate

---

# 17. SECURITY / DEPENDENCY PROCESS

Never run:
`npm audit fix --force`

without review.

Preferred process:
1. inspect advisory
2. identify direct vs transitive
3. identify fixed version
4. prefer patch/minor
5. avoid major upgrades without compatibility review
6. run full regression after dependency changes

Validation set:
- lint
- typecheck
- build
- `npm audit --omit=dev`
- `git diff --check`
- smoke test routes
- visual QA
- console/hydration check

Production audit goal:
- 0 known vulnerabilities when safely achievable

---

# 18. QA PROCESS

Do not treat a successful build as final QA.

Validate:
- all routes
- browser Back
- scroll position
- mobile menu
- desktop menu
- Next Chapter
- Next Project
- hover during scroll
- responsive images
- overflow
- hydration
- console warnings
- reduced-motion
- long-page scroll
- slow and fast wheel
- trackpad
- touch
- repeated navigation to detect leaks

For important interaction bugs:
record a real video.
A video can reveal perceived jank that metrics miss.

---

# 19. CODING ARCHITECTURE PREFERENCES

Prefer:
- Next.js App Router
- TypeScript
- Tailwind CSS
- reusable components
- centralized content/data
- `next/image`
- small, clear motion components
- client boundaries only where needed

Useful structure:

components/
  motion/
    SmoothScrollProvider
    PageTransition
    Reveal
    TextReveal
    ImageReveal
  NextChapter
  ProjectCard
  ProjectVisual

data/
  site
  projects
  about
  contact

lib/
  motion
  gsap

Keep content easy to edit without touching layout logic.

---

# 20. WHAT NOT TO ADD BY DEFAULT

Do NOT automatically add:
- background music
- custom cursor
- WebGL
- particles
- shaders
- chat widget
- fake terminal
- animated skill meters
- badges everywhere
- testimonial carousels
- unnecessary analytics
- complex loaders
- automatic autoplay audio

Add only when the product clearly benefits.

EDY Portfolio final decision:
**No background music for now.**
Keep the current experience silent unless the user explicitly reopens that decision.

---

# 21. FUTURE SITE CHECKLIST

Before coding:
- What problem does this website solve?
- Who is the primary user?
- Mobile or desktop priority?
- What must remain fast?
- What needs real data/assets?
- What should NOT be animated?
- Is motion adding meaning?

During coding:
- build reusable shell first
- responsive behavior early
- real assets early
- measure before complex motion
- separate scroll/motion responsibilities

Before launch:
- visual review
- physical-device test when possible
- responsive matrix
- lint
- typecheck
- build
- audit
- route smoke tests
- performance profiling
- Back/history test
- no overflow
- no hydration errors
- no accidental deploy

---

# 22. FINAL REUSABLE RULES

1. **Native mobile scroll is usually the safest default.**
2. **Smooth desktop scroll must feel responsive, not floaty.**
3. **Do not animate hover and scroll momentum against each other.**
4. **Scale media, not whole cards.**
5. **Real screenshots beat decorative abstractions.**
6. **Blurred fixed navbars often hurt both UX and performance.**
7. **Responsive images matter more than simply creating "2K" files.**
8. **Perceived jank can exist even at acceptable FPS.**
9. **Measure p95/p99, not only average frame time.**
10. **Keep motion responsibilities separated between tools.**
11. **Do not optimize a 49 KB image when the bottleneck is render delay.**
12. **Do not sacrifice facial naturalness for artificial sharpness.**
13. **Use sequential navigation on long editorial sites.**
14. **Open destination pages at the top consistently.**
15. **Back-button behavior is part of UX QA.**
16. **Performance optimization is iterative, not a one-shot fix.**
17. **Preserve product identity; avoid adding technology for its own sake.**
18. **If the site already feels complete, stop adding features.**

---

# 23. CURRENT EDY — GOMES STATE TO PRESERVE

At the end of the current work session:

- premium/editorial/cinematic identity approved
- black/charcoal/cream visual system
- current approved portrait(s) preserved
- desktop horizontal portrait
- mobile vertical portrait
- real screenshots for all six main projects
- floating header with no blur/glass bar
- Next Chapter on all five main pages
- Next Project through all six case studies
- destination navigation opens at scroll 0
- browser Back validated
- LinkedIn clickable desktop/mobile
- desktop Lenis retained
- mobile native scroll
- About excessive damping corrected
- project hover blocked during Lenis momentum
- hover re-enabled 150 ms after idle
- project media scale max 1.012
- title/arrow hover motion frozen while scrolling
- no background music for now
- production audit: 0 vulnerabilities in validated state
- no deploy from the latest refinement passes unless explicitly requested

When reopening this project:
**do not redesign or add new effects automatically.**
First inspect the current state and continue only from an explicit new goal.

---

End of Codex Web Project Memory.
