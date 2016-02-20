import React from 'react';

const NumberPicker = ({ value, begin, step, number, onSelect, vertical, className, first }) => {

  var oneActive = false;
  var btns = [];
  for(var i = 0; i < number; i++) {
    var val = begin + step * i;
    if(first && val === 0) {
      val = 1;
    }

    var active = val === value;
    oneActive = oneActive || active;

    btns.push(
      <button
        className={'btn btn-default' + (active ? ' btn-primary' : '')}
        onClick={((val, id) => () => onSelect(val, id))(val, i)}>
          {
            val
          }
      </button>
    );
  }

  var btn;
  if(!oneActive && value) {
    btn = <button disabled className='btn btn-default btn-primary'>{value}</button>;
  } else {
    btn = <button disabled className='btn btn-default'><span className='glyphicon glyphicon-cog' aria-hidden={true}></span></button>;
  }

  return (
    <div className={(vertical ? 'btn-group-vertical' : 'btn-group') + ' btn-group-lg ' + className}>
      {
        btns
      }
      {
        btn
      }
    </div>
  );
};
export default NumberPicker;
