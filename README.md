# Nyrafit

The Shopify theme for **Nyrafit**, women's gym wear, designed mobile-first.

This repository *is* the store's theme. Shopify reads the eight theme folders at the root, and every push to `main` updates the connected theme in the Shopify admin.

## Connect it to Shopify

1. **Make this repository private** (recommended): GitHub → Settings → General → Danger Zone → Change visibility. Horizon's license doesn't allow making a theme built from it publicly available, and the store's code and plans shouldn't be public anyway.
2. In the Shopify admin, go to **Online Store → Themes**.
3. In **Theme library**, click **Add theme → Connect from GitHub**.
4. When asked, install the Shopify GitHub app and give it access to this repository.
5. Pick **7ossam-II → Nyrafit → main**.

The theme then appears in the Theme library, unpublished. Open its menu and choose **Preview** to check it on your phone. Don't publish it until launch.

### How changes flow

- Code pushed to `main` updates the connected theme automatically.
- Edits saved in the theme editor (text, images, sections, settings) are committed back to `main` by the `shopify` bot, so always pull before editing code.
- After launch, keep `main` on the live theme and do new work on a `dev` branch connected to a second, unpublished theme.

## What's in here

| Path | What it is | Synced to Shopify? |
|---|---|---|
| `assets/` `blocks/` `config/` `layout/` `locales/` `sections/` `snippets/` `templates/` | The theme | Yes |
| `.claude/` | AI skills, agents and commands used to build the theme | No |
| `.impeccable/` | Design-checker settings | No |
| `README.md`, `CLAUDE.md`, `LICENSE.md` | Docs, agent rules, theme license | No |

## Homepage sections

The homepage is built from seven Nayra sections. Their look stays the same from drop to drop. What they show (products, photos, prices, sizes, stock and texts) comes from the Shopify admin. Until you add something, Shopify shows its placeholder illustrations.

| Section | What it shows | Where to fill it |
|---|---|---|
| Nayra hero | Headline, arch photo, two stickers, shop and WhatsApp buttons | Theme editor: upload the photo, edit the texts |
| Nayra categories | Category buttons | Theme editor: pick a collection for each button |
| Nayra tbdila | Outfits to swipe through. The order ticket beside them follows with sizes, price, add to cart and a WhatsApp order | Theme editor: pick the collection of the latest drop |
| Nayra product grid | Product cards with stickers, price, color dots and quick add | Theme editor: pick a collection |
| Nayra steps | How ordering works | Theme editor |
| Nayra banner | An announcement on a colored background, such as the modest collection | Theme editor |
| Nayra gallery | Instagram photos | Theme editor: upload the photos, set the account |

- Accent colors and the ticket font: **Theme settings → Nayra style**.
- Words inside the ticket and the cards, such as "Ajouter au panier": **Online Store → Themes → ⋯ → Edit default theme content**.
- Size buttons read the product option named *Taille* or *Size*. Color dots appear when the product's color option has swatches.

## Base theme

Built on [Horizon](https://github.com/Shopify/horizon) 4.3.0 by Shopify (upstream commit `dfad90d`). Its license (`LICENSE.md`) allows using it for this store only: a theme derived from it can't be sold, listed or redistributed.

## Skills included

| Skill | Source | Used for |
|---|---|---|
| impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Lead design skill: brief, design system, critique, audit, polish |
| agent-skills | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Spec, plan, mobile speed, review, launch checklist |
| shopify | [Shopify/Shopify-AI-Toolkit](https://github.com/Shopify/Shopify-AI-Toolkit) | Liquid knowledge and code validation |

Taste Skill and one awesome-design-skills style are added only for the design-direction step. 21st.dev is used through its CLI and needs a `TWENTYFIRST_TOKEN`. The Shopify toolkit's usage reporting is turned off in `.claude/settings.json`. Versions and licenses are listed in [`.claude/THIRD_PARTY_NOTICES.md`](.claude/THIRD_PARTY_NOTICES.md).

## Workflow

The build order and the rules AI agents follow are in [`CLAUDE.md`](CLAUDE.md).
