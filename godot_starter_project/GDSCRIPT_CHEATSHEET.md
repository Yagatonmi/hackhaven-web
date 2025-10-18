# GDScript Cheat Sheet for Beginners

Quick reference for common GDScript patterns you'll use all the time!

---

## 📋 Table of Contents
1. [Basic Syntax](#basic-syntax)
2. [Variables](#variables)
3. [Functions](#functions)
4. [Movement](#movement)
5. [Input Handling](#input-handling)
6. [Collisions](#collisions)
7. [Timers](#timers)
8. [Signals](#signals)
9. [Common Node Operations](#common-node-operations)
10. [UI Elements](#ui-elements)

---

## 🔤 Basic Syntax

```gdscript
# This is a comment

# Extend from a node type
extends Node2D
extends CharacterBody2D
extends RigidBody2D

# Print to console
print("Hello World")
print("Score: ", score)

# Multi-line code block
if condition:
    # Indentation matters! (like Python)
    print("True")
```

---

## 📦 Variables

```gdscript
# Declare variables
var health = 100              # Type inferred (int)
var player_name = "Hero"      # String
var is_alive = true           # Boolean
var speed = 5.0               # Float

# Explicit types (optional but recommended)
var health: int = 100
var speed: float = 5.0
var player_name: String = "Hero"

# Constants (can't be changed)
const MAX_HEALTH = 100
const GRAVITY = 980

# Export variables (appear in Inspector)
@export var speed = 400
@export var max_health = 100
@export var mob_scene: PackedScene

# Node references
@onready var sprite = $Sprite2D
@onready var timer = $Timer
```

---

## 🔧 Functions

```gdscript
# Called when node enters scene tree
func _ready():
    print("Scene is ready!")
    health = MAX_HEALTH

# Called every frame (60 FPS = 60 times per second)
func _process(delta):
    # delta = time since last frame (usually 0.016)
    pass

# Called at fixed intervals (for physics)
func _physics_process(delta):
    # Use this for movement and physics
    position.x += speed * delta

# Custom function
func take_damage(amount):
    health -= amount
    print("Health: ", health)

# Function with return value
func is_dead() -> bool:
    return health <= 0

# Function with multiple parameters
func heal(amount: int, show_effect: bool):
    health += amount
    if show_effect:
        show_heal_effect()
```

---

## 🏃 Movement

### Basic Movement
```gdscript
# Move right
position.x += speed * delta

# Move left
position.x -= speed * delta

# Move down
position.y += speed * delta

# Move up  
position.y -= speed * delta
```

### Using Velocity (CharacterBody2D)
```gdscript
extends CharacterBody2D

var speed = 300.0

func _physics_process(delta):
    # Get input (-1, 0, or 1)
    var direction = Input.get_axis("ui_left", "ui_right")
    
    # Set velocity
    velocity.x = direction * speed
    
    # Apply movement
    move_and_slide()
```

### 8-Direction Movement
```gdscript
func _physics_process(delta):
    var input_vector = Vector2.ZERO
    
    input_vector.x = Input.get_axis("ui_left", "ui_right")
    input_vector.y = Input.get_axis("ui_up", "ui_down")
    
    # Normalize to prevent faster diagonal movement
    input_vector = input_vector.normalized()
    
    velocity = input_vector * speed
    move_and_slide()
```

### Gravity
```gdscript
var gravity = 980
var velocity = Vector2.ZERO

func _physics_process(delta):
    # Apply gravity
    velocity.y += gravity * delta
    
    # Check if on ground
    if is_on_floor():
        velocity.y = 0
    
    move_and_slide()
```

### Jump
```gdscript
var jump_force = -400

func _physics_process(delta):
    # Gravity (from above)
    velocity.y += gravity * delta
    
    # Jump
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_force
    
    move_and_slide()
```

---

## 🎮 Input Handling

```gdscript
# Check if button is held down
if Input.is_action_pressed("ui_right"):
    move_right()

# Check if button was just pressed (once)
if Input.is_action_just_pressed("ui_accept"):
    jump()

# Check if button was just released
if Input.is_action_just_released("shoot"):
    stop_charging()

# Get axis input (-1 to 1)
var horizontal = Input.get_axis("ui_left", "ui_right")
var vertical = Input.get_axis("ui_up", "ui_down")

# Check specific keys
if Input.is_key_pressed(KEY_SPACE):
    print("Space pressed")

# Mouse position
var mouse_pos = get_global_mouse_position()

# Check mouse buttons
if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT):
    shoot()
```

### Custom Input Actions
1. **Project → Project Settings → Input Map**
2. Add action name (e.g., "move_right")
3. Click + to add keys
4. Use in code: `Input.is_action_pressed("move_right")`

---

## 💥 Collisions

### Detect Collision (Area2D)
```gdscript
extends Area2D

func _ready():
    body_entered.connect(_on_body_entered)

func _on_body_entered(body):
    print("Hit: ", body.name)
    
    if body.is_in_group("enemies"):
        print("Hit an enemy!")
    
    if body.name == "Player":
        print("Hit the player!")
```

### Check Collision (CharacterBody2D)
```gdscript
func _physics_process(delta):
    move_and_slide()
    
    # Check if hit something
    if get_slide_collision_count() > 0:
        var collision = get_slide_collision(0)
        print("Hit: ", collision.get_collider().name)
```

### Groups
```gdscript
# Add node to group (in _ready)
add_to_group("enemies")
add_to_group("pickups")

# Check if in group
if body.is_in_group("player"):
    player_hit()

# Call function on all nodes in group
get_tree().call_group("enemies", "take_damage", 10)
```

---

## ⏰ Timers

### Create Timer in Code
```gdscript
# In _ready()
var timer = Timer.new()
timer.wait_time = 2.0
timer.one_shot = false  # Repeats
timer.timeout.connect(_on_timer_timeout)
add_child(timer)
timer.start()

func _on_timer_timeout():
    print("Timer finished!")
    spawn_enemy()
```

### Use Timer Node (from scene)
```gdscript
@onready var timer = $Timer

func _ready():
    timer.timeout.connect(_on_timer_timeout)
    timer.start()

func _on_timer_timeout():
    print("Timer finished!")
```

### Wait (Coroutine)
```gdscript
func show_message():
    print("Starting...")
    await get_tree().create_timer(2.0).timeout
    print("2 seconds later!")
```

---

## 📡 Signals

### Built-in Signals
```gdscript
# Connect in editor:
# 1. Select node
# 2. Node tab (next to Inspector)
# 3. Double-click signal
# 4. Select receiver node
# 5. Click Connect

# Or connect in code:
func _ready():
    $Button.pressed.connect(_on_button_pressed)
    $Area2D.body_entered.connect(_on_body_entered)

func _on_button_pressed():
    print("Button clicked!")

func _on_body_entered(body):
    print("Body entered:", body.name)
```

### Custom Signals
```gdscript
# Declare signal
signal health_changed(new_health)
signal player_died

# Emit signal
func take_damage(amount):
    health -= amount
    health_changed.emit(health)
    
    if health <= 0:
        player_died.emit()

# Connect in another script
func _ready():
    $Player.health_changed.connect(_on_player_health_changed)
    $Player.player_died.connect(_on_player_died)

func _on_player_health_changed(new_health):
    $HealthBar.value = new_health

func _on_player_died():
    game_over()
```

---

## 🎯 Common Node Operations

### Get References
```gdscript
# Get child by name
var sprite = $Sprite2D
var sprite = get_node("Sprite2D")

# Get by path
var player = $"../Player"
var label = $CanvasLayer/Label

# Get parent
var parent = get_parent()

# Find node anywhere
var player = get_tree().root.find_child("Player", true, false)
```

### Visibility
```gdscript
# Hide/Show
hide()
show()
visible = false
visible = true

# Check if visible
if visible:
    print("Can see me!")
```

### Delete Nodes
```gdscript
# Delete this node
queue_free()

# Delete after delay
await get_tree().create_timer(2.0).timeout
queue_free()

# Delete specific node
$Enemy.queue_free()
```

### Instantiate Scenes
```gdscript
@export var enemy_scene: PackedScene

func spawn_enemy():
    # Create instance
    var enemy = enemy_scene.instantiate()
    
    # Set position
    enemy.position = Vector2(100, 100)
    
    # Add to scene
    add_child(enemy)
```

---

## 🖼️ UI Elements

### Label
```gdscript
@onready var score_label = $ScoreLabel

func update_score(new_score):
    score_label.text = "Score: " + str(new_score)
```

### Button
```gdscript
@onready var start_button = $StartButton

func _ready():
    start_button.pressed.connect(_on_start_pressed)

func _on_start_pressed():
    print("Game started!")
    start_button.hide()
```

### ProgressBar (Health Bar)
```gdscript
@onready var health_bar = $HealthBar

func _ready():
    health_bar.max_value = 100
    health_bar.value = 100

func take_damage(amount):
    health -= amount
    health_bar.value = health
```

### TextureRect (Image)
```gdscript
@onready var portrait = $Portrait

func change_portrait(new_texture: Texture2D):
    portrait.texture = new_texture
```

---

## 🎲 Random Numbers

```gdscript
# Random float between 0 and 1
var random_value = randf()

# Random float in range
var random_speed = randf_range(100.0, 300.0)

# Random int in range
var random_damage = randi_range(5, 15)

# Random position on screen
var screen_size = get_viewport_rect().size
var random_pos = Vector2(
    randf_range(0, screen_size.x),
    randf_range(0, screen_size.y)
)

# Random choice from array
var colors = ["red", "blue", "green"]
var random_color = colors[randi() % colors.length]
```

---

## 📐 Math & Vectors

```gdscript
# Vector2 (x, y position)
var pos = Vector2(100, 200)
var pos = Vector2.ZERO  # (0, 0)

# Distance between points
var distance = position.distance_to(target_position)

# Direction to target
var direction = position.direction_to(target_position)

# Move towards target
position = position.move_toward(target_position, speed * delta)

# Clamp value
health = clamp(health, 0, 100)  # Keep between 0 and 100

# Lerp (smooth transition)
position.x = lerp(position.x, target_x, 0.1)

# Normalize vector (make length = 1)
var normalized = velocity.normalized()

# Angle
var angle = position.angle_to_point(mouse_position)
rotation = angle
```

---

## 🎨 Common Patterns

### Shoot Projectile
```gdscript
@export var bullet_scene: PackedScene

func shoot():
    var bullet = bullet_scene.instantiate()
    bullet.position = position
    bullet.rotation = rotation
    get_parent().add_child(bullet)
```

### Follow Mouse
```gdscript
func _process(delta):
    look_at(get_global_mouse_position())
```

### Health System
```gdscript
var health = 100
var max_health = 100

func take_damage(amount):
    health -= amount
    health = clamp(health, 0, max_health)
    
    if health <= 0:
        die()

func heal(amount):
    health += amount
    health = clamp(health, 0, max_health)

func die():
    print("Dead!")
    queue_free()
```

### Simple AI Chase Player
```gdscript
@export var chase_speed = 100.0
var player

func _ready():
    player = get_tree().root.find_child("Player", true, false)

func _physics_process(delta):
    if player:
        var direction = position.direction_to(player.position)
        velocity = direction * chase_speed
        move_and_slide()
```

### Screen Wrap
```gdscript
func _process(delta):
    var screen_size = get_viewport_rect().size
    
    # Wrap horizontally
    if position.x > screen_size.x:
        position.x = 0
    elif position.x < 0:
        position.x = screen_size.x
    
    # Wrap vertically
    if position.y > screen_size.y:
        position.y = 0
    elif position.y < 0:
        position.y = screen_size.y
```

---

## 🐛 Debugging

```gdscript
# Print to console
print("Value: ", variable)

# Print with label
print("Health: %d/%d" % [health, max_health])

# Breakpoint (pause game here when debugging)
breakpoint()

# Draw debug line (helpful for visualizing)
func _draw():
    draw_line(position, target_position, Color.RED, 2)
    draw_circle(position, 50, Color.GREEN)

# Check node exists
if has_node("Player"):
    print("Player exists!")
```

---

## 📚 Resources

- Full GDScript docs: https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/
- Built-in functions: https://docs.godotengine.org/en/stable/classes/
- Math functions: https://docs.godotengine.org/en/stable/classes/class_@gdscript.html

---

**Bookmark this page! You'll reference it constantly as a beginner!** 📌
