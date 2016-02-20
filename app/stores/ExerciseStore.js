export const ActionTypes = {
  save: 'ADD',
  remove: 'REMOVE',
  load: 'LOAD'
};

function ExerciseStoreReducer(state, action) {
  if(!state) {
      return { };
  }

  switch(action.type) {
    case ActionTypes.load:
      return action.data;

    case ActionTypes.save:
      return Object.assign({}, state, { [action.name]: action.data });

    case ActionTypes.remove:
      var temp = Object.assign({}, state);
      delete temp[action.name];
      return temp;

    default:
      console.error('Unknows action type: ' + action.type);
  }
}

import { createStore } from 'redux';

export var ExerciseStore = (() => {
  var store = createStore(ExerciseStoreReducer);

  if(localStorage.exerciseStore) {
    store.dispatch({
      type: ActionTypes.load,
      data: localStorage.exerciseStore
    });
  }

  store.subscribe(() => {
    localStorage.exerciseStore = store.getState();
  });

  return store;
})();
