import React from 'react';

export default class TimeBox extends React.Component {
  
  formatNum(s, size) {
    s = '' + s;
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  render() {
    var sec = parseInt(this.props.sec), min = parseInt(sec/60);
    sec -= min * 60;
    
    return (
      <div className={ 'timebox-' + (this.props.state) }>
      {
        this.formatNum(min, 2) + ':' + this.formatNum(sec, 2)
      }
      </div>  
    );
  }
}
