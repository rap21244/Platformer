import { Game } from "../scenes/game";

export class Player extends Phaser.Physics.Arcade.Sprite {
	VELOCITY = 100;
	JUMP_VELOCITY = 375;

	canJump = false;
	died = false;

	/**
	 *
	 * @param {Game} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, "player");
		this.scene = scene; // intelisense
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.setScale(this.scene.TEXTURE_SCALE);
		this.body.setCollideWorldBounds(true);
		this.setDepth(1);

		this.anims.create({
			key: "run",
			frames: this.anims.generateFrameNames("player", {
				prefix: "tile_004",
				suffix: ".png",
				start: 0,
				end: 1
			}),
			frameRate: 5,
			repeat: -1
		});

		this.play("shoot");
	}

	preUpdate(time, delta) {
		if (this.died) return;

		if (
			this.scene.terrain.getTileAtWorldXY(
				this.x,
				this.y + 16 * this.scale
			) != null
		) {
			this.canJump = true;
		} else {
			this.canJump = false;
			this.anims.stop();
			this.setFrame(0);
		}

		// left and right
		if (this.scene.keys.a.isDown) {
			this.setVelocityX(-this.JUMP_VELOCITY);
			this.setFlipX(true);
			if (this.canJump) this.play("run", true);
		} else if (this.scene.keys.d.isDown) {
			this.setVelocityX(this.JUMP_VELOCITY);
			this.setFlipX(false);
			if (this.canJump) this.play("run", true);
		} else {
			this.setVelocityX(0);
			this.anims.stop();
			this.setFrame(0);
		}

		// jump
		if (this.scene.keys.w.isDown && this.canJump) {
			this.setVelocityY(-this.JUMP_VELOCITY);
		}

		super.preUpdate(time, delta);

		console.log(this.x + " " + this.y);
	}
}
