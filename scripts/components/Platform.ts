import Sprites from './Sprites';

export default class Platform extends Sprites {
	constructor(background: PIXI.Container, tileTextures: PIXI.Texture[]) {
		super(3, 1, 200, 200, background, tileTextures);
	}
	tiles() {
		return [3, 4, 5];
	}
}
