import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { handleFetch } from '../Fetch/store';

export const setLoading = createEvent()
export const handleModalShow = createEvent()
export const setError = createEvent()
export const handleAddUsers = createEvent()

const $usersStore = createStore({
    users: [],
    isLoading: false,
    isModalShow: false,
    error: '',
})



export const handleDeleteUser = createEffect(async ({ id }) => {
    handleAddUsers((users) => {
        return [
            ...users.filter(user => user.id !== id).map(u => (u))
        ]
    })
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
.on(handleGetUsers.doneData, (state, users) => ({
    ...state, users
}))

export const useServersStore = () => useStore($usersStore);