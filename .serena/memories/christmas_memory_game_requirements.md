# Christmas Memory Game Requirements

## Design Specifications
- **Max Width**: 600px, centered layout
- **Layout**: Mobile-first, 3x4 grid (12 cards) or 4x4 (16 cards)
- **Card Size**: ~100x136px (200:272 ratio)
- **Theme**: Cozy Christmas pixel art aesthetic

## Color Palette
- Background Dark: #2D1B14 (deep brown)
- Background Warm: #8B4513 (saddle brown)
- Card Back: #C41E3A (Christmas red)
- Accent/Border: #FFD700 (gold)
- Text Primary: #FFFFFF (white)
- Text Secondary: #FFF8DC (cornsilk)
- Success: #228B22 (forest green)
- Shadow: #1A0F0A (dark brown)

## Christmas Icons (6-8 pairs)
- Santa, Christmas Tree, Gift, Snowflake, Reindeer, Bell, Stocking, Snowman

## Animation Requirements
- Card flip: 0.4-0.5s CSS 3D transform (rotateY)
- Hover/Touch: Scale 1.05 with subtle glow
- Match highlight: Brief brightness increase
- Flip back delay: 1s for non-matches

## File Location
- Create at: `/apps/web/src/app/[locale]/game/mini/christmas/page.tsx`
- Router path: `/game/mini/christmas`