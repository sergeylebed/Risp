import React from 'react';

const Shared = ({ context, children }) => {
  var clonedChildren = React.Children.map(children, (child) => React.cloneElement(child, { context }));

  return (
    <div>
      <div className='row'>
        <nav className='navbar navbar-default navbar-static-top'>
          <div className='container'>
            <ul className="nav navbar-nav">
              <li>
                <a className="navbar-brand" href='#'
                  onClick={(e) => { e.preventDefault(); context.redirect('#/Welcome'); }}>
                  <span className="glyphicon glyphicon-home" aria-hidden="true"></span> RISP
                </a>
              </li>
              <li>
                <a href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Open</a></li>
                  <li><a href="#">Save</a></li>
                  <li></li>
                </ul>
              </li>
            </ul>
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
              <li><a href='#'
                onClick={(e) => { e.preventDefault(); context.redirect('#/Test'); }}>Test</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shared;