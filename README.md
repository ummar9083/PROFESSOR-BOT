# VideoScroll - TikTok-like Short Video Platform

A modern, responsive short video scrolling platform built with HTML, CSS, and JavaScript that mimics TikTok's user interface and functionality.

## 🚀 Features

### 📱 Core Functionality
- **Vertical Video Scrolling**: Smooth scroll-snap navigation between videos
- **Auto-play/Pause**: Videos automatically play when in view and pause when scrolled away
- **Touch & Gesture Support**: Full mobile touch support with swipe gestures
- **Keyboard Controls**: Arrow keys for navigation, spacebar for play/pause
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎯 User Interface
- **Modern Dark Theme**: TikTok-inspired dark interface with gradient accents
- **Navigation Bar**: Search functionality, upload button, and profile access
- **Side Navigation**: Quick access to For You, Following, Trending, and Music sections
- **Video Overlay**: User information, descriptions, and music details
- **Action Buttons**: Like, comment, share, and bookmark functionality

### 🎮 Interactive Controls
- **Video Controls**: Play/pause, progress bar, and volume toggle
- **Like System**: Animated heart reactions with count updates
- **Share Functionality**: Native Web Share API with clipboard fallback
- **Bookmark Feature**: Save videos for later viewing
- **Comments System**: Simulated comment viewing functionality

### 🎨 Visual Effects
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Loading States**: Skeleton loading animation for better UX
- **Custom Scrollbar**: Styled scrollbar for desktop users
- **Backdrop Blur**: Modern glass-morphism effects
- **Gradient Branding**: Eye-catching logo and accent colors

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and video elements
- **CSS3**: Modern styling with flexbox, grid, animations, and custom properties
- **JavaScript ES6+**: Class-based architecture with modern features
- **Font Awesome**: Icon library for UI elements
- **Web APIs**: Intersection Observer, Web Share API, Clipboard API

## 📁 File Structure

```
📦 VideoScroll
├── 📄 index.html          # Main HTML structure
├── 📄 styles.css          # CSS styling and animations
├── 📄 script.js           # JavaScript functionality
└── 📄 README.md          # Documentation
```

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open `index.html`** in a modern web browser
3. **Start Exploring** the video feed immediately!

### Browser Requirements
- **Modern Browser**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **JavaScript Enabled**: Required for full functionality
- **Internet Connection**: Needed for video content and icons

## 🎮 How to Use

### Navigation Controls
- **Mouse Wheel**: Scroll up/down to navigate between videos
- **Touch Gestures**: Swipe up/down on mobile devices
- **Keyboard Shortcuts**:
  - `↑/↓ Arrow Keys`: Navigate between videos
  - `Spacebar`: Play/pause current video
  - `L`: Like current video
  - `M`: Mute/unmute current video

### Video Interactions
- **Click Video**: Play/pause toggle
- **Click Progress Bar**: Seek to specific time
- **Like Button**: Toggle like with animation
- **Share Button**: Share video (native sharing or copy link)
- **Bookmark**: Save video for later
- **Comments**: View simulated comments

### Mobile Experience
- **Touch Navigation**: Swipe up/down for video navigation
- **Responsive Layout**: Optimized interface for mobile screens
- **Touch-friendly Buttons**: Larger touch targets for better usability

## 🎨 Customization

### Adding Your Own Videos
Replace the sample videos in `script.js`:

```javascript
const sampleVideos = [
    {
        id: 1,
        videoSrc: 'path/to/your/video.mp4',
        userAvatar: 'path/to/avatar.jpg',
        username: 'your_username',
        description: 'Your video description',
        music: 'Music name',
        likes: '1.2K',
        comments: '89',
        shares: '23'
    }
    // Add more videos...
];
```

### Styling Customization
Modify colors and themes in `styles.css`:

```css
:root {
    --primary-color: #ff0050;    /* Main accent color */
    --background-color: #000;    /* Background color */
    --text-color: #fff;          /* Text color */
    --overlay-color: rgba(0, 0, 0, 0.8); /* Video overlay */
}
```

## 🌟 Key Features Explained

### Scroll-Snap Navigation
Uses CSS `scroll-snap-type: y mandatory` for smooth, TikTok-like scrolling that snaps to each video.

### Intersection Observer
Efficiently detects which video is in view to auto-play/pause without performance issues.

### Touch Gesture Support
Comprehensive touch event handling for mobile swipe gestures with threshold detection.

### Progressive Enhancement
Works with basic functionality even if JavaScript is disabled, with enhanced features when enabled.

## 🔧 Technical Implementation

### Video Management
- **Auto-play Logic**: Only one video plays at a time
- **Performance Optimization**: Pauses off-screen videos to save resources
- **Loading States**: Smooth loading experience with skeleton animations

### Event Handling
- **Debounced Scrolling**: Prevents rapid scroll events from causing issues
- **Touch Event Optimization**: Efficient touch handling for mobile devices
- **Keyboard Accessibility**: Full keyboard navigation support

### State Management
- **Video State Tracking**: Tracks current video, play state, and user interactions
- **Like/Bookmark State**: Persistent interaction states during session
- **Navigation State**: Active tab and section tracking

## 📱 Mobile Optimization

- **Responsive Breakpoints**: Optimized for screens from 320px to 1920px+
- **Touch-First Design**: Mobile-optimized button sizes and spacing
- **Performance**: Efficient rendering and minimal resource usage
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🎯 Future Enhancements

Potential features for expansion:
- User authentication and profiles
- Video upload functionality
- Real-time comments and interactions
- Follow/unfollow system
- Video search and filtering
- Infinite scroll with dynamic loading
- Video effects and filters
- Push notifications

## 🐛 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Video Playback | ✅ | ✅ | ✅ | ✅ |
| Scroll Snap | ✅ | ✅ | ✅ | ✅ |
| Intersection Observer | ✅ | ✅ | ✅ | ✅ |
| Web Share API | ✅ | ❌ | ✅ | ✅ |
| Backdrop Filter | ✅ | ✅ | ✅ | ✅ |

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy your TikTok-like video scrolling experience! 🎉**

