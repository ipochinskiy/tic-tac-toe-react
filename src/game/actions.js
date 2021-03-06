export const ActionTypes = {
    CALCULATE_PC_TURN:      '[Game] Calculate PC Turn',
    SET_GAME_STATE:         '[Game] Set Game State',
    TILE_SELECTED:          '[Game] Tile Selected',
    SET_CONFIG:             '[Game] Set Config',
};

export function setGameState(payload) {
    const { gameState } = payload;
    return {
        type: ActionTypes.SET_GAME_STATE,
        payload: { gameState },
    };
}

export function calculatePCTurn() {
    return {
        type: ActionTypes.CALCULATE_PC_TURN,
    };
}

export function tileSelected(tileIndex) {
    return {
        type: ActionTypes.TILE_SELECTED,
        payload: { tileIndex },
    };
}

export function setConfig(config) {
    return {
        type: ActionTypes.SET_CONFIG,
        payload: { config },
    };
}
