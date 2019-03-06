export const EMPTY_TILE_CHAR = ' ';

export const GameState = {
    Player1Turn: 'player1Turn',
    Player2Turn: 'player2Turn',
    PCTurn: 'pcTurn',
    Player1Won: 'player1Won',
    Player2Won: 'player2Won',
    PCWon: 'pcWon',
    Tie: 'tie',
};

export const POSSIBLE_DEFAULT_STATE_LIST = [
    GameState.Player1Turn,
    GameState.Player2Turn,
    GameState.PCTurn,
];