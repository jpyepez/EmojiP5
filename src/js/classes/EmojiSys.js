import EmojiCircle from './EmojiCircle';

export default class EmojiSys {

    constructor(data, limits) {
        this.emojiData = data;
        this.emojiCircles = [];

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

}