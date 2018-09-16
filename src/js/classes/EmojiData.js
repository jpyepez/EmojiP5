import axios from 'axios';

const apiUrl = 'https://api.emojitracker.com/v1/rankings';

export default class EmojiData{

    constructor() {
    }

    async getData() {
        try {
            const res = await axios(`${apiUrl}`);
            this.rankings = res.data;
        } catch (error) {
            console.log(error);
        }

    }

    getTop100() {
        this.top100 = this.rankings.slice(0, 100);
    }

    async getLast100() {
        this.last100 = this.rankings.slice(-100);
    }
}