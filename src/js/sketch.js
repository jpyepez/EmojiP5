import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import EmojiSys from './classes/EmojiSys';
import { getScoreLimits } from './base';

export default (emojiData, streamData) => {

    // TODO Refactor to avoid copying emoji data, and to refer to the original one,
    // which gets updated with stream. Possibly can get rid of stream as 2nd arg.

    return (p5) => {

        // Make 'p5' global
        window.p5 = p5;

        let emojiSys;
        let minScore, maxScore;
        let bg;

        p5.setup = () => {
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            p5.colorMode(p5.HSB);
            bg = p5.color(90);
            p5.background(bg);

            // Emoji data received
            console.log(emojiData);

            // get limits
            ({minScore, maxScore} = getScoreLimits(emojiData));
            // add normalized score attribute
            emojiData.forEach(emoji => {
                emoji.normScore = p5.map(emoji.score, minScore, maxScore, 0., 1.);
            });

            // create system
            emojiSys = new EmojiSys(emojiData);

            // text setup
            p5.textAlign(p5.CENTER, p5.CENTER);
        }

        p5.draw = () => {
            p5.background(bg);
            emojiSys.update();
            emojiSys.display();
        }

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        }

        // add update function to state.stream
        streamData.update = (data) => {
            for(const [k, v] of Object.entries(data)) {
                console.log( k, v);
            }
        }
    }
}