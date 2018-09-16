
export const getScoreLimits = (data) => {
    const minScore = data.reduce((min, emoji) =>
        emoji.score < min ? emoji.score : min, data[0].score);

    const maxScore = data.reduce((max, emoji) =>
        emoji.score > max ? emoji.score : max, data[0].score);

    return { minScore, maxScore };
}