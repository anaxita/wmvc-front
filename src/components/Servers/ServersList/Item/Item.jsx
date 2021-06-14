import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorAbsolute } from '../../../Error/ErrorAbsolute';
import { SpinnerServer } from '../../../Spinner/SpinnerServer';
import { handleFetch } from '../../../Fetch/store';
import sound_server_timeout from '../../../../sounds/server-timeout.mp3';
import sound_server_stopped from '../../../../sounds/server-stopped.mp3';
import sound_server_started from '../../../../sounds/server-started.mp3';
import sound_network_started from '../../../../sounds/network-started.mp3';
import sound_network_stopped from '../../../../sounds/network-stopped.mp3';

export const ServerItem = ({ id, name, hv, state, status, network, cpu_load }) => {

    const [powerState, handleSetState] = useState(state)
    const [networkState, handleSetNetwork] = useState(network)
    const [error, handleSetError] = useState('')
    const [isLoading, handleSetIsLoading] = useState(false)

    const handleControl = async(e) => {
        handleSetIsLoading(true);
        let body = {
            server_id: id,
            command: '',
        }
        let sound = '';
        switch (e.target.name) {
            case ('power'):
                if (powerState === 'Off') {
                    body.command = 'start_power'
                } else {
                    body.command = 'stop_power'
                }
                break;
            case ('network'):
                if (networkState === 'Off') {
                    body.command = 'start_network'
                } else {
                    body.command = 'stop_network'
                }
                break;
            case ('stop_power_force'):
                    body.command = 'stop_power_force'
                break;
            default:
                body.command = ''
        }
        const {err} = await handleFetch('post', '/servers/control' , body);
        if(!err) {
            switch (e.target.name) {
                case ('power'):
                    if (state === 'Off') {
                        handleSetState('Running')
                        sound = sound_server_started;
                    } else {
                        handleSetState('Off')
                        sound = sound_server_stopped;
                    }
                    break;
                case ('network'):
                    if (network === 'Off') {
                        handleSetNetwork('Running')
                        sound = sound_network_started
                    } else {
                        handleSetNetwork('Off')
                        sound = sound_network_stopped
                    }
                    break;
                case ('stop_power_force'):
                        handleSetState('Off')
                        sound = sound_server_stopped
                    break;
                default:
                    handleSetState(powerState);
                    handleSetNetwork(networkState);
            }
        } else {
            handleSetError(err);
            setTimeout(() => {
                handleSetError('');
            }, 3000)
            sound = sound_server_timeout
        }
        var audio = new Audio(sound);
        audio.play();
        handleSetIsLoading(false);
    }
    

    return (
        <div className="server-item" id={"server-" + id}>
            {isLoading ? <div className="server-item-shadow"><SpinnerServer /> Loading</div> : null}
            {error ? <ErrorAbsolute err={error}/> : null}
            <div className="srv-name">{name}</div>
            <div className="srv-hv">{hv}</div>
            <div className="srv-state">{(powerState === 'Running') ? 'Включен' : 'Выключен'}</div>
            <div className="srv-status">{(status === 'Работает нормально' && state === 'Off') ? null : status}</div>
            <div className="srv-network">{networkState === "Off" ? 'выкл' : 'ок'}</div>
            <div className="srv-cpu">{`${cpu_load}%`}</div>
            <div className="srv-actions actions-btn">
                    <button className="bg_play"  type="button" name="power" onClick={handleControl}></button>
                    <button className="bg_network"  type="button" name="network" onClick={handleControl}></button>
                    <button className="bg_powerOff" type="button" name="stop_power_force" onClick={handleControl}></button>
                    <Link to={`/servers/${hv}/${name}/info`}>
                        <button className="bg_gear" type="button"></button>
                    </Link>
            </div>
        </div>
    )
}