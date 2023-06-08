import { Game } from "../scenes/game";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
	health = 100;

	/**
	 *
	 * @param {Game} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		this.scene = scene;
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.scene.enemies.add(this);

		this.setScale(4);
		// this.body.allowGravity = false;
	}

	hit(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			this.die();
		}
	}

	die() {
		this.body.allowGravity = true;
		this.setVelocityY(-400);
		this.scene.enemies.remove(this);
	}
}
