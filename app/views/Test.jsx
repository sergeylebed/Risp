import React from 'react';

const ProgressBar = ({number}) => {
  const width = (100 - number*10)/number;
  
  var btns = [];
  for(var i = 0; i < number; i++) {
    btns.push(
      <div className={'btn-group'}>
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
    <ProgressBar number={10} />
  );
}
