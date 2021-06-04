import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { MAIN_URL } from '../../Constants/Constants'

// Events
export const handleServersLoading = createEvent()
export const handleServerLoading = createEvent()
export const handleSetState = createEvent()
export const handleSetError = createEvent()
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
    handleSetError({ index: i, error: "" })
    handleServerLoading(i)
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

    handleServerLoading(i)

    const response = await f.json()

    switch (f.status) {
        case 200:
            if (response.status === "ok") {
                switch (command) {
                    case 'stop_power':
                        handleSetState({ index: i, state: "Off" });
                        break;
                    case 'stop_power_force':
                        handleSetState({ index: i, state: "Off" });
                        break;   
                    case 'start_power':
                        handleSetState({ index: i, state: "Running" });
                        break;
                    default:
                        handleSetError({ index: i, error: 'request error' })
                }
            } else {
                handleSetError({ index: i, error: response.message.err })
            }
            break;
        default:
            handleSetError({ index: i, error: "server error" })
            setTimeout(
                () => {
                    handleSetError({ index: i, error: "" })
                },
                5000
            );
    }
    const state = $servers.getState()
    return state.servers
})

// Servers store
const $servers = createStore({
    servers: [
        {
        id: "",
        name: "",
        hv: "",
        state: "",
        status: "",
        cpu: "",
        isLoading: false,
        error: ""
    },
],
    isLoading: false,
    error: '',
})
    // events logic
    .on(handleServersLoading, (state, isLoading) => ({
        ...state, isLoading
    }))
    .on(handleServerLoading, (state, index) => {
        let server = { ...state.servers[index] }
        server.isLoading = !server.isLoading

        return {
            ...state, servers: [ ...state.servers.slice(0, index), server, ...state.servers.slice(index + 1) ]
        }
    })
    .on(handleSetState, (state, server) => {
        let s = { ...state.servers[server.index] }
        s.state = server.state

        return {
            ...state, servers: [ ...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1) ]
        }
    })
    .on(handleSetError, (state, server) => {
        let s = { ...state.servers[server.index] }
        s.error = server.error

        return {
            ...state, servers: [ ...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1) ]
        }
    })
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
