import Sammy from 'sammy';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Shared from '../views/Shared.jsx'
import Welcome from '../views/Welcome.jsx';
import Runner from '../views/FileRun.jsx';

import Test from '../views/Test.jsx';
import Test2 from '../views/Test2.jsx';
import Test3 from '../views/Test3.jsx';
import SoundTest from '../views/SoundTest.jsx';
import Editor from '../views/Editor.jsx';

import ExerciseStore from '../stores/ExerciseStore.js';

import Store from '../store/RispStore.js';

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

  this.get('#/Run', (context) => {

    var phases = [
        new Phase(0, 4),
        new Phase(1, 2),
        new Phase(2, 3),
        new Phase(3, 5)
    ];

    var exercise = new Exercise('test name', phases, 5, 2);
    ReactDOM.render(
    <Provider store={Store}>
      <Shared context={context}>
        <Runner exercise={exercise} />
      </Shared>
    </Provider>,
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

  this.get('#/Test3', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <Test3 />
      </Shared>,
      element
    );
  });

  this.get('#/Editor', (context) => {
    ReactDOM.render(
      <Provider store={Store}>
        <Shared context={context}>
          <Editor />
        </Shared>
      </Provider>,
      element
    );
  });

  this.get('#/SoundTest', (context) => {
    ReactDOM.render(
      <Shared context={context}>
        <SoundTest />
      </Shared>,
      element
    );
  });

  this.get('', (context) => {
    context.redirect('#/Welcome');
  });
}).run();
