# Shiloh Rd Outdoor — WordPress Theme Plan

See the full implementation plan in the project conversation history.
This file confirms the theme was scaffolded from the plan on $(date +%Y-%m-%d).

## Quick Reference

- **Theme dir**: `wordpress/wp-content/themes/shiloh-rd-outdoor/`
- **Dev server**: `cd wordpress && lando start`, then `npm run dev` in theme dir
- **Build CSS**: `npm run build` in theme dir
- **WP-CLI**: `lando wp theme activate shiloh-rd-outdoor`

## Seed Data Needed (Phase 6)

1. 3 authors (Maris Caldwell, Jae Park, Owen Rios) via Stories > Authors
2. 5 stories with ACF fields (author, read time, location, featured flag)
3. 6 story tags: Camp, Field Notes, Gear, Hiking, Minimal, Navigation, Packing, Reflection, Ridge Roads, Ritual, Rivers, Slow Travel, Technique, Wet Weather, Winter Light
4. Upload hero + 3 feature images as featured images
5. Set front page display to "A static page" in Settings > Reading (select any page)
6. Fill in Theme Settings > Hero Section values (or use defaults)
7. Fill in Theme Settings > Highlights repeater (or defaults will render)
