import * as PIXI from 'pixi.js';

import IMG from '../assets/sprite.png';

import Sky from './components/Sky';
import Tree from './components/Tree';
import Ground from './components/Ground';
import GroungBlock from './components/GroundBlock';
import Platform from './components/Platform';

const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
});

document.body.appendChild(app.view);

app.loader.add('tileset', IMG).load((loader, resources: any) => {
	const tileTextures: PIXI.Texture[] = [];
	const tileSize = 16;

	for (let i = 0; i < 11 * 7; i++) {
		let x = i % 7;
		let y = Math.floor(i / 7);
		tileTextures[i] = new PIXI.Texture(
			resources.tileset.texture,
			new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize),
		);
	}

	const blog = new PIXI.Sprite(tileTextures[56]);
	blog.scale.set(4);
	blog.x = window.innerWidth / 2;
	blog.y = 780;

	let background = new PIXI.Container();
	new GroungBlock(background, tileTextures);
	new Platform(background, tileTextures);
	new Ground(background, tileTextures);
	new Tree(background, tileTextures);

	background.scale.set(2);

	let skyBK = new PIXI.Container();
	new Sky(skyBK, tileTextures);

	skyBK.scale.set(400);

	app.stage.addChild(skyBK);
	app.stage.addChild(background);
	app.stage.addChild(blog);

	// app.ticker.add(() => {
	// 	tileset.rotation += 0.01;
	// });
});

app.loader.onError.add((...args: any[]) => console.log(args));
