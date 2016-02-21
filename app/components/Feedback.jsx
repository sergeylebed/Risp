import React from 'react';

const Feedback = ({
  name,
  email,
  plot,

  onNameChange,
  onEmailChange,
  onPlotChange,

  onSend,
}) => {
  const nameValid = () => {
    return name.trim() !== '';
  }

  const emailValid = () => {
    return email.trim().match(/^.+@.+\..+$/);
  }

  const plotValid = () => {
    return plot.trim() !== '';
  }

  const isValid = () => {
    return nameValid() && emailValid() && plotValid();
  }

  return (
    <form className='form-horizontal'>
      <div className={'form-group ' + (nameValid() ? '' : 'has-error')}>
        <label htmlFor='feedback-input-name' className='col-sm-2 control-label'>Name</label>
        <div className='col-sm-10'>
          <input id='feedback-input-name' className='form-control' placeholder='Name'
            value={name}
            onChange={(e) => onNameChange(e.target.value)}></input>
        </div>
      </div>

      <div className={'form-group ' + (emailValid() ? '' : 'has-error')}>
        <label htmlFor='feedback-input-email' className='col-sm-2 control-label'>Email</label>
        <div className='col-sm-10'>
          <input id='feedback-input-email' className='form-control' placeholder='Email'
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}></input>
        </div>
      </div>

      <div className={'form-group ' + (plotValid() ? '' : 'has-error')}>
        <label htmlFor='feedback-input-plot' className='col-sm-2 control-label'>Plot</label>
        <div className='col-sm-10'>
          <textarea style={{resize: 'vertical'}} id='feedback-input-plot' className='form-control' placeholder='Plot' rows='5'
            value={plot}
            onChange={(e) => onPlotChange(e.target.value)}></textarea>
        </div>
      </div>

      <div className='form-group'>
        <div className='col-sm-10 col-sm-offset-2'>
          <button type='submit' className='btn btn-primary'
            disabled={!isValid()}
            onClick={(e) => {
              onSend();
              return false;
            }}>
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default Feedback;
