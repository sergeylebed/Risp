import React from 'react';

import NumberPicker from '../components/NumberPicker.jsx';
import { Exercise } from '../stores/ExerciseStore.js';

export default class FileEdit extends React.Component {
  // { fileName, file, onClose, onSave, onRename }
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      editing: false
    };

    var handlers = [
      'handleNameChange',
      'handlePhasesSelect',
      'handleRestSelect',
      'handleRepeatSelect',
      'handlePhaseSelect',
      'handleRename',
      'handleRenameToggle',
      'handleClose'
    ];

    handlers.forEach((key) => {
      this[key] = this[key].bind(this);
    });
  }

  handleNameChange(text) {
    this.setState((state, props) => {
      return Object.assign({}, state, { name: text });
    });
  }

  handlePhasesSelect(value) {
    this.props.onSave(this.props.file.phases(value));
  }

  handleRestSelect(value) {
    this.props.onSave(this.props.file.restTime(value));
  }

  handleRepeatSelect(value) {
    this.props.onSave(this.props.file.repeat(value));
  }

  handlePhaseSelect(id, value) {
    this.props.onSave(this.props.file.phase(id, value));
  }

  handleRename() {
    this.props.onRename(this.state.name);
    this.setState((state) => {
      return {
        name: null,
        editing: false
      };
    });
  }

  handleRenameToggle() {
    this.setState((state, props) => {
      return {
        name: props.fileName || '',
        editing: true
      };
    });
  }

  handleClose() {
    this.props.onClose();
    this.setState((state, props) => {
      return {
        name: null,
        editing: false
      }
    });
  }

  render() {
    var context = this.props.context;

    var { fileName, file } = this.props;
    var { name, editing } = this.state;

    var Menu;

    if(this.state.editing || fileName === ''){
      Menu = (
        <div className='input-group input-group-lg'>
          <input
            className='form-control'
            type='text'
            placeholder='Exercise name'
            value={name || ''}
            onChange={(e) => this.handleNameChange(e.target.value)}/>
          <span className='input-group-btn'>
            <button
              disabled={(name || '').trim() === '' || name === fileName}
              className='btn btn-default btn-success'
              onClick={this.handleRename}>
              Save
            </button>
          </span>
        </div>
      );
    } else {
      Menu = (
        <div className='btn-group btn-group-lg edit-saved'>
          <button className='btn btn-default'
            onClick={this.handleRenameToggle}>
            {
              fileName
            }
          </button>
        </div>
      );
    }

    return (
      <div className='edit'>
        <div className='row edit-title'>
          <div className='col-md-2 col-sm-1 col-xs-1'>
            <button className='btn btn-default btn-lg pull-right'
              onClick={this.handleClose}>
              <span className='glyphicon glyphicon-align-justify' />
            </button>
          </div>
          <div className='col-md-8 col-sm-10 col-xs-10'>
            {
              Menu
            }
          </div>
          <div className='col-md-2 col-sm-1 col-xs-1'></div>
        </div>
        <div className='row edit-header'>
          <div className='col-md-2 col-sm-1 col-xs-1'></div>
          <div className='col-md-8 col-sm-10 col-xs-10'>
            <NumberPicker
              begin={1}
              step={1}
              number={5}
              value={file.phases() && file.phases().length}
              onSelect={this.handlePhasesSelect}/>
          </div>
          <div className='col-md-2 col-sm-1 col-xs-1'></div>
        </div>
        <div className='row edit-body'>
          <div className='col-md-2 col-sm-1 col-xs-1'>
            <NumberPicker
              className='pull-right'
              vertical
              begin={0}
              step={5}
              number={5}
              value={file.restTime()}
              onSelect={this.handleRestSelect}/>
          </div>
          <div className='col-md-8 col-sm-10 col-xs-10'>
            <ul className='list-group'>
              {
                (file.phases() || []).map((phase, id) => (
                  <li className='list-group-item'>
                    <NumberPicker
                      begin={1}
                      step={1}
                      number={5}
                      value={file.phases()[id]}
                      onSelect={(value) => this.handlePhaseSelect(id, value)}/>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='col-md-2 col-sm-1 col-xs-1'>
            <NumberPicker
              className='pull-left'
              vertical
              first
              begin={0}
              step={5}
              number={5}
              value={file.repeat()}
              onSelect={this.handleRepeatSelect}/>
          </div>
        </div>
        <div className='row edit-footer'>
          <div className='col-md-2 col-sm-1 col-xs-1'></div>
          <div className='col-md-8 col-sm-10 col-xs-10'>
            <button
              className='btn btn-default btn-lg btn-success'
              onClick={(e) => { e.preventDefault(); context.redirect('#/Test', { id: this.state.fileName }); }}
              disabled={!file.valid()}>Start</button>
          </div>
          <div className='col-md-2 col-sm-1 col-xs-1'></div>
        </div>
      </div>
    );
  }
}
