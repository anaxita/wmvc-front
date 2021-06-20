import React from 'react';
import { useState } from 'react/cjs/react.development';
import { ProcessItem } from '../ProcessItem/ProcessItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProcessUserItem = ({ u }) => {
    const prcList = u.processes.map((el) => {
        return <ProcessItem processes={el} />
    })

    const [isShowProcesses, setShowProcesses] = useState(false)
    const showProcesses = () => {
        setShowProcesses(!isShowProcesses)
    }
    return (
        <div className="processes-list" key={u.user}>
        <div className="prc-usr collapse-processes">
           <div>
                <div onClick={showProcesses} name={u.user}>
                        {isShowProcesses ?<FontAwesomeIcon icon="chevron-down" /> : 
                            <FontAwesomeIcon icon="chevron-right" />
                        }
                </div>
                {u.user}
           </div>
        </div>
        <div className="prc-state">{u.state}</div>
        <div className="prc-cpu">{u.cpu}</div>
        <div className="prc-ram">{u.ram}</div>
        <div className="prc-actions actions-btn">
            <button>
                <FontAwesomeIcon icon="sign-out-alt" />
            </button>
        </div>
        <div className="user-processes">
            {isShowProcesses ? prcList : null}
        </div>
    </div>
    )
}