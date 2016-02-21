import React from 'react';
import ReactDOM from 'react-dom';

import EditView from '../views/EditView.jsx';
import ListView from '../views/ListView.jsx';

import ATypes from '../stores/ATypes.js';
import Exercise from '../stores/Exercise.js';

export default class FileView extends React.Component {
  // { store }
  constructor(props) {
    super(props);

    var handlers = [
      'handleNew',
      'handleOpen',
      'handleDelete',

      'handleClose',
      'handleSave',

      'handleBeginRename',
      'handleRename',
      'handleEndRename'
    ];


    handlers.forEach((key) => {
      this[key] = this[key].bind(this);
    });

    this.props.store.subscribe(() => this.forceUpdate());
  }

  handleNew() {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.new
    });
  }

  handleOpen(name) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.open,
      name
    });
  }

  handleDelete(name) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.del,
      name
    });
  }

  handleClose() {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.close
    });
  }

  handleSave(data) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.save,
      data
    });
  }

  handleBeginRename() {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.beginRename
    });
  }

  handleRename(name) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.rename,
      name
    });
  }

  handleEndRename() {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.endRename
    });
  }

  render() {
    var state = this.props.store.getState();
    switch(state._mode()) {
      case 'list':
        return (
          <ListView
            files={state.files().files()}

            onCreate={this.handleNew}
            onOpen={this.handleOpen}
            onRemove={this.handleDelete}/>
        );

      case 'open':
        return (
          <EditView
            name={state.currentName()}
            file={state.currentFile()}

            onClose={this.handleClose}
            onSave={this.handleSave}
            onBeginRename={this.handleBeginRename}
            onRename={this.handleRename}
            onEndRename={this.handleEndRename}

            onStart={() => console.log('starting...')}/>
        );
    }
  }
}
