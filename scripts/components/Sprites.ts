import * as PIXI from 'pixi.js';
import Tile from './Tile';

export default abstract class Sprites {
	protected abstract height: number;
	protected abstract width: number;
	protected abstract tiles(): number[];

	protected tile = new Tile();

	pushToBackground({ offsetY, offsetX }, background: PIXI.Container): void {
		const tiles = this.tiles();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const tileIndex = y * this.width + x;
				let tile = tiles[tileIndex];
				let sprite = new PIXI.Sprite(this.tile.tileTextures[tile]);

				sprite.x = x * (this.tile.tileSize - 1) + offsetX;
				sprite.y = y * this.tile.tileSize + offsetY;

				background.addChild(sprite);
			}
		}
	}
}
