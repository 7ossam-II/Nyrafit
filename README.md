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

The look is **Onyx night**, built from the logo: the logo's own black, pearl-white text, blush pink for buttons, silver rings and lines, and the logo's sparkle. Headlines use Bodoni Moda, everything else Jost.

The homepage is built from eleven Nayra sections. Their look stays the same from drop to drop. What they show (products, photos, prices, sizes, stock and texts) comes from the Shopify admin. Until you add a photo, its spot shows a dark satin swatch.

| Section | What it shows | Where to fill it |
|---|---|---|
| Nayra ticker | A thin moving band of short messages above the header, on every page, with a pause button | Theme editor → Header: edit or add messages, pick the color and speed |
| Nayra hero | A full-width banner: your video or photo (or live black satin until you add one), the headline, a shop button and a WhatsApp button | Theme editor: upload the banner video and photo, edit the texts. How to make the banner in Higgsfield: [`docs/hero-banner-brief.md`](docs/hero-banner-brief.md) |
| Nayra trust strip | Four short promises: cash on delivery, WhatsApp confirmation, delivery, NAYRA pieces | Theme editor: keep only promises that are true today |
| Nayra product grid | Tall product cards with a badge, price, color dots and quick add; one row to swipe on phones | Theme editor: pick a collection. Tag a product `nouveau` in the admin to show a "Nouveau" badge; sale and sold-out badges show by themselves |
| Nayra collections | A photo tile for each collection, with a wide tile for the modest line | Theme editor: pick a collection per tile; the tile uses the collection's image unless you upload one |
| Nayra tbdila | The outfit stage: outfits turn on a silver ring as you swipe, and the order ticket beside them follows with sizes, price, add to cart and a WhatsApp order | Theme editor: pick the collection of the latest drop |
| Nayra banner | The modest collection on a blush band | Theme editor |
| Nayra story | A brand photo and a few lines about Nayra | Theme editor |
| Nayra steps | How ordering works, in three steps | Theme editor |
| Nayra gallery | Instagram photos | Theme editor: upload the photos, set the account |
| Nayra closing band | The logo, a last line, and the shop and WhatsApp buttons | Theme editor |

- **Logo:** upload [`docs/brand/nayra-logo.png`](docs/brand/nayra-logo.png) in **Theme settings → Logo**, and [`docs/brand/nayra-favicon.png`](docs/brand/nayra-favicon.png) as the **Favicon**. The logo file has a transparent background, so its glow sits on the dark site exactly as on black. Until you upload it, the header shows the shop name.
- **Colors:** page background and text in **Theme settings → Colors**; blush, rose, silver and the two darker blacks in **Theme settings → Nayra style**. **Fonts:** **Theme settings → Typography**. Product, collection and cart pages follow the same colors and fonts.
- Words inside the ticket and the cards, such as "Ajouter au panier": **Online Store → Themes → ⋯ → Edit default theme content**.
- Size buttons read the product option named *Taille* or *Size*. Color dots appear when the product's color option has swatches.
- Motion respects the phone's "reduce motion" setting: the satin, ticker, sparkles and 3D stage then stay still.

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
