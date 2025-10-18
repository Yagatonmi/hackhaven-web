# Dodge The Falling Objects - Godot Starter Project

A simple beginner-friendly game to learn Godot Engine basics!

## 🎮 About This Project

This is a complete starter project for beginners learning Godot. It includes:
- Fully commented GDScript code
- Simple game mechanics
- Example of node structure
- Basic collision detection
- Score system

## 🎯 Game Description

**Dodge The Falling Objects** is a simple survival game where:
- You control a player at the bottom of the screen
- Objects fall from the top
- Use Arrow Keys (or A/D) to move left and right
- Avoid the falling objects to survive
- Your score increases the longer you survive

## 📁 Project Structure

```
godot_starter_project/
├── scenes/
│   ├── main.tscn          # Main game scene (create this in Godot)
│   ├── player.tscn        # Player scene (create this in Godot)
│   └── mob.tscn           # Falling object scene (create this in Godot)
├── scripts/
│   ├── main.gd            # Main game logic
│   ├── player.gd          # Player movement and collision
│   └── mob.gd             # Falling object behavior
├── assets/
│   └── (your images, sounds, etc.)
├── project.godot          # Godot project file
└── README.md              # This file
```

## 🚀 How to Use This Project

### Step 1: Open in Godot

1. Download and install [Godot 4.x](https://godotengine.org/download)
2. Open Godot
3. Click "Import"
4. Navigate to this folder and select `project.godot`
5. Click "Import & Edit"

### Step 2: Create the Scenes

The scripts are ready, but you need to create the scene files (`.tscn`) in Godot:

#### **Creating player.tscn**

1. Scene → New Scene
2. Click "Other Node" and select **CharacterBody2D**
3. Rename it to "Player"
4. Add child nodes:
   - **Sprite2D** (for player visual)
   - **CollisionShape2D** (for collision detection)
   - **Area2D** (for detecting hits)
     - Add **CollisionShape2D** as child of Area2D

5. **Setup Sprite2D**:
   - Click Sprite2D
   - In Inspector, under "Texture": 
     - You can use Godot's default icon, or
     - Create a simple colored rectangle: 
       - Texture → New PlaceholderTexture2D
       - Set size to 64x64

6. **Setup CollisionShape2D** (under Player):
   - Click it
   - In Inspector, under "Shape"
   - Click the dropdown → New RectangleShape2D
   - Click the shape again to edit size (make it match sprite)

7. **Setup Area2D Collision** (for hit detection):
   - Select the CollisionShape2D under Area2D
   - Set Shape → New RectangleShape2D
   - Adjust to match sprite size

8. **Attach Script**:
   - Select Player (CharacterBody2D)
   - Click attach script icon (📜) or Ctrl+Shift+A
   - Choose `scripts/player.gd`

9. **Connect Signals**:
   - Select the Area2D node
   - Go to Node tab (next to Inspector)
   - Double-click "body_entered" signal
   - Connect to Player node

10. **Save**: Ctrl+S, save as `scenes/player.tscn`

#### **Creating mob.tscn**

1. Scene → New Scene
2. Select **RigidBody2D** (this allows physics/gravity)
3. Rename to "Mob"
4. Add children:
   - **Sprite2D**
   - **CollisionShape2D**
   - **VisibleOnScreenNotifier2D**

5. Setup similar to player:
   - Add texture to Sprite2D (different color/shape than player)
   - Set CollisionShape2D shape
   - Set gravity scale to 0 in Inspector (RigidBody2D → Gravity Scale = 0)

6. Attach script: `scripts/mob.gd`

7. Connect signal:
   - Select VisibleOnScreenNotifier2D
   - Node tab → "screen_exited" signal
   - Connect to Mob

8. Save as `scenes/mob.tscn`

#### **Creating main.tscn**

1. Scene → New Scene → 2D Scene
2. Rename Node2D to "Main"
3. Add children:
   - **Marker2D** (rename to "SpawnPosition")
   - **Timer** (rename to "MobTimer")
   - **CanvasLayer**
     - **Label** (rename to "ScoreLabel")
     - **Label** (rename to "GameOverLabel")
     - **Button** (rename to "StartButton")

4. **Position nodes**:
   - SpawnPosition: Move to top-center of screen (x=400, y=50)
   - ScoreLabel: Top-left (x=10, y=10)
   - GameOverLabel: Center screen
   - StartButton: Center-bottom

5. **Configure Timer**:
   - Select MobTimer
   - Inspector → Wait Time: 2.0
   - Inspector → Autostart: ON

6. **Configure Labels**:
   - ScoreLabel: Text = "Score: 0"
   - GameOverLabel: Text = "Game Over!", Horizontal Alignment = Center
   - Make font bigger: Inspector → Theme Overrides → Font Sizes → Font Size: 32

7. **Instance Player**:
   - Right-click Main → Instance Child Scene
   - Select `player.tscn`
   - Position at bottom-center (x=400, y=550)

8. **Attach Script**:
   - Select Main
   - Attach `scripts/main.gd`
   - In Inspector, you'll see "Mob Scene" export variable
   - Drag `mob.tscn` from FileSystem to this field

9. **Connect Signals**:
   - Select MobTimer
   - Node tab → "timeout" signal → Connect to Main
   - Select StartButton
   - Node tab → "pressed" signal → Connect to Main

10. Save as `scenes/main.tscn`

### Step 3: Set Main Scene

1. Project → Project Settings
2. Application → Run → Main Scene
3. Click folder icon, select `scenes/main.tscn`
4. Click Close

### Step 4: Run the Game!

1. Press F5 or click Play button (▶️)
2. Click "Start" to begin
3. Use Arrow Keys or A/D to move
4. Dodge the falling objects!

## 🎨 Customizing Your Game

### Make it Your Own!

1. **Change Colors/Sprites**:
   - Replace placeholder textures with actual images
   - Find free assets at [Kenney.nl](https://kenney.nl) or [OpenGameArt.org](https://opengameart.org)

2. **Adjust Difficulty**:
   - In `mob.gd`: Change `min_speed` and `max_speed`
   - In `main.gd`: Change MobTimer wait time (lower = harder)

3. **Add Features**:
   - Lives system (player has 3 hits before game over)
   - Power-ups (collect items that slow down mobs)
   - Different mob types (some fast, some slow)
   - Background music and sound effects

4. **Visual Polish**:
   - Add particle effects when mob hits player
   - Add screen shake
   - Animate the sprites
   - Add a background image

## 📚 Learning Points

This project teaches you:

- ✅ **Node structure** (parent/child relationships)
- ✅ **Scenes** (reusable components)
- ✅ **GDScript basics** (variables, functions, exports)
- ✅ **Input handling** (keyboard controls)
- ✅ **Physics** (CharacterBody2D, RigidBody2D)
- ✅ **Collisions** (detecting when objects touch)
- ✅ **Signals** (node communication)
- ✅ **Instancing** (spawning objects at runtime)
- ✅ **Timers** (periodic events)
- ✅ **UI** (labels, buttons, canvas layers)

## 🔧 Troubleshooting

### Game doesn't start
- Check that `main.tscn` is set as main scene
- Verify all scripts are attached to correct nodes

### Player doesn't move
- Check that player script is attached to CharacterBody2D
- Verify Input Map has ui_left and ui_right actions

### Collisions don't work
- Make sure CollisionShape2D has a shape assigned
- Check that shapes are properly sized
- Verify signals are connected

### Mobs don't spawn
- Check that mob scene is assigned in Main inspector
- Verify Timer is set to autostart or triggered by Start button
- Check that spawn position is correct

### Errors in Console
- Read the error message - it tells you the line number
- Check for typos in node names (case-sensitive!)
- Make sure all required nodes exist in your scene

## 🎓 Next Steps

Once you've completed this project:

1. **Add Your Own Features**: Try implementing the customization ideas above
2. **Make a Different Game**: Try Pong or Flappy Bird clone
3. **Follow Official Tutorial**: Complete Godot's "Your First 2D Game"
4. **Join the Community**: Share your progress on r/godot or Discord

## 📖 Resources

- [Official Godot Docs](https://docs.godotengine.org/)
- [GDScript Reference](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/)
- [Godot Discord](https://discord.gg/godotengine)
- [r/godot](https://reddit.com/r/godot)

## 📝 License

This starter project is released under CC0 (Public Domain).
Feel free to use, modify, and learn from it however you want!

---

**Happy Game Development! 🎮**

Remember: Every expert was once a beginner. Keep making games!
