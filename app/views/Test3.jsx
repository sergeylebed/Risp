import React from 'react';
import { Exercise, Phase } from '../js/Exercise.js';
import ExerciseEditor from '../components/ExerciseEditor.jsx';

const Test3 = () => {
  var e = new Exercise('fedor', [new Phase(0, 1), new Phase(1, 2)], 10, 20);

  return <ExerciseEditor
    exercise={e}
    />
};

export default Test3;
