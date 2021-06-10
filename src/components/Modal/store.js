import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'


export const setLoading = createEvent()
export const setError = createEvent()
export const handleChangeUser = createEvent()

const $modalStore = createStore({
    id: '',
    role: 0,
    name: '',
    company: '',
    email: '',
    password: '',
    isLoading: false,
    error: '',
})

// export const handleDeleteUser = createEffect(async ({ id }) => {
//     handleAddUsers((users) => {
//         return [
//             ...users.filter(user => user.id !== id).map(u => (u))
//         ]
//     })
// })

const onChangeUser = (state, {field, value}) => {
    console.log(state);
    let newState = { ...state };
    newState[field] = value;
    return newState;
}


$modalStore
.on(handleChangeUser, onChangeUser);

export const useServersStore = () => useStore($modalStore);