import React from 'react';
import ServersHeader from './ServersHeader/ServersHeader';
import ServersList from './ServersList/ServersList';

class Servers extends React.Component {
    render() {
        return (
            <div>
                <ServersHeader />
                <ServersList />
            </div>
        )
    }
}
export default Servers;