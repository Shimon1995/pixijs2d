import Sprites from './Sprites';

export default class Ground extends Sprites {
    constructor(background: PIXI.Container, tileTextures: PIXI.Texture[]) {
        super(64, 4, 420, 0, background, tileTextures);
    }
    tiles() {
        let array = [];
        for (let i = 0; i < this.height * this.width; i++) {
            const y = Math.floor(i / this.width);
            // const x = i % this.height;
            if (y === 0) {
                array[i] = 1;
            } else {
                array[i] = 8;
            }
        }
        return array;
    }
};