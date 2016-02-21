import React from 'react';
import NumberPickerDialog from '../components/NumberPickerDialog.jsx';

const NumberPicker = ({
  id,
  title,

  value,
  begin,
  step,
  number,

  rows,
  columns,

  vertical,
  first,

  className,

  onSelect
}) => {

  var oneActive = false;
  var dialogBegin = begin + step * (number + 1);

  return (
    <div>
      <div className={(vertical ? 'btn-group-vertical' : 'btn-group') + ' btn-group-lg ' + className}>
        {
          new Array(number).fill(null).map((_, i) => {
            var val = begin + step * i;
            if(first && val === 0) {
              val = 1;
            }

            var active = val === value;
            oneActive = oneActive || active;

            return (
              <button
                className={'btn btn-default' + (active ? ' btn-primary' : '')}
                onClick={((val) => () => onSelect(val))(val)}>
                {
                  val
                }
              </button>
            );
          })
        }
        {
          (!oneActive && value ?
            (
              <button
                className='btn btn-default btn-primary'
                data-toggle='modal'
                data-target={'#' + id}>{value}
              </button>
            )
            :
            (
              <button
                className='btn btn-default'
                data-toggle='modal'
                data-target={'#' + id}>
                <span className='glyphicon glyphicon-cog' aria-hidden></span>
              </button>
            ))
          }
      </div>
      <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <NumberPickerDialog
          title={title}
          first={first}
          rows={rows}
          columns={columns}
          begin={dialogBegin}
          step={step}
          value={value}
          onSelect={onSelect}/>
      </div>
    </div>
  );
};
export default NumberPicker;
