import { createStore } from 'redux';
import { rispReducer } from './reducers';

const ExerciseStore = (() => {
  var store = createStore(rispReducer);

  store.subscribe(() => {
    localStorage.exerciseStore = JSON.stringify(store.getState());
  });

  store.subscribe(() => {
    console.log(require('util').inspect(store.getState(), { depth: null }));
  });

  return store;
})();

export default ExerciseStore;
