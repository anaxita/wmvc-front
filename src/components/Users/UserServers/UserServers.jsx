import { useState } from "react"

export const UserServers = ({id, name, isActive, changeAddedStatus}) => {
    const onChangeCheckbox = () => {
        changeAddedStatus(id)
        setChecked((prev) => (!prev))
    }

    const [isChecked, setChecked] = useState(isActive)

    return (
        <div className="row">
            <div className="col-1 form-check">
                <input type="checkbox" name="" id="" className="form-check-input" onChange={onChangeCheckbox} checked={isChecked}/>
            </div>
            <div className="col">
                {name}
            </div>
        </div>
    )
}