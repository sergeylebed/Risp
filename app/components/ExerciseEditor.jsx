import React from 'react';

import NumberPicker from '../components/NumberPicker.jsx';
import { Exercise, Phase } from '../js/Exercise.js';

const ExerciseEditor = ({
  exercise,
  maxPhases = 30,

  onStart,
  onChange,
}) => {

  function copy() {
    return new Exercise(
      exercise.name,
      exercise.phases,
      exercise.delaySec,
      exercise.count
    );
  }

  return (
    <div className='edit'>
      <div className='row edit-header'>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
        <div className='col-md-8 col-sm-10 col-xs-10'>
          <NumberPicker
            id='phase-selector'
            title='Select phases'

            value={exercise.phases && exercise.phases.length}
            options={[1, 2, 3, 4, 5]}
            dialogOptions={new Array(40).fill(1).map((_, i) => i + 1)}

            columns={5}

            onSelect={(value) => {
              var cp = copy();
              cp.setPhases(Math.min(maxPhases, value));
              onChange(cp);
            }} />
        </div>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
      </div>
      <div className='row edit-body'>
        <div className='col-md-2 col-sm-1 col-xs-1'>
          <div className='pull-right'>
            <NumberPicker
              className='pull-right'

              id='restTime-selector'
              title='Select restTime'

              value={exercise.delaySec}
              options={[1, 10, 20, 30]}
              dialogOptions={new Array(40).fill(1).map((_, i) => (i * 5 || 1))}

              columns={5}

              vertical

              onSelect={(value) => {
                var cp = copy();
                cp.delaySec = value;
                onChange(cp);
              }}/>
          </div>
        </div>
        <div className='col-md-8 col-sm-10 col-xs-10'>
          <ul className='list-group'>
            {
              exercise.phases.map((phase, id) => (
                <li className='list-group-item'>
                  <NumberPicker
                    id={'phase-selector-' + id}
                    title='Select phase'

                    value={phase.durationSec}
                    options={[1, 10, 20, 30]}
                    dialogOptions={new Array(40).fill(1).map((_, i) => (i * 5 || 1))}

                    columns={5}

                    onSelect={(value) => {
                      var cp = copy();
                      cp.phases = cp.phases.map((v, i) => i === id ? value : new Phase(i, value));
                      onChange(cp);
                    }}/>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='col-md-2 col-sm-1 col-xs-1'>
          <div className='pull-left'>
            <NumberPicker
              id='repeat-selector'
              title='Select repeat'

              value={exercise.count}
              options={[0, 10, 20, 30]}
              dialogOptions={new Array(40).fill(1).map((_, i) => (i * 10 || 1))}

              columns={5}

              vertical

              onSelect={(value) => {
                var cp = copy();
                cp.count = value;
                onChange(cp);
              }}/>
          </div>
        </div>
      </div>
      <div className='row edit-footer'>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
        <div className='col-md-8 col-sm-10 col-xs-10'>
          <button
            className='btn btn-default btn-lg btn-success'
            onClick={onStart}>
            Start
          </button>
        </div>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
      </div>
    </div>
  );
};

export default ExerciseEditor;
