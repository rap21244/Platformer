import { Enemy } from "./enemy";

class Bee extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, "bee");
		this.body.allowGravity = false;

		this.anims.create({
			key: "run",
			frames: this.scene.anims.generateFrameNames("bee", {
				prefix: "tile_005",
				suffix: ".png",
				start: 1,
				end: 2
			}),
			frameRate: 5,
			repeat: -1
		});

		this.play("run");
	}
}

export { Bee };
