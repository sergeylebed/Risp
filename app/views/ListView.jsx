import React from 'react';

const ListView = ({ files, onCreate, onOpen, onRemove }) => {
  return (
    <div className='row file-list'>
      <div className='col-md-8 col-md-offset-2'>
        <div className='list-group'>
          {
            files.filter((file) => file.trim() !== '').map((file) => (
              <div className='list-group-item'>
                <div className='btn-group btn-group-lg clearfix'>
                  <button className='btn btn-default file-list-item-title'
                    onClick={() => onOpen(file)}>{file}</button>
                  <button className='btn btn-default file-list-item-remove'
                    onClick={(e) => onRemove(file)}>
                    <span className="glyphicon glyphicon-remove" aria-hidden></span>
                  </button>
                </div>
              </div>
            ))
          }
          <div className='list-group-item clearfix'>
            <div className='btn-group btn-group-lg'>
              <button className='btn btn-default btn-primary'
                onClick={() => onCreate()}>
                <span className='glyphicon glyphicon-plus'></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
