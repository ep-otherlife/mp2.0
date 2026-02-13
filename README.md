# MoonPay Optical Engine

A procedural light and gradient generator built for the MoonPay brand system. Single-file, browser-based, no build step required.

**Live:** [mp2-0.vercel.app](https://mp2-0.vercel.app)

---

## Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/ep-otherlife/mp2.0.git
   ```
2. Open `optical-engine.html` in any modern browser — or open the folder in Cursor to edit.
3. That's it. No dependencies, no install, no build.

---

## How It Works

Everything lives in a single HTML file using WebGL 1.0 fragment shaders and Tailwind CSS. The generator produces flowing, organic light forms driven by an iterative feedback loop, mapped onto a dynamic color palette.

### Parameters

- **Flow Field** — Shapes the structure and movement of curves.
- **Bands & Highlights** — Controls bright linear streaks.
- **Layer Mixing** — Balances directional flows and ambient light.
- **Tone & Shaping** — Adjusts edge sharpness, diffusion, brightness, and contrast.
- **Post-Processing & Motion** — Adds film grain, chromatic aberration, and animation speed.

### Color System

- **Brand Themes** — One-click palette swap for Consumer, Partner, and Stablecoins.
- **Custom Palette** — Add, remove, reorder (drag & drop), and edit individual color stops.
- **Highlight Accents** — Toggle yellow or orange accent colors into the gradient.

### Presets

- Six built-in presets + a Randomize button for exploration.
- Save unlimited custom presets (persisted in localStorage).
- Export/import presets as JSON to share with the team.

### Export

- **4K PNG** — Single-frame render at 3840×2160.
- **Video** — MP4 (or WebM fallback) at 60fps with configurable duration.

---

## Making Changes

Edit `optical-engine.html` in Cursor, preview in your browser, then push:

```
git add optical-engine.html
git commit -m "description of change"
git push origin main
```

Vercel auto-deploys from `main`, so changes go live immediately.

### Branching (recommended for larger edits)

```
git checkout -b your-name/feature
# make changes
git push -u origin your-name/feature
```

Then open a PR on GitHub to merge into `main`.

---

## Tech Stack

- HTML5 / JavaScript (single file, no framework)
- WebGL 1.0 + GLSL ES 1.0 fragment shaders
- Tailwind CSS via CDN
- Iterative domain distortion, FBM noise, Box-Muller Gaussian grain
- MediaRecorder API for video capture

---

## Browser Support

Chrome, Edge, Firefox, Safari — any browser with WebGL 1.0.

## License

Proprietary — MoonPay internal tool.
