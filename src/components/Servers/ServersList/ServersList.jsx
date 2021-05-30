import React from 'react';
import ServerItem from '../ServerItem/ServerItem';

class ServersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            servers: []
        };
    }

    componentDidMount() {
        fetch("https://dc.kmsys.ru:53338/servers", {
            headers: { Authorization: "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjYyNDI0ODYsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.CJw5DFaKfO99U-s-UeaJ0VFmBamoplIDqkL_InZOOnLBmc57aJFJs3ycYCrBWwOQ-nyzKaf6V5UCIgDvQCBEKQ" }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        servers: result.message.servers
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        const serversItems = this.state.servers.map((element) => {
            return (
                <ServerItem key={element.id} data={element} />
            )
        })

        return (
            <div className="row main-rows vh-100 p-0 m-0 border-0 rounded bg-dark">
                <div className="col border-0 rounded">
                    <div className="row p-1 mr-2 ml-2 mt-2 align-items-center">
                        <div className="col">HV</div>
                        <div className="col">Name</div>
                        <div className="col">State</div>
                        <div className="col">CPU</div>
                        <div className="col">Status</div>
                        <div className="col">Actions</div>
                    </div>
                    {serversItems}
                </div>
            </div>
        )
    }
}
export default ServersList;