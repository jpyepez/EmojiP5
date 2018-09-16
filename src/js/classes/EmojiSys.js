import EmojiCircle from './EmojiCircle';
import Quadrant from './Quadrant';

export default class EmojiSys {

    // TODO: implement flexible quadrants
    // TODO: Make quadrant class (single quadrant)

    constructor(data) {
        this.emojiData = data;
        this.emojiCircles = [];

        // quadrants
        this.qColumns = 2;
        this.qRows = 2;

        this.emojiData.forEach(emoji => {
            const circle = new EmojiCircle(emoji);
            this.emojiCircles.push(circle);
        });

        this.initQuadrants();
    }

    update() {
        this.emojiCircles.forEach(ec => ec.update());

        this.clearQuadrants();
        this.lookupQuadrants();
        this.checkCollisions();
    }

    display() {
        this.emojiCircles.forEach(ec => ec.display());
    }

    initQuadrants() {
        this.quadrants = new Array(this.qColumns);
        for(let i = 0; i < this.qColumns; i++) {
            this.quadrants[i] = Array(this.qRows);
        }
        for (let i = 0; i < this.qColumns; i++) {
            for (let j = 0; j < this.qRows; j++) {
                this.quadrants[i][j] = new Quadrant();
            }
        }
    }

    clearQuadrants() {
        for (let i = 0; i < this.qColumns; i++) {
            for (let j = 0; j < this.qRows; j++) {
                this.quadrants[i][j].clear();
            }
        }
    }

    lookupQuadrants() {
        this.emojiCircles.forEach(ec => {
            let i = ec.loc.x < p5.width/2 ? 0 : 1;
            let j = ec.loc.y < p5.height/2 ? 0 : 1;

            this.quadrants[i][j].add(ec);
        })
    }

    checkCollisions() {
        for (let i = 0; i < this.qColumns; i++) {
            for (let j = 0; j < this.qRows; j++) {
                this.quadrants[i][j].checkCollisions(this.quadrants[i][j]);
            }
        }

    }
}