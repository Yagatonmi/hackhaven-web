extends CharacterBody2D
# Player script for dodge game
# Controls: Arrow Keys or A/D to move left and right

# Movement speed (pixels per second)
@export var speed = 400.0

# Screen boundaries
var screen_size


func _ready():
	# Get the size of the game window
	screen_size = get_viewport_rect().size


func _physics_process(delta):
	# Get input from player
	var direction = Input.get_axis("ui_left", "ui_right")
	
	# Set velocity based on input
	if direction != 0:
		velocity.x = direction * speed
	else:
		# Stop moving if no input (smooth deceleration)
		velocity.x = move_toward(velocity.x, 0, speed)
	
	# Move the player
	move_and_slide()
	
	# Keep player on screen (clamp position)
	position.x = clamp(position.x, 0, screen_size.x)
	position.y = clamp(position.y, 0, screen_size.y)


# Called when player collides with something
func _on_body_entered(body):
	# If we hit a mob, game over
	if body.is_in_group("mobs"):
		game_over()


func game_over():
	# Hide player and trigger game over
	hide()
	# Signal to main scene that game is over
	get_tree().call_group("main", "game_over")
