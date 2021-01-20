import { createStore } from 'redux';

const initialState = {
  days: [],
  freeDays: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, days: action.payload };
    case 'DELETE_DAY':
      return { ...state, days: action.payload };
    case 'SET_FREE_DAYS':
      return { ...state, freeDays: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
