import { useState } from "react"
import { MAIN_URL, TOKEN_ACCESS } from "../../Constants/Constants"
import { Error } from "../Error/Errors"
import { SpinnerBtn } from "../Spinner/SpinnerBtn"

export const ModalAddUser = ({ setModalShow, setUser }) => {

    const closeModal = () => {
        setModalShow(false)
    }

    const [state, setState] = useState({
        role: '',
        name: '',
        company: '',
        login: '',
        password: '',
    })
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onChangeRole = (e) => {
        let newState = { ...state }
        newState.role = e.target.value
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
        newState.login = e.target.value
        setState(newState)
    }

    const onChangePassword = (e) => {
        let newState = { ...state }
        newState.password = e.target.value
        setState(newState)
    }

    const createUser = () => {
            setError('');
            setLoading(true);

            fetch(`${MAIN_URL}/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN_ACCESS}`,
                    'Contnet-Type': 'application/json'
                },
                body: JSON.stringify(state)
            })
                .then((response) => {
                    response.json();
                })
                .then((response) => {
                    if (response.status === "ok") {
                        setUser(state);
                        closeModal()
                    } else {
                        setError(response.message.err);
                    }
                })
                .catch(() => {
                    setError('Сервер не отвечает');
                })
                .finally(() => {
                    setLoading(false)

                    setTimeout(() => {
                        setError('');
                        }, 10000)
                })
    }

    return (
        <div className="position-absolute top-50 start-25 translate-middle" style={{ zIndex: 2 }}>
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
                                        <option selected value="User">User</option>
                                        <option value="Administrator">Administrator</option>
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
                        {error ? <Error err={error}/> : null}
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Отмена</button>

                        {isLoading ? <button type="button" className="btn btn-primary" disabled><SpinnerBtn /> Создать</button> :
                            <button type="button" className="btn btn-primary" onClick={createUser}>Создать</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}