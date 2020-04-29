// class Tre extends Sprites {
// 	protected height = 3;
// 	protected width = 1;
// 	constructor(background: PIXI.Container, tileTextures: PIXI.Texture[]) {
// 		super();
// 		this.pushToBackground(373, 100, background, tileTextures);
// 	}
// 	tiles() {
// 		let array = [];
// 		for (let i = 0; i < this.width * this.height; i++) {
// 			const y = Math.floor(i / this.width);
// 			if (y === 2) {
// 				array[i] = 37;
// 			} else if (y === 0) {
// 				array[i] = 23;
// 			} else {
// 				array[i] = 30;
// 			}
// 		}
// 		return array;
// 	}
// }

import Sprites from '../../Sprites';
import { Offsets } from '../../../interfaces';

export default class Tree extends Sprites {
	protected height = 3;
	protected width = 1;

	constructor(protected offsets: Offsets, background: PIXI.Container) {
		super();
		this.pushToBackground(offsets, background);
	}

	protected tiles() {
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
