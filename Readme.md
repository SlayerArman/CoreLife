# Core Life ❤️

> A Comic Match-3 Puzzle Game

This game combines a **match-3 puzzle system** with an interactive **comic-style story progression system**. Complete each level to unlock the next part of the story.

## Controls 🎮

### 🖱️ Mouse Controls

| Action | Control |
|---|---|
| Select an element | Left Click |
| Swap elements | Click an adjacent element |
| Deselect | Click the selected element again |
| Select another element | Click a non-adjacent element |
| Scroll levels | Mouse Wheel |
| Scroll comic | Mouse Wheel |

### 🔄 Making a Move

1. Click an element.
2. The selected element will be highlighted.
3. Click an adjacent element.
4. The two elements swap.
5. If the swap creates a match, the matching elements are removed.
6. The board collapses and new elements are added.
7. If no match is created, the swap is automatically reversed.

## Screenshots 📸


## Game Logic 🧠

The game follows a simple match-3 gameplay loop:

```text
Select Cell
     ↓
Select Adjacent Cell
     ↓
Swap Elements
     ↓
Find Matches
     ↓
 ┌───────────────┐
 │               │
Match          No Match
 │               │
 ↓               ↓
Remove          Swap Back
Matches
 │
 ↓
Collapse Board
 │
 ↓
Refill Board
 │
 ↓
Check Level Goal
 │
 ├── Not Complete → Continue Playing
 │
 └── Complete → Unlock Next Page
```

## Page Unlock System 🔐

Each comic page is associated with a level.

```text
Page 1 → Level 1
Page 2 → Level 2
Page 3 → Level 3
Page 4 → Level 4
...
```

## Save System 💾

Core Life uses the browser's `localStorage` API to save unlocked pages.

```javascript
const progress =
    JSON.parse(
        localStorage.getItem("coreLifeProgress")
    ) || {};

progress[nextPage.level] = true;

localStorage.setItem(
    "coreLifeProgress",
    JSON.stringify(progress)
);
```

## Used Laguages 🛠️

<div align="center">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="60" alt="HTML5">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="60" alt="CSS3">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="60" alt="JavaScript">

<br>

**HTML5** &nbsp;&nbsp; **CSS3** &nbsp;&nbsp; **JavaScript**

</div>

## Future Improvements 🔮

- ⭐ Star-based level ratings
- 🏆 High-score system
- 🎵 Sound effects and background music
- 💥 Combo effects
- ⚡ Special elements
- 🎯 Different level objectives
- ❤️ Lives system
- ⏱️ Timed levels
- 📱 Improved mobile controls
- ☁️ Cloud save system
- 🎬 Advanced story transitions


## License 📜

This project is currently intended for educational and personal development purposes.

Add your preferred license here if you plan to make the project open source.

## Author 👨‍💻

Built with 🤍 by Arman Ahmad

⭐ If you like the project, consider giving the repository a star!