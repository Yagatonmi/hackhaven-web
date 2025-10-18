# 🚀 Quick Start Guide - Godot Beginner Project

**Complete beginner? Follow these steps in order!**

---

## ⏱️ 30-Minute Challenge

Get your first game running in 30 minutes or less!

---

## 📥 Step 1: Install Godot (5 minutes)

1. Go to https://godotengine.org/download
2. Download **Godot 4.x** (Standard version)
3. Extract the ZIP file
4. Double-click the Godot executable - it runs immediately (no install needed!)

✅ **Check**: You should see the Godot Project Manager

---

## 📂 Step 2: Open This Project (2 minutes)

1. In Godot Project Manager, click **"Import"**
2. Click **"Browse"**
3. Find the `godot_starter_project` folder
4. Select the `project.godot` file
5. Click **"Import & Edit"**

✅ **Check**: Godot opens showing the project with folders on the left

---

## 🎯 Step 3: Create Player Scene (7 minutes)

### A. Create the Scene
1. Top menu: **Scene → New Scene**
2. Click **"Other Node"**
3. Search for `CharacterBody2D` and click it
4. In the Scene panel (left), right-click the node → **Rename** → type "Player"

### B. Add Child Nodes
1. Right-click **Player** → **Add Child Node**
2. Search `Sprite2D`, click it
3. Right-click **Player** → **Add Child Node** → `CollisionShape2D`
4. Right-click **Player** → **Add Child Node** → `Area2D`
5. Right-click **Area2D** → **Add Child Node** → `CollisionShape2D`

Your tree should look like:
```
Player (CharacterBody2D)
├── Sprite2D
├── CollisionShape2D
└── Area2D
    └── CollisionShape2D
```

### C. Setup the Sprite
1. Click **Sprite2D**
2. Look at the right side (Inspector panel)
3. Find **Texture** → Click dropdown → **New PlaceholderTexture2D**
4. Click it again → in popup, set Width and Height to **64**

### D. Setup Collisions
1. Click **CollisionShape2D** (the first one, under Player)
2. Inspector → **Shape** → dropdown → **New RectangleShape2D**
3. Click it again → drag the orange handles to make a box around your sprite
4. Click **CollisionShape2D** (the second one, under Area2D)
5. Inspector → **Shape** → dropdown → **New RectangleShape2D**
6. Adjust size to match sprite

### E. Attach Script
1. Click **Player** (top node)
2. Look for attach script icon (scroll icon) at the top, OR press **Ctrl+Shift+A**
3. Click **"Load"** button
4. Navigate to `scripts/player.gd` and select it
5. Click **"Open"**

### F. Connect Signal
1. Click **Area2D** node
2. Look for **Node** tab (next to Inspector tab on the right)
3. Double-click **body_entered** signal
4. Make sure **Player** is selected at the top
5. Click **"Connect"**

### G. Save
1. Press **Ctrl+S**
2. Save as `scenes/player.tscn`

✅ **Check**: You should see `player.tscn` in the FileSystem panel (bottom-left)

---

## 👾 Step 4: Create Mob Scene (5 minutes)

### A. Create New Scene
1. **Scene → New Scene**
2. Click **"Other Node"** → search `RigidBody2D`
3. Rename to "Mob"

### B. Add Children
1. Right-click **Mob** → **Add Child Node** → `Sprite2D`
2. Right-click **Mob** → **Add Child Node** → `CollisionShape2D`
3. Right-click **Mob** → **Add Child Node** → `VisibleOnScreenNotifier2D`

### C. Setup Sprite and Collision
1. Click **Sprite2D** → Inspector → **Texture** → **New PlaceholderTexture2D** → Size 48x48
2. Click **CollisionShape2D** → Inspector → **Shape** → **New RectangleShape2D** → Adjust size

### D. Disable Gravity
1. Click **Mob** (top node)
2. Inspector → Find **Gravity Scale** → Set to **0**

### E. Attach Script
1. Click **Mob**
2. Attach script button → **Load** → `scripts/mob.gd`

### F. Connect Signal
1. Click **VisibleOnScreenNotifier2D**
2. Node tab → Double-click **screen_exited**
3. Connect to **Mob**

### G. Save
1. **Ctrl+S** → Save as `scenes/mob.tscn`

✅ **Check**: `mob.tscn` appears in FileSystem

---

## 🎮 Step 5: Create Main Scene (8 minutes)

### A. Create Scene
1. **Scene → New Scene** → **2D Scene** (creates Node2D)
2. Rename to "Main"

### B. Add Nodes
1. Right-click **Main** → **Add Child Node** → `Marker2D` (rename to "SpawnPosition")
2. Right-click **Main** → **Add Child Node** → `Timer` (rename to "MobTimer")
3. Right-click **Main** → **Add Child Node** → `CanvasLayer`
4. Right-click **CanvasLayer** → **Add Child Node** → `Label` (rename to "ScoreLabel")
5. Right-click **CanvasLayer** → **Add Child Node** → `Label` (rename to "GameOverLabel")
6. Right-click **CanvasLayer** → **Add Child Node** → `Button` (rename to "StartButton")

Tree structure:
```
Main
├── SpawnPosition (Marker2D)
├── MobTimer (Timer)
└── CanvasLayer
    ├── ScoreLabel (Label)
    ├── GameOverLabel (Label)
    └── StartButton (Button)
```

### C. Position Everything
1. Click **SpawnPosition** → Drag it to top-center of the game view
   - Or set position in Inspector: (400, 50)
2. Click **ScoreLabel** → Drag to top-left
   - Text: "Score: 0"
   - Inspector → Theme Overrides → Font Sizes → Font Size: **24**
3. Click **GameOverLabel** → Drag to center
   - Text: "Game Over!"
   - Inspector → Horizontal Alignment → **Center**
   - Font Size: **32**
4. Click **StartButton** → Drag to center-bottom
   - Text: "Start"
   - Resize to make bigger

### D. Setup Timer
1. Click **MobTimer**
2. Inspector → **Wait Time**: 2.0
3. Inspector → Check **Autostart**

### E. Add Player
1. Right-click **Main** → **Instance Child Scene**
2. Select `scenes/player.tscn`
3. Drag player to bottom-center of screen
4. Position: (400, 550)

### F. Attach Script
1. Click **Main**
2. Attach script → **Load** → `scripts/main.gd`
3. Look at Inspector → you'll see **Mob Scene** (it's an export variable)
4. From FileSystem (bottom-left), **drag** `scenes/mob.tscn` onto the **Mob Scene** field

### G. Connect Signals
1. Click **MobTimer** → Node tab → Double-click **timeout()** → Connect to **Main**
2. Click **StartButton** → Node tab → Double-click **pressed()** → Connect to **Main**

### H. Save
1. **Ctrl+S** → Save as `scenes/main.tscn`

---

## ⚙️ Step 6: Set Main Scene (1 minute)

1. Top menu: **Project → Project Settings**
2. Left side: **Application → Run**
3. Find **Main Scene** → Click folder icon
4. Select `scenes/main.tscn`
5. Click **Close**

✅ **Check**: Settings saved

---

## ▶️ Step 7: RUN THE GAME! (2 minutes)

1. Press **F5** (or click big Play button ▶️ at top-right)
2. Click **"Start"** button
3. Use **Arrow Keys** (or **A** and **D**) to move
4. Dodge the falling objects!

🎉 **CONGRATULATIONS! You made your first game!**

---

## 🐛 Not Working? Quick Fixes

### "Main scene is not set"
- Project → Project Settings → Application → Run → Main Scene → Select `main.tscn`

### Player doesn't move
- Make sure player script is attached to the **Player** node
- Check that script loaded correctly (not empty)

### Nothing spawns/falls
- Check that **mob.tscn** is assigned to Main's "Mob Scene" export in Inspector
- Make sure Timer's "timeout" signal is connected

### Red errors in console
- Check spelling of node names (case-sensitive!)
- Make sure all nodes exist in your scene
- Read the error - it tells you the line number and problem

### Collision doesn't work
- Check that all CollisionShape2D nodes have a shape assigned (RectangleShape2D)
- Make sure shapes aren't too small
- Verify Area2D signal is connected

---

## 🎨 Make It Yours!

### Easy Customizations:

1. **Change Colors**:
   - Change PlaceholderTexture2D color in Inspector

2. **Make it Harder/Easier**:
   - Select **MobTimer** → Change **Wait Time** (lower = more mobs = harder)

3. **Change Speed**:
   - Open `scripts/player.gd`
   - Line 5: Change `speed = 400.0` to higher (faster) or lower (slower)

4. **Scoring**:
   - Open `scripts/main.gd`
   - Line 32: Change `score += delta * 10` (higher number = faster scoring)

---

## 📚 What's Next?

Now that you have a working game:

1. **Experiment**: Try breaking things and fixing them - that's how you learn!
2. **Add Features**: Lives, power-ups, different enemy types
3. **Read the Full Guide**: Open `GODOT_BEGINNER_GUIDE.md` for deep explanations
4. **Watch Tutorials**: Search "Godot tutorial for beginners" on YouTube
5. **Make Another Game**: Try Pong or Flappy Bird next!

---

## 💪 You Did It!

Game development is hard, but you just:
- ✅ Installed Godot
- ✅ Created 3 different scenes
- ✅ Attached scripts
- ✅ Used signals
- ✅ Made a working game!

**That's HUGE for a beginner!** 

Keep going - your next game will be even better! 🚀

---

**Questions?** Check the main `GODOT_BEGINNER_GUIDE.md` or search r/godot
