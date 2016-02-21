import React from 'react';
import ProgressBar from '../components/ProgressBar.jsx';
import { Exercise } from '../stores/ExerciseStore.js';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: props.fileName || '',
      file: props.file || new Exercise(null, null, null)
    };

  }
  
  render() {
    var context = this.props.context;
    var file = this.state.file;

    return (
      <div>
        {
          file.phases().map((v, i) => (
            <ProgressBar number={i + 1} value={v} position={i == 3 ? 2 : 0} active={i == 0} />
          ))
        }      
      </div>
    );
  }

}
