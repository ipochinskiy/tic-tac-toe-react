import { ActionTypes } from './actions';
import { EMPTY_TILE_CHAR, GameState, POSSIBLE_DEFAULT_STATE_LIST } from './constants';

const initialState = {
    gameState: null,
    tileList: [],
    config: null,
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_CONFIG:
            const { config } = action.payload;
            const index = Math.floor(Math.random() * POSSIBLE_DEFAULT_STATE_LIST.length);

            return {
                ...state,
                gameState: POSSIBLE_DEFAULT_STATE_LIST[index],
                tileList: Array(config.boardSize * config.boardSize).fill(EMPTY_TILE_CHAR),
                config,
            };
        case ActionTypes.CALCULATE_PC_TURN:
            const emptyTileList = getEmptyTileList(state.tileList);
            const randomIndex = emptyTileList[Math.floor(Math.random() * emptyTileList.length)];

            // eslint-disable-next-line
            if (randomIndex == undefined) {
                return state;
            }

            return calculateNextState(state, randomIndex, state.config.pcChar);
        case ActionTypes.TILE_SELECTED:
            const { tileIndex } = action.payload;

            let char;
            if (state.gameState === GameState.Player1Turn) {
                char = state.config.player1Char;
            } else if (state.gameState === GameState.Player2Turn) {
                char = state.config.player2Char;
            }

            if (!char || state.tileList[tileIndex] !== EMPTY_TILE_CHAR) {
                return state;
            }

            return calculateNextState(state, tileIndex, char);
        default:
            return state;
    }
};

function replaceItemInArray(arr, index, item) {
    return [
        ...arr.slice(0, index),
        item,
        ...arr.slice(index + 1),
    ];
}

function getEmptyTileList(tileList) {
    return tileList
        .map((char, index) => char === EMPTY_TILE_CHAR ? index: -1)
        .filter(index => index > -1);
}

function getWinnerChar(board, boardSize, tileToWin) {
    for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        for (let columnIndex = 0; columnIndex < boardSize; columnIndex++) {
            const currentChar = board[rowIndex][columnIndex];
            if (currentChar === EMPTY_TILE_CHAR) {
                continue;
            }

            let equalCharsInColumn = 0;
            for (let kRow = 0; (kRow < tileToWin) && (kRow + rowIndex < boardSize); kRow++) {
                const nextColumnChar = board[kRow + rowIndex][columnIndex];
                if (nextColumnChar === currentChar) {
                    equalCharsInColumn++;
                }
            }

            let equalCharsInRow = 0;
            for (let kColumn = 0; (kColumn < tileToWin) && (kColumn + columnIndex < boardSize); kColumn++) {
                const nextRowChar = board[rowIndex][kColumn + columnIndex];
                if (nextRowChar === currentChar) {
                    equalCharsInRow++;
                }
            }

            let equalCharsInDiagonal = 0;
            for (let kDiagonal = 0; (kDiagonal < tileToWin) && (kDiagonal + rowIndex < boardSize) && (kDiagonal + columnIndex < boardSize); kDiagonal++) {
                const nextDiagonalChar = board[kDiagonal + rowIndex][kDiagonal + columnIndex];
                if (nextDiagonalChar === currentChar) {
                    equalCharsInDiagonal++;
                }
            }

            let equalCharsInReverseDiagonal = 0;
            for (let kDiagonal = 0; (kDiagonal < tileToWin) && (kDiagonal + rowIndex < boardSize) && (columnIndex - kDiagonal >= 0); kDiagonal++) {
                const nextDiagonalChar = board[rowIndex + kDiagonal][columnIndex - kDiagonal];
                if (nextDiagonalChar === currentChar) {
                    equalCharsInReverseDiagonal++;
                }
            }

            if ((equalCharsInColumn === tileToWin) || (equalCharsInRow === tileToWin) || (equalCharsInDiagonal === tileToWin) || (equalCharsInReverseDiagonal === tileToWin)) {
                return currentChar;
            }
        }
    }
}

function chunk(arr, chunkSize) {
    const cache = [];
    const tmp = arr.slice();

    while (tmp.length) {
        const chunk = tmp.splice(0, chunkSize);
        cache.push(chunk);
    }
    return cache;
}

function calculateNextGameState(tileList, currentGameState, config) {
    const { tileToWin, boardSize, player1Char, player2Char, pcChar } = config;
    const board = chunk(tileList, boardSize);

    const winnerChar = getWinnerChar(board, boardSize, tileToWin);
    if (winnerChar === player1Char) {
        return GameState.Player1Won;
    } else if (winnerChar === player2Char) {
        return GameState.Player2Won;
    } else if (winnerChar === pcChar) {
        return GameState.PCWon;
    }

    const emptyTileList = tileList.filter(char => char === EMPTY_TILE_CHAR);
    if (emptyTileList.length === 0) {
        return GameState.Tie;
    }

    if (currentGameState === GameState.Player1Turn) {
        return GameState.Player2Turn;
    } else if (currentGameState === GameState.Player2Turn) {
        return GameState.PCTurn;
    }

    return GameState.Player1Turn;
}

function calculateNextState(state, tileToChangeIndex, char) {
    const tileList = replaceItemInArray(state.tileList, tileToChangeIndex, char);
    const gameState = calculateNextGameState(tileList, state.gameState, state.config);

    return {
        ...state,
        tileList,
        gameState,
    }
}

export default gameReducer;
