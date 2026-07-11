

A professional, responsive personal portfolio built with HTML5, CSS3, and vanilla JavaScript.

## Included Pages

- `index.html` - Home
- `about.html` - About
- `projects.html` - Filterable project gallery and accessible detail modal
- `experience.html` - Professional vertical timeline
- `skills.html` - Technical, software, and professional skills
- `contact.html` - Contact information and front-end validated form

## Main Features

- Responsive desktop, tablet, and mobile layouts
- Sticky navigation with active-page indicator
- Mobile hamburger navigation
- Light and dark mode saved in `localStorage`
- Loading screen and page transitions
- Reveal-on-scroll animation
- Project category filter
- Project detail modal
- Animated skill-level bars
- Contact form validation
- Scroll-to-top button
- Semantic HTML, accessible labels, keyboard support, and SEO metadata

## How to Use

1. Extract the `finka-portfolio` folder.
2. Open `index.html` in a modern browser.
3. No installation or build step is required.

For the most reliable local preview, you may also run a simple local server from the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Replace the Placeholder Content

### Profile Photos

Replace these files while keeping the same names:

- `assets/images/profile.jpg`
- `assets/images/about-profile.jpg`

Recommended format: JPG, portrait orientation, at least 1200 x 1500 pixels.

### Project Images

Replace `project-1.jpg` through `project-5.jpg` in `assets/images/`.

Recommended format: JPG, landscape orientation, at least 1600 x 1000 pixels.

### CV

Replace:

- `assets/documents/finka-aura-fauzi-cv.pdf`

The download links already point to this file.

### Contact Information

Search the HTML files for these placeholders and replace them:

- `finka@example.com`
- `+62 000 0000 0000`
- `linkedin.com/in/finkaaurafauzi`
- `@yourusername`
- Social links that currently use `href="#"`

### Experience Dates and Details

The experience page includes editable placeholders such as `20XX`. Replace them with verified information before publishing.

## Contact Form Delivery

The form currently performs front-end validation only. It does not send email by itself. Connect it to one of the following:

- Formspree
- EmailJS
- A custom server or serverless function

## Customize the Design

The main design variables are at the top of `css/style.css` under `:root`. Edit the colors, radii, shadows, spacing, or container width there.

## Deployment Options

This static website can be published through:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any standard web hosting service

## Technology

- HTML5
- CSS3
- Vanilla JavaScript

No frameworks, external libraries, package managers, or build tools are required.
