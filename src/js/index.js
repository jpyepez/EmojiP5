import p5 from 'p5';
import sketch from './sketch';
import EmojiData from './classes/EmojiData';

const state = {};

(async () => {

    console.log("EmojiPacker started!");

    state.emojis = new EmojiData();
    state.stream = {};

    try {
        await state.emojis.getData();
        state.emojis.getLast100();

        // Create sketch
        const myp5 = sketch(state.emojis.last100, state.stream);
        new p5(myp5, 'p5sketch');

    } catch(error) {
        console.log(error);
    }

    // get stream and update emoji data
    const endpoint = "https://stream.emojitracker.com";
    const evsource = new EventSource(`${endpoint}/subscribe/eps`);
    evsource.onmessage = (event) => {
        const updates = JSON.parse(event.data);
        state.stream.update(updates);
    }

})();
