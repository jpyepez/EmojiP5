export default class EmojiCircle {

    constructor(emoji, limits) {
        this.emoji = emoji;
        this.limits = limits;
        this.cachedScore = this.emoji.score;

        let randX = 100 + Math.random()*(p5.width - 200);
        let randY = 100 + Math.random()*(p5.height - 200);
        this.loc = p5.createVector(randX, randY);

        this.maxArea = 10000.0;
        this.areaOffset = 0.;
        this.offsetRate = 1.;
        this.setArea(0.4, 1.);
        this.noiseInit = 100*Math.random();

        this.velMag = p5.map(Math.random(), 0, 1, 0.05, 0.25);
        let x = p5.map(Math.random(), 0, 1, -1, 1);
        let y = p5.map(Math.random(), 0, 1, -1, 1);
        this.vel = p5.createVector(x, y).setMag(this.velMag);

        this.circles = 5;
        this.oHue = 200;
        this.hue = this.oHue;
        this.hl = 160;
        this.hasChanged = false;
    }

    update() {
        this.checkScoreChange();
        this.setArea(0.4, 1.);

        this.loc.add(this.vel);
        this.checkEdges();
    }

    display() {
        p5.noStroke();
        for(let i = 0; i < this.circles; i++) {
            p5.fill(p5.color(p5.lerp(this.hue, this.hue+100, 1./this.circles), 60, 90, 0.15));
            p5.ellipse(this.loc.x, this.loc.y, i*this.radius*2/this.circles);

        }
        this.showEmoji();
    }

    showEmoji() {
        p5.fill(255);
        p5.textSize(20);
        p5.text(this.emoji.char, this.loc.x, this.loc.y);
    }

    checkEdges() {
        this.loc.x = this.loc.x > p5.width + this.radius ? -this.radius : this.loc.x;
        this.loc.x = this.loc.x < -this.radius ? p5.width + this.radius : this.loc.x;
        this.loc.y = this.loc.y > p5.height + this.radius ? -this.radius : this.loc.y;
        this.loc.y = this.loc.y < -this.radius ? p5.height + this.radius : this.loc.y;
    }

    highlight(time) {
        this.hue = this.hl;
        this.hasChanged = true;
        setTimeout(() => { 
            this.hue = this.oHue;
            this.areaOffset = 0;
            this.hasChanged = false;
        }, time);
    }

    checkScoreChange() {
        // highlight if changed
        if(this.emoji.score !== this.cachedScore) {
            this.highlight(500);
            this.cachedScore = this.emoji.score;
        }
        
        // grow if recently changed
        if(this.hasChanged) this.areaOffset += this.offsetRate;
    }

    setArea(minScl, maxScl) {
        this.radius = p5.map(this.emoji.score,
            this.limits.minScore,
            this.limits.maxScore,
            minScl,
            maxScl) * p5.sqrt(this.maxArea/Math.PI) + this.areaOffset;
    }


}