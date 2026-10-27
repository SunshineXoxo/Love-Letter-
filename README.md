# For Thandeka 💗

A responsive love-letter website built with plain HTML, CSS and JavaScript.

## Run it
1. Extract the ZIP.
2. Open `index.html` in a browser.
3. For editing, open the folder in VS Code. You can use the Live Server extension for a local preview.

## Personalize the photo gallery
The gallery displays the photos in `images/`. To add or replace a photo, copy it into that folder and add an image entry in `index.html`, for example:

```html
<div class="photo-gallery">
  <figure><img src="images/us-1.jpg" alt="A favourite photo of us"><figcaption>My favourite kind of day 💗</figcaption></figure>
  <figure><img src="images/ice-cream-date.jpg" alt="Our ice cream date"><figcaption>One scoop closer 🍦</figcaption></figure>
  <figure><img src="images/locs-selfie.jpg" alt="Us with our locs"><figcaption>My favourite duo 🌹</figcaption></figure>
</div>
```

## Notes
- The anniversary letter and quiz use the details provided so far.
- The “little soundtrack” control is a visual toggle; it does not play audio. This avoids surprise autoplay and external audio dependencies.
- The page uses Google Fonts when internet is available, with sensible fallback fonts.
- To publish, you can use GitHub Pages, Netlify, or Vercel.
