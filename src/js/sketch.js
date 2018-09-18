import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import EmojiSys from './classes/EmojiSys';
import { getScoreLimits } from './base';

export default (emojiData) => {

    // TODO: Apply palette
    // TODO: Canvas full rescale on window resize
    // TODO: Style canvas
    // TODO: Top emojis

    return (p5) => {

        // Make 'p5' global
        window.p5 = p5;

        let emojiSys;
        let minMax;     // track min/max limits
        let bg;

        p5.setup = () => {
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            p5.colorMode(p5.HSB);
            bg = p5.color(90);
            p5.background(bg);

            // Emoji data received
            // console.log(emojiData);

            // get limits
            minMax = getScoreLimits(emojiData);

            // create system
            emojiSys = new EmojiSys(emojiData, minMax);

            // text setup
            p5.textAlign(p5.CENTER, p5.CENTER);
        }

        p5.draw = () => {
            p5.background(bg);

            minMax = getScoreLimits(emojiData);

            emojiSys.update();
            emojiSys.display();
        }

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        }
    }
}