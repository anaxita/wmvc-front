import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPowerOff, faCog, faNetworkWired, faPlayCircle, faPauseCircle, faUserEdit, faTimes, faServer} from '@fortawesome/free-solid-svg-icons'
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom'
import { Details } from './components/Servers/Details/Details';
import { UsersList } from './components/Users/UsersList';
import { ServersList } from './components/Servers/ServersList/ServersList';

library.add(faPowerOff, faCog, faNetworkWired, faPlayCircle, faPauseCircle, faUserEdit, faTimes, faServer)

export const App = () => {
    return (
        <div className="grid">
            <Sidebar />
            <div className="main">
                <Switch>
                    <Route exact path='/' component={ServersList} />
                    <Route path='/home' component={Sidebar} />
                    <Route path='/servers/:hv/:name' component={Details} />
                    <Route path='/servers' component={ServersList} />
                    <Route path='/users' component={UsersList} />
                </Switch>
            </div>
        </div>
    )
}