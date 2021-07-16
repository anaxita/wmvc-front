import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProcessUserItem } from './ProcessUserItem/ProcessUserItem';
import { handleFetch } from '../../../Fetch/store';
import './style.css'

export const ServerProcesses = (props) => {
    
        const [processes, setprocesses] = useState([])
        const [processesErr, setprocessesErr] = useState("")
        const [isprocessesLoading, setProcessesLoading] = useState(false)

        useEffect(() => {
            async function getProcesses() {
                setProcessesLoading(true)
                const info = await handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}/manager`)
                setProcessesLoading(false)
                if (info.err) {
                     setprocessesErr(info.err)
                } else {
                    setprocesses(info.data)
                }
            }
            getProcesses();
        }, [])
    const usersList = Object.entries(processes).map(el => {
        
        return <ProcessUserItem u={el} />
    })

    return (
        <div className="main">
            <div className="header header-servers-details">
                <div className="header-btn">
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/info`} className="btn">
                        Инфо
                    </Link>
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/services`} className="btn">
                        Службы
                    </Link>
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/processes`} className="btn bg-gold text-dark">
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
                <div className="processes">
                    <div className="processes-header">
                        <div className="">Users</div>
                        <div className="">State</div>
                        <div className="">78%</div>
                        <div className="">75452(98%)</div>
                        <div className="div"></div>
                        <div className="div"></div>
                    </div>
                    {usersList ? usersList : null}
                </div>
            </div>
        </div>
    )
}