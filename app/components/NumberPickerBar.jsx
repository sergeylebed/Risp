import React from 'react';
import NumberPicker from './NumberPicker.jsx';

const NumberPickerBar = (props) => {
  var { primaryIcon, secondaryIcon, onPrimaryIconClick, onSecondaryIconClick } = props;

  return (
    <ul className={'number-picker-bar ' + (props.vertical ? 'vertical list-unstyled' : 'list-inline')}>
      {
        primaryIcon ? (
          <li>
            <button className='btn btn-default btn-lg'
              onClick={onPrimaryIconClick}>
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
          <li className={props.right ? 'pull-right' : ''}>
            <button className='btn btn-default btn-lg'
              onClick={onSecondaryIconClick}>
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
