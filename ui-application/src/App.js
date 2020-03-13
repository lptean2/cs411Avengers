import React from 'react';
import './App.css';
import Items from './components/Items';
import {Provider} from 'react-redux';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div>Database Items: </div>
                <Items />
            </div>
        </Provider>
    );
}

export default App;