import Sammy from 'sammy';
import React from 'react';
import ReactDOM from 'react-dom';

import { FileEdit } from '../views/FileEdit.jsx';
import { FileList } from '../views/FileEdit.jsx';
import { FileRun } from '../views/FileRun.jsx';
import { Welcome } from '../views/Welcome.jsx';

Sammy('#content', function() {
  const element = this.$element()[0];

  this.get('#/Welcome', (context) => {
    ReactDOM.render(
      <Welcome redirect={context.redirect.bind(context)}/>,
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
