import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Error } from '../../Error/Errors';
import { handleFetch } from '../../Fetch/store';
import { Sidebar } from '../../Sidebar/Sidebar';
import { Spinner } from '../../Spinner/Spinner';
import './style.css'

export const ServerDetails = (props) => {
    const [vm, setVm] = useState({})
    const [vmErr, setVmErr] = useState("")
    const [isVmLoading, setVmLoading] = useState(false)


    const [disks, setDisks] = useState([])
    const [disksErr, setDisksErr] = useState("")
    const [isDisksLoading, setDisksLoading] = useState(false)

    useEffect( () => {
        setVmLoading(true)
        handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}`).then(({data, err}) => {

            setVmLoading(false)
            if (err) {
                setVmErr(err)
            } else {
                setVm(data)
            }
        })
        }, [props.match.params.hv, props.match.params.name])

    useEffect( () => {
        setDisksLoading(true)

        handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}/disks`).then(({data, err}) => {
            setDisksLoading(false)
            
            if (err) {
                setDisksErr(err)
            } else {
                setDisks(data)
            }
        })
    }, [props.match.params.hv, props.match.params.name])

    
    const disksList = disks.map((d) => {
        return (
            <li className="disks-item" key={d.disk_letter}>
                <div className="disks-item-header">
                    Локальный диск {d.disk_letter}:
                </div>
                <div className="disks-item-body">
                    <input readOnly type="range" min="0" max={d.space_total} value={d.space_total - d.space_free} id="disk-c" />
                </div>
                <div className="disks-item-footer">
                    {d.space_free} ГБ свободно из {d.space_total} ГБ
                </div>
            </li>
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
                        <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/info`} className="btn bg-gold text-dark">
                            Инфо
                        </Link>
                        <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/services`} className="btn">
                            Службы
                        </Link>
                        <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/processes`} className="btn">
                            Процессы
                        </Link>
                    </div>
                    <div className="header-details__search m-d-none">
                        <input type="search" className="w-100"
                            placeholder="Search..."  disabled/>
                    </div>
                </div>
                <div className="content params">
                        {
                            isVmLoading ? <Spinner text="Load VM info..." /> : (vmErr ? <Error err={vmErr} /> : (
                                <div>
                                    <div className="params-item border-secondary">
                                        HV:  <span >{vm.hv}</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        COMPANY: <span >{vm.company}</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        OUT_ADDRESS: <span >{vm.out_addr}</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        IP: <span >{vm.ip}</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        CPU_CORES: <span >{vm.cpu_cores}</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        CPU_WEIGHT: <span >{vm.weight}</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        RAM: <span >{vm.memory} GB</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        NETWORK: <span >{vm.network}</span>
                                    </div>
                                    <div className="params-item border-secondary">
                                        DESCRIPTION: <span >{vm.description}</span>
                                    </div>
                    </div>
                            )
                            )
                        }

                    <div className="disks border-secondary">
                        {
                            isDisksLoading ? <Spinner text="Load disks info..." /> : (disksErr ? <Error err={disksErr} /> : (
                                <ul>
                                    {disksList}
                                </ul>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}