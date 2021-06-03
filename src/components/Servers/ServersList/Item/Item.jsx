import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAIN_URL } from '../../../../Constants/Constants';
import { Error } from '../../../Error/Errors';
import { SpinnerServer } from '../../Spinner/SpinnerServer';
// import { handleControlPower } from '../../store';

export const ServerItem = ({ index, id, name, hv, srvstate, status, cpu, err }) => {

    const [state, setState] = useState({
        isLoading: false
    })


    const ControlPower = () => {
        setState({ isLoading: true })

        let command = 'stop_power'
        if (srvstate === 'Off') {
            command = 'start_power'
        }

        // handleControlPower({
        //     token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q',
        //     i: index,
        //     id: id,
        //     command: command
        // })

        useEffect(async ({ index, id, command }) => {
            // const state = $servers.getState()
           
            const jBody = JSON.stringify({
                server_id: id,
                command: command
            })
            let f = await fetch(`${MAIN_URL}/servers/control`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q`,
                    'Contnet-Type': 'application/json'
                },
                body: jBody
            })
        
            setState({ isLoading: false })

            const response = await f.json()       
            if (response.status === "ok") {
                switch (command) {
                    case 'stop_power':
                        // state.servers[index].state = "Off";
        
                        break;
                    case 'start_power':
                        // state.servers[index].state = "Running";
        
                        break;
                    default:
                }
        
                // return state.servers
            } else {
                // state.servers[index].error = "Ошибка"
            }
        
            // return state.servers
        })

    }

    const StopPowerForce = () => {
        setState({ isLoading: true })

        // handleControlPower({
        //     token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q',
        //     i: index,
        //     id: id,
        //     command: 'stop_power_force'
        // })
        setState({ isLoading: false })

    }

    return (
        <div className="row border-0 rounded p-1 m-2 server-item bg-secondary  align-items-center" id={"server-" + id}>
            <div className="col-1">{hv}</div>
            <div className="col-3">{name}</div>
            <div className="col">{state.isLoading ? <SpinnerServer /> : (err ? <Error err={err} /> : srvstate)}</div>
            <div className="col">{cpu}%</div>
            <div className="col">{status}</div>
            <div className="col">
                <button type="button" className="bi bi-box-arrow-left btn btn-outline-light btn-sm mr-1" value="" onClick={ControlPower}></button>
                <button type="button" className="bi bi-power btn btn-outline-light btn-sm mr-1" value="" onClick={StopPowerForce}></button>
                <button type="button" className="bi bi-display btn btn-outline-light btn-sm mr-1" value=""></button>
                <Link to={"/servers/" + id} hv={hv} name={name}>
                    <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value=""></button>
                </Link>
            </div>
        </div>
    )
}