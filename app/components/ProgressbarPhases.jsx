import React from 'react';

export default class ProgressbarPhases extends React.Component {
  
  render() {
    const width = 100/this.props.count;
    var btns = [];
    
    for(var i = 0; i < this.props.count; i++) {
      btns.push(
        <div className='btn-group' style={{width: width + '%'}}>
          <button     
          key = {i}      
          type="button" className={'btn ' + (this.props.position > i ? 'btn-info' : 'btn-default')}>{ i + 1 }</button>
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
