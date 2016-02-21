import React from 'react';

const NumberPickerDialog = ({
  title,

  columns,
  options,

  value,

  onSelect
}) => {
  var activeAny = false;
  var rows = Math.floor(options.length / columns) + ((options.length / columns) % 1 > 0 ? 1 : 0);

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

                            if(id >= options.length) {
                              return <td></td>;
                            } else {
                              var active = options[id] === value;
                              activeAny = activeAny || active;

                              return (
                                <td>
                                  <button
                                    className={'btn btn-default' + (active ? ' btn-primary' : '')}
                                    data-dismiss='modal'
                                    onClick={() => onSelect(options[id])}>
                                    {
                                      options[id]
                                    }
                                  </button>
                                </td>
                              );
                            }
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
                  value={value === null ? (options[0] || 0) : value}
                  onChange={(e) => onSelect(isNaN(e.target.value) ? value : Number.parseInt(e.target.value))}>
                </input>
                <div className='input-group-btn'>
                  <button className='btn btn-default'
                    onClick={() => onSelect(value === null ? 1 : value + 1)}>
                    <span className='glyphicon glyphicon-chevron-up'></span>
                  </button>
                  <button className='btn btn-default'
                    onClick={() => onSelect(value === null ? 0 : Math.max(0, value - 1))}>
                    <span className='glyphicon glyphicon-chevron-down'></span>
                  </button>
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
