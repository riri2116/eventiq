# Design Brief: EventIQ

## Aesthetic Direction
BookMyShow/District-inspired dark-themed event platform. Bold, high-contrast cinema aesthetic with warm red-orange accents. Premium modern entertainment design balancing cinematic drama with functional clarity.

## Color Palette

| Role | Light | Dark |
|------|-------|------|
| Background | oklch(0.99 0 0) #FFFFFF | oklch(0.1 0.02 250) #0F172A |
| Foreground | oklch(0.16 0 0) #1E293B | oklch(0.96 0 0) #F8FAFC |
| Primary (Red-Orange) | oklch(0.59 0.19 34) #FF6B35 | oklch(0.64 0.2 34) #F97316 |
| Secondary | oklch(0.94 0.03 34) | oklch(0.22 0.04 34) |
| Success | oklch(0.68 0.13 142) #22C55E | oklch(0.72 0.12 141) #4ADE80 |
| Muted | oklch(0.94 0 0) | oklch(0.2 0 0) |
| Border | oklch(0.88 0 0) | oklch(0.22 0 0) |

## Typography
- **Display**: Space Grotesk — geometric, modern, distinctive for headings
- **Body**: Satoshi — clean, refined, readable for all body text
- **Mono**: JetBrains Mono — technical detail and code blocks

## Shape Language
- **Radius**: 0.625rem (10px) base for UI components
- **Carousel 3D**: rotateY/rotateX infinite perspective rotation, 8s cycle, transforms image depth on slide transitions
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
Cinema-inspired 3D carousel rotations on hero images convey motion and depth without floating decorations. Warm red-orange (#FF6B35 / #F97316) on navy background echoes entertainment ticketing platforms. High-contrast dark theme prioritizes event discovery clarity.

## Constraints
- No floating blob animations — removed entirely for cleaner, bolder look
- 3D carousel transforms on hero images for visual drama
- AA+ contrast maintained across light/dark modes
- Dark mode as primary aesthetic direction
- Large touch targets (minimum 44px), accessible focus states
