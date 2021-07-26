import React from 'react';

import { useState } from "react"
import { Error } from "../Error/Errors"
import { handleFetch } from '../Fetch/store';
import { SpinnerBtn } from "../Spinner/SpinnerBtn"
import { handleEditUser } from '../Users/store';

export const ModalUserEdit = ({ setModalShow, user }) => {

    const onClickCloseModal = () => {
        setModalShow(false)
    }

    const [state, setState] = useState(user)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onChangeRole = (e) => {
        let newState = { ...state }
        newState.role = parseInt(e.target.value, 10)
        setState(newState)
    }

    const onChangeName = (e) => {
        let newState = { ...state }
        newState.name = e.target.value
        setState(newState)
    }

    const onChangeCompany = (e) => {
        let newState = { ...state }
        newState.company = e.target.value
        setState(newState)
    }

    const onChangePassword = (e) => {
        let newState = { ...state }
        newState.password = e.target.value
        setState(newState)
    }

    const onClickEditUser =  () => {
        setError('');
        setLoading(true);

        handleFetch('PATCH', '/users', state).then(({err}) => {

            setLoading(false)
            
            if (err) {
                setError(err);
            } else {
                let newState = { ...state }
                newState.password = ''
                handleEditUser(newState)
                setModalShow(false)
            }
            setTimeout(() => {
                setError('');
            }, 10000)
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header text-gold">
                    Редактирование пользователя
                </div>
                <div className="modal-body">
                    <form>
                        <label htmlFor="inputLogin" className="col-sm-2 col-form-label">Login</label>

                        <input type="text" className="form-control" id="inputLogin my-disabled-input" autoComplete="off" value={state.email} readOnly />

                        <label htmlFor="inputRole" className="col-sm-2 col-form-label">Role</label>

                        <select className="form-select" name="role" id="role" onChange={onChangeRole} defaultValue={state.role}>
                            <option value="0">User</option>
                            <option value="1">Administrator</option>
                        </select>

                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>

                        <input type="text" className="form-control bg-light" id="inputName" autoComplete="off" onChange={onChangeName} value={state.name} />

                        <label htmlFor="inputCompany" className="col-sm-2 col-form-label">Company</label>

                        <input type="text" className="form-control bg-light" id="inputCompany" autoComplete="off" onChange={onChangeCompany} value={state.company} />

                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>

                        <input type="password" className="form-control bg-light" id="inputPassword" autoComplete="off" onChange={onChangePassword} value={state.password} />

                    </form>
                </div>
                <div className="modal-footer">
                    {error ? <Error err={error} /> : null}
                    <button type="button" className="btn" onClick={onClickCloseModal}>Отмена</button>
                    {isLoading ? <button type="button" className="btn" disabled><SpinnerBtn /> Сохранить</button> :
                        <button type="button" className="btn" onClick={onClickEditUser}>Сохранить</button>}
                </div>

            </div>
        </div>
    )
}