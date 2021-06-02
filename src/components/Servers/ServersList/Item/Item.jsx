import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleControlServer, useServerStore } from './store';

export const ServerItem = ({ index, id, name, hv, state, status, cpu}) => {
    useEffect(() => {
        // handleControlServer({token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q'})
    }, [])

    const {servers, isLoading} = useServerStore()

    const ControlPower = () => {
        let com = 'start_power'
        if (state === 'Running') {
            com = 'stop_power'
        }

        // handleControlServer({
        //     token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU1OTk4MzMsIlVzZXIiOnsiaWQiOiIxMjkiLCJuYW1lIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJlbWFpbCI6ImFkbWluIiwiY29tcGFueSI6ItCc0L7RjyDQutC-0LzQv9Cw0L3QuNGPIiwicm9sZSI6MX0sIlR5cGUiOiJhY2Nlc3MifQ.BGob5kbj3yuLoKvuTjfSCE0EjH4gKsbB19tdz6SaDVepeJF9hJ-ZgHUDLZlLYUm4IfqcP72K8we7C2vX3doh3Q',
        //     i: index,
        //     id: id,
        //     command: com
        // })
    }

    return (
        <div className="row border-0 rounded p-1 m-2 server-item bg-secondary  align-items-center" id={"server-" + id}>
            <div className="col-1">{hv}</div>
            <div className="col-3">{name}</div>
            <div className="col">{state}</div>
            <div className="col">{cpu}</div>
            <div className="col">{status}</div>
            <div className="col">
                <button className="bi bi-power btn btn-outline-light btn-sm mr-1" value="" onClick={ControlPower}></button>
                {/* <button type="button" className="bi bi-bar-chart btn btn-outline-light btn-sm mr-1" value="" onClick={ControlPower}></button> */}
                <button type="button" className="bi bi-display btn btn-outline-light btn-sm mr-1" value=""></button>
                <Link to={"/servers/" + id} hv={hv} name={name}>
                    <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value=""></button>
                </Link>
            </div>
        </div>
    )
}