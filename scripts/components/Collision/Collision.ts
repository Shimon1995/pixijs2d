import * as PIXI from 'pixi.js';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import Ground from './collisions/Ground';
import GroungBlock from './collisions/GroundBlock';
import Platform from './collisions/Platform';
import Global from '../Globals';
import Blob from './Blob';
import { CollisionBlock } from '../../interfaces';

export default class Collisions extends Global {
	private collidables: CollisionBlock[] = new Array();
	private collisions = new PIXI.Container();
	private scale = 2;

	constructor() {
		super();

		of(
			new GroungBlock({ offsetY: 300, offsetX: 300 }, this.collisions),
			new Ground({ offsetY: 420, offsetX: 0 }, this.collisions),
			new Platform({ offsetY: 200, offsetX: 200 }, this.collisions),
		)
			.pipe(map((collision) => collision.getCollisions()))
			.subscribe((result) => {
				this.collidables.push(result);
			});

		new Blob({ offsetY: 100, offsetX: 320 }, this.collisions, this.collidables);
		this.collisions.scale.set(this.scale);

		this.app.stage.addChild(this.collisions);
	}

	public getCollidables(): CollisionBlock[] {
		return this.collidables;
	}
}
