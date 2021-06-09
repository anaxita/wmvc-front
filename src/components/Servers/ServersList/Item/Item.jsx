import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { Error } from '../../../Error/Errors';
import { SpinnerServer } from '../../../Spinner/SpinnerServer';
import { handleControlPower } from '../../store';

export const ServerItem = ({ index, id, name, hv, state, status, network, cpu_load, isLoading, isNetworkLoading, err }) => {

    const ControlPower = () => {
        let command = 'stop_power'
        if (state === 'Off') {
            command = 'start_power'
        }

        handleControlPower({
            token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q',
            i: index,
            id: id,
            command: command
        })
    }

    const ControlNetwork = () => {
        let command = 'start_network'
        if (network) {
            command = 'stop_network'
        }

        handleControlPower({
            token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q',
            i: index,
            id: id,
            command: command
        })
    }

    const StopPowerForce = () => {
        handleControlPower({
            token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q',
            i: index,
            id: id,
            command: 'stop_power_force'
        })
    }

    return (
        <div className="server-item" id={"server-" + id}>
            <div className="srv-name">{name}</div>
            <div className="srv-hv">{hv}</div>
            <div className="srv-state">{isLoading ? <SpinnerServer /> : (err ? <Error err={err} /> : ((state === 'Running') ? 'Включен' : 'Выключен'))}</div>
            <div className="srv-status">{(status === 'Работает нормально' && state === 'Off') ? null : status}</div>
            <div className="srv-network">{isNetworkLoading ? <SpinnerServer /> : (network ? 'ок' : 'выкл')}</div>
            <div className="srv-cpu">{`${cpu_load}%`}</div>
            <div className="srv-actions actions-btn">
                        <button type="button icon" className="" onClick={ControlPower}><FontAwesomeIcon icon="play-circle" /></button>
                        <button type="button" className="" onClick={ControlNetwork}><FontAwesomeIcon icon="network-wired" /></button>
                        <button type="button" className=""  onClick={StopPowerForce}><FontAwesomeIcon icon="power-off" /></button>
                    <Link to={`/servers/${hv}/${name}`}>
                        <button type="button" className="" ><FontAwesomeIcon icon="cog" /></button>
                    </Link>
            </div>
        </div>
    )
}