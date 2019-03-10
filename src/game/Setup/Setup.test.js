import { shallow } from 'enzyme';
import React from 'react';
import { Setup } from './Setup';

describe('Component: Setup', () => {
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render the form title', () => {
        const component = shallow(<Setup {...props} />);

        expect(component.text()).toEqual(
            expect.stringContaining('Setup your configuration'),
        );
    });

    it('should render 3 setup tiles', () => {
        const component = shallow(<Setup {...props} />);

        expect(component.find('.Setup__tile')).toHaveLength(3);
    });

    describe('and the system setup tile', () => {
        let systemSetupTile;

        beforeEach(() => {
            const component = shallow(<Setup {...props} />);
            systemSetupTile = component.find('.Setup__tile').at(0);
        });

        it('should render the correct title', () => {

            expect(systemSetupTile).toIncludeText('System');
        });

        it('should render the board size input', () => {

            expect(systemSetupTile).toIncludeText('Board size:');
            expect(systemSetupTile.find('.Setup__boardSize input')).toHaveProp({
                type: 'number',
                name: 'boardSize',
                min: '3',
                max: '10',
            });
        });

        it('should render the tile to win input', () => {

            expect(systemSetupTile).toIncludeText('Tile to win:');
            expect(systemSetupTile.find('.Setup__tileToWin input')).toHaveProp({
                type: 'number',
                name: 'tileToWin',
                min: '3',
                max: '5',
            });
        });

        it('should render the character input', () => {

            expect(systemSetupTile).toIncludeText('Character:');
            expect(systemSetupTile.find('.Setup__pcChar input')).toHaveProp({
                type: 'text',
                name: 'pcChar',
                maxLength: '1',
            });
        });
    });

    describe('and the player 1 setup tile', () => {
        let player1SetupTile;

        beforeEach(() => {
            const component = shallow(<Setup {...props} />);
            player1SetupTile = component.find('.Setup__tile').at(1);
        });

        it('should render the correct title', () => {

            expect(player1SetupTile).toIncludeText('Player 1');
        });

        it('should render the name input', () => {

            expect(player1SetupTile).toIncludeText('Name:');
            expect(player1SetupTile.find('.Setup__player1Name input')).toHaveProp({
                type: 'text',
                name: 'player1Name',
            });
        });

        it('should render the character input', () => {

            expect(player1SetupTile).toIncludeText('Character:');
            expect(player1SetupTile.find('.Setup__player1Char input')).toHaveProp({
                type: 'text',
                name: 'player1Char',
                maxLength: '1',
            });
        });
    });

    describe('and the player 2 setup tile', () => {
        let player2SetupTile;

        beforeEach(() => {
            const component = shallow(<Setup {...props} />);
            player2SetupTile = component.find('.Setup__tile').at(2);
        });

        it('should render the correct title', () => {

            expect(player2SetupTile).toIncludeText('Player 2');
        });

        it('should render the name input', () => {

            expect(player2SetupTile).toIncludeText('Name:');
            expect(player2SetupTile.find('.Setup__player2Name input')).toHaveProp({
                type: 'text',
                name: 'player2Name',
            });
        });

        it('should render the character input', () => {

            expect(player2SetupTile).toIncludeText('Character:');
            expect(player2SetupTile.find('.Setup__player2Char input')).toHaveProp({
                type: 'text',
                name: 'player2Char',
                maxLength: '1',
            });
        });
    });

    it('should render a submit button', () => {
        const component = shallow(<Setup {...props} />);

        expect(component.find('Button').dive()).toIncludeText(`Let's start`);
    });

    describe('after click on the submit button', () => {
        beforeEach(() => {
            const component = shallow(<Setup {...props} />);
            component.find('form').simulate('submit');
        });

        it('should call "setConfig" with default values', () => {

            expect(props.setConfig).toHaveBeenCalledWith({
                boardSize: 5,
                tileToWin: 3,
                pcChar: 'p',
                player1Name: 'Player 1',
                player1Char: 'x',
                player2Name: 'Player 2',
                player2Char: 'o',
            });
        });

        it('should navigate to the game', () => {

            expect(props.history.push).toHaveBeenCalledWith('/game');
        });
    });

    describe('after the form is submitted', () => {
        beforeEach(() => {
            const component = shallow(<Setup {...props} />);
            component.find('form').simulate('submit');
        });

        it('should call "setConfig" with default values', () => {

            expect(props.setConfig).toHaveBeenCalledWith({
                boardSize: 5,
                tileToWin: 3,
                pcChar: 'p',
                player1Name: 'Player 1',
                player1Char: 'x',
                player2Name: 'Player 2',
                player2Char: 'o',
            });
        });

        it('should navigate to the game', () => {

            expect(props.history.push).toHaveBeenCalledWith('/game');
        });
    });

    describe('after changing values in the input fields', () => {
        let component;

        beforeEach(() => {
            component = shallow(<Setup {...props} />);
            component.find('.Setup__boardSize input').simulate('change', { target: { name: 'boardSize', value: 10 } });
            component.find('.Setup__tileToWin input').simulate('change', { target: { name: 'tileToWin', value: 5 } });
            component.find('.Setup__pcChar input').simulate('change', { target: { name: 'pcChar', value: 'x' } });
            component.find('.Setup__player1Name input').simulate('change', { target: { name: 'player1Name', value: 'Tony Stark' } });
            component.find('.Setup__player1Char input').simulate('change', { target: { name: 'player1Char', value: 'i' } });
            component.find('.Setup__player2Name input').simulate('change', { target: { name: 'player2Name', value: 'Steven Rogers' } });
            component.find('.Setup__player2Char input').simulate('change', { target: { name: 'player2Char', value: 'c' } });
        });

        describe('and after submitting the form', () => {
            beforeEach(() => {
                component.find('form').simulate('submit');
            });

            it('should call "setConfig" with the new values', () => {

                expect(props.setConfig).toHaveBeenCalledWith({
                    boardSize: 10,
                    tileToWin: 5,
                    pcChar: 'x',
                    player1Name: 'Tony Stark',
                    player1Char: 'i',
                    player2Name: 'Steven Rogers',
                    player2Char: 'c',
                });
            });

            it('should navigate to the game', () => {

                expect(props.history.push).toHaveBeenCalledWith('/game');
            });
        });
    });

    describe('after resetting a value', () => {
        [
            [
                '"boardSize"',
                (component) => component.find('.Setup__boardSize input').simulate('change', { target: { name: 'boardSize', value: 0 } }),
            ],
            [
                '"tileToWin"',
                (component) => component.find('.Setup__tileToWin input').simulate('change', { target: { name: 'tileToWin', value: 0 } }),
            ],
            [
                '"pcChar"',
                (component) => component.find('.Setup__pcChar input').simulate('change', { target: { name: 'pcChar', value: '' } }),
            ],
            [
                '"player1Name"',
                (component) => component.find('.Setup__player1Name input').simulate('change', { target: { name: 'player1Name', value: '' } }),
            ],
            [
                '"player1Char"',
                (component) => component.find('.Setup__player1Char input').simulate('change', { target: { name: 'player1Char', value: '' } }),
            ],
            [
                '"player2Name"',
                (component) => component.find('.Setup__player2Name input').simulate('change', { target: { name: 'player2Name', value: '' } }),
            ],
            [
                '"player2Char"',
                (component) => component.find('.Setup__player2Char input').simulate('change', { target: { name: 'player2Char', value: '' } }),
            ],
        ].forEach(([ description, changeForm ]) => {
            describe(description, () => {
                let component;

                beforeEach(() => {
                    component = shallow(<Setup {...props} />);
                    changeForm(component);
                });

                describe('and after submitting the form', () => {
                    beforeEach(() => {
                        component.find('form').simulate('submit');
                    });

                    it('should not call "setConfig"', () => {

                        expect(props.setConfig).not.toHaveBeenCalled();
                    });

                    it('should not navigate', () => {

                        expect(props.history.push).not.toHaveBeenCalled();
                    });
                });
            });
        });
    });
});

function createComponentProps(options) {
    return {
        config: {},
        setConfig: jest.fn(),
        history: {
            push: jest.fn(),
        },
        ...options,
    };
}
