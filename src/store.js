import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';

export const handleGlobalRedirect = createEvent();

const $servers = createStore({
  isRedirect: false,

})
  .on(handleGlobalRedirect, (state, isRedirect) => ({ ...state, isRedirect }));

export const useGlobalRedirect = () => useStore($servers);
