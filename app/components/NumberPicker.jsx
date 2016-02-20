import React from 'react';

const NumberPicker = ({ begin, step, number, onSelect, selectedId, vertical, className }) => {

  var btns = [];
  for(var i = 0; i < number; i++) {
    var val = begin + step * i;
    var active = i === selectedId;

    btns.push(
      <button
        key={i}
        className={'btn btn-default' + (active ? ' btn-primary' : '')}
        onClick={((val, id) => () => onSelect(val, id))(val, i)}>
          {
            val
          }
      </button>
    );
  }

  var btnContent;
  if(selectedId >= number) {
    btnContent = begin + selectedId * step;
  } else {
    btnContent = <span className='glyphicon glyphicon-cog' aria-hidden={true}></span>;
  }

  return (

    <div className={(vertical ? 'btn-group-vertical' : 'btn-group') + ' btn-group-lg ' + className}>
      {
        btns
      }
      <button className='btn btn-default' disabled>
        {
          btnContent
        }
      </button>
    </div>
  );
};
export default NumberPicker;
