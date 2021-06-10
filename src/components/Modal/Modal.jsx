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
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header text-gold">
                    Создание пользователя
                </div>
                <div className="modal-body">
                    <form>
                        <label for="inputRole" className="">Role</label>
                        <select className="form-select" name="role" id="role" onChange={onChangeRole}>
                            <option selected value="0">User</option>
                            <option value="1">Administrator</option>
                        </select>

                        <label for="inputName" className="">Name</label>
                        <input type="text" className="" id="inputName" autocomplete="off" onChange={onChangeName} />


                        <label for="inputCompany" className="">Company</label>

                        <input type="text" className="" id="inputCompany" autocomplete="off" onChange={onChangeCompany} />



                        <label for="inputLogin" className="">Login</label>

                        <input type="text" className="" id="inputLogin" autocomplete="off" onChange={onChangeLogin} />


                        <label for="inputPassword" className="">Password</label>

                        <input type="password" className="" id="inputPassword" autocomplete="off" onChange={onChangePassword} />
                            
                    </form>
            </div>
            <div className="modal-footer">
                {error ? <Error err={error} /> : null}
                <button type="button" className="btn" onClick={closeModal}>Отмена</button>
                {isLoading ? <button type="button" className="btn" disabled><SpinnerBtn /> Создать</button> :
                    <button type="button" className="btn" onClick={createUser}>Создать</button>}
            </div>
        </div>
        </div >
    )
}