import Sprites from '../../Sprites';
import { range } from 'rxjs';
import { Offsets } from '../../../interfaces';

export default class Ground extends Sprites {
	protected height = 4;
	protected width = 64;
	protected collidable = true;

	constructor(protected offsets: Offsets, background: PIXI.Container) {
		super();
		this.pushToBackground(offsets, background);
	}

	protected tiles() {
		let array = [];
		range(0, this.width * this.height).subscribe((index: number) => {
			const y = Math.floor(index / this.width);
			// const x = i % this.height;
			if (y === 0) {
				array[index] = 1;
			} else {
				array[index] = 8;
			}
		});
		return array;
	}
}
