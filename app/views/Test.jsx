import React from 'react';

const ProgressBar = ({number}) => {
  const width = 100/number;
  
  var btns = [];
  for(var i = 0; i < number; i++) {
    btns.push(
      <div className='btn-group' style={{width: width + '%'}}>
        <button type="button" class="btn btn-default">{ i + 1 }</button>
      </div>
    );
  }
  return (
    <div className="progressbar">
      {
        btns
      }
    </div>
  );
};


export default function Test() {
  return (
    <div>
      <ProgressBar number={2} />
      <ProgressBar number={10} />
      <ProgressBar number={1} />
    </div>
  );
}
