import 'styles/index.scss';
import 'vendor/foundation';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './redux/reducers';
import PrismicApi from './prismic-api';

import Main from './components/main';

export const app = { };
// import { Socket } from 'phoenix';

// function connect()
// {
//     const socket = new Socket('/socket');
//     socket.connect();
//     const channel = socket.channel('room:');
//     channel.on('new_user', () => {
//         $('#dots').append('.');
//     });

//     channel.join();
// }

const store = createStore(combineReducers(reducers));

const App = () => (
    <Provider store={ store }>
        <Router>
            <Route path="/" component={ Main } />
        </Router>
    </Provider>
);

PrismicApi.initialize()
    .then(prismic => {
        app.prismic = prismic;

        ReactDOM.render(
            <App />,
            document.getElementById('root')
        );

        $(() => {
            $(document).foundation();
            // connect();
        });
    });
