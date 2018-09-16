export default class EmojiCircle {

    constructor(emoji) {
        this.char = emoji.char;
        this.id = emoji.id;
        this.name = emoji.name;
        this.score = emoji.score;
        this.normScore = emoji.normScore;

        let randX = 100 + Math.random()*(p5.width - 200);
        let randY = 100 + Math.random()*(p5.height - 200);
        this.loc = p5.createVector(randX, randY);

        this.maxRadius = 50.0;
        this.radius = p5.map(this.normScore, 0., 1., 0.2, 1.)*this.maxRadius;
        this.noiseInit = 100*Math.random();

        this.velMag = p5.map(Math.random(), 0, 1, 0.05, 0.25);
        let x = p5.map(Math.random(), 0, 1, -1, 1);
        let y = p5.map(Math.random(), 0, 1, -1, 1);
        this.vel = p5.createVector(x, y).setMag(this.velMag);

        this.hue = 200;
    }

    update() {
        this.loc.add(this.vel);
        this.checkEdges();
    }

    display() {
        p5.noStroke();
        p5.fill(p5.color(this.hue, 60, 90, 0.45));
        p5.ellipse(this.loc.x, this.loc.y, this.radius*2);
        this.showEmoji();
    }

    showEmoji() {
        p5.fill(255);
        p5.textSize(20);
        p5.text(this.char, this.loc.x, this.loc.y);
    }

    checkEdges() {
        this.loc.x = this.loc.x > p5.width ? 0 : this.loc.x;
        this.loc.x = this.loc.x < 0 ? p5.width : this.loc.x;
        this.loc.y = this.loc.y > p5.height ? 0 : this.loc.y;
        this.loc.y = this.loc.y < 0 ? p5.height : this.loc.y;
    }
}