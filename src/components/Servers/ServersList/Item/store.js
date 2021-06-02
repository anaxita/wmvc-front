import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { MAIN_URL } from '../../../../Constants/Constants'

// Events
export const handleServersLoading = createEvent()

// Effects


// Control server
export const handleControlServer = createEffect(async ({ i, token, id, command }) => {
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

    const state = $server.getState()
    const response = await f.json()

    if (response.status === "ok") {
        switch (command) {
            case 'start_power':
                state.servers[i].state = "Running";

                break
            case 'stop_power':
                state.servers[i].state = "Off";

                break
            default:
                console.log("command: ", command);
        }

        return state.servers
    }

    return state.servers
})

// Servers store
const $server = createStore({
    servers: [],
    isLoading: false,
})
    // events logic
    // .on(handleServersLoading, (state, isLoading) => ({
    //     ...state, isLoading
    // }))
    // effects logic
    // .on(handleServersFetch.doneData, (state, servers) => ({
    //     ...state, servers
    // }))


// Import name of the store
export const useServerStore = () => useStore($server)
