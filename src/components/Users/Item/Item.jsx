import React from 'react';
import { SpinnerUser } from '../../Spinner/SpinnerUser';
import { useState } from "react"
import { MAIN_URL, TOKEN_ACCESS } from '../../../Constants/Constants';
import { ModalUserEdit } from '../../Modal/ModalUserEdit';
import { ModalUserServers } from '../../Modal/ModalUserServers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const UserItem = ({ id, name, role, email, company, isLoading, handleDeleteUser, handleEditUser }) => {
    const [error, setError] = useState('')
    const [isModalShow, setModalEditUserShow] = useState(false)
    const [isModalEditUserServers, setModalEditUserServersShow] = useState(false)

    const onDeleteUser = async (e) => {
        e.preventDefault();
        setError('');

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
                setError(response.message.err);
            }
        }
        catch (e) {
            setError('Ошибка соединения с сервером  ');
        }
        finally {
            setTimeout(() => {
                setError('');
            }, 10000)
        }
    }

    return (
            <div className="user-item" id={"server-" + id}>
            {isModalShow ? <ModalUserEdit setModalShow={setModalEditUserShow} handleEditUser={handleEditUser} user={{ id, name, role, email, company, password: '' }} /> : null}
            {isModalEditUserServers ? <ModalUserServers setModalShow={setModalEditUserServersShow} userID={id} /> : null}
                <div className="usr-name">{isLoading ? <SpinnerUser /> : name}</div>
                <div className="usr-login">{isLoading ? <SpinnerUser /> : email}</div>
                <div className="usr-company">{isLoading ? <SpinnerUser /> : company}</div>
                <div className="usr-role">{isLoading ? <SpinnerUser /> : (role ? <span>Administrator</span> : <span>User</span>)}</div>
                <div className="usr-created">{isLoading ? <SpinnerUser /> : '25-05-2022'}</div>
                <div className="usr-actions actions-btn">
                    <button type="button"  onClick={() => setModalEditUserShow(true)}><FontAwesomeIcon icon="user-edit" /></button>
                    <button type="button"  onClick={() => setModalEditUserServersShow(true)}><FontAwesomeIcon icon="server" /></button>
                    <button type="button"  onClick={onDeleteUser}><FontAwesomeIcon icon="times" /></button>
                </div>
            </div>
    )
}