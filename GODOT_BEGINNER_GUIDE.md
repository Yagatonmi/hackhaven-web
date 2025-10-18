# Complete Beginner's Guide to Godot Game Development

Welcome to game development with Godot! This guide will take you from zero to creating your first game.

## 📋 Table of Contents
1. [What is Godot?](#what-is-godot)
2. [Installation](#installation)
3. [Core Concepts](#core-concepts)
4. [Your First Project](#your-first-project)
5. [Making a Simple Game](#making-a-simple-game)
6. [Next Steps](#next-steps)

---

## 🎮 What is Godot?

Godot is a free, open-source game engine that lets you create 2D and 3D games. It uses:
- **GDScript**: A Python-like language (easiest for beginners)
- **C#**: For those familiar with programming
- **Visual Scripting**: Drag-and-drop coding

**Why Godot?**
- ✅ Completely free (no fees, no royalties)
- ✅ Lightweight (~50MB download)
- ✅ Easy to learn
- ✅ Great for 2D games especially
- ✅ Active community

---

## 💿 Installation

### Step 1: Download Godot
1. Go to [godotengine.org](https://godotengine.org/download)
2. Download **Godot 4.x** (Standard version)
3. Extract the zip file
4. Run the Godot executable (no installation needed!)

### Step 2: First Launch
1. Open Godot
2. You'll see the Project Manager
3. Click "New Project"
4. Choose a folder and project name
5. Select "Forward+" renderer for best compatibility
6. Click "Create & Edit"

---

## 🧠 Core Concepts

### 1. **Nodes**
- Everything in Godot is a Node
- Nodes are like building blocks
- Examples: Sprite2D (for images), CharacterBody2D (for characters), Area2D (for triggers)

### 2. **Scenes**
- A collection of nodes organized in a tree
- Scenes can be reused (like templates)
- Your game is made of multiple scenes working together

### 3. **Scripts**
- Add behavior to nodes
- Written in GDScript (looks like Python)
- Attached to nodes to make them interactive

### 4. **Signals**
- How nodes communicate with each other
- Like events (e.g., "button_pressed", "body_entered")

---

## 🚀 Your First Project

### Understanding the Interface

When you open Godot, you'll see:

1. **Top Bar**: Play buttons, scene selector
2. **Left Panel (Scene)**: Your node tree
3. **Center**: Viewport (where you see your game)
4. **Right Panel (Inspector)**: Properties of selected node
5. **Bottom Panel**: Output, debugger, filesystem

### The Node Tree
```
MainScene
├── Player
│   ├── Sprite2D
│   └── CollisionShape2D
├── Enemy
└── Background
```

---

## 🎯 Making a Simple Game

Let's create a basic "Dodge the Falling Objects" game!

### Game Concept
- Player moves left/right at bottom
- Objects fall from top
- Avoid the objects to survive
- Score increases over time

### Step-by-Step Tutorial

#### **Step 1: Create the Player**

1. Create a new scene: `Scene → New Scene`
2. Click "2D Scene" (creates a Node2D)
3. Rename it to "Player" (right-click → Rename)
4. Add child nodes:
   - Right-click Player → Add Child Node → Search "CharacterBody2D"
   - Delete the Node2D and make CharacterBody2D the root
   - Rename it to "Player"
   - Add a **Sprite2D** child to Player
   - Add a **CollisionShape2D** child to Player

5. **Set up the Sprite**:
   - Select Sprite2D
   - In Inspector, click "Texture" → "New Image Texture"
   - For now, we'll use a colored rectangle
   - Go to Project → New → GDScript (name it `icon.svg` will appear)
   - Or create a simple colored square: In Sprite2D, set Texture to create a placeholder

6. **Set up the Collision**:
   - Select CollisionShape2D
   - In Inspector, set Shape → New RectangleShape2D
   - Adjust the size to match your sprite

7. **Save the Scene**: Press Ctrl+S, name it `player.tscn`

#### **Step 2: Add Player Movement Script**

1. Select the Player (CharacterBody2D) node
2. Click the "Attach Script" button (scroll icon) in the top right
3. Keep default settings, click "Create"
4. Replace the default code with the script from `player.gd` (see example files)

#### **Step 3: Create the Main Scene**

1. Scene → New Scene → 2D Scene
2. Rename Node2D to "Main"
3. Add child nodes:
   - Add **Marker2D** (rename to "SpawnPosition")
   - Add **Timer** (rename to "MobTimer")
   - Add **CanvasLayer** → **Label** (for score)

4. Position SpawnPosition at the top of the screen
5. Select MobTimer:
   - Set "Wait Time" to 2.0 seconds
   - Enable "Autostart"

6. Save as `main.tscn`

#### **Step 4: Create the Falling Object (Mob)**

1. Create new scene
2. Add **RigidBody2D** as root (rename to "Mob")
3. Add **Sprite2D** and **CollisionShape2D** as children
4. Set up sprite and collision like before
5. Attach script (see `mob.gd`)
6. Save as `mob.tscn`

#### **Step 5: Connect Everything**

1. Open `main.tscn`
2. Add script to Main node
3. Instance the Player scene: Click chain icon → select `player.tscn`
4. Use the script from `main.gd` (see example files)
5. Connect the Timer signal:
   - Select MobTimer
   - Go to Node tab (next to Inspector)
   - Double-click "timeout()" signal
   - Click "Connect"

#### **Step 6: Test Your Game!**

1. Click the Play button (▶️) at top right
2. If asked, select `main.tscn` as main scene
3. Use Arrow Keys or A/D to move
4. Dodge the falling objects!

---

## 📚 Learning Path

### Week 1: Basics
- ✅ Understand nodes and scenes
- ✅ Learn basic GDScript syntax
- ✅ Create simple movement
- ✅ Handle collisions

### Week 2: Game Mechanics
- Add scoring system
- Create game over screen
- Add sound effects
- Learn about signals

### Week 3: Polish
- Add animations
- Create menus
- Learn tilemaps for levels
- Add particle effects

### Week 4: Your First Complete Game
- Plan a simple game concept
- Create all assets (or use free assets)
- Implement game loop
- Playtest and polish

---

## 🎨 GDScript Basics

### Variables
```gdscript
var health = 100
var player_name = "Hero"
var is_alive = true
var speed = 5.0
```

### Functions
```gdscript
func _ready():
    # Runs when node enters scene
    print("Game started!")

func _process(delta):
    # Runs every frame
    # delta = time since last frame
    pass

func _physics_process(delta):
    # Runs at fixed intervals (for physics)
    pass
```

### Input Handling
```gdscript
func _process(delta):
    if Input.is_action_pressed("ui_right"):
        position.x += speed
    if Input.is_action_pressed("ui_left"):
        position.x -= speed
```

### Common Node Methods
```gdscript
# Movement
position.x += 10
position.y -= 5
velocity = Vector2(100, 0)

# Visibility
visible = false
hide()
show()

# Scenes
get_tree().reload_current_scene()
get_tree().change_scene_to_file("res://main.tscn")
queue_free()  # Delete this node
```

---

## 🛠️ Useful Resources

### Official Resources
- [Official Godot Docs](https://docs.godotengine.org/)
- [Godot Tutorials (Official)](https://docs.godotengine.org/en/stable/community/tutorials.html)
- [GDScript Reference](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html)

### Video Tutorials
- **Brackeys** - Godot tutorial series (YouTube)
- **HeartBeast** - RPG and platformer tutorials
- **GDQuest** - Professional Godot courses (some free)
- **Queble** - Short, focused tutorials

### Free Assets
- [OpenGameArt.org](https://opengameart.org/) - Sprites, sounds, music
- [itch.io](https://itch.io/game-assets/free) - Free game assets
- [Kenney.nl](https://kenney.nl/assets) - Huge collection of free assets
- [Freesound.org](https://freesound.org/) - Sound effects

### Community
- [Godot Discord](https://discord.gg/godotengine)
- [r/godot](https://reddit.com/r/godot)
- [Godot Forum](https://forum.godotengine.org/)
- [Godot Q&A](https://ask.godotengine.org/)

---

## 💡 Tips for Beginners

### Do's ✅
1. **Start Small**: Make Pong, not GTA
2. **Follow Tutorials**: Complete at least 2-3 full tutorials
3. **Experiment**: Break things and learn from errors
4. **Use Version Control**: Learn basic Git
5. **Keep It Simple**: Focus on gameplay first, graphics later
6. **Join the Community**: Ask questions, share progress
7. **Finish Projects**: Better to complete a simple game than abandon a complex one

### Don'ts ❌
1. Don't start with your "dream game"
2. Don't skip the basics
3. Don't copy code without understanding it
4. Don't ignore errors/warnings
5. Don't work without backups
6. Don't optimize prematurely (make it work first)
7. Don't give up! Game dev is hard but rewarding

---

## 🎯 Project Ideas (Ordered by Difficulty)

### Super Easy (Start Here!)
1. **Number Guessing Game** - Text-based, learn variables and if-statements
2. **Clicker Game** - Click button, increase score
3. **Color Matcher** - Match colors that appear

### Easy
4. **Pong** - Classic paddle game
5. **Flappy Bird Clone** - Tap to fly, avoid pipes
6. **Snake** - Collect food, grow longer
7. **Breakout** - Paddle, ball, bricks

### Medium
8. **Platformer** - Jump, run, collect coins
9. **Top-Down Shooter** - Move and shoot enemies
10. **Tower Defense** - Place towers, stop enemies
11. **Puzzle Match-3** - Match colored gems

### Challenging
12. **RPG** - Stats, inventory, dialogue
13. **Metroidvania** - Exploration, abilities, backtracking
14. **Card Game** - Deck building, rules system

---

## 🐛 Common Beginner Mistakes

### 1. Forgetting to Set the Main Scene
**Error**: "There is no defined scene to run."
**Fix**: Scene → Project Settings → Application → Run → Main Scene → Select your main scene

### 2. Collision Not Working
**Cause**: Missing CollisionShape2D or shape not set
**Fix**: Always add CollisionShape2D and assign a shape in Inspector

### 3. Script Not Running
**Check**:
- Is script attached to the correct node?
- Are there syntax errors? (Check Output panel)
- Did you save the script? (Ctrl+S)

### 4. Node Not Found Errors
```gdscript
# Wrong
var player = $player  # Lowercase won't work if node is "Player"

# Correct
var player = $Player  # Match exact node name
```

### 5. Physics Bodies Not Moving
- **StaticBody2D**: Doesn't move (walls, floors)
- **RigidBody2D**: Physics simulation (falling objects)
- **CharacterBody2D**: Manual control (player, NPCs)

---

## 🎓 Your Learning Roadmap

### Month 1: Foundation
- [ ] Install Godot
- [ ] Complete official "Your First 2D Game" tutorial
- [ ] Make 3 small games (Pong, Flappy Bird, Snake)
- [ ] Learn GDScript basics

### Month 2: Expanding Skills
- [ ] Learn about tilemaps
- [ ] Add animations to your games
- [ ] Understand the Input system
- [ ] Create UI (menus, HUD)

### Month 3: Game Feel
- [ ] Add sound effects and music
- [ ] Learn particle effects
- [ ] Implement screen shake and juice
- [ ] Polish one of your previous games

### Month 4: Complete Project
- [ ] Plan a full game (scope: 2 weeks)
- [ ] Create or gather all assets
- [ ] Implement all features
- [ ] Playtest with friends
- [ ] Publish on itch.io

---

## 🎉 Conclusion

Game development is a marathon, not a sprint. Don't be discouraged if things are confusing at first - everyone starts as a beginner!

**Your Action Plan**:
1. Install Godot today
2. Follow the tutorial in this guide
3. Make your first game work (even if it's ugly)
4. Share it with friends
5. Make another game (it will be easier!)

Remember: The best way to learn is by MAKING games, not just reading about them!

Good luck, future game developer! 🚀

---

### Questions?
- Check the [Godot Docs](https://docs.godotengine.org/)
- Ask on [Godot Discord](https://discord.gg/godotengine)
- Search on [r/godot](https://reddit.com/r/godot)

**You've got this!** 💪
