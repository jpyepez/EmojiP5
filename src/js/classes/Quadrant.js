export default class Quadrant {

    constructor() {
        this.emojiCircles = [];
        this.color = Math.random()*360;
    }

    clear() {
        this.emojiCircles = [];
    }

    add(emojiCircle) {
        emojiCircle.hue = this.color;
        this.emojiCircles.push(emojiCircle);
    }

    checkCollisions(target) {
        if(this === target) {
            this.emojiCircles.forEach((ec, idx, tSelf) => {
                for(let i = idx; i < tSelf.length; i++) {
                    if(ec !== tSelf[i]) { 
                        if (ec.loc.dist(tSelf[i].loc) <= (ec.radius + tSelf[i].radius)) {
                            p5.stroke(0);
                            p5.line(ec.loc.x, ec.loc.y, tSelf[i].loc.x, tSelf[i].loc.y);
                            ec.vel = ec.loc.copy().sub(tSelf[i].loc).setMag(ec.velMag);
                            tSelf[i].vel = tSelf[i].loc.copy().sub(ec.loc).setMag(tSelf[i].velMag);
                        }
                    }
                }
            });
        }
    }
}