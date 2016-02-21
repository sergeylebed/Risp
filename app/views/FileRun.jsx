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
                if (this.state.exercise.hasFinished)
                {
                    this.animator.stop();
                }
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
  
  refreshState(){
      this.setState({
                        secondsElapsed: this.state.secondsElapsed,
                        exercise: this.state.exercise
                        
                    });
  }
  
  setInitialState(){
      this.setState( {
        secondsElapsed: 0,
        exercise: new ExerciseView(this.props.exercise)
        });
  }
  
  render() {
    console.log('In render');
    return (        
      <div>
        <div className="row">
            <div className="container">
            <h1 className="text-center">Run2:</h1>
                <div>Seconds Elapsed: {this.state.secondsElapsed}</div>                     
                <div>CountDown: {this.state.exercise.countDown}</div>
                <div>Count: {this.state.exercise.count}</div>

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
                   this.refreshState();
                   }}                   
                disabled={!this.animator.canPlay}>Go</button>                   
&nbsp;
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.pause();
                   this.refreshState();
                   }} 
                 disabled={!this.animator.canPause}>Pause</button>
&nbsp;                   
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.resume();
                   this.refreshState();
                   }}
                   disabled={!this.animator.canResume}>Resume</button>                   
&nbsp;
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.stop();
                   this.setInitialState();
                   }}
                   disabled={!this.animator.canStop}>Abort</button>                   

            </div>
        </div>
      </div>
    );
  }
}

// <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
//             