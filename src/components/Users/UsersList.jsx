import React, { useEffect, useState } from 'react';
import { MAIN_URL, TOKEN_ACCESS } from '../../Constants/Constants';
import { ModalAddUser } from '../Modal/Modal';
import { Spinner } from '../Spinner/Spinner';
import { UserItem } from './Item/Item';
import { Error } from '../Error/Errors';
import './style.css'


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
        let color = 'bg-secondary-light'
        if (index % 2) {
            color = 'bg-secondary'
        }
        
        return (
            <UserItem key={el.id} index={index} id={el.id} name={el.name} email={el.email} company={el.company} role={el.role} isLoading={el.isLoading} color={color} deleteUser={deleteUser} editUser={editUser} />
        )
    })

    // html
    return (
        <div className="main">
            <div className="header">

                <div className="header-btn">
                    <button type="button" className="btn" onClick={() => setModalShow(true)}>New User</button>
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
                    {isModalShow ? <ModalAddUser setModalShow={setModalShow} setUser={setUser} /> : null}
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
