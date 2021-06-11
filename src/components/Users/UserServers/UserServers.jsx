import React from 'react';
import { useState } from "react"

export const UserServers = ({id, name, isActive, changeAddedStatus}) => {
    const onChangeCheckbox = () => {
        changeAddedStatus(id)
        setChecked((prev) => (!prev))
    }

    const [isChecked, setChecked] = useState(isActive)

    return (
        <div>
                <input type="checkbox" name="" id="" className="form-check-input" onChange={onChangeCheckbox} checked={isChecked}/>
                {name}
        </div>
    )
}