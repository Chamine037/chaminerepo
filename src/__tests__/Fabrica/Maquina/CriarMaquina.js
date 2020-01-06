import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../../store/reduces/rootReducer'
import thunk from 'redux-thunk'
import CriarMaquina from '../../../Fabrica/Maquina/CriarMaquina';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument()),
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><CriarMaquina /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});