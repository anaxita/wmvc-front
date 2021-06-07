import { useState } from "react"
import { MAIN_URL, TOKEN_ACCESS } from "../../Constants/Constants"
import { Error } from "../Error/Errors"
import { SpinnerBtn } from "../Spinner/SpinnerBtn"

export const ModalUserEdit = ({ setModalShow, editUser, user }) => {

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

    const onClickEditUser = async () => {
        setError('');
        setLoading(true);

        try {
            let f = await fetch(`${MAIN_URL}/users`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${TOKEN_ACCESS}`,
                    'Contnet-Type': 'application/json'
                },
                body: JSON.stringify(state)
            })
            let response = await f.json()

            if (response.status === "ok") {
                let newState = { ...state }
                newState.password = ''
                editUser(newState);
                setModalShow(false)
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
        <div className="my-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addUserLabel">Создание пользователя</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row mb-3">
                                <label for="inputLogin" className="col-sm-2 col-form-label">Login</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputLogin my-disabled-input" autoComplete="off" value={state.email} readOnly/>
                                </div>
                            </div>
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
                                    <input type="text" className="form-control bg-light" id="inputName" autoComplete="off" onChange={onChangeName} value={state.name}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputCompany" className="col-sm-2 col-form-label">Company</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control bg-light" id="inputCompany" autoComplete="off" onChange={onChangeCompany} value={state.company}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control bg-light" id="inputPassword" autoComplete="off" onChange={onChangePassword} value={state.password}/>
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
                        <button type="button" className="btn btn-secondary" onClick={onClickCloseModal}>Отмена</button>
                        {isLoading ? <button type="button" className="btn btn-primary" disabled><SpinnerBtn /> Создать</button> :
                            <button type="button" className="btn btn-primary" onClick={onClickEditUser}>Создать</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}