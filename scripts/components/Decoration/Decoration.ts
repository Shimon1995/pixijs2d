import * as PIXI from 'pixi.js';

import Global from '../Globals';
import Tree from './decorations/Tree';

export default class Decoration extends Global {
	private decorations = new PIXI.Container();
	private scale = 3;

	constructor() {
		super();

		new Tree({ offsetY: 235, offsetX: 100 }, this.decorations);

		this.decorations.scale.set(this.scale);

		this.app.stage.addChild(this.decorations);
	}
}
