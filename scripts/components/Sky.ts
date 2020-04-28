import Sprites from './Sprites';

export default class Sky extends Sprites {
	constructor(background: PIXI.Container, tileTextures: PIXI.Texture[]) {
		super(1, 1, 0, 0, background, tileTextures);
	}

	protected tiles(): number[] {
		let array: number[] = [];

		for (let i = 0; i < this.width * this.height; i++) {
			array[i] = 74;
		}
		return array;
	}
}
