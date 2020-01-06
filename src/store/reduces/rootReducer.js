import authReducer from './authReducer'
import operacaoReducer from './operacaoReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    operacao: operacaoReducer
});

export default rootReducer