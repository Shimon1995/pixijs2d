import { Sprite } from 'pixi.js';
import { fromEvent, range, animationFrameScheduler } from 'rxjs';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';

import { CollisionBlock, InputEvent } from '../interfaces';

export default class Control {
	public divider = 50;

	public event = fromEvent(document.body, 'keydown').pipe(
		mergeMap((event: KeyboardEvent) =>
			range(0, Infinity, animationFrameScheduler).pipe(
				map((index: number) => ({ offset: index, direction: event.key })),
				takeUntil(fromEvent(document.body, 'keyup')),
				tap(() =>
					fromEvent(document.body, 'keyup').subscribe(function () {
						return (this.divider = 100);
					}),
				),
			),
		),
	);

	constructor(private sprite: Sprite) {
		console.log(this.sprite);

		this.event.subscribe(this.direct);
	}

	private direct({ direction, offset }: InputEvent) {
		offset /= this.divider++;
		switch (direction) {
			case 'ArrowLeft':
				this.sprite.x -= offset;
				break;
			case 'ArrowRight':
				this.sprite.x += offset;
		}
	}

	public detectCollision(sprite: Sprite, collidable: CollisionBlock) {
		if (
			sprite.y + 16 > collidable.offsetY &&
			sprite.y < collidable.offsetY + collidable.height * 16 &&
			sprite.x + 16 > collidable.offsetX &&
			sprite.x < collidable.offsetX + collidable.width * 16
		) {
			return true;
		}
	}
}
