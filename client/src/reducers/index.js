import { combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import email from './email'
import filter from './filter'

const rootReducer = combineReducers({
    email,
    filter,
    router: routerStateReducer,
});

export default rootReducer
