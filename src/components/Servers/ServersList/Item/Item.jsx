import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorAbsolute } from '../../../Error/ErrorAbsolute';
import { SpinnerItem } from '../../../Spinner/SpinnerItem';
import { handleFetch } from '../../../Fetch/store';
import sound_server_timeout from '../../../../sounds/server-timeout.mp3';
import sound_server_stopped from '../../../../sounds/server-stopped.mp3';
import sound_server_started from '../../../../sounds/server-started.mp3';
import sound_network_started from '../../../../sounds/network-started.mp3';
import sound_network_stopped from '../../../../sounds/network-stopped.mp3';
import { getUserInfo } from '../../../../Constants/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ServerItem = ({ id, name, hv, state, status, network, cpu_load }) => {

    const [powerState, handleSetState] = useState(state)
    const [networkState, handleSetNetwork] = useState(network)
    const [error, handleSetError] = useState('')
    const [isLoading, handleSetIsLoading] = useState(false)

    const handleControl = (e) => {
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

            case ('stop_power_force'):
                body.command = 'stop_power_force'
                break;

            case ('network'):
                if (networkState === 'Off') {
                    body.command = 'start_network'
                } else {
                    body.command = 'stop_network'
                }
                break;
            default:
                body.command = ''
        }

        handleFetch('post', '/servers/control' , body).then(({ err}) => {

            if(!err) {
                switch (e.target.name) {
                    case ('power'):
                        if (powerState === 'Off') {
                            handleSetState('Running')
                            sound = sound_server_started;
                        } else {
                            handleSetState('Off')
                            sound = sound_server_stopped;
                        }
                        break;
                        
                        case ('network'):
                            if (networkState === 'Off') {
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
                        })
    }
    const role = () => {
        if(getUserInfo()) {
            return getUserInfo().role;    
        } else {
            return 0;
        }
    }

    return (
        <div className="server-item" id={"server-" + id}>
            {isLoading ? <SpinnerItem /> : null}
            {error ? <ErrorAbsolute err={error}/> : null}
            <div className="srv-name">{name}</div>
            <div className="srv-hv">{hv}</div>
            <div className="srv-state">{(powerState === 'Running') ? <div className="state-on"></div> : null}</div>
            <div className="srv-status">{(status === 'Работает нормально' ) ? '' : status}</div>
            <div className="srv-network">{networkState === "Running" ? null : <div className="state-on"></div>}</div>
            <div className="srv-cpu">{`${cpu_load}%`}</div>
            <div className="actions-btn">
                    <button  type="button" name="power" onClick={handleControl}><FontAwesomeIcon icon="play-circle" /></button>
                   <button  type="button" name="network" onClick={handleControl}><FontAwesomeIcon icon="network-wired" /></button>
                    <button type="button" name="stop_power_force" onClick={handleControl}><FontAwesomeIcon icon="power-off" /></button>
                    
                    {role ? <Link to={`/servers/${hv}/${name}/info`}>
                        <button type="button"><FontAwesomeIcon icon="cog" /></button>
                    </Link>:
                        null
                    }       
            </div>
        </div>
    )
}