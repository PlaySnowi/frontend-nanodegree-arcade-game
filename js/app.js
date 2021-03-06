'use strict';

class Character {

	constructor () {
		this.width = 50;
		this.height = 50;
	}

	render () {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

}

// Enemies our player must avoid
class Enemy extends Character {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	constructor (y) {
		super();
		this.sprite = 'images/enemy-bug.png';
		this.x = 1;
		this.y = y;
		this.speed = Math.random()*300 + 200;
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update (dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x += dt * this.speed;

		//when enemies get outside, send them back to the beggining
		//and create random speed (between 200 and 500)
		if (this.x > 500) {
			this.x = 1;
			this.speed = Math.random()*300 + 200;
		}

		//collision detection
		//based on https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
		if ((this.x < player.x + player.width &&
			this.x + this.width > player.x &&
			this.y < player.y + player.height &&
			this.height + this.y > player.y) ||
			(player.y == -20)) {//reset player when it reaches the water
			player.x = 200;
			player.y = 380;
		}
	}

	// Draw the enemy on the screen, required method for game
	render () {
		super.render();
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
	constructor () {
		super();
		this.sprite = 'images/char-boy.png';
		this.x = 200;
		this.y = 380;
	}

	update () {}

	render () {
		super.render();
	}

	handleInput (keyCode) {
		if (keyCode === 'left') {
			this.x = this.x - 100;
		} else if (keyCode === 'up') {
			this.y = this.y - 80;
		} else if (keyCode === 'right') {
			this.x = this.x + 100;
		} else if (keyCode === 'down') {
			this.y = this.y + 80;
		}

		//player cannot move off screen
		if (this.x > 400) {
			this.x = 400;
		} else if (this.x < 0) {
			this.x = 0;
		} else if (this.y > 380) {
			this.y = 380;
		}

		//win
		if (this.y == -20) {
			window.alert('Win!');
		}
	}
}

// Now instantiate your objects.
const enemy1 = new Enemy(60);
const enemy2 = new Enemy(140);
const enemy3 = new Enemy(225);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	const allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
