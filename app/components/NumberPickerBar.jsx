import React from 'react';
import NumberPicker from './NumberPicker.jsx';

const NumberPickerBar = (props) => {
  var { primaryIcon, secondaryIcon } = props;

  return (
    <ul className={'number-picker-bar ' + (props.vertical ? 'vertical list-unstyled' : 'list-inline')}>
      {
        primaryIcon ? (
          <li>
            <button className='btn btn-default btn-lg'>
              {
                primaryIcon
              }
            </button>
          </li>
        )
        :
        []
      }
      <li>
        <NumberPicker {...props} />
      </li>
      {
        secondaryIcon ? (
          <li>
            <button className='btn btn-default btn-lg'>
              {
                secondaryIcon
              }
            </button>
          </li>
        )
        :
        []
      }
    </ul>
  );
};

export default NumberPickerBar;
