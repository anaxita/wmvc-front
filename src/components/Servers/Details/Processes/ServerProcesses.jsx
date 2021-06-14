import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { ProcessUserItem } from './ProcessUserItem/ProcessUserItem';
import './style.css'

export const ServerProcesses = (props) => {
    const [users] = useState(
        [
            {
                user: 'u01',
                state: 'active',
                cpu: '25%',
                ram: 2560,
                isShowProcesses: false,
                processes: [
                    {
                        name: 'chrome.exe',
                        cpu: '7%',
                        ram: 56,
                    },
                    {
                        name: 'anydesk.exe',
                        cpu: '2%',
                        ram: 165,
                    },
                    {
                        name: '1cv8c.exe',
                        cpu: '16%',
                        ram: 2295,
                    },
                ],
            },
            {
                user: 'u02',
                state: 'active',
                cpu: '25%',
                ram: 2560,
                isShowProcesses: false,
                processes: [
                    {
                        name: 'chrome.exe',
                        cpu: '7%',
                        ram: 56,
                    },
                    {
                        name: 'anydesk.exe',
                        cpu: '2%',
                        ram: 165,
                    },
                    {
                        name: '1cv8c.exe',
                        cpu: '16%',
                        ram: 2295,
                    },
                ],
            },
        ])

    const usersList = users.map(el => {
        return <ProcessUserItem u={el} />
    })

    return (
        <div className="main">
            <div className="header">
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
                        <div className="">CPU (78%)</div>
                        <div className="">RAM (7542)</div>
                        <div className="div">Actions</div>
                    </div>
                    {usersList}
                </div>
            </div>
        </div>
    )
}