import React from 'react';
import { ExerciseRunner } from '../js/ExerciseRunner';

export default class  FileRun extends React.Component {
    
  constructor(props) {
    super(props);
    this.animator = new ExerciseRunner(props.exercise || {})
    this.animator.tick = 
        ()=> { 
                this.setState({secondsElapsed: this.state.secondsElapsed + 1});
            };
    this.animator.play();
    this.state = {secondsElapsed: 0};
    
  }
      
  componentWillUnmount() {
    this.animator.stop();
  }
  
  render() {
    //var context = this.props.context;
    //var file = this.state.file;
    return (
      <div>
        <div className="row">
            <div className="container">
            <h1 className="text-center">Run2:</h1>
                <div>Seconds Elapsed: {this.state.secondsElapsed}</div>                     

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