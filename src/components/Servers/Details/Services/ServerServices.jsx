import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleFetch } from '../../../Fetch/store';
import { Spinner } from '../../../Spinner/Spinner';
import { Error } from '../../../Error/Errors';
import './style.css'

export const ServerServices = (props) => {
    const [services, setServices] = useState([])
    const [servicesErr, setServicesErr] = useState("")
    const [isServicesLoading, setServicesLoading] = useState(false)

    useEffect(async () => {
        setServicesLoading(true)

        const info = await handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}/services`)
        setServicesLoading(false)
        if (info.err) {
            setServicesErr(info.err)
        } else {
            setServices(info.data)
        }

    }, [])

    const servicesList = services.map((s) => {
        return (
            <div className="sc-i" key={s.name}>
                <div className="sc-i-name">{s.name}</div>
                <div className="sc-i-display-name">{s.display_name}</div>
                <div className="sc-i-state">{s.status}</div>
                <div className="sc-i-user">{s.user}</div>
                <div className="sc-i-actions actions-btn">
                    <button><FontAwesomeIcon icon="play-circle" /></button>
                    <button><FontAwesomeIcon icon="sync-alt" /></button>
                </div>
            </div>
        )
    })

    return (
        <div className="main">
            <div className="header header-servers-details">
                <div className="header-btn">
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/info`} className="btn">
                        Инфо
                    </Link>
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/services`} className="btn bg-gold text-dark">
                        Службы
                    </Link>
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/processes`} className="btn">
                        Процессы
                    </Link>
                </div>
                <div className="header-h">
                    {props.match.params.name}
                </div>
                <div className="header-input">
                    <input type="search" className="w-100"
                        placeholder="Search server ..." />
                </div>
            </div>
            <div className="content">
                <div className="sc-i-list">
                    <div className="title_wrap">
                        <div></div>
                        <div className="sc-items-header">
                            <div className="sc-i-name">Name</div>
                            <div className="sc-i-display-name">Display name</div>
                            <div className="sc-i-state">State</div>
                            <div className="sc-i-user">User</div>
                            <div className="sc-i-actions">Actions</div>
                        </div>
                    </div>
                    {servicesErr ? <Error text={servicesErr}/> : (isServicesLoading ? <Spinner text="Loading services..."/> : <div className="sc-items">{servicesList}</div>)}
                </div>
            </div>
        </div>
    )
}