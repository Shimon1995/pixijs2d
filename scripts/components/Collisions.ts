import * as PIXI from 'pixi.js';

import Ground from './collisions/Ground';
import GroungBlock from './collisions/GroundBlock';
import Platform from './collisions/Platform';

export default class Collisions {
	private collisions = new PIXI.Container();
	private scale = 2;

	constructor(app: PIXI.Application) {
		new GroungBlock({ offsetY: 300, offsetX: 300 }, this.collisions);
		new Ground({ offsetY: 420, offsetX: 0 }, this.collisions);
		new Platform({ offsetY: 200, offsetX: 200 }, this.collisions);

		this.collisions.scale.set(this.scale);

		app.stage.addChild(this.collisions);
	}
}
