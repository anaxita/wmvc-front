import React from 'react';
import { Link } from 'react-router-dom';

class ServerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server: this.props.data
        };
    }

    render() {
        if (this.state.server.state == "Off") {
            this.setState({
                server: {
                    id: this.props.data.id,
                    hv: this.props.data.hv,
                    name: this.props.data.name,
                    state: "",
                    status: this.props.data.status
                }
            })
        }



        return (
            <div className="row border-0 rounded p-1 m-2 server-item bg-secondary  align-items-center" id={"server-" + this.state.server.id}>
                <div className="col-1">{this.state.server.hv}</div>
                <div className="col-3">{this.state.server.name}</div>
                <div className="col">{this.state.server.state}</div>
                <div className="col">79%</div>
                <div className="col">Exporting 78 %</div>
                <div className="col">
                    <button className="bi bi-power btn btn-outline-light btn-sm mr-1" value=""><Link to={"/servers/" + this.state.server.id} hv={this.state.hv} name={this.state.name}></Link></button>
                    <button type="button" className="bi bi-bar-chart btn btn-outline-light btn-sm mr-1" value=""></button>
                    <button type="button" className="bi bi-display btn btn-outline-light btn-sm mr-1" value=""></button>
                    <Link to={"/servers/" + this.state.server.id} hv={this.state.hv} name={this.state.name}>
                    <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value=""></button>
                    </Link>               
                </div>
            </div>
        )
    }
}
export default ServerItem;