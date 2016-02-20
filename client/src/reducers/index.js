import { combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import code from './code'
import auth from './auth'
import email from './email'

const rootReducer = combineReducers({
    email,
    router: routerStateReducer,
});

export default rootReducer
