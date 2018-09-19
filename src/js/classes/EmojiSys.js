import EmojiCircle from './EmojiCircle';

export default class EmojiSys {

    constructor(data, limits) {
        this.emojiData = data;
        this.emojiCircles = [];
        this.canvasDims = p5.createVector(p5.width, p5.height);

        this.emojiData.forEach(emoji => {
            const circle = new EmojiCircle(emoji, limits);
            this.emojiCircles.push(circle);
        });
    }

    update() {
        this.emojiCircles.forEach(ec => ec.update());
    }

    display() {
        this.emojiCircles.forEach(ec => ec.display());
    }

    resizeEmojiLocations() {
        this.emojiCircles.forEach(ec => {
            ec.loc.x = p5.map(ec.loc.x, 0, this.canvasDims.x, 0, p5.width);
            ec.loc.y = p5.map(ec.loc.y, 0, this.canvasDims.y, 0, p5.height);

            this.canvasDims = createVector(p5.width, p5.height);
        });
    }

}