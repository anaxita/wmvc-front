import React from 'react';
import { useState } from 'react/cjs/react.development';
import { ProcessItem } from '../ProcessItem/ProcessItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {handleFetch} from '../../../../Fetch/store'
import { ErrorAbsolute } from '../../../../Error/ErrorAbsolute';

export const ProcessUserItem = ({ u, params }) => {
    const prcList = u.processes.map((el, index) => {
        return <ProcessItem key={index} processes={el} params={params} />
    })

    const [isShowProcesses, setShowProcesses] = useState(0)
    const [userErr, setUserErr] = useState('')
    const showProcesses = () => {
        setShowProcesses(!isShowProcesses)
    }

    const logoffUser = (e) => {
        e.preventDefault()

        // TODO: add preloader like at servers

        handleFetch('POST', `/servers/${params.hv}/${params.name}/manager`, {entity_id: u.session_id, command: 'disconnect'})
        .then(({err}) => {
            if (err) {
                setUserErr(err)
            }
        })
    }

    return (
        <div className="processes-list" key={u.user_name}>
            {userErr ? <ErrorAbsolute err={userErr} /> : null}
        <div className="prc-usr collapse-processes">
           <div onClick={showProcesses}>
                <div  name={u.user_name}>
                        {isShowProcesses ?<FontAwesomeIcon icon="chevron-down" /> : 
                            <FontAwesomeIcon icon="chevron-right" />
                        }
                </div>
                {u.user_name}
           </div>
        </div>
        <div className="prc-state">{u.state}</div>
        <div className="prc-cpu">{u.cpu}</div>
        <div className="prc-ram">{u.ram}</div>
        <div className="prc-actions actions-btn">
            <button onClick={logoffUser}>
                <FontAwesomeIcon icon="sign-out-alt" />
            </button>
        </div>
        <div className="user-processes">
            {isShowProcesses ? prcList : null}
        </div>
    </div>
    )
}