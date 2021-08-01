import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { handleFetch } from '../../../Fetch/store';
import { Spinner } from '../../../Spinner/Spinner';
import { Error } from '../../../Error/Errors';
import './style.css'
import { Sidebar } from '../../../Sidebar/Sidebar';
import Item from './Item/item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ServerServices = (props) => {
    const [services, setServices] = useState([])
    const [servicesErr, setServicesErr] = useState("")
    const [isServicesLoading, setServicesLoading] = useState(false)

    useEffect( () => {
        setServicesLoading(true)
    handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}/services`).then(({data, err}) => {

            setServicesLoading(false)
            if (err) {
                setServicesErr(err)
            } else {
                setServices(data)
            }
        })
    }, [props.match.params.hv, props.match.params.name])

    

    const servicesList = services.map((s) => {
        return (
            <Item 
                service={s} 
                params={props.match.params}
            />
        )
    })

    return (
        <>
            <Sidebar />
            <div className="main">
            <div className="header-details">
                    <Link to={`/servers/`} className="btn btn-back">
                        <FontAwesomeIcon icon="arrow-left" />
                    </Link>
                    <div className="header-details__h">
                        {props.match.params.name}
                    </div>
                    <div className="header-details__links">
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
                    <div className="header-details__search">
                        <input type="search" className="w-100"
                            placeholder="Search..." />
                    </div>
                </div>
                <div className="content">
                            <div className="sc-items-header">
                                <div className="sc-i-name">Name</div>
                                <div className="sc-i-display-name">Display name</div>
                                <div className="sc-i-state">State</div>
                                <div className="sc-i-user">User</div>
                                <div className="sc-i-actions">Actions</div>
                            </div>
                            <div className="sc-items">
                        {servicesErr ? <Error text={servicesErr}/> : (isServicesLoading ? <Spinner text="Loading services..."/> : <div className="sc-items">{servicesList}</div>)}
                            </div>
                </div>
            </div>
        </>
    )
}