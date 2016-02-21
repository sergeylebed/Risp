import React from 'react';
import NumberPicker from './NumberPicker.jsx';

const NumberPickerBar = (props) => {
  var { primaryIcon, secondaryIcon, onPrimaryIconClick, onSecondaryIconClick } = props;
  
  return (
    <div className={'number-picker-bar ' + (props.vertical ? 'vertical list-unstyled' : 'row')}>
      {
        primaryIcon ? (
          <div className={ props.vertical ? '' : 'col-md-2 col-sm-4 col-xs-4' }>
            <button className={'btn btn-default btn-lg' + (props.vertical ? ' full-width' : '')}
              onClick={onPrimaryIconClick}>
              {
                primaryIcon
              }
            </button>
          </div>
        )
        :
        []
      }
      <div className={ props.vertical ? '' : 
        'col-md-' + (12 - (primaryIcon ? 2 : 0) - (secondaryIcon ? 2 : 0)) +
        ' col-sm-' + (12 - (primaryIcon ? 4 : 0) - (secondaryIcon ? 3 : 0)) +
        ' col-xs-' + (12 - (primaryIcon ? 4 : 0) - (secondaryIcon ? 3 : 0)) 
      }>
        <NumberPicker {...props} />
      </div>
      {
        secondaryIcon ? (
          <div className={ (props.vertical ? '' : 'col-md-2 col-sm-3 col-xs-3')  + (props.right ? ' text-right' : '') }>
            <button className={'btn btn-default btn-lg' + (props.vertical ? ' full-width' : '')}
              onClick={onSecondaryIconClick}>
              {
                secondaryIcon
              }
            </button>
          </div>
        )
        :
        []
      }
    </div>
  );
};

export default NumberPickerBar;
