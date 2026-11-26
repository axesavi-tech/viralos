# Kathavi Reel Studio — engineering notes

The Remotion-based Instagram Reel theme and template engine, and the Reel Studio page built from it into `public/studio/reels/`. The live preview runs in the browser; MP4 export needs the render service (see "Moving to AWS").

## What exists

| Part | Where | Status |
|---|---|---|
| Spec schemas (zod) | `src/engine/schema.ts` | Brief → ReelSpec, both validated |
| Planner ("creative director") | `src/engine/planner.ts` | Deterministic: picks beats, layouts, motion and timing from the theme. No generated code at runtime. |
| Themes | `src/themes/index.ts` | 13 (10 flat, 3 in 3D: Depth Studio, Cube Motion, Gallery Depth) of the 20 planned |
| Layouts | `src/components/Scene.tsx` | 18 including the 3D depth stack, turning cube and reflective floor, + CTA + logo end card |
| Motion | `Text.tsx` (10 text animations), `Media.tsx` (13 camera moves incl. 3D orbit, dolly, tilt), `Transition.tsx` (13 transitions incl. 3D cube, flip, zoom-through), `Decor.tsx` (grain, vignette, 7 textures, letterbox) | ~45 reusable pieces |
| Text fitting | `src/engine/fit.ts` | Measures real glyph widths, binary-searches the size, wraps to a max line count |
| Colour safety | `src/engine/color.ts` | Every theme palette derives from the brand colours and is forced to WCAG AA |
| Safe zones | `src/engine/motion.ts` (`SAFE`) | Top 250, bottom 440, left 72, right 168 px at 1080×1920 |
| Studio page | `src/studio/main.tsx` → `public/studio/reels/` | Remotion Player; inside Kathavi it uses the customer's brand and saves to the workspace |
| Demo brands | `src/samples.ts` | Iraaya (own Shopify photos, loaded from its store), Kaapiyo, Ojasri, Dhaavo, Mittiko (Unsplash photos) |
| QA | `scripts/qa.mjs`, `scripts/contrast.ts`, `scripts/blank.py` | See "Testing" |

## Photos and video clips

- A reel takes **up to 8 photos or video clips** (MP4, MOV, WEBM). The customer ticks which ones this reel uses and orders them; the first leads.
- **Every ticked item gets screen time.** Story beats take what they need; whatever is left plays as a **Gallery montage** right after the hook, in groups of up to four, at least ~0.9 s each. The montage draws each item through the theme's own single-photo layout, so it keeps the template's look.
- **Framing per item** (stored on the media, so it applies in every theme and every scene): drag to place the product (focus point), **zoom 1–3×**, **Fill the frame** or **Show whole product** (whole item over a soft blurred backdrop), and for clips **where the clip starts**. The theme's camera move runs on top of the customer's framing.
- **Per-scene choice:** in the Scenes list, the thumbnail beside a scene opens a picker. Single-photo scenes swap their photo, multi-photo layouts change their lead, montages add or remove items. Choices are kept by scene id (`assign` in the brief).
- Clips play muted and loop if shorter than their scene; a still frame (poster) is captured on upload and used in posts, carousels and thumbnails.
- QA: `npm run media:qa` (325 plans: exact length, every ticked item shown) and `npm run media:render-qa` (renders mixed photo + clip reels in every theme).

## Posts, carousels and stories

`src/posts/` builds static posts from the same brief and the same 13 themes, so a brand's posts match its reels.

| Part | Where | Notes |
|---|---|---|
| Formats | `posts/schema.ts` | Post 4:5 (1080×1350), Post 1:1 (1080×1080), Story 9:16 (1080×1920, Instagram safe zones) |
| Layouts | `posts/Post.tsx` | 11: hero photo, magazine cover, photo and story, product card, three reasons, big statement, offer, photo grid, gallery frame, quote, call to action |
| Planner | `posts/plan.ts` | Each theme ranks the layouts that suit it; the planner fills them from the brief, skips any layout the brief can't honestly fill (no offer → no offer post, no price → no price tag) and builds one carousel (cover → story → reasons → product → offer → call to action). Writes a caption and alt text for every slide. |
| Studio | `studio/PostsPanel.tsx` | "Posts, carousels & stories" tab: the set for the brand, slide pager, PNG download at full size with the theme's fonts embedded, copy caption, save to workspace (`vx_docs`, type `post`). |
| Server render | `Root.tsx` `Post` still | `npx remotion still src/Root.tsx Post out.png --props='{"spec":…,"slide":0}'` |
| QA | `npm run posts:qa` | Renders every demo brand's set in its theme (plus square and story for one); 153 images, no text overflow, no blank images (26 Nov) |

## The four layers

A reel is **theme × layout × content × motion**, and each is swappable on its own.

- **Content** is the `Brief`: brand (name, colours, handle), hook, story, product, up to 6 features, optional price and offer, CTA, optional voiceover, 1–12 photos with focal points. Price and offer are rendered only when the brief supplies them; the planner never invents them.
- **Theme** (`ThemeSpec`) owns fonts, a palette function, pacing (scene weights, transition length, energy), which text animation / camera move / transition each scene kind uses, which layouts each kind may use, decor and caption style.
- **Layout** is a React component that receives `SceneCtx` (scene, spec, theme, progress, duration) and places text and media inside the safe zones.
- **Motion** components are pure functions of the frame number, so every render is identical (random effects use a seeded `rng`).

Switching theme = `plan({...brief, themeId})`. The content never changes.

## ReelSpec (what the renderer consumes)

```ts
{
  version: 1, themeId, fps: 30, width: 1080, height: 1920,
  brand: {name, tagline?, primary, accent?, logoUrl?, handle?},
  media: [{src, focusX, focusY, alt?}],
  scenes: [{id, kind, frames, eyebrow?, title?, body?, media: number[], layout?, textAnim?, mediaAnim?, transitionIn}],
  intensity: 0.4–1.6, captions: [{text, from, to}], showSafeZones, audioSrc?
}
```

`kind` ∈ hook, story, product, feature, detail, offer, cta, logo. Scenes overlap by the theme's transition length; `totalFrames(spec)` gives the exact duration, which the planner makes land exactly on 15/30/45/60/90 s.

The studio's "Copy reel spec" button produces this JSON. It is the contract between the app and the render service.

## Rendering

```bash
npx remotion render src/Root.tsx <composition-id> out/x.mp4 --browser-executable=/usr/bin/google-chrome
# generic entry point — any validated ReelSpec:
npx remotion render src/Root.tsx Reel out/x.mp4 --props=spec.json
```

Sandbox speed: about 3 minutes for a 30 s reel on 2 shared CPUs (~5 fps). A dedicated 4–8 vCPU worker or Lambda fan-out will be much faster.

## Testing

| Check | How | Result (26 Nov) |
|---|---|---|
| Palette contrast | `npx tsx scripts/contrast.ts`: 6 demo briefs × 13 themes × 4 text/background pairs | 312 checks, 0 failures |
| Exact durations | `npx tsx scripts/durations.ts`: 6 briefs × 13 themes × 5 lengths | 390 of 390 exact |
| Text overflow | `scripts/qa.mjs` logs any text that would not fit at the minimum size | 0 (checked on the 3D themes and Iraaya after the 26 Nov changes) |
| Blank frames | `scripts/qa.mjs` + `blank.py` — two frames per scene, flags near-uniform images | 0 of 120 frames |
| Types | `npx tsc -p .` | passes |

Not automated yet: visual regression (compare stills against approved baselines) and audio-sync checks.

## Moving to AWS (proposed, not built)

1. **Render worker**: a container (this repo + Chrome + ffmpeg) on ECS Fargate or an EC2 spot instance, pulling jobs from SQS. Input: ReelSpec JSON + S3 keys of the user's photos. Output: MP4 to S3, then a signed URL back to the app.
2. **Alternative**: `@remotion/lambda` in ap-south-1. Fastest, but more moving parts and Lambda cost per render.
3. **App**: Kathavi (Amplify) gets the studio page as a route; "Export" posts the spec to an API route that enqueues the job and records it against the user's credits.
4. Fonts and theme code ship inside the worker image; user photos stay in the tenant's own S3 prefix. Nothing brand-specific is hard-coded; Iraaya appears only as sample data.

## Licence (check before charging customers)

Remotion is free for organisations of up to 3 people. Larger organisations need a Company Licence; Kathavi letting customers render their own videos from templates counts as an "automation", which is billed at $0.01 per render with a $100/month minimum. Player previews don't count as renders. Confirm Kathavi's headcount (including collaborators — combined headcount counts) at https://www.remotion.dev/docs/license before launch.

## Next phases

- Themes 11–20, logo upload in the brand kit, music/voiceover track with beat-aligned cuts.
- An LLM writing the *Brief* (hook, story, features) from a product URL — the planner stays deterministic.
- Focal-point detection on upload (currently set manually).
