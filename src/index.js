import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reduces/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/styles.min.css'
import HashRouter from 'react-router-dom/HashRouter'


const store = createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument()),
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
