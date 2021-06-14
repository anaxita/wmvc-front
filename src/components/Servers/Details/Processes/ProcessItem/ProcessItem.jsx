import React from 'react';

export const ProcessItem = ({processes}) => {
        return (
            <div className="process-item" key={processes.name}>
                <div className="">{processes.name}</div>
                <div className=""></div>
                <div className="">{processes.cpu}</div>
                <div className="">{processes.ram}</div>
                <div className="actions-btn">
                <button type="button" className="bg_close"></button>
                </div>
            </div>
        )
}