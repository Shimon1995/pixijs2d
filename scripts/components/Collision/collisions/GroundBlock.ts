import Sprites from '../../Sprites';
import { Offsets } from '../../../interfaces';

export default class GroungBlock extends Sprites {
	protected height = 3;
	protected width = 3;
	protected collidable = true;

	constructor(protected offsets: Offsets, background: PIXI.Container) {
		super();
		this.pushToBackground(this.offsets, background);
	}

	tiles() {
		return [0, 1, 2, 7, 8, 9, 14, 15, 16];
	}
}
