import React from 'react';
import ReactDOM from 'react-dom';

import FileEdit from '../views/FileEdit.jsx';
import FileList from '../views/FileList.jsx';

import ATypes from '../stores/ATypes.js';
import Exercise from '../stores/Exercise.js';

export default class FileView extends React.Component {
  constructor(props) {
    super(props);

    var handlers = [
      'handleCreate',
      'handleOpen',
      'handleRemove',
      'handleClose',
      'handleRename',
      'handleSave'
    ];


    handlers.forEach((key) => {
      this[key] = this[key].bind(this);
    });
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.props.store.subscribe(() => { this.forceUpdate(); })
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }

  handleCreate() {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.open,
      name: '',
      data: new Exercise(null, null, null)
    });
  }

  handleOpen(name) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.open,
      name
    });
  }

  handleRemove(name) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.remove,
      name
    });
  }

  handleClose() {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.close
    });
  }

  handleRename(name) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.rename,
      oldName: store.getState().current(),
      newName: name
    });
  }

  handleSave(data) {
    var store = this.props.store;
    store.dispatch({
      type: ATypes.save,
      name: store.getState().current(),
      data
    });
  }

  render() {
    var state = this.props.store.getState();
    if(state.current() === null) {
      return (
        <FileList
          files={state.files().filter((file) => file.trim() !== '')}

          onCreate={this.handleCreate}
          onOpen={this.handleOpen}
          onRemove={this.handleRemove}/>
      );
    } else {
      return (
        <FileEdit
          fileName={state.current()}
          file={state.file(state.current())}

          onClose={this.handleClose}
          onSave={this.handleSave}
          onRename={this.handleRename}/>
      );
    }
  }
}
