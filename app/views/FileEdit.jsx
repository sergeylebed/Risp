import React from 'react';

import HorizontalPicker from '../components/HorizontalPicker.jsx';

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
      }
    };

    var handlers = [
      'handleNameChange'
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

  render() {
    return (
      <div>
        <div className='row edit-title'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <div className='input-group'>
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
            <HorizontalPicker
              begin={1}
              step={1}
              number={4}/>
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row edit-body'>
          <div className='col-md-2'></div>
          <div className='col-md-8'></div>
          <div className='col-md-2'></div>
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
