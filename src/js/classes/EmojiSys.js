import EmojiCircle from './EmojiCircle';

export default class EmojiSys {

    constructor(data) {
        this.emojiData = data;
        this.emojiCircles = [];

        this.emojiData.forEach(emoji => {
            const circle = new EmojiCircle(emoji);
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