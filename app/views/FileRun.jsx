import React from 'react';
import { ExerciseRunner } from '../js/ExerciseRunner';
import ProgressBar from '../components/ProgressBar.jsx';
import { ExerciseView } from '../js/Exercise';

export default class  FileRun extends React.Component {
    
  constructor(props) {
    super(props);
    this.animator = new ExerciseRunner(props.exercise || {})
    this.animator.tick = 
        ()=> { 
                this.state.exercise.nextTick();
                this.setState(
                    {
                        secondsElapsed: this.state.secondsElapsed + 1,
                        exercise: this.state.exercise
                        
                    });
            };
    this.state = {
        secondsElapsed: 0,
        exercise: new ExerciseView(props.exercise)
        };   
    this.animator.play();
  }
      
  componentWillUnmount() {
    this.animator.stop();    
  }
  
  render() {
    //var context = this.props.context;
    //var file = this.state.file;
    console.log('in render');
    return (        
      <div>
        <div className="row">
            <div className="container">
            <h1 className="text-center">Run2:</h1>
                <div>Seconds Elapsed: {this.state.secondsElapsed}</div>                     

        {            
            this.state.exercise.phaseViews.map((phase, i)=>
                 <ProgressBar 
                    key = {i}
                    number={phase.id + 1} 
                    value={phase.durationSec} 
                    position={phase.counter} 
                    active={phase===this.state.exercise.current} />            
            )
        }      
<br />
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.play();
                   }}>Go</button>                   
&nbsp;
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.pause();
                   }}>Pause</button>
&nbsp;                   
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.resume();
                   }}>Resume</button>                   
&nbsp;
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.stop();
                   }}>Abort</button>                   

            </div>
        </div>
      </div>
    );
  }
}

// <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
//             