import React from 'react';

export default function Welcome({ context }) {
  return (
    <div>
      <div className='jumbotron'>
        <h1>Introduction</h1>
        <p>
          RISP helps you doing your exercises.<br />
          It optimizes your time, forming your plan.<br />
          You aren’t digressing with your exercises.<br />
          You can absolutely immerse yourself in sport.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => { context.redirect('#/Editor'); }}>Start exercises now</button>
      </div>

      <div className='page-header'>
        <h1>Easy as</h1>
      </div>

      <h2>Choose phases</h2>

      <h2>Set timing</h2>

      <h2>Start exercise</h2>

    </div>
  );
}
