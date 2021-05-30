import React from 'react';

class ServerItem extends React.Component {
    render() {
        return (
            <div className="row border-0 rounded p-1 m-2 server-item bg-info  align-items-center" id={this.props.data.id}>
                <div className="col ">{this.props.data.hv}</div>
                <div className="col">{this.props.data.name}</div>
                <div className="col">{this.props.data.state}</div>
                <div className="col">79%</div>
                <div className="col"></div>
                <div className="col">
                    <a href="./server-details.html" className="btn btn-outline-light btn-sm"> <i
                        className="bi bi-power m-1"></i></a>
                    <button type="button" className="btn btn-outline-light btn-sm"> <i
                        className="bi bi-bar-chart"></i></button>
                    <button type="button" className="btn btn-outline-light btn-sm"><i
                        className="bi bi-display"></i></button>
                    <button type="button" className="btn btn-outline-light btn-sm"><i
                        className="bi bi-gear m-1"></i></button>

                </div>
            </div>
        )
    }
}
export default ServerItem;