import { shallow } from 'enzyme';
import React from 'react';
import { GameState } from '../constants';
import { Game } from './Game';

describe('Component: Game', () => {
    let props;

    describe('initially with missing props', () => {
        [
            [
                'when "tileList" is not set',
                createComponentProps({ tileList: null }),
            ],
            [
                'when "gameState" is not set',
                createComponentProps({ gameState: null }),
            ],
            [
                'when "config" is not set',
                createComponentProps({ config: null }),
            ],
        ].forEach(([ description, props ]) => {
            describe(description, () => {
                it('should redirect to the setup', () => {
                    shallow(<Game {...props} />);

                    expect(props.history.push).toHaveBeenCalledWith('/setup');
                });
            });
        });
    });

    describe('with tileList, gameState and config set', () => {
        beforeEach(() => {
            props = createComponentProps({
                tileList: [],
                config: {
                    boardSize: 5,
                },
            });
        });

        describe('when "gameState" is equal to GameState.PCTurn', () => {
            beforeEach(() => {
                props = createComponentProps({
                    gameState: GameState.PCTurn,
                });
            });

            it('should call "calculatePCTurn"', () => {
                shallow(<Game {...props} />);

                expect(props.calculatePCTurn).toHaveBeenCalled();
            });
        });

        describe('when "gameState" is getting set to GameState.PCTurn', () => {
            beforeEach(() => {
                props = createComponentProps({
                    gameState: GameState.Tie,
                });
            });

            it('should call "calculatePCTurn"', () => {
                const component = shallow(<Game {...props} />);

                component.setProps({ gameState: GameState.PCTurn });

                expect(props.calculatePCTurn).toHaveBeenCalled();
            });
        });

        describe('with "gameState"', () => {
            [
                [
                    'equal to "GameState.Player1Turn"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: GameState.Player1Turn,
                        config: {
                            player1Name: 'Tony Stark',
                        },
                    }),
                    'Tony Stark to move',
                ],
                [
                    'equal to "GameState.Player2Turn"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: GameState.Player2Turn,
                        config: {
                            player2Name: 'Steven Rogers',
                        },
                    }),
                    'Steven Rogers to move',
                ],
                [
                    'equal to "GameState.PCTurn"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: GameState.PCTurn,
                        config: {
                        },
                    }),
                    'PC to move',
                ],
                [
                    'equal to "GameState.Player1Won"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: GameState.Player1Won,
                        config: {
                            player1Name: 'Tony Stark',
                        },
                    }),
                    'Tony Stark won',
                ],
                [
                    'equal to "GameState.Player2Won"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: GameState.Player2Won,
                        config: {
                            player2Name: 'Steven Rogers',
                        },
                    }),
                    'Steven Rogers won',
                ],
                [
                    'equal to "GameState.PCWon"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: GameState.PCWon,
                        config: {
                        },
                    }),
                    'PC won',
                ],
                [
                    'equal to "GameState.Tie"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: GameState.Tie,
                        config: {
                        },
                    }),
                    'Tie',
                ],
                [
                    'equal to "bazzinga!"',
                    'should map it to a correct label',
                    createComponentProps({
                        gameState: 'bazzinga!',
                        config: {
                        },
                    }),
                    'Unknown state',
                ],
            ].forEach(([ description, assumption, options, label ]) => {
                describe(description, () => {
                    beforeEach(() => {
                        props = createComponentProps(options);
                    });

                    it(assumption, () => {
                        const component = shallow(<Game {...props} />);

                        expect(component).toIncludeText(label);
                    });
                });
            });
        });

        it('should render the game board', () => {
            const component = shallow(<Game {...props} />);
            const board = component.find('Board');

            expect(board).toHaveLength(1);
            expect(board.props()).toMatchObject({
                boardSize: 5,
                tileList: [],
            });
        });

        describe('and after the board calls "tileClicked"', () => {
            [
                [
                    'when "gameState" is equal to GameState.Player1Turn',
                    'should call "tileSelected" the index of the tile clicked',
                    createComponentProps({
                        tileList: Array(5).fill('tile'),
                        gameState: GameState.Player1Turn,
                    }),
                    3,
                    (props) => expect(props.tileSelected).toHaveBeenCalledWith(3),
                ],
                [
                    'when "gameState" is equal to GameState.Player2Turn',
                    'should call "tileSelected" the index of the tile clicked',
                    createComponentProps({
                        tileList: Array(5).fill('tile'),
                        gameState: GameState.Player2Turn,
                    }),
                    3,
                    (props) => expect(props.tileSelected).toHaveBeenCalledWith(3),
                ],
                [
                    'when "gameState" is equal to GameState.PCTurn',
                    'should call "tileSelected" the index of the tile clicked',
                    createComponentProps({
                        tileList: Array(5).fill('tile'),
                        gameState: GameState.PCTurn,
                    }),
                    3,
                    (props) => expect(props.tileSelected).toHaveBeenCalledWith(3),
                ],
                [
                    'when "gameState" is equal to GameState.Tie',
                    'should not call "tileSelected"',
                    createComponentProps({
                        tileList: Array(5).fill('tile'),
                        gameState: GameState.Tie,
                    }),
                    3,
                    (props) => expect(props.tileSelected).not.toHaveBeenCalled(),
                ],
                [
                    'when "gameState" is equal to GameState.Player1Won',
                    'should not call "tileSelected"',
                    createComponentProps({
                        tileList: Array(5).fill('tile'),
                        gameState: GameState.Player1Won,
                    }),
                    3,
                    (props) => expect(props.tileSelected).not.toHaveBeenCalled(),
                ],
                [
                    'when "gameState" is equal to GameState.Player2Won',
                    'should not call "tileSelected"',
                    createComponentProps({
                        tileList: Array(5).fill('tile'),
                        gameState: GameState.Player2Won,
                    }),
                    3,
                    (props) => expect(props.tileSelected).not.toHaveBeenCalled(),
                ],
                [
                    'when "gameState" is equal to GameState.PCWon',
                    'should not call "tileSelected"',
                    createComponentProps({
                        tileList: Array(5).fill('tile'),
                        gameState: GameState.PCWon,
                    }),
                    3,
                    (props) => expect(props.tileSelected).not.toHaveBeenCalled(),
                ],
            ].forEach(([ description, assumption, props, arg, assertion ]) => {
                describe(description, () => {
                    it(assumption, () => {
                        const component = shallow(<Game {...props} />);

                        component.find('Board').prop('tileClicked')(arg);

                        assertion(props);
                    });
                });
            });

            describe('when "tileClicked" is called with an index less than 0', () => {
                beforeEach(() => {
                    props = createComponentProps({
                        gameState: GameState.Player1Turn,
                        tileList: Array(5).fill('tile'),
                    });
                });

                it('should throw', () => {
                    const component = shallow(<Game {...props} />);

                    let thrown = false;
                    try {
                        component.find('Board').prop('tileClicked')(-1);
                    } catch {
                        thrown = true;
                    }

                    expect(thrown).toBeTruthy();
                });
            });

            describe('when "tileClicked" is called with an index equal to the length of the "tileList"', () => {
                beforeEach(() => {
                    props = createComponentProps({
                        gameState: GameState.Player1Turn,
                        tileList: Array(5).fill('tile'),
                    });
                });

                it('should throw', () => {
                    const component = shallow(<Game {...props} />);

                    let thrown = false;
                    try {
                        component.find('Board').prop('tileClicked')(5);
                    } catch {
                        thrown = true;
                    }

                    expect(thrown).toBeTruthy();
                });
            });
        });

        it('should render a link to the setup', () => {
            const component = shallow(<Game {...props} />);
            const link = component.find('Button');

            expect(link).toHaveLength(1);
            expect(link.props()).toMatchObject({
                shape: 'neutral',
                children: 'Back to setup',
            });
        });

        describe('and after click on this link', () => {
            it('should navigate to the setup', () => {
                const component = shallow(<Game {...props} />);

                component.find('.Game__button').simulate('click');

                expect(props.history.push).toHaveBeenCalledWith('/setup');
            });
        });
    });
});

function createComponentProps(options) {
    return {
        tileList: [],
        gameState: GameState.Tie,
        config: {},
        calculatePCTurn: jest.fn(),
        tileSelected: jest.fn(),
        history: {
            push: jest.fn(),
        },
        ...options,
    };
}
