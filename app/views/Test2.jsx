import React from 'react';
import NumberPicker from '../components/NumberPicker.jsx';

const Test2 = () => {
  return (
    <div>
      <NumberPicker
        id='some'
        title='Hello'

        value={10}
        begin={0}
        step={5}
        number={6}

        rows={7}
        columns={8}

        vertical={false}
        first={true}/>
    </div>
  );
};
export default Test2;
