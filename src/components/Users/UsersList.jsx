import React, { useEffect, useState } from 'react';
import { MAIN_URL, TOKEN_ACCESS } from '../../Constants/Constants';
import { ModalAddUser } from '../Modal/Modal';
import { SpinnerUsers } from '../Spinner/SpinnerUsers';
import { UserItem } from './Item/Item';
import { Error } from '../Error/Errors';


export const UsersList = () => {

    const [users, setUsers] = useState(
        [
            // User's fields example
            // {
            //     id: '',
            //     name: 'props.match.params.name',
            //     email: '',
            //     company: '',
            //     password: '',
            //     role: 0,
            // },
            // {
            //     id: '',
            //     name: 'props.match.params.name',
            //     email: '',
            //     company: '',
            //     password: '',
            //     role: 1,
            // }
        ]
    )

    const [isLoading, setLoading] = useState(false)
    const [isModalShow, setModalShow] = useState(false)
    const [error, setError] = useState('')

    const setUser = (user) => {
        setUsers((users) => {
            return [
                ...users,
                user
            ]
        })
    }

    const deleteUser = (id) => {
        setUsers((users) => {
            return [
                ...users.filter(user => user.id !== id).map(u => (u))
            ]
        })
    }

    const editUser = (user) => {
        setUsers((users) => {
            let newwUsers = users.map((u) => {
                if (u.id === user.id) {
                    u = user
                }
                return u
            })
            return [...newwUsers]
        })
    }

    useEffect(() => {
        async function FetchData() {
            setLoading(true);

            try {
                let f = await fetch(`${MAIN_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN_ACCESS}`,
                        'Contnet-Type': 'application/json'
                    },
                })

                let response = await f.json()

                if (response.status === "ok") {
                    setUsers(response.message.users);
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

    }, [])

    const usersItems = users.map((el, index) => {
        let color = 'my-bg-secondary'
        if (index % 2) {
            color = 'bg-secondary'
        }
        return (
            <UserItem key={el.id} index={index} id={el.id} name={el.name} email={el.email} company={el.company} role={el.role} isLoading={el.isLoading} color={color} deleteUser={deleteUser} editUser={editUser} />
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
                    <button type="button" className="btn btn-success btn-sm" onClick={() => setModalShow(true)}>Add User</button>
                </div>
                <div className="col-sm mt-2 mt-md-0 p-1">
                    <input type="search" className="form-control form-control-sm border-seconadry bg-dark text-light"
                        placeholder="Search user ..." />
                </div>
            </div>
            <div className="row main-rows h-userlist p-0 m-0 border-0 rounded bg-dark">
                {isModalShow ? <ModalAddUser setModalShow={setModalShow} setUser={setUser} /> : null}

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
