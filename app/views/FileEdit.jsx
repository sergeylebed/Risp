import React from 'react';

import NumberPicker from '../components/NumberPicker.jsx';
import { Exercise } from '../stores/ExerciseStore.js';

export default class FileEdit extends React.Component {
  // { fileName, file, onSave, onRename, onRun }
  constructor(props) {
    super(props);

    this.state = {
      fileName: props.fileName || '',
      file: props.file || new Exercise(null, null, null),
      savedName: props.fileName,
      renaming: props.file === undefined
    };

    var handlers = [
      'handleNameChange',
      'handlePhasesSelect',
      'handleRestSelect',
      'handleRepeatSelect',
      'handlePhaseSelect',
      'handleSave',
      'handleRename'
    ];

    handlers.forEach((key) => {
      this[key] = this[key].bind(this);
    });
  }

  save(state, props) {
    if(state.savedName) {
      props.onSave(state);
    }

    return state;
  }

  handleNameChange(text) {
    this.setState((state, props) => {
      return Object.assign({}, state, { fileName: text });
    });
  }

  handlePhasesSelect(value) {
    this.setState((state, props) => {
      var ph = (state.file.phases() || []).slice(0, value);
      if(ph.length < value) {
        ph = [...ph, ...new Array(value - ph.length)];
      }

      return this.save(Object.assign({}, state, {
        file: state.file.phases(ph)
      }), props);
    });
  }

  handleRestSelect(value) {
    this.setState((state, props) => {
      return this.save(Object.assign({}, state, {
        file: state.file.restTime(value)
      }), props);
    });
  }

  handleRepeatSelect(value) {
    this.setState((state, props) => {
      return this.save(Object.assign({}, state, {
        file: state.file.repeat(value)
      }), props);
    });
  }

  handlePhaseSelect(value, id) {
    this.setState((state, props) => {
      return this.save(Object.assign({}, state, {
        file: state.file.phases(state.file.phases().map((v, i) => i === id ? value : v))
      }), props);
    });
  }

  handleSave() {
    this.setState((state, props) => {
      if(state.savedName) {
        props.onRename({ oldName: state.savedName, name: state.fileName, data: state.file });
      } else {
        props.onSave({ file: state.file, fileName: state.fileName });
      }

      return Object.assign({}, state, {
        renaming: false
      });
    });
  }

  handleRename() {
    this.setState((state, props) => {
      return Object.assign({}, state, {
        renaming: true
      });
    });
  }

  render() {
    var context = this.props.context;

    var { fileName, file } = this.state;

    var Menu;
    if(this.state.renaming){
      Menu = (
        <div className='input-group input-group-lg'>
          <input
            className='form-control'
            type='text'
            placeholder='Exercise name'
            value={fileName}
            onChange={(e) => this.handleNameChange(e.target.value)}/>
          <span className='input-group-btn'>
            <button
              disabled={fileName.trim() === ''}
              className='btn btn-default btn-success'
              onClick={this.handleSave}>
              Save
            </button>
          </span>
        </div>
      );
    } else {
      Menu = (
        <div className='btn-group btn-group-lg edit-saved'>
          <button className='btn btn-default'
            onClick={this.handleRename}>
            {
              this.state.fileName
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
              onClick={() => context.redirect('#/List')}>
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
                      onSelect={(value) => this.handlePhaseSelect(value, id)}/>
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
