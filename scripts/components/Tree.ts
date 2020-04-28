import Sprites from './Sprites';

export default class Tree extends Sprites {
	constructor(background: PIXI.Container, tileTextures: PIXI.Texture[]) {
		super(1, 3, 373, 100, background, tileTextures);
	}
	tiles() {
		let array = [];
		for (let i = 0; i < this.width * this.height; i++) {
			const y = Math.floor(i / this.width);
			if (y === 2) {
				array[i] = 37;
			} else if (y === 0) {
				array[i] = 23;
			} else {
				array[i] = 30;
			}
		}
		return array;
	}
}
