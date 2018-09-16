import p5 from 'p5';
import sketch from './sketch';
import EmojiData from './classes/EmojiData';

const state = {};

(async () => {

    console.log("EmojiPacker started!");

    state.emojis = new EmojiData();

    try {
        await state.emojis.getData();
        state.emojis.getLast100();

        // Create sketch
        const myp5 = sketch(state.emojis.last100);
        new p5(myp5, 'p5sketch');

    } catch(error) {
        console.log(error);
    }

})();
