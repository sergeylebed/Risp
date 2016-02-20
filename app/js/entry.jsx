import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Sammy from 'sammy';
import React from 'react';
import ReactDOM from 'react-dom';

import FileEdit from '../views/FileEdit.jsx';
import FileList from '../views/FileEdit.jsx';
import FileRun from '../views/FileRun.jsx';
import Welcome from '../views/Welcome.jsx';
import Shared from '../views/Shared.jsx';

import { ActionTypes, ExerciseStore } from '../stores/ExerciseStore.js';

Sammy('#content', function() {
  const element = this.$element()[0];

  this.get('#/Welcome', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <Welcome />
      </Shared>,
      element
    );
  });

  this.get('#/Edit', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <FileEdit
          fileName=''
          file={null}/>
      </Shared>,
      element
    );
  });

  this.get('#/Edit/:id', (context) => {
    var id = context.params.id;
  });

  this.get('#/Run/:id', (context) => {
    var id = context.params.id;
  });

  this.get('', (context) => {
    context.redirect('#/Welcome');
  });
}).run();
