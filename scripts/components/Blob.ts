import * as PIXI from 'pixi.js';

import Global from './Globals';
import Tile from './Tile';
import { CollisionBlock } from '../interfaces';

export default class Blob extends Global {
	private blob = new PIXI.Container();
	private tile = new Tile();
	private scale = 2;

	constructor(colliders: CollisionBlock[]) {
		super();

		const blobImage = new PIXI.Sprite(this.tile.tileTextures[48]);
		blobImage.x = 500;
		blobImage.y = 200;
		blobImage.scale.set(this.scale);
		this.blob.addChild(blobImage);

		this.app.stage.addChild(blobImage);

		let i = 0;
		this.app.ticker.add((deltaTime) => {
			blobImage.y += 1;
			i++;
		});

		const ticker = PIXI.Ticker.shared;

		ticker.autoStart = false;

		ticker.add(() => {
			blobImage.x += 1;
			if (i === 100) ticker.stop();
		});

		ticker.start();
	}
}
