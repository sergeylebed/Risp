import React from 'react';

import NumberPicker from '../components/NumberPicker.jsx';

export default class FileEdit extends React.Component {
  // { fileName, file, onSave, hasChanged, onRun }
  constructor(props) {
    super(props);

    this.state = {
      fileName: props.fileName,
      file: props.file || {
        restTime: null,
        phases: null,
        repeat: null
      },
    };

    var handlers = [
      'handleNameChange',
      'handlePhasesSelect',
      'handleRestSelect',
      'handleRepeatSelect',
      'handlePhaseSelect',
      'validFile'
    ];

    handlers.forEach((key) => {
      this[key] = this[key].bind(this);
    });
  }

  handleNameChange(text) {
    this.setState((state) => {
      return Object.assign({}, state, { fileName: text });
    });
  }

  handlePhasesSelect(value) {
    this.setState((state) => {
      var ph = (this.state.file.phases || []).slice(0, value);
      if(ph.length < value) {
        ph = [...ph, ...new Array(value - ph.length)];
      }

      return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
          phases: ph
        })
      });
    });
  }

  handleRestSelect(value) {
    this.setState((state) => {
      return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
          restTime: value
        })
      });
    });
  }

  handleRepeatSelect(value) {
    this.setState((state) => {
      return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
          repeat: value
        })
      });
    });
  }

  handlePhaseSelect(value, id) {
    this.setState((state) => {
      return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
          phases: state.file.phases.map((v, i) => i === id ? value : v)
        })
      });
    });
  }

  validFile() {
    var { restTime, phases, repeat } = this.state.file;

    return restTime &&
    phases &&
    repeat &&
    phases.every((v) => v);
  }

  render() {
    var context = this.props.context;
    var { restTime, phases, repeat } = this.state.file;

    var canSave = this.state.fileName.trim() !== '' &&
    this.validFile() &&
    this.props.canSave({
      fileName: this.state.fileName,
      file: this.state.file
    });

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
            <div className='input-group input-group-lg'>
              <input
                className='form-control'
                type='text'
                placeholder='Exercise name'
                value={this.state.fileName}
                onChange={(e) => this.handleNameChange(e.target.value)}/>
              <span className='input-group-btn'>
                <button
                  disabled={!canSave}
                  className='btn btn-default btn-success'
                  onClick={() => this.props.onSave({ fileName: this.state.fileName, file: this.state.file })}>
                  Save
                </button>
              </span>
            </div>
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
              value={phases && phases.length}
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
              value={restTime}
              onSelect={this.handleRestSelect}/>
          </div>
          <div className='col-md-8 col-sm-10 col-xs-10'>
            <ul className='list-group'>
              {
                (this.state.file.phases || []).map((phase, id) => (
                  <li className='list-group-item'>
                    <NumberPicker
                      begin={1}
                      step={1}
                      number={5}
                      value={phases[id]}
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
              value={repeat}
              onSelect={this.handleRepeatSelect}/>
          </div>
        </div>
        <div className='row edit-footer'>
          <div className='col-md-2 col-sm-1 col-xs-1'></div>
          <div className='col-md-8 col-sm-10 col-xs-10'>
            <button className='btn btn-default btn-lg btn-success' disabled={!this.validFile()}>Start</button>
          </div>
          <div className='col-md-2 col-sm-1 col-xs-1'></div>
        </div>
      </div>
    );
  }
}
