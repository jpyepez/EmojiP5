import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import EmojiSys from './classes/EmojiSys';

const getScoreLimits = (data) => {
    const minScore = data.reduce((min, emoji) =>
        emoji.score < min ? emoji.score : min, data[0].score);

    const maxScore = data.reduce((max, emoji) =>
        emoji.score > max ? emoji.score : max, data[0].score);

    return { minScore, maxScore };
}

export default (emojiData) => {

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
    }
}