# Runners Hub - Custom Homepage

A cyberpunk-themed custom homepage with dynamic themes, quick links, notes widget, and voice search functionality.

## Features

- **Four Dynamic Themes**: Switch between Neon (yellow), Calm (blue), Purple (blue-purple gradient), and Purplefull (all purple)
- **Voice Search**: Click the microphone icon to search using voice commands
- **Quick Links**: Organized categories (Personal, Streaming, Work, Social) with favicon integration
- **Notes Widget**: Take notes with voice-to-text support and localStorage persistence
- **Apple Music Widget**: Quick access to Apple Music playlists
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile

## Technologies Used

- HTML5
- CSS3 (CSS Variables, Grid, Flexbox, Gradients)
- Vanilla JavaScript (ES6+)
- Web Speech API for voice recognition
- localStorage for data persistence
- Custom Bruno Ace SC font for cyberpunk aesthetic

## File Structure

```
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # All styling and theme definitions
├── js/
│   └── script.js       # All JavaScript functionality
├── BrunoAceSC-Regular.ttf  # Custom font
├── cyberpunk-3840x2160-16145.jpg  # Background image
└── README.md           # This file
```

## Theme System

The homepage includes four distinct themes that can be toggled via the button in the bottom-right corner:

1. **Neon** - Yellow accents with cyberpunk glow effects
2. **Calm** - Blue gradient theme for a cooler look
3. **Purple** - Blue-to-purple gradient with dual-color styling
4. **Purplefull** - All purple for maximum purple vibes

Theme preference is saved in localStorage and persists across sessions.

## Quick Links Categories

- **Personal**: Entertainment and streaming services
- **Streaming**: Stream management and content creation tools
- **Work**: Productivity and school-related links
- **Social**: Social media platforms


## Voice Features

- **Voice Search**: Click the microphone in the search bar to perform voice searches
- **Voice Notes**: Dictate notes using the voice button in the notes widget
- Browser must support Web Speech API (Chrome, Edge, Safari recommended)

## Browser Compatibility

- Best experience on modern browsers (Chrome, Edge, Firefox, Safari)
- Webkit prefixes included for gradient text effects
- Fallback UI for browsers without voice recognition support

## Setup

1. Open `index.html` in your web browser
2. Customize the `linkData` object in `js/script.js` with your own links
3. Replace the background image and profile photo as desired
4. Adjust CSS variables in `styles.css` for custom colors

## Customization

### Adding New Links

Edit the `linkData` object in `js/script.js`:

```javascript
const linkData = {
  personal: [
    { name: 'Your Site', url: 'https://example.com' }
  ]
};
```

### Changing Theme Colors

Edit CSS variables in `styles.css`:

```css
body.neon {
  --accent: #fee801;
  --accent-2: #9a9f17;
  --text: #fee801;
}
```

## License

Personal project - Feel free to use and modify for your own custom homepage!

---

**Created by:** Jaron  
**Last Updated:** March 2026
