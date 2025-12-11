# 🚀 Quick Start Guide

## Complete Setup in 5 Minutes

### For Complete Beginners - No Experience Required!

---

## Step 1: Install Prerequisites (One-Time Setup)

### Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Accept all default options
5. Click "Install"

**Verify Installation:**
```bash
# Open Command Prompt (Windows) or Terminal (Mac/Linux)
# Type this and press Enter:
node --version

# You should see something like: v18.17.0
```

### Install Git (Optional but Recommended)

1. Go to https://git-scm.com/
2. Download for your operating system
3. Run installer with default options

---

## Step 2: Get the Project

### Option A: Download ZIP (Easiest)

1. Go to the GitHub repository page
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to your Desktop or Documents folder

### Option B: Clone with Git

```bash
# Open Command Prompt/Terminal
# Navigate to where you want the project
cd Desktop

# Clone the repository
git clone https://github.com/yourusername/dynamic-memory-visualizer.git

# Go into the project folder
cd dynamic-memory-visualizer
```

---

## Step 3: Install Dependencies

```bash
# Make sure you're in the project folder
# You should see package.json file here

# Install dependencies (this may take 2-3 minutes)
npm install

# Wait for it to complete...
# You'll see a progress bar
```

**What's happening?**
npm is downloading all the required libraries (React, GSAP, etc.) that the project needs to run.

---

## Step 4: Start the Application

```bash
# Start the development server
npm run dev

# You should see:
# VITE v5.4.21  ready in XXX ms
# ➜  Local:   http://localhost:3000/
```

**Success!** 🎉

---

## Step 5: Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Go to: **http://localhost:3000**
3. You should see the Memory Visualizer!

---

## Your First Memory Allocation

### Follow Along:

1. **Initialize Memory**
   - Look for "Initialize Memory" section on the left
   - Memory Size: `1024` (already filled)
   - Frame Size: `64` (already filled)
   - Click the blue **"Initialize Memory"** button
   - ✅ You should see 16 gray boxes appear on the right

2. **Allocate Your First Process**
   - Find "Allocate with Paging" section
   - Process ID: Type `P1`
   - Process Size: Type `200`
   - Click **"Allocate Paging"** button
   - ✅ You should see 4 boxes turn blue!

3. **Run a Simulation**
   - Scroll to "Simulation" section
   - Select Process: Choose `P1`
   - Algorithm: Select `FIFO`
   - Click **"Run Simulation"**
   - ✅ Watch the animation!

**Congratulations!** You just simulated memory management! 🎊

---

## Common Issues & Solutions

### Issue: "npm is not recognized"

**Solution:** Node.js is not installed or not in PATH
1. Reinstall Node.js
2. Make sure to check "Add to PATH" during installation
3. Restart Command Prompt/Terminal

---

### Issue: "Port 3000 is already in use"

**Solution:** Something else is using port 3000
1. Close any other applications using that port
2. Or change the port:
   ```bash
   # Stop the current server (Ctrl+C)
   # Edit vite.config.js and change port
   # Then restart
   ```

---

### Issue: "Module not found" error

**Solution:** Dependencies not installed
```bash
# Delete node_modules folder and package-lock.json
# Then reinstall
npm install
```

---

### Issue: Browser shows blank page

**Solution:** JavaScript might be disabled or console has errors
1. Press F12 to open Developer Tools
2. Check the Console tab for errors
3. Make sure JavaScript is enabled in browser settings

---

## Next Steps

### Learn More:
1. Read the **[User Guide](USER_GUIDE.md)** - Complete tutorial
2. Try different memory sizes
3. Compare FIFO vs LRU algorithms
4. Experiment with segmentation
5. Check the Advanced Analytics dashboard

### Tutorials:
- [Tutorial 1: Basic Paging](USER_GUIDE.md#tutorial-1-your-first-memory-allocation-paging)
- [Tutorial 2: Page Faults](USER_GUIDE.md#tutorial-2-understanding-page-faults)
- [Tutorial 3: FIFO vs LRU](USER_GUIDE.md#tutorial-3-comparing-fifo-vs-lru)

---

## Video Walkthrough

> 🎥 Watch the 5-minute setup video: [Coming Soon]

---

## Keyboard Shortcuts

- **Ctrl+C** (in terminal): Stop the server
- **Ctrl+Shift+R**: Hard refresh browser (clear cache)
- **F12**: Open browser developer tools
- **Ctrl+Shift+C**: Inspect element

---

## Tips for Beginners

### ✅ Do This:
- Start with small memory sizes (256-512 bytes)
- Use frame size of 64 bytes
- Begin with simple process sizes (100-300 bytes)
- Try one feature at a time
- Read tooltips and help text

### ❌ Avoid This:
- Don't use huge memory sizes (>4096) at first
- Don't allocate 10 processes immediately
- Don't skip the initialization step
- Don't close the terminal while server is running

---

## Understanding the Interface

### Left Side = Controls
- This is where you give commands
- Fill in values and click buttons
- Each section does something different

### Right Side = Visualization
- This shows what's happening in memory
- Colors indicate different states
- Charts show statistics

### Color Code:
- ⬜ **Gray**: Free space
- 🟦 **Blue**: Occupied by process
- 🟩 **Green**: Recently accessed
- 🟥 **Red**: Page fault occurred

---

## File Structure (What's What?)

```
Project Folder/
├── src/                    ← Your source code
│   ├── components/         ← UI pieces
│   ├── hooks/              ← React magic
│   └── utils/              ← Helper functions
├── node_modules/           ← Downloaded libraries (don't touch!)
├── package.json            ← Project info & dependencies
├── README.md               ← Main documentation
├── USER_GUIDE.md           ← Detailed guide
└── index.html              ← Entry page
```

**Don't Edit:**
- node_modules/ folder
- dist/ folder (created on build)
- package-lock.json

**Safe to Edit:**
- src/ folder files (if you want to customize)
- README.md (for your own notes)

---

## Stopping the Server

When you're done:

1. Go back to the terminal
2. Press **Ctrl+C**
3. Type `Y` if asked to terminate
4. The server stops
5. You can close the terminal

**To run again later:**
```bash
# Navigate to project folder
cd path/to/dynamic-memory-visualizer

# Start server
npm run dev
```

---

## Getting Help

### Resources:
- 📖 **[Full User Guide](USER_GUIDE.md)** - Everything explained
- 🐛 **[Report Issues](https://github.com/yourusername/dynamic-memory-visualizer/issues)**
- 💬 **[Ask Questions](https://github.com/yourusername/dynamic-memory-visualizer/discussions)**

### Before Asking for Help:
1. Check this guide
2. Read error messages carefully
3. Try restarting the server
4. Try reinstalling dependencies (`npm install`)
5. Check if Node.js is installed (`node --version`)

---

## Success Checklist

After setup, you should be able to:

- [ ] See the application in browser at localhost:3000
- [ ] Initialize memory and see frames appear
- [ ] Allocate a process and see frames change color
- [ ] Run a simulation and see animations
- [ ] View the memory chart at the top
- [ ] Check analytics dashboard
- [ ] Export data using the export panel

**All checked?** You're ready to explore! 🎉

---

## What to Try First

### Day 1: Basics
1. Initialize memory
2. Allocate one process
3. Observe the frames
4. Check the utilization chart

### Day 2: Algorithms
1. Try FIFO simulation
2. Reset and try LRU
3. Compare the results
4. Export the reports

### Day 3: Advanced
1. Try segmentation
2. Allocate multiple processes
3. Check analytics dashboard
4. Read about fragmentation

---

## Useful Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Stop server
Ctrl+C

# Build for production
npm run build

# Preview production build
npm run preview

# Check Node version
node --version

# Check npm version
npm --version
```

---

## Troubleshooting Flowchart

```
Can't install dependencies?
└─→ Is Node.js installed?
    ├─→ No: Install Node.js from nodejs.org
    └─→ Yes: Delete node_modules, run npm install again

Can't start server?
└─→ Did npm install complete?
    ├─→ No: Run npm install
    └─→ Yes: Check if port 3000 is free

Page won't load?
└─→ Is server running?
    ├─→ No: Run npm run dev
    └─→ Yes: Check browser console (F12) for errors

Features not working?
└─→ Did you initialize memory first?
    ├─→ No: Click "Initialize Memory" button
    └─→ Yes: Check if you're following the correct sequence
```

---

## Additional Resources

### Learn Memory Management:
- [OS Concepts Book](https://www.os-book.com/)
- [Paging Explained](https://en.wikipedia.org/wiki/Paging)
- [Virtual Memory](https://en.wikipedia.org/wiki/Virtual_memory)

### Learn React (if interested):
- [React Official Tutorial](https://react.dev/learn)
- [React for Beginners](https://www.youtube.com/results?search_query=react+for+beginners)

### Learn Git:
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Git Basics](https://www.youtube.com/results?search_query=git+basics)

---

## Congratulations! 🎊

You've successfully set up and run the Dynamic Memory Management Visualizer!

**Next Steps:**
1. Explore different features
2. Read the [User Guide](USER_GUIDE.md) for detailed tutorials
3. Experiment with different values
4. Share with your classmates!

**Happy Learning!** 📚✨

---

*Created with ❤️ for OS Students Everywhere*

**Questions?** Open an issue on GitHub or check the [User Guide](USER_GUIDE.md)
