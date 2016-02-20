import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Sammy from 'sammy';
import React from 'react';
import ReactDOM from 'react-dom';

import FileEdit from '../views/FileEdit.jsx';
import FileList from '../views/FileList.jsx';
import FileRun from '../views/FileRun.jsx';
import Welcome from '../views/Welcome.jsx';
import Shared from '../views/Shared.jsx';

import { ActionTypes, ExerciseStore } from '../stores/ExerciseStore.js';

function canSave({ fileName, file }) {
  var saved = ExerciseStore.getState()[fileName];

  if(!saved) return true;
  if(saved.restTime != file.restTime) return true;
  if(saved.repeat != file.repeat) return true;
  if(saved.phases.length != file.phases.length) return true;
  if(saved.phases.every((v, i) => v !== file.phases[i])) return true;

  return false;
}

function save({ fileName, file }) {
  ExerciseStore.dispatch({
    type: ActionTypes.save,
    name: fileName,
    data: file
  })
}

Sammy('#content', function() {
  const render = (reactElement, context) => {
    ReactDOM.render(
      <Shared store={ExerciseStore} context={context}>
        {
          reactElement
        }
      </Shared>,
      this.$element()[0]
    );
  };

  const renderEdit = (id, context) => {
    var file = ExerciseStore.getState()[id];
    render(
      <FileEdit
        fileName={id}
        file={file}
        canSave={canSave}
        onSave={save}/>,
      context
    );
  };

  this.get('#/Welcome', (context) => {
    render(<Welcome />, context);
  });
  this.get('#/Edit/:id', (context) => {
    renderEdit(context.params.id, context);
  });
  this.get('#/Edit', (context) => {
    renderEdit('', context);
  });
  this.get('#/List', (context) => {
    render(<FileList files={Object.keys(ExerciseStore.getState())}/>, context);
  });

  this.get('#/Run/:id', (context) => {
    var id = context.params.id;
  });

  this.get('', (context) => {
    context.redirect('#/Welcome');
  });
}).run();
