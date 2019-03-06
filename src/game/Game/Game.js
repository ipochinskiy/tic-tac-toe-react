import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Button from '../../ui-components/Button/Button';
import { calculatePCTurn, tileSelected } from '../actions';
import Board from '../Board/Board';
import { GameState } from '../constants';
import './Game.scss';

const isBetween = (num, a, b) => num >= a && num <= b;

class Game extends Component {
    constructor(props) {
        super(props);
        this.tileClicked = this.tileClicked.bind(this);
    }

    componentDidMount() {
        const { gameState, calculatePCTurn } = this.props;
        if (gameState === GameState.PCTurn) {
            calculatePCTurn();
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const { gameState, calculatePCTurn } = nextProps;
        if (gameState === GameState.PCTurn) {
            calculatePCTurn();
        }
    }

    tileClicked(tileIndex) {
        const { tileList, tileSelected, gameState } = this.props;
        if (gameState === GameState.Player1Won || gameState === GameState.Player2Won || gameState === GameState.PCWon) {
            return;
        }

        if (!isBetween(tileIndex, 0, tileList.length - 1)) {
            throw new Error(`Invalid tile index: ${tileIndex}, though total tiles: ${tileList.length}`);
        }

        tileSelected(tileIndex);
    }

    render() {
        const { tileList, gameState, config } = this.props;

        if (!tileList || !gameState || !config) {
            return <Redirect push to='/setup' />;;
        }

        const { boardSize } = config;
        const label = mapGameStateToLabel(gameState, config);

        return (
            <div className='Game'>
                <div className='Game__heading'>{label}</div>
                <Board boardSize={boardSize} tileList={tileList} tileClicked={this.tileClicked}/>
                <div className='Game__buttons'>
                    {/* <div className='Game__button'>
                        <Button shape='primary'>Reset</Button>
                    </div> */}
                    <NavLink to='/setup'>
                        <div className='Game__button'>
                            <Button shape='neutral'>Back to setup</Button>
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}

function mapGameStateToLabel(gameState, config) {
    const { player1Name, player2Name } = config;
    switch (gameState) {
        case GameState.Player1Turn:
            return `${player1Name} to move`;
        case GameState.Player2Turn:
            return `${player2Name} to move`;
        case GameState.PCTurn:
            return `PC to move`;
        case GameState.Player1Won:
            return `${player1Name} won`;
        case GameState.Player2Won:
            return `${player2Name} won`;
        case GameState.PCWon:
            return `PC won`;
        case GameState.Tie:
            return `Tie`;
        default:
            return 'Unknown state';
    }
}

const mapStateToProps = state => {
    return {
        config: state.config,
        gameState: state.gameState,
        tileList: state.tileList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        calculatePCTurn: () => dispatch(calculatePCTurn()),
        tileSelected: index => dispatch(tileSelected(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
