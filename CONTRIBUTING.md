# 🤝 Contributing to Dynamic Memory Management Visualizer

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Project Structure](#project-structure)
9. [Testing](#testing)
10. [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React and JavaScript

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/dynamic-memory-visualizer.git
   cd dynamic-memory-visualizer
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/dynamic-memory-visualizer.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## How to Contribute

### Types of Contributions

#### 🐛 Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide screenshots if applicable
- Mention your environment (browser, OS)

#### ✨ Feature Requests
- Use the feature request template
- Explain the problem you're trying to solve
- Describe your proposed solution
- Consider alternatives

#### 📝 Documentation
- Fix typos and clarify existing docs
- Add examples and tutorials
- Improve code comments
- Translate documentation

#### 💻 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Refactoring

---

## Development Workflow

### 1. Setup Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Manual testing
npm run dev

# Build test
npm run build
npm run preview
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## Coding Standards

### JavaScript/React Style

#### Component Structure

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Component.css';

/**
 * Component description
 * @param {Object} props - Component props
 */
const Component = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};

Component.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

export default Component;
```

#### Naming Conventions

- **Components**: PascalCase (`MemoryChart.jsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (`frameSize`, `pageTable`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FRAMES`)
- **Functions**: camelCase, descriptive verbs (`calculateFragmentation`)
- **CSS Classes**: kebab-case (`memory-frame`, `stat-card`)

#### Code Style

```javascript
// ✅ Good
const calculateFrames = (memorySize, frameSize) => {
  if (frameSize === 0) return 0;
  return Math.floor(memorySize / frameSize);
};

// ❌ Bad
function calc(m,f){return m/f}
```

### CSS Style

#### Organization

```css
/* Component Styles */
.component {
  /* Layout */
  display: flex;
  position: relative;
  
  /* Box Model */
  padding: 1rem;
  margin: 0 auto;
  
  /* Visual */
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 12px;
  
  /* Typography */
  font-size: 1rem;
  color: var(--text-primary);
  
  /* Animation */
  transition: all 0.3s ease;
}

/* States */
.component:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .component {
    padding: 0.5rem;
  }
}
```

#### CSS Variables

Use existing CSS variables from `index.css`:

```css
/* Colors */
var(--bg-primary)
var(--bg-secondary)
var(--text-primary)
var(--text-secondary)
var(--accent-primary)
var(--accent-success)
var(--border)
var(--shadow)
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(chart): add memory utilization percentage chart"

# Bug fix
git commit -m "fix(frames): correct frame allocation calculation"

# Documentation
git commit -m "docs(readme): add installation instructions"

# Style
git commit -m "style(components): format code with prettier"

# Refactor
git commit -m "refactor(hooks): simplify useMemoryManager logic"
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor" not "moves cursor")
- Keep first line under 72 characters
- Reference issues and PRs in footer
- Be specific and descriptive

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added to complex code
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] Builds without errors
- [ ] Tested on multiple browsers (if UI changes)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested on browsers: Chrome, Firefox, Safari
```

### Review Process

1. **Submit PR** - Create pull request from your branch
2. **Automated Checks** - Wait for CI/CD checks (if configured)
3. **Code Review** - Maintainer reviews your code
4. **Address Feedback** - Make requested changes
5. **Approval** - Get approval from maintainer
6. **Merge** - PR merged into main branch

---

## Project Structure

### Directory Layout

```
src/
├── components/          # React components
│   ├── ControlPanel.jsx
│   ├── FramesVisualizer.jsx
│   ├── MemoryChart.jsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useMemoryManager.js
├── utils/              # Utility functions
│   ├── MemoryManager.js
│   └── memoryUtils.js
├── App.jsx             # Main app component
├── App.css             # App styles
├── index.css           # Global styles
└── main.jsx            # Entry point
```

### Adding New Components

1. Create component file in `src/components/`
2. Create corresponding CSS file
3. Import and use in parent component
4. Add to documentation

**Example:**
```jsx
// src/components/NewFeature.jsx
import React from 'react';
import './NewFeature.css';

const NewFeature = ({ prop }) => {
  return <div className="new-feature">{prop}</div>;
};

export default NewFeature;
```

### Adding New Utilities

1. Create function in `src/utils/memoryUtils.js`
2. Add JSDoc comments
3. Export function
4. Import where needed

**Example:**
```javascript
/**
 * Calculate something useful
 * @param {number} param - Description
 * @returns {number} - Description
 */
export const calculateSomething = (param) => {
  return param * 2;
};
```

---

## Testing

### Manual Testing Checklist

#### Memory Initialization
- [ ] Initialize with valid values
- [ ] Initialize with invalid values (0, negative)
- [ ] Re-initialize after allocation

#### Paging
- [ ] Allocate process smaller than memory
- [ ] Allocate process equal to memory
- [ ] Allocate process larger than memory
- [ ] Allocate multiple processes

#### Segmentation
- [ ] Valid segment format
- [ ] Invalid segment format
- [ ] Multiple segments
- [ ] Segment sizes

#### Simulation
- [ ] FIFO algorithm
- [ ] LRU algorithm
- [ ] No process selected
- [ ] Page fault generation

#### Export
- [ ] Export full report
- [ ] Export JSON
- [ ] Export page faults
- [ ] Export with no data

#### UI/UX
- [ ] Responsive on mobile
- [ ] Animations work smoothly
- [ ] No console errors
- [ ] Tooltips display correctly

### Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Performance Testing

- Check animation FPS
- Monitor memory usage
- Test with 100+ frames
- Test rapid interactions

---

## Documentation

### Code Comments

```javascript
// ✅ Good - Explains WHY
// Use FIFO because we need predictable replacement
const algorithm = 'FIFO';

// ❌ Bad - Explains WHAT (obvious from code)
// Set algorithm to FIFO
const algorithm = 'FIFO';
```

### JSDoc Comments

```javascript
/**
 * Allocates memory using paging
 * @param {string} processId - Unique process identifier
 * @param {number} processSize - Size in bytes
 * @returns {Object} Result object with success status
 * @throws {Error} If memory not initialized
 */
const allocatePaging = (processId, processSize) => {
  // Implementation
};
```

### README Updates

When adding features:
1. Update Features section
2. Add usage examples
3. Update screenshots
4. Add to Table of Contents

---

## Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Screenshots, mockups, examples

**Implementation suggestions**
Technical details (optional)
```

---

## Bug Report Template

```markdown
**Describe the bug**
Clear description of bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- Browser: [e.g. Chrome 120]
- OS: [e.g. Windows 11]
- Version: [e.g. 2.0]

**Additional context**
Any other relevant information
```

---

## Getting Help

### Resources

- **Documentation**: Read [USER_GUIDE.md](USER_GUIDE.md)
- **Issues**: Check existing issues first
- **Discussions**: Use GitHub Discussions for questions

### Contact

- GitHub Issues: For bugs and features
- GitHub Discussions: For questions and ideas
- Email: [Optional email contact]

---

## Recognition

### Contributors

All contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

### Types of Recognition

- 🥇 Major Feature Contributors
- 🐛 Bug Fixers
- 📝 Documentation Improvers
- 🎨 UI/UX Enhancers
- 🧪 Testers

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

## Questions?

Don't hesitate to ask! Create an issue with the "question" label.

**Thank you for contributing to making memory management education better!** 🎉

---

*Last Updated: December 2025*
