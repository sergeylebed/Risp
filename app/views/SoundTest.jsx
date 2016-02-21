import React from 'react';
import SoundPlayer from '../js/SoundPlayer.js';

const SoundTest = () => {
  return (
    <ul className='list-group'>
      {
        SoundPlayer.sounds().map((name) => (
          <li className='list-group-item'>
            <div className='btn-group'>
              <button className='btn btn-default'>{name}</button>
              <button className='btn btn-default btn-success' onClick={() => SoundPlayer.play(name)}>Play</button>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default SoundTest;
