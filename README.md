# Scientific Calculator

A modern, responsive scientific calculator web application with beautiful design, smooth animations, and comprehensive functionality. Works seamlessly on desktop, tablet, and mobile devices.

![Calculator Preview](preview.png)

## ✨ Features

### 🧮 Calculation Capabilities
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Scientific Functions**:
  - Trigonometric: sin, cos, tan, asin, acos, atan
  - Logarithmic: ln (natural log), log (base 10)
  - Exponential: e^x, 10^x
  - Powers & Roots: x², x³, x^y, √x, ∛x
  - Special: factorial (!), reciprocal (1/x), absolute value
- **Constants**: π (pi), e (Euler's number)
- **Memory Functions**: M+, M-, MR, MC
- **Expression Support**: Parentheses for complex calculations
- **Angle Modes**: Degree (DEG) and Radian (RAD)

### 🎨 Design & UX
- **Modern UI**: Glassmorphism effects with smooth gradients
- **Dark/Light Theme**: Automatic system detection with manual toggle
- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Micro-interactions and transitions
- **Haptic Feedback**: Vibration on button press (mobile)
- **Beautiful Typography**: Custom fonts for enhanced readability

### 💾 Advanced Features
- **Calculation History**: Stores last 50 calculations
- **Offline Support**: Works without internet (PWA)
- **Keyboard Support**: Full keyboard input for desktop
- **Memory Persistence**: Remembers history, memory, and theme
- **Touch Optimized**: Swipe gestures and responsive buttons

### 📱 Progressive Web App (PWA)
- **Installable**: Add to home screen on mobile and desktop
- **Offline-First**: Service worker caching for offline use
- **Fast Loading**: Optimized performance
- **Cross-Platform**: One app for all devices

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for PWA features)

### Installation & Running

#### Option 1: Simple Local Server (Python)
```bash
# Navigate to the project directory
cd calc

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser to `http://localhost:8000`

#### Option 2: Node.js Local Server
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to project directory
cd calc

# Start the server
http-server -p 8000
```

Then open your browser to `http://localhost:8000`

#### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Open the `calc` folder in VS Code
3. Right-click on `index.html` and select "Open with Live Server"

### Installing as PWA

#### On Desktop (Chrome/Edge):
1. Open the calculator in your browser
2. Click the install icon (⊕) in the address bar
3. Click "Install" in the prompt
4. The app will open in its own window

#### On Mobile (Android):
1. Open the calculator in Chrome
2. Tap the menu (⋮) → "Add to Home screen"
3. Tap "Add"
4. The app icon will appear on your home screen

#### On Mobile (iOS):
1. Open the calculator in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

## 🎮 Usage

### Basic Calculations
- Click number buttons or use your keyboard
- Click operators (+, -, ×, ÷) to perform operations
- Press = or Enter to calculate result
- Press C or Escape to clear

### Scientific Functions
- Click "2nd" button to access secondary functions (asin, acos, atan, etc.)
- Toggle between DEG/RAD modes for trigonometric functions
- Use parentheses for complex expressions

### Memory Functions
- **M+**: Add current value to memory
- **M-**: Subtract current value from memory
- **MR**: Recall memory value
- **MC**: Clear memory
- Memory indicator (M) appears when memory has a value

### History
- Click the 📋 button to view calculation history
- Click any history item to recall that result
- Click "Clear History" to delete all history

### Keyboard Shortcuts
- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Decimal**: . (period)
- **Equals**: Enter or =
- **Clear**: Escape or C
- **Backspace**: Backspace/Delete
- **Percentage**: %

## 📂 Project Structure

```
calc/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # Design system variables
│   ├── base.css           # Base styles
│   ├── components.css     # Component styles
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Application entry point
│   ├── calculator.js      # Calculator logic
│   ├── display.js         # Display management
│   ├── history.js         # History functions
│   ├── memory.js          # Memory functions
│   ├── keyboard.js        # Keyboard handler
│   └── theme.js           # Theme management
├── assets/
│   └── icons/             # PWA icons
└── README.md              # This file
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: No frameworks, pure ES6+ modules
- **PWA**: Progressive Web App capabilities
- **Local Storage**: Data persistence

## 🌟 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
- Samsung Internet 14+

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+
- **Landscape**: Optimized for landscape orientation

## 🎨 Design Features

- **Glassmorphism**: Semi-transparent panels with backdrop blur
- **Gradients**: Smooth color transitions
- **Animations**: Fade, slide, and ripple effects
- **Dark Theme**: Default dark mode with light theme option
- **Typography**: Inter font for UI, JetBrains Mono for numbers

## 🔒 Privacy

- All data stored locally in browser (localStorage)
- No external API calls or tracking
- Works completely offline
- No data collection or analytics

## 🐛 Known Limitations

- Expression parser doesn't support complex nested parentheses (planned for future)
- Floating-point precision limitations (standard JavaScript limitation)
- Very large factorials (>170) will throw an error

## 🚧 Future Enhancements

- [ ] Graph plotting capabilities
- [ ] Unit conversions
- [ ] Expression history editing
- [ ] Advanced parentheses support
- [ ] Scientific notation input
- [ ] Custom themes
- [ ] Export history to CSV

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

To modify or extend the calculator:

1. Edit the JavaScript modules in `js/` directory
2. Update styles in `css/` directory
3. Test on multiple browsers and devices
4. Update service worker cache version when making changes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

**Enjoy calculating! 🎉**

For issues or questions, please open an issue on the repository.
