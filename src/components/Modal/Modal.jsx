import React from 'react';

import { useState } from "react"
import { MAIN_URL, TOKEN_ACCESS } from "../../Constants/Constants"
import { Error } from "../Error/Errors"
import { SpinnerBtn } from "../Spinner/SpinnerBtn"

export const ModalAddUser = ({ setModalShow, setUser }) => {
    const closeModal = () => {
        setModalShow(false)
    }

    const [state, setState] = useState({
        id: '',
        role: 0,
        name: '',
        company: '',
        email: '',
        password: '',
    })
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

    const onChangeLogin = (e) => {
        let newState = { ...state }
        newState.email = e.target.value
        setState(newState)
    }

    const onChangePassword = (e) => {
        let newState = { ...state }
        newState.password = e.target.value
        setState(newState)
    }

    const createUser = async () => {
        setError('');
        setLoading(true);

        try {
            let f = await fetch(`${MAIN_URL}/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN_ACCESS}`,
                    'Contnet-Type': 'application/json'
                },
                body: JSON.stringify(state)
            })
            let response = await f.json()

            if (response.status === "ok") {
                let newState = { ...state }
                newState.id = response.message.id
                newState.password = ''

                setUser(newState);
                closeModal()
            } else {
                setError(response.message.err);
            }
        }
        catch (e) {
            setError('Ошибка соединения с сервером  ');
        }
        finally {
            setLoading(false)
            setTimeout(() => {
                setError('');
            }, 10000)
        }
    }

    return (
        <div className="my-modal" style={{ zIndex: 2 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addUserLabel">Создание пользователя</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row mb-3">
                                <label for="inputRole" className="col-sm-2 col-form-label">Role</label>
                                <div className="col-sm-10">
                                    <select className="form-select" name="role" id="role" onChange={onChangeRole}>
                                        <option selected value="0">User</option>
                                        <option value="1">Administrator</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputName" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control bg-light" id="inputName" autocomplete="off" onChange={onChangeName} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputCompany" className="col-sm-2 col-form-label">Company</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control bg-light" id="inputCompany" autocomplete="off" onChange={onChangeCompany} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputLogin" className="col-sm-2 col-form-label">Login</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control bg-light" id="inputLogin" autocomplete="off" onChange={onChangeLogin} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control bg-light" id="inputPassword" autocomplete="off" onChange={onChangePassword} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col">
                                {error ? <Error err={error} /> : null}
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Отмена</button>
                        {isLoading ? <button type="button" className="btn btn-primary" disabled><SpinnerBtn /> Создать</button> :
                            <button type="button" className="btn btn-primary" onClick={createUser}>Создать</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}