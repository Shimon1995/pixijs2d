import IMG from '../assets/sprite.png';

import Collisions from './components/Collision/Collision';
import Background from './components/Background/Background';
import Decoration from './components/Decoration/Decoration';
import app from './app';

export default class Main {
	private image = IMG;
	private app = app;

	constructor() {
		document.body.appendChild(this.app.view);
	}

	load(): void {
		this.app.loader.add('tileset', this.image).load((loader, resources) => {
			new Background();
			new Decoration();

			const colliders = new Collisions();
			// const collidables = colliders.getCollidables();

			// new Blob(collidables);
		});
	}

	loadErrors(): void {
		this.app.loader.onError.add((...args: any[]) => console.log(args));
	}

	main(): void {
		this.load();

		this.loadErrors();
	}
}
