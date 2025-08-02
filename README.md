# Weather App

A modern, responsive weather application built with React and TypeScript, featuring dynamic glassmorphism design and real-time weather data.

## 🌟 Live Demo

**[View Live Demo](https://weather-t14x.netlify.app/)**

## ✨ Features

### 🌤️ Weather Information
- **Current Weather** - Real-time temperature, conditions, and weather details
- **7-Day Forecast** - Extended weather predictions with daily highs/lows
- **Location Detection** - Automatic weather for your current location
- **Global Search** - Weather data for any city worldwide

### 🎨 Dynamic Design
- **Day/Night Themes** - Adaptive glassmorphism based on local time
- **Dynamic Backgrounds** - Weather-specific images that change with conditions
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Elegant transitions and hover effects

### 🔧 User Experience
- **Temperature Units** - Toggle between Celsius and Fahrenheit
- **Custom Weather Icons** - Colorful emoji-based weather representations
- **Real-time Updates** - Live weather data from OpenWeatherMap API
- **Error Handling** - Graceful fallbacks and user-friendly error messages

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with Glassmorphism effects
- **API**: OpenWeatherMap API
- **Deployment**: Netlify
- **Icons**: Custom emoji weather icons

## 🎯 Design Philosophy

### Glassmorphism Adaptation
- **Bright Backgrounds** → Dark glassmorphism for optimal contrast
- **Dark Backgrounds** → Light glassmorphism for elegant visibility

### Responsive Typography
- **Viewport-based sizing** using `clamp()` for perfect scaling
- **Minimum font sizes** ensure readability on all devices

### Weather-Driven Experience
- Background images automatically change based on:
  - Current weather conditions (sunny, rainy, snowy, cloudy)
  - Time of day (day/night variations)
  - Real sunrise/sunset data for accurate timing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/t14xploit/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   echo "VITE_API=your_openweathermap_api_key" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Features Overview

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | City-based weather lookup with autocomplete |
| 📍 **Geolocation** | One-click weather for current location |
| 🌡️ **Unit Toggle** | Seamless Celsius/Fahrenheit switching |
| 📊 **Detailed Metrics** | Humidity, wind speed, pressure, visibility |
| 📅 **Extended Forecast** | 7-day weather predictions |
| 🎨 **Adaptive UI** | Day/night glassmorphism themes |
| 📱 **Mobile First** | Responsive design for all screen sizes |

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using modern web technologies**
