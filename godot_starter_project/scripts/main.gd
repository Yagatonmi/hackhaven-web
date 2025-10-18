extends Node2D
# Main game scene script
# Handles spawning enemies, scoring, and game state

# Preload the mob scene
@export var mob_scene: PackedScene

# Game state
var score = 0
var game_active = false

# References to child nodes
@onready var spawn_position = $SpawnPosition
@onready var mob_timer = $MobTimer
@onready var score_label = $CanvasLayer/ScoreLabel
@onready var game_over_label = $CanvasLayer/GameOverLabel
@onready var start_button = $CanvasLayer/StartButton


func _ready():
	add_to_group("main")
	# Hide game over message at start
	if game_over_label:
		game_over_label.hide()
	# Show start button
	if start_button:
		start_button.show()


func _process(delta):
	if game_active:
		# Increase score over time
		score += delta * 10
		if score_label:
			score_label.text = "Score: " + str(int(score))


func start_game():
	# Reset game state
	game_active = true
	score = 0
	
	# Clear any existing mobs
	get_tree().call_group("mobs", "queue_free")
	
	# Start spawning mobs
	mob_timer.start()
	
	# Show player
	if has_node("Player"):
		$Player.show()
		$Player.position = Vector2(get_viewport_rect().size.x / 2, 
								  get_viewport_rect().size.y - 50)
	
	# Update UI
	if game_over_label:
		game_over_label.hide()
	if start_button:
		start_button.hide()
	if score_label:
		score_label.show()


func game_over():
	# Stop game
	game_active = false
	mob_timer.stop()
	
	# Show game over message
	if game_over_label:
		game_over_label.text = "Game Over!\nFinal Score: " + str(int(score))
		game_over_label.show()
	
	# Show restart button
	if start_button:
		start_button.text = "Restart"
		start_button.show()


# Called by timer to spawn new mobs
func _on_mob_timer_timeout():
	if not game_active:
		return
	
	# Create new mob instance
	if mob_scene:
		var mob = mob_scene.instantiate()
		
		# Set random spawn position along the top
		var spawn_x = randf_range(50, get_viewport_rect().size.x - 50)
		mob.position = Vector2(spawn_x, spawn_position.position.y)
		
		# Add to scene
		add_child(mob)


# Button press handler
func _on_start_button_pressed():
	start_game()
