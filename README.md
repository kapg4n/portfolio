# Portfolio website

A single-page portfolio for an independent graphic designer: big name wordmark, selected work list with hover previews, project pages, services, about and contact. Plain HTML, CSS and JavaScript. No build step, no framework.

## Structure

```
index.html        page skeleton
css/style.css     all styling (colours and fonts are at the top)
js/content.js     ALL text, projects and links  <- edit this
js/main.js        rendering and interactions
images/           put project images and the portrait here
```

## Editing content

Everything you see on the site comes from `js/content.js`. Change the name, email, services, about text and projects there.

To add images to a project, drop the files into `images/` and list them:

```js
images: ["images/olea-1.jpg", "images/olea-2.jpg", "images/olea-3.jpg"]
```

The first image becomes the hover preview in the work list and the wide header image on the project page. Portrait-format images (4:5) work best for the rest. Until a project has images, a colour panel using `color` and `ink` is shown.

Each project gets its own link, e.g. `yourdomain.com/#work/olea-bakery`, which can be shared directly.

## Changing the look

Colours and fonts are variables at the top of `css/style.css` (`--paper`, `--ink`, `--accent`, `--font`). A dark version is included and switches automatically with the visitor's system setting.

## Running locally

Open `index.html` in a browser, or run a small server:

```
python3 -m http.server 8000
```

## Publishing (free)

GitHub Pages: push this folder to a GitHub repository, then go to Settings > Pages, choose the `main` branch and the root folder. The site appears at `username.github.io/repo-name`. A custom domain can be added on the same settings page.

Netlify: drag the folder onto app.netlify.com/drop.

## Before going live

- Replace every placeholder in `js/content.js` (name, email, socials, projects are all examples).
- Compress images (aim for under 400 KB each, 2000 px on the long side).
- Update the `<meta name="description">` in `index.html`.
