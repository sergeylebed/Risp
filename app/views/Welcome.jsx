import React from 'react';

export default function Welcome({ context }) {
  return (
    <div>
      <div className='jumbotron'>
        <h1>
          RISP<small> is a sport metronom</small>
        </h1>
        <p>
          It will help you to concentrate on the rhythm of the exercise<br/>by providing you with regular ticks indicating that movement should be made
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => { context.redirect('#/Editor'); }}>Start exercises now</button>
      </div>

      <div className='slide-container'>
        <div className='page-header'>
          <h1>Easy as</h1>
        </div>

        <div className='slide clearfix'>
            <div className='super-number'>1</div>
            <div className='slide-body'>
              <h2>Adjust <b>count</b></h2>
              <p className='lead'>It shows how many times your exercise will be repeated</p>
            </div>
        </div>

        <div className='slide clearfix'>
          <div className='super-number'>2</div>
          <div className='slide-body'>
            <h2>Adjust <b>number of phases</b></h2>
            <p className='lead'>It shows number of movement your exercise includes</p>
          </div>
        </div>

        <div className='slide clearfix'>
          <div className='super-number'>3</div>
          <div className='slide-body'>
            <h2>Adjust <b>duration of every phase</b></h2>
            <p className='lead'>It shows approximate duration of every movement</p>
          </div>
        </div>

        <div className='slide clearfix'>
          <div className='super-number'>4</div>
          <div className='slide-body'>
            <h2>Adjust <b>delay</b></h2>
            <p className='lead'>It shows time given to you before the exercise</p>
          </div>
        </div>
      </div>
    </div>
  );
}
