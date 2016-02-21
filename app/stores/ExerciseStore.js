import Exercise from './Exercise.js';
import FilesModel from './FilesModel.js';
import ATypes from './ATypes.js';
import FileMode from './FileModel.js';
import StoreModel from './StoreModel.js';

function ExerciseStoreReducer(state, action) {
  if(!state) {
    if(localStorage.exerciseStore) {
      var rawData;
      try {
        rawData = JSON.parse(localStorage.exerciseStore);
      } catch(e) {
        rawData = {};
      }

      return new StoreModel(
        FilesModel.unconvert(obj => Exercise.fromRaw(obj), rawData),
        null
      );
    } else {
      return new StoreModel(
        new FilesModel({}),
        null
      );
    }
  }

  console.log(action);

  switch(action.type) {
    case ATypes.new:
      return state.New();

    case ATypes.open:
      return state.Open(action.name);

    case ATypes.del:
      return state.Delete(action.name);

    case ATypes.close:
      return state.Close();

    case ATypes.save:
      return state.Save(action.data);

    case ATypes.beginRename:
      return state.BeginRename();

    case ATypes.rename:
      return state.Rename(action.name);

    case ATypes.endRename:
      return state.EndRename();

    default:
      console.error('Unknown action type: ' + action.type);
  }
}

import { createStore } from 'redux';

const ExerciseStore = (() => {
  var store = createStore(ExerciseStoreReducer);

  store.subscribe(() => {
    localStorage.exerciseStore = JSON.stringify(
      store.getState().files().convert(obj => obj.toRaw()));
  });

  store.subscribe(() => {
    console.log(require('util').inspect(store.getState(), { depth: null }));
  });

  return store;
})();
export default ExerciseStore;
