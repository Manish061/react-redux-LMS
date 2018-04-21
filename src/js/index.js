import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import {  Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import { Route, Router } from 'react-router'

import {ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import allReducers from './reducers';
import App from "../js/components/app.js";
import Login from './containers/login';
import Register from './containers/register';
import Begin from './components/begin';
import AddBook from './components/addBook'

const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
    combineReducers({
        allReducers,
        routing: routerReducer
    }),
    applyMiddleware(middleware)
)
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/admin/addBook" component={AddBook}/>
            </App>
        </ConnectedRouter>
    </Provider >,
    document.getElementById('root')
)