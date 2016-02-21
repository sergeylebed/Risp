import React from 'react';
import Sounds from '../js/SoundPlayer.js';

const SoundTest = () => {
  return (
    <ul className='list-group'>
      {
        Sounds.sounds().map((name) => (
          <li className='list-group-item'>
            <div className='btn-group'>
              <button className='btn btn-default'>{name}</button>
              <button className='btn btn-success' onClick={() => Sounds._play(name)}>Play</button>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default SoundTest;
