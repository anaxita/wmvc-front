import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProcessUserItem } from './ProcessUserItem/ProcessUserItem';
import { handleFetch } from '../../../Fetch/store';
import './style.css'
import { Sidebar } from '../../../Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Error } from '../../../Error/Errors';
import { SpinnerItem } from '../../../Spinner/SpinnerItem';

export const ServerProcesses = (props) => {
    
        const [sessions, setSessions] = useState([])
        const [sessionsErr, setSessionsErr] = useState("")
        const [issessionsLoading, setSessionsLoading] = useState(false)

        useEffect(() => {
                setSessionsLoading(true)
                handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}/manager`).then(({data, err}) => {

                    setSessionsLoading(false)
                    if (err) {
                        setSessionsErr(err)
                    } else {
                        setSessions(data)
                    }
                })

                return null
        }, [props.match.params.hv, props.match.params.name])
        
    const usersList = sessions.map((el, index) => {
        return <ProcessUserItem key={index} u={el} params={props.match.params} />
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
                        <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/services`} className="btn ">
                            Службы
                        </Link>
                        <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/processes`} className="btn bg-gold text-dark">
                            Процессы
                        </Link>
                    </div>
                    <div className="header-details__search">
                        <input type="search" className="w-100"
                            placeholder="Search..." />
                    </div>
                </div>
                <div className="content">
                    <div className="processes">
                            <div className="processes-header">
                                <div className="">Users</div>
                                <div className="">State</div>
                                <div className="">CPU (75%)</div>
                                <div className="">RAM (90%)</div>
                                <div className="div"></div>
                                <div className="div"></div>
                            </div>
                        {usersList ? usersList : null}
                        {sessionsErr ? <Error err={sessionsErr} /> : null}
                        {issessionsLoading ? <SpinnerItem /> : null}
                    </div>
                </div>
            </div>
        </>
    )
}