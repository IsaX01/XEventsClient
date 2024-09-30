// store.js
import { createStore } from 'redux';

const initialState = {
  user: null,
  token: '',
  categories: [],
  places: [],
  reservations: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload.categories,
      };
    case 'SET_PLACES':
      return {
        ...state,
        places: action.payload.places,
      };

    default:
      return state;
  }
}

export const store = createStore(reducer);
