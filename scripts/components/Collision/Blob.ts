import * as PIXI from 'pixi.js';
import { fromEvent, range, animationFrameScheduler } from 'rxjs';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';

import Sprites from '../Sprites';
import { Offsets, CollisionBlock } from '../../interfaces';

export default class Blob extends Sprites {
	protected height = 1;
	protected width = 1;
	private divider = 100;
	private ticker = PIXI.Ticker.shared;

	constructor(
		protected offsets: Offsets,
		background: PIXI.Container,
		collidables: CollisionBlock[],
	) {
		super();

		fromEvent(document.body, 'keydown')
			.pipe(
				mergeMap((event: KeyboardEvent) =>
					range(0, Infinity, animationFrameScheduler).pipe(
						map((index: number) => ({ offset: index, direction: event.key })),
						takeUntil(fromEvent(document.body, 'keyup')),
						tap(() =>
							fromEvent(document.body, 'keyup').subscribe(
								() => (this.divider = 100),
							),
						),
					),
				),
			)
			.subscribe(this.direct);

		this.ticker.add(() => {
			this.sprite.y += 1;
			// collision detection
			for (const collidable of collidables) {
				if (
					this.sprite.y + 16 > collidable.offsetY &&
					this.sprite.y < collidable.offsetY + collidable.height * 16 &&
					this.sprite.x + 16 > collidable.offsetX &&
					this.sprite.x < collidable.offsetX + collidable.width * 16
				)
					this.ticker.stop();
			}
		});

		this.pushToBackground(offsets, background);
	}
	protected tiles() {
		return [48];
	}
	private direct = ({
		direction,
		offset,
	}: {
		direction: string;
		offset: number;
	}): void => {
		offset /= this.divider;
		switch (direction) {
			case 'ArrowLeft':
				this.sprite.x -= offset;
				break;
			case 'ArrowRight':
				this.sprite.x += offset;
		}
		this.divider++;
	};
}
