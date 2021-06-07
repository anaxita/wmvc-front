import React, { useEffect } from 'react';
import { FixedError } from '../../Error/FixedError';
import { SpinnerServers } from '../../Spinner/SpinnerServers';
import { handleGetServers, useServersStore } from '../store';
import { ServerItem } from './Item/Item';

export const ServersList = () => {

    useEffect(() => {
        handleGetServers({ token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q' })
    }, [])

    const { servers, isLoading, error } = useServersStore()
    const serversItems = servers.map((el, index) => {
        return (
            <ServerItem key={el.id} index={index} id={el.id} name={el.name} hv={el.hv} state={el.state} network={el.network} status={el.status} cpu_load={el.cpu_load} isLoading={el.isLoading} isNetworkLoading={el.isNetworkLoading} err={el.error} />
        )
    })

    // html
    return (
        <div>
                        <div className="row main-rows p-1 m-0 mt-2 mb-2 bg-dark border-0 rounded align-items-center">

                <div className="col p-1">
                    SERVERS LIST
                </div>
                <div className="col d-flex justify-content-end p-1">
                    <button type="button" className="btn btn-success btn-sm" onClick={() => { }}>+HV</button>
                </div>
                <div className="col-sm mt-2 mt-md-0 p-1">
                    <input type="search" className="form-control form-control-sm border-seconadry bg-dark text-light"
                        placeholder="Search server ..." />
                </div>
            </div>
            <div className="row main-rows h-userlist p-0 m-0 border-0 rounded bg-dark">
                <div className="col border-0 rounded mt-1 p-1">
                    <div className="row d-none d-md-flex p-1 m-0 mt-2 align-items-center ">
                        <div className="col-md-3">Name</div>
                        <div className="col-md-1">HV</div>
                        <div className="col-md-1">State</div>
                        <div className="col-md-2">Status</div>
                        <div className="col-md-2">Network</div>
                        <div className="col-md-1">CPU</div>
                        <div className="col-md-2">Actions</div>
                    </div>
                    {isLoading ? <SpinnerServers /> : (error ? <FixedError err={error} /> : serversItems)}
                </div>
            </div>
        </div>
    )
}
