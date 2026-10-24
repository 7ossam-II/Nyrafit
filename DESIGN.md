---
name: Nayra
description: Onyx night. The Nayra logo turned into a night boutique for women's gym wear.
colors:
  onyx-ground: "#121112"
  pearl: "#f6f1f3"
  deep-onyx: "#0b0a0b"
  raised-onyx: "#1b191b"
  smoke: "#2b282b"
  ash: "#6e696c"
  silver: "#a2a0a1"
  blush: "#e3a3b7"
  blush-ink: "#121112"
  rose: "#e481a4"
  soft-pearl: "#b2aeb0"
  hairline: "#323031"
typography:
  display:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "clamp(2.75rem, 1.65rem + 4.6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.8vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "Jost, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Jost, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: "Jost, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0.14em"
  label-small:
    fontFamily: "Jost, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.16em"
rounded:
  frame: "2px"
  panel: "4px"
  popover: "14px"
  pill: "999px"
  ring: "50%"
spacing:
  gutter: "clamp(1.25rem, 0.75rem + 2.4vw, 2.5rem)"
  section: "clamp(4rem, 2.8rem + 5vw, 7.5rem)"
  grid-gap: "0.875rem"
  stack: "1rem"
  max-width: "84rem"
components:
  button-primary:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.blush-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.75rem"
    height: "3.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.pearl}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.75rem"
    height: "3.25rem"
  button-on-blush:
    backgroundColor: "{colors.blush-ink}"
    textColor: "{colors.blush}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.75rem"
    height: "3.25rem"
  ring-button:
    backgroundColor: "{colors.onyx-ground}"
    textColor: "{colors.pearl}"
    rounded: "{rounded.ring}"
    size: "2.75rem"
  size-button:
    backgroundColor: "transparent"
    textColor: "{colors.pearl}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
    width: "2.75rem"
  size-button-selected:
    backgroundColor: "{colors.pearl}"
    textColor: "{colors.onyx-ground}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
  badge-sale:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.blush-ink}"
    typography: "{typography.label-small}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  badge-new:
    backgroundColor: "{colors.pearl}"
    textColor: "{colors.onyx-ground}"
    typography: "{typography.label-small}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  order-ticket:
    backgroundColor: "{colors.raised-onyx}"
    textColor: "{colors.pearl}"
    rounded: "{rounded.panel}"
    padding: "1.25rem 1.25rem 1.5rem"
  photo-frame:
    backgroundColor: "{colors.raised-onyx}"
    rounded: "{rounded.frame}"
---

# Design System: Nayra

## Overview

**Creative North Star: "The Night Boutique"**

The site is the Nayra logo turned into a shop after dark. The ground is the logo's own black. Text is a warm pearl. The logo's silver ring and blush N come back as thin silver circles, blush buttons and a four-point sparkle. Black satin under blush light fills every empty frame until the owner adds photos. It is built for a phone at night, in dark mode, opened from Instagram or TikTok.

The page is calm and tall. Big Bodoni headlines, generous space between sections, square-cut photo frames at 4:5, and small tracked capital labels. Depth comes from layers of black (ground, raised, deep) and soft blush light, never from shadows. Motion is slow and quiet: the satin ripples, the ticker drifts, sparkles twinkle, outfits turn on a ring. All of it stops when the phone asks for reduced motion.

This world replaces an earlier light pink-and-yellow look. Nothing from that look remains. It rejects the cream editorial store (cream, burgundy, Playfair) and the neon gym (black with an acid accent and condensed capitals).

All colors and fonts are owner settings. Page background and text come from Horizon's color palette, fonts from Typography, and the accents from the "Nayra style" group in Theme settings. Every product, price, photo and text comes from the Shopify admin. Customize through Horizon's own settings and the Nayra sections. Never rewrite Horizon's core snippets.

**Key Characteristics:**
- Logo black ground (#121112) with pearl text, in dark color-scheme.
- Blush pill buttons: the only action color.
- Thin silver chrome rings around icons, step numbers and round buttons.
- Square-cut 4:5 photo frames with a 2px radius.
- Bodoni Moda headlines, Jost for everything else.
- No shadows, no glass. Depth from stacked blacks and blush light.
- Dark satin swatches as placeholders until real photos arrive.

## Colors

Three blacks, one pearl, one silver, and two pinks with separate jobs.

### Primary
- **Blush** (#e3a3b7): every main action. Primary buttons, the selected outline on focus, text selection, the browser accent and caret color. It also tints the satin light and the ticker's sparkle separators. Text on blush is always Blush Ink.
- **Blush Ink** (#121112): text and icons on blush. Also the fill of the onyx button that sits on a blush band.

### Secondary
- **Rose** (#e481a4): sale only. Sale prices, the sale badge, and the strike line on a sold-out size. Never a button.

### Neutral
- **Onyx Ground** (#121112): the page background, the logo's own black.
- **Raised Onyx** (#1b191b): surfaces that sit up one step. The order ticket, the ticker band, a raised feature band, empty photo frames.
- **Deep Onyx** (#0b0a0b): the darkest band. Hero, outfit stage, closing band, the fill inside rings on those bands. Same value as palette color 1.
- **Pearl** (#f6f1f3): main text and headlines. Also the "Nouveau" badge and the selected size.
- **Soft Pearl** (#b2aeb0): secondary text, ledes, notes, the struck-through old price. It is Pearl mixed 70% into the ground, so it follows the palette.
- **Hairline** (#323031): 1px dividers and ticket borders. It is Pearl at 14% over the ground.
- **Silver** (#a2a0a1): chrome rings, ghost button outlines, size button outlines, link underlines, dashed step lines, scrollbar.
- **Smoke** (#2b282b): Horizon's sold-out badge background (palette color 2).
- **Ash** (#6e696c): Horizon input, variant and drawer borders (palette color 3).

### Named Rules
**The One Action Color Rule.** Blush is the only color that means "tap here to buy or go". Secondary actions are silver-outlined ghost pills. If a new page needs a second action color, it is wrong.

**The Rose Is Sale Rule.** Rose appears only where money is saved or stock is gone: sale price, sale badge, unavailable size. It never decorates.

## Typography

**Display Font:** Bodoni Moda, weight 500 (with serif fallback)
**Body Font:** Jost, weight 400; 500 for labels and subheadings (with sans-serif fallback)

**Character:** A high-contrast fashion serif for the voice, a clean geometric sans for everything she has to read or tap.

### Hierarchy
- **Display** (500, clamp 2.75rem to 6rem, line-height 0.98): the hero headline only. 44px on a 390px phone, about two lines, max 11ch.
- **Headline** (500, clamp 2.25rem to 4rem, line-height 1.04, -0.012em): section titles. The closing band goes slightly larger (up to 4.25rem). Balanced wrapping.
- **Title** (500, 1.375rem, line-height 1.15): step titles. Collection tile names use the display face at clamp 1.375rem to 2.25rem. The ticket total uses it at 1.75rem.
- **Body** (400, 1rem, line-height 1.6): ledes run 1rem to 1.125rem at max 42ch in Soft Pearl. Story text runs 1.0625rem, line-height 1.7, max 46ch.
- **Body small** (400, 0.9375rem): product names on cards, prices, ticket rows.
- **Label** (500, 0.8125rem, 0.14em, uppercase): buttons and text links.
- **Label small** (500, 0.6875rem, 0.14em to 0.18em, uppercase): badges, ticker items, ticket row names.

Prices and numbers use tabular lining figures.

### Named Rules
**The Hero Italic Rule.** Blush italic appears only in the hero headline, on the Darija word, where the twinkling sparkle sits. Other headlines stay upright pearl, even though their fields accept italics.

**The Bodoni For Voice Rule.** Bodoni is for headlines, tile names, step numbers and the order total. Buttons, labels, prices and body text are always Jost.

## Layout

Mobile first, checked at 390x844 before desktop. Content sits in a centered column, max 84rem wide, with a side gutter that grows from 1.25rem to 2.5rem. Sections are separated by a large gap that grows from 4rem to 7.5rem. Bands (outfit stage, feature banner, closing band) are full-bleed and pad that same gap inside; two bands in a row touch without a double gap.

Layouts widen at Horizon's breakpoints, 750px and 990px. Product grids go 2, then 3, then 4 columns. On phones, a product grid can become a sideways swipe rail with cards at 70% width and snap points. The Instagram strip swipes at 42% per photo. Collection tiles go 2 columns on phones, 3 on desktop with one wide tile.

The first screen on a phone: a 44px ticker, Horizon's header, then a full-bleed hero filling the rest (at least 33rem). The headline sits bottom-left. Both buttons span the full width and stay inside the first screen, in thumb reach.

**The 44px Rule.** Every tap target is at least 44x44px: buttons are 52px tall, ring buttons, size buttons, chips, links and the ticker pause button are 44px. Hover is a bonus only, behind a hover-capable media query.

## Elevation & Depth

The theme's Nayra layer uses no box shadows, no glass and no blur. Depth comes from three stacked blacks (Deep under Ground under Raised), 1px hairlines, and soft radial pools of blush light (under the outfit floor, behind the feature photo, above the closing seal). Photos sit under a dark scrim where text overlays them.

**The No Shadow Rule.** Nothing casts a shadow. To lift a surface, move it one step lighter (Raised Onyx) and give it a hairline. Shadows in the review screenshots come from the preview harness, not the theme.

## Shapes

Two shapes, used strictly. Things you tap are round: pill buttons, pill badges, pill size buttons, circle ring buttons. Things you look at are square-cut: photo frames have a 2px radius and a 4:5 shape (wide collection tiles go 16:10 on phones). The order ticket is a 4px panel. Horizon's popovers keep 14px.

**The Logo Ring Rule.** Icons, step numbers and round buttons sit inside a thin 1px silver chrome ring. The ring is a conic silver gradient drawn on a ::before layer and masked to a hairline, so the button's own fill stays clean. The outfit floor uses the same ring, flattened into an ellipse.

**The Sparkle Rule.** The four-point sparkle is the logo's mark. It appears as ticker separators, on the "Nouveau" badge, as a glint on the feature photo and the selected outfit, and on the closing logo. It is a filled SVG, never a text glyph.

## Components

### Buttons
Soft, tall pills with tracked capitals.
- **Shape:** full pill (999px), 52px tall, 0.75rem by 1.75rem padding.
- **Primary:** Blush fill, Blush Ink text, Label type in capitals.
- **Ghost:** transparent with a silver outline at 75%, pearl text. Used for the WhatsApp action under the primary.
- **On blush:** on a blush band the button flips to a Blush Ink fill with blush text.
- **Hover / Focus:** on hover-capable screens, blush lightens slightly toward pearl and ghost gains a pearl outline and faint fill. Pressing scales to 0.98. Focus is a 2px blush outline, 3px offset (Blush Ink on blush bands).
- **Disabled:** 45% opacity.
- **On phones:** hero and closing buttons stretch full width.

### Ring Buttons
- 44px circle with the silver chrome ring and a fill that matches its band. Icons are 20px thin-stroke SVGs (1.6 stroke). Hover turns the icon blush; pressing scales to 0.94. Used for quick add, prev/next on the outfit stage and the hero video pause.

### Chips and Size Buttons
- **Sizes:** 44px pills with a silver outline. Selected is a pearl fill with onyx text. Sold out is a dashed outline, soft text and a rose strike line, and it stays selectable to show it is gone.
- **Chips:** 44px pills, silver outline, capitals. The current page fills pearl.

### Badges
- Small pills in Label small type. Pearl with a rose sparkle for "Nouveau". Rose for sale. Smoke outline for sold out.

### Cards / Containers
- **Product card:** a 4:5 square-cut frame, the name under it (two lines max, underline on hover), price, up to four color dots ringed in silver, and a ring quick-add button. Badge top-left.
- **Collection tile:** square-cut frame with a dark fade at the bottom, the Bodoni name and a ring arrow on top of it.
- **Order ticket:** Raised Onyx panel, 4px radius, hairline border, hairline-divided rows, a Bodoni total, full-width blush and ghost buttons.
- **Shadow Strategy:** none. See Elevation & Depth.

### Inputs / Fields
- Horizon's own inputs, with a 1px Ash border and 4px radius. The caret and native controls are blush.

### Navigation
- Horizon's header: menu left, centered 44px monogram, cart right. Text links in Nayra sections are tracked capitals with a silver underline that turns blush on hover.

### Ticker
- A 44px band above the header on every page, Raised Onyx by default (deep or blush as options). Small tracked capitals separated by blush sparkles, faded at both edges. It has a 44px pause button, pauses off screen and on hover, and stops for reduced motion. It is the only marquee.

### Hero
- Full-bleed. Shows the owner's video or photo, or live black satin (a small WebGL shader with a CSS satin fallback) until one is uploaded. Video plays only when visible, motion is allowed and data saving is off; a ring pause button sits top right.

### Outfit Stage
- The signature. On a Deep Onyx band, outfits stand on an elliptical silver ring floor under a pool of blush light. Swiping snaps an outfit to the middle; neighbours turn away in 3D and fade. A silver hairline traces itself around the selected outfit and a sparkle appears. The order ticket follows the selected outfit. Reduced motion keeps the rail flat.

### Placeholders
- Until the owner uploads photos, every frame shows a dark satin swatch (five tones in rotation: satin, rose, smoke, dusk, pearl) with a thin hanger icon. In the theme editor it also says where the photo goes.

### Motion
- One easing curve for everything (a soft ease-out). Taps take 160 to 240ms, image zoom 900ms. The ticker loops in 40s, sparkles twinkle every 5.2s.
- **The Still Night Rule.** Reduced motion stops the satin, the ticker, the sparkles and the 3D turn, and the hero video does not play. Everything stays put and fully visible.

## Do's and Don'ts

### Do:
- **Do** take every color and font from Theme settings (palette, Typography, "Nayra style"), never hard-coded hex in a section.
- **Do** use Blush for the one main action per area and a silver ghost pill for the second.
- **Do** keep photos in 4:5 square-cut frames with the 2px radius, and show the satin placeholder when a photo is missing.
- **Do** put round icons and step numbers inside the 1px silver chrome ring.
- **Do** make every tap target at least 44x44px and check each page at 390x844 first.
- **Do** load the first large image eagerly and lazy-load the rest, with dimensions set.
- **Do** build new pages from Horizon's settings, sections and blocks plus Nayra sections, not by rewriting core snippets.
- **Do** stop all motion under reduced motion, and give any moving element a pause.

### Don't:
- **Don't** add box shadows, hard offset shadows, glass or blur. Lift with Raised Onyx and a hairline.
- **Don't** use Rose for anything but sale prices, the sale badge and unavailable sizes.
- **Don't** use blush italic outside the hero headline's Darija word.
- **Don't** add a second marquee. The ticker is the only one.
- **Don't** round photo frames into soft cards, or square off buttons.
- **Don't** put small tracked labels above headlines as kickers or eyebrows.
- **Don't** bring back the old light pink-and-yellow look, cream and burgundy, or neon accents with condensed capitals.
- **Don't** write product names, prices, reviews or photos into the theme. They come from the Shopify admin.
