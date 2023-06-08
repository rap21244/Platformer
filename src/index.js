import Phaser from "phaser";

import { Preload } from "./scenes/preload";
import { Game } from "./scenes/game";
import { Ui } from "./scenes/ui";

const RATIO = Math.max(
	window.innerWidth / window.innerHeight,
	window.innerHeight / window.innerWidth
);
const HEIGHT = 720;
const WIDTH = RATIO * HEIGHT;

window.addEventListener("load", () => {
	/**
	 * @type {Phaser.Types.Core.GameConfig}
	 */
	const config = {
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: WIDTH,
			height: HEIGHT
		},
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 600 },
				debug: false
			}
		},
		parent: "game",
		dom: {
			createContainer: true
		},
		backgroundColor: 0xaaaaaa,
		pixelArt: true,
		scene: [Preload, Game, Ui]
	};

	new Phaser.Game(config);
});
