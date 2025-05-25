# Curve Shift — Coming Soon

A clean, minimal "coming soon" page for Curve Shift - a real-time AI assistant for sales teams.

## 🚀 Quick Start

This is a static HTML website ready for deployment on Netlify.

### Local Development

1. Clone this repository
2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .
   ```

### 🌐 Deploy to Netlify

#### Option 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder to the deploy area
3. Your site will be live instantly!

#### Option 2: Git Integration (Recommended)
1. Push this code to a GitHub repository
2. Connect your GitHub account to Netlify
3. Select this repository for deployment
4. Netlify will automatically deploy on every push

#### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 📁 Project Structure

```
askcurveshift.ai/
├── index.html          # Main webpage (uses Tailwind CSS)
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

## 🎨 Customization

- Edit `index.html` to modify content and styling
- Modify `netlify.toml` for deployment settings
- Styling is handled by Tailwind CSS classes in the HTML

## ✨ Features

- Clean, minimal design
- Responsive layout
- Email signup form
- Tailwind CSS for styling
- Ready for Netlify deployment