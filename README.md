# T²-Splat Project Website

Project page for **T²-Splat: Adaptive Topology Mesh Splatting with Texture Residuals**.

- Website: https://t2-splat.github.io/
- Research code: https://github.com/t2-splat/T2Splat

## Local preview

This is a static website with no build step or package dependencies. From the repository root, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/.

## Files

- `index.html`: project information, results tables, paper links, and BibTeX.
- `assets/css/site.css`: page layout and responsive styles.
- `assets/js/site.js`: image comparisons, filtering, and citation copying.
- `assets/comparisons/` and `assets/images/`: comparison images and research figures.
- `assets/papers/t2-splat.pdf`: paper.
- `assets/video/overview.mp4`: project video.
- `assets/manifest.json`: media provenance and checksums.

## Deployment

GitHub Pages serves the repository root on the `main` branch. Keep `.nojekyll` and the asset directory structure when updating the website.
