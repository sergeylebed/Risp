import * as Actions from './actions';
import { Risp } from './model';
import _ from 'underscore';
import { Exercise, Phase} from '../js/Exercise'; 

const initialState = new Risp(); 

var copyExercise = function(state)
{
    let o = state.currentExercise;
    return new Exercise(
        o.name,
        [...o.phases],
        o.delaySec,
        o.count,
        o.delaySoundOn,
        o.countSoundOn
    );
}

var copyRisp = function(state)
{
    let ex = copyExercise(state);
    return new Risp(ex, state.settings);    
}

export function rispReducer(state = initialState, action) {

  switch (action.type) {
    
    case Actions.ActionType.Exercise.setCount:        
      {
          let risp = copyRisp(state);
          risp.currentExercise.count = action.count;
          return risp;
      }
    
    case Actions.ActionType.Exercise.setDelay:
      {
          let risp = copyRisp(state);
          risp.currentExercise.delaySec = action.delaySec;
          return risp;
      }      

    case Actions.ActionType.Exercise.setPhases:
      {
          let risp = copyRisp(state);
          risp.currentExercise.setPhases(action.number);  
          return risp;
      }      

    case Actions.ActionType.Exercise.setPhase:
      {                    
          if (state.currentExercise.phases.length>action.id) {
              let risp = copyRisp(state);          
              let ph = new Phase(action.id, action.durationSec);
              risp.currentExercise.phases[action.id] = ph;
              return risp; 
          } 
        return state;    
      }      

    case Actions.ActionType.Exercise.setCountSound:
      {
          let risp = copyRisp(state);
          risp.currentExercise.countSoundOn = action.countSoundOn;  
          return risp;
      }      

    case Actions.ActionType.Exercise.setDelaySound:
      {
          let risp = copyRisp(state);
          risp.currentExercise.delaySoundOn = action.delaySoundOn;  
          return risp;
      }      

    case Actions.ActionType.Exercise.setPhaseSound:
      {                    
          if (state.currentExercise.phases.length>action.id) {
              let risp = copyRisp(state);          
              let ph = risp.currentExercise.phases[action.id];
              ph = new Phase(ph.id, ph.durationSec, action.soundOn);
              risp.currentExercise.phases[action.id] = ph;
              return risp; 
          } 
        return state;    
      }      
          
    default:
      return state
  };    
};