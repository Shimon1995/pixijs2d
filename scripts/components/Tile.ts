import * as PIXI from 'pixi.js';
import { range } from 'rxjs';

import app from '../app';

export default class Tile {
	tileTextures: PIXI.Texture[] = [];
	tileSize = 16;
	resources: any = app.loader.resources;

	constructor() {
		range(0, 11 * 7).subscribe((index: number) => {
			let x = index % 7;
			let y = Math.floor(index / 7);
			this.tileTextures[index] = new PIXI.Texture(
				this.resources.tileset.texture,
				new PIXI.Rectangle(
					x * this.tileSize,
					y * this.tileSize,
					this.tileSize,
					this.tileSize,
				),
			);
		});
	}
}
