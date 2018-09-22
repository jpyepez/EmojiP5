import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import EmojiSys from './classes/EmojiSys';
import { getScoreLimits } from './base';
import img from '../assets/output.png';

export default (emojiData) => {

    // TODO: Nav flex
    // TODO: Emoji responsive size

    return (p5) => {

        // Make 'p5' global
        window.p5 = p5;

        let emojiSys;
        let minMax;     // track min/max limits
        let bg;

        const parent = document.getElementById('p5sketch');

        p5.preload = () => {
            bg = p5.loadImage(img);
        }

        p5.setup = () => {
            p5.createCanvas(parent.offsetWidth, parent.offsetHeight);
            p5.pixelDensity(1);
            p5.colorMode(p5.HSB);

            // bg = p5.color(230, 95, 23);
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
            p5.resizeCanvas(parent.offsetWidth, parent.offsetHeight);
            emojiSys.resizeEmojiLocations();
        }
    }
}