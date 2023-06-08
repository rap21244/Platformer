import { Player } from "../classes/player";
import { Bee } from "../classes/bee";
import { Worm } from "../classes/worm";

class Game extends Phaser.Scene {
	TEXTURE_SCALE = 4;
	FIRE_COOLDOWN = 100; // ms
	playerLastFired = 0;

	constructor() {
		super({ key: "Game" });
	}

	init() {
		this.keys = this.input.keyboard.addKeys({
			w: Phaser.Input.Keyboard.KeyCodes.W,
			a: Phaser.Input.Keyboard.KeyCodes.A,
			s: Phaser.Input.Keyboard.KeyCodes.S,
			d: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE
		});

		this.scene.launch("Ui");
	}

	create() {
		this.physics.world.fixedStep = false; // https://phaser.discourse.group/t/sprite-jitter-noticable-in-doc-examples/5322

		// create map
		const map = this.make.tilemap({ key: "level1" });
		const tileset = map.addTilesetImage(
			"tilemap_packed",
			"tilemap_packed",
			16,
			16
		);
		map.createLayer("Sky", tileset).setScale(this.TEXTURE_SCALE);
		this.terrain = map
			.createLayer("Terrain", tileset)
			.setScale(this.TEXTURE_SCALE)
			.setCollisionByProperty({ collides: true });
		// const decorations = map
		// 	.createLayer("Decorations", tileset)
		// 	.setScale(this.TEXTURE_SCALE)
		// 	.setCollisionByProperty({ collides: true });

		// player
		this.player = new Player(this, 100, 0);

		// groups
		this.bullets = this.add.group();
		this.enemies = this.physics.add.group({
			runChildUpdate: true
		});

		this.physics.world.setBounds(
			0,
			0,
			map.widthInPixels * this.TEXTURE_SCALE,
			map.heightInPixels * this.TEXTURE_SCALE
		);

		this.cameras.main.setBounds(
			0,
			0,
			map.widthInPixels * this.TEXTURE_SCALE,
			map.heightInPixels * this.TEXTURE_SCALE
		);
		this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

		// enemies
		new Bee(this, 2967, 544);
		new Worm(this, 1500, 736);

		// colliders
		const terrainCollider = this.physics.add.collider(
			this.player,
			this.terrain
		);
		this.physics.add.collider(this.enemies, this.terrain);
		this.physics.add.overlap(
			this.enemies,
			this.bullets,
			(bullet, enemy) => {
				bullet.destroy();
				enemy.hit(5);
			}
		);

		this.physics.add.overlap(this.player, this.enemies, () => {
			if (this.player.died) return;
			this.player.setVelocity(0, 0);
			this.player.died = true;
			this.player.setVelocityY(-400);
			this.physics.world.removeCollider(terrainCollider);
			this.player.setCollideWorldBounds(false);
		});
	}

	update() {
		// fire bullets
		if (
			this.keys.space.isDown &&
			this.time.now > this.playerLastFired + this.FIRE_COOLDOWN
		) {
			this.playerLastFired = this.time.now;

			const bullet = this.physics.add
				.image(this.player.x, this.player.y + 11, "bullet")
				.setScale(1.7);
			bullet.setFlipX(this.player.flipX);
			bullet.body.allowGravity = false;

			this.bullets.add(bullet);

			if (this.player.flipX) {
				bullet.setVelocityX(-800);
			} else {
				bullet.setVelocityX(800);
			}
		}
	}
}

export { Game };

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
