export const ActionTypes = {
  save: 'ADD',
  remove: 'REMOVE',
  load: 'LOAD'
};

export function ExerciseStore(state, action) {
  if(!state) {
      return { };
  }

  switch(action.type) {
    case ActionTypes.load:
      return action.data;

    case ActionTypes.save:
      return Object.assign({}, state, { [action.name]: action.data });

    case ActionTypes.remove:
      var temp = Object.assign({}, state);
      delete temp[action.name];
      return temp;

    default:
      console.error('Unknows action type: ' + action.type);
  }
}
