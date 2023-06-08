class Ui extends Phaser.Scene {
	constructor() {
		super({ key: "Ui" });
	}

	create() {
		this.fps = this.add
			.text(10, this.scale.height - 60, "among")
			.setScale(4);
	}

	update() {
		this.fps.setText(Math.round(this.game.loop.actualFps));
	}
}

export { Ui };
