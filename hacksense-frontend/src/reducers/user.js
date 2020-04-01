import React, { createContext, useReducer } from 'react';

const initialState = {
  data: false,
  loading: true,
  error: false,
};

const StateUserContext = createContext();
const DispatchUserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'get_user':
      return {
        ...state,
        loading: true,
        data: false,
        error: false,
      }
    case 'get_user_success':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
      }
    case 'set_user_avatar':
      return {
        ...state,
        data: { ...state.data, avatar: action.payload},
      }
    case 'get_user_error':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'remove_user':
      return {
        ...state,
        loading: false,
        data: false,
        error: false,
      }
    default:
      throw new Error('No action type was given.');
  }
};

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateUserContext.Provider value={state}>
      <DispatchUserContext.Provider value={dispatch}>
        {props.children}
      </DispatchUserContext.Provider>
    </StateUserContext.Provider>
  );
};

export { UserProvider, StateUserContext, DispatchUserContext };