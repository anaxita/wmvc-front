import React from 'react';
import { Error } from "../Error/Errors"
import { SpinnerBtn } from "../Spinner/SpinnerBtn"
import { handleModalShow } from '../Users/store';
import { handleChangeUser, useModalsAddUserStore, handleAddUser } from './store';


export const ModalAddUser = () => {

    const { isLoading, error } = useModalsAddUserStore()

    const closeModal = () => {
        handleModalShow(false)
    }

    const onChangeUser = (e) => {
        let field = e.target.name;
        let value = e.target.value;
        if(field === 'role') {
            value = parseInt(value, 10);
        }
        handleChangeUser({field, value});
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header text-gold">
                    Создание пользователя
                </div>
                <div className="modal-body">
                    <form>
                        <label for="inputRole" className="">Role</label>
                        <select className="form-select" name="role" id="role" onChange={onChangeUser}>
                            <option selected value="0">User</option>
                            <option value="1">Administrator</option>
                        </select>

                        <label for="inputName" className="">Name</label>
                        <input type="text" className="" id="inputName" autocomplete="off" name="name" onChange={onChangeUser} />


                        <label for="inputCompany" className="">Company</label>

                        <input type="text" className="" id="inputCompany" autocomplete="off" name="company" onChange={onChangeUser} />



                        <label for="inputLogin" className="">Login</label>

                        <input type="text" className="" id="inputLogin" autocomplete="off" name="email" onChange={onChangeUser} />


                        <label for="inputPassword" className="">Password</label>

                        <input type="password" className="" id="inputPassword" autocomplete="off" name="password" onChange={onChangeUser} />
                            
                    </form>
            </div>
            <div className="modal-footer">
                {error ? <Error err={error} /> : null}
                <button type="button" className="btn" onClick={closeModal}>Отмена</button>
                {isLoading ? <button type="button" className="btn" disabled><SpinnerBtn /> Создать</button> :
                    <button type="button" className="btn" onClick={handleAddUser}>Создать</button>}
            </div>
        </div>
        </div >
    )
}