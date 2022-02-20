import React, {useState} from 'react';

export const UserServers = ({id, hv, name, isActive, changeAddedStatus}) => {
    const onChangeCheckbox = () => {
        changeAddedStatus(id)
        setChecked((prev) => (!prev))
    }

    const [isChecked, setChecked] = useState(isActive)

    return (
        <div>
            <input type="checkbox" name={name} id={id} className="form-check-input" onChange={onChangeCheckbox}
                   checked={isChecked}/>
            {name} <span className="text-secondary">{hv}</span>
        </div>
    )
}