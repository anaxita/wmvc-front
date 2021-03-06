import { createStore, createEvent, createEffect } from 'effector';
import { useStore } from 'effector-react';
import { handleFetch } from '../Fetch/store';
import { handleAddNewUser, handleModalShow } from '../Users/store';

export const handleSetLoading = createEvent();
export const handleSetError = createEvent();
export const handleChangeUser = createEvent();

const $modalStore = createStore({
  id: '',
  role: 0,
  name: '',
  company: '',
  email: '',
  password: '',
  isLoading: false,
  error: '',
});

export const handleAddUser = createEffect(() => {
  const curState = $modalStore.getState();
  handleFetch('POST', '/users', curState).then(({ data, err }) => {
    if (!err) {
      handleModalShow(false);
      handleAddNewUser({
        ...curState,
        id: data.id,
      });
      return data.id;
    }
    handleSetError(err);
    return '';
  });
});

const onChangeUser = (state, { field, value }) => {
  const newState = { ...state };
  newState[field] = value;
  return newState;
};

$modalStore
  .on(handleChangeUser, onChangeUser)
  .on(handleAddUser.doneData, (state, id) => ({ ...state, id }))
  .on(handleSetError, (state, error) => ({
    ...state, error,
  }));

export const useModalsAddUserStore = () => useStore($modalStore);
