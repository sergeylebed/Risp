import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';

import Router from '../components/Router.jsx';

import { ActionTypes, ExerciseStore } from '../stores/ExerciseStore.js';

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

function rename({ oldName, name, data }) {
  ExerciseStore.dispatch({
    type: ActionTypes.rename,
    name,
    oldName,
    data
  });
}

ReactDOM.render(
  <Router
    store={ExerciseStore}
    onSave={save}
    onRemove={remove}
    onRename={rename}/>,
  document.getElementById('content')
);
