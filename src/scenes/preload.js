class Preload extends Phaser.Scene {
	constructor() {
		super({ key: "Preload " });
	}

	preload() {
		// load assets
		this.load.atlas("player", "/player.png", "/player.json");
		this.load.image("bullet", "/bullet.png");
		this.load.image("tilemap_packed", "/tilemap_packed.png");
		this.load.tilemapTiledJSON("level1", "/level1.json");
		this.load.atlas("bee", "/bee.png", "/bee.json");
		this.load.atlas("worm", "/worm.png", "/worm.json");
	}

	create() {
		this.scene.start("Game");
	}
}

export { Preload };
