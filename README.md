# 🌟 Smart Medication Schedule Calculator

A free, privacy-first web application that calculates optimal medication timing based on your daily routine. Built with vanilla HTML, CSS, and JavaScript - no frameworks, no tracking, no accounts required.

## ✨ Features

- **🔒 Privacy First**: No data collection, everything runs locally in your browser
- **⚡ Instant Results**: Get personalized medication schedules in seconds
- **📱 Mobile Friendly**: Responsive design works on all devices
- **🎯 Smart Scheduling**: Ensures last dose is ≥3 hours before bedtime
- **🔧 Flexible**: Supports 1-10 daily doses with editable times
- **🌍 Universal**: Works for prescriptions, vitamins, supplements
- **💰 100% Free**: No signup, no ads, no limitations

## 🚀 Live Demo

Try it now: **[https://www.meditimecalculator.top](https://www.meditimecalculator.top)**

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid & Flexbox
- **No Build Process**: Clone and deploy
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Performance**: ~50KB total size, loads in <1s

## 📦 Quick Start

### Option 1: Clone & Run Locally

```bash
git clone https://github.com/rockneu/PTP_MedTimeCalculator.git
cd PTP_MedTimeCalculator
# Open index.html in browser or serve with any static server
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: Deploy to Static Host

1. Fork this repository
2. Deploy to your preferred static host:
   - **GitHub Pages**: Push to `gh-pages` branch
   - **Netlify**: Drag & drop the folder
   - **Vercel**: Import from GitHub
   - **Cloudflare Pages**: Connect repository

## 🎯 Usage

1. **Set Schedule**: Enter your wake-up time and bedtime
2. **Choose Doses**: Select 1-10 daily medication doses
3. **Get Schedule**: Instantly see recommended times
4. **Edit Times**: Click any time to adjust manually
5. **Save/Share**: Bookmark or screenshot your schedule

## 📁 Project Structure

```
PTP_MedTimeCalculator/
├── index.html          # Main application
├── style.css          # Styling & responsive design
├── javascript.js      # Scheduling logic & interactions
├── robots.txt         # SEO configuration
├── sitemap.xml        # Site map for search engines
└── README.md          # This file
```

## 🧪 Development

### Key Functions

- `calculateSchedule()`: Main scheduling algorithm
- `roundToNearestHalfHour()`: Time rounding utility
- `generateTimeSlots()`: Creates evenly spaced intervals
- `validateInputs()`: User input validation

### Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

Contributions welcome! Feel free to:

- Report bugs via [GitHub Issues](https://github.com/rockneu/PTP_MedTimeCalculator/issues)
- Submit pull requests
- Suggest new features
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the open source community
- Inspired by real-world medication management challenges
- Designed with accessibility and privacy in mind

---

**⭐ Star this repo if you find it helpful!**