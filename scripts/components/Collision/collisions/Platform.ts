import Sprites from '../../Sprites';
import { Offsets } from '../../../interfaces';

export default class Platform extends Sprites {
	protected height = 1;
	protected width = 3;
	protected collidable = true;

	constructor(protected offsets: Offsets, background: PIXI.Container) {
		super();
		this.pushToBackground(offsets, background);
	}

	protected tiles() {
		return [3, 4, 5];
	}
}
