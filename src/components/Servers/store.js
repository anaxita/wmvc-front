import {createEffect, createEvent, createStore} from 'effector';
import {useStore} from 'effector-react';
import {handleFetch} from '../Fetch/store';

// Events
export const handleServersLoading = createEvent();
export const handleServerLoading = createEvent();
export const handleSetState = createEvent();
export const handleSetError = createEvent();
export const handleServersError = createEvent();
export const handleSetNetwork = createEvent();
export const handleServerNetworkLoading = createEvent();

// Effects
// Get servers
export const handleGetServers = createEffect(async () => {
  handleServersLoading(true);

  let result = [];

  const {data, err} = await handleFetch('GET', '/servers')
  if (err) {
    handleServersError(err);
  } else {
    result = data.servers.map((el) => {
      el.isLoading = false;
      el.isNetworkLoading = false;
      el.error = '';

      return el;
    });
  }

  handleServersLoading(false);

  return result;
});

// Servers store
const $servers = createStore({
  servers: [
    // {
    //     id: '',
    //     name: '',
    //     hv: '',
    //     state: '',
    //     status: '',
    //     cpu: '',
    //     isLoading: false,
    //     isNetworkLoading: false,
    //     error: ''
    // },
  ],
  isLoading: false,
  error: '',
})
    // events logic
    .on(handleServersLoading, (state, isLoading) => ({
      ...state, isLoading,
    }))
    .on(handleServerLoading, (state, index) => {
      const newState = {...state};
      newState.servers[index].isLoading = !newState.servers[index].isLoading;

      return newState;
    })

    .on(handleServerNetworkLoading, (state, index) => {
      const server = {...state.servers[index]};
      server.isNetworkLoading = !server.isNetworkLoading;

      return {
        ...state, servers: [...state.servers.slice(0, index), server, ...state.servers.slice(index + 1)],
      };
    })
    .on(handleSetState, (state, server) => {
      const s = {...state.servers[server.index]};
      s.state = server.state;

      return {
        ...state, servers: [...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1)],
      };
    })
    .on(handleSetNetwork, (state, server) => {
      const s = {...state.servers[server.index]};
      s.network = server.network;
      return {
        ...state, servers: [...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1)],
      };
    })
    .on(handleSetError, (state, server) => {
      const s = {...state.servers[server.index]};
      s.error = server.error;

      return {
        ...state, servers: [...state.servers.slice(0, server.index), s, ...state.servers.slice(server.index + 1)],
      };
    })
    .on(handleServersError, (state, error) => ({
      ...state, error,
    }))
    // effects logic
    .on(handleGetServers.doneData, (state, servers) => ({
      ...state, servers,
    }));

// Import name of the store
export const useServersStore = () => useStore($servers);
