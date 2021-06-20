import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProcessItem = ({processes}) => {
        return (
            <div className="process-item" key={processes.name}>
                <div>{processes.name}</div>
                <div></div>
                <div>{processes.cpu}</div>
                <div>{processes.ram}</div>
                <div className="actions-btn">
                <button type="button">
                    <FontAwesomeIcon icon="times" />
                </button>
                </div>
            </div>
        )
}