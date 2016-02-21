import React from 'react';

import NumberPicker from '../components/NumberPicker.jsx';
import { Exercise } from '../stores/ExerciseStore.js';

const EditView = ({ name, file, onClose, onSave, onBeginRename, onRename, onEndRename, onStart }) => {
  var Menu;

  if(name.rename() !== null){
    Menu = (
      <div className='input-group input-group-lg'>
        <input
          className='form-control'
          type='text'
          placeholder='Exercise name'
          value={name.rename()}
          onChange={(e) => onRename(e.target.value)}/>
        <span className='input-group-btn'>
          <button
            disabled={name.rename().trim() === '' || name.rename() === name.current()}
            className='btn btn-default btn-success'
            onClick={onEndRename}>
            Save
          </button>
        </span>
      </div>
    );
  } else {
    Menu = (
      <div className='btn-group btn-group-lg edit-saved'>
        <button className='btn btn-default'
          onClick={onBeginRename}>
          {
            name.current()
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
            onClick={onClose}>
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
            onSelect={(value) => onSave(file.phases(value))}/>
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
            onSelect={(value) => onSave(file.restTime(value))}/>
        </div>
        <div className='col-md-8 col-sm-10 col-xs-10'>
          <ul className='list-group'>
            {
              (file.phases() || []).map((phase, id) => (
                <li className='list-group-item'>
                  <NumberPicker
                    key={id}
                    begin={1}
                    step={1}
                    number={5}
                    value={phase}
                    onSelect={(value) => onSave(file.phase(id, value))}/>
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
            onSelect={(value) => onSave(file.repeat(value))}/>
        </div>
      </div>
      <div className='row edit-footer'>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
        <div className='col-md-8 col-sm-10 col-xs-10'>
          <button
            className='btn btn-default btn-lg btn-success'
            onClick={onStart}
            disabled={!file.valid()}>Start</button>
        </div>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
      </div>
    </div>
  );
};

export default EditView;
