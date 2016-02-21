import React from 'react';

export default class ProgressbarPhases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      position: props.position
    };
  }

  render() {
    const width = 100/this.state.count;
    var btns = [];
    
    for(var i = 0; i < this.state.count; i++) {
      btns.push(
        <div className='btn-group' style={{width: width + '%'}}>
          <button type="button" className={'btn ' + (this.state.position > i ? 'btn-info' : 'btn-default')}>{ i + 1 }</button>
        </div>
      );
    }
    
    return (
      <div>
      {
        btns
      }
      </div>  
    );
  }
}
