import * as PIXI from 'pixi.js';

import Tile from './Tile';
import { CollisionBlock, Offsets } from '../interfaces';

export default abstract class Sprites {
	protected abstract height: number;
	protected abstract width: number;
	protected abstract offsets: Offsets;
	protected abstract tiles(): number[];
	protected sprite: PIXI.Sprite;

	protected collidable: boolean = false;
	protected tile = new Tile();

	public getCollisions(): CollisionBlock | undefined {
		if (this.collidable) {
			const { height, width } = this;
			return {
				...this.offsets,
				height,
				width,
			};
		} else {
			return undefined;
		}
	}

	pushToBackground({ offsetY, offsetX }, background: PIXI.Container): void {
		const tiles = this.tiles();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const tileIndex = y * this.width + x;
				let tile = tiles[tileIndex];
				this.sprite = new PIXI.Sprite(this.tile.tileTextures[tile]);

				this.sprite.x = x * (this.tile.tileSize - 1) + offsetX;
				this.sprite.y = y * this.tile.tileSize + offsetY;

				background.addChild(this.sprite);
			}
		}
	}
}
