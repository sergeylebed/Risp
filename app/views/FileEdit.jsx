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
      restTimeId: -1,
      phasesId: -1,
      repeatId: -1
    };

    var handlers = [
      'handleNameChange',
      'handlePhasesSelect',
      'handleRestSelect',
      'handleRepeatSelect'
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

  handlePhasesSelect(value, id) {
    this.setState((state) => {
      var ph = (this.state.file.phases || []).slice(0, value);
      if(ph.length < value) {
        ph = [...ph, ...new Array(value - ph.length)];
      }

      return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
          phases: ph
        }),
        phasesId: id
      });
    });
  }

  handleRestSelect(value, id) {
    this.setState((state) => {
      return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
          restTime: value
        }),
        restTimeId: id
      });
    });
  }

  handleRepeatSelect(value, id) {
    this.setState((state) => {
      return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
          repeat: value
        }),
        repeatId: id
      });
    });
  }

  render() {
    return (
      <div className='edit'>
        <div className='row edit-title'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <div className='input-group input-group-lg'>
              <input
                className='form-control'
                type='text'
                placeholder='Exercise name'
                value={this.state.fileName}
                onChange={(e) => this.handleNameChange(e.target.value)}/>
              <span className='input-group-btn'>
                <button
                  className='btn btn-default'
                  onClick={() => this.props.onSave(this.state)}>
                  Save
                </button>
              </span>
            </div>
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row edit-header'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <NumberPicker
              begin={1}
              step={1}
              number={5}
              selectedId={this.state.phasesId}
              onSelect={this.handlePhasesSelect}/>
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row edit-body'>
          <div className='col-md-2'>
            <NumberPicker
              className='pull-left'
              vertical
              begin={1}
              step={1}
              number={5}
              selectedId={this.state.restTimeId}
              onSelect={this.handleRestSelect}/>
          </div>
          <div className='col-md-8'></div>
          <div className='col-md-2'>
            <NumberPicker
              className='pull-right'
              vertical
              begin={1}
              step={1}
              number={5}
              selectedId={this.state.repeatId}
              onSelect={this.handleRepeatSelect}/>
          </div>
        </div>
        <div className='row edit-footer'>
          <div className='col-md-2'></div>
          <div className='col-md-8'></div>
          <div className='col-md-2'></div>
        </div>
      </div>
    );
  }
}
