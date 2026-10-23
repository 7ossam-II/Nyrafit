# Hero banner brief (Higgsfield)

The homepage hero is a full-width banner. It shows a looping video, with a photo of the same scene shown first and whenever visitors turn motion off. The headline, text, buttons and stickers are live text drawn by the theme on top, so the banner itself must contain **no text**.

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

- **Phone (9:16):** the bottom 45% (headline, text and two buttons, full width) and the top-left and top-right corners (stickers and the pause button). Put the model's face and upper body in the middle third.
- **Desktop (16:9):** the left 45% of the frame, bottom two thirds (headline and buttons), and the top corners. Put the model in the right half.

The theme also darkens the bottom of the banner behind the text ("Darken behind the text" in the hero settings), so a calm, mid-tone area is enough.

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

- **Palette:** hot pink `#d1186a`, deep plum `#2a0f24`, sun yellow `#ffd23f`, emerald `#0f4d3a`, rose white `#fff6f9`.
- **Light:** warm, late-afternoon sun or a warm studio key light.
- **Mood:** confident, joyful and playful, like the Instagram account. Real skin texture and natural bodies, respectful poses.
- **Setting cues:** plaster arches, zellige tiles, lime-plaster walls. Use them as setting only; no flags, symbols or other brands.

## Concept 1: Studio arch (recommended)

The closest match to the site, and the easiest to keep product-accurate.

**Still (9:16; for 16:9 swap the first sentence):**

```
Vertical 9:16 sportswear campaign photo. A Moroccan woman in her twenties wearing a fitted hot pink sports bra and high-waisted leggings, standing in a confident athletic pose and tightening her ponytail, framed by a tall plaster arch painted deep plum. Behind her, a smooth hot pink wall with a soft satin sheen. Warm key light from the upper right, soft fill, a gentle shadow on a warm rose-white floor. Her face and upper body sit in the middle third of the frame; the bottom 45% of the frame is calm, plain floor and wall. Real skin texture, natural proportions, sharp fabric detail, 50mm lens, editorial look, subtle film grain. No text, no logos, no watermark.
```

For desktop, start with: `Horizontal 16:9 sportswear campaign photo.` and replace the framing sentence with: `She stands in the right half of the frame; the left half is calm plain wall.`

**Motion (image-to-video, 8 seconds):**

```
Slow, smooth camera push-in toward her over 8 seconds. She breathes, shifts her weight and finishes tightening her ponytail, then holds a confident look just past the camera. Hair and fabric move naturally. Lighting stays constant. No cuts, no zoom jumps, no camera shake. The last frame stays close to the first so the clip can loop.
```

## Concept 2: Riad courtyard warm-up

**Still (9:16):**

```
Vertical 9:16 sportswear campaign photo in the courtyard of a Moroccan riad. Emerald and white zellige tiles on the lower walls, a carved plaster arch behind, a potted orange tree, warm late-afternoon sunlight. A Moroccan woman in a deep plum long-sleeve crop top and matching leggings holds a deep lunge stretch on a rose-colored mat. Her face and upper body sit in the middle third; the bottom 45% of the frame is calm tiled floor. Real skin texture, natural proportions, sharp fabric detail, 35mm lens, editorial look, subtle film grain. No text, no logos, no watermark.
```

**Motion (8 seconds):**

```
Slow sideways camera glide from left to right over 8 seconds. She rises from the lunge into a standing stretch with her arms overhead, then lowers them. Leaves of the orange tree move slightly in the breeze. Warm light stays constant. No cuts, no camera shake. Ends close to the first frame so it loops.
```

## Concept 3: Rooftop friends (with the modest line)

**Still (9:16):**

```
Vertical 9:16 sportswear campaign photo of two Moroccan friends laughing mid-workout on a sunny rooftop terrace with pale rose lime-plaster walls and a clear blue sky, late afternoon. One wears a hot pink sports bra and leggings set. The other wears modest activewear: a loose long-sleeve top, full-length leggings and a matching sports hijab in deep plum. Their faces sit in the middle third of the frame; the bottom 45% is calm terrace floor. Real skin texture, natural proportions, sharp fabric detail, 35mm lens, editorial look, subtle film grain. No text, no logos, no watermark.
```

**Motion (8 seconds):**

```
Slow, gentle camera orbit around the two friends over 8 seconds. One playfully bumps the other's shoulder and they both laugh, then return to their stretch. Fabric and the hijab move naturally in a light breeze. Lighting stays constant. No cuts, no camera shake. Ends close to the first frame so it loops.
```

## If the tool has a negative prompt field

```
text, letters, captions, logo, watermark, brand names, extra fingers, distorted hands, deformed face, plastic skin, oversaturated colors, cartoon, 3D render, blurry, low resolution, sexualized pose
```

## Put it on the store

1. In Shopify, open **Online Store → Themes**, then **Customize** on the Nyrafit theme.
2. Click the **Nayra hero** section. Set **Layout** to **Full-width banner**.
3. Upload the files: **Video**, **Video for phones**, **Photo**, **Photo for phones**.
4. Adjust **Darken behind the text** until the headline is easy to read on your phone.
5. Click **Save**. The theme editor saves the change to the GitHub repository by itself.
6. Check it with **Preview** on your phone, including with Low Power Mode on (the photo shows instead of the video).

## Generating it from Claude

Higgsfield has an official connector for Claude at `https://mcp.higgsfield.ai/mcp`. Add it at claude.ai/customize/connectors, sign in with your Higgsfield account, and start a new session; Claude can then run these prompts and draft the variations for you. Generations use your Higgsfield credits.
