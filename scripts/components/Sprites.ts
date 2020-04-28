import * as PIXI from 'pixi.js';

export default abstract class Sprites {
	protected abstract tiles(): number[];

	protected tileSize = 16;

	constructor(
		protected width: number,
		protected height: number,
		offsetY: number,
		offsetX: number,
		background: PIXI.Container,
		tileTextures: PIXI.Texture[],
	) {
		const tiles = this.tiles();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const tileIndex = y * this.width + x;
				let tile = tiles[tileIndex];
				let sprite = new PIXI.Sprite(tileTextures[tile]);

				sprite.x = x * (this.tileSize - 1) + offsetX;
				sprite.y = y * this.tileSize + offsetY;

				background.addChild(sprite);
			}
		}
	}
}
