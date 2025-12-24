# Erika Alban - Pool Player Website

Personal website for competitive pool player Erika Alban, showcasing achievements, tournament wins, and photos from the NYC pool scene.

## 🎱 Features

- **About Section**: Bio and FargoRate information
- **Titles & Achievements**: Comprehensive list of tournament wins and accomplishments
- **Photo Gallery**: Interactive photo gallery using PhotoSwipe
- **Contact Form**: Email contact form for inquiries
- **Responsive Design**: Mobile-friendly with hamburger menu navigation
- **Custom Domain**: Configured for `erikaalban.com`

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
│   ├── hero.png        # Hero section background
│   └── photos/         # Gallery images (01-12.jpg)
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

## 📧 Contact Form

The contact form uses FormSubmit.co to send emails to `erikalban12@gmail.com`. No backend required!

## 📄 License

All rights reserved. Personal website content.
