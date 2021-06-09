import { createEffect, createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { MAIN_URL, TOKEN_ACCESS } from "../../../Constants/Constants"

const $details = createStore({
    params: {
        // backup: ""
        // company: ""
        // cpu_cores: 8
        // cpu_load: 0
        // description: ""
        // hv: "DCSRVHV2"
        // id: "15332a09-a1fa-42e2-97e3-35f19e0f3a86"
        // ip: ""
        // memory: 4
        // name: "VMBitrix_dev.kmsys.ru_off"
        // network: ""
        // out_addr: ""
        // state: "Running"
        // status: ""
        // weight: 100
    },
    services: [],
    processes: [],
    disks: [],

    error: {
        params: '',
        services: '',
        processes: '',
        disks: '',
    },

    isLoading: {
        params: false,
        services: false,
        processes: false,
        disks: false,
    }
})

// Events
const handleUpdateServices = createEvent()

// Preloaders
const handleSetParamsPreloader = createEvent()
const handleSetServicesPreloader = createEvent()
// const handleSetProcessesPreloader = createEvent()
// const handleSetDisksPreloader = createEvent()

// Effects
export const handleGetServerParams = createEffect(async ({ serverHV, serverName }) => {
    handleSetParamsPreloader(true)

    const f = await fetch(`${MAIN_URL}/servers/${serverHV}/${serverName}`, {
        headers: {
            'Authorization': `Bearer ${TOKEN_ACCESS}`,
            'Content-Type': 'application/json',
        }
    })
    const response = await f.json()

    handleSetParamsPreloader(false)

    if (response.status === 'ok') {
        return response.message
    } else if (response.status === 'err') {
        throw new Error(response.message.err)
    } else {
        throw new Error(`Неизвестная ошибка: ${response.message}`)
    }
})

export const handleGetServerServices = createEffect(async ({ serverHV, serverName }) => {
    handleSetServicesPreloader(true)

    const f = await fetch(`${MAIN_URL}/servers/${serverHV}/${serverName}/services`, {
        headers: {
            'Authorization': `Bearer ${TOKEN_ACCESS}`,
            'Content-Type': 'application/json',
        }
    })
    const response = await f.json()

    handleSetServicesPreloader(false)

    if (response.status === 'ok') {
        return response.message.services
    } else if (response.status === 'err') {
        throw new Error(response.message.err)
    } else {
        throw new Error(`Неизвестная ошибка: ${response.message}`)
    }
})

// Handlers
const updateServices = (state, service) => {
    const serviceIndex = state.services.findIndex(service)

    if (serviceIndex > -1) {
        state.services.splice(serviceIndex, 1, service)
    } else {
        state.services.push(service)
    }

    return { ...state }
}

const setParamsPreloader = (state, value) => {
    state.isLoading.params = value

    return { ...state }
}

const setServicesPreloader = (state, value) => {
    state.isLoading.services = value

    return { ...state }
}


$details
    .on(handleUpdateServices, updateServices)
    .on(handleSetParamsPreloader, setParamsPreloader)
    .on(handleSetServicesPreloader, setServicesPreloader)

    .on(handleGetServerParams.doneData, (state, params) => {
        const newState = { ...state }
        newState.params = params

        return newState
    })
    .on(handleGetServerParams.fail, (state, err) => {
        const newState = { ...state }
        newState.error.params = err.error

        return newState
    })

    .on(handleGetServerServices.doneData, (state, services) => {
        const newState = { ...state }
        newState.services = services

        return newState
    })
    .on(handleGetServerServices.fail, (state, err) => {
        const newState = { ...state }
        newState.error.services = err.error

        return newState
    })

export const useServerDetails = () => useStore($details);