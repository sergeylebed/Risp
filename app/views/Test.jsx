import React from 'react';
import { Exercise } from '../stores/ExerciseStore.js';



const ProgressBar = ({number, value, active}) => {
  const width = 100/value;
  
  var btns = [];
  for(var i = 0; i < value; i++) {
    btns.push(
      <div className='btn-group' style={{width: width + '%'}}>
        <button type="button" class="btn btn-default">{ i + 1 }</button>
      </div>
    );
  }
  return (
    <div className={'row phase-run' + (active ? ' phase-active' : '')}>
      <div className='col-md-1 col-lg-1 phase-number'>
        <button type="button" disabled={active} className="btn btn-info btn-sm">{ number }</button>
      </div>
      <div className="col-md-11 col-lg-11">
        <div className= 'progressbar'>
          {
            btns
          }
        </div>
      </div>
    </div>
  );
};


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
              <ProgressBar number={i + 1} value={v} />
          ))
        }      
      </div>
    );
  }

}
