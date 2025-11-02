# Quick Setup Guide for Write the Docs Organizer

## What You've Got

A comparison website that:
- ✅ Converts MDN syntax (`{{domxref}}`, etc.) to regular HTML
- ✅ Displays multiple participant versions in tabs
- ✅ Shows each person's editing notes
- ✅ Styled and ready to deploy
- ✅ Your edited version already included as an example

## Next Steps

### 1. Push to GitHub

```bash
cd comparison-site
git init
git add .
git commit -m "Initial comparison site setup"
gh repo create wtd-history-api-comparison --public --source=. --push
```

### 2. Deploy to Netlify

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repo
4. Click "Deploy" (settings are auto-detected from `netlify.toml`)
5. Done! You'll get a URL like `wtd-history-api-comparison.netlify.app`

### 3. Collect Submissions

Ask participants to send you:
- Their edited `.md` file (e.g., `john.md`)
- (Optional) Their notes file (e.g., `john-notes.md`)

### 4. Add Submissions

```bash
# Copy their files
cp ~/Downloads/john.md src/content/submissions/
cp ~/Downloads/john-notes.md src/content/submissions/

# Commit and push
git add src/content/submissions/
git commit -m "Add John's submission"
git push
```

Netlify will auto-deploy in ~1 minute!

## Alternative: Let Them Submit via PR

1. Participants fork your repo
2. They add their files to `src/content/submissions/`
3. They open a PR
4. You merge → auto-deploys

## Test Locally

```bash
npm install
npm run dev
# Open http://localhost:4321
```

## Troubleshooting

**MDN syntax not converting?**
- Check `src/utils/mdnConverter.ts`
- Add more regex patterns if needed

**Styling looks off?**
- Edit `src/pages/index.astro` (all CSS is in the `<style>` block)

**Want to customize?**
- See README.md for full details

## Share With Participants

Send them:
1. The deployed URL
2. Instructions to submit their `.md` files to you
3. Let them know their editing notes will be displayed if they include a `-notes.md` file

That's it! 🎉
