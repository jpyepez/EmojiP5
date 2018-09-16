export default class EmojiCircle {

    constructor(emoji, limits) {
        this.emoji = emoji;
        this.limits = limits;
        this.cachedScore = this.emoji.score;

        let randX = 100 + Math.random()*(p5.width - 200);
        let randY = 100 + Math.random()*(p5.height - 200);
        this.loc = p5.createVector(randX, randY);

        this.maxRadius = 50.0;
        this.changeOffset = 0.;
        this.setRadius();
        this.noiseInit = 100*Math.random();

        this.velMag = p5.map(Math.random(), 0, 1, 0.05, 0.25);
        let x = p5.map(Math.random(), 0, 1, -1, 1);
        let y = p5.map(Math.random(), 0, 1, -1, 1);
        this.vel = p5.createVector(x, y).setMag(this.velMag);

        this.hue = 200;
        this.hl = 160;
    }

    update() {
        this.checkScoreChange();
        this.setRadius();

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
        p5.text(this.emoji.char, this.loc.x, this.loc.y);
    }

    checkEdges() {
        this.loc.x = this.loc.x > p5.width ? 0 : this.loc.x;
        this.loc.x = this.loc.x < 0 ? p5.width : this.loc.x;
        this.loc.y = this.loc.y > p5.height ? 0 : this.loc.y;
        this.loc.y = this.loc.y < 0 ? p5.height : this.loc.y;
    }

    normalizeScore(current, min, max) {
        return p5.map(current, min, max, 0.2, 1.);
    }

    highlight(time) {
        this.hue = this.hl;
        this.changeOffset = 10;
        setTimeout(() => { 
            this.hue = 200;
            this.changeOffset = 0;
        }, 1000);
    }

    checkScoreChange() {
        if(this.emoji.score !== this.cachedScore) {
            this.highlight(100);
            this.cachedScore = this.emoji.score;
        }
    }

    setRadius() {
        this.radius = this.normalizeScore(this.emoji.score,
            this.limits.minScore,
            this.limits.maxScore,
            0.2,
            1.) * this.maxRadius + this.changeOffset;
    }
}