import React, { useEffect } from 'react';
import { ModalAddUser } from '../Modal/Modal';
import { SpinnerUsers } from '../Spinner/SpinnerUsers';
import { UserItem } from './Item/Item';
import { Error } from '../Error/Errors';
import { useServersStore, handleModalShow, handleAddUser, handleDeleteUser, handleEditUser, handleGetUsers } from './store';


export const UsersList = () => {

    const { users, isLoading, isModalShow, error  } = useServersStore()

    useEffect(() => {
        handleGetUsers()
    }, [])

    const usersItems = users.map((el, index) => {
        return (
            <UserItem key={el.id} index={index} id={el.id} name={el.name} email={el.email} company={el.company} role={el.role} isLoading={el.isLoading} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
        )
    })

    // html
    return (
        <div>
            <div className="row main-rows p-1 m-0 mt-2 mb-2 bg-dark border-0 rounded align-items-center">
                <div className="col p-1 ">
                    USERS
                </div>
                <div className="col d-flex justify-content-end p-1">
                    <button type="button" className="btn btn-success btn-sm" onClick={() => handleModalShow(true)}>Add User</button>
                </div>
                <div className="col-sm mt-2 mt-md-0 p-1">
                    <input type="search" className="form-control form-control-sm border-seconadry bg-dark text-light"
                        placeholder="Search user ..." />
                </div>
            </div>
            <div className="row main-rows h-userlist p-0 m-0 border-0 rounded bg-dark">
                {isModalShow ? <ModalAddUser /> : null}

                <div className="col m-0 p-1 border-0 rounded">
                    <div className="row d-none d-md-flex p-1 m-0 mt-2 align-items-center">
                        <div className="col">Name</div>
                        <div className="col">Login</div>
                        <div className="col">Company</div>
                        <div className="col">Role</div>
                        <div className="col">Created</div>
                        <div className="col-3">Actions</div>
                    </div>

                    {isLoading ? <SpinnerUsers /> : (error ? <Error err={error} /> : usersItems)}

                </div>
            </div>
        </div>
    )
}
