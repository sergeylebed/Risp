import React from 'react';
import NumberPicker from '../components/NumberPicker.jsx';

const Test2 = () => {
  return (
    <div>
      <NumberPicker
        id='some'
        title='Hello'

        value={10}
        options={[1, 2, 3]}
        dialogOptions={[4, 5, 6]}

        columns={8}

        vertical={false}
        first={true}/>
    </div>
  );
};
export default Test2;
