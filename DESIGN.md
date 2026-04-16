# Design Brief: EventIQ

## Aesthetic Direction
Zoho-inspired calm SaaS productivity interface. Refined minimalism with purposeful motion. Premium modern tech aesthetic balancing clarity with refinement.

## Color Palette

| Role | Light | Dark |
|------|-------|------|
| Background | oklch(0.99 0 0) #FFFFFF | oklch(0.05 0 0) #0F172A |
| Foreground | oklch(0.16 0 0) #1E293B | oklch(0.96 0 0) #F8FAFC |
| Primary (Blue) | oklch(0.55 0.11 261) #3B82F6 | oklch(0.62 0.14 261) #4FC3F7 |
| Secondary (Orange) | oklch(0.65 0.19 40) #F97316 | oklch(0.58 0.21 40) #FF8A65 |
| Success | oklch(0.68 0.13 142) #22C55E | oklch(0.72 0.12 141) #4ADE80 |
| Muted | oklch(0.92 0 0) | oklch(0.2 0 0) |
| Border | oklch(0.88 0 0) | oklch(0.22 0 0) |

## Typography
- **Display**: Space Grotesk — geometric, modern, distinctive for headings
- **Body**: Satoshi — clean, refined, readable for all body text
- **Mono**: JetBrains Mono — technical detail and code blocks

## Shape Language
- **Radius**: 0.625rem (10px) base for UI components
- **Blob Animation**: `border-radius: 71% 29% 70% 30% / 30% 54% 46% 70%`, radial-gradient with accent colors, opacity 0.1, 20s infinite float animation
- **Shadows**: Soft (0 10px 25px -5px rgba(0,0,0,0.05)) for cards, Elevated (0 20px 40px -10px rgba(0,0,0,0.08)) for modals

## Structural Zones
| Zone | Light Surface | Dark Surface | Treatment |
|------|---------------|--------------|-----------|
| Header | card (oklch(0.975 0 0)) | card (oklch(0.12 0 0)) | border-b, shadow-soft |
| Content | background | background | alternating muted/40 sections |
| Cards | card with border | card with border | shadow-soft, hover:shadow-elevated |
| Footer | muted/30 | muted/40 | border-t |

## Component Patterns
- **Buttons**: Primary (blue accent, large padding), Secondary (transparent + border), Success (green accent)
- **Cards**: Layered elevation with soft shadows, 2rem padding minimum, subtle border
- **Forms**: Input styling with focus ring (primary color), dual-handle sliders for budget
- **Modals**: Card on background with overlay, shadow-elevated

## Motion & Animation
- Blob Float: 20s infinite alternate ease-in-out (−30px translate on 50% keyframe)
- Transition Smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all interactive elements
- Fade + Scale: 300ms for overlay reveal, 200ms for component state changes

## Spacing & Rhythm
- Minimum padding: 2rem (32px) on sections, 1.5rem (24px) on cards
- Grid gap: 1.5rem to 2rem for breathing room
- Vertical rhythm: 1.5rem increments

## Differentiation
Abstract floating blob animations with organic border-radius throughout dashboard and landing pages. Warm orange + cool blue accent interplay creates visual interest without clutter. Intentional surface hierarchy using card layers, not just color.

## Constraints
- No external images — only generated SVG blobs and CSS gradients
- AA+ contrast maintained across light/dark modes
- Large touch targets (minimum 44px), accessible focus states
- Floating elements positioned fixed with low opacity, never interfering with content
