import p5 from 'p5';
import sketch from './sketch';
import EmojiData from './classes/EmojiData';

const state = {};

(async () => {

    state.emojis = new EmojiData();

    try {
        await state.emojis.getData();
        // state.emojis.getLast100();
        state.emojis.getTop100();

        // Create sketch
        // const myp5 = sketch(state.emojis.last100);
        const myp5 = sketch(state.emojis.top100);
        new p5(myp5, 'p5sketch');

    } catch(error) {
        console.log(error);
    }

    // get stream and update emoji data
    const endpoint = "https://stream.emojitracker.com";
    const evsource = new EventSource(`${endpoint}/subscribe/eps`);

    evsource.onmessage = (event) => {
        const updates = JSON.parse(event.data);

        // find key in 'last100' and update
        for (const [k, v] of Object.entries(updates)) {
            // state.emojis.last100.forEach(emoji => {
            //     if(emoji.id === k) {
            //         emoji.score += v;
            //         // console.log(`Emoji ${emoji.char} increased by ${v}.`);
            //     }
            // })
            state.emojis.top100.forEach(emoji => {
                if(emoji.id === k) {
                    emoji.score += v;
                    // console.log(`Emoji ${emoji.char} increased by ${v}.`);
                }
            })
        }
    }

})();
