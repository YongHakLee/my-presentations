# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 15-based static presentation portfolio that centralizes multiple Reveal.js presentations with a searchable, filterable gallery interface. The site is deployed to GitHub Pages with automated CI/CD.

**Live Site**: https://yonghaklee.github.io/my-presentations/

## Critical Architecture Details

### Two-Phase Build Process

This project uses a **non-standard build process** that differs from typical Next.js projects:

1. **Phase 1**: `next build` generates the Next.js static site to `out/`
2. **Phase 2**: `scripts/copy-presentations.js` copies presentation content into `out/`

**CRITICAL**: Both phases are required. The `build` script in package.json chains them together:
```json
"build": "next build && node scripts/copy-presentations.js"
```

### Presentation Directory Structure

**Source Structure** (what you work with):
```
presentations/
├── aiv-2025/           # Actual source location
│   └── 0926/
└── lab-meetings/       # Actual source location
    └── 250917/
reveal.js/              # Git submodule at root
```

**Build Output Structure** (what gets deployed):
```
out/
├── aiv-2025/           # Copied from presentations/aiv-2025/
├── lab-meetings/       # Copied from presentations/lab-meetings/
└── reveal.js/          # Copied from root reveal.js/
```

**IMPORTANT**: `scripts/copy-presentations.js` maps source to destination:
```javascript
const presentationDirs = [
  { src: 'presentations/aiv-2025', dest: 'aiv-2025' },      // Source has presentations/ prefix
  { src: 'presentations/lab-meetings', dest: 'lab-meetings' },
  { src: 'reveal.js', dest: 'reveal.js' }                   // reveal.js is at root
];
```

### Path Resolution Strategy

**basePath Configuration** (`next.config.js`):
- `basePath: '/my-presentations'` - GitHub Pages subdirectory path
- `assetPrefix: '/my-presentations'` - Asset loading prefix
- All paths in `app/page.tsx` presentations array must be basePath-relative

**Example Presentation Entry**:
```typescript
{
  id: 'aiv-2025-0926',
  path: '/aiv-2025/0926/index.html',  // NOT /my-presentations/ prefix
  // Next.js automatically prepends basePath at build time
}
```

## Development Commands

### Common Tasks

```bash
# Development (local server with hot reload)
npm run dev                    # Starts at http://localhost:3000

# Production build (BOTH phases required)
npm run build                  # Next.js build + presentation copy

# Verify build output
ls out/aiv-2025               # Should show presentation files
ls out/reveal.js              # Should show reveal.js library

# Clean build (when troubleshooting)
rm -rf out/ && npm run build
```

### Git Submodule Management

**Reveal.js is a Git submodule** - special handling required:

```bash
# Initial clone (MUST use --recurse-submodules)
git clone --recurse-submodules https://github.com/YongHakLee/my-presentations.git

# If cloned without submodules (reveal.js/ will be empty)
git submodule update --init --recursive

# Update reveal.js to latest version
cd reveal.js/
git pull origin master
cd ..
git add reveal.js
git commit -m "Update reveal.js submodule"
```

**Never** directly edit files in `reveal.js/` - it's managed as a submodule.

## Architecture Decisions

### Why Static Export?

GitHub Pages requires static HTML/CSS/JS. Next.js `output: 'export'` generates a fully static site with no server-side rendering at deployment.

**Implications**:
- No API routes (use external APIs or edge functions)
- No server components that need runtime data fetching
- No dynamic routes at runtime (all paths generated at build time)
- Image optimization disabled (`images.unoptimized: true`)

### Why Post-Build Copy Script?

Presentations are **independent static HTML files** (not Next.js pages). They:
- Use Reveal.js framework (external to Next.js)
- Have their own asset paths and structure
- Can't be processed by Next.js build pipeline

The copy script preserves their structure while integrating them into the build output.

### Deployment Pipeline

**Automatic Deployment** (`.github/workflows/deploy.yml`):
1. Push to main/master triggers GitHub Actions
2. Checkout with `submodules: recursive` (critical for reveal.js)
3. Install dependencies with `npm ci` (faster than `npm install`)
4. Run `npm run build` (both build phases)
5. Upload `./out` directory to GitHub Pages
6. Deploy to https://yonghaklee.github.io/my-presentations/

**Local Testing Deployment**:
```bash
# Create directory structure matching basePath
mkdir -p temp-server/my-presentations
cp -r out/* temp-server/my-presentations/
cd temp-server
npx serve -p 8001

# Test at http://localhost:8001/my-presentations/
```

## Adding New Presentations

### Step 1: Create Presentation Files

```bash
# Create new presentation directory
mkdir -p presentations/new-category/YYMMDD
# Add index.html, images, etc.
```

### Step 2: Update Build Script

Edit `scripts/copy-presentations.js`:
```javascript
const presentationDirs = [
  { src: 'presentations/aiv-2025', dest: 'aiv-2025' },
  { src: 'presentations/lab-meetings', dest: 'lab-meetings' },
  { src: 'presentations/new-category', dest: 'new-category' },  // Add this line
  { src: 'reveal.js', dest: 'reveal.js' }
];
```

### Step 3: Update Gallery Page

Edit `app/page.tsx` presentations array:
```typescript
const presentations = [
  // ... existing presentations
  {
    id: 'new-category-YYMMDD',
    title: 'Presentation Title',
    date: 'YYYY-MM-DD',              // ISO format for sorting
    category: 'New Category',
    path: '/new-category/YYMMDD/index.html',  // No basePath prefix
    thumbnail: `${basePath}/new-category/YYMMDD/imgs/cover.png`,
    description: 'Brief description'
  }
];
```

### Step 4: Test and Deploy

```bash
# Test locally
npm run build
npm run dev  # Verify presentation appears in gallery

# Deploy
git add .
git commit -m "Add new presentation: Title"
git push origin main  # Triggers automatic deployment
```

## Troubleshooting

### Build Failures

**Symptom**: `npm run build` completes but presentations missing from `out/`

**Diagnosis**:
```bash
# Check if script ran
npm run build 2>&1 | grep "Copying presentation"

# Verify source directories exist
ls presentations/aiv-2025
ls presentations/lab-meetings
ls reveal.js
```

**Fix**: Ensure `scripts/copy-presentations.js` has correct source paths with `presentations/` prefix.

### Local Preview Path Issues

**Symptom**: CSS/JS not loading on local server, or 404 errors for presentations

**Cause**: basePath `/my-presentations` not matching server structure

**Fix**: Use the directory structure approach:
```bash
mkdir -p temp-server/my-presentations
cp -r out/* temp-server/my-presentations/
cd temp-server && npx serve -p 8001
# Access at http://localhost:8001/my-presentations/
```

### Submodule Issues

**Symptom**: `reveal.js/` directory is empty or outdated

**Fix**:
```bash
git submodule update --init --recursive
```

**Symptom**: Changes in `reveal.js/` show up in git status

**Cause**: Accidental edits to submodule files

**Fix**: Reset submodule to tracked commit:
```bash
cd reveal.js/
git reset --hard
cd ..
```

## Code Style

- **TypeScript**: Strict mode enabled, use explicit types
- **React 19**: Functional components with Server Components by default
- **Imports**: Use `@/*` path alias for project imports
- **Styling**: Tailwind utility classes, use `cn()` from `lib/utils/cn.ts` for conditional classes
- **Component Organization**: Export UI components through `lib/ui/index.ts` barrel file

## Important Files

- `next.config.js` - basePath and static export configuration
- `scripts/copy-presentations.js` - Post-build presentation copy logic
- `app/page.tsx` - Presentation gallery with filtering/search
- `.github/workflows/deploy.yml` - Automated GitHub Pages deployment
- `presentations/` - Source presentation files (not tracked in git)
