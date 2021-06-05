import { Link } from 'react-router-dom';
import { SpinnerUser } from '../../Spinner/SpinnerUser';
import { useState } from "react"

export const UserItem = ({ index , id, name, role, email, company, isLoading, color}) => {
    const [error, setError] = useState('')

    // const deleteUser = () => {
    //     console.log(state)
    //         setLoading(true);
    //         fetch(`${MAIN_URL}/users`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Authorization': `Bearer ${TOKEN_ACCESS}`,
    //                 'Contnet-Type': 'application/json'
    //             },
    //             body: JSON.stringify(state)
    //         })
    //             .then((response) => {
    //                 response.json();
    //             })
    //             .then((response) => {
    //                 if (response.status === "ok") {
    //                     setUser(state);
    //                     closeModal()
    //                 } else {
    //                     setError(response.message.err);
    //                 }
    //             })
    //             .catch(() => {
    //                 setError('Ошибка соединения с сервером  ');
    //             })
    // }
    return (        
        <div className={`row border-0 rounded p-1 m-2 server-item ${color}  align-items-center`} id={"server-" + id}>          
            <div className="col">{ isLoading ? <SpinnerUser /> : name}</div>
            <div className="col">{isLoading ? <SpinnerUser /> :  email}</div>
            <div className="col">{isLoading ? <SpinnerUser /> :  (role ? <span>Administrator</span> : <span>User</span>)}</div>
            <div className="col">{isLoading ? <SpinnerUser /> :  company}</div>
            <div className="col">{isLoading ? <SpinnerUser /> :  '25-05-2022'}</div>
            <div className="col">
                <Link to={`/users/${name}`}>
                    <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value=""></button>
                </Link>
                <button type="button" className="bi bi-x btn btn-outline-light btn-sm mr-1" value=""></button>
            </div>
        </div>
    )
}