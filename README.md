# MoonPay Optical Engine

A professional-grade procedural gradient generator designed to produce high-fidelity, brand-aligned motion gradients and optical auras for the MoonPay product ecosystem.

## Features

### 🎨 Visual Generation
- **Iterative Domain Distortion** - Smooth, flowing organic curves using advanced warping algorithms
- **Four Dynamic Light Emitters** - Layered, translucent blending for atmospheric depth
- **Spatial Focus System** - Dramatic contrast between sharp "in-focus" and soft "out-of-focus" areas
- **Real-time Mouse Interaction** - Control the 4th emitter with your cursor

### 🎭 Visual Presets
- **Soft Aurora** - Ethereal & dreamy with minimal warp and soft diffusion
- **Flowing Glass** - Balanced & iridescent with smooth translucent flow
- **Liquid Optics** - Dynamic & layered with high contrast and dramatic flow
- **Ambient Depth** - Atmospheric & volumetric with extreme depth of field

### 🌈 MoonPay Brand Themes
- **Consumer (Core)** - Purple gradient (#903DD9 → #FFFFFF)
- **Partner (Business)** - Blue gradient (#4464D9 → #FFFFFF)
- **Stablecoins** - Green-cyan gradient (#089C50 → #AEE6E8)

### 🎛️ Advanced Controls
- **Dynamic Color Palette** - Support for 2-10 colors with live editing
- **Emitter Properties** - Hardness, Diffusion, Hotspot Glow
- **Spatial Focus** - Intensity and Contrast controls
- **Domain Warping** - Strength and Scale adjustments
- **Film Grain** - Gaussian noise with adjustable intensity and size
- **Chromatic Aberration** - Radial RGB channel separation for optical effects

### 💾 Preset Management
- **Save Custom Presets** - Store your favorite configurations
- **Export/Import** - Share presets with your team as JSON files
- **LocalStorage** - Presets persist across sessions

### 📤 Export
- **4K PNG Export** - High-resolution output (3840x2160)
- **Accurate Color Rendering** - Precise hex code matching
- **ACES Tonemapping** - Professional color grading

## Technical Stack

- **Frontend**: Single-file HTML5/JavaScript application
- **UI Framework**: Tailwind CSS (CDN)
- **Graphics API**: WebGL 1.0 with GLSL Fragment Shaders
- **Procedural Logic**: 
  - Iterative domain distortion
  - Fractional Brownian Motion (FBM)
  - Box-Muller transform for Gaussian noise
  - ACES tonemapping

## Usage

### Local Development
Simply open `optical-engine.html` in a modern web browser. No build process required!

### Deployment Options

#### Option 1: GitHub Pages
Already set up! Your tool will be available at:
```
https://ep-otherlife.github.io/mp2.0/optical-engine.html
```

#### Option 2: Any Static Host
Deploy the single HTML file to:
- Netlify
- Vercel
- AWS S3
- Any web server

### Controls

1. **Brand Themes** - One-click color palette switching
2. **Visual Presets** - Pre-configured aesthetic styles
3. **Color Palette** - Click swatches to edit, add/remove colors, shuffle order
4. **Emitter Properties** - Adjust light behavior and diffusion
5. **Spatial Focus** - Control depth of field effects
6. **Domain Warping** - Modify organic flow patterns
7. **Post-Processing** - Fine-tune grain and chromatic aberration
8. **Animation Speed** - Control motion speed
9. **Save/Export** - Store presets and export high-res images

### Keyboard Shortcuts
- Mouse movement controls the 4th light emitter in real-time

## Creating Custom Presets

1. Adjust all parameters to your desired look
2. Click **"💾 Save Current Settings"**
3. Enter a name for your preset
4. Your preset appears in "Your Custom Presets" section

### Sharing Presets with Team

1. Click **📤** next to your saved preset
2. Download the `.json` file
3. Share via Slack, email, or file system
4. Team members click **"📥 Import Preset"** to load it

## Technical Details

### WebGL 1.0 Compatibility
- No dynamic array indexing (manually unrolled loops)
- All color ramp calculations use constant indices
- Maximum compatibility across devices

### Color Accuracy
- Simplified ACES tonemapping preserves hex code accuracy
- Reduced additive elements prevent oversaturation
- Gentle S-curve for contrast without color shift

### Noise Implementation
- True Gaussian distribution via Box-Muller transform
- High-quality hash function prevents artifacts
- Adjustable grain size and intensity

## Browser Compatibility

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Any browser with WebGL 1.0 support

## Performance

- Target: 60fps on standard laptop GPUs
- Optimized shader compilation
- Real-time parameter updates without recompilation
- Efficient 4K rendering for export

## Project Structure

```
optical-engine.html    # Complete application (self-contained)
README.md             # This file
```

## Credits

Built for MoonPay to generate brand-aligned optical assets for the product ecosystem.

## License

Proprietary - MoonPay Internal Tool
