import 'whatwg-fetch';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer as HotLoader} from 'react-hot-loader';
import App from './js/components/app/App';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import './index.scss';

ReactDOM.render((
    <HotLoader>
        <Router>
            <Route component={App}/>
        </Router>
    </HotLoader>
), document.getElementById('main'));

if (module.hot) {
    module.hot.accept('./js/components/app/App', renderApp);
}