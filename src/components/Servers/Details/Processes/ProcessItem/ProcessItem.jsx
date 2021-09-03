import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleFetch } from '../../../../Fetch/store';
import { ErrorAbsolute } from '../../../../Error/ErrorAbsolute';
import { SpinnerItem } from '../../../../Spinner/SpinnerItem';

export const ProcessItem = ({ params, process, removeProcess }) => {
    const [prcErr, serPrcErr] = useState('')
    const [isLoading, handleSetIsLoading] = useState(false)

    const stopProcess = (e) => {
        e.preventDefault()
        handleSetIsLoading(true);
        handleFetch('POST', `/servers/${params.hv}/${params.name}/manager`, { entity_id: process.id, command: 'stop' })
            .then(({ err }) => {
                if (err) {
                    serPrcErr(err)
                } else {
                    removeProcess(process.id)
                }
            })
            .finally(() => {
                handleSetIsLoading(false);
            })
    }
    return (
        <div className="process-item" key={process.name}>
            {prcErr ? <ErrorAbsolute  err={prcErr}/> : null}
            {isLoading ? <SpinnerItem /> : null}
            <div className="process-item__name">{process.name}</div>
            <div></div>
            <div>{process.cpu_load}</div>
            <div>{process.memory}</div>
            <div className="actions-btn process-item__btn">
                <button type="button" onClick={stopProcess}>
                    <FontAwesomeIcon icon="times" />
                </button>
            </div>
        </div>
    )
}