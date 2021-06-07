import { SpinnerUser } from '../../Spinner/SpinnerUser';
import { useState } from "react"
import { MAIN_URL, TOKEN_ACCESS } from '../../../Constants/Constants';
import { FixedError } from '../../Error/FixedError';
import { ModalUserEdit } from '../../Modal/ModalUserEdit';
import { ModalUserServers } from '../../Modal/ModalUserServers';

export const UserItem = ({ id, name, role, email, company, isLoading, color, deleteUser, editUser }) => {
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
                deleteUser(id)
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
        <div>
            {isModalShow ? <ModalUserEdit setModalShow={setModalEditUserShow} editUser={editUser} user={{ id, name, role, email, company, password: ''}} /> : null}
            {isModalEditUserServers ? <ModalUserServers setModalShow={setModalEditUserServersShow} userID={id} /> : null}
            <div className={`row border-0 rounded p-1 m-2 server-item ${color}  align-items-center`} id={"server-" + id}>
                <div className="col">{isLoading ? <SpinnerUser /> : name}</div>
                <div className="col">{isLoading ? <SpinnerUser /> : email}</div>
                <div className="col">{isLoading ? <SpinnerUser /> : (role ? <span>Administrator</span> : <span>User</span>)}</div>
                <div className="col">{isLoading ? <SpinnerUser /> : company}</div>
                <div className="col">{isLoading ? <SpinnerUser /> : '25-05-2022'}</div>
                <div className="col-3">
                    <div className="row">
                        <div className="col">
                            <form>
                                <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value="" onClick={() => setModalEditUserShow(true)}></button>
                                <button type="button" className="bi bi-gear btn btn-outline-light btn-sm mr-1" value="" onClick={() => setModalEditUserServersShow(true)}></button>
                                <button type="button" className="bi bi-x btn btn-outline-light btn-sm mr-1" value="" onClick={onDeleteUser}></button>
                            </form>
                        </div>
                        <div className="col">
                            {error ? <FixedError err={error} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}