import * as PIXI from 'pixi.js';
import Sky from './backgrounds/Sky';

export default class Background {
	private sky = { container: new PIXI.Container(), scale: 200 };

	constructor(app: PIXI.Application) {
		new Sky({ offsetY: 0, offsetX: 0 }, this.sky.container);

		this.sky.container.scale.set(this.sky.scale);

		app.stage.addChild(this.sky.container);
	}
}
