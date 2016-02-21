// import React from 'react';
// import { Exercise, Phase } from '../js/Exercise.js';
// import ExerciseEditor from '../components/ExerciseEditor.jsx';
// import { connect } from 'react-redux'
// import { setCurrentExercise } from '../store/actions'; 
// 
// let Editor = (exercise, onChange) => {
// //  var e = new Exercise('fedor', [new Phase(0, 1), new Phase(1, 2)], 10, 20);
// 
//   return <ExerciseEditor
//     exercise={exercise}
//     onChange={onChange}
//     onStart={() => console.log('start!')}
//     />
// };
// 
// const mapStateToProps = (state) => {
//     
//   console.log(state.currentExercise);
//   return {
//     exercise: state.currentExercise
//   }
// }
// 
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onChange: (exercise) => {
//       dispatch(setCurrentExercise(exercise))
//     },
//     
//     onDelayChange: (value) => { console.log(value); },
//     onCountChange: (value) => { console.log(value); },
//     onPhasesChange: (value) => { console.log(value); },
//     onPhaseChange: (value) => { console.log(id, value); }
//     
//   }
// }
// 
// Editor = connect(
//      mapStateToProps,
//      mapDispatchToProps)
//     (Editor); 
// export default Editor;