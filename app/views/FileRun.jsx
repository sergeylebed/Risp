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
        exercise: new ExerciseView(props.exercise),
        isSoundOn: true
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
  
  soundOn(){
      this.setState({
                        isSoundOn:true
                        
                    });
  }
  
  soundOff(){
      this.setState({
                        isSoundOn: false
                        
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
      <div className="container">
        <div className="row" style={{marginBottom: '10px'}}>
          <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 timebox timebox-total">
            <TimeBox sec={this.state.exercise.totalSec} 
              state={
                this.animator.canResume
                  ?'pause'
                  :'default'
            } />
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 countbox">
            <CountBox count={this.state.exercise.countDown} />
          </div>
          <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 timebox timebox-rest">
            <TimeBox sec={this.repeatTimeBoxSec} 
              state={this.repeatTimeBoxState} />
          </div>
        </div>
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
        <div className="row player-buttons">  
          <div className='col-md-12'>
            <button
              className='btn btn-default btn-lg btn-success'
              onClick={(e) => {
                e.preventDefault(); 
                this.animator.play();
                this.refreshState();
              }}                   
              disabled={!this.animator.canPlay && !this.animator.canResume}><span className="glyphicon glyphicon-play" aria-hidden="true"></span> Go</button>
            <button
              className='btn btn-default btn-lg btn-success'
              onClick={(e) => {
                  e.preventDefault(); 
                  this.animator.pause();
                  this.refreshState();
              }} 
              disabled={!this.animator.canPause}><span className="glyphicon glyphicon-pause" aria-hidden="true"></span> Pause</button>
            <button
              className='btn btn-default btn-lg btn-success'
              onClick={(e) => {
                e.preventDefault(); 
                this.animator.stop();
                this.setInitialState();
              }}
              disabled={!this.animator.canStop}><span className="glyphicon glyphicon-stop" aria-hidden="true"></span> Abort</button>                   
            <button
              className={'btn btn-default btn-lg btn-success' + (this.state.isSoundOn ? ' hidden' : '')}
              onClick={(e) => {
                e.preventDefault(); 
                this.soundOn();
              }}
            ><span className="glyphicon glyphicon-volume-off" aria-hidden="true"></span></button>                   
            <button
              className={'btn btn-default btn-lg btn-success' + (this.state.isSoundOn ? '' : ' hidden')}
              onClick={(e) => {
                e.preventDefault(); 
                this.soundOff();
              }}
            ><span className="glyphicon glyphicon-volume-up" aria-hidden="true"></span></button>                   
            <button
              className='btn btn-default btn-lg btn-success btnchange'
              onClick={(e) => {
                e.preventDefault(); 
                this.animator.stop();
                this.setInitialState();
              }}
              disabled={false}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Change</button>
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
