# Write the Docs: History API Editing Comparison Site

This site displays multiple versions of the MDN History API documentation, edited by different contributors as part of a Write the Docs October 2025 editing exercise.

## Run this site locally

```bash
# Install dependencies
npm install

# Run locally
npm run dev
# Open http://localhost:4321/october-2025-history-api
```

## Add new submissions

1. Add your edited Markdown file to `src/content/oct-2025/submissions/`
   - Name it with a number like `5.md`, `6.md`, etc.
   - Must include frontmatter with these fields:
     ```yaml
     ---
     title: Your Article Title
     slug: Web/API/History_API/Working_with_the_History_API
     page-type: guide
     ---
     ```

2. (Optional) Add your editing notes
   - Create `5-notes.md` (matching your submission number)
   - This will show as a "Notes" tab at the bottom of your version
   - Notes files don't need frontmatter

### Example file structure

```
src/content/oct-2025/submissions/
├── 1.md                 # First edited version
├── 1-notes.md           # Editing approach notes
├── 2.md                 # Second version
├── 2-notes.md           # Their notes
├── 3.md
├── 3-notes.md
└── 4.md
```

## MDN syntax conversion

The site automatically converts MDN-specific syntax to standard HTML:

- `{{domxref("History")}}` → Link to MDN API docs
- `{{Glossary("SPA")}}` → Link to MDN glossary with abbr tag
- `{{httpheader("Referer")}}` → `<code>Referer</code>`
- `{{DefaultAPISidebar()}}` → Removed (not needed)

## How it works

1. Content collection is defined in `src/content.config.ts`
2. Page uses `Astro.glob()` to load all `.md` files from `src/content/oct-2025/submissions/`
3. Files are separated into main submissions and notes based on filename
4. MDN syntax is converted using regex in `src/utils/mdnConverter.ts`
5. Markdown is rendered to HTML with `marked`
6. Submissions are displayed in tabs with syntax highlighting via Prism.js
7. Notes appear in a separate tab at the bottom of each version
