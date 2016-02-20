import React from 'react';

const Shared = ({ context, children }) => {
  var clonedChildren = React.Children.map(children, (child) => React.cloneElement(child, { context }));

  return (
    <div>
      <div className='row'>
        <nav className='navbar navbar-default'>
          <div className='container'>
            <div class="navbar-header">
              <a className="navbar-brand" href='#'
                onClick={(e) => { e.preventDefault(); context.redirect('#/Welcome'); }}>
                <span className="glyphicon glyphicon-home" aria-hidden="true"></span> RISP
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className='row'>
        <div className='container'>
          {
            clonedChildren
          }
        </div>
      </div>
      <div className='row'>
        <div className='navbar navbar-default navbottom'>
          <div className='container'>
            <ul className="nav navbar-nav">
              <li><a href='#'
                onClick={(e) => { e.preventDefault(); context.redirect('#/Welcome'); }}>About</a></li>
              <li><a href='#'
                onClick={(e) => { e.preventDefault(); context.redirect('#/Welcome'); }}>Tell us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shared;