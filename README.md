# Tic Tac Toe

A small and simple traditional game with the following extensions:
* 2 real players and 1 PC playing against each other
* board size and the number of tiles in a row for winning are configurable
* players' characters are configurable

## Design overview

In the project [React](https://reactjs.org) is used for rendering and [Redux](https://redux.js.org) for managing the state. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The view logic such as how the board is implemented, which font and colors to use on the board, etc. is concentrated in the `Board` component. Right now the board is implemented with the `canvas` element. After the component has been mounted and every time it's props have been updated the `canvas` is getting re-rendered. Since it's going to happen only after a player puts her char into an empty cell, the load should not be high.

The main game logic is stored in the reducer.

Analyzing if one of the players won is done in the function `getWinnerChar` (line 66), right now its complexity is O(n^3) because of having to iterate through the board model (`i`- and `j`-loops) and checking if of the player won in any of the directions (`kRow`-loop for x-axis, `kColumn`-loop for y-axis, `kDiagonal`-loop for main and reverse diagonal).

Calculating of the next game state is performed by the function `calculateNextGameState` (line 124).

For testing the following tools are used:
- test framework: [jest](https://jestjs.io)
- react test lib: [enzyme](https://airbnb.io/enzyme/)
- jest assertions for enzyme: [enzyme-matchers](https://github.com/FormidableLabs/enzyme-matchers)

## How to run in the development mode

Run `npm start` in the app folder.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## How to build a production version

Run `npm run build` in the app folder, which will build the app for production to the `build` folder.<br>
Your app is ready to be deployed!

## How to test

Run `npm test` to launch the test runner in the interactive watch mode.<br>
Put the keyword `debugger;` in your code and run `npm run test:debug` to cause the test runner to pause on this line.
