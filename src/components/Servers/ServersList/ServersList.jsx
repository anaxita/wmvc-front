import React from 'react';
import ServerItem from './Item/Item';

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
            <div>
            <div className="row main-rows p-0 m-0 mt-2 mb-2 bg-dark border-0 rounded align-items-center">
            <div className="col-2 p-2">
                <select name="cars" id="cars" form="carform" className="form-select bg-dark text-light">
                    <option selected value="volvo">Select HV</option>
                    <option value="volvo">HV 1</option>
                    <option value="saab">HV 2</option>
                    <option value="opel">HV 3</option>
                    <option value="audi">HV 4</option>
                </select>
            </div>
            <div className="col-2 p-2">
                <select name="cars" id="cars" form="carform" className="form-select bg-dark text-light">
                    <option selected value="volvo">Select status</option>
                    <option value="volvo">Running</option>
                    <option value="saab">Off</option>
                </select>
            </div>
            <div className="col-2 p-2">
                <select name="cars" id="cars" form="carform" className="form-select bg-dark text-light">
                    <option selected value="volvo">Select state</option>
                    <option value="volvo">Exporting</option>
                    <option value="saab">Mooving</option>
                    <option value="opel">Copying</option>
                </select>
            </div>
            <div className="col p-3">
                <input type="search" className="form-control border-seconadry bg-dark text-light"
                    placeholder="Search server ..." />
            </div>
        </div>
            <div className="row main-rows vh-100 p-0 m-0 border-0 rounded bg-dark">
                <div className="col border-0 rounded">
                    <div className="row p-1 mr-2 ml-2 mt-2 align-items-center">
                        <div className="col-1">HV</div>
                        <div className="col-3">Name</div>
                        <div className="col">State</div>
                        <div className="col">CPU</div>
                        <div className="col">Status</div>
                        <div className="col">Actions</div>
                    </div>
                    {serversItems}
                </div>
            </div>
            </div>
        )
    }
}
export default ServersList;