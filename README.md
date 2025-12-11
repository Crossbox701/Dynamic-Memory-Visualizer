<div align="center">

# 🧠 Dynamic Memory Management Visualizer

### _Interactive Operating System Memory Management Simulator_

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88ce02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**[Live Demo](#) • [Documentation](#-table-of-contents) • [User Guide](USER_GUIDE.md) • [Contributing](CONTRIBUTING.md)**

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

Dynamic Memory Management Visualizer is a modern web application designed to help students, educators, and developers understand complex operating system memory management concepts through interactive visualization. Built with React and powered by GSAP animations, it provides real-time simulations of paging, segmentation, and page replacement algorithms.

### Why This Project?

- **Educational**: Perfect for OS courses and self-learning
- **Visual**: See memory allocation in real-time with beautiful animations
- **Interactive**: Experiment with different algorithms and configurations
- **Modern**: Built with latest web technologies and best practices

---

## ✨ Features

<table>
<tr>
<td>

### 🎨 **Modern UI/UX**
- Sleek dark mode with Montserrat typography
- GSAP-powered smooth animations
- Framer Motion micro-interactions
- Glass-morphism effects
- Fully responsive design
- Professional gradient themes

</td>
<td>

### 💾 **Memory Management**
- **Paging**: Dynamic page-to-frame allocation
- **Segmentation**: Variable-size segments
- **Virtual Memory**: Demand paging simulation
- **FIFO**: First-In-First-Out replacement
- **LRU**: Least Recently Used replacement
- Real-time memory tracking

</td>
</tr>
<tr>
<td>

### 📊 **Visualizations**
- Animated memory frames (color-coded)
- Memory utilization percentage chart
- Segment blocks with sizing
- Page fault timeline
- Interactive data tables
- Advanced analytics dashboard

</td>
<td>

### 🎯 **Interactive Tools**
- Configurable memory & frame sizes
- Multiple process allocation
- Algorithm comparison
- Memory health scoring
- Fragmentation analysis
- Export reports (TXT/JSON)

</td>
</tr>
</table>

### 🆕 **Advanced Features**

- **Memory Health Score**: 0-100 rating based on efficiency and fragmentation
- **Analytics Dashboard**: Real-time efficiency metrics and access patterns
- **Export Panel**: Download comprehensive reports in multiple formats
- **Utility Functions**: 8+ built-in analysis functions for deep insights
- **Access Pattern Analysis**: Track and identify memory access behavior

---

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Main Dashboard
![Main Dashboard](docs/images/dashboard.png)

### Memory Frames Visualization
![Memory Frames](docs/images/frames.png)

### Advanced Analytics
![Analytics](docs/images/analytics.png)

### Export Panel
![Export](docs/images/export.png)

</details>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download](https://git-scm.com/)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/dynamic-memory-visualizer.git
cd dynamic-memory-visualizer
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**

Navigate to **http://localhost:3000**

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Quick Start Video

> 🎥 [Watch 5-minute tutorial](https://youtube.com/example) _(Coming soon)_

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

---

## 🏗️ Architecture

### Project Structure

```
dynamic-memory-visualizer/
├── src/
│   ├── components/                 # React components
│   │   ├── AdvancedStats.jsx      # Analytics dashboard
│   │   ├── ControlPanel.jsx       # Control inputs
│   │   ├── DataTables.jsx         # Page/segment tables
│   │   ├── ExportPanel.jsx        # Export functionality
│   │   ├── FaultsTimeline.jsx     # Page faults timeline
│   │   ├── FramesVisualizer.jsx   # Memory frames grid
│   │   ├── MemoryChart.jsx        # Utilization chart
│   │   ├── SegmentsVisualizer.jsx # Segments display
│   │   └── Toast.jsx              # Notifications
│   ├── hooks/
│   │   └── useMemoryManager.js    # Custom React hook
│   ├── utils/
│   │   ├── MemoryManager.js       # Core memory logic
│   │   └── memoryUtils.js         # Utility functions
│   ├── App.jsx                    # Main component
│   ├── App.css                    # App styles
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── public/                        # Static assets
├── docs/                          # Documentation
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── README.md                      # This file
├── USER_GUIDE.md                  # Comprehensive guide
├── CONTRIBUTING.md                # Contribution guidelines
└── LICENSE                        # MIT License
```

### Component Hierarchy

```
App
├── ControlPanel
│   ├── Memory Initialization
│   ├── Paging Allocation
│   ├── Segmentation Allocation
│   └── Simulation Controls
└── Visualization Area
    ├── MemoryChart
    ├── FramesVisualizer
    ├── SegmentsVisualizer
    ├── FaultsTimeline
    ├── AdvancedStats
    ├── ExportPanel
    └── DataTables
```

### Data Flow

```
User Input → ControlPanel → useMemoryManager Hook
                                     ↓
                              MemoryManager Class
                                     ↓
                              State Updates (frames, processes, faults)
                                     ↓
                              Visualization Components Render
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

---

## 🛠️ Technologies

### Core Stack

<table>
<tr>
<td align="center" width="150">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="48" height="48" alt="React" />
<br><strong>React 18.3</strong>
<br><sub>UI Framework</sub>
</td>
<td align="center" width="150">
<img src="https://vitejs.dev/logo.svg" width="48" height="48" alt="Vite" />
<br><strong>Vite 5.1</strong>
<br><sub>Build Tool</sub>
</td>
<td align="center" width="150">
<img src="https://greensock.com/uploads/set_resources_2/c9a2c037887a00494ed40be61f9c456e_icon.svg" width="48" height="48" alt="GSAP" />
<br><strong>GSAP 3.12</strong>
<br><sub>Animations</sub>
</td>
<td align="center" width="150">
<img src="https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg" width="48" height="48" alt="Framer Motion" />
<br><strong>Framer Motion 11</strong>
<br><sub>UI Interactions</sub>
</td>
</tr>
</table>

### Libraries & Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | Component-based UI |
| **Vite** | 5.1.0 | Fast development server & bundler |
| **GSAP** | 3.12.5 | Timeline-based animations |
| **Framer Motion** | 11.0.3 | Declarative animations |
| **Lucide React** | 0.344.0 | Beautiful icon system |
| **CSS3** | - | Modern styling with variables |

### Development Tools

- **Node.js** 18+ - JavaScript runtime
- **npm/yarn** - Package management
- **Git** - Version control
- **VS Code** - Recommended IDE

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

---

## 📚 API Documentation

### MemoryManager Class

Core class handling all memory operations.

#### Constructor

```javascript
const manager = new MemoryManager(memorySize, frameSize);
```

**Parameters:**
- `memorySize` (number): Total memory in bytes
- `frameSize` (number): Size of each frame in bytes

#### Methods

##### `allocatePaging(processId, processSize)`

Allocates memory using paging scheme.

```javascript
const result = manager.allocatePaging('P1', 256);
// Returns: { success: true, framesAllocated: 4 }
```

**Parameters:**
- `processId` (string): Unique process identifier
- `processSize` (number): Size in bytes

**Returns:** Object with `success` and `framesAllocated` or `error`

---

##### `allocateSegmentation(processId, segments)`

Allocates memory using segmentation.

```javascript
const segments = [
  { name: 'code', size: 200 },
  { name: 'data', size: 300 }
];
const result = manager.allocateSegmentation('P2', segments);
```

**Parameters:**
- `processId` (string): Process identifier
- `segments` (Array): Array of segment objects

**Returns:** Object with `success` and segment details or `error`

---

##### `accessPage(processId, pageNumber, algorithm)`

Simulates page access with potential page fault.

```javascript
manager.accessPage('P1', 5, 'FIFO');
```

**Parameters:**
- `processId` (string): Process identifier
- `pageNumber` (number): Page to access
- `algorithm` (string): 'FIFO' or 'LRU'

**Returns:** Object with fault information

---

##### `getState()`

Returns current memory state.

```javascript
const state = manager.getState();
// Returns: { frames: [...], processes: [...], pageFaults: [...] }
```

---

##### `reset()`

Clears all allocations and resets memory.

```javascript
manager.reset();
```

---

### Utility Functions (memoryUtils.js)

#### `calculateFragmentation(frames)`

Analyzes memory fragmentation.

```javascript
import { calculateFragmentation } from './utils/memoryUtils';

const stats = calculateFragmentation(frames);
// Returns: { external: 25.5, freeBlocks: 3, largestFreeBlock: 8 }
```

---

#### `calculateHealthScore(state)`

Calculates overall memory health (0-100).

```javascript
const score = calculateHealthScore(state);
// Returns: 85
```

---

#### `generateReport(state, manager)`

Generates comprehensive text report.

```javascript
const report = generateReport(state, manager);
// Returns: formatted string with all metrics
```

---

#### `exportStateToJSON(state, manager)`

Exports complete state to JSON.

```javascript
const json = exportStateToJSON(state, manager);
// Returns: JSON string with timestamp and all data
```

---

### Custom Hook: useMemoryManager

React hook for memory management state.

```javascript
import { useMemoryManager } from './hooks/useMemoryManager';

const {
  state,
  initMemory,
  allocatePaging,
  allocateSegmentation,
  simulateAccess,
  reset,
  manager
} = useMemoryManager(1024, 64);
```

**Returns:**
- `state`: Current memory state
- `initMemory()`: Initialize memory function
- `allocatePaging()`: Allocate with paging
- `allocateSegmentation()`: Allocate with segmentation
- `simulateAccess()`: Simulate page access
- `reset()`: Reset memory
- `manager`: MemoryManager instance

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

---

## 🎯 Usage Examples

### Example 1: Basic Memory Setup

```javascript
// Initialize memory
initMemory(1024, 64);
// Creates 16 frames of 64 bytes each

// Allocate a process
allocatePaging('P1', 256);
// Allocates 4 pages (256 ÷ 64 = 4)
```

### Example 2: Segmentation

```javascript
// Initialize memory
initMemory(1024, 64);

// Allocate segmented process
allocateSegmentation('P2', [
  { name: 'code', size: 200 },
  { name: 'data', size: 300 },
  { name: 'stack', size: 100 }
]);
// Creates 3 segments with respective sizes
```

### Example 3: Page Replacement Simulation

```javascript
// Setup
initMemory(256, 64); // Only 4 frames
allocatePaging('P1', 448); // Needs 7 pages

// Simulate access with FIFO
simulateAccess('P1', 'FIFO');
// Triggers page faults and replacements

// Compare with LRU
reset();
initMemory(256, 64);
allocatePaging('P1', 448);
simulateAccess('P1', 'LRU');
// Compare fault counts
```

---

## 🧪 Testing

### Manual Testing

```bash
# Start dev server
npm run dev

# Test scenarios in browser
# 1. Initialize memory
# 2. Allocate processes
# 3. Run simulations
# 4. Check analytics
# 5. Export data
```

### Build Testing

```bash
# Build production version
npm run build

# Test production build
npm run preview

# Check for errors
# Verify all features work
```

---

## 🐛 Known Issues

- None currently reported

**Found a bug?** Please [open an issue](https://github.com/yourusername/dynamic-memory-visualizer/issues)

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] **Optimal Page Replacement** - Theoretical best algorithm
- [ ] **Clock/Second-Chance** - Another replacement algorithm
- [ ] **Working Set Model** - Advanced memory management
- [ ] **Multi-level Paging** - Hierarchical page tables
- [ ] **Save/Load States** - Save simulations for later
- [ ] **Comparison Mode** - Side-by-side algorithm comparison
- [ ] **Animated Tutorials** - Interactive learning guides
- [ ] **Dark/Light Theme Toggle** - User preference option

### Future Enhancements

- Performance optimizations for large memory sizes
- Mobile app version
- Real-time collaboration features
- More export formats (PDF, CSV)
- Customizable color schemes
- Accessibility improvements

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- 🧪 Write tests
- 🔧 Fix issues

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 🙏 Acknowledgments

### Inspiration

- Operating System concepts from **Silberschatz, Galvin, and Gagne**
- Memory management algorithms from **Andrew Tanenbaum**

### Technologies

- **React Team** - For the amazing framework
- **GSAP Team** - For powerful animation library
- **Vite Team** - For lightning-fast build tool
- **Lucide** - For beautiful icons

### Community

- Thanks to all contributors
- OS education community
- Students and educators using this tool

---

## 📞 Contact & Support

### Get Help

- 📖 **Documentation**: [USER_GUIDE.md](USER_GUIDE.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/dynamic-memory-visualizer/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/dynamic-memory-visualizer/discussions)

### Connect

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)

---

## ⭐ Star History

If you find this project helpful, please consider giving it a star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/dynamic-memory-visualizer&type=Date)](https://star-history.com/#yourusername/dynamic-memory-visualizer&Date)

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/dynamic-memory-visualizer)
![GitHub code size](https://img.shields.io/github/languages/code-size/yourusername/dynamic-memory-visualizer)
![Lines of code](https://img.shields.io/tokei/lines/github/yourusername/dynamic-memory-visualizer)

---

<div align="center">

## 🎓 Perfect for Learning Operating Systems

**Built with ❤️ for Students, Educators, and Developers**

### [Live Demo](#) • [User Guide](USER_GUIDE.md) • [Report Bug](https://github.com/yourusername/dynamic-memory-visualizer/issues)

---

*Powered by React, GSAP, and Modern Web Technologies*

**Made with 💜 by [Your Name](https://github.com/yourusername)**

</div>
