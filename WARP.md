# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Start production server:**
```bash
npm run start
```

**Lint code:**
```bash
npm run lint
```

**Check for unused dependencies:**
```bash
npm run check-unused
```

**Remove unused dependencies:**
```bash
npm run clean-unused
```

## Project Architecture

This is Andrii Litkovskyi's personal portfolio website built with **Next.js 15** using the App Router architecture. The site is a single-page application with smooth scrolling sections and sophisticated animations.

### Key Technologies
- **Next.js 15** with App Router
- **React 19** with JSX (not TypeScript)
- **Tailwind CSS 4** for styling with custom CSS animations
- **Framer Motion** and **GSAP** for advanced animations
- **PWA** support via next-pwa
- Custom font loading (SF Pro Text family)

### Architecture Overview

**App Structure:**
- `/app` - Next.js App Router directory
  - `layout.jsx` - Root layout with analytics, theme scripts, and global styles
  - `page.jsx` - Main page composing all sections
  - `/styles` - Custom CSS files for animations and theming

**Component Architecture:**
- `/components` - React components organized by function
  - `AppWrapper.jsx` - Main client-side wrapper with hooks and global UI
  - Section components: `Cover.jsx`, `Intro.jsx`, `Values.jsx`, `Background.jsx`, `About.jsx`, `Contact.jsx`
  - Layout components: `Header.jsx`, `Nav.jsx`, `Aside.jsx`
  - Utility components: `GridOverlay.jsx`, `ThemeBootScript.jsx`, etc.

**Custom Hooks:**
- `/hooks` - Reusable React hooks for various functionalities
  - `useInitialPageLoad.js` - Handles loading animations and scroll restoration
  - `useActiveSection.js` - Tracks visible section for navigation highlighting
  - `useGridToggle.js`, `useMobileNav.js`, `useThemeSlider.js` - UI state management
  - `useTouchDetection.js` - Detects touch devices for responsive behavior

### Styling Architecture

**CSS Organization:**
- `globals.css` - Main Tailwind imports and base styles
- `color.css`, `font.css`, `variables.css` - Theme-specific stylesheets
- `grid.css` - Layout grid system
- `media-queries.css` - Responsive breakpoints

**Animation System:**
The site uses a sophisticated animation system combining:
- Custom CSS transitions with cubic-bezier timing functions
- Body classes for loading states (`is--loading`, `cover--is--visible`)
- Intersection Observer for scroll-triggered animations
- Theme-based animations (16+ theme variations)

### Key Features

**Loading Experience:**
- Custom splash screen with timed transitions
- Prevents browser scroll restoration
- Orchestrated reveal of interface elements

**Navigation:**
- Section-based navigation with active state tracking
- Smooth scrolling between sections
- Mobile-responsive navigation patterns

**Theming:**
- Multiple theme variations (theme--16 as default)
- Client-side theme switching with no flash
- CSS custom properties for consistent theming

## Important Development Notes

**State Management:**
- Uses React hooks for local state management
- No external state management library
- Body classes for global UI states

**Performance:**
- PWA-enabled with service worker (disabled in development)
- Custom font loading strategy
- Optimized animations using `transform` properties

**SEO & Analytics:**
- Google Tag Manager integration
- Microsoft Clarity analytics
- Proper meta tags and Open Graph setup

**File Structure Patterns:**
- Path aliases configured: `@/*` maps to root directory
- JSX files (not TSX) throughout the project
- Custom utility functions in `/lib/utils.js`
- Public assets organized in `/public/assets/`

**Development Workflow:**
- ESLint configured with Next.js preset and custom rules
- No TypeScript (JSX only)
- Tailwind CSS with custom configuration
- Component-based architecture with clear separation of concerns
