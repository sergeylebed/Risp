import React from 'react';
import { ExerciseRunner } from '../js/ExerciseRunner';
import ProgressBar from '../components/ProgressBar.jsx';
import { ExerciseView } from '../js/Exercise';
import TimeBox from '../components/TimeBox.jsx';
import CountBox from '../components/CountBox.jsx';
import { connect } from 'react-redux'

class FileRun extends React.Component {
    
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
                    this.setInitialState();              
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
        
  get repeatTimeBoxState(){
      
      if (this.animator.canResume){
          return 'pause'
      }
      
      return this.state.exercise.isDelayPhase
        ? 'delay'
        : 'default';            
  }
  
  get repeatTimeBoxSec(){
      return this.state.exercise.isDelayPhase
        ? this.state.exercise.current.countDown
        : this.state.exercise.repeatCountDownSec;            
  }
        
  render() {
    console.log('In render');
    const states = ['dafault', 'delay', 'pause'];
    return (        
      <div>
        <div className="row">
            <div className="container">

                <div>
                    <div className="col-xs-4 col-sm-4 timebox timebox-total">
                    <TimeBox sec={this.state.exercise.totalSec} 
                        state={
                            this.animator.canResume
                                ?'pause'
                                :'default'
                            } />
                    </div>
                    <div className="col-xs-4 col-sm-4 countbox">
                    <CountBox count={this.state.exercise.countDown} />
                    </div>
                    <div className="col-xs-4 col-sm-4 timebox timebox-rest">
                    <TimeBox sec={this.repeatTimeBoxSec} 
                            state={this.repeatTimeBoxState} />
                    </div>
                </div>
                <div>&nbsp;</div>
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

&nbsp;
                <button
                    className='btn btn-default btn-lg btn-success'
                onClick={(e) => {
                   e.preventDefault(); 
                   this.animator.stop();
                   this.setInitialState();
                   }}
                   disabled={false}>Change (align me right)</button>                   

            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exercise: state.currentExercise
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}  
}

const Runner = connect(
     mapStateToProps,
     mapDispatchToProps)
    (FileRun); 
export default Runner;