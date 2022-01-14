import React, {useState} from 'react';

export const UserServers = ({id, vmid, name, isActive, changeAddedStatus}) => {
    const onChangeCheckbox = () => {
        changeAddedStatus(id)
        setChecked((prev) => (!prev))
    }

    const [isChecked, setChecked] = useState(isActive)

    return (
        <div>
            <input type="checkbox" name={name} id={id} className="form-check-input" onChange={onChangeCheckbox}
                   checked={isChecked}/>
            {name}
        </div>
    )
}