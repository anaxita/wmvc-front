import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Error } from '../../Error/Errors';
import { handleFetch } from '../../Fetch/store';
import './style.css'

export const ServerDetails = (props) => {
    const [vm, setVm] = useState({})
    const [vmErr, setVmErr] = useState("")
    const [disks, setDisks] = useState([])
    const [disksErr, setDisksErr] = useState("")

    useEffect(async () => {
        const info = await handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}`)
        if (info.err) {
            setVmErr(info.err)
        } else {
            setVm(info.data)
        }

        const disksInfo = await handleFetch("GET", `/servers/${props.match.params.hv}/${props.match.params.name}/disks`)
        if (disksInfo.err) {
            setDisksErr(disksInfo.err)
        } else {
            setDisks(disksInfo.data)
        }

        console.log(disksInfo)
    }, [])

    const disksList = disks.map((d) => {
        return (
            <li className="disks-item">
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
        <div className="main">
            <div className="header header-servers-details">
                <div className="header-btn">
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
                <div className="header-h">
                    {props.match.params.name}
                </div>
                <div className="header-input">
                    <input type="search" className="w-100"
                        placeholder="Search server ..." />
                </div>
            </div>
            <div className="content params">
                {
                    vmErr ? <Error err={vmErr} /> : (
                        <div>
                            <div className="params-item border-secondary">
                                HV:  <span className="text-gold">{vm.hv}</span>
                            </div>
                            <div className="params-item border-secondary">
                                COMPANY: <span className="text-gold">{vm.company}</span>
                            </div>
                            <div className="params-item border-secondary">
                                OUT_ADDRESS: <span className="text-gold">{vm.out_addr}</span>
                            </div>
                            <div className="params-item border-secondary">
                                IP: <span className="text-gold">{vm.ip}</span>
                            </div>
                            <div className="params-item border-secondary">
                                CPU_CORES: <span className="text-gold">{vm.cpu_cores}</span>
                            </div>
                            <div className="params-item border-secondary">
                                CPU_WEIGHT: <span className="text-gold">{vm.weight}</span>
                            </div>
                            <div className="params-item border-secondary">
                                RAM: <span className="text-gold">{vm.memory} GB</span>
                            </div>
                            <div className="params-item border-secondary">
                                NETWORK: <span className="text-gold">{vm.network}</span>
                            </div>
                            <div className="params-item border-secondary">
                                DESCRIPTION: <span className="text-gold">{vm.description}</span>
                            </div>
                        </div>
                    )
                }

                <div className="disks border-secondary">
                    {
                        disksErr ? <Error err={disksErr} /> : (
                            <ul>
                                {disksList}
                                {/* <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input readOnly type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li>
                        <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input readOnly type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li>
                        <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input readOnly type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li>
                        <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input readOnly type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li> */}
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
}