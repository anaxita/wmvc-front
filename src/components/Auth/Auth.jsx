import React, {useState} from 'react';
import {Redirect} from 'react-router';
import {Error} from "../Error/Errors"
import {handleFetch} from '../Fetch/store';
import {SpinnerBtn} from "../Spinner/SpinnerBtn"
import jwt from 'jsonwebtoken';
import './style.css'

export const Auth = () => {
    const [state, setState] = useState({
        data: {
            name: '',
            password: '',
            server: ''
        },
        isLoading: false,
    })
    const [error, setError] = useState('')
    const [isRedirect, setRedirect] = useState(false)

    const onChange = (e) => {
        const newState = {...state}
        newState.data[e.target.name] = e.target.value

        setState(newState)
    }
    const signIn = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setState({...state, isLoading: true})
        handleFetch('POST', '/signin', state.data).then(({data, err}) => {

            if (err) {
                setError(err)
            } else {
                localStorage.setItem('cacheToken', data.access_token)
                localStorage.setItem('cacheRefreshToken', data.refresh_token)
                let tokenPayload = jwt.decode(data.access_token);
                let jsonPayload = JSON.stringify(tokenPayload.User)
                localStorage.setItem('cacheUserInfo', jsonPayload)

                setRedirect(true);
            }
            setState({...state, isLoading: false})
        })
    }


    if (isRedirect) {
        return <Redirect to="/servers"/>
    } else {
        return (
            <div className="modal auth">
                <div className="modal-content">
                    <div className="modal-header text-gold" id="auth">
                        Вход в систему
                    </div>
                    <div className="modal-body">
                        <form>
                            <label htmlFor="inputLogin" className="">Login</label>
                            <input type="text" id="inputLogin" autoComplete="off" name="email" onChange={onChange}
                                   required/>
                            <label htmlFor="inputPassword" className="">Password</label>
                            <input type="password" id="inputPassword" autoComplete="off" name="password"
                                   onChange={onChange} required/>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {state.isLoading ? <button type="button" className="btn" disabled><SpinnerBtn/> Войти</button> :
                            <button type="submit" className="btn" onClick={signIn}>Войти</button>}
                        {error ? <Error err={error}/> : null}
                    </div>
                </div>
            </div>
        )
    }
}