import React from 'react';
import ProgressbarPhases from '../components/ProgressbarPhases.jsx';

class ProgressBarNumber extends React.Component {
  render() {
    return (
	  <div className="pbar-number bg-info">{ this.props.num }</div>
	);  
  };
}

class ProgressBarCounter extends React.Component {
  render() {
    return (
	  <div className="pbar-counter bg-primary">{ this.props.value }</div>
	);  
  };
}

export default class ProgressBar extends React.Component {
  render() {
    return(
    <div className={'row phase-run' + (this.props.active ? ' phase-active' : '')}>
      <div className='col-xs-1 col-sm-1 col-md-1 col-lg-1 phase-number'>
	  	  <ProgressBarNumber num={this.props.number} />
      </div>
      <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 progressbar">
        <ProgressbarPhases count={this.props.value} position={this.props.position} active={this.props.active} />
      </div>
      <div className='col-xs-1 col-sm-1 col-md-1 col-lg-1 phase-counter'>
	  	  <ProgressBarCounter value={this.props.value - this.props.position} />
      </div>
    </div>
    );
  };
};
