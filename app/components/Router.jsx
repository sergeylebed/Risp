import React from 'react';

import FileEdit from '../views/FileEdit.jsx';
import FileList from '../views/FileList.jsx';
import FileRun from '../views/FileRun.jsx';
import Welcome from '../views/Welcome.jsx';
import Shared from '../views/Shared.jsx';
import Test from '../views/Test.jsx';

export default class Router extends React.Component {
  //{ store, onSave, canSave, onRemove }
  constructor(props) {
    super(props);

    props.store.subscribe(() => this.forceUpdate());

    this.state = {
      path: '',
      data: {}
    }

    this.redirect = this.redirect.bind(this);
  }

  redirect(path, data) {
    this.setState(() => {
      return {
        path,
        data: data || {}
      };
    });
  }

  render() {
    var context = {
      redirect: this.redirect,
      data: this.state.data
    };

    switch(this.state.path) {
      case '#/Edit':
        return (
          <Shared context={context}>
            <FileEdit
              fileName={context.data.id}
              file={this.props.store.getState()[context.data.id]}
              canSave={this.props.canSave}
              onSave={this.props.onSave}/>
          </Shared>
        );

      case '#/List':
        return (
          <Shared context={context}>
            <FileList
              files={Object.keys(this.props.store.getState())}
              onRemove={this.props.onRemove}/>
          </Shared>
        );

      case '#/Run':
        return (
          <Shared context={context}>
          </Shared>
        );

      case '#/Test':
        return (
          <Shared context={context}>
            <Test
              fileName={context.data.id}
              file={this.props.store.getState()[context.data.id]}
            />
          </Shared>
        );

      case '#/Welcome':
      default:
        return (
          <Shared context={context}>
            <Welcome />
          </Shared>
        );
    }
  }
}
