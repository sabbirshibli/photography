# Sabbir — Photography

A minimalist, album-based photography portfolio. Static site — no build step, no backend. Two demo albums (Prague, Lisbon) are included with placeholder images so you can see the structure; replace them with your own.

## Structure

```
index.html          → the whole site (home + album view, one page)
css/style.css        → all styling
js/app.js             → renders albums, handles routing, lightbox
data/albums.js        → the ONLY file you usually need to edit
images/<album-slug>/  → your actual photo files
```

## Adding a new album

1. Export from Lightroom as normal — full size, no manual resizing needed.
2. Create a folder: `images/your-city/`
3. Add a `cover.jpg` (shown on the homepage) and your numbered photos, e.g. `01.jpg`, `02.jpg`.
4. Open `data/albums.js` and add a new entry:

```js
{
  id: "your-city",
  title: "Your City",
  subtitle: "Country",
  category: "Landscape",   // or "Architecture"
  cover: "images/your-city/cover.jpg",
  photos: [
    { src: "images/your-city/01.jpg", caption: "Short caption" },
    { src: "images/your-city/02.jpg", caption: "Another caption" }
  ]
}
```

5. Commit and push. That's it — no build step, no manual resizing.

```bash
git add .
git commit -m "Add your-city album"
git push
```

## About image optimization

You don't need to resize photos yourself. A GitHub Action (`.github/workflows/optimize-images.yml`) runs automatically on every push that touches `images/`: it resizes anything over 2000px on the long edge and compresses JPEGs to ~82% quality, then commits the optimized versions back to the repo for you (you'll see a second automatic commit from `image-optimizer-bot` a minute or two after your push).

So the actual workflow is just: **export from Lightroom → drop files into `images/<album>/` → commit → push.** Nothing in between.

Note: your first push of a new album will briefly be at full export size until the bot's follow-up commit lands — for a portfolio site with occasional updates this is a total non-issue, but if you want the pages to always be optimized immediately, resize before committing using [squoosh.app](https://squoosh.app) as a manual fallback.

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `photography`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

Every time you `git push` after adding a new album, the live site updates automatically — no separate deploy step.

## Before going live

- [ ] Replace the placeholder photos in `images/prague/` and `images/lisbon/` (or delete those two albums from `data/albums.js` and the folders)
- [ ] Update the Instagram and email links in `index.html` (search for `@your.handle` and `hello@example.com`)
- [ ] Edit the About section bio text in `index.html` to sound like you
- [ ] Swap the page title/description in the `<head>` of `index.html`
