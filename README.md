# 🧠 Dynamic Memory Management Visualizer

A modern, interactive web application built with **React** and **GSAP animations** to simulate and visualize operating system memory management techniques including **Paging**, **Segmentation**, **Virtual Memory**, and **Page Replacement Algorithms** (FIFO & LRU).

![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Enabled-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02)

## ✨ Features

### 🎨 Modern Dark UI/UX
- Sleek dark mode design with gradient backgrounds
- Smooth GSAP-powered animations
- Framer Motion micro-interactions
- Responsive layout for all devices
- Glass-morphism effects

### 💾 Memory Management
- **Paging Simulation** - Dynamic page-to-frame allocation
- **Segmentation** - Variable-size segment allocation
- **Virtual Memory** - Demand paging with page faults
- **FIFO Algorithm** - First-In-First-Out replacement
- **LRU Algorithm** - Least Recently Used replacement

### 📊 Real-time Visualization
- Animated memory frames with color coding
- Segment blocks with proportional sizing
- Page fault timeline with event tracking
- Interactive data tables
- Live status updates

### 🎯 Interactive Controls
- Configurable memory size and frame size
- Multiple process allocation
- Algorithm selection (FIFO/LRU)
- One-click simulation
- Export fault logs
- Quick reset

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 How to Use

### 1️⃣ Initialize Memory
```
Memory Size: 1024 bytes
Frame Size: 64 bytes
→ Click "Initialize Memory"
```

### 2️⃣ Allocate Process (Paging)
```
Process Name: P1
Process Size: 200 bytes
→ Click "Allocate Paging"
```
**Result:** Pages allocated to frames, visualized with blue blocks

### 3️⃣ Allocate Process (Segmentation)
```
Process Name: P2
Segments: code:100,data:200,stack:50
→ Click "Allocate Segmentation"
```
**Result:** Segments shown as proportional green blocks

### 4️⃣ Run Simulation
```
Select Algorithm: FIFO or LRU
→ Click "Run Simulation"
```
**Result:** Page faults and replacements animated in real-time

### 5️⃣ Export & Reset
- **Export Faults**: Download fault log as `.txt`
- **Reset**: Clear all allocations

## 🎯 Test Scenarios

### Scenario 1: Basic Paging
```
Memory: 1024 bytes | Frame: 64 bytes
Process P1: 200 bytes
Expected: 4 pages allocated (frames 0-3)
```

### Scenario 2: Page Faults with FIFO
```
Memory: 256 bytes | Frame: 64 bytes (4 frames)
Process P1: 400 bytes (7 pages needed)
Algorithm: FIFO
Expected: First 4 pages loaded, then faults trigger FIFO replacement
```

### Scenario 3: LRU vs FIFO
```
Memory: 256 bytes | Frame: 64 bytes
Process P1: 384 bytes (6 pages)
Compare FIFO vs LRU replacement patterns
```

### Scenario 4: Segmentation
```
Process P1: code:300,data:500,stack:200
Expected: 3 segments with bases at 0, 300, 800
```

## 🏗️ Project Structure

```
Project2.0/
├── src/
│   ├── components/
│   │   ├── ControlPanel.jsx        # Control inputs
│   │   ├── FramesVisualizer.jsx    # Memory frames display
│   │   ├── SegmentsVisualizer.jsx  # Segments display
│   │   ├── FaultsTimeline.jsx      # Page faults timeline
│   │   ├── DataTables.jsx          # Tables for page/segment data
│   │   └── Toast.jsx               # Notification system
│   ├── hooks/
│   │   └── useMemoryManager.js     # React hook for state
│   ├── utils/
│   │   └── MemoryManager.js        # Core memory logic
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styles
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 UI/UX Highlights

### Color Scheme (Dark Mode)
- **Background**: Deep space gradients (#0a0a0f → #1a1a24)
- **Accent Primary**: Indigo (#6366f1)
- **Accent Success**: Green (#10b981)
- **Accent Warning**: Amber (#f59e0b)
- **Text**: Light gray (#f9fafb)

### Animations
- **GSAP**: Frame entrance, segment slides
- **Framer Motion**: Hover effects, page transitions
- **CSS**: Gradient shifts, glow effects

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18.3 | UI framework |
| Vite 5.1 | Build tool & dev server |
| GSAP 3.12 | Advanced animations |
| Framer Motion 11 | UI animations |
| Lucide React | Icon system |
| CSS3 | Styling & effects |

## 🎓 Educational Use

Perfect for:
- Operating Systems courses
- Memory management labs
- Algorithm visualization
- Student projects
- Self-learning

### Key Learning Concepts
- **Paging**: Fixed-size memory allocation
- **Segmentation**: Logical division of programs
- **Virtual Memory**: Demand paging
- **Page Faults**: Non-resident page access
- **FIFO**: Queue-based replacement
- **LRU**: Timestamp-based replacement

## 📝 API (Internal)

### MemoryManager Class

```javascript
// Initialize
const mm = new MemoryManager(memSize, frameSize);

// Allocate paging
mm.allocatePaging(processId, processSize);

// Allocate segmentation
mm.allocateSegmentation(processId, segmentList);

// Access page (triggers faults)
mm.accessPage(processId, pageNo, algorithm);

// Get current state
mm.getState();

// Reset
mm.reset();
```

## 🐛 Troubleshooting

### Issue: Port 3000 already in use
**Solution**: Change port in `vite.config.js`

### Issue: Animation lag
**Solution**: Reduce frame count or disable animations in CSS

### Issue: Build errors
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

This is an academic project. Fork and enhance as needed!

## 📄 License

Educational use - Open source

---

**Built with ❤️ for Operating Systems Education**

*Powered by React, GSAP, and Modern Web Technologies*
