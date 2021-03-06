import React from 'react';
import { connect } from 'react-redux'
import { ExerciseActions } from '../store/actions';
import NumberPickerBar from '../components/NumberPickerBar.jsx';

const ExerciseEditor = ({
  exercise,

  onDelayChange,// (value)
  onCountChange,// (value)
  onPhasesChange,// (value)
  onPhaseChange,// (id, value)

  onDelaySoundChange,// (boolean)
  onCountSoundChange,// (boolean)
  onPhaseSoundChange,// (id, boolean)

  onStart
}) => {

  const phasesOptions = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    new Array(40).fill(1).map((_, i) => i + 1)
  ];

  const delayOptions = [
    [1, 2, 3, 4, 5],
    new Array(30).fill(1).map((_, i) => (i + 1))
    .concat(new Array(10).fill(1).map((_, i) => ((i+1)*5+30 )))
  ];

  const phaseOptions = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    new Array(30).fill(1).map((_, i) => (i + 1))
    .concat(new Array(10).fill(1).map((_, i) => ((i+1)*5+30 )))
  ];

  const countOptions = [
    [1, 2, 5, 10, 30, 60],
    new Array(20).fill(1).map((_, i) => (i + 1))
    .concat(new Array(20).fill(1).map((_, i) => ((i+1)*5+20 )))
  ];

  return (
    <div className='edit row'>
          <div className='col-md-2 col-sm-3 col-xs-3'>
            <div className='pull-right'>
              <NumberPickerBar
                primaryIcon={
                  <span>Count</span>
                }
                secondaryIcon={
                  <span className={'glyphicon ' + (exercise.countSoundOn ? 'glyphicon-volume-up' : 'glyphicon-volume-off')}></span>
                }
                onSecondaryIconClick={
                  () => onCountSoundChange(!exercise.countSoundOn)
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
      <div className="col-md-8 col-sm-6 col-xs-6">
        <div className='row edit-header'>
          <div className='col-md-12 col-sm-12 col-xs-12'>
            <NumberPickerBar
              primaryIcon={
                <span>Phases</span>
              }
  
              id='phases-selector' row
              title='Phases'
  
              value={exercise.phases && exercise.phases.length}
              options={phasesOptions[0]}
              dialogOptions={phasesOptions[1]}
  
              columns={5}
  
              onSelect={(value) => onPhasesChange(value)} />
          </div>
        </div>
        <div className='row edit-body'>
          <div className='col-md-12'>
            <ul className='list-group'>
              {
                exercise.phases.map((phase, id) => (
                  <li key={id} className='list-group-item'>
                    <NumberPickerBar
                      secondaryIcon={
                        <span className={'glyphicon ' + (phase.soundOn ? 'glyphicon-volume-up' : 'glyphicon-volume-off')}></span>
                      }
                      onSecondaryIconClick={
                        () => onPhaseSoundChange(phase.id, !phase.soundOn)
                      }
  
                      id={'phase-selector-' + id}
                      title='Phase duration'
  
                      value={phase.durationSec}
                      options={phaseOptions[0]}
                      dialogOptions={phaseOptions[1]}
  
                      columns={5}
                      right
  
                      onSelect={(value) => onPhaseChange(phase.id, value)}/>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className='col-md-2 col-sm-3 col-xs-3'>
        <div className='pull-left'>
          <NumberPickerBar
                primaryIcon={
                  <span>Delay</span>
                }
                secondaryIcon={
                  <span className={'glyphicon ' + (exercise.delaySoundOn ? 'glyphicon-volume-up' : 'glyphicon-volume-off')}></span>
                }
                onSecondaryIconClick={
                  () => onDelaySoundChange(!exercise.delaySoundOn)
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
            <div className="h-btn-start">
              <button
                className='btn btn-default btn-lg btn-success'
                onClick={onStart}
                style={{fontSize: '2em'}}>
                Start
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
    exercise: state.currentExercise
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelayChange: (value) => { dispatch(ExerciseActions.setDelay(value));},
    onCountChange: (value) => { dispatch(ExerciseActions.setCount(value)); },
    onPhasesChange: (value) => { dispatch(ExerciseActions.setPhases(value)); },
    onPhaseChange: (id, value) => { dispatch(ExerciseActions.setPhase(id, value)); },
    onDelaySoundChange : (soundOn) => { dispatch(ExerciseActions.setDelaySound(soundOn));},
    onCountSoundChange  : (soundOn) => { dispatch(ExerciseActions.setCountSound(soundOn));},
    onPhaseSoundChange: (id, soundOn) => { dispatch(ExerciseActions.setPhaseSound(id, soundOn)); },
    
    onStart: () => { window.location = '#/Runner'; }    
  }
}

let Editor = connect(
     mapStateToProps,
     mapDispatchToProps)
    (ExerciseEditor);

export default Editor;
