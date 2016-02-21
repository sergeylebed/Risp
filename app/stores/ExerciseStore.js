import Exercise from './Exercise.js';
import Model from './Model.js';
import ATypes from './ATypes.js';

function ExerciseStoreReducer(state, action) {
  if(!state) {
    if(localStorage.exerciseStore) {
      var rawData;
      try {
        rawData = JSON.parse(localStorage.exerciseStore);
      } catch(e) {
        rawData = {};
      }

      return Model.unconvert(obj => Exercise.fromRaw(obj), rawData);
    } else {
      return new Model(null, {});
    }
  }

  // console.log(action);

  switch(action.type) {
    case ATypes.open:
      return state.open(action.name, action.data);

    case ATypes.close:
      return state.close();

    case ATypes.save:
      return state.file(action.name, action.data);

    case ATypes.rename:
      return state.rename(action.oldName, action.newName);

    case ATypes.remove:
      return state.remove(action.name);

    default:
      console.error('Unknown action type: ' + action.type);
  }
}

import { createStore } from 'redux';

const ExerciseStore = (() => {
  var store = createStore(ExerciseStoreReducer);

  store.subscribe(() => {
    localStorage.exerciseStore = JSON.stringify(store.getState().convert(obj => obj.toRaw()));
  });

  // store.subscribe(() => {
  //   console.log(require('util').inspect(store.getState(), { depth: null }));
  // });

  return store;
})();
export default ExerciseStore;
