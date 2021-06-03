import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { MAIN_URL } from '../../Constants/Constants'

// Events
export const handleServersLoading = createEvent()
export const handleServerLoading = createEvent()
export const handleServersError = createEvent()

// Effects
// Get servers
export const handleGetServers = createEffect(async ({ token }) => {
    handleServersLoading(true)
    let f = await fetch(`${MAIN_URL}/servers`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Contnet-Type': 'application/json'
        }
    })
    const response = await f.json()
    handleServersLoading(false)

    if (response.status === "ok") {
        let result = response.message.servers.map(el => {
            el.isLoading = false
            el.error = ''
            return el
        })

        return result
    }
    
    handleServersError(response.message.err)
    return []
})

// Stop server
export const handleControlPower = createEffect(async ({ i, token, id, command }) => {
    const state = $servers.getState()

    state.servers[i].isLoading = true
    handleServerLoading(state.servers)

    const jBody = JSON.stringify({
        server_id: id,
        command: command
    })
    let f = await fetch(`${MAIN_URL}/servers/control`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Contnet-Type': 'application/json'
        },
        body: jBody
    })

    state.servers[i].isLoading = false
    handleServerLoading(state.servers)

    const response = await f.json()

    if (response.status === "ok") {
        switch (command) {
            case 'stop_power':
                state.servers[i].state = "Off";

                break;
            case 'start_power':
                state.servers[i].state = "Running";

                break;
            default:
        }

        return state.servers
    } else {
        state.servers[i].error = "Ошибка"
    }

    return state.servers
})

// Servers store
const $servers = createStore({
    servers: [],
    isLoading: false,
    error: '',
})
    // events logic
    .on(handleServersLoading, (state, isLoading) => ({
        ...state, isLoading
    }))
    .on(handleServerLoading, (state, servers) => ({
        ...state, servers
    }))
    .on(handleServersError, (state, error) => ({
        ...state, error
    }))
    // effects logic
    .on(handleGetServers.doneData, (state, servers) => ({
        ...state, servers
    }))
    .on(handleControlPower.doneData, (state, servers) => ({
        ...state, servers
    }))


// Import name of the store
export const useServersStore = () => useStore($servers)
