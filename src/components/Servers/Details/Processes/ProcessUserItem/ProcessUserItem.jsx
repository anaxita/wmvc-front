import React from 'react';
import { useState } from 'react/cjs/react.development';
import { ProcessItem } from '../ProcessItem/ProcessItem';

export const ProcessUserItem = ({ u }) => {
    const prcList = u.processes.map(el => {
        return <ProcessItem processes={el} />
    })

    const [isShowProcesses, setShowProcesses] = useState(false)
    const showProcesses = () => {
        setShowProcesses(!isShowProcesses)
    }
    return (
        <div className="processes-list" key={u.user}>
        <div className="prc-usr collapse-processes">
            <input type="checkbox" name={u.user} onChange={showProcesses} />
            {u.user}
        </div>
        <div className="prc-state">{u.state}</div>
        <div className="prc-cpu">{u.cpu}</div>
        <div className="prc-ram">{u.ram}</div>
        <div className="prc-actions actions-btn">
        <button className="bg_logout"></button>
        </div>
        <div className="user-processes">
            {isShowProcesses ? prcList : null}
        </div>
    </div>
    )
}