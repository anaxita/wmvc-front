import React from 'react';

class ServersHeader extends React.Component {
    render() {
        return (
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
        )
    }
}
export default ServersHeader;