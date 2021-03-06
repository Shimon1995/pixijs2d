export interface Offsets {
	offsetY: number;
	offsetX: number;
}

export interface CollisionBlock {
	offsetY: number;
	offsetX: number;
	height: number;
	width: number;
}

export interface InputEvent {
	offset: number;
	direction: string;
}
