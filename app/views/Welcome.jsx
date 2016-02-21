import React from 'react';

export default function Welcome({ context }) {
  return (
    <div className="row">
      <div className="container">
        <button className="btn btn-success btn-lg btn-block" onClick={() => { context.redirect('#/View'); }}>Start exercises now</button>
        <h1 className="text-center">Introduction:</h1>
        <p className="lead" style={{fontSize: '2em', textAlign: 'center'}}>
          RISP helps you doing your exercises.<br />
          It optimizes your time, forming your plan.<br />
          You aren’t digressing with your exercises.<br />
          You can absolutely immerse yourself in sport.</p>
        <ul className="media-list">
          <li className="media">
            <div className="media-left"><h2 className="media-heading"><span className="label label-default">1</span></h2></div>
            <div className="media-body">
              <h2 className="media-heading">Choose phases</h2>
            </div>
          </li>
          <li className="media">
            <div className="media-left"><h2 className="media-heading"><span className="label label-default">2</span></h2></div>
            <div className="media-body">
              <h2 className="media-heading">Set timing</h2>
            </div>
          </li>
          <li className="media">
            <div className="media-left"><h2 className="media-heading"><span className="label label-default">3</span></h2></div>
            <div className="media-body">
              <h2 className="media-heading">Start exercise</h2>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
