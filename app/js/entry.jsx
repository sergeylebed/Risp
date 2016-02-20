import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';

import Router from '../components/Router.jsx';

import { ActionTypes, ExerciseStore } from '../stores/ExerciseStore.js';

function canSave({ fileName, file }) {
  fileName = fileName.trim()
  if(fileName === '') return false;

  var saved = ExerciseStore.getState()[fileName];

  if(!saved) return true;
  if(!saved.equals(file)) return true;

  return false;
}

function save({ fileName, file }) {
  ExerciseStore.dispatch({
    type: ActionTypes.save,
    name: fileName,
    data: file
  });
}

function remove({ fileName }) {
  ExerciseStore.dispatch({
    type: ActionTypes.remove,
    name: fileName
  });
}

ReactDOM.render(
  <Router
    store={ExerciseStore}
    canSave={canSave}
    onSave={save}
    onRemove={remove}/>,
  document.getElementById('content')
);
