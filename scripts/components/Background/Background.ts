import * as PIXI from 'pixi.js';

import Sky from './backgrounds/Sky';
import Global from '../Globals';

export default class Background extends Global {
	private sky = { container: new PIXI.Container(), scale: 200 };

	constructor() {
		super();
		new Sky({ offsetY: 0, offsetX: 0 }, this.sky.container);

		this.sky.container.scale.set(this.sky.scale);

		this.app.stage.addChild(this.sky.container);
	}
}
