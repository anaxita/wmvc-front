import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleFetch } from '../../../../Fetch/store';
import { useState } from 'react';
import { ErrorAbsolute } from '../../../../Error/ErrorAbsolute';

export const ProcessItem = ({ params, processes }) => {
    const [prcErr, serPrcErr] = useState('')

    const stopProcess = (e) => {
        e.preventDefault()

        handleFetch('POST', `/servers/${params.hv}/${params.name}/manager`, { entity_id: processes.id, command: 'stop' })
            .then(({ err }) => {
                if (err) {
                    serPrcErr(err)
                }
            })
    }
    return (
        <div className="process-item" key={processes.name}>
            {prcErr ? <ErrorAbsolute  err={prcErr}/> : null}
            <div className="process-item__name">{processes.name}</div>
            <div></div>
            <div>{processes.cpu_load}</div>
            <div>{processes.memory}</div>
            <div className="actions-btn process-item__btn">
                <button type="button" onClick={stopProcess}>
                    <FontAwesomeIcon icon="times" />
                </button>
            </div>
        </div>
    )
}