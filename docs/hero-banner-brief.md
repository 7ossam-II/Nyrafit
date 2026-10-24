# Hero banner brief (Higgsfield)

The homepage hero is a full-width banner. It shows a looping video, with a photo of the same scene shown first and whenever visitors turn motion off. The headline, text and buttons are live text drawn by the theme on top, so the banner itself must contain **no text**.

## What to make

| File | Format | Size | Where it goes in Shopify |
|---|---|---|---|
| Phone video | Portrait 9:16, 6 to 10 seconds, MP4, no sound | 1080 × 1920 | Nayra hero → Video for phones |
| Desktop video | Landscape 16:9, same scene and length | 1920 × 1080 | Nayra hero → Video |
| Phone photo | First frame of the phone video, JPG | 1080 × 1920 | Nayra hero → Photo for phones |
| Desktop photo | First frame of the desktop video, JPG | 1920 × 1080 | Nayra hero → Photo |

Using the first frame as the photo means there is no jump when the video starts.

## Keep these areas calm

The theme draws on top of the banner, so keep these parts of the frame simple and evenly lit, with no faces or busy detail:

- **Phone (9:16):** the bottom 45% (headline, text and two buttons, full width) and the top-right corner (the pause button). Put the model's face and upper body in the middle third.
- **Desktop (16:9):** the left 45% of the frame, bottom two thirds (headline and buttons), and the top-right corner. Put the model in the right half.

The theme also darkens the bottom of the banner behind the text ("Darken behind the text" in the hero settings), so a calm, dark area is enough.

## Keep the clothes truthful

Customers will expect exactly what they see. Don't let the AI invent the outfit:

1. Photograph a real Nayra piece, either on a person or laid flat, and give it to Higgsfield as the reference or start image.
2. Let the AI create only the scene, the light and the camera move around it.
3. Check every frame for changed seams, logos, colors or hands before using it.

## Workflow in Higgsfield

1. Make the still first with an image model, in 9:16 and in 16:9.
2. Animate each still with an image-to-video model, using the motion prompt below.
3. Download the MP4s and take the first frame of each as the JPG photo.
4. Before using the files in ads or on the store, check that your Higgsfield plan allows commercial use.

## Look

The site is **Onyx night**, taken from the logo, so the banner should feel like the logo come to life.

- **Palette:** onyx black `#121112` (the logo's own black), blush pink `#e3a3b7`, rose `#e481a4`, silver, pearl white `#f6f1f3`.
- **Light:** low-key night light. A soft blush key light on the model and a cool silver rim light that outlines her against the dark; deep, clean shadows.
- **Mood:** confident and glamorous, still playful like the Instagram account. Real skin texture and natural bodies, respectful poses.
- **Setting cues:** black satin, polished dark plaster, a ring of soft light like the logo's ring. Use them as setting only; no flags, symbols or other brands.

## Concept 1: Night studio (recommended)

The closest match to the site, and the easiest to keep product-accurate.

**Still (9:16; for 16:9 swap the first sentence):**

```
Vertical 9:16 sportswear campaign photo. A Moroccan woman in her twenties wearing a fitted blush pink sports bra and high-waisted leggings, standing in a confident athletic pose and tightening her ponytail, in a dark studio. Behind her, heavy black satin drapes with soft pink highlights in the folds, and a large thin ring of soft pearl light glowing behind her shoulders. A soft blush key light from the upper right and a cool silver rim light outline her figure; a glossy black floor shows a faint reflection. Her face and upper body sit in the middle third of the frame; the bottom 45% of the frame is calm, dark floor. Real skin texture, natural proportions, sharp fabric detail, 50mm lens, editorial look, subtle film grain. No text, no logos, no watermark.
```

For desktop, start with: `Horizontal 16:9 sportswear campaign photo.` and replace the framing sentence with: `She stands in the right half of the frame; the left half is calm dark satin.`

**Motion (image-to-video, 8 seconds):**

```
Slow, smooth camera push-in toward her over 8 seconds. She breathes, shifts her weight and finishes tightening her ponytail, then holds a confident look just past the camera. The black satin behind her ripples slowly and its pink highlights travel along the folds. Lighting stays constant. No cuts, no zoom jumps, no camera shake. The last frame stays close to the first so the clip can loop.
```

## Concept 2: Riad at night

**Still (9:16):**

```
Vertical 9:16 sportswear campaign photo in the courtyard of a Moroccan riad at night. Dark polished plaster walls, a carved arch in shadow, and pierced metal lanterns casting soft star-shaped patterns of warm light on the walls. A Moroccan woman in a black long-sleeve crop top and matching leggings with blush details holds a deep lunge stretch on a dark mat. A soft blush light falls on her from the side, a silver rim light outlines her from behind. Her face and upper body sit in the middle third; the bottom 45% of the frame is calm dark tiled floor. Real skin texture, natural proportions, sharp fabric detail, 35mm lens, editorial look, subtle film grain. No text, no logos, no watermark.
```

**Motion (8 seconds):**

```
Slow sideways camera glide from left to right over 8 seconds. She rises from the lunge into a standing stretch with her arms overhead, then lowers them. The lantern light patterns on the walls shimmer gently. Lighting stays constant. No cuts, no camera shake. Ends close to the first frame so it loops.
```

## Concept 3: Rooftop at dusk (with the modest line)

**Still (9:16):**

```
Vertical 9:16 sportswear campaign photo of two Moroccan friends laughing mid-workout on a rooftop terrace just after sunset, deep blue-black sky with the last pink glow on the horizon and soft city lights below. One wears a blush pink sports bra and leggings set. The other wears modest activewear: a loose long-sleeve top, full-length leggings and a matching sports hijab in black with blush details. A soft warm light from a terrace lamp falls on their faces. Their faces sit in the middle third of the frame; the bottom 45% is calm dark terrace floor. Real skin texture, natural proportions, sharp fabric detail, 35mm lens, editorial look, subtle film grain. No text, no logos, no watermark.
```

**Motion (8 seconds):**

```
Slow, gentle camera orbit around the two friends over 8 seconds. One playfully bumps the other's shoulder and they both laugh, then return to their stretch. Fabric and the hijab move naturally in a light breeze; the city lights twinkle softly. Lighting stays constant. No cuts, no camera shake. Ends close to the first frame so it loops.
```

## If the tool has a negative prompt field

```
text, letters, captions, logo, watermark, brand names, neon colors, harsh glow, extra fingers, distorted hands, deformed face, plastic skin, oversaturated colors, cartoon, 3D render, blurry, low resolution, sexualized pose
```

## Put it on the store

1. In Shopify, open **Online Store → Themes**, then **Customize** on the Nyrafit theme.
2. Click the **Nayra hero** section.
3. Upload the files: **Video**, **Video for phones**, **Photo**, **Photo for phones**.
4. Adjust **Darken behind the text** until the headline is easy to read on your phone.
5. Click **Save**. The theme editor saves the change to the GitHub repository by itself.
6. Check it with **Preview** on your phone, including with Low Power Mode on (the photo shows instead of the video).

## Generating it from Claude

Higgsfield has an official connector for Claude at `https://mcp.higgsfield.ai/mcp`. Add it at claude.ai/customize/connectors, sign in with your Higgsfield account, and start a new session; Claude can then run these prompts and draft the variations for you. Generations use your Higgsfield credits.
