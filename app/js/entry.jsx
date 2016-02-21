import Sammy from 'sammy';

import React from 'react';
import ReactDOM from 'react-dom';

import Shared from '../views/Shared.jsx'
import FileView from '../views/FileView.jsx';
import Welcome from '../views/Welcome.jsx';
import FileRun from '../views/FileRun.jsx';

import Test from '../views/Test.jsx';
import Test2 from '../views/Test2.jsx';

import ExerciseStore from '../stores/ExerciseStore.js';

import { Exercise, Phase } from '../js/Exercise';

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

    var phases = [
        new Phase(0, 4),
        new Phase(1, 2),
        new Phase(2, 3),
        new Phase(3, 5)
    ];
    var exercise = new Exercise('test name', phases, 5, 2);     
    ReactDOM.render(        
      <Shared context={context}>
        <FileRun store={ExerciseStore} exercise={exercise} />
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

  this.get('#/Test2', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <Test2 />
      </Shared>,
      element
    );
  })


  this.get('', (context) => {
    context.redirect('#/Welcome');
  });
}).run();
