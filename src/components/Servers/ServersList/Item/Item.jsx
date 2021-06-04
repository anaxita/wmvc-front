import { Link } from 'react-router-dom';
import { Error } from '../../../Error/Errors';
import { SpinnerServer } from '../../Spinner/SpinnerServer';
import { handleControlPower } from '../../store';

export const ServerItem = ({ index, id, name, hv, state, status, cpu_load, isLoading, err}) => {
    
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

    const StopPowerForce = () => {
        handleControlPower({
            token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q',
            i: index,
            id: id,
            command: 'stop_power_force'
        })
    }

    return (
        <div className="row border-0 rounded p-1 m-2 server-item bg-secondary  align-items-center" id={"server-" + id}>
            <div className="col-1">{hv}</div>
            <div className="col-3">{name}</div>
            <div className="col">{isLoading ? <SpinnerServer /> : (err ? <Error err={err}/> : state)}</div>
            <div className="col">{`${cpu_load}%`}</div>
            <div className="col">{status}</div>
            <div className="col">
                <button type="button" className="bi bi-box-arrow-left btn btn-outline-light btn-sm mr-1" value="1" onClick={ControlPower}></button>
                <button type="button" className="bi bi-power btn btn-outline-light btn-sm mr-1" value="2" onClick={StopPowerForce}></button>
                <button type="button" className="bi bi-display btn btn-outline-light btn-sm mr-1" value=""></button>
                <Link to={`/servers/${hv}/${name}`}>
                    <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value=""></button>
                </Link>
            </div>
        </div>
    )
}