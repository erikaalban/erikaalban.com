# Erika Alban - Pool Player Website

Personal website for competitive pool player Erika Alban, showcasing achievements, tournament wins, and photos from the NYC pool scene.

## 🎱 Features

- **About Section**: Bio and FargoRate information
- **Titles & Achievements**: Comprehensive list of tournament wins and accomplishments with filterable categories (Title, 1st Place, Runner-Up)
- **Photo Gallery**: Interactive photo gallery using PhotoSwipe lightbox
- **Contact Form**: Email contact form for inquiries via FormSubmit.co
- **Social Media Links**: Instagram and Facebook links with SVG icons
- **Responsive Design**: Mobile-friendly with hamburger menu navigation
- **Custom Domain**: Configured for `erikaalban.com`
- **Analytics**: Google Analytics 4 integration for tracking user interactions

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with responsive design
- **JavaScript**: Vanilla JS for interactivity
- **PhotoSwipe**: Lightbox gallery library
- **FormSubmit.co**: Contact form submission service

## 📁 Project Structure

```text
erikaalban.com/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript functionality
├── images/
│   ├── hero.jpg        # Hero section background
│   └── photos/         # Gallery images (01-12.jpg)
├── package.json        # Node.js dependencies and scripts
├── Makefile            # Development commands
├── CNAME               # Custom domain configuration
└── README.md           # This file
```

## 🚀 Deployment

This site is deployed on GitHub Pages and accessible at:

- **Custom Domain**: <https://erikaalban.com>
- **GitHub Pages**: <https://erikaalban.github.io/erikaalban.com/>

### GitHub Pages Configuration

1. Repository: `erikaalban/erikaalban.com`
2. Branch: `main`
3. Source: `/ (root)`
4. Custom Domain: `erikaalban.com` (configured via CNAME)

## 📝 Development

To run locally, simply open `index.html` in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

### Code Quality

This project uses Prettier for formatting and ESLint/Stylelint for linting:

```bash
# Install dependencies
make install
# or
npm install

# Format code
make format
# or
npm run format

# Lint code
make lint
# or
npm run lint

# Auto-fix issues
make fix
# or
npm run lint:fix
```

The GitHub Actions workflow automatically formats and lints code on push, creating PRs for any changes.

## 📧 Contact Form

The contact form uses FormSubmit.co to send emails to `erikalban12@gmail.com`. No backend required!

## 📊 Analytics

The site uses Google Analytics 4 (GA4) to track page views, user sessions, navigation clicks, contact form submissions, photo gallery interactions, menu toggles, and scroll depth.

## 📄 License

All rights reserved. Personal website content.
