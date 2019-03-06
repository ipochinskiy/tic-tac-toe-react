import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Game from './game/Game/Game';
import Setup from './game/Setup/Setup';

class App extends Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <header className='App__header'>
                        Tic Tac Toe
                    </header>
                    <div className='App__content'>
                        <Switch>
                            <Route exact path="/" component={Setup} />
                            <Route path="/setup" component={Setup} />
                            <Route path="/game" component={Game} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
