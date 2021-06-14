import React, { useEffect } from 'react';
import { FixedError } from '../../Error/FixedError';
import { SpinnerServers } from '../../Spinner/SpinnerServers';
import { handleGetServers, useServersStore } from '../store';

import { ServerItem } from './Item/Item';
import './style.css'
export const ServersList = () => {

    useEffect(() => {
        handleGetServers()
    }, [])

    const { servers, isLoading, error } = useServersStore()

    let serversItems = ''
    if (servers.length > 1) {
        serversItems = servers.map((el) => {
            return (
                <ServerItem key={el.id} id={el.id} name={el.name} hv={el.hv} state={el.state} network={el.network} status={el.status} cpu_load={el.cpu_load}/>
            )
        })
    } else {
        serversItems = 'No servers'
    }

    // html
    return (
        <div className="main">
            <div className="header">
                <div className="header-btn">
                    <button type="button" className="btn" onClick={() => { }}>New Server</button>
                </div>
                <div className="header-h">
                    SERVERS
                </div>
                <div className="header-input">
                    <input type="search" className="w-100"
                        placeholder="Search server ..." />
                </div>
            </div>
            <div className="content">
                    <div className="server-list-header">
                        <div className="srv-list-item">Name</div>
                        <div className="srv-list-item">HV</div>
                        <div className="srv-list-item">State</div>
                        <div className="srv-list-item">Status</div>
                        <div className="srv-list-item">Network</div>
                        <div className="srv-list-item">CPU</div>
                        <div className="srv-list-item">Actions</div>
                    </div>
                    {isLoading ? <SpinnerServers /> : (error ? <FixedError err={error} /> : serversItems)}
            </div>
        </div>
    )
}
