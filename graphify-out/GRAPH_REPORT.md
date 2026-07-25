# Graph Report - .  (2026-07-25)

## Corpus Check
- 49 files · ~310,802 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 220 nodes · 264 edges · 33 communities (19 shown, 14 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.83)
- Token cost: 829,282 input · 0 output

## Community Hubs (Navigation)
- Dev Dependencies & Types
- Shop & Layout Components
- Core Package Dependencies
- TypeScript Compiler Options
- Product Data & Home Sections
- TypeScript Project References
- Homepage Hero Sections
- 3D Hero Scene (Canvas)
- Hero Image Concepts
- Project Docs & Agent Rules
- Kurta Product Image
- Brand Story Image
- Festive Collection Image
- Root Layout & Preloader
- Casual Hero Image
- Nehru Jacket Product Image
- Saree Product Image
- Wedding Collection Image
- Women's Collection Image
- Hero Showcase Lookbook
- ESLint Config File
- Next.js Config File
- Anarkali Product Image
- Lehenga Product Image
- File Icon Asset
- Globe Icon Asset
- Men's Collection Image
- Sherwani Product Image
- Next.js Logo Asset
- Vercel Logo Asset
- Window Icon Asset

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `getProductImage()` - 12 edges
3. `useStore` - 11 edges
4. `Product` - 7 edges
5. `include` - 7 edges
6. `scripts` - 5 edges
7. `getFeaturedProducts()` - 5 edges
8. `jfs-fashion Next.js project (README)` - 5 edges
9. `Mustard Jacquard Kurta` - 5 edges
10. `ProductDetailPage()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `AGENTS.md: "This is NOT the Next.js you know" agent rule` --conceptually_related_to--> `jfs-fashion Next.js project (README)`  [INFERRED]
  AGENTS.md → README.md
- `CLAUDE.md project instructions` --references--> `AGENTS.md: "This is NOT the Next.js you know" agent rule`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `RelatedCard()` --calls--> `getProductImage()`  [EXTRACTED]
  src/app/product/[id]/page.tsx → src/data/images.ts
- `ProductCard()` --calls--> `getProductImage()`  [EXTRACTED]
  src/components/home/FeaturedProducts.tsx → src/data/images.ts
- `ProductCard()` --calls--> `useStore`  [EXTRACTED]
  src/components/home/FeaturedProducts.tsx → src/store/store.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **README Getting Started flow (bootstrap, dev server, editable entry page)** — readme_nextjs_project, readme_create_next_app, readme_app_page_tsx [INFERRED 0.75]

## Communities (33 total, 14 thin omitted)

### Community 0 - "Dev Dependencies & Types"
Cohesion: 0.08
Nodes (23): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, @types/node, @types/react, @types/react-dom (+15 more)

### Community 1 - "Shop & Layout Components"
Cohesion: 0.17
Nodes (14): ProductDetailPage(), RelatedCard(), categories, ShopProductCard(), types, Logo(), LogoProps, CartDrawer() (+6 more)

### Community 2 - "Core Package Dependencies"
Cohesion: 0.11
Nodes (19): framer-motion, gsap, next, dependencies, framer-motion, gsap, next, react (+11 more)

### Community 3 - "TypeScript Compiler Options"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "Product Data & Home Sections"
Cohesion: 0.18
Nodes (10): collectionImages, FeaturedProducts(), ProductCard(), collections, getFeaturedProducts(), Product, ProductColor, testimonials (+2 more)

### Community 5 - "TypeScript Project References"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 6 - "Homepage Hero Sections"
Cohesion: 0.27
Nodes (3): BrandStory(), HeroRoulette(), HeroSection()

### Community 8 - "Hero Image Concepts"
Cohesion: 0.29
Nodes (8): Dusty Rose Embroidered Anarkali Gown, Editorial Fashion Photography Style, Gold Zari/Sequin Embroidery Detailing, Gold Jhumka Earrings and Necklace, Hero Banner Image, Indian Ethnic/Bridal Wear Category, Female Model in Twirling Pose, Soft Neutral Pink/Cream Studio Backdrop

### Community 10 - "Project Docs & Agent Rules"
Cohesion: 0.29
Nodes (7): AGENTS.md: "This is NOT the Next.js you know" agent rule, CLAUDE.md project instructions, app/page.tsx entry page, create-next-app bootstrap tool, Geist font via next/font, jfs-fashion Next.js project (README), Vercel deployment platform

### Community 11 - "Kurta Product Image"
Cohesion: 0.29
Nodes (7): Floral/Paisley Jacquard Weave Pattern, product-kurta.png (Product Photo), Indian Ethnic Menswear Category, Mustard Jacquard Kurta, Mandarin (Band) Collar, Mustard/Gold Colorway, Studio Hanger Product Photography Style

### Community 12 - "Brand Story Image"
Cohesion: 0.70
Nodes (5): Artisan Weaver (Henna-Adorned Hands), Brand Story Section (JFS Fashion Site), Traditional Wooden Handloom, Brand Story Image (Artisan Weaving Handloom), Green and Gold Zari Silk Textile

### Community 13 - "Festive Collection Image"
Cohesion: 0.60
Nodes (5): Festive Collection Product Photo, Festive Decor Backdrop (Marigolds, Diyas, Rug), Indian Festive/Ethnic Wear Category, Female Model (Festive Collection Shoot), Orange and Teal Embroidered Sharara Suit

### Community 15 - "Casual Hero Image"
Cohesion: 0.83
Nodes (4): hero-casual.png (Hero Image), Sage Green Floral-Print Kurta Set, Smiling Female Model, Sunlit Neutral-Tone Interior Setting

### Community 16 - "Nehru Jacket Product Image"
Cohesion: 0.50
Nodes (4): Product Photo: Green Embroidered Nehru Jacket, Indian Ethnic Menswear Category, Nehru Jacket (Green Silk, Paisley Embroidery), Tone-on-Tone Paisley Embroidery Detail

### Community 17 - "Saree Product Image"
Cohesion: 0.50
Nodes (3): Indian Ethnic Wear (Saree Category), Studio Product Photography Style, Lavender Floral Embroidered Saree

### Community 18 - "Wedding Collection Image"
Cohesion: 0.50
Nodes (4): Traditional Indian Bridal Jewelry Set, Navy Blue and Gold Embroidered Bridal Lehenga, Wedding Collection Bridal Lehenga Photo, Wedding Collection (Site Category)

### Community 19 - "Women's Collection Image"
Cohesion: 0.83
Nodes (4): Women's Collection Photo (Maroon Embroidered Lehenga), Gold Kundan-Style Bridal Jewelry Set, Maroon Embroidered Bridal Lehenga with Dupatta, Female Model

## Knowledge Gaps
- **94 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Core Package Dependencies` to `Dev Dependencies & Types`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `TypeScript Compiler Options` to `TypeScript Project References`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Dependencies & Types` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Core Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._