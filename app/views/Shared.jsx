import React from 'react';

export default class Shared extends React.Component {
  constructor(props) {
      super(props);

      props.store.subscribe(() => this.forceUpdate());
  }

  render() {
    var { context, children } = this.props;
    var clonedChildren = React.Children.map(children, (child) => React.cloneElement(child, { context }));

    return (
      <div>
        <div className='row'>
          <div className='navbar navbar-default'>
            <div className='container'>
              <a className='navbar-brand' href='#' onClick={(e) => { e.preventDefault(); context.redirect('#/Welcome'); }}>Risp</a>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='container'>
            {
              clonedChildren
            }
          </div>
        </div>
      </div>
    );
  }
}
