import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Error } from "../Error/Errors"
import { handleFetch } from '../Fetch/store';
import { SpinnerBtn } from "../Spinner/SpinnerBtn"
import './style.css'


export const Auth = () => {

    const [state, setState] = useState({
        data: {
            name: '',
            password: ''
        },
        isLoading: false,
        error: '',
    })

    const [isRedirect, setRedirect] = useState(false)
    const onChange = (e) => {
        const newState = { ...state }
        newState.data[e.target.name] = e.target.value
        setState(newState)
    }

    const signIn = async () => {
        setState({ ...state, isLoading: true })
        const { err } = await handleFetch('POST', '/signin', state.data)
        setState({ ...state, isLoading: false })
        if (!err) {
            setRedirect(true)
        } else {
            setState({ ...state, error: err })
        }
    }

    if (isRedirect) {
        return <Redirect to="/servers" />
    } else {
        return (
            <div className="modal auth">
                <div className="modal-content">
                    <div className="modal-header text-gold" id="auth">
                        Вход в систему
                    </div>
                    <div className="modal-body">
                        <form>
                            <label for="inputLogin" className="">Login</label>
                            <input type="text" className="" id="inputLogin" autocomplete="off" name="email" onChange={onChange} />
                            <label for="inputPassword" className="">Password</label>
                            <input type="password" className="" id="inputPassword" autocomplete="off" name="password" onChange={onChange} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        {state.isLoading ? <button type="button" className="btn" disabled><SpinnerBtn /> Войти</button> :
                            <button type="button" className="btn" onClick={signIn}>Войти</button>}
                            {state.error ? <Error err={state.error} /> : null}
                    </div>
                </div>
            </div >
        )
    }
}