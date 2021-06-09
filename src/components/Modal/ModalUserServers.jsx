import React from 'react';
import { useState, useEffect } from "react"
import { MAIN_URL, TOKEN_ACCESS } from "../../Constants/Constants"
import { Error } from "../Error/Errors"
import { SpinnerBtn } from "../Spinner/SpinnerBtn"
import { UserServers } from "../Users/UserServers/UserServers"

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

        const serversToSend = servers.filter(el => el.is_added).map((el) => (el))

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
    
    const serversList = servers.map((el) => {
        return (
            <UserServers id={el.id} name={el.name} isActive={el.is_added} changeAddedStatus={changeAddedStatus}/>
        )
    })

    return (
        <div className="my-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addUserLabel">Доступ к серверам</h5>
                    </div>
                    <div className="modal-body">
                        <input type="search" name="" id="" className="form-control form-control-sm mb-2 bg-light"  placeholder="Search server ..."/>
                        {serversList}
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col">
                                {error ? <Error err={error} /> : null}
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary" onClick={onClickCloseModal}>Отмена</button>
                        {isLoading ? <button type="button" className="btn btn-primary" disabled><SpinnerBtn /> Создать</button> :
                            <button type="button" className="btn btn-primary" onClick={onClickSetServers}>Создать</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}