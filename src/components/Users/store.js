import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { handleFetch } from '../Fetch/store';

export const setLoading = createEvent()
export const handleModalShow = createEvent()
export const setError = createEvent()
export const handleAddUsers = createEvent()
export const handleAddNewUser = createEvent()
export const handleDeleteUser = createEvent()

const $usersStore = createStore({
    users: [],
    isLoading: false,
    isModalShow: false,
    error: '',
})

export const handleEditUser = createEffect(async ({ user }) => {
    handleAddUsers((users) => {
        let newwUsers = users.map((u) => {
            if (u.id === user.id) {
                u = user
            }
            return u
        })
        return [...newwUsers]
    })
})

export const handleAddUser = createEffect( async (user) => {
    const {data, err} = await handleFetch('post', '/users', user);
    if(!err) {
        user.id = data.id;
        return user;
    } else {
        setError(err);
        return;
    }
})

export const handleGetUsers = createEffect(async () => {
    setLoading(true);
    const {data, err} = await handleFetch('get', '/users');
    setLoading(false);
    if(!err) {
        return data.users;
    } else {
        setError(err);
        return [];
    }
})



$usersStore
.on(setLoading, (state, isLoading) => ({
    ...state, isLoading
}))
.on(handleModalShow, (state, isModalShow) => ({
    ...state, isModalShow
}))
.on(setError, (state, error) => ({
    ...state, error
}))
.on(handleAddUsers, (state, users) => ({
    ...state, users
}))
.on(handleDeleteUser, (state, id) => {
    const users = state.users.filter(u => u.id !== id)
   return {
    ...state, users
}
})
.on(handleGetUsers.doneData, (state, users) => ({
    ...state, users
}))
.on(handleAddNewUser, (state, user) => {
    let newState = {...state};
    newState.users.push(user);
    return newState;
})

export const useServersStore = () => useStore($usersStore);