import React from 'react';
import { useState, useEffect } from "react"
import { getSearch, MAIN_URL, TOKEN_ACCESS } from "../../Constants/Constants"
import { Error } from "../Error/Errors"
import { SpinnerBtn } from "../Spinner/SpinnerBtn"
import { UserServers } from "../Users/UserServers/UserServers"
import './style.css'

export const ModalUserServers = ({ setModalShow, userID}) => {

    const onClickCloseModal = () => {
        setModalShow(false)
    }

    const [servers, setServers] = useState([
        // {
        //     id: "fgh-5-h-dfghrgh--45th--",
        //     name: "SRV_PF",
        //     hv: "DCSRVHV12",
        //     state: "",
        //     network: "",
        //     company: "Промформат",
        //     description: "Такая-то компания и вообще молодцы",
        //     ip: "172.12.3.0",
        //     out_addr: "dc.kmsys.ru:5322",
        //     is_added: true
        //   },
    ])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSearch, setSearch] = useState(false);
    const [serversSearch, setServersSearch] = useState([]);


    useEffect(() => {
        async function FetchData(){
            setLoading(true);

            try {
                let f = await fetch(`${MAIN_URL}/users/${userID}/servers`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN_ACCESS}`,
                        'Contnet-Type': 'application/json'
                    },
                })
                
                let response = await f.json()
                
                if (response.status === "ok") {
                    setServers(response.message.servers);
                } else {
                    setError(response.message.err);
                }
            }
            catch (e) {
                setError('Ошибка соединения с сервером  ');
            }
            finally {
                setLoading(false);
            }
        }
        FetchData()
            
    }, [userID])

    const changeAddedStatus = (userID) => {
        const newServers = servers.map(el => {
            if (el.id === userID) {
                el.is_added = !el.is_added
            }
            
            return el
        })
        setServers(newServers)
    }

    const onClickSetServers = async () => {
        setError('');
        setLoading(true);

        const serversToSend = servers.filter(el => el.is_added)

        try {
            let f = await fetch(`${MAIN_URL}/users/servers`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN_ACCESS}`,
                    'Contnet-Type': 'application/json'
                },
                body: JSON.stringify({user_id: userID, servers: serversToSend})
            })
            let response = await f.json()

            if (response.status === "ok") {
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
    
    // const serversList = servers.map((el) => {
    //     return (
    //         <UserServers id={el.id} name={el.name} isActive={el.is_added} changeAddedStatus={changeAddedStatus}/>
    //     )
    // })

    const onSearch = (e) => {
        let value = e.target.value;
        if(value) {
            setSearch(true);
            setServersSearch(getSearch(servers, value));
        } else {
            setSearch(false);
        }
    }


    let serversList = []
    if(!isSearch) {
        serversList = servers.map((el) => {
            return (
                <UserServers id={el.id} name={el.name} isActive={el.is_added} changeAddedStatus={changeAddedStatus}/>
            )
        })
    } else {    
        serversList = serversSearch.map((el, index) => {
            return (
                <UserServers id={el.id} name={el.name} isActive={el.is_added} changeAddedStatus={changeAddedStatus}/>
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
                        <input onChange={onSearch} type="search" name="" id="" className="form-control form-control-sm mb-2 bg-light"  placeholder="Search server ..."/>
                        <div className="serversList_scroll">
                            {serversList}
                        </div>
                    </div>
                    <div className="modal-footer">
                                {error ? <Error err={error} /> : null}
                        <button type="button" className="btn btn-secondary" onClick={onClickCloseModal}>Отмена</button>
                        {isLoading ? <button type="button" className="btn btn-primary" disabled><SpinnerBtn /> Создать</button> :
                            <button type="button" className="btn btn-primary" onClick={onClickSetServers}>Создать</button>}
                    </div>
                            </div>
                </div>
    )
}