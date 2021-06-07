import { createStore, createEvent, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { MAIN_URL } from '../../Constants/Constants'
import sound_error from '../../sounds/error.mp3'
import sound_server_timeout from '../../sounds/server-timeout.mp3'
import sound_server_stopped from '../../sounds/server-stopped.mp3'
import sound_server_started from '../../sounds/server-started.mp3'
import sound_network_started from '../../sounds/network-started.mp3'
import sound_network_stopped from '../../sounds/network-stopped.mp3'

// Events
export const handleServersLoading = createEvent()
export const handleServerLoading = createEvent()
export const handleSetState = createEvent()
export const handleSetError = createEvent()
export const handleServersError = createEvent()
export const handleSetNetwork = createEvent()
export const handleServerNetworkLoading = createEvent()

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
            el.isNetworkLoading = false
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

    if (command === 'stop_power' || command === 'start_power' ) {
        handleServerLoading(i)
    } else {
        handleServerNetworkLoading(i)
    }
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

    if (command === 'stop_power' || command === 'start_power' || command === 'start_power_force' ) {
        handleServerLoading(i)
    } else {
        handleServerNetworkLoading(i)
    }

    const response = await f.json()
    let sound = ''
    switch (f.status) {
        case 200:
            if (response.status === "ok") {
                switch (command) {
                    case 'stop_power':
                        handleSetState({ index: i, state: "Off" });
                        sound = sound_server_stopped
                        break;
                    case 'stop_power_force':
                        handleSetState({ index: i, state: "Off" });
                        sound = sound_server_stopped
                        break;
                    case 'start_power':
                        handleSetState({ index: i, state: "Running" });
                        sound = sound_server_started
                        break;
                    case 'start_network':
                        handleSetNetwork({ index: i, network: "DMZ - Virtual Switch" });
                        sound = sound_network_started
                        break
                    case 'stop_network':
                        handleSetNetwork({ index: i, network: '' });
                        sound = sound_network_stopped
                        break;
                    default:
                        handleSetError({ index: i, error: 'request error' })

                }
            } else {
                handleSetError({ index: i, error: response.message.err })
                sound = sound_error
            }
            break;
        default:
            handleSetError({ index: i, error: "server timeout" })
            sound = sound_server_timeout

            setTimeout(
                () => {
                    handleSetError({ index: i, error: "" })
                },
                5000
            );
    }

    var audio = new Audio(sound);
    audio.play();
    // const voices = window.speechSynthesis.getVoices();
    // const lastVoice = voices[voices.length - 2];
    // const utterance = new SpeechSynthesisUtterance(toSay);
    // utterance.voice = lastVoice
    // window.speechSynthesis.speak(utterance);

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
            isNetworkLoading: false,
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
            ...state, servers: [...state.servers.slice(0, index), server, ...state.servers.slice(index + 1)]
        }
    })

    .on(handleServerNetworkLoading, (state, index) => {
        let server = { ...state.servers[index] }
        server.isNetworkLoading = !server.isNetworkLoading

        return {
            ...state, servers: [...state.servers.slice(0, index), server, ...state.servers.slice(index + 1)]
        }
    })
    .on(handleSetState, (state, server) => {
        let s = { ...state.servers[server.index] }
        s.state = server.state

        return {
            ...state, servers: [...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1)]
        }
    })
    .on(handleSetNetwork, (state, server) => {
        let s = { ...state.servers[server.index] }
        s.network = server.network
        return {
            ...state, servers: [...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1)]
        }
    })
    .on(handleSetError, (state, server) => {
        let s = { ...state.servers[server.index] }
        s.error = server.error

        return {
            ...state, servers: [...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1)]
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
