import React from 'react';

export default function Welcome({ context }) {
  return (
    <div>
      <div className='jumbotron'>
        <h1>
          RISP<small> is the sport metronome</small>
        </h1>
        <p>
          The audio sounds and the visual indication helps you keep the right rhythm while doing your physical exercises.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => { context.redirect('#/Editor'); }}>Start exercising now</button>
      </div>

      <div className='slide-container'>
        <div className='page-header'>
          <h1>It is easy as</h1>
        </div>

        <div className='slide clearfix'>
            <div className='super-number'>1</div>
            <div className='slide-body'>
              <h2>Adjust <b>the count</b></h2>
              <p className='lead'>It shows how many times your exercise will be repeated.</p>
            </div>
        </div>

        <div className='slide clearfix'>
          <div className='super-number'>2</div>
          <div className='slide-body'>
            <h2>Adjust <b>the number of phases</b></h2>
            <p className='lead'>It shows the number of movements your exercise includes.</p>
          </div>
        </div>

        <div className='slide clearfix'>
          <div className='super-number'>3</div>
          <div className='slide-body'>
            <h2>Adjust <b>the duration of every phase</b></h2>
            <p className='lead'>It shows the number seconds for your movement.</p>
          </div>
        </div>

        <div className='slide clearfix'>
          <div className='super-number'>4</div>
          <div className='slide-body'>
            <h2>Adjust <b>the delay</b></h2>
            <p className='lead'>It shows the seconds given to you before the exercise.</p>
          </div>
        </div>
        
        <div className='slide clearfix'>
          <div className='super-number'>5</div>
          <div className='slide-body'>
            <h2>Press the <b>start</b> button</h2>
            <p className='lead'>Enjoy your exercise!</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
