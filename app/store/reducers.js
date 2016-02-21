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

export function rispReducer(state = initialState, action) {

  console.log('in '+action.type+' action');
  switch (action.type) {
    
    case Actions.ActionType.Exercise.setCount:        
      {
          let ex = _.extend({}, state.currentExercise, {count: action.count});  
          return new Risp(ex);
      }
    
    case Actions.ActionType.Exercise.setDelay:
      {
          let ex = _.extend({}, state.currentExercise, {delaySec: action.delaySec});  
          return new Risp(ex);
      }      

    case Actions.ActionType.Exercise.setPhases:
      {
          let ex = copyExercise(state);
          console.log(ex, action); 
          ex.setPhases(action.number)  
          return new Risp(ex);
      }      

    case Actions.ActionType.Exercise.setPhase:
      {                    
          if (state.currentExercise.phases.length>action.id) {
              let ex = _.extend({}, state.currentExercise);
              let ph = new Phase(action.id, action.durationSec);
              ex.phases[action.id] = ph;
              return new Risp(ex); 
          } 
        return state;    
      }      
          
    default:
      return state
  };
    
}; 