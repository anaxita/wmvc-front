import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleFetch } from '../../../../Fetch/store';
import { SpinnerItem } from '../../../../Spinner/SpinnerItem';
import { ErrorAbsolute } from '../../../../Error/ErrorAbsolute';

const Item = ({service, params}) => {
    const [isServicesLoading, setServicesLoading] = useState(false)
    const [status, setStatus] = useState(service.status)
    const [error, setError] = useState('')
    const stopService = async () => {
        setServicesLoading(true)
        let body = {
            service_name: service.name,
            command: 'stop'
        }
        const { err } = await handleFetch("POST", `/servers/${params.hv}/${params.name}/services`, body)
        if (err) {
            setError(err)
            setTimeout(() => setError(''), 2500);
        } else {
            setStatus('Stopped')
        }
        setServicesLoading(false)
    }
    const startService = async () => {
        setServicesLoading(true)
        let body = {
            service_name: service.name,
            command: 'start'
        }
        const { err } = await handleFetch("POST", `/servers/${params.hv}/${params.name}/services`, body)
        if (err) {
            setError(err)
            setTimeout(() => setError(''), 2500);
        } else {
            setStatus('Running')
        }
        setServicesLoading(false)
    }
    const restartService = async () => {
        setServicesLoading(true)
        let body = {
            service_name: service.name,
            command: 'restart'
        }
        const { err } = await handleFetch("POST", `/servers/${params.hv}/${params.name}/services`, body)
        if (err) {
            setError(err)
            setTimeout(() => setError(''), 2500);
        } else {
            setStatus('Running')
        }
        setServicesLoading(false)
    }
    return (
        <div className="sc-i" key={service.name}>
            {isServicesLoading ? <SpinnerItem /> : null}
            {error ? <ErrorAbsolute err={error}/> : null}
            <div className="sc-i-name">{service.name}</div>
            <div className="sc-i-display-name">{service.display_name}</div>
            <div className="sc-i-state">{status}</div>
            <div className="sc-i-user">{service.user}</div>
            <div className="sc-i-actions actions-btn">
                <button disabled={status === 'Running'} onClick={startService}><FontAwesomeIcon icon="play-circle" /></button>
                <button disabled={status === 'Stopped'} onClick={stopService}><FontAwesomeIcon icon="power-off" /></button>
                <button disabled={status === 'Stopped'} onClick={restartService}><FontAwesomeIcon icon="sync-alt" /></button>
            </div>
        </div>
    )
}
export default Item;