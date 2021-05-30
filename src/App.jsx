import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom'
import Servers from './components/Servers/servers';
import Details from './components/Servers/Details/Details';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid overflow-hidden p-0">
                <main className="row overflow-auto text-light bg-secondary ">
                    <Sidebar />
                    <div className="col">
                        <Switch>
                            <Route exact path='/' component={Servers} />
                            <Route path='/home' component={Sidebar} />
                            
                            <Route path='/servers/:id' component={Details} />
                            <Route path='/servers' component={Servers} />
                        </Switch>
                    </div>
                </main>
            </div>
        )
    }
}
export default App;