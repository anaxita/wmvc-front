/* eslint-disable import/prefer-default-export */
import React, {useEffect, useState} from 'react';
import {getSearch} from '../../../Constants/Constants';
import {FixedError} from '../../Error/FixedError';
import {Sidebar} from '../../Sidebar/Sidebar';
import {SpinnerServers} from '../../Spinner/SpinnerServers';
import {handleGetServers, useServersStore} from '../store';

import {ServerItem} from './Item/Item';
import './style.css';
import {Notification} from "../../Notification/Notification";

export const ServersList = () => {
    const [isSearch, setSearch] = useState(false);
    const [isWLAlert, setWLAlert] = useState(true);
    const [serverSearch, setServerSearch] = useState([]);
    const {servers, isLoading, error} = useServersStore();

    useEffect(() => {
        setTimeout(()=> {
            setWLAlert(false)
        }, 5000)

        handleGetServers();
    }, []);

    const hideNotification=() => {
        setWLAlert(false)
    }

    const onSearch = (e) => {
        const {value} = e.target;
        if (value) {
            setSearch(true);
            setServerSearch(getSearch(servers, value));
        } else {
            setSearch(false);
        }
    };

    let serversItems = [];

    if (!isSearch) {
        serversItems = servers.map((el) => (
            <ServerItem
                key={el.id + el.name}
                id={el.id}
                vmid={el.vmid}
                name={el.name}
                hv={el.hv}
                state={el.state}
                network={el.network}
                status={el.status}
                cpu_load={el.cpu_load}
            />
        ));
    } else {
        serversItems = serverSearch.map((el) => {
            return <ServerItem key={`${el.id}${el.name}`}
                               id={el.id}
                               vmid={el.vmid}
                               name={el.name}
                               hv={el.hv}
                               state={el.state}
                               network={el.network}
                               status={el.status}
                               cpu_load={el.cpu_load}
            />
        })
    }

    // html
    return (
        <>
            <Sidebar/>
            {isWLAlert ? <Notification text={"Ваш IP добавлен в белый список"} hide={hideNotification}/> : null}
            <div className="main">
                <div className="servers-header">
                    <div className="servers-header__search">
                        <input
                            type="search"
                            maxLength="255"
                            onChange={onSearch}
                            placeholder="Search server ..."
                        />
                    </div>
                </div>
                <div className="content">
                    <div className="server-list-header">
                        <div className="srv-list-item">Name</div>
                        <div className="srv-list-item">State</div>
                        <div className="srv-list-item">HV</div>
                        <div className="srv-list-item">Status</div>
                        <div className="srv-list-item">Network</div>
                        <div className="srv-list-item">CPU</div>
                        <div className="srv-list-item">Actions</div>
                    </div>
                    {isLoading ? <SpinnerServers/> : (error ? <FixedError err={error}/> : serversItems)}
                </div>
            </div>
        </>
    );
};
