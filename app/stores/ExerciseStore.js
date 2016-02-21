import Exercise from './Exercise.js';
import FilesModel from './FilesModel.js';
import ATypes from './ATypes.js';

class FileModel {
  constructor(current, rename) {
    this._current = current;
    this._rename = rename;
  }

  rename(name) {
    if(name === undefined) {
      return this._rename;
    } else {
      return new FileModel(this._current, name);
    }
  }

  current() {
    return this._current;
  }
}

class StoreModel {
  constructor(files, file) {
    this._files = files;
    this._file = file;
  }

  _mode() {
    if(this._file !== null) return 'open';
    return 'list';
  }

  files() {
    return this._files;
  }

  currentName() {
    return this._file;
  }

  currentFile() {
    return this._files.file(this._file.current());
  }

  // API here

  New() {
    if(this._mode() !== 'list') return this;

    return new StoreModel(
      this._files.file('', new Exercise(null, null, null)),
      new FileModel('', '')
    );
  }

  Open(name) {
    if(this._mode() !== 'list' || !this._files.exists(name)) return this;

    return new StoreModel(
      this._files,
      new FileModel(name, null)
    );
  }

  Delete(name) {
    if(this._mode() !== 'list') return this;

    return new StoreModel(
      this._files.remove(name),
      null
    );
  }

  Close() {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files,
      null
    );
  }

  Save(data) {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files.file(this._file.current(), data),
      this._file
    );
  }

  BeginRename() {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files,
      this._file.rename(this._file.current())
    );
  }

  Rename(name) {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files,
      this._file.rename(name)
    );
  }

  EndRename() {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files.rename(this._file.current(), this._file.rename()),
      new FileModel(this._file.rename(), null)
    );
  }
}

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
