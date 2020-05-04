import { Sprite, Ticker, Container } from 'pixi.js';

import { fromEvent, range, animationFrameScheduler, timer, iif } from 'rxjs';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';

import Sprites from '../Sprites';
// import Control from '../../control/Control';
import { Offsets, CollisionBlock, InputEvent } from '../../interfaces';

export default class Blob extends Sprites {
	protected height = 1;
	protected width = 1;
	private divider = 100;
	private down = 0.9;
	private ticker = Ticker.shared;

	public event = fromEvent(document.body, 'keydown').pipe(
		mergeMap((event: KeyboardEvent) =>
			event.key !== 'ArrowUp' &&
			this.detectCollision(this.sprite, this.collidables) === 'collided'
				? range(1, Infinity, animationFrameScheduler).pipe(
						map((offset: number) => ({
							offset,
							direction: event.key,
						})),
						takeUntil(fromEvent(document.body, 'keyup')),
						tap(() =>
							fromEvent(document.body, 'keyup').subscribe(
								() => (this.divider = 100),
							),
						),
				  )
				: range(1, 1, animationFrameScheduler).pipe(
						map((offset: number) => ({ offset, direction: event.key })),
						takeUntil(timer(1_500)),
				  ),
		),
	);

	constructor(
		protected offsets: Offsets,
		background: Container,
		private collidables: CollisionBlock[],
	) {
		super();
		this.event.subscribe((object) => {
			if (this.detectCollision(this.sprite, this.collidables) === 'collided')
				this.direct(object);
		});

		this.ticker.add(() => {
			this.sprite.y += this.down;
			this.down += 0.005;
			if (this.detectCollision(this.sprite, this.collidables) === 'collided') {
				this.ticker.stop();
				this.down = 0.7;
			}
		});
		this.pushToBackground(offsets, background);
	}

	protected tiles() {
		return [48];
	}

	private direct = ({ direction, offset }: InputEvent) => {
		offset /= this.divider;
		switch (direction) {
			case 'ArrowLeft':
				this.sprite.x -= offset;
				break;
			case 'ArrowRight':
				this.sprite.x += offset;
				break;
			case 'ArrowUp':
				range(1, 100, animationFrameScheduler).subscribe((offsetY) => {
					// this.divider += 0.05;
					this.sprite.y -= offsetY / this.divider;
				});
				setTimeout(() => {
					this.ticker.start();
					if (
						this.detectCollision(this.sprite, this.collidables) === 'collided'
					)
						this.ticker.stop();
				}, 1_000);
		}
		console.log(this.divider);
		if (this.detectCollision(this.sprite, this.collidables) === 'uncollided')
			this.ticker.start();
	};

	public detectCollision(
		sprite: Sprite,
		collidables: CollisionBlock[],
	): string {
		for (let collidable of collidables) {
			if (
				sprite.y + 16 > collidable.offsetY &&
				sprite.y < collidable.offsetY + collidable.height * 16 &&
				sprite.x + 16 > collidable.offsetX &&
				sprite.x < collidable.offsetX + collidable.width * 16
			) {
				return 'collided';
			}
		}
		return 'uncollided';
	}
}
