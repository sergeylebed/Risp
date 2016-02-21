import React from 'react';

const NumberPickerDialog = ({
  title,

  columns,
  rows,

  value,
  begin,
  step,

  first,

  onSelect
}) => {
  var activeAny = false;

  return (
    <div className="modal-dialog number-picker-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title" id="myModalLabel">{ title }</h4>
        </div>
        <div className="modal-body">
          <div className='row'>
            <div className='col-md-12'>
              <table>
                <tbody>
                  {
                    new Array(rows).fill(null).map((_, rowId) => (
                      <tr>
                        {
                          new Array(columns).fill(null).map((_, colId) => {
                            var id = rowId * columns + colId;
                            var val = begin + step * id;
                            if(first && val === 0) val = 1;

                            var active = val === value;
                            activeAny = activeAny || active;

                            return (
                              <td>
                                <button
                                  className={'btn btn-default' + (active ? ' btn-primary' : '')}
                                  data-dismiss='modal'
                                  onClick={() => onSelect(val)}>
                                  {
                                    val
                                  }
                                </button>
                              </td>
                            );
                          })
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='row menu'>
            <div className='col-md-6'>
              <div className='input-group'>
                <input
                  className={'form-control' + (!activeAny ? ' active' : '')}
                  type='text'
                  value={value === null ? begin : value}
                  onChange={(e) => onSelect(isNaN(e.target.value) ? value : Number.parseInt(e.target.value))}>
                </input>
                <div className='input-group-btn'>
                  <button className='btn btn-default'
                    onClick={() => onSelect(value === null ? 1 : value + 1)}>ADD</button>
                  <button className='btn btn-default'
                    onClick={() => onSelect(value === null ? 0 : Math.max(0, value - 1))}>LESS</button>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='btn-group'>
                <button className='btn btn-default' data-dismiss='modal'>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NumberPickerDialog;
