import Sprites from './Sprites';

export default class GroungBlock extends Sprites {
	constructor(background: PIXI.Container, tileTextures: PIXI.Texture[]) {
		super(3, 3, 300, 300, background, tileTextures);
	}
	tiles() {
		return [0, 1, 2, 7, 8, 9, 14, 15, 16];
	}
}
