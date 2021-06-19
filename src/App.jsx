import React from 'react';
import { Route, Switch } from 'react-router-dom'
import {  ServerDetails } from './components/Servers/Details/ServerDetails';
import { UsersList } from './components/Users/UsersList';
import { ServersList } from './components/Servers/ServersList/ServersList';
import { Auth } from './components/Auth/Auth';
import { ServerServices } from './components/Servers/Details/Services/ServerServices';
import { ServerProcesses } from './components/Servers/Details/Processes/ServerProcesses';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faUserEdit, faServer, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from './components/Sidebar/Sidebar'
import { getUserInfo } from './Constants/Constants';

library.add(faUserEdit, faServer, faTimes)
dom.watch()
export const App = () => {
    const { role } = getUserInfo();
    return (
        <div className="grid">
                <Sidebar />
                <Switch>
                    <Route exact path='/' component={Auth} />
                    <Route path='/logout' component={Auth} />
                    {role ? <Route path='/servers/:hv/:name/info' component={ServerDetails} /> : null}
                    {role ? <Route path='/servers/:hv/:name/services' component={ServerServices} /> : null}
                    {role ? <Route path='/servers/:hv/:name/processes' component={ServerProcesses} /> : null}
                    <Route path='/servers' component={ServersList} />
                    {role ? <Route path='/users' component={UsersList} /> : null}
                </Switch>
        </div>
    )
}