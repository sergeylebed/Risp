import React from 'react';

export default class FileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  render() {
    var { files, context, onAdd } = this.props;

    return (
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
          <div className='list-group'>
            {
              files.map((file) => (
                <a href='#' className='list-group-item' onClick={(e) => { e.preventDefault(); context.redirect('#/Edit/' + file); }}>
                  {
                    file
                  }
                </a>
              ))
            }
            <div className='list-group-item'>
              <button className='btn btn-default btn-primary' onClick={() => context.redirect('#/Edit')}>
                <span className='glyphicon glyphicon-plus'></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
