import React from 'react';
import { useState } from "react"
import { MAIN_URL, TOKEN_ACCESS } from '../../../Constants/Constants';
import { ModalUserEdit } from '../../Modal/ModalUserEdit';
import { ModalUserServers } from '../../Modal/ModalUserServers';
import { ErrorAbsolute } from '../../Error/ErrorAbsolute';
import { SpinnerItem } from '../../Spinner/SpinnerItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

export const UserItem = ({ id, name, role, email, company, handleDeleteUser }) => {
    const [error, handleSetError] = useState('');
    const [isLoading, handleSetIsLoading] = useState(false);
    const [isModalShow, setModalEditUserShow] = useState(false)
    const [isModalEditUserServers, setModalEditUserServersShow] = useState(false)
    const onDeleteUser = async (e) => {
        e.preventDefault();
        handleSetError('');
        handleSetIsLoading(true);
        try {
            let f = await fetch(`${MAIN_URL}/users`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${TOKEN_ACCESS}`,
                    'Contnet-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })

            let response = await f.json()
            if (response.status === "ok") {
                handleDeleteUser(id)
            } else {
                handleSetError(response.message.err);
            }
        }
        catch (e) {
            handleSetError('Ошибка соединения с сервером  ');
        }
        finally {
            handleSetIsLoading(false);
            setTimeout(() => {
                handleSetError('');
            }, 10000)
        }
    }

    return (
            <div className="user-item" id={"server-" + id}>
            {isLoading ? <SpinnerItem /> : null}
            {isModalShow ? <ModalUserEdit setModalShow={setModalEditUserShow} user={{ id, name, role, email, company, password: '' }} /> : null}
            {isModalEditUserServers ? <ModalUserServers setModalShow={setModalEditUserServersShow} userID={id} /> : null}
                <div className="usr-name">{name}</div>
                <div className="usr-login">{email}</div>
                <div className="usr-company">{company}</div>
                <div className="usr-role">{role ? <span>Administrator</span> : <span>User</span>}</div>
                <div className="usr-created">25-05-2022 </div>
                <div className="usr-actions actions-btn">
                    <button type="button"  onClick={() => setModalEditUserShow(true)}>
                        <FontAwesomeIcon icon="user-edit" />
                    </button>
                    {
                        (role) ? <button type="button" disabled><FontAwesomeIcon icon="server"/></button> :
                        <button type="button"  onClick={() => setModalEditUserServersShow(true)}><FontAwesomeIcon icon="server" /></button>
                    }
                    <button type="button"  onClick={onDeleteUser}><FontAwesomeIcon icon="times" /></button>
                    {error ? <ErrorAbsolute err={error}/> : null}
                </div>
            </div>
    )
}