export class Exercise {
  constructor(restTime, phases, repeat) {
    this._restTime = restTime;
    this._phases = phases;
    this._repeat = repeat;
  }

  restTime(value) {
    if(value !== undefined) {
      return new Exercise(value, this._phases, this._repeat);
    }
    else {
      return this._restTime;
    }
  }

  phases(value) {
    if(value !== undefined) {
      return new Exercise(this._restTime, value, this._repeat);
    } else {
      return this._phases;
    }
  }

  repeat(value) {
    if(value !== undefined) {
      return new Exercise(this._restTime, this._phases, value);
    } else {
      return this._repeat;
    }
  }

  valid() {
    return this._restTime !== null &&
    this._phases !== null &&
    this._repeat !== null &&
    this._phases.every((ph) => !isNaN(ph));
  }

  equals(b) {
    if(this._restTime != b._restTime) return false;
    if(this._repeat != b._repeat) return false;
    if(this._phases === null || b._phases === null) {
      return this._phases === b._phases;
    }
    if(this._phases.length !== b._phases.length) return false;
    return this._phases.every((v, i) => v === b._phases[i]);
  }

  toObject() {
    return {
      restTime: this._restTime,
      repeat: this._repeat,
      phases: this._phases
    };
  }

  static fromObject(obj) {
    return new Exercise(obj.restTime, obj.phases, obj.repeat);
  }
}

export const ActionTypes = {
  save: 'ADD',
  remove: 'REMOVE',
  load: 'LOAD',
  rename: 'RENAME'
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

    case ActionTypes.rename:
      var tempState = Object.assign({}, state);
      delete tempState[action.oldName];
      tempState[action.name] = action.data;
      return tempState;

    default:
      console.error('Unknows action type: ' + action.type);
  }
}

import { createStore } from 'redux';

export var ExerciseStore = (() => {
  var store = createStore(ExerciseStoreReducer);

  if(localStorage.exerciseStore) {
    var rawData;
    try {
      rawData = JSON.parse(localStorage.exerciseStore);
    } catch(e) {
      rawData = {};
    }

    var data = Object.keys(rawData).reduce((acc, key) => {
      acc[key] = Exercise.fromObject(rawData[key]);
      return acc;
    }, {});

    store.dispatch({
      type: ActionTypes.load,
      data
    });
  }

  store.subscribe(() => {
    var data = store.getState();
    var rawData = Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key].toObject();
      return acc;
    }, {});

    localStorage.exerciseStore = JSON.stringify(rawData);
  });

  return store;
})();
