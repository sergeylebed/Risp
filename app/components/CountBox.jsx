import React from 'react';

export default class CountBox extends React.Component {
  
  render() {
    return (
      <div>
      {
        this.props.count
      }
      </div>  
    );
  }
}
