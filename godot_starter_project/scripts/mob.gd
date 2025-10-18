extends RigidBody2D
# Falling object (mob) script
# Falls from top of screen, player must dodge it

# Minimum and maximum speed for falling
@export var min_speed = 150.0
@export var max_speed = 300.0


func _ready():
	# Add to "mobs" group for collision detection
	add_to_group("mobs")
	
	# Set random falling speed
	var mob_speed = randf_range(min_speed, max_speed)
	linear_velocity = Vector2(0, mob_speed)
	
	# Optional: Add slight horizontal variation
	linear_velocity.x = randf_range(-50, 50)


# Delete mob when it goes off screen
func _on_visible_on_screen_notifier_2d_screen_exited():
	queue_free()
