import React, { useEffect } from 'react';
import { ModalAddUser } from '../Modal/Modal';
import { Spinner } from '../Spinner/Spinner';
import { UserItem } from './Item/Item';
import { Error } from '../Error/Errors';
import { useServersStore, handleModalShow, handleDeleteUser, handleGetUsers } from './store';
import './style.css'


export const UsersList = () => {

    const { users, isLoading, isModalShow, error  } = useServersStore()

    useEffect(() => {
        handleGetUsers()
    }, [])

    const usersItems = users.map((el, index) => {
        return (
            <UserItem key={el.id} index={index} id={el.id} name={el.name} email={el.email} company={el.company} role={el.role} isLoading={el.isLoading} handleDeleteUser={handleDeleteUser} />
        )
    })

    // html
    return (
        <div>
            <div className="header">
                <div className="header-btn">
                    <button type="button" className="btn" onClick={() => handleModalShow(true)}>New User</button>
                </div>
                <div className="header-h">
                    USERS
                </div>
                <div className="header-input">
                    <input type="search" className="w-100"
                        placeholder="Search user ..." />
                </div>
            </div>
            <div className="content">
                <div className="user-list ">
                    {isModalShow ? <ModalAddUser /> : null}
                    <div className="user-list-header">
                        <div className="usr-list-item">Name</div>
                        <div className="usr-list-item">Login</div>
                        <div className="usr-list-item">Company</div>
                        <div className="usr-list-item">Role</div>
                        <div className="usr-list-item">Created</div>
                        <div className="usr-list-item">Actions</div>
                    </div>
                    {isLoading ? <Spinner text={'Loading users...'} /> : (error ? <Error err={error} /> : usersItems)}
                </div>
            </div>
        </div>
    )
}
