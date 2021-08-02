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

    const handleControl = (command) => {
        handleSetIsLoading(true);

        let body = {
            server_id: id,
            command: '',
        }

        let sound = '';
        switch (command) {
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
                if (networkState) {
                    body.command = 'stop_network'
                } else {
                    body.command = 'start_network'
                }
                break;
            default:
                body.command = ''
        }

        handleFetch('post', '/servers/control', body).then(({ err }) => {

            if (!err) {
                switch (command) {
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
                        if (networkState) {
                            handleSetNetwork('')
                            sound = sound_network_stopped
                        } else {
                            handleSetNetwork('Running')
                            sound = sound_network_started
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
    const {role} = getUserInfo()

    return (
        <div className="server-item" id={"server-" + id}>
            {isLoading ? <SpinnerItem /> : null}
            {error ? <ErrorAbsolute err={error} /> : null}
            <div className="srv-name">{name}</div>
            <div className="srv-hv">{hv}</div>
            <div className="srv-state"><span className={"srv-state_name"}>Питание</span> {(powerState === 'Running') ? <div className="state-on"></div> : <div className="state-off"></div>}</div>
            <div className="srv-status">{(status === 'Работает нормально') ? '' : status}</div>
            <div className="srv-network"><span className={"srv-state_name"}>Сеть</span> {networkState ? <div className="state-on"></div> : <div className="state-off"></div>}</div>
            <div className="srv-cpu">{`${cpu_load}%`}</div>
            <div className="actions-btn">
                <button type="button" name="power" onClick={() => handleControl('power')}>
                    <FontAwesomeIcon icon="play-circle" />
                </button>
                <button type="button" name="network" onClick={() => handleControl('network')}><FontAwesomeIcon icon="network-wired" /></button>
                <button type="button" name="stop_power_force" onClick={() => handleControl('stop_power_force')}><FontAwesomeIcon icon="power-off" /></button>

                {role ? <Link to={`/servers/${hv}/${name}/info`}>
                    <button type="button"><FontAwesomeIcon icon="cog" /></button>
                </Link> :
                    null
                }
            </div>
        </div>
    )
}