import React from 'react';
import { Route, Switch } from 'react-router-dom'
import {  ServerDetails } from './components/Servers/Details/ServerDetails';
import { UsersList } from './components/Users/UsersList';
import { ServersList } from './components/Servers/ServersList/ServersList';
import { Auth } from './components/Auth/Auth';
import { ServerServices } from './components/Servers/Details/Services/ServerServices';
import { ServerProcesses } from './components/Servers/Details/Processes/ServerProcesses';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faUserEdit, faServer, faTimes, faPlayCircle, faSyncAlt, faSignOutAlt, faChevronDown, faChevronRight, faPowerOff, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faUserEdit, faServer, faTimes, faPlayCircle, faSyncAlt, faSignOutAlt, faChevronDown, faChevronRight, faPowerOff, faArrowLeft)
// chevron-down
dom.watch()
export const App = () => {
    return (
        <div className="grid">
                <Switch>
                    <Route exact path='/' component={Auth} />
                    <Route path='/signin' component={Auth} />
                    <Route path='/servers/:hv/:name/info' component={ServerDetails} />
                    <Route path='/servers/:hv/:name/services' component={ServerServices} />
                    <Route path='/servers/:hv/:name/processes' component={ServerProcesses} />
                    <Route path='/servers' component={ServersList} />
                    <Route path='/users' component={UsersList} />
                </Switch>
        </div>
    )
}