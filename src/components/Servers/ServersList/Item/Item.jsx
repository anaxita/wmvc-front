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
        <div className="row border-0 rounded p-1 mt-2 mr-1 ml-1 bg-secondary  align-items-center" id={"server-" + id}>
            <div className="col-12 col-md-3 text-warning">{name}</div>
            {/* <div className="col-8 col-md-1 d-flex justify-content-end justify-content-md-start">{hv}</div> */}
            <div className="col-8 col-md-1 d-none d-md-block">{hv}</div>
            <div className="col-4 col-md-1">{isLoading ? <SpinnerServer /> : (err ? <Error err={err} /> : ((state === 'Running') ? 'Включен' : 'Выключен'))}</div>
            <div className="col-8 col-md-2 d-flex justify-content-end justify-content-md-start">{(status === 'Работает нормально' && state === 'Off') ? null : status}</div>
            <div className="col-12 col-md-2 d-flex justify-content-start justify-content-md-start">{isNetworkLoading ? <SpinnerServer /> : (network ? 'Сеть ОК' : 'Нет сети')}</div>
            <div className="col-md-1 d-none d-md-block">{`${cpu_load}%`}</div>
            <div className="col col-md-2">
                <div className="row m-0">
                    <div className="col-6 col-md-4 m-0 p-0 d-flex justify-content-start">
                        <button type="button" className="bi bi-box-arrow-left btn btn-outline-light btn-sm mr-1" value="1" onClick={ControlPower}></button>
                        <button type="button" className="bi bi-reception-4 btn btn-outline-light btn-sm mr-1" value="" onClick={ControlNetwork}></button>
                    </div>
                    <div className="col-6 col-md-4 m-0 p-0 d-flex justify-content-end justify-content-md-start">
                        <button type="button" className="bi bi-power btn btn-outline-light btn-sm mr-1" value="2" onClick={StopPowerForce}></button>
                    <Link to={`/servers/${hv}/${name}`}>
                        <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value=""></button>
                    </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}