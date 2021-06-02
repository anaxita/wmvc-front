import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { MAIN_URL } from '../../Constants/Constants'

// Events
export const handleServersLoading = createEvent()

// Effects
// Get servers
export const handleServersFetch = createEffect(async ({ token }) => {
    handleServersLoading(true)
    let response = await fetch(`${MAIN_URL}/servers`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Contnet-Type': 'application/json'
        }
    })
    const j = await response.json()
    handleServersLoading(false)

    return j.message.servers
})

// Servers store
const $servers = createStore({
    servers: [],
    isLoading: false,
})
    // events logic
    .on(handleServersLoading, (state, isLoading) => ({
        ...state, isLoading
    }))
    // effects logic
    .on(handleServersFetch.doneData, (state, servers) => ({
        ...state, servers
    }))


// Import name of the store
export const useServersStore = () => useStore($servers)
