import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom'
import Servers from './components/Servers/servers';
import { Details } from './components/Servers/Details/Details';
import { UsersList } from './components/Users/UsersList';

export const App = () =>{
        return (
            <div className="container-fluid m-0 p-0">
                <main className="row vh-100 text-light bg-secondary m-0 p-0 ">
                    <Sidebar />
                    <div className="col">
                        <Switch>
                            <Route exact path='/' component={Servers} />
                            <Route path='/home' component={Sidebar} />             
                            <Route path='/servers/:hv/:name' component={Details} />
                            <Route path='/servers' component={Servers} />
                            <Route path='/users' component={UsersList} />
                        </Switch>
                    </div>
                </main>
            </div>
        )
    }