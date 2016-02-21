import React from 'react';
import TimeBox from '../components/TimeBox.jsx';
import CountBox from '../components/CountBox.jsx';
import { Exercise } from '../stores/ExerciseStore.js';

export default class Test extends React.Component {
  render() {
  
    const states = ['dafault', 'delay', 'pause'];
  
    return (
      <div>
        <div className="col-xs-4 col-sm-4 countbox">
          <CountBox count={2} />
        </div>
        <div className="col-xs-4 col-sm-4 timebox timebox-total">
          <TimeBox sec={3784} state={states[2]} />
        </div>
        <div className="col-xs-4 col-sm-4 timebox timebox-rest">
          <TimeBox sec={80} state={states[1]} />
        </div>
      </div>
    );
  }

}
