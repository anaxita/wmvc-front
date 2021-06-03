import React, { useEffect } from 'react';
import { SpinnerServers } from '../Spinner/SpinnerServers';
import { handleGetServers, useServersStore } from '../store';
import { ServerItem } from './Item/Item';

export const ServersList = () => {

    useEffect(() => {
        handleGetServers({token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q'})
    }, [])

    const {servers, isLoading} = useServersStore()
    const serversItems = servers.map((el, index) => {
        return (
            <ServerItem key={el.id} index={index} id={el.id} name={el.name} hv={el.hv} state={el.state} status={el.status} cpu={el.cpu} isLoading={el.isLoading} err={el.error}/>
        )
    })

    // html
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
                    
                    {isLoading ? <SpinnerServers /> : serversItems}
                </div>
            </div>
        </div>
    )
}
