# Write the Docs: History API Editing Comparison Site

This site displays multiple versions of the MDN History API documentation, edited by different contributors as part of a Write the Docs community editing exercise.

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev
# Open http://localhost:4321

# Build for production
npm run build
```

## Adding New Submissions

1. Add your edited Markdown file to `src/content/submissions/`
   - Name it something like `yourname.md`
   - Must include frontmatter with `title:` field

2. (Optional) Add your editing notes
   - Create `yourname-notes.md` in the same directory
   - This will show as a highlighted section at the top

### Example File Structure

```
src/content/submissions/
├── sarah.md              # Edited version
├── sarah-notes.md        # Editing approach notes
├── john.md              # Another person's version
└── john-notes.md        # Their notes
```

## MDN Syntax Conversion

The site automatically converts MDN-specific syntax to standard HTML:

- `{{domxref("History")}}` → Link to MDN API docs
- `{{Glossary("SPA")}}` → Link to MDN glossary with abbr tag
- `{{httpheader("Referer")}}` → `<code>Referer</code>`
- `{{DefaultAPISidebar()}}` → Removed (not needed)

## Deployment

### Netlify (Recommended)

1. Push this repo to GitHub
2. Connect to Netlify
3. Settings are already configured in `netlify.toml`
4. Deploy!

Participants can submit their versions via:
- Pull requests to the repo
- Email/Slack the `.md` files to you

### Other Platforms

- **Vercel**: Works out of the box, no config needed
- **GitHub Pages**: Add `site: 'https://yourusername.github.io/repo-name'` to `astro.config.mjs`

## How It Works

1. Reads all `.md` files from `src/content/submissions/`
2. Converts MDN syntax using regex in `src/utils/mdnConverter.ts`
3. Renders with `marked` to HTML
4. Displays in tabs with styling

## Customization

### Styling

Edit the `<style>` block in `src/pages/index.astro`

### Add More MDN Syntax Support

Edit `src/utils/mdnConverter.ts` and add more regex patterns

## Credits

Built with:
- [Astro](https://astro.build) - Static site generator
- [marked](https://marked.js.org) - Markdown parser
