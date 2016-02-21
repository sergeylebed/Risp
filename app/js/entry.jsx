import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Sammy from 'sammy';

import React from 'react';
import ReactDOM from 'react-dom';

import Shared from '../views/Shared.jsx'
import FileView from '../views/FileView.jsx';
import Welcome from '../views/Welcome.jsx';
import FileRun from '../views/FileRun.jsx';
import Test from '../views/Test.jsx';

import ExerciseStore from '../stores/ExerciseStore.js';

Sammy('#content', function() {
  var element = this.$element()[0];

  this.get('#/Welcome', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <Welcome />
      </Shared>,
      element
    )
  });

  this.get('#/View', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <FileView store={ExerciseStore} />
      </Shared>,
      element
    );
  });

  this.get('#/Run', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <FileRun store={ExerciseStore} />
      </Shared>,
      element
    );
  });

  this.get('#/Test', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <Test store={ExerciseStore} />
      </Shared>,
      element
    );
  });


  this.get('', (context) => {
    context.redirect('#/Welcome');
  });
}).run();
