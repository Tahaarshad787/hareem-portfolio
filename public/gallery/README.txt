Gallery (optional) — static files

Vite serves only what is inside this folder on the site as /gallery/...

Recommended instead: use src/assets/gallery/<slug>/ in the repo — those images
bundle with the app and always work on Vercel. See src/assets/gallery/README.txt

If you use this public folder, path example:
  public/gallery/chinese-tapestry-bedding/cover.png
  → opens as http://localhost:5173/gallery/chinese-tapestry-bedding/cover.png

Do NOT put images only inside dist/ — dist is build output and gets overwritten.
