import * as Actions from './actions';
import { Risp } from './model';

const initialState = new Risp(); 

export function rispReducer(state = initialState, action) {

  switch (action.type) {
    
    case Actions.ActionType.setCurrentExercise:
      return new Risp(action.exercise);
    
    case Actions.ActionType.resetCurrentExercise:
      return initialState;
          
    default:
      return state
  };
    
}; 