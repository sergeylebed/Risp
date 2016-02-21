import React from 'react';
import NumberPickerDialog from '../components/NumberPickerDialog.jsx';

const NumberPicker = ({
  id,
  title,

  value,
  options,
  dialogOptions,

  columns,
  vertical,

  onSelect
}) => {

  var oneActive = false;

  return (
    <div>
      <div className={(vertical ? 'btn-group-vertical' : 'btn-group') + ' btn-group-lg'}>
        {
          options.map((val, i) => {

            var active = val === value;
            oneActive = oneActive || active;

            return (
              <button
                key={i}
                className={'btn ' + (active ? ' btn-primary' : 'btn-default')}
                onClick={() => onSelect(val)}>
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
                className='btn btn-primary'
                data-toggle='modal'
                data-target={'#' + id}>
                {value}
                <span style={{marginLeft: 10}} className='glyphicon glyphicon-cog' aria-hidden></span>
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

            columns={columns}
            options={dialogOptions}

            value={value}

            onSelect={onSelect}/>
        </div>
      </div>
    );
};
export default NumberPicker;
