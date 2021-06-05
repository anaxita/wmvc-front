import React, { useEffect, useState } from 'react';
import { MAIN_URL, TOKEN_ACCESS } from '../../Constants/Constants';
import { ModalAddUser } from '../Modal/Modal';
import { SpinnerUsers } from '../Spinner/SpinnerUsers';
import { UserItem } from './Item/Item';
import { FixedError } from '../Error/FixedError';


export const UsersList = () => {

    const [users, setUsers] = useState(
        [
            // User's fields example
            // {
            //     id: '',
            //     name: 'props.match.params.name',
            //     email: '',
            //     company: '',
            //     role: 0,
            // },
            // {
            //     id: '',
            //     name: 'props.match.params.name',
            //     email: '',
            //     company: '',
            //     role: 1,
            // }
        ]
    )

    const [isLoading, setLoading] = useState(false)
    const [isModalShow, setModalShow] = useState(false)
    const [error, setError] = useState('')

    const setUser = (user) => {
        let newUsers = { ...users }
        newUsers.push = (user)
        setUsers(newUsers)
    }

    useEffect(() => {
        setLoading(true);

        // fetch(`${MAIN_URL}/users`, {
        //     headers: {
        //         'Authorization': `Bearer ${TOKEN_ACCESS}`,
        //         'Contnet-Type': 'application/json'
        //     },
        // })
        //     .then((response) => {
        //         console.log("response before json: ", response)
        //         response.json();
        //     })
        //     .then((response) => {
        //         console.log("response users: ", response)
        //         if (response.status === "ok") {
        //             setUsers(response.message.users);
        //         } else {
        //             setError(response.message.err);
        //         }
        //     })
        //     .catch(() => {
        //         setError('Ошибка соединения с сервером  ');
        //         setTimeout(() => {
        //             setError('');
        //         }, 5000)
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     })

    }, [])

    const usersItems = users.map((el, index) => {
        let color = 'my-bg-secondary'
        if (index % 2) {
            color = 'bg-secondary'
        }
        return (
            <UserItem key={el.id} index={index} id={el.id} name={el.name} email={el.email} company={el.company} role={el.role} isLoading={el.isLoading} color={color} />
        )
    })

    // html
    return (
        <div className="mr-2">
            <div className="row main-rows p-1 m-0 mt-2 mb-2 bg-dark border-0 rounded align-items-center">
                <div className="col-2">
                    <button type="button" className="btn btn-success btn-sm" onClick={() => setModalShow(true)}>Add User</button>
                </div>
                <div className="col text-center">
                    USERS
                </div>
                <div className="col-3">
                    <input type="search" className="form-control border-seconadry bg-dark text-light"
                        placeholder="Search user ..." />
                </div>
            </div>
            <div className="row main-rows vh-100 p-0 m-0 border-0 rounded bg-dark">
                {isModalShow ? <ModalAddUser setModalShow={setModalShow} setUser={setUser} /> : null}

                <div className="colborder-0 rounded">
                    <div className="row p-1 mr-2 ml-2 mt-2 align-items-center">
                        <div className="col">Name</div>
                        <div className="col">Login</div>
                        <div className="col">Role</div>
                        <div className="col">Company</div>
                        <div className="col">Created</div>
                        <div className="col">Actions</div>
                    </div>

                    {isLoading ? <SpinnerUsers /> : (error ? <FixedError err={error} /> : usersItems)}
                    {/* {isLoading ? <SpinnerUsers /> : (error ? <Error err={error} /> : ((usersItems.length < 1) ? 'No users' : usersItems))} */}
                </div>
            </div>
        </div>
    )
}
