import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../ui-components/Button/Button';
import { setConfig } from '../actions';
import './Setup.scss';

const DEFAULT_BOARD_SIZE = 5;
const DEFAULT_TILE_TO_WIN = 3;
const DEFAULT_PC_CHAR = 'p';
const DEFAULT_PLAYER1_NAME = 'Player 1';
const DEFAULT_PLAYER1_CHAR = 'x';
const DEFAULT_PLAYER2_NAME = 'Player 2';
const DEFAULT_PLAYER2_CHAR = 'o';

export class Setup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardSize: DEFAULT_BOARD_SIZE,
            tileToWin: DEFAULT_TILE_TO_WIN,
            pcChar: DEFAULT_PC_CHAR,
            player1Name: DEFAULT_PLAYER1_NAME,
            player1Char: DEFAULT_PLAYER1_CHAR,
            player2Name: DEFAULT_PLAYER2_NAME,
            player2Char: DEFAULT_PLAYER2_CHAR,
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleFormSubmit() {
        if (!this.isStateValid(this.state)) {
            return;
        }

        const { setConfig, history } = this.props;
        setConfig(this.state);
        history.push('/game')   ;
    }

    isStateValid(state) {
        const { boardSize, tileToWin, pcChar, player1Name, player1Char, player2Name, player2Char } = state || {};
        return boardSize && tileToWin && pcChar && player1Name && player1Char && player2Name && player2Char;
    }

    render() {
        const { boardSize, tileToWin, pcChar, player1Name, player1Char, player2Name, player2Char } = this.state || {};

        return (
            <form className='Setup' onSubmit={this.handleFormSubmit}>
                <div className='Setup__heading'>Setup your configuration</div>
                <div className='Setup__form'>
                    <div className='Setup__tile'>
                        <div className='Setup__tile__heading'>System</div>
                        <div className='Setup__tile__field Setup__boardSize'>
                            <label>Board size:</label>
                            <input
                                type='number'
                                min='3' max='10'
                                name='boardSize'
                                value={boardSize}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div className='Setup__tile__field Setup__tileToWin'>
                            <label>Tile to win:</label>
                            <input
                                type='number'
                                min='3' max='5'
                                name='tileToWin'
                                value={tileToWin}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div className='Setup__tile__field Setup__pcChar'>
                            <label>Character:</label>
                            <input
                                type='text'
                                name='pcChar'
                                maxLength='1'
                                value={pcChar}
                                onChange={this.handleFormChange}
                            />
                        </div>
                    </div>
                    <div className='Setup__tile'>
                        <div className='Setup__tile__heading'>Player 1</div>
                        <div className='Setup__tile__field Setup__player1Name'>
                            <label>Name:</label>
                            <input
                                type='text'
                                name='player1Name'
                                value={player1Name}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div className='Setup__tile__field Setup__player1Char'>
                            <label>Character:</label>
                            <input
                                type='text'
                                name='player1Char'
                                maxLength='1'
                                value={player1Char}
                                onChange={this.handleFormChange}
                            />
                        </div>
                    </div>
                    <div className='Setup__tile'>
                        <div className='Setup__tile__heading'>Player 2</div>
                        <div className='Setup__tile__field Setup__player2Name'>
                            <label>Name:</label>
                            <input
                                type='text'
                                name='player2Name'
                                value={player2Name}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div className='Setup__tile__field Setup__player2Char'>
                            <label>Character:</label>
                            <input
                                type='text'
                                name='player2Char'
                                maxLength='1'
                                value={player2Char}
                                onChange={this.handleFormChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='Setup__button' onClick={this.handleFormSubmit}>
                    <Button shape='primary'>Let's start</Button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        config: state.config,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setConfig: config => dispatch(setConfig(config)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
