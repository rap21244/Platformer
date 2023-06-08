import { Enemy } from "./enemy";

class Worm extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, "worm");

		this.anims.create({
			key: "run",
			frames: scene.anims.generateFrameNames("worm", {
				prefix: "tile_005",
				suffix: ".png",
				start: 5,
				end: 6
			}),
			frameRate: 3,
			repeat: -1
		});

		this.play("run");
	}
}

export { Worm };
