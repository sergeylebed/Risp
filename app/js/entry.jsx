import Sammy from 'sammy';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Welcome from '../views/Welcome.jsx';
import Runner from '../views/FileRun.jsx';
import About from '../views/About.jsx';

import ExerciseEditor from '../components/ExerciseEditor.jsx';
import SoundTest from '../views/SoundTest.jsx';

import Store from '../store/rispStore.js';
import { Exercise, Phase } from '../js/Exercise';

import Test from '../views/Test.jsx';
import Test2 from '../views/Test2.jsx';
import Test3 from '../views/Test3.jsx';


Sammy('#content', function() {
  var element = this.$element()[0];

  this.get('#/Welcome', (context) => {
    ReactDOM.render(<Welcome context = {context} />, element);
  });

  this.get('#/Runner', (context) => {

    ReactDOM.render(
    <Provider store={Store}>
        <Runner/>
    </Provider>,
      element
    );
  });

  this.get('#/Editor', (context) => {
    ReactDOM.render(
      <Provider store={Store}>
        <ExerciseEditor />
      </Provider>,
      element
    );
  });

  this.get('#/About', (context) => {
    ReactDOM.render(<About/>, element);
  });

  this.get('#/Test3', (context) => {
    ReactDOM.render(
        <Test3 />,
      element
    );
  });

  this.get('#/SoundTest', (context) => {
    ReactDOM.render(<SoundTest />, element);
  });

  this.get('', (context) => {
    context.redirect('#/Welcome');
  });
}).run();
