import React from 'react';
import { useState, useEffect } from "react"
import { getSearch } from "../../Constants/Constants"
import { Error } from "../Error/Errors"
import { handleFetch } from '../Fetch/store';
import { SpinnerBtn } from "../Spinner/SpinnerBtn"
import { UserServers } from "../Users/UserServers/UserServers"
import './style.css'

export const ModalUserServers = ({ setModalShow, userID }) => {

    const onClickCloseModal = () => {
        setModalShow(false)
    }

    const [servers, setServers] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSearch, setSearch] = useState(false);
    const [serversSearch, setServersSearch] = useState([]);


    useEffect(() => {
        setLoading(true);
        handleFetch('GET', `/users/${userID}/servers`)
            .then(({ data, err }) => {
                setLoading(false)
                if (err) {
                    setError(err);
                } else {
                    setServers(data.servers);
                }

                setTimeout(() => {
                    setError('');
                }, 10000)
            })
        return null
    }, [userID])

    const changeAddedStatus = (userID) => {
        const newServers = servers.filter(el => {
            if (el.id === userID) {
                el.is_added = !el.is_added
            }

            return el
        })
        setServers(newServers)
    }

    const onClickSetServers = () => {
        setError('');
        setLoading(true);

        const serversToSend = servers.filter(el => el.is_added)

        handleFetch('POST', '/users/servers', { user_id: userID, servers: serversToSend }).then(({data, err}) => {
            
            setLoading(false)
            if (err) {
                setError(err);
            } else {
                setModalShow(false)
            }
            
            setTimeout(() => {
                setError('');
            }, 10000)
        })
        }

    const onSearch = (e) => {
        let value = e.target.value;
        if (value) {
            setSearch(true);
            setServersSearch(getSearch(servers, value));
        } else {
            setSearch(false);
        }
    }

    let serversList = []
    if (!isSearch) {
        serversList = servers.map((el) => {
            return (
                <UserServers key={el.id} id={el.id} name={el.name} isActive={el.is_added} changeAddedStatus={changeAddedStatus} />
            )
        })
    } else {
        serversList = serversSearch.map((el) => {
            return (
                <UserServers key={el.id} id={el.id} name={el.name} isActive={el.is_added} changeAddedStatus={changeAddedStatus} />
            )
        })
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header text-gold">
                    Доступ к серверам
                </div>
                <div className="modal-body">
                    <input onChange={onSearch} type="search" name="" id="" className="form-control form-control-sm mb-2 bg-light" placeholder="Search server ..." />
                    <div className="serversList_scroll">
                        {serversList}
                    </div>
                </div>
                <div className="modal-footer">
                    {error ? <Error err={error} /> : null}
                    <button type="button" className="btn btn-secondary" onClick={onClickCloseModal}>Отмена</button>
                    {isLoading ? <button type="button" className="btn btn-primary" disabled><SpinnerBtn /> Сохранить</button> :
                        <button type="button" className="btn btn-primary" onClick={onClickSetServers}>Сохранить</button>}
                </div>
            </div>
        </div>
    )
}