# 🌌 Avinish Rana – Interactive Developer Portfolio

Welcome to the official repository for my personal developer portfolio. This project is a modern, high-performance, and visually rich showcase of my frontend engineering capabilities, UI/UX designs, and technical skills. 

Built with **React**, **Vite**, **TailwindCSS**, and **Framer Motion**, it delivers an engaging user experience with premium micro-interactions, responsive styling, and a integrated AI assistant.

---

## ✨ Features & Micro-Interactions

### 🧠 Avinish AI Assistant (Chatbot)
*   **Intelligent Drawer**: Supports drawer transitions that slide from the right on desktop, and a mobile bottom sheet that handles drag-to-dismiss gestures.
*   **Simulated Streaming**: Mimics real-time typing outputs word-by-word at `25ms` intervals.
*   **Chat History**: Keeps dialogue context saved across browser tab refreshes using `sessionStorage`.
*   **Microservice Powered**: Communicates with a hosted microservice at Render.
*   **Keyboard Accessible**: Built with keyboard traps (`Tab`/`Shift+Tab`), escape-key handlers, and background dismiss click-triggers.

### 🎧 Ambient Audio Player
*   **Equalizer Visualizer**: Floating toggle bar exhibiting vertical audio waves.
*   **Smooth Fade Actions**: Implements linear volume fading increments over `600ms` when pausing or playing to prevent harsh audio pops.
*   **Persistent Playtime**: Syncs the current track timeline offset and volume state to `localStorage` to resume playback across page reloads.

### 💎 Immersive Particle & Click Feedback
*   **Digital Dust Trails**: A hardware-accelerated HTML5 `<canvas>` rendering fluid particle trails (circles, diamond sparkles, crosses) responding to mouse movement vectors.
*   **Cursor Push Physics**: Allows mouse coordinates to repel surrounding particles based on distance math.
*   **Camera Shutter Sparkle**: Generates a glowing, drop-shadowed 8-point SVG star click reflection at the exact coordinate click point.
*   **Element Scale Feedback**: Interactive targets clicked temporarily shrink (`scale(0.985)`) for `80ms` to provide soft feedback.

### 📁 Sticky Project Section
*   **Layer Stacking**: Implements scroll-linked translations using Framer Motion (`useScroll` and `useTransform`).
*   **Multi-View Showcase**: Features multi-resolution grid previews of active screens loaded from Cloudinary.

---

## 🛠️ Technology Stack

*   **Frontend Library**: [React.js (v19)](https://react.dev)
*   **Build Tooling**: [Vite (v8)](https://vite.dev)
*   **Styling System**: [TailwindCSS (v3)](https://tailwindcss.com) & custom CSS transitions
*   **Animation Engine**: [Framer Motion (v12)](https://www.framer.com/motion/)
*   **Linter**: [Oxlint](https://oxc.rs/)
*   **Icons**: [Lucide React](https://lucide.dev)
*   **Media Hosting & CDN**: [Cloudinary](https://cloudinary.com)

---

## 📂 Directory Map

```text
├── src/
│   ├── components/      # Reusable components (Magnet, FadeIn, Dust, Shutter)
│   │   └── chat/        # Modular chatbot components
│   ├── constants/       # Audio and media constants 
│   ├── hooks/           # Animations, mouse tracking & music handlers
│   ├── sections/        # Page layout blocks (Hero, Marquee, Projects, About, Resume)
│   ├── services/        # API communication models
│   ├── styles/          # Custom Canvas & shutter styling
│   ├── App.jsx          # Component assembly root
│   └── main.jsx         # Render entry point
├── public/              # Static public resources
├── index.html           # Page structure entry & SEO viewport configurations
├── tailwind.config.js   # Custom styling overrides
└── package.json         # Scripts and library version definitions
```

---

## 🚀 Local Development

To run this project locally, make sure you have [Node.js](https://nodejs.org) installed on your machine.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/avinish-portfolio.git
   cd avinish-portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   This generates a highly optimized `/dist` build ready for web deployments.

---

## ☁️ Deployment (Netlify)

This project is configured to build seamlessly on platforms like **Netlify** or **Vercel**. 

Since the project uses GitHub Webhooks, any push or merge commit to your production branch (e.g., `main` or `master`) will automatically trigger a rebuild and deploy the live changes.
*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist`
