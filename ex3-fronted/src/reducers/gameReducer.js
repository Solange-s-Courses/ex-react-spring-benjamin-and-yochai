/**
 * Pure game reducer for managing game state
 * All side effects should be handled outside the reducer
 */

export const GAME_ACTIONS = {
    INIT_GAME: 'INIT_GAME',
    SET_ERROR: 'SET_ERROR',
    GUESS_LETTER: 'GUESS_LETTER',
    GUESS_WORD: 'GUESS_WORD',
    SHOW_HINT: 'SHOW_HINT',
    UPDATE_TIMER: 'UPDATE_TIMER',
    SET_GAME_STATUS: 'SET_GAME_STATUS',
    RESET_GAME: 'RESET_GAME',
    SET_SCORE: 'SET_SCORE',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

export const GAME_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    PLAYING: 'playing',
    WON: 'won',
};

export const initialGameState = {
    word: '',
    displayWord: [],
    guessedLetters: [],
    attempts: 0,
    gameTime: 0,
    gameStatus: GAME_STATUS.IDLE,
    hint: '',
    showHint: false,
    score: 0,
    error: null,
    category: '',
    playerName: ''
};

/**
 * Pure game reducer function - no side effects
 * @param {Object} state - Current game state
 * @param {Object} action - Action object with type and payload
 * @returns {Object} New game state
 */
export const gameReducer = (state, action) => {
    switch (action.type) {
        case GAME_ACTIONS.INIT_GAME:
            const { word, hint } = action.payload.wordData;
            const upperWord = word.toUpperCase();
            
            return {
                ...state,
                playerName: action.payload.playerName,
                category: action.payload.category,
                word: upperWord,
                displayWord: upperWord.split('').map(() => '_'),
                hint: hint,
                guessedLetters: [],
                attempts: 0,
                gameTime: 0,
                gameStatus: GAME_STATUS.PLAYING,
                showHint: false,
                score: 0,
                error: null
            };

        case GAME_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                gameStatus: GAME_STATUS.IDLE
            };

        case GAME_ACTIONS.GUESS_LETTER: {
            const { letter } = action.payload;
            const upperLetter = letter.toUpperCase();

            if (state.gameStatus !== GAME_STATUS.PLAYING) {
                return state;
            }

            if (state.guessedLetters.includes(upperLetter) && state.word.includes(upperLetter)) {
                return {
                    ...state,
                    attempts: state.attempts + 1,
                    error: `You already guessed the letter '${upperLetter}'`}
            }

            if(!state.word.includes(upperLetter)) {
                return {
                    ...state,
                    guessedLetters: [...state.guessedLetters, upperLetter],
                    attempts: state.attempts + 1,
                    error: `Wrong guess! the letter '${upperLetter}' is not in the word.`}
            }

            const newGuessedLetters = [...state.guessedLetters, upperLetter];
            const newDisplayWord = state.word.split('').map((char, index) => {
                if (newGuessedLetters.includes(char)) {
                    return char;
                }
                return state.displayWord[index];
            });

            const isGameWon = !newDisplayWord.includes('_');

            return {
                ...state,
                guessedLetters: newGuessedLetters,
                attempts: state.attempts,
                displayWord: newDisplayWord,
                gameStatus: isGameWon ? GAME_STATUS.WON : GAME_STATUS.PLAYING,
                error: null
            };
        }

        case GAME_ACTIONS.GUESS_WORD: {
            const { guess } = action.payload;
            const isCorrect = guess.toUpperCase() === state.word;

            return {
                ...state,
                attempts: state.attempts + 1,
                gameStatus: isCorrect ? GAME_STATUS.WON : GAME_STATUS.PLAYING,
                displayWord: isCorrect ? state.word.split('') : state.displayWord,
                error: isCorrect ? null : 'Incorrect guess!'
            };
        }

        case GAME_ACTIONS.SHOW_HINT:
            return {
                ...state,
                showHint: true
            };

        case GAME_ACTIONS.UPDATE_TIMER:
            return {
                ...state,
                gameTime: state.gameTime + 1
            };

        case GAME_ACTIONS.SET_SCORE:
            return {
                ...state,
                score: action.payload
            };

        case GAME_ACTIONS.SET_GAME_STATUS:
            return {
                ...state,
                gameStatus: action.payload,
                gameStarted: action.payload === GAME_STATUS.PLAYING
            };

        case GAME_ACTIONS.RESET_GAME:
            return {
                ...initialGameState,
                category: state.category,
                playerName: state.playerName
            };

        case GAME_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};

export default gameReducer;