# RB20 Scroll Concept

A scroll-driven 3D experience built with vanilla HTML, CSS, and JavaScript — featuring an interactive Three.js model of the Red Bull RB20, choreographed to move, rotate, and reveal season stats as you scroll.

Built as part of the [Hack Club Stardance](https://stardance.hackclub.com/) challenge, and as an early concept piece for **DRIVEN**, a larger car-experience project I'm building.

## What it does

- A 3D model of the 2024 Red Bull RB20 renders on a fixed canvas behind the page
- As you scroll, the car moves across the screen, rotates, and tilts into a top-down view — synced to different content sections
- Each section reveals stats and facts about the car, including a full 2024 season record table
- Fully responsive — camera FOV and car positioning adjust for narrow/mobile screens

## Tech stack

- **Three.js** (r128) — 3D rendering and the RB20 model
- **GSAP + ScrollTrigger** — scroll-synced animation timeline
- **Vanilla HTML/CSS/JS** — no frameworks, no build step

## Running locally

This is a static site — no build process needed.

1. Clone or download the repo
2. Open the folder in VS Code (or any editor)
3. Serve it with a local server — e.g. the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension, right-click `index.html` → "Open with Live Server"
4. **Note:** you can't just double-click `index.html` and open it as a `file://` URL — the 3D model won't load due to browser CORS restrictions on local file fetches. It needs to be served over `http://`.

## Project structure

```
├── index.html      # Page structure and content sections
├── style.css      # Layout, responsive text, table styling
├── script.js      # Three.js scene, GLTFLoader, scroll animation timeline
└── models/
    └── rb20.glb   # 3D model (see credit below)
```

## Credit

3D Model: **"2024 Redbull RB20"** by [Dave Love](https://sketchfab.com/Tyler_Dave) on Sketchfab, licensed under [CC Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).
[View original model →](https://sketchfab.com/3d-models/2024-redbull-rb20-4315ff70ec694ef0b7ebfb84145ef48c)

## Dev log

I documented the full build process — including the bugs, the pivots, and the "why is the car flying off screen" moments — in my Stardance devlogs. Started as a scroll-animation tutorial, turned into a full rebuild around an exploding-then-not-exploding F1 car concept once I realized copying the tutorial wasn't the point.

## What's next

- A second, lighter model with separated wheel/wing meshes to bring back the original "exploded view" idea
- More history/story content per section
- Eventually folding this concept into the full DRIVEN site
