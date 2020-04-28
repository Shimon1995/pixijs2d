import * as PIXI from 'pixi.js';
import { range } from 'rxjs';

import IMG from '../assets/sprite.png';

import Sky from './components/backgrounds/Sky';
// import Tree from './components/decorations/Tree';
import app from './app';
import Collisions from './components/Collisions';
import Background from './components/Background';

export default class Main {
	private image = IMG;
	private app = app;

	constructor() {
		document.body.appendChild(this.app.view);
	}

	load(): void {
		this.app.loader
			.add('tileset', this.image)
			.load((loader, resources: any) => {
				// const tileTextures: PIXI.Texture[] = [];
				// const tileSize = 16;

				// range(0, 11 * 7).subscribe((index: number) => {
				// 	let x = index % 7;
				// 	let y = Math.floor(index / 7);
				// 	tileTextures[index] = new PIXI.Texture(
				// 		resources.tileset.texture,
				// 		new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize),
				// 	);
				// });

				// const blob = new PIXI.Sprite(tileTextures[56]);
				// blob.scale.set(4);
				// blob.x = window.innerWidth / 2;
				// blob.y = 780;

				// let collisions = new PIXI.Container();
				// new Tree(collisions, tileTextures);

				// collisions.scale.set(2);

				// let skyBK = new PIXI.Container();
				// new Sky(skyBK, tileTextures);

				// skyBK.scale.set(400);

				new Background(app);
				new Collisions(app);

				// this.app.stage.addChild(skyBK);
				// app.stage.addChild(blob);

				// app.ticker.add(() => {
				// 	tileset.rotation += 0.01;
				// });
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
