import React from 'react'
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Welcome from '../containers/Welcome';
import Inbox from '../containers/Inbox';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import {requireAuthentication} from '../components/AuthenticatedComponent'

const routes = (
                <Route path="/" component={App}>
                    <IndexRoute component={Inbox} />
                    <Route path="*" component={Inbox} />
                </Route>
                );

export { routes };
