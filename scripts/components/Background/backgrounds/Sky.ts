import Sprites from '../../Sprites';
import { Offsets } from '../../../interfaces';
import { range } from 'rxjs';

export default class Sky extends Sprites {
	protected height = 1;
	protected width = 1;
	constructor(offsets: Offsets, background: PIXI.Container) {
		super();
		this.pushToBackground(offsets, background);
	}

	protected tiles(): number[] {
		let array: number[] = [];
		const maxIndex = this.width * this.height;
		range(0, maxIndex).subscribe((index: number) => {
			array[index] = 74;
		});
		return array;
	}
}
