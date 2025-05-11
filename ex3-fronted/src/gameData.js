/**
 * Local word database for the game
 */
export const WORD_CATEGORIES = {
    ANIMALS: 'Animals',
    FRUITS: 'Fruits',
    COUNTRIES: 'Countries',
    COLORS: 'Colors',
    SPORTS: 'Sports'
};

export const WORD_DATA = {
    [WORD_CATEGORIES.ANIMALS]: [
        { word: 'ELEPHANT', hint: 'Large mammal with a trunk' },
        { word: 'GIRAFFE', hint: 'Tallest animal in the world' },
        { word: 'PENGUIN', hint: 'Black and white bird that cannot fly' },
        { word: 'KANGAROO', hint: 'Australian marsupial that hops' },
        { word: 'BUTTERFLY', hint: 'Colorful insect that goes through metamorphosis' }
    ],
    [WORD_CATEGORIES.FRUITS]: [
        { word: 'PINEAPPLE', hint: 'Tropical fruit with a crown' },
        { word: 'STRAWBERRY', hint: 'Red berry with seeds on the outside' },
        { word: 'MANGO', hint: 'Sweet tropical fruit' },
        { word: 'WATERMELON', hint: 'Large green fruit with red inside' },
        { word: 'BANANA', hint: 'Yellow curved fruit' }
    ],
    [WORD_CATEGORIES.COUNTRIES]: [
        { word: 'AUSTRALIA', hint: 'Island continent Down Under' },
        { word: 'BRAZIL', hint: 'Largest country in South America' },
        { word: 'JAPAN', hint: 'Island nation in East Asia' },
        { word: 'EGYPT', hint: 'Home of the pyramids' },
        { word: 'ITALY', hint: 'Boot-shaped European country' }
    ],
    [WORD_CATEGORIES.COLORS]: [
        { word: 'PURPLE', hint: 'Color of lavender flowers' },
        { word: 'ORANGE', hint: 'Color of a sunset' },
        { word: 'TURQUOISE', hint: 'Blue-green gemstone color' },
        { word: 'MAGENTA', hint: 'Pink-purple color' },
        { word: 'MAROON', hint: 'Dark red-brown color' }
    ],
    [WORD_CATEGORIES.SPORTS]: [
        { word: 'BASKETBALL', hint: 'Sport with hoops and a round ball' },
        { word: 'SWIMMING', hint: 'Water sport' },
        { word: 'TENNIS', hint: 'Sport with rackets and a yellow ball' },
        { word: 'FOOTBALL', hint: 'Most popular sport in the world' },
        { word: 'VOLLEYBALL', hint: 'Sport played with a net and team of 6' }
    ]
};

/**
 * Get all available categories
 * @returns {string[]} Array of category names
 */
export const getCategories = () => {
    return Object.values(WORD_CATEGORIES);
};

/**
 * Get a random word from a specific category
 * @param {string} category - The category to select from
 * @returns {Object|null} Word object with word and hint, or null if category not found
 */
export const getRandomWordFromCategory = (category) => {
    const words = WORD_DATA[category];
    if (!words || words.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

/**
 * Mock API functions to simulate server calls
 */
export const mockAPI = {
    getCategories: () => Promise.resolve(getCategories()),

    getRandomWord: (category) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const word = getRandomWordFromCategory(category);
                if (word) {
                    resolve(word);
                } else {
                    reject(new Error('No words found in this category'));
                }
            }, 500); // Simulate network delay
        });
    },

    saveScore: (scoreData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate saving to local storage
                const scores = JSON.parse(localStorage.getItem('wordGameScores') || '[]');
                scores.push({
                    ...scoreData,
                    id: Date.now(),
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('wordGameScores', JSON.stringify(scores));
                resolve({ success: true });
            }, 300);
        });
    },

    getLeaderboard: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const scores = JSON.parse(localStorage.getItem('wordGameScores') || '[]');
                const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
                resolve(sortedScores);
            }, 300);
        });
    }
};