# Nyrafit theme: rules for agents

Shopify theme for Nyrafit, a women's gym wear brand. The owner is not a developer: explain choices in plain language, and ask before anything that touches the live store.

## How this repo works

- The repo root **is** the theme, based on Horizon 4.3.0 (upstream commit `dfad90d`). Shopify's GitHub integration syncs `main` to a theme in the store.
- Only `assets/ blocks/ config/ layout/ locales/ sections/ snippets/ templates/` reach Shopify. Shopify ignores everything else.
- Keep the theme buildless: no bundler, no compile step, no root `package.json`. Commit files exactly as Shopify should serve them.
- The theme editor commits the owner's changes to `main` as the `shopify` bot. Pull before editing, and merge (never overwrite) owner content in `config/settings_data.json`, `templates/*.json` and `sections/*.json`.
- Customize through Horizon's own patterns (sections, theme blocks in `blocks/`, settings) rather than rewriting core snippets, so upstream fixes stay mergeable.

## Mobile first

- Design and check every page at 390×844 before desktop.
- Keep primary actions within thumb reach, make tap targets at least 44×44px, and never rely on hover.
- Product page essentials: swipeable gallery, size buttons with a sold-out state, size guide, model size and fit notes, sticky add-to-cart.
- Speed: the first large image loads eagerly, everything below the fold lazy-loads, and image dimensions are set to prevent layout shift.

## Validate before committing

- Liquid: `node .claude/skills/shopify/scripts/validate.mjs --api liquid --filename <name.liquid> --filetype <folder> --context theme --code "$(cat <file>)"`. If `.claude/skills/shopify/node_modules` is missing, run `npm install --prefix .claude/skills/shopify` first.
- Design: `.claude/skills/impeccable/scripts/impeccable detect <files>` (Liquid is registered in `.impeccable/config.json`), and `... detect --viewport 390x844 <preview-url>` against the store preview.
- The Shopify toolkit's usage reporting stays off (`OPT_OUT_INSTRUMENTATION` in `.claude/settings.json`) unless the owner turns it on.

## Skill order

While building, only one design rulebook is active: impeccable plus `DESIGN.md`.

1. **Define** (agent-skills): `interview-me`, then `/spec` and `/constraints`. The owner approves the spec.
2. **Brief** (impeccable): `/impeccable init` writes `PRODUCT.md`.
3. **Direction**: three throwaway mobile product-page mockups, one per source: Taste Skill's `design-taste-frontend` (installed for this step only), one awesome-design-skills style (read, not installed), and `/impeccable shape` + `craft`. The owner picks or mixes, then `/impeccable document` saves the result as `DESIGN.md`. Remove Taste Skill afterwards.
4. **Plan** (agent-skills): `/plan`, in this order: product page, collection, cart drawer, home, then size guide, shipping & returns, about.
5. **Build**: `/impeccable shape` per page; `21st search` for component ideas (they're React, so rebuild them in Liquid; needs `TWENTYFIRST_TOKEN`); the `shopify` skill to validate; `frontend-ui-engineering` for accessibility. The owner reviews each page on their phone.
6. **Polish** (impeccable): `critique`, `adapt`, `typeset`/`colorize`/`animate` only where needed, `clarify`, `polish`. Then one second-opinion pass with Taste Skill's `redesign-existing-projects`; apply only what fits `DESIGN.md`.
7. **Check**: `/impeccable audit`, `impeccable detect --viewport 390x844 <preview-url>`, `/webperf`, `/agent-review` (agent-skills' review, renamed because `/review` is built in).
8. **Launch** (agent-skills): `/ship`, plus a test order on a real iPhone and Android phone.

## Never

- Copy another brand's site. References are for patterns only, never their images, text or code.
- Publish the theme, change products, or run store operations without the owner's go-ahead.
- Make the theme available outside this store; Horizon's license forbids it.
