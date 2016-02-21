import React from 'react';

import NumberPickerBar from '../components/NumberPickerBar.jsx';

const ExerciseEditor = ({
  exercise,

  onDelayChange,// (value)
  onCountChange,// (value)
  onPhasesChange,// (value)
  onPhaseChange,// (id, value)

  onStart
}) => {

  const phasesOptions = [
    [1, 2, 3, 4, 5],
    new Array(40).fill(1).map((_, i) => i + 1)
  ];

  const delayOptions = [
    [1, 10, 20, 30],
    new Array(40).fill(1).map((_, i) => (i * 5 || 1))
  ];

  const phaseOptions = [
    [1, 10, 20, 30],
    new Array(40).fill(1).map((_, i) => (i * 5 || 1))
  ];

  const countOptions = [
    [0, 10, 20, 30],
    new Array(40).fill(1).map((_, i) => (i * 10 || 1))
  ];

  return (
    <div className='edit'>
      <div className='row edit-header'>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
        <div className='col-md-8 col-sm-10 col-xs-10'>
          <NumberPickerBar
            primaryIcon={
              <span>Phases</span>
            }
            secondaryIcon={
              <span className='glyphicon glyphicon-volume-off'></span>
            }

            id='phases-selector'
            title='Phases'

            value={exercise.phases && exercise.phases.length}
            options={phasesOptions[0]}
            dialogOptions={phasesOptions[1]}

            columns={5}

            onSelect={(value) => onPhasesChange(value)} />
        </div>
        <div className='col-md-2 col-sm-1 col-xs-1'></div>
      </div>
      <div className='row edit-body'>
        <div className='col-md-2 col-sm-1 col-xs-1'>
          <div className='pull-right'>
            <NumberPickerBar
              primaryIcon={
                <span>Delay</span>
              }
              secondaryIcon={
                <span className='glyphicon glyphicon-volume-off'></span>
              }

              className='pull-right'

              id='delay-selector'
              title='Delay'

              value={exercise.delaySec}
              options={delayOptions[0]}
              dialogOptions={delayOptions[1]}

              columns={5}

              vertical

              onSelect={(value) => onDelayChange(value)}/>
          </div>
        </div>
        <div className='col-md-8 col-sm-10 col-xs-10'>
          <ul className='list-group'>
            {
              exercise.phases.map((phase, id) => (
                <li className='list-group-item'>
                  <NumberPickerBar
                    secondaryIcon={
                      <span className='glyphicon glyphicon-volume-off'></span>
                    }

                    id={'phase-selector-' + id}
                    title='Phase duration'

                    value={phase.durationSec}
                    options={phaseOptions[0]}
                    dialogOptions={phaseOptions[1]}

                    columns={5}
                    right

                    onSelect={(value) => onPhaseChange(id, value)}/>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='col-md-2 col-sm-1 col-xs-1'>
          <div className='pull-left'>
            <NumberPickerBar
              primaryIcon={
                <span>Count</span>
              }
              secondaryIcon={
                <span className='glyphicon glyphicon-volume-off'></span>
              }

              id='count-selector'
              title='Count'

              value={exercise.count}
              options={countOptions[0]}
              dialogOptions={countOptions[1]}

              columns={5}

              vertical

              onSelect={(value) => onCountChange(value)}/>
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
